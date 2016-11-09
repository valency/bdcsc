$(document).ready(function () {
    auth_check();
    $.get(FRANZ_SERVER + "auth/admin/list/", function (resp) {
        for (var i = 0; i < resp.length; i++) {
            var user = resp[i];
            if (user["misc"] == null) user["misc"] = {};
            var html = "<tr>";
            html += "<td>" + user["username"] + "</td>";
            html += "<td>" + convert_django_time(user["register_time"]) + "</td>";
            html += "<td>" + convert_django_time(user["last_login"]) + "</td>";
            html += "<td>" + (user["misc"]["bdcsc_key"] == undefined ? "N/A" : user["misc"]["bdcsc_key"].split(",")[0]) + "</td>";
            html += "<td><a class='btn btn-xs btn-primary' href=\"javascript:assign_key('" + user["username"] + "')\"><i class='fa fa-edit'></i> 绑定授权码</a></td>";
            html += "</tr>";
            $("#table-users tbody").append(html);
        }
        $("#table-users").DataTable({language: DT_LANG});
    });
});

function assign_key(username) {
    var html = "<pre>" + username + "</pre>";
    html += "<div class='form-group'>";
    html += "<div class='input-group'>";
    html += "<span class='input-group-addon'>授权码</span>";
    html += "<select id='assign-key-list' class='form-control'>";
    for (var i = 0; i < API_KEYS.length; i++) {
        html += "<option value='" + i + "'>" + API_KEYS[i]["key"] + "</option>";
    }
    html += "</select>";
    html += "</div>";
    html += "</div>";
    bootbox.dialog({
        title: "绑定授权码",
        message: html,
        buttons: {
            "确定": function () {
                var key_id = $("#assign-key-list").val();
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: FRANZ_SERVER + "auth/admin/modify-misc/",
                    data: {
                        username: username,
                        field: "bdcsc_key",
                        value: API_KEYS[key_id]["key"] + "," + API_KEYS[key_id]["pwd"]
                    },
                    complete: function (xhr, ajaxOptions, thrownError) {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            bootbox.hideAll();
                            bootbox.alert(success_message("绑定授权码成功！"), function () {
                                location.reload();
                            });
                        } else {
                            bootbox.hideAll();
                            bootbox.alert(error_message("绑定授权码失败！"), function () {
                                location.reload();
                            });
                        }
                    }
                });
            }
        }
    });
}

function register() {
    var html = "<div class='form-group'>";
    html += "<div class='input-group'>";
    html += "<span class='input-group-addon'>用户名</span>";
    html += "<input id='register-username' class='form-control'/>";
    html += "</div>";
    html += "</div>";
    bootbox.dialog({
        title: "注册账户",
        message: html,
        buttons: {
            "确定": function () {
                var username = $("#register-username").val();
                var password_plain = CryptoJS.MD5("franz-" + (new Date()).getTime()).toString();
                var password_md5 = CryptoJS.MD5(password_plain).toString();
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: FRANZ_SERVER + "auth/register/",
                    data: {
                        username: username,
                        password: password_md5
                    },
                    complete: function (xhr, ajaxOptions, thrownError) {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            bootbox.hideAll();
                            bootbox.alert("<p>" + success_message("注册成功！") + "</p><pre>USERNAME:" + username + "<br/>PASSWORD:" + password_plain + "</pre>", function () {
                                location.reload();
                            });
                        } else {
                            bootbox.hideAll();
                            bootbox.alert(error_message("注册失败！"), function () {
                                register();
                            });
                        }
                    }
                });
            }
        }
    });
}
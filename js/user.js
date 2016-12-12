var COMPANIES = [];

$(document).ready(function () {
    auth_check();
    $("#menu-4").addClass("active");
    bootbox.dialog({
        message: loading_message("载入中..."),
        closeButton: false
    });
    $.get(FRANZ_SERVER + "auth/info-lib/?app=bdcsc&name=company", function (companies) {
        for (var i = 0; i < companies.length; i++) {
            var company = companies[i];
            company["info"] = eval("(" + company["info"] + ")");
            COMPANIES.push(company);
        }
        $.get(FRANZ_SERVER + "auth/admin/list/", function (resp) {
            for (var i = 0; i < resp.length; i++) {
                var user = resp[i];
                if (user["misc"] == null) user["misc"] = {};
                var html = "<tr>";
                html += "<td>" + user["username"] + "</td>";
                var company = "N/A";
                for (var j = 0; j < COMPANIES.length; j++) {
                    if (user["misc"]["bdcsc_company"] == COMPANIES[j]["id"]) {
                        company = COMPANIES[j]["info"]["name"];
                        break;
                    }
                }
                html += "<td>" + company + "</td>";
                html += "<td>" + convert_django_time(user["register_time"]) + "</td>";
                html += "<td>" + convert_django_time(user["last_login"]) + "</td>";
                var ban_btn = "<button class='btn btn-xs btn-danger' onclick=\"ban_user('" + user["username"] + "','True');\"><i class='fa fa-ban'></i> 注销</button>";
                if (user["banned"]) ban_btn = "<button class='btn btn-xs btn-success' onclick=\"ban_user('" + user["username"] + "','False');\"><i class='fa fa-undo'></i> 取消注销</button>";
                html += "<td>" + ban_btn + "</td>";
                html += "</tr>";
                $("#table-users tbody").append(html);
            }
            $("#table-users").DataTable({language: DT_LANG});
            bootbox.hideAll();
        });
    });
});

function ban_user(username, banned) {
    bootbox.dialog({
        message: loading_message("载入中..."),
        closeButton: false
    });
    $.ajax({
        type: "PUT",
        dataType: "json",
        url: FRANZ_SERVER + "auth/admin/modify-user/",
        data: {
            username: username,
            field: "banned",
            value: banned
        },
        complete: function (xhr, ajaxOptions, thrownError) {
            if (xhr.status >= 200 && xhr.status < 300) {
                bootbox.hideAll();
                bootbox.alert(success_message("注销 / 取消注销账户成功！"), function () {
                    location.reload();
                });
            } else {
                bootbox.hideAll();
                bootbox.alert(error_message("注销 / 取消注销账户失败！"), function () {
                    location.reload();
                });
            }
        }
    });
}

function register() {
    var html = "<div class='form-group'>";
    html += "<div class='input-group'>";
    html += "<span class='input-group-addon'>用户名</span>";
    html += "<input id='register-username' class='form-control' placeholder='仅支持英文、数字、下划线'/>";
    html += "</div>";
    html += "</div>";
    html += "<div class='form-group'>";
    html += "<div class='input-group'>";
    html += "<span class='input-group-addon'>保险公司</span>";
    html += "<select id='register-company' class='form-control'>";
    for (var i = 0; i < COMPANIES.length; i++) {
        html += "<option value='" + COMPANIES[i]["id"] + "'>" + COMPANIES[i]["info"]["name"] + "</option>";
    }
    html += "</select>";
    html += "</div>";
    html += "</div>";
    bootbox.dialog({
        title: "注册账户",
        message: html,
        buttons: {
            "确定": function () {
                bootbox.dialog({
                    message: loading_message("载入中..."),
                    closeButton: false
                });
                var username = $("#register-username").val();
                var company = $("#register-company").val();
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
                            $.ajax({
                                type: "POST",
                                dataType: "json",
                                url: FRANZ_SERVER + "auth/admin/modify-misc/",
                                data: {
                                    username: username,
                                    field: "bdcsc_company",
                                    value: company
                                },
                                complete: function (xhr, ajaxOptions, thrownError) {
                                    if (xhr.status >= 200 && xhr.status < 300) {
                                        bootbox.hideAll();
                                        bootbox.alert("<p>" + success_message("注册账户成功！") + "</p><pre>用户名：" + username + "<br/>密码：" + password_plain + "</pre>", function () {
                                            location.reload();
                                        });
                                    } else {
                                        bootbox.hideAll();
                                        bootbox.alert(error_message("注册账户成功，但绑定保险公司失败！"), function () {
                                            location.reload();
                                        });
                                    }
                                }
                            });
                        } else {
                            bootbox.hideAll();
                            bootbox.alert(error_message("注册账户失败！"), function () {
                                location.reload();
                            });
                        }
                    }
                });
            }
        }
    });
}
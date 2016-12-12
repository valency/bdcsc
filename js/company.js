$(document).ready(function () {
    auth_check();
    $("#menu-4").addClass("active");
    bootbox.dialog({
        message: loading_message("载入中..."),
        closeButton: false
    });
    $.get(FRANZ_SERVER + "auth/info-lib/?app=bdcsc&name=company", function (resp) {
        for (var i = 0; i < resp.length; i++) {
            var company = resp[i];
            var info = eval("(" + company["info"] + ")");
            var html = "<tr>";
            html += "<td>" + info["name"] + "</td>";
            html += "<td>" + info["code"] + "</td>";
            html += "<td>" + info["key"] + "</td>";
            html += "<td>" + info["secret"] + "</td>";
            html += "<td><a href=\"javascript:company_delete('" + company["id"] + "')\" class='btn btn-xs btn-danger'><i class='fa fa-trash'></i> 删除</a></td>";
            html += "</tr>";
            $("#table-companies tbody").append(html);
        }
        $("#table-companies").DataTable({
            language: DT_LANG,
            stateSave: true,
            columnDefs: [{
                orderable: false,
                targets: 4
            }]
        });
        bootbox.hideAll();
    });
});

function company_add() {
    var html = "<div class='form-group'>";
    html += "<div class='input-group'>";
    html += "<span class='input-group-addon'>保险公司名字</span>";
    html += "<input id='company-add-name' class='form-control'/>";
    html += "</div>";
    html += "</div>";
    html += "<div class='form-group'>";
    html += "<div class='input-group'>";
    html += "<span class='input-group-addon'>保险公司标识符</span>";
    html += "<input id='company-add-code' class='form-control'/>";
    html += "</div>";
    html += "</div>";
    html += "<div class='form-group'>";
    html += "<div class='input-group'>";
    html += "<span class='input-group-addon'>授权码</span>";
    html += "<input id='company-add-key' class='form-control'/>";
    html += "</div>";
    html += "</div>";
    html += "<div class='form-group'>";
    html += "<div class='input-group'>";
    html += "<span class='input-group-addon'>授权码秘钥</span>";
    html += "<input id='company-add-secret' class='form-control'/>";
    html += "</div>";
    html += "</div>";
    bootbox.dialog({
        title: "新增保险公司",
        message: html,
        buttons: {
            "确定": function () {
                bootbox.hideAll();
                bootbox.dialog({
                    message: loading_message("载入中..."),
                    closeButton: false
                });
                var company_name = $("#company-add-name").val();
                var company_code = $("#company-add-code").val();
                var company_key = $("#company-add-key").val();
                var company_secret = $("#company-add-secret").val();
                if (is_empty(company_name) || is_empty(company_code) || is_empty(company_key) || is_empty(company_secret)) {
                    bootbox.hideAll();
                    bootbox.alert(error_message("新增保险公司失败，任何信息都不能为空！"), function () {
                        location.reload();
                    });
                } else {
                    var info = {
                        name: company_name,
                        code: company_code,
                        key: company_key,
                        secret: company_secret
                    };
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: FRANZ_SERVER + "auth/info-lib/",
                        data: {
                            app: "bdcsc",
                            name: "company",
                            info: JSON.stringify(info)
                        },
                        complete: function (xhr, ajaxOptions, thrownError) {
                            if (xhr.status >= 200 && xhr.status < 300) {
                                bootbox.hideAll();
                                bootbox.alert(success_message("新增保险公司成功！"), function () {
                                    location.reload();
                                });
                            } else {
                                bootbox.hideAll();
                                bootbox.alert(error_message("新增保险公司失败！"), function () {
                                    location.reload();
                                });
                            }
                        }
                    });
                }
            }
        }
    }).on("shown.bs.modal", function () {
        $("#company-add-name").on("blur", function () {
            $("#company-add-code").val(CryptoJS.MD5($("#company-add-name").val()).toString());
        });
    });
}

function company_delete(id) {
    bootbox.confirm(warning_message("确定要删除该保险公司吗？此过程无法恢复。"), function (confirmation) {
        if (confirmation) {
            bootbox.dialog({
                message: loading_message("载入中..."),
                closeButton: false
            });
            $.ajax({
                type: "DELETE",
                dataType: "json",
                url: FRANZ_SERVER + "auth/info-lib/",
                data: {
                    id: id
                },
                complete: function (xhr, ajaxOptions, thrownError) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        bootbox.hideAll();
                        bootbox.alert(success_message("删除保险公司成功！"), function () {
                            location.reload();
                        });
                    } else {
                        bootbox.hideAll();
                        bootbox.alert(error_message("新增保险公司失败！"), function () {
                            location.reload();
                        });
                    }
                }
            });
        }
    });
}
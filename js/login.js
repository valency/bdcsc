function login() {
    bootbox.dialog({
        message: loading_message("载入中..."),
        closeButton: false
    });
    var username = $("#username").val();
    var password = CryptoJS.MD5($("#password").val()).toString();
    $.ajax({
        type: "GET",
        dataType: "json",
        url: FRANZ_SERVER + "auth/login/",
        data: {
            username: username,
            password: password
        },
        success: function (data) {
            Cookies.set('franz_username', username);
            Cookies.set('franz_ticket', data["ticket"]);
            $.get(FRANZ_SERVER + "auth/detail/", function (data) {
                if (data["misc"] != undefined && data["misc"]["bdcsc_company"] != undefined) {
                    $.get(FRANZ_SERVER + "auth/info-lib/?id=" + data["misc"]["bdcsc_company"], function (company) {
                        var info = company["info"];
                        Cookies.set('bdcsc-key', info["key"]);
                        Cookies.set('bdcsc-code', info["code"]);
                        $.get(API_SERVER + "system/publicKey.json?apiKey=" + info["key"], function (resp) {
                            var auth_code = resp["data"];
                            var sign = CryptoJS.MD5(info["key"] + info["secret"] + auth_code).toString();
                            $.get(API_SERVER + "system/token.json?apiKey=" + info["key"] + "&authCode=" + auth_code + "&sign=" + sign, function (resp) {
                                Cookies.set("bdcsc-token", resp["data"]["token"], {expires: resp["data"]["validTime"]});
                                var r = get_url_parameter("callback");
                                if (r == undefined || r == null) r = ".";
                                location.href = r;
                            });
                        }).fail(function () {
                            bootbox.hideAll();
                            bootbox.alert(error_message("无法登录：授权服务器没有响应！"));
                        });
                    }).fail(function () {
                        bootbox.hideAll();
                        bootbox.alert(error_message("无法登录：无法读取用户所属的保险公司！"));
                    });
                } else {
                    bootbox.hideAll();
                    bootbox.alert(error_message("无法登录：该用户没有所属的保险公司，无法访问本系统！"));
                }
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            switch (xhr.status) {
                case 401:
                    var error_msg = "无法登录：用户名或密码错误！";
                    break;
                case 403:
                    error_msg = "无法登录：该用户禁止访问本系统！";
                    break;
                case 406:
                    error_msg = "无法登录：用户名或密码不符合规范！";
                    break;
                default:
                    error_msg = "无法登录：验证服务器无响应！";
            }
            bootbox.hideAll();
            bootbox.alert(error_message(error_msg));
        }
    });
}

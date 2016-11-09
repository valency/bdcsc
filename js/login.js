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
                if (data["misc"] != undefined && data["misc"]["bdcsc_key"] != undefined) {
                    var bdcsc_key = data["misc"]["bdcsc_key"].split(",");
                    Cookies.set('bdcsc-key', bdcsc_key[0]);
                    $.get(API_SERVER + "system/publicKey.json?apiKey=" + bdcsc_key[0], function (resp) {
                        var auth_code = resp["data"];
                        var sign = CryptoJS.MD5(bdcsc_key[0] + bdcsc_key[1] + auth_code).toString();
                        $.get(API_SERVER + "system/token.json?apiKey=" + bdcsc_key[0] + "&authCode=" + auth_code + "&sign=" + sign, function (resp) {
                            Cookies.set("bdcsc-token", resp["data"]["token"], {expires: resp["data"]["validTime"]});
                            var r = get_url_parameter("callback");
                            if (r == undefined || r == null) r = ".";
                            window.location.href = r;
                        });
                    }).fail(function () {
                        bootbox.hideAll();
                        bootbox.alert(error_message("授权服务器没有响应，无法登录！"));
                    });
                } else {
                    bootbox.hideAll();
                    bootbox.alert(error_message("该用户禁止访问本系统！"));
                }
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            switch (xhr.status) {
                case 401:
                    var error_msg = "用户名或密码错误！";
                    break;
                case 406:
                    error_msg = "用户名或密码错误！";
                    break;
                default:
                    error_msg = "验证服务器无响应！";
            }
            bootbox.hideAll();
            bootbox.alert(error_message(error_msg));
        }
    });
}
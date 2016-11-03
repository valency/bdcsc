function login() {
    bootbox.dialog({
        message: loading_message("载入中..."),
        closeButton: false
    });
    if (CryptoJS.MD5($("#username").val()).toString() == $("#password").val()) {
        $.get(API_SERVER + "system/publicKey.json?apiKey=" + API_KEY, function (resp) {
            var auth_code = resp["data"];
            var sign = CryptoJS.MD5(API_KEY + API_PASSWORD + auth_code).toString();
            $.get(API_SERVER + "system/token.json?apiKey=" + API_KEY + "&authCode=" + auth_code + "&sign=" + sign, function (resp) {
                $.cookie("bdcsc-token", resp["data"]["token"], {expires: resp["data"]["validTime"]});
                location.href = "demo.php";
            });
        });
    } else {
        bootbox.hideAll();
        bootbox.alert("用户名或密码错误，请重新输入！");
    }
}
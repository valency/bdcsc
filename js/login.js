function login() {
    bootbox.dialog({
        message: loading_message('载入中...'),
        closeButton: false
    });
    var username = $('#username').val();
    var password = CryptoJS.MD5($('#password').val()).toString();
    Cookies.set('franz_username', username);
    Cookies.set('franz_ticket', password);
    var info = {
        key: '',
        secret: '',
        code: ''
    };
    Cookies.set('bdcsc-key', info['key']);
    Cookies.set('bdcsc-code', info['code']);
    $.get(API_SERVER + 'system/publicKey.json?apiKey=' + info['key'], function (resp) {
        var auth_code = resp['data'];
        var sign = CryptoJS.MD5(info['key'] + info['secret'] + auth_code).toString();
        $.get(API_SERVER + 'system/token.json?apiKey=' + info['key'] + '&authCode=' + auth_code + '&sign=' + sign, function (resp) {
            Cookies.set('bdcsc-token', resp['data']['token'], {expires: resp['data']['validTime']});
            var r = get_url_parameter('callback');
            if (r == undefined || r == null) r = '.';
            location.href = r;
        });
    }).fail(function () {
        bootbox.hideAll();
        bootbox.alert(error_message('无法登录：授权服务器没有响应！'));
    });
}
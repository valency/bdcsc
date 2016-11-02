$(document).ready(function () {
    if ($.cookie("bdcsc-token") != undefined) {
        $("#div-login").html("<div class='alert alert-dismissible alert-info'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>LOADED</strong> " + $.cookie("bdcsc-token") + " <a href='javascript:logout()'>REVOKE</a></div>");
        $("#div-list").removeClass("hidden");
        $("#div-form").removeClass("hidden");
    }
    api_switch();
    $("#select-api").on("change", function () {
        api_switch();
    });
});

function login() {
    $.get(API_SERVER + "system/publicKey.json?apiKey=" + API_KEY, function (resp) {
        var auth_code = resp["data"];
        var sign = CryptoJS.MD5(API_KEY + API_PASSWORD + auth_code).toString();
        $.get(API_SERVER + "system/token.json?apiKey=" + API_KEY + "&authCode=" + auth_code + "&sign=" + sign, function (resp) {
            $.cookie("bdcsc-token", resp["data"]["token"], {expires: resp["data"]["validTime"]});
            $("#div-login").html("<div class='alert alert-dismissible alert-success'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>" + resp["status"] + "</strong> " + $.cookie("bdcsc-token") + "</div>");
            $("#div-list").removeClass("hidden");
            $("#div-form").removeClass("hidden");
        });
    });
}

function logout() {
    $.removeCookie("bdcsc-token");
    location.reload();
}

function api_switch() {
    var params = API_LIST[$("#select-api").val()];
    if (params.length > 0) $("#div-params").html("");
    else $("#div-params").html("<div class='form-group'><div class='col-md-10 col-md-offset-2'>无需任何参数</div></div>");
    for (var i = 0; i < params.length; i++) {
        var html = "<div class='form-group'>";
        html += "<label for='input-" + params[i]["id"] + "' class='col-md-2 control-label'>" + params[i]["name"] + "</label>";
        html += "<div class='col-md-10'>";
        html += "<input type='text' class='form-control' id='input-" + params[i]["id"] + "' placeholder='" + params[i]["example"] + "'>";
        html += "</div>";
        html += "</div>";
        $("#div-params").prepend(html);
    }
}

function api_request() {
    var params = API_LIST[$("#select-api").val()];
    var m = [];
    for (var i = 0; i < params.length; i++) {
        m.push(params[i]["id"] + "=" + $("#input-" + params[i]["id"]).val());
    }
    $("#div-result").html("Loading...");
    $("#div-result").removeClass("hidden");
    $.get(API_SERVER + "hawk/hawk-service/" + $("#select-api").val() + "/" + API_KEY + "/" + $.cookie("bdcsc-token") + ".json?" + m.join("&"), function (resp) {
        $("#div-result").html(syntax_highlight(resp));
    }).fail(function (resp) {
        resp = eval("(" + resp["responseText"] + ")");
        $("#div-result").html("<span class='text-danger'><strong>" + resp["code"] + "</strong> " + resp["message"] + "</span>");
    });
}
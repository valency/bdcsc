bootbox.setLocale("zh_CN");

Math.factorial = function (n) {
    n = Number(n);
    if (isNaN(n)) {
        return null;
    } else if (n < 2) {
        return 1;
    } else {
        return (n * Math.factorial(n - 1));
    }
};

Math.combination = function (n, r) {
    return Math.factorial(n) / (Math.factorial(r) * Math.factorial(n - r));
};

function success_message(msg) {
    return "<span class='text-success'><i class='fa fa-check-circle'></i> " + msg + "</span>";
}

function error_message(msg) {
    return "<span class='text-danger'><i class='fa fa-times-circle'></i> " + msg + "</span>";
}

function warning_message(msg) {
    return "<span class='text-warning'><i class='fa fa-exclamation-circle'></i> " + msg + "</span>";
}

function loading_message(msg) {
    return "<span class='text-info'><i class='fa fa-spinner'></i> " + msg + "</span>";
}

function get_url_parameter(p) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == p) {
            return sParameterName[1];
        }
    }
}

function syntax_highlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

function convert_django_time(t) {
    if (t != null) return t.substring(0, 19).replace("T", " ");
    else return null;
}

function api_logging(api_type, api_request, api_response) {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: FRANZ_SERVER + "auth/log/",
        data: {
            app: "bdcsc",
            type: api_type,
            request: api_request,
            response: api_response
        }
    });
}

function is_empty(s) {
    return s == null || s == undefined || s == "";
}


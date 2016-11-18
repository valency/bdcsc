$(document).ready(function () {
    auth_check();
    $("#menu-4").addClass("active");
    bootbox.dialog({
        message: loading_message("载入中..."),
        closeButton: false
    });
    $.get(FRANZ_SERVER + "auth/log/?app=bdcsc", function (resp) {
        for (var i = 0; i < resp.length; i++) {
            var log = resp[i];
            var html = "<tr>";
            html += "<td>" + log["account"] + "</td>";
            html += "<td>" + convert_django_time(log["t"]) + "</td>";
            html += "<td>" + log["type"] + "</td>";
            html += "<td>" + log["request"].replace(/&/g, "<br/>").replace(/=/g, " = ") + "</td>";
            html += "<td>" + log["response"] + "</td>";
            html += "</tr>";
            $("#table-logs tbody").append(html);
        }
        $("#table-logs").DataTable({language: DT_LANG});
        bootbox.hideAll();
    });
});

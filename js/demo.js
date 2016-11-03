$(document).ready(function () {
    auth_check();
    var p = get_url_parameter("f");
    if (p == undefined || p == null || p == "") p = 0;
    else p = parseInt(p);
    $("#menu-" + p).addClass("active");
    for (var i = 0; i < 4; i++) {
        if (i != p) $(".api-group-" + i).remove();
    }
    api_switch();
    $("#select-api").on("change", function () {
        api_switch();
    });
});

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
    var api_id = $("#select-api").val();
    var params = API_LIST[api_id];
    var m = [];
    for (var i = 0; i < params.length; i++) {
        m.push(params[i]["id"] + "=" + $("#input-" + params[i]["id"]).val());
    }
    var result_pane = $("#div-result");
    result_pane.html(loading_message("载入中..."));
    $.get(API_SERVER + "hawk/hawk-service/" + api_id + "/" + API_KEY + "/" + $.cookie("bdcsc-token") + ".json?" + m.join("&"), function (resp) {
        var v = resp["data"]["value"];
        switch (api_id) {
            case "blacklistInfo":
                result_pane.html(create_table_from_csv(v, ["欺诈号码", "保险公司标识"]));
                $("#result-table").DataTable({language: DT_LANG});
                break;
            case "blacklistStatus":
                if (v == "true") var r = error_message("涉嫌欺诈");
                else r = success_message("没有涉嫌欺诈");
                result_pane.html("<pre>" + r + "</pre>");
                break;
            case "closeRelationshipInfo":
                result_pane.html(create_table_from_csv(v, ["号码 A", "号码 B", "密切程度"]));
                $("#result-table").DataTable({language: DT_LANG});
                break;
            case "fraudScore":
                result_pane.html("<pre>当前查询号码的欺诈可能性评分：" + v + "</pre>");
                break;
            case "gangDetectionInfo":
                var header = ["号码 A", "号码 B", "成员间的关系密切度"];
                var html = "<table id='result-table' class='table table-striped table-hover'>";
                html += "<thead><tr>";
                for (var i = 0; i < header.length; i++) {
                    html += "<th>" + header[i] + "</th>";
                }
                html += "</tr></thead><tbody>";
                var rows = v.split("\n");
                for (i = 0; i < rows.length - 1; i++) {
                    html += "<tr>";
                    var cols = rows[i].split(",");
                    for (var j = 0; j < cols.length; j++) {
                        html += "<td>" + cols[j] + "</td>";
                    }
                    html += "</tr>";
                }
                html += "</tbody></table>";
                result_pane.html("<pre>欺诈团伙的可能性评分：" + rows[rows.length - 1] + "</pre><hr/>" + html);
                $("#result-table").DataTable({language: DT_LANG});
                break;
            case "fraudDetectionInfo":
                if (v == "true") r = error_message("存在欺诈倾向");
                else r = success_message("不存在欺诈倾向");
                result_pane.html("<pre>" + r + "</pre>");
                break;
            default:
                result_pane.html("<pre>" + syntax_highlight(resp) + "</pre>");
        }
    }).fail(function (resp) {
        resp = eval("(" + resp["responseText"] + ")");
        result_pane.html("<span class='text-danger'><strong>" + resp["code"] + "</strong> " + resp["message"] + "</span>");
    });
}

function create_table_from_csv(csv, header) {
    var html = "<table id='result-table' class='table table-striped table-hover'>";
    html += "<thead><tr>";
    for (var i = 0; i < header.length; i++) {
        html += "<th>" + header[i] + "</th>";
    }
    html += "</tr></thead><tbody>";
    var rows = csv.split("\n");
    for (i = 0; i < rows.length; i++) {
        html += "<tr>";
        var cols = rows[i].split(",");
        for (var j = 0; j < cols.length; j++) {
            html += "<td>" + cols[j] + "</td>";
        }
        html += "</tr>";
    }
    html += "</tbody></table>";
    return html;
}
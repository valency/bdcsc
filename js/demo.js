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
    // $.get(API_SERVER + "hawk/hawk-service/" + api_id + "/" + API_KEY + "/" + $.cookie("bdcsc-token") + ".json?" + m.join("&"), function (resp) {
    //     var v = resp["data"]["value"];
    switch (api_id) {
        case "blacklistStatus":
            var v = "true\n车主,1,3,2100.0";
            var vv = v.split("\n");
            if (vv[0] == "true") {
                vv[1] = vv[1].split(",");
                var r = error_message("涉嫌欺诈");
                r += "<ul>";
                r += "<li><b>当前黑名单用户的理赔角色：</b>" + vv[1][0] + "</li>";
                r += "<li><b>当前黑名单用户的持有保单数量：</b>" + vv[1][1] + "</li>";
                r += "<li><b>当前黑名单用户的历史出险次数：</b>" + vv[1][2] + "</li>";
                r += "<li><b>当前黑名单用户的历史赔付金额：</b>" + vv[1][3] + "</li>";
                r += "</ul>";
            } else r = success_message("没有涉嫌欺诈");
            result_pane.html("<pre>" + r + "</pre>");
            break;
        case "fraudScore":
            v = "0.165027";
            result_pane.html("<pre><b>当前查询号码的欺诈可能性评分：</b>" + v + "</pre><div class='echart'></div>");
            echarts.init($(".echart")[0]).setOption({
                series: [{
                    type: 'gauge',
                    detail: {formatter: '{value}%'},
                    data: [{name: "欺诈评分", value: (parseFloat(v) * 100.0).toFixed(2)}]
                }]
            });
            break;
        case "gangDetectionInfo":
            v = "3\n1,2,0.082514\n1,3,0.000000\n2,3,0.000000\n0.082514";
            result_pane.html("<div class='echart-half'></div><div class='echart-half'></div>");
            // var header = ["号码 A", "号码 B", "成员间的关系密切度"];
            // var html = "<table id='result-table' class='table table-striped table-hover'>";
            // html += "<thead><tr>";
            // for (i = 0; i < header.length; i++) {
            //     html += "<th>" + header[i] + "</th>";
            // }
            // html += "</tr></thead><tbody>";
            // var rows = v.split("\n");
            // for (i = 0; i < rows.length - 1; i++) {
            //     html += "<tr>";
            //     var cols = rows[i].split(",");
            //     for (var j = 0; j < cols.length; j++) {
            //         html += "<td>" + cols[j] + "</td>";
            //     }
            //     html += "</tr>";
            // }
            // html += "</tbody></table>";
            // result_pane.html("<pre>欺诈团伙的可能性评分：" + rows[rows.length - 1] + "</pre><hr/>" + html);
            // $("#result-table").DataTable({language: DT_LANG});
            break;
        case "fraudDetectionInfo":
            v = "false\n1\n定损员,1,3,2100.0";
            var rows = v.split("\n");
            if (rows[0] == "true") {
                result_pane.html("<pre>" + success_message("无欺诈倾向") + "</pre>");
            } else {
                var header = ["理赔角色", "持有保单数量", "历史出险次数", "历史赔付金额"];
                var html = "<table id='result-table' class='table table-striped table-hover'>";
                html += "<thead><tr>";
                for (i = 0; i < header.length; i++) {
                    html += "<th>" + header[i] + "</th>";
                }
                html += "</tr></thead><tbody>";
                for (i = 2; i < rows.length; i++) {
                    html += "<tr>";
                    var cols = rows[i].split(",");
                    for (var j = 0; j < cols.length; j++) {
                        html += "<td>" + cols[j] + "</td>";
                    }
                    html += "</tr>";
                }
                html += "</tbody></table>";
                result_pane.html("<pre>" + error_message("存在欺诈倾向") + "\n<b>与所查询号码关系密切的黑名单用户数量：</b>" + rows[1] + "</pre><hr/>" + html);
                $("#result-table").DataTable({language: DT_LANG});
            }
            break;
        default:
            result_pane.html("<pre>" + syntax_highlight(resp) + "</pre>");
    }
    // }).fail(function (resp) {
    //     resp = eval("(" + resp["responseText"] + ")");
    //     result_pane.html("<span class='text-danger'><strong>" + resp["code"] + "</strong> " + resp["message"] + "</span>");
    // });
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
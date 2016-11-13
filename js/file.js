$(document).ready(function () {
    auth_check();
    $("#menu-4").addClass("active");
    $('#file-upload').fileupload({
        acceptFileTypes: /(\.|\/)(csv)$/i,
        maxFileSize: 2000,
        done: function (e, data) {
            setTimeout(function () {
                location.reload();
            }, 1000);
        },
        submit: function (e, data) {
            bootbox.dialog({
                message: "<div class='progress' style='margin-bottom:0;'><div class='progress-bar' style='width:0;'></div></div>",
                closeButton: false
            });
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $(".progress-bar").css('width', progress + '%');
        },
        processfail: function (e, data) {
            bootbox.alert("<p>" + error_message("以下文件上传失败：") + "</p><pre>" + data.files[data.index].name + "</pre><p>" + error_message("错误原因：") + "</p><pre>" + data.files[data.index].error + "</pre>");
        }
    });
    $("#table-files").DataTable({language: DT_LANG, stateSave: true});
});

function delete_file(file) {
    bootbox.confirm(warning_message("确定要删除该文件吗？此过程无法恢复。"), function (confirmation) {
        if (confirmation) {
            $.ajax({
                type: "DELETE",
                url: "data/index.php?file=" + file,
                dataType: "json",
                complete: function (data) {
                    location.reload();
                }
            });
        }
    });
}

function send_file(file) {
    var ic_key = "ebd6d25b908209d546d46ef11951b11f";
    bootbox.dialog({
        message: loading_message("载入中..."),
        closeButton: false
    });
    $.get("data/" + file, function (resp) {
        resp = resp.replace(/\r/g, "");
        resp = resp.replace(/\n/g, "%3B");
        $.get(API_SERVER + "hawk/hawk-service/_setBlacklistInfo/" + Cookies.get("bdcsc-key") + "/" + Cookies.get("bdcsc-token") + ".json?insuranceCompanyKey=" + ic_key + "&blacklist=" + resp, function (resp) {
            bootbox.hideAll();
            bootbox.alert(success_message("传输数据成功！"));
        }).fail(function (resp) {
            bootbox.hideAll();
            bootbox.alert(error_message("传输数据失败！"));
        });
    });
}
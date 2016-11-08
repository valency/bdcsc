$(document).ready(function () {
    auth_check();
    $("#menu-4").addClass("active");
    $('#file-upload').fileupload({
        dataType: 'json',
        acceptFileTypes: '/(\.|\/)(csv|txt)$/i',
        done: function (e, data) {
            setTimeout(function () {
                window.location.reload();
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
    bootbox.dialog({
        message: loading_message("载入中..."),
        closeButton: false
    });
    bootbox.hideAll();
    bootbox.alert(success_message("传输数据成功！"));
}
<html>
<head>
    <?php include_once "lib.php"; ?>
    <title>大数据车险反欺诈系统</title>
    <script type="text/javascript" src="lib/jquery-file-upload-9.10.4/js/vendor/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="lib/jquery-file-upload-9.10.4/js/jquery.iframe-transport.js"></script>
    <script type="text/javascript" src="lib/jquery-file-upload-9.10.4/js/jquery.fileupload.js"></script>
    <script type="text/javascript" src="lib/jquery-file-upload-9.10.4/js/jquery.fileupload-process.js"></script>
    <script type="text/javascript" src="lib/jquery-file-upload-9.10.4/js/jquery.fileupload-validate.js"></script>
<!--    <script type="text/javascript" src="lib/jquery-file-upload-9.10.4/js/jquery.fileupload-ui.js"></script>-->
    <script type="text/javascript" src="js/file.js"></script>
</head>
<body>
<?php include_once "header.php"; ?>
<div class="container">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div>
                <button class="btn btn-primary" type="button" onclick="$('#file-upload').click();">上传文件</button>
                <input id="file-upload" class="hidden" type="file" name="files[]" data-url="./data/" multiple/>
            </div>
            <hr/>
            <table id="table-files" class="table table-hover table-condensed">
                <thead>
                <tr>
                    <th>文件名</th>
                    <th>修改时间</th>
                    <th>文件大小</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <?php if ($handle = opendir('./data/')) {
                    while (false !== ($entry = readdir($handle))) {
                        if (!is_dir('./data/' . $entry) && pathinfo($entry, PATHINFO_EXTENSION) != "php") {
                            echo "<tr>";
                            echo "<td><a href='data/" . $entry . "' target='_blank'><i class='fa fa-file-o'></i> " . $entry . "</a></td>";
                            echo "<td>" . date("Y-m-d H:i:s", filemtime('./data/' . $entry)) . "</td>";
                            echo "<td>" . number_format(filesize('./data/' . $entry)) . "</td>";
                            echo "<td>";
                            echo "<a href=\"javascript:send_file('" . $entry . "')\" class='btn btn-xs btn-primary'><i class='fa fa-send'></i> 加载</a> ";
                            echo "<a href=\"javascript:delete_file('" . $entry . "')\" class='btn btn-xs btn-primary'><i class='fa fa-trash'></i> 删除</a>";
                            echo "</td>";
                            echo "</tr>";
                        }
                    }
                    closedir($handle);
                } ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
<?php include_once "footer.php"; ?>
</body>
</html>
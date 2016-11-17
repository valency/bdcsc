<html>
<head>
    <?php include_once "lib.php"; ?>
    <title>大数据车险反欺诈系统</title>
    <script type="text/javascript" src="js/log.js"></script>
</head>
<body>
<?php include_once "header.php"; ?>
<div class="container">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <table id="table-logs" class="table table-hover table-condensed">
                <thead>
                <tr>
                    <th>用户名</th>
                    <th>访问时间</th>
                    <th>访问目标</th>
<!--                    <th>访问参数</th>-->
                    <th>返回状态</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
</div>
<?php include_once "footer.php"; ?>
</body>
</html>
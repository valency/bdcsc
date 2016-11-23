<html>
<head>
    <?php include_once "lib.php"; ?>
    <title>大数据车险反欺诈系统</title>
    <script type="text/javascript" src="js/user.js"></script>
</head>
<body>
<?php include_once "header.php"; ?>
<div class="container">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div>
                <button class="btn btn-primary" type="button" onclick="register()">注册账户</button>
            </div>
            <hr/>
            <table id="table-users" class="table table-hover table-condensed">
                <thead>
                <tr>
                    <th>用户名</th>
                    <th>保险公司</th>
                    <th>注册时间</th>
                    <th>最近登录时间</th>
                    <th>操作</th>
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
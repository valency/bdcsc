<html>
<head>
    <?php include_once "lib.php"; ?>
    <title>大数据车险反欺诈系统</title>
    <script type="text/javascript" src="js/company.js"></script>
</head>
<body>
<?php include_once "header.php"; ?>
<div class="container">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div>
                <button class="btn btn-primary" type="button" onclick="company_add()">新增保险公司</button>
            </div>
            <hr/>
            <table id="table-companies" class="table table-hover table-condensed">
                <thead>
                <tr>
                    <th>保险公司名字</th>
                    <th>保险公司标识符</th>
                    <th>授权码</th>
                    <th>授权码秘钥</th>
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
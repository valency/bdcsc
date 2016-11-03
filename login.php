<html>
<head>
    <?php include_once "lib.php"; ?>
    <title>大数据车险反欺诈系统</title>
    <link rel="stylesheet" type="text/css" href="css/login.css"/>
    <script type="text/javascript" src="js/login.js"></script>
</head>
<body>
<div class="login">
    <div class="heading">
        <h2>大数据车险反欺诈系统</h2>
        <form action="javascript:login()">
            <div class="input-group input-group-lg">
                <span class="input-group-addon"><i class="fa fa-user"></i></span>
                <input id="username" type="text" class="form-control" placeholder="用户名">
            </div>
            <div class="input-group input-group-lg">
                <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                <input id="password" type="password" class="form-control" placeholder="密码">
            </div>
            <button type="submit" class="float">登录</button>
        </form>
    </div>
</div>
</body>
</html>
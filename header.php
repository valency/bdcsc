<nav class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-navbar-collapse">
                <span class="sr-only">Toggle Navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href=".">大数据车险反欺诈系统</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-navbar-collapse">
            <ul class="nav navbar-nav">
                <li id="menu-0"><a href="demo.php?f=0">黑名单状态查询</a></li>
                <li id="menu-1"><a href="demo.php?f=1">深度欺诈检测</a></li>
                <li id="menu-2"><a href="demo.php?f=2">团伙欺诈检测</a></li>
                <li id="menu-3"><a href="demo.php?f=3">欺诈调查指导</a></li>
                <li id="menu-5"><a href="file.php">黑名单管理</a></li>
                <li id="menu-4" class="dropdown hidden menu-admin">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">系统管理 <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="company.php">保险公司管理</a></li>
                        <li><a href="user.php">用户管理</a></li>
                        <li><a href="log.php">日志管理</a></li>
                    </ul>
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><span class="username"></span> <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="javascript:change_password()"><i class="fa fa-edit"></i> 修改密码</a></li>
                        <li><a href="javascript:auth_logout()"><i class="fa fa-sign-out"></i> 登出</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>
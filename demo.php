<html>
<head>
    <?php include_once "lib.php"; ?>
    <title>BDCSC 2.x 服务 HTTP 接口使用 Demo</title>
    <script type="text/javascript" src="js/demo.js"></script>
</head>
<body>
<?php include_once "header.php"; ?>
<div class="container">
    <div class="row">
        <div class="col-md-12" id="div-login">
            <a class="btn btn-primary" href="javascript:login()">自动授权</a>
        </div>
    </div>
    <div class="row hidden" id="div-list">
        <div class="col-md-12">
            <select class="form-control" id="select-api">
                <option value="blacklistInfo">黑名单建立和快速查询：获取当前欺诈黑名单列表</option>
                <option value="blacklistStatus">黑名单建立和快速查询：查询黑名单状态</option>
                <option value="closeRelationship">深度欺诈检测：关系密切检测</option>
                <option value="fraudScore">深度欺诈检测：深度欺诈检测</option>
                <option value="gangDetectionInfo">团伙欺诈检测：关系密切检测</option>
                <option value="fraudDetectionInfo">欺诈调查指导：欺诈倾向判定</option>
            </select>
        </div>
    </div>
    <hr/>
    <div class="well bs-component hidden" id="div-form">
        <div class="row">
            <div class="col-md-12">
                <div class="form-horizontal">
                    <fieldset>
                        <div id="div-params"></div>
                        <div class="form-group">
                            <div class="col-md-10 col-md-offset-2">
                                <button type="reset" class="btn btn-default">重置</button>
                                <button type="submit" class="btn btn-primary" onclick="api_request();">提交</button>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    </div>
    <pre class="hidden" id="div-result"></pre>
</div>
<?php include_once "footer.php"; ?>
</body>
</html>
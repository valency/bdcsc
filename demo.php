<html>
<head>
    <?php include_once "lib.php"; ?>
    <title>大数据车险反欺诈系统</title>
    <script type="text/javascript" src="js/demo.js"></script>
</head>
<body>
<?php include_once "header.php"; ?>
<div class="container">
    <div class="row" id="div-list">
        <div class="col-md-12">
            <select class="form-control" id="select-api">
                <option class="api-group-0" value="blacklistInfo">黑名单建立和快速查询：获取当前欺诈黑名单列表</option>
                <option class="api-group-0" value="blacklistStatus">黑名单建立和快速查询：查询黑名单状态</option>
                <option class="api-group-1" value="closeRelationshipInfo">深度欺诈检测：关系密切检测</option>
                <option class="api-group-1" value="fraudScore">深度欺诈检测：深度欺诈检测</option>
                <option class="api-group-2" value="gangDetectionInfo">团伙欺诈检测：欺诈团伙判定</option>
                <option class="api-group-3" value="fraudDetectionInfo">欺诈调查指导：欺诈倾向判定</option>
            </select>
        </div>
    </div>
    <hr/>
    <div class="well bs-component" id="div-form">
        <div class="row">
            <div class="col-md-12">
                <form class="form-horizontal" action="javascript:void(0)">
                    <fieldset>
                        <div id="div-params"></div>
                        <div class="form-group">
                            <div class="col-md-10 col-md-offset-2">
                                <button type="reset" class="btn btn-default">重置</button>
                                <button type="submit" class="btn btn-primary" onclick="api_request();">提交</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
    <div id="div-result"></div>
</div>
<?php include_once "footer.php"; ?>
</body>
</html>
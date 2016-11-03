var API_SERVER = "/ext/hawk/";
var API_KEY = "CED0F4070DC331E99237011E24C5045C";
var API_PASSWORD = "BA287672587C4B0C6E52CD6F587CADC0";
var API_LIST = {
    blacklistInfo: [{
        id: "insuranceCompanyKey",
        name: "保险公司标识",
        example: "ebd6d25b908209d546d46ef11951b11f"
    }],
    blacklistStatus: [{
        id: "mdn",
        name: "中国电信手机号",
        example: "13505233543"
    }],
    closeRelationshipInfo: [{
        id: "mdn",
        name: "中国电信手机号",
        example: "18106518081"
    }, {
        id: "province",
        name: "号码省份",
        example: "BJ"
    }, {
        id: "month",
        name: "查询月份",
        example: "201510"
    }],
    fraudScore: [{
        id: "mdn",
        name: "中国电信手机号",
        example: "18988843180"
    },  {
        id: "province",
        name: "号码省份",
        example: "BJ"
    }, {
        id: "month",
        name: "查询月份",
        example: "201510"
    }],
    gangDetectionInfo: [{
        id: "mdnList",
        name: "中国电信手机号列表",
        example: "18106518081,13357162168,13301405212"
    },{
        id: "province",
        name: "号码省份",
        example: "BJ"
    }, {
        id: "month",
        name: "查询月份",
        example: "201510"
    }],
    fraudDetectionInfo: [{
        id: "mdn",
        name: "中国电信手机号",
        example: "18106518081"
    },{
        id: "province",
        name: "号码省份",
        example: "BJ"
    }, {
        id: "month",
        name: "查询月份",
        example: "201510"
    }]
};
var DT_LANG = {
    "sProcessing": "处理中...",
    "sLengthMenu": "显示 _MENU_ 项结果",
    "sZeroRecords": "没有匹配结果",
    "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
    "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
    "sInfoPostFix": "",
    "sSearch": "搜索:",
    "sUrl": "",
    "sEmptyTable": "表中数据为空",
    "sLoadingRecords": "载入中...",
    "sInfoThousands": ",",
    "oPaginate": {
        "sFirst": "首页",
        "sPrevious": "上页",
        "sNext": "下页",
        "sLast": "末页"
    },
    "oAria": {
        "sSortAscending": ": 以升序排列此列",
        "sSortDescending": ": 以降序排列此列"
    }
};

$(document).ready(function () {
    $.get("http://42.123.72.93:18080/restful/system/publicKey.xml?apiKey=CED0F4070DC331E99237011E24C5045C", function (resp) {
        console.log(resp);
    })
});

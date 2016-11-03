function auth_check(callback) {
    if ($.cookie("bdcsc-token") != undefined) {
        if (callback) callback();
    } else {
        location.href = "login.php";
    }
}

function auth_logout() {
    $.removeCookie("bdcsc-token");
    location.href = "login.php";
}
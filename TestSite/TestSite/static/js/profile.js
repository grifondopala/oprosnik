let loginInput = document.querySelector('#user_login');

function GetCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
}
function Quit(){
    document.cookie = "login=<login>; expires=Thu, 01 Jan 1969 00:00:00 GMT;";
    window.location.href = '/';
}

let quit_button = document.querySelector('#quit_button')

loginInput.value = GetCookie('login');
quit_button.addEventListener("click", Quit);
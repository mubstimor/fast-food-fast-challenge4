var token = window.sessionStorage.getItem('token');
var last_loggedin = window.sessionStorage.getItem('last_loggedIn');

var now = new Date()
var difference = Math.floor((now - last_loggedin) / (1000*60*60*24))

if (token == ""){
    redirect:window.location.replace('../home.html?token=null')
}

if (difference > 1){
    redirect:window.location.replace('../home.html?token=expired')
}

function Logout() {
    sessionStorage.clear();
    alert('Storage Cleared');
    $("#logoutform").hide();
    $("#loginform").show();
    init();
  }
  
function Login() {
    var data = {
        email: $("#username").val(),
        password: $("#password").val()
  
    };
    console.log(data);
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8001/api/users/login',
        contentType: 'application/JSON; charset=utf-8',
        data: JSON.stringify({user: data}),
        success: funcSuccess,
        error: funcFail
    });
    function funcSuccess(res) {
        sessionStorage.setItem('status', 'loggedIn');
        sessionStorage.setItem('Token', res.user.token);
        sessionStorage.setItem('email', res.user.email);
        sessionStorage.setItem('uid', res.user._id);
  
        $("#logoutform").show();
        console.log("success");
        console.log(sessionStorage);
        $("#loginform").hide();
    }
    function funcFail() {
      console.log("failed");
      alert('Login Failed'); 
    };
    init();
    return false;
  };
  
function init(){
    if (sessionStorage.getItem('status')) {
        $("#logoutform").show();
        $("#loginform").hide();
    } else {
        $("#logoutform").hide();
        $("#loginform").show();
    }
    $('#myloginform').submit(function(e) {
        e.preventDefault();
        alert('Form submitted!');
        Login();
        return false;
    });
    $('#mylogoutform').submit(function(e) {
        e.preventDefault();
        Logout();
        return false;
    });
};

  window.onload = init;
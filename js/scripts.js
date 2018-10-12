/**
 * Created by timothymubiru on 31/08/2018.
 * Updated on 12/10/2018.
 */
function status(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  }
  
function json(response) {
    return response.json()
}

function user_login(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if(email == "" || password == "")
    {
        document.getElementById("alert-box").innerHTML = "Please fill the entire form";
    }else
    {
        var loginInfo = {
            email: email,
            password: password
            };
            
        fetch('https://tims-fast-food.herokuapp.com/api/v1/auth/login', {
        method: 'post',
        headers:{
            "Content-Type": "application/json"
        },
        mode: 'cors',
        body: JSON.stringify(loginInfo)
        })
        .then(json)
        .then(function (data) {
            console.log('Request succeeded with JSON response', data);
            if (data['ok']== true)
            {
                window.sessionStorage.setItem('token', data['data']['token']);
                if (data['data']['role'] == 'Admin')
                {
                    redirect:window.location.replace('admin/index.html')
                }
                else
                {
                    redirect:window.location.replace('customer/index.html')
                }
            }else
            {
                document.getElementById("alert-box").innerHTML = "Invalid login details";
            }
        })
        .catch(function (error) {
            console.log('Request failed', error);
        });

    } 
}

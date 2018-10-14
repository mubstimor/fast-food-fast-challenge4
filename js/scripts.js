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

    document.getElementById("alert-box").innerHTML = "Logging in";

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

function user_signup(){
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirm_password = document.getElementById("password_confirm").value;
    var gender =  document.getElementById('gender');
    var selectedGender = gender.options[gender.selectedIndex].value;
    var exp = /(\w(=?@)\w+\.{1}[a-zA-Z]{2,})/i
    
    document.getElementById("alert-box").style.display = "block";

    if (exp.test(email) == false){
        document.getElementById("alert-box").innerHTML = "Enter a valid email address";
        return
    }

    if (selectedGender == 'select'){
        document.getElementById("alert-box").innerHTML = "Please select your gender";
        return
    }

    if (password != confirm_password){
        document.getElementById("alert-box").innerHTML = "Passwords do not match";
        return
    }

    if(email == "" || password == "" || name == "")
    {
        document.getElementById("alert-box").innerHTML = "Please fill the entire form";
    }

    var userInfo = {
        name: name,
        email: email,
        password: password,
        gender: selectedGender,
        user_type: 'Customer'
        };
        
    fetch('https://tims-fast-food.herokuapp.com/api/v1/auth/signup', {
    method: 'post',
    headers:{
        "Content-Type": "application/json"
    },
    mode: 'cors',
    body: JSON.stringify(userInfo)
    })
    .then(json)
    .then(function (data) {
        console.log('Request succeeded with JSON response', data);
        if (data['error']== false)
        {
            document.getElementById("alert-box").innerHTML = data['message'];
            document.getElementById("alert-box").innerHTML += " Click <a href='home.html'> here </a> to login";
        }else
        {
            document.getElementById("alert-box").innerHTML = data['message'];
        }
    })
    .catch(function (error) {
        console.log('Request failed', error);
    });
}


function submitClientOrder(){
    var item = document.getElementById("food_id").value;
    var quantity = document.getElementById("mynumber").value;
    
    document.getElementById("alert-box").style.display = "block";
    document.getElementById("alert-box").innerHTML = "Submitting Order"

    if(item == "" || quantity == "")
    {
        document.getElementById("alert-box").innerHTML = "Please select an item to order";
    }

    var orderInfo = {
        item: item,
        quantity: quantity
        };
        
    fetch('https://tims-fast-food.herokuapp.com/api/v1/users/orders', {
    method: 'post',
    headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('token'),
        'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(orderInfo)
    })
    .then(json)
    .then(function (data) {
        console.log('Request succeeded with JSON response', data);
        if (data['error']== false)
        {
            document.getElementById("alert-box").innerHTML = data['message'];
        }else
        {
            document.getElementById("alert-box").innerHTML = data['message'];
        }
    })
    .catch(function (error) {
        console.log('Request failed', error);
    });
}

function addMenuItem(){
    var item = document.getElementById("food").value;
    var price = document.getElementById("price").value;
    var category = document.getElementById("category");
    var selectedCategory = category.options[category.selectedIndex].value;
    
    document.getElementById("alert-box").style.display = "block";
    document.getElementById("alert-box").innerHTML = "Submitting Menu Item"

    if (selectedCategory == 'select'){
        document.getElementById("alert-box").innerHTML = "Please select the item category";
        return
    }

    if(item == "" || price == "")
    {
        document.getElementById("alert-box").innerHTML = "Please fill the entire form";
    }

    var itemInfo = {
        name: item,
        category: selectedCategory,
        price: price
        };
        
    fetch('https://tims-fast-food.herokuapp.com/api/v1/menu', {
    method: 'post',
    headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('token'),
        'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(itemInfo)
    })
    .then(json)
    .then(function (data) {
        console.log('Request succeeded with JSON response', data);
        if (data['error']== false)
        {
            document.getElementById("alert-box").innerHTML = data['message'];
        }else
        {
            document.getElementById("alert-box").innerHTML = data['message'];
        }
    })
    .catch(function (error) {
        console.log('Request failed', error);
    });
}
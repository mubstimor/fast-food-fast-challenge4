/**
 * Created by timothymubiru on 31/08/2018.
 * Updated on 12/10/2018.
 */
function GetSortOrder(prop) {  
    return function(a, b) {  
        if (a[prop] < b[prop]) {  
            return 1;  
        } else if (a[prop] > b[prop]) {  
            return -1;  
        }  
        return 0;  
    }  
}  

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
    document.getElementById("alert-box").innerHTML = "Signing up";

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

function updateClientOrder(orderId){
    var item = document.getElementById("food_id").value;
    var quantity = document.getElementById("mynumber").value;
    
    document.getElementById("alert-box").style.display = "block";
    document.getElementById("alert-box").innerHTML = "Updating Order"

    if(item == "" || quantity == "")
    {
        document.getElementById("alert-box").innerHTML = "Please select an item to order";
    }

    var orderInfo = {
        item: item,
        quantity: quantity,
        status: 'new'
        };
    var url = 'https://tims-fast-food.herokuapp.com/api/v1/users/orders/' + orderId
    fetch(url, {
    method: 'put',
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

function updateMenuItem(itemId){
    var item = document.getElementById("food").value;
    var price = document.getElementById("price").value;
    var category = document.getElementById("category").value;
    
    document.getElementById("alert-box").style.display = "block";
    document.getElementById("alert-box").innerHTML = "Updating Menu Item"

    if(item == "" || price == "" || category == "")
    {
        document.getElementById("alert-box").innerHTML = "Please fill the entire form";
    }

    var itemInfo = {
        name: item,
        category: category,
        price: price
        };
    
    var url = 'https://tims-fast-food.herokuapp.com/api/v1/menu/' + itemId
    fetch(url, {
    method: 'put',
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

function updateOrderStatus(orderId, status){

    document.getElementById("alert-box").innerHTML = "Updating Order status"

    var orderInfo = {
        status: status
        };

    var url = 'https://tims-fast-food.herokuapp.com/api/v1/orders/' + orderId
        
    fetch(url, {
    method: 'put',
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

function cancelUserOrder(orderId){

    document.getElementById("alert-box").innerHTML = "Cancelling Order"

    var orderInfo = {
        status: 'cancelled'
        };

    var url = 'https://tims-fast-food.herokuapp.com/api/v1/users/orders/cancel/' + orderId
        
    fetch(url, {
    method: 'put',
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

function getMenuItems() {
    document.getElementById("alert-box").style.display = 'block';
    document.getElementById("alert-box").innerHTML = 'Loading menu ...';
    return fetch('https://tims-fast-food.herokuapp.com/api/v1/menu', {
    }).then(response => response.json())
    .then(response => {
        console.log('Request succeeded with JSON response', response);
        var count = Object.keys(response['menu']).length;
        var items_div = document.getElementById("fooditems");
        document.getElementById("alert-box").style.display = 'block';
        var new_info = 'Click on the <div class="circle plus"></div> icon to add an item to your order';
        document.getElementById("alert-box").innerHTML = new_info;
        if (count > 0){
            document.getElementById("menu_div").style.visibility = 'visible';
            for(var i=0; i < count; i++)
            {
                var row = '<div class="food_item">';
                row += '<div class="food_image">';
                var img_name = (response['menu'][i]['name']).toLowerCase();
                img_name = img_name.replace(" + ", "_");
                row += '<img src="../img/'+img_name+'.jpg" alt="'+img_name+'" />';
                row += '</div>';
                row += '<div class="food_item_label">';
                row += '<h3><span>' + response['menu'][i]['name'] + '</span></h3>';
                row += '</div>';
                row += '<div class="price-right">';
                row += '<span><a href="#" onclick="item_clicked(\''+ response['menu'][i]['name'] +'\', '+ response['menu'][i]['price'] +','+response['menu'][i]['id']+')">'+ response['menu'][i]['price'] +'Ush';
                row += '<div class="circle plus"></div>';
                row += '</a></span>';
                row += '</div>';
                row += '</div>';
               
                items_div.innerHTML += row;
            }
        }
        else{
            document.getElementById("alert-box").innerHTML = 'No items available to order';
        }
                
    })
    .catch(function (error) {
        console.log('Request failed', error);
    });
}

function item_clicked(food, price, id){
    var foods = []
    document.getElementById("alert-box").innerHTML = "Item added to Your order";
    document.getElementById('default_label').innerHTML='';
    var div_selected = document.getElementById('added_item');

    var data = '<div class="food_item_label">'
                + '<span> '+food+' </span>'
                +'</div>'
                +'<div class="quantity-field">'
                +'Qty: <input type="number" size="10" id="mynumber" name="mynumber" min="1" value="1" />'
                +'</div>'
                +'<div class="new_total">'
                +'<span>' +price +'</span>'
                +'<input type="number" size="10" id="food_id" name="food_id" min="1" value="'+id+'" hidden />'
                +'</div>'
                +'<div class="spacer"></div>';
            
    div_selected.innerHTML = data;        
}
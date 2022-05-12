
function register(){
    let url = '/users/register';
    let username = USER_NAME.value;
    let email = USER_EMAIL.value;
    let password = USER_PASSWORD.value;
    if (username && password && email != ""){
        let body = {user_name: username, email: email, password: password};
        axios.post(url,body)
        .then((result)=>{
            if (result.data){
                sessionStorage.setItem('userId',result.data._id);
                sessionStorage.setItem('userName',result.data.user_name);
                location.href = "../login/login.html";
            }
        })
    }
}


// -------main -------
let USER_NAME = document.getElementById("userName");
let USER_EMAIL = document.getElementById("email");
let USER_PASSWORD = document.getElementById("password");
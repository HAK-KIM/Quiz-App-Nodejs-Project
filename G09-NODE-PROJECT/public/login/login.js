// login request
function login(){
    let user_email = USER_EMAIL.value;
    let password = USER_PASSWORD.value;
    let url = "/users/login";
    if (user_email != "" && password != ""){
        axios.get(url)
        .then((responses)=>{
            let users = responses.data;
            for (let i = 0; i < users.length; i++) {
                if (user_email == users[i].email && password == users[i].password){
                    sessionStorage.setItem("userId", users[i]._id);
                    location.href = "../home/home.html";
                }
            }
        })
    }

}

// ---------main --------
let USER_EMAIL = document.getElementById("email");
let USER_PASSWORD = document.getElementById("password");
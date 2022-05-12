// if user undefine
if (!sessionStorage.userId){
    location.href = "../register/register.html";
}else{
  // get user specific id
  function getUserById(){
      let id = sessionStorage.userId;
      let URL = "http://localhost:80/users/user/"+id;
      axios.get(URL).then((results) => {
        let data = results.data;
        user_name.innerHTML = data[0].user_name
      })
  }
}


let user_name = document.querySelector(".userName");
getUserById();
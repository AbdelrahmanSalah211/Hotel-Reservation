import { initializeUsersData, signin } from "../utility/auth.js";
import { errorsMessage } from "../utility/errorsMessage.js";
const form= document.getElementById("form");
console.log(form);



initializeUsersData();
form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    if(signin(email,password)){
        location.href = "../home/index.html";

    }else{
        console.log("Invalid email or password");
        errorsMessage("Invalid email or password");
    }



}
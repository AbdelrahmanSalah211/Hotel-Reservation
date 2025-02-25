import { signin } from "../utility/auth.js";
const form= document.getElementById("form");
console.log(form);




form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    if(signin(email,password)){
        location.href = "../home/index.html";

    }else{
        console.log("Invalid email or password");
        
        const error = document.querySelector(".error-message");
        error.innerHTML = "";
        error.style.display = "flex";
        const errorSpan = document.createElement("span");
        errorSpan.className = "error";
        error.appendChild(errorSpan);
        errorSpan.innerText = "Invalid email or password";
    }



}
import { validation } from "../utils/forms.js";

const passwordForm = document.getElementById('password-form');




passwordForm.onsubmit = function(e) {
    e.preventDefault();
    const formData = new FormData(passwordForm);
 
    
    if (validation.Password(formData)) {
        if(localStorage.getItem("register-info")){ 
            localStorage.setItem("register-info","");
        }
        window.location.href = "./register-pass.html";
    } else {

        console.error("Validation failed");
    }
}



/***
 *  localStorage is logged 
 * 
 * 
 * 
 */
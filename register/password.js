import { validation } from "../utils/forms.js";

const passwordForm = document.getElementById('password-form');

const customInputsPassword = document.querySelectorAll("my-input");



passwordForm.onsubmit = function(e) {
    e.preventDefault();
    const formData = new FormData(passwordForm);
    for (const element of formData) {
        console.log(element
        );
        
    }
    
    if (validation.Password(formData)) {
        if(localStorage.getItem("email") && localStorage.getItem("firstName") && localStorage.getItem("secondName")) {
            localStorage.clear();
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
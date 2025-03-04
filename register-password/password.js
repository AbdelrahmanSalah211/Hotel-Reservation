import { validation } from "../utility/forms.js";
import { registerSecondStep  } from "../utility/auth.js";

const passwordForm = document.getElementById('password-form');




passwordForm.onsubmit = function(e) {
    e.preventDefault();
    const formData = new FormData(passwordForm);
 
    
    if (validation.Password(formData)) {
        registerSecondStep(formData);
        window.location.href = "../login/login.html";
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
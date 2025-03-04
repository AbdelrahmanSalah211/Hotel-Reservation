import { validation } from "../utility/forms.js";
import { initializeUsersData, registerFirstStep, saveToLocalStorage } from "../utility/auth.js";




const form = document.getElementById('my-form');
const customInputs = document.querySelectorAll("my-input");



function restoreFromLocalStorage() {
    customInputs.forEach((customInput) => {
        const input = customInput.querySelector("input");
        const name = input?.getAttribute("name");

        if (input && name) {
            const storedValue = localStorage.getItem("register-info") ? JSON.parse(localStorage.getItem("register-info"))[name] : null;
            if (storedValue) {
                input.value = storedValue;

            }
        }
    });
}








function init() {
    initializeUsersData();
    restoreFromLocalStorage();
}

init();
form.onsubmit = function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    if (validation.Register(formData)) {
        if(!registerFirstStep(formData)){
          console.log("already exists");
          
          const errorContainer =   document.querySelector(".error-message");
            errorContainer.style.display = "flex";
          console.log(errorContainer);
          
          const errorSpan = document.createElement("span");
          errorSpan.className = "error";
          errorSpan.innerHTML = "Email already exists";
          errorContainer.appendChild(errorSpan);
         return;
        }
        saveToLocalStorage(formData);

        window.location.href = "../register-password/register-pass.html";
    } else {

        console.error("Validation failed");
    }
};


















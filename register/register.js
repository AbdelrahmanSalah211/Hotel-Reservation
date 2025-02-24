import { validation } from "../utils/forms.js";

document.addEventListener('DOMContentLoaded', function() {
    



    const form = document.getElementById('my-form');
    const customInputs = document.querySelectorAll("my-input");

   


    function restoreFromLocalStorage() {
        customInputs.forEach((customInput) => {
            const input = customInput.querySelector("input");
            const name = input?.getAttribute("name");
            
            if (input && name) {
                const storedValue = localStorage.getItem(name);
                if (storedValue) {
                    input.value = storedValue;
                    // Also update the label with stored value
                    const label = customInput.querySelector("label");
                    if (label) {
                        label.textContent = storedValue;
                    }
                }
            }
        });
    }







  
    function saveToLocalStorage(formData) {
        for (const [key, value] of formData.entries()) {
            localStorage.setItem(key, value);
        }
    }

    function updateLabelsAndClearInputs() {
        customInputs.forEach((customInput) => {
            const input = customInput.querySelector("input");
            const label = customInput.querySelector("label");
            
            if (input && label) {
                const name = input.getAttribute("name");
                const storedValue = localStorage.getItem(name);
                if (storedValue) {
                    label.textContent = storedValue;
                    input.value = "";
                }
            }
        });
    }

    restoreFromLocalStorage();
  
    form.onsubmit = function(e) {
        e.preventDefault();
        const formData = new FormData(form);

        if (validation.Register(formData)) {
            saveToLocalStorage(formData);
            
            updateLabelsAndClearInputs();
            
            window.location.href = "./register-pass.html";
        } else {

            console.error("Validation failed");
        }
    };


    
});















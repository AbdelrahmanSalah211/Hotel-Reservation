import { validation } from "../utility/forms.js";



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


    function saveToLocalStorage(formData) {
        localStorage.setItem("register-info", JSON.stringify(Object.fromEntries(formData.entries())));
      
    }


    restoreFromLocalStorage();

    form.onsubmit = function (e) {
        e.preventDefault();
        const formData = new FormData(form);

        if (validation.Register(formData)) {
            saveToLocalStorage(formData);


            window.location.href = "../register-password/register-pass.html";
        } else {

            console.error("Validation failed");
        }
    };


















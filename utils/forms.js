export const validation = {


    regName: /^[a-zA-Z]+$/,
    regEmail: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,



    Register: function (form) {
        console.log(form.get("email"));
        
        let isValid = true;
        if (!form.get("email") || !this.regEmail.test(form.get("email"))) {
            this.showError("email");
            isValid = false;
        }
      
        if (!form.get("firstName") || !this.regName.test(form.get("firstName"))) {

            this.showError("firstName");
            isValid = false;

        }
        
        if (!form.get("secondName") || !this.regName.test(form.get("secondName"))) {

            this.showError("secondName");
            isValid = false;

        }


        return isValid;


    }

,
    Password: function (form) {
        let isValid = true;
        if (!form.get("password") || form.get("password").length < 8) {
            this.showError("password");
            isValid = false;
        }

        if (!form.get("confirm_password") || form.get("confirm_password") !== form.get("password")) {
            this.showError("confirm_password");
            isValid = false;
        }
        return isValid;
    }


    ,
    showError: function (inputName) {
        const myInput = document.querySelector(`my-input[input-name="${inputName}"]`);
        console.log(myInput);
        
        const spanError = myInput.nextElementSibling;
        if (spanError && spanError.classList.contains('is-Invalid')) {
            spanError.style.display = "block"
        }


        if (!myInput.dataset.errorListenerAdded) {

            myInput.addEventListener('input', function () {

                if (spanError && spanError.classList.contains('is-Invalid')) {
                    spanError.style.display = "none"
                }

            });
            myInput.dataset.errorListenerAdded = true;
        }
    }




}



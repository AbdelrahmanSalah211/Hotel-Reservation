export const validation = {


    regName: /^[a-zA-Z]+$/,
    regEmail: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,



    Register: function (form) {
        let isValid = true;
        if (!form.get("email") || !this.regEmail.test(form.get("email"))) {
            this.showError("email");
            isValid = false;
        }

        if (!form.get("fname") || !this.regName.test(form.get("fname"))) {

            this.showError("fname");
            isValid = false;

        }

        if (!form.get("lname") || !this.regName.test(form.get("lname"))) {

            this.showError("lname");
            isValid = false;

        }

        return isValid;


    },


    StaffData:function (form) {
        let isValid = true;
        if (!form.get("email") || !this.regEmail.test(form.get("email"))) {
            this.showError("email");
            isValid = false;
        }

        if (!form.get("fname") || !this.regName.test(form.get("my-name"))) {

            this.showError("my-name");
            isValid = false;

        }

       

        return isValid && this.Password(form);
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
        console.log(isValid);
        
        return isValid;
    }


    ,
    showError: function (inputName) {
        
        const myInput = document.querySelector(`my-input[input-name="${inputName}"]`);
        
        const errorMessage = document.querySelector(".error-message");
        const spanError = document.createElement("span");
        errorMessage.innerHTML = "";
        if (errorMessage) {
            errorMessage.style.display = "flex";
            document.createElement("span");
            spanError.className = "error";
            errorMessage.appendChild(spanError);

            if (inputName === "email") {
                spanError.innerHTML = "Please enter a valid email";
            }
            if (inputName === "fname") {
                spanError.innerHTML = "Please enter a valid first name";

            }

            if (inputName === "my-name") {
                spanError.innerHTML = "Please enter a valid  name";

            }
            if (inputName === "lname") {
                spanError.innerHTML = "Please enter a valid last name";
            }
            if (inputName === "password") {
                spanError.innerHTML = "Password must be at least 8 characters";
            }
            if (inputName === "confirm_password") {
                spanError.innerHTML = "Passwords do not match";
            }


        }



console.log(myInput);

        myInput.addEventListener('input', function () {

            if (errorMessage) {
                errorMessage.style.display = "none"
            }

        });
    }




}



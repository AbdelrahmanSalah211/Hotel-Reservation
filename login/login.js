import { initializeUsersData, signinGuest } from "../utility/auth.js";
import { errorsMessage } from "../utility/errorsMessage.js";
import { loadData } from "../utility/loadData.js";
import { navigate } from "../utility/routes.js";
import { signInStaff } from "../utility/staff.js";
const sign_as = document.getElementById("sign-as");
const form = document.getElementById("form");
let currentUser = "";



initializeUsersData();




// console.log(currentUser);

sign_as.querySelectorAll(["input[type=radio"]).forEach((radio) => {
    radio.onchange = () => {

        currentUser = radio.value;
    }
});


console.log(currentUser);
form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");


    if (currentUser === "") {
        errorsMessage("Please select user type");
        return;
    }


    if (currentUser === "staff") {
        if (signInStaff(email, password)) {
            navigate("/admin");
        } else {
            errorsMessage("Invalid email or password");
        }
    }
    if (currentUser === "guest") {
        if (signinGuest(email, password)) {
            loadData();
            navigate("/");
        } else {
            errorsMessage("Invalid email or password");
        }
    }




    // if (signinGuest(email, password)) {
    //     // location.href = "../home/index.html";
    //     navigate("/");

    // } else {
    //     console.log("Invalid email or password");
    //     errorsMessage("Invalid email or password");
    // }



}
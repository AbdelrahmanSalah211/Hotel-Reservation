import { validation } from "../../utility/forms.js";
import { getStaff, deleteStaff, editStaff, addStaff } from "../../utility/staff.js";
import { errorsMessage } from "../../utility/errorsMessage.js"
let containerCards = document.getElementById('container-card');
let form = document.getElementById('form');
var email="";



function loadData() {
    const staff = getStaff();
    staff.forEach((element, index) => {

        let { name, email, gender } = element;
        containerCards.innerHTML += `<div class="card">
                <div class="dots" data-id=${index}>
                    <img src="../../assets/images/icons/dots-horizontal-svgrepo-com (1).svg" alt="">
                </div>
                <div class="box" id="box">
                    <button class="change-password-button">
                        Change Password
                    </button>
                    <button class="delete">
                        Delete
                    </button>
                </div>
               
                <div class="icon">
                    ${gender === "male" ? `<img src="../../assets/images/icons/hotel-man-1-svgrepo-com.svg" alt="">
`: `                    <img src="../../assets/images/icons/hotel-man-2-svgrepo-com.svg" alt="">
`}
                </div>
                <div class="content">
                    <h3>${email}</h3>
                    <h3>${name}</h3>
                </div>
            </div>`
    });




}




function showChangePasswordOverlay() {
    document.getElementById('mode').value = 'edit';
    document.getElementById('gender').style.display = 'none'

    const overlayBg = document.createElement('div');
    overlayBg.className = 'overlay-background';
    document.body.appendChild(overlayBg);

    const changePasswordForm = document.querySelector('.change-password');
    changePasswordForm.style.display = 'block';

    const closeButton = document.querySelector('.change-password .exit');
    closeButton.addEventListener('click', hideChangePasswordOverlay);

    overlayBg.addEventListener('click', hideChangePasswordOverlay);
}

function hideChangePasswordOverlay() {
    const changePasswordForm = document.querySelector('.change-password');
    changePasswordForm.style.display = 'none';

    const overlayBg = document.querySelector('.overlay-background');
    if (overlayBg) {
        document.body.removeChild(overlayBg);
    }
}

function addNewAdmin() {
    document.getElementById('mode').value = 'add'
    document.getElementById('gender').style.display = 'block'

    const overlayBg = document.createElement('div');
    overlayBg.className = 'overlay-background';
    document.body.append(overlayBg);

    const changePasswordForm = document.querySelector('.change-password');
    changePasswordForm.querySelector('.title h1:first-child').innerHTML = "add new Admin";
    changePasswordForm.querySelector('.form-button').innerHTML = "Add"; 

    changePasswordForm.style.display = 'block';

    const closeButton = document.querySelector('.change-password .exit');
    closeButton.addEventListener('click', hideChangePasswordOverlay);

    overlayBg.addEventListener('click', hideChangePasswordOverlay);

}

document.addEventListener('DOMContentLoaded', function () {
    const changePasswordForm = document.querySelector('.change-password');
    document.getElementById('add-staff-button').addEventListener('click', addNewAdmin);
    changePasswordForm.style.display = 'none';
    loadData();


    containerCards.querySelectorAll('.dots').forEach((dot) => {
        dot.addEventListener('click', function () {
            let card = this.closest(".card");
            let box = card.querySelector(".box");
            box.style.display = box.style.display == "flex" ? "none" : "flex";
            if (box.style.display == "flex") {
                let deleteButton = box.querySelector(".delete");
                let changePasswordButton = box.querySelector(".change-password-button");
                deleteButton.replaceWith(deleteButton.cloneNode(true));
                changePasswordButton.replaceWith(changePasswordButton.cloneNode(true));
                deleteButton = box.querySelector(".delete");
                 email = card.querySelector('.content h3:first-child').textContent.trim();

                changePasswordButton = box.querySelector(".change-password-button");
                changePasswordButton.addEventListener('click', showChangePasswordOverlay);

                deleteButton.addEventListener('click', function () {
                    console.log(email);
                    deleteStaff(email);
                    containerCards.innerHTML = '';
                    loadData();
                });





            }
        });
    });


    form.onsubmit = function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        let mode = document.getElementById('mode').value;
        let gender = document.querySelector('input[name="gender"]:checked')?.value || '';


        if (validation.StaffData(formData)) {
            const newData = {
                name: formData.get('fname'),
                password: formData.get('password'),
                email: formData.get('email'),
                gender: gender
            };
            // console.log);
            if (mode == 'edit') {
                // let email = document.querySelector('input[name="email"]').value;

                if (editStaff(email, newData)) {
                    hideChangePasswordOverlay();
                    containerCards.innerHTML = '';
                    loadData();
                } else {
                    errorsMessage("no staff with this email");
                }

            } else if (mode == 'add') {
                addStaff(newData.email, newData.name, newData.password, newData.gender);
                hideChangePasswordOverlay();
                containerCards.innerHTML = '';
                loadData();
            }



        }
    }

})






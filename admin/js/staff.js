import { validation } from "../../utility/forms.js";
import { getStaff, deleteStaff, editStaff, addStaff } from "../../utility/staff.js";
import { errorsMessage } from "../../utility/errorsMessage.js"
let containerCards = document.getElementById('container-card');
let form = document.getElementById('form');
var email = "";


let script = document.createElement('script');
script.src = `/components/InputLabel/InputLabel.js?v=${Date.now()}`
script.type = "module";
script.async = false;

script.setAttribute("data-dynamic", "");

document.body.append(script);






function getGenderIcon(gender) {
    console.log(gender);

    const maleIcon = `
      <svg height="800px" width="800px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="##373737">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#373737;} </style> <g> <path class="st0" d="M434.811,406.393c-12.048-18.14-30.36-28.219-47.602-34.735c-8.651-3.258-17.117-5.644-24.584-7.646 c-7.462-1.989-13.977-3.641-18.405-5.201c-3.318-1.17-5.664-2.247-7.144-3.152c-1.116-0.681-1.732-1.236-2.115-1.672 c-0.535-0.667-0.813-1.15-1.144-2.617c-0.304-1.441-0.449-3.78-0.442-6.972c0-7.898,0-1.077,0-14.605v-8.029l-18.048,1.362V310.31 c9.715-10.818,23.678-27.564,29.408-54.131c2.002-0.899,3.985-1.917,5.895-3.252c4.752-3.278,8.783-8.036,12.2-14.512 c3.436-6.503,6.483-14.817,9.734-26.19c1.646-5.77,2.406-10.779,2.406-15.24c0.014-5.142-1.051-9.602-2.994-13.224 c-2.914-5.498-7.64-8.552-11.459-9.939c-0.423-0.159-0.8-0.245-1.203-0.37c0-8.182,0-22.694,0-33.368v-5.465v-1.976V28.338 l-3.225-2.22C355.329,25.609,317.897,0.026,256,0c-61.897,0.026-99.328,25.609-100.088,26.118l-3.226,2.22v106.281v5.465 c0,10.686,0,25.212,0,33.394c-1.639,0.515-3.377,1.19-5.221,2.313c-2.742,1.692-5.511,4.335-7.441,7.963 c-1.943,3.628-3.007,8.083-3,13.224c0.006,4.468,0.766,9.477,2.412,15.246c4.348,15.147,8.274,24.921,13.356,32.098 c2.538,3.569,5.433,6.43,8.578,8.604c1.91,1.335,3.892,2.353,5.895,3.252c5.73,26.567,19.694,43.313,29.408,54.131v12.815 l-18.048-1.362v8.029c0,13.528,0,6.708,0,14.605c0,2.836-0.106,5.003-0.35,6.457c-0.185,1.097-0.417,1.771-0.654,2.253 c-0.37,0.694-0.734,1.223-2.181,2.22c-1.428,0.972-3.926,2.174-7.66,3.483c-5.928,2.101-15.477,4.282-26.177,7.348 c-16.079,4.653-35.085,11.354-50.55,24.611c-7.719,6.628-14.5,14.962-19.264,25.312c-4.772,10.336-7.508,22.628-7.501,37.008 c0,3.338,0.145,6.794,0.449,10.363c0.218,2.498,1.17,4.534,2.287,6.212c2.128,3.119,4.95,5.445,8.485,7.831 c6.193,4.097,14.77,8.096,25.754,12.034C134.136,501.254,188.558,511.987,256,512c54.793,0,101.04-7.111,134.05-16.046 c16.515-4.48,29.7-9.384,39.229-14.275c4.772-2.471,8.631-4.904,11.691-7.573c1.533-1.348,2.874-2.762,4.005-4.441 c1.11-1.679,2.069-3.714,2.287-6.212c0.304-3.575,0.449-7.025,0.449-10.363C447.731,433.925,442.821,418.448,434.811,406.393z M161.82,78.947h188.354v14.889H161.82V78.947z M180.985,249.49l-0.754-4.269l-4.071-1.447c-2.59-0.926-4.566-1.871-6.292-3.067 c-2.544-1.797-4.85-4.249-7.547-9.272c-2.663-4.996-5.485-12.464-8.572-23.302c-1.354-4.738-1.837-8.413-1.837-11.156 c0.006-3.172,0.615-5.023,1.236-6.199c0.938-1.705,2.082-2.426,3.549-3.014c1.229-0.469,2.504-0.581,2.967-0.595l1.163,0.119 c2.016,7.527,8.373,27.895,18.478,28.814c0-25.939,9.021-71.056,14.665-74.44l0.396-1.58h122.155l0.396,1.58 c5.644,3.384,14.665,48.501,14.665,74.44c9.913-0.899,16.211-20.487,18.346-28.338l2.71-0.595c0.886,0.079,2.736,0.396,4.024,1.256 c0.852,0.548,1.546,1.183,2.181,2.352c0.628,1.176,1.236,3.027,1.242,6.206c0,2.742-0.483,6.416-1.838,11.149 c-4.104,14.46-7.785,22.872-11.162,27.538c-1.692,2.359-3.238,3.826-4.956,5.036c-1.725,1.196-3.701,2.141-6.292,3.067 l-4.071,1.447l-0.753,4.269c-4.765,26.673-18.511,41.681-28.662,52.989l-1.91,2.121v23.976L256,338.245l-44.444-9.668V304.6 l-1.91-2.121C199.496,291.172,185.75,276.163,180.985,249.49z M192.768,354.357c0.654-3.258,0.734-6.444,0.74-9.959 c0-5.267,0-4.012,0-6.582l14.586,1.09l42.494,9.238v23.606v6.622l-60.767-17.011C191.228,359.122,192.299,356.736,192.768,354.357z M224.192,502.021h-10.825V399.805l29.937-15.92v0.006l5.089,9.557l-24.201,12.866V502.021z M255.716,479.01 c-6.073,0-10.997-4.923-10.997-10.997c0-6.074,4.924-10.997,10.997-10.997c6.074,0,10.997,4.923,10.997,10.997 C266.712,474.086,261.789,479.01,255.716,479.01z M255.716,440.098c-6.073,0-10.997-4.923-10.997-10.997 s4.924-10.997,10.997-10.997c6.074,0,10.997,4.923,10.997,10.997S261.789,440.098,255.716,440.098z M261.412,378.373v-6.622 v-23.606l42.454-9.232l14.625-1.097c0,2.57,0,1.315,0,6.582c0,3.126,0.072,5.981,0.542,8.875c0.357,2.155,0.958,4.362,2.015,6.477 c0.278,0.568,0.635,1.11,0.979,1.652L261.412,378.373z"/> </g> </g>

</svg>
    `;

    const femaleIcon = `
       <svg height="800px" width="800px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#373737">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#373737;} </style> <g> <path class="st0" d="M431.235,408.488c-11.806-17.777-26.785-30.314-44.027-36.83c-8.65-3.258-17.116-5.643-24.584-7.646 c-7.462-1.99-13.978-3.641-18.406-5.201c-3.318-1.17-5.664-2.247-7.144-3.152c-1.117-0.681-1.732-1.236-2.115-1.672 c-0.535-0.667-0.813-1.15-1.144-2.617c-0.304-1.441-0.45-3.78-0.443-6.972c0-7.898,0-1.077,0-14.605v-8.029l-18.048,1.362V310.31 c1.328-1.48,2.746-3.092,4.2-4.805c10.759,4.263,30.853,10.977,42.054,6.774c-12.395-9.642-19.013-28.873-21.884-39.625 c1.989-5.043,3.744-10.475,5.039-16.476c2.002-0.899,3.985-1.917,5.895-3.252c4.752-3.278,8.783-8.036,12.2-14.512 c3.437-6.503,6.483-14.817,9.735-26.19c1.646-5.77,2.406-10.779,2.406-15.24c0.013-5.142-1.051-9.602-2.994-13.224 c-2.914-5.498-7.64-8.552-11.46-9.939c-0.423-0.159-0.799-0.245-1.202-0.37c0-8.182,0-22.694,0-33.368v-5.465v-1.969V28.338 l-3.225-2.22C355.328,25.609,317.897,0.026,256,0c-61.897,0.026-99.328,25.609-100.088,26.118l-3.225,2.22v106.281v5.465 c0,10.686,0,25.212,0,33.394c-1.639,0.516-3.377,1.19-5.221,2.313c-2.743,1.692-5.511,4.335-7.441,7.963 c-1.943,3.628-3.007,8.083-3,13.224c0.006,4.468,0.766,9.477,2.412,15.246c4.349,15.147,8.274,24.921,13.356,32.098 c2.538,3.569,5.433,6.43,8.578,8.604c1.91,1.335,3.892,2.353,5.895,3.252c1.295,6,3.05,11.439,5.042,16.482 c-2.875,10.752-9.49,29.977-21.885,39.619c11.202,4.203,31.296-2.511,42.051-6.774c1.454,1.712,2.872,3.325,4.2,4.805v12.815 l-18.048-1.362v8.029c0,13.528,0,6.708,0,14.605c0,2.836-0.106,5.003-0.35,6.457c-0.185,1.097-0.416,1.771-0.654,2.253 c-0.37,0.694-0.733,1.223-2.181,2.221c-1.427,0.971-3.926,2.174-7.659,3.482c-5.928,2.101-15.477,4.282-26.177,7.348 c-16.079,4.653-32.095,14.024-47.252,27.016c-7.564,6.497-14.209,14.665-18.878,24.809c-4.676,10.125-7.359,22.172-7.352,36.269 c0,3.264,0.142,6.655,0.442,10.151c0.212,2.452,1.147,4.441,2.241,6.086c2.085,3.06,4.851,5.34,8.314,7.686 c6.07,4.005,14.476,7.924,25.242,11.783C136.575,501.452,188.559,511.987,256,512c54.792,0,99.017-6.985,131.37-15.742 c16.184-4.395,29.104-9.199,38.443-13.99c4.676-2.419,8.459-4.805,11.456-7.422c1.504-1.322,2.818-2.71,3.926-4.356 c1.088-1.645,2.029-3.635,2.241-6.086c0.3-3.503,0.442-6.886,0.442-10.151C443.897,435.472,439.083,420.298,431.235,408.488z M161.82,78.947h188.354v14.889H161.82V78.947z M180.985,249.49l-0.753-4.269l-4.071-1.447c-2.591-0.925-4.567-1.871-6.292-3.066 c-2.544-1.798-4.851-4.25-7.548-9.272c-2.663-4.996-5.485-12.464-8.571-23.302c-1.355-4.738-1.838-8.413-1.838-11.156 c0.007-3.172,0.615-5.023,1.236-6.199c0.938-1.705,2.082-2.426,3.549-3.014c1.229-0.469,2.505-0.581,2.968-0.595l1.162,0.119 c2.016,7.527,8.373,27.895,18.478,28.814c4.831-17.883,15.021-38.826,24.075-54.468c25.04,17.936,72.087,33.466,128.539,39.467 c-0.196,5.366-0.337,10.481-0.337,15.002c9.913-0.899,16.211-20.487,18.345-28.338l2.71-0.595c0.885,0.079,2.736,0.396,4.025,1.256 c0.852,0.548,1.546,1.189,2.181,2.352c0.628,1.176,1.236,3.027,1.243,6.206c0,2.742-0.483,6.417-1.838,11.149 c-4.104,14.46-7.785,22.873-11.162,27.538c-1.692,2.359-3.238,3.826-4.957,5.036c-1.724,1.196-3.7,2.141-6.291,3.066l-4.071,1.447 l-0.753,4.269c-4.765,26.673-18.511,41.681-28.662,52.989l-1.91,2.121v23.976L256,338.245l-44.444-9.668V304.6l-1.91-2.121 C199.496,291.172,185.75,276.163,180.985,249.49z M192.768,354.357c0.654-3.258,0.734-6.444,0.74-9.959c0-5.267,0-4.012,0-6.582 l14.585,1.09l42.494,9.238v23.606v6.622l-60.766-17.01C191.229,359.122,192.299,356.736,192.768,354.357z M224.193,502.021h-10.825 V399.805l29.937-15.92v0.006l5.089,9.556l-24.201,12.866V502.021z M255.716,479.01c-6.073,0-10.997-4.923-10.997-10.997 c0-6.073,4.924-10.997,10.997-10.997c6.073,0,10.997,4.924,10.997,10.997C266.713,474.086,261.789,479.01,255.716,479.01z M255.716,440.098c-6.073,0-10.997-4.923-10.997-10.997c0-6.073,4.924-10.997,10.997-10.997c6.073,0,10.997,4.924,10.997,10.997 C266.713,435.174,261.789,440.098,255.716,440.098z M261.413,378.373v-6.622v-23.606l42.454-9.232l14.625-1.097 c0,2.57,0,1.315,0,6.582c0,3.126,0.072,5.981,0.542,8.875c0.357,2.155,0.958,4.362,2.015,6.477c0.278,0.568,0.635,1.11,0.978,1.652 L261.413,378.373z"/> </g> </g>

</svg>
    `;

    return gender === "male" ? maleIcon : femaleIcon;
}



function loadData() {
    const staff = getStaff();

    staff.forEach((element) => {

        let { name, email, gender } = element;
        containerCards.innerHTML += `<div class="card">
                <div class="dots">
                    <svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#373737">

                    <g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <path d="M4 8C4 9.10457 3.10457 10 2 10C0.895431 10 0 9.10457 0 8C0 6.89543 0.895431 6 2 6C3.10457 6 4 6.89543 4 8Z" fill="#373737"/> <path d="M10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8Z" fill="#373737"/> <path d="M14 10C15.1046 10 16 9.10457 16 8C16 6.89543 15.1046 6 14 6C12.8954 6 12 6.89543 12 8C12 9.10457 12.8954 10 14 10Z" fill="#373737"/> </g>

</svg>
                </div>
                <div class="box" id="box">
                    <button class="change-password-button">
                        Edit
                    </button>
                    <button class="delete">
                        Delete
                    </button>
                </div>
               
                <div class="icon">
                    ${getGenderIcon(gender)}
                </div>
                <div class="content">
                    <h3>${email}</h3>
                    <h3>${name}</h3>
                </div>
            </div>`
    });




}




function showChangePasswordOverlay() {
    console.log("asdsad");

    document.getElementById('mode').value = 'edit';
    document.getElementById('gender').style.display = 'none'

    const overlayBg = document.createElement('div');
    overlayBg.className = 'overlay-background';
    document.body.appendChild(overlayBg);

    const changePasswordForm = document.querySelector('.change-password');
    changePasswordForm.style.display = 'block';
    changePasswordForm.querySelector('.title h1:first-child').innerHTML = "Edit Staff Member";
    changePasswordForm.querySelector('.form-button').innerHTML = "Edit";
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
    changePasswordForm.querySelector('.title h1:first-child').innerHTML = "Add New Admin";
    changePasswordForm.querySelector('.form-button').innerHTML = "Add";

    changePasswordForm.style.display = 'block';

    const closeButton = document.querySelector('.change-password .exit');
    closeButton.addEventListener('click', hideChangePasswordOverlay);

    overlayBg.addEventListener('click', hideChangePasswordOverlay);

}
function loadPage() {

    const changePasswordForm = document.querySelector('.change-password');
    document.getElementById('add-staff-button').addEventListener('click', addNewAdmin);
    changePasswordForm.style.display = 'none';
    loadData();

    console.log("sdasdasd");



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
                    loadPage();
                });
            }
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
                        loadPage()
                    } else {
                        errorsMessage("no staff with this email");
                    }

                } else if (mode == 'add') {
                    addStaff(newData.email, newData.name, newData.password, newData.gender);
                    hideChangePasswordOverlay();
                    containerCards.innerHTML = '';
                    loadData();
                    loadPage()
                }



            }
        }

    })
}


loadPage();







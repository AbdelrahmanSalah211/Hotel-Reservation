export const errorsMessage = function (message) {

    const error = document.querySelector(".error-message");
    error.innerHTML = "";
    error.style.display = "flex";
    const errorSpan = document.createElement("span");
    errorSpan.className = "error";
    error.appendChild(errorSpan);
    errorSpan.innerText = `${message}`;
}
import { logout } from "../utility/logout.js";
import { checkLogin } from "../utility/checkLogin.js";
import { makeRoomCardElements } from "../utility/makeRoomCardElements.js";

function main() {
    checkLogin();
    const logoutBtn = document.getElementById("logout");
    logoutBtn.addEventListener("click", () => {
        logout();
    });

    const rooms = JSON.parse(localStorage.getItem("room_types"));
    const roomsContainer = document.getElementById("rooms-container");
    makeRoomCardElements(rooms, 5, roomsContainer);
}

main();
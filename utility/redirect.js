import { navigate } from "./routes.js";

function redirect(roomType, meals) {
    localStorage.setItem("roomType", roomType);
    localStorage.setItem("meals", meals);
    navigate("/reservation");
}

export default {redirect};
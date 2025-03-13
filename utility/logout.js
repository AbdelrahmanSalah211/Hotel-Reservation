import { navigate } from "./routes.js";
function logout() {
    localStorage.removeItem("user-session");
    navigate("/login");
}

export { logout };
import { navigate } from "./routes.js";
function logout() {
    localStorage.removeItem('isLoggedIn');
    navigate("/login");
}

export { logout };
import { navigate } from "./routes.js";

function checkLogin(){
  if(!isLoggedIn()){
    navigate("/login");
  }
}

function isLoggedIn() {
  return JSON.parse(localStorage.getItem("user-session"));
}

export { isLoggedIn, checkLogin };
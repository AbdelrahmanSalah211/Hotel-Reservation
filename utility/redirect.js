import { navigate } from "./routes.js";

function redirect(data={}) {
    navigate("/reservation",data);
}

export default {redirect};
const routes = {
    "/": "../home/home.html",
    "/login": "../login/login.html",
    "/signup/step1": "../signup/step1.html",
    "/signup/step2": "../signup/step2.html",
    "/reservation": "../reservation/reservation.html",
    "/notfound": "../notfound/notfound.html"
};

function navigate(path) {
    history.pushState({}, "", path);
    window.location.href = routes[path];
}

function fetchRoute(path){
    return routes[path] || routes["/notfound"];
}

export {navigate, fetchRoute};
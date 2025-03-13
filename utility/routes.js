const routes = {
    "/": "../home/home.html",
    "/login": "../login/login.html",
    "/signup/step1": "../register-info/step1.html",
    "/signup/step2": "../register-password/step2.html",
    "/reservation": "../reservation/reservation.html",
    "/admin":"../admin/index.html",
    "/notfound": "../notfound/notfound.html"
};

function navigate(path, query) {
    window.location.href = `${routes[path]}${query ? `?${query}` : ""}`;
}

function fetchRoute(path){
    return routes[path] || routes["/notfound"];
}

export {navigate, fetchRoute};
const routes = {
    "/": "../home/home.html",
    "/login": "../login/login.html",
    "/signup/step1": "../signup/step1.html",
    "/signup/step2": "../signup/step2.html",
    "/reservation": "../reservation/reservation.html",
    "/notfound": "../notfound/notfound.html"
};

function navigate(path, data={}) {
    const queryString = new URLSearchParams(data).toString();
    const fullPath = queryString ? `${path}?${queryString}` : path;
    history.pushState({}, "", fullPath);
    window.location.href = routes[path];
}

function fetchRoute(path){
    return routes[path] || routes["/notfound"];
}

export {navigate, fetchRoute};
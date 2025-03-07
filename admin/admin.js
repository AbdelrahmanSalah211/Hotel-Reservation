const routes = {
    "/admin/reservations": {
        html: `<div>Reservations</div>`,
        js: `./js/reservations.js`,
        css: `./css/reservations.css`,
    },
    "/admin/rooms": {
        html: `<div>Rooms</div>`,
        js: `./js/Rooms.js`,
        css: `./css/rooms.css`
    },
    "/admin/staff": {
        html: `<div>Staff</div>`,
        js: `./js/staff.js`,
        css: `./css/staff.css`,
    },
    "/admin/notfound": {
        html: `<div>Not Found</div>`,
        js: `./js/notfound.js`,
        css: `./css/notfound.css`
    }
};

function loadResources(route) {
    if(routes[route].html){
        document.getElementById("app").innerHTML = routes[route].html;    
    }

    if (routes[route].css) {
        let cssLink = document.createElement("link");
        cssLink.rel = "stylesheet";
        cssLink.href = routes[route].css;
        cssLink.setAttribute("data-dynamic", ""); // Mark it for removal later
        document.head.appendChild(cssLink);
    }

    if (routes[route].js) {
        let script = document.createElement("script");
        script.src = routes[route].js;
        script.setAttribute("data-dynamic", ""); // Mark it for removal later
        script.defer = true;
        document.body.appendChild(script);
    }
}

function manageResources(route) {
    // Removing JS and CSS files if exists
    document.querySelectorAll("[data-dynamic]").forEach(el => el.remove());
    console.log(route)
    console.log(routes[route])
    if (routes[route]){
        loadResources(route);
    }else if(route == "/admin/"){
        route = "/admin/reservations";
        loadResources(route);
    }else {
        route = "/admin/notfound";
        loadResources(route);
    }
}

function router() {
    const route = window.location.pathname;
    manageResources(route);
}

function navigate(event) {
    event.preventDefault();
    const url = event.target.getAttribute("href");
    history.pushState(null, "", url);
    router();
}

function main(){
    const anchors = document.querySelectorAll("a[data-link]");
    anchors.forEach(anchor => anchor.addEventListener("click", navigate));
    window.addEventListener("popstate", router);
    window.addEventListener("load", router)
}

main();
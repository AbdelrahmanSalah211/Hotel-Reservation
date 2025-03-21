const routes = {
    "/admin/reservations": {
        html: `./html/reservations.html`,
        js: `./js/reservations.js`,
        css: `./css/reservations.css`,
    },
    "/admin/rooms": {
        html: `./html/rooms.html`,
        js: `./js/rooms.js`,
        css: `./css/rooms.css`
    },
    "/admin/staff": {
        html: `./html/staff.html`,
        js: `./js/staff.js`,
        css: `./css/staff.css`,
    },
    "/admin/notfound": {
        html: `<div>Not Found</div>`,
        js: `./js/notfound.js`,
        css: `./css/notfound.css`
    }
};

async function fetchAndInjectHTML(htmlPath) {
    try {
        const response = await fetch(htmlPath);
        const text = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const bodyContent = doc.body.innerHTML;

        document.getElementById("app").innerHTML = bodyContent;
    } catch (err) {
        console.error("Failed to load HTML:", err);
        document.getElementById("app").innerHTML = "<div>Error loading content.</div>";
    }
}


function loadResources(route) {
    if(routes[route].html){
        fetchAndInjectHTML(routes[route].html);  
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
        script.src = `${routes[route].js}?v=${Date.now()}`;
        script.setAttribute("data-dynamic", ""); // Mark it for removal later
        script.type = "module";
        script.defer = true;
        document.body.appendChild(script);
    }
}

function manageResources(route) {
    // Removing JS and CSS files if exists
    document.querySelectorAll("[data-dynamic]").forEach(el => el.remove());
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

export function router() {
    const route = window.location.pathname;
    manageResources(route);
}

function switchSelected(clickedAnchor) {
    const allLinks = document.querySelectorAll("a[data-link]");
    allLinks.forEach(link => link.removeAttribute("selected"));
    clickedAnchor.setAttribute("selected", "");
}


function innerNavigate(event) {
    event.preventDefault();
    const clickedAnchor = event.currentTarget;
    const url = clickedAnchor.getAttribute("href");

    switchSelected(clickedAnchor);
    history.pushState(null, "", url);
    router();
}

function toggleSidebarCollapse() {
    const sidebar = document.getElementById("sidebar");

    if (sidebar.hasAttribute("colapsed")) {
        sidebar.removeAttribute("colapsed");
    } else {
        sidebar.setAttribute("colapsed", "");
    }
}

function main(){
    const toggleSidebar = document.getElementById("toggle-sidebar")
    toggleSidebar.addEventListener("click", toggleSidebarCollapse);
    
    const anchors = document.querySelectorAll("a[data-link]");
    anchors.forEach(anchor => anchor.addEventListener("click", innerNavigate));
    window.addEventListener("popstate", router);
    window.addEventListener("load", router)
}

main();
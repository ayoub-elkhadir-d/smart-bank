import { get } from "../storage/storage.js";
import { logoutUser, getCurrentUser } from "../services/userService.js";
import { addHistory } from "../services/historyService.js";
import { renderLoginPage } from "../pages/login.js";
import { renderRegisterPage } from "../pages/register.js";
import { renderForgotPasswordPage } from "../pages/forgotPassword.js";

const BASE_PATH = "/smart-bank";

const pageTitles = {
    "/login": "Connexion",
    "/register": "Inscription",
    "/forgot-password": "Mot de passe oublie",
    "/dashboard": "Tableau de bord",
    "/offers": "Offres",
    "/credit": "Simulation de credit",
    "/rewards": "Recompenses",
    "/flash-sales": "Offres flash",
    "/profile": "Profil",
    "/history": "Historique"
};

function getAppElement() {
    return document.getElementById("app");
}

function renderPage(path) {
    const appElement = getAppElement();
    if (path === "/login") {
        renderLoginPage(appElement);
        connectNavigationLinks();
        return;
    }

    if (path === "/register") {
        renderRegisterPage(appElement);
        connectNavigationLinks();
        return;
    }

    if (path === "/forgot-password") {
        renderForgotPasswordPage(appElement);
        connectNavigationLinks();
        return;
    }

    renderProtectedPage(path);
}

function renderProtectedPage(path) {
    const appElement = getAppElement();
    let navigationLinks = "";

    for (const pagePath in pageTitles) {
        if (pagePath !== "/login" && pagePath !== "/register" && pagePath !== "/forgot-password") {
            navigationLinks += `<a href="${pagePath}" data-route>${pageTitles[pagePath]}</a>`;
        }
    }

    appElement.innerHTML = `
        <main class="protected-page">
            <nav>${navigationLinks}</nav>
            <section class="protected-card">
                <p class="eyebrow">SmartBank</p>
                <h1>${pageTitles[path] || "Page"}</h1>
                <p>This page will be connected to its service next.</p>
                <button class="primary-button" id="logout-button" type="button">Logout</button>
            </section>
        </main>
    `;

    const logoutButton = document.getElementById("logout-button");

    logoutButton.addEventListener("click", function () {
        const currentUser = getCurrentUser();

        if (currentUser !== null) {
            addHistory(currentUser.id, "logout", "Deconnexion");
        }

        logoutUser();
        navigateTo("/login");
    });

    connectNavigationLinks();
}

function connectNavigationLinks() {
    const links = getAppElement().querySelectorAll("a[data-route]");

    for (let index = 0; index < links.length; index += 1) {
        links[index].addEventListener("click", function (event) {
            event.preventDefault();
            navigateTo(links[index].getAttribute("href"));
        });
    }
}

function navigateTo(path) {
    const fullPath = BASE_PATH + path;
    window.history.pushState({}, "", fullPath);
    router();
}

function router() {
    let path = window.location.pathname;
    if (path.startsWith(BASE_PATH)) {
        path = path.replace(BASE_PATH, "");
    }
    path = path || "/";

    const currentUser = get("currentUser");

    if (path === "/") {
        if (currentUser === null) {
            window.history.replaceState({}, "", BASE_PATH + "/login");
        } else {
            window.history.replaceState({}, "", BASE_PATH + "/dashboard");
        }
        router();
        return;
    }

    if (path === "/login" || path === "/register" || path === "/forgot-password") {
        if (currentUser !== null && path !== "/forgot-password") {
            window.history.replaceState({}, "", BASE_PATH + "/dashboard");
            router();
            return;
        }

        renderPage(path);
        return;
    }

    if (currentUser === null) {
        window.history.replaceState({}, "", BASE_PATH + "/login");
        router();
        return;
    }

    const protectedRoutes = [
        "/dashboard",
        "/offers",
        "/credit",
        "/rewards",
        "/flash-sales",
        "/profile",
        "/history"
    ];

    if (protectedRoutes.includes(path)) {
        renderPage(path);
        return;
    }

    window.history.replaceState({}, "", BASE_PATH + "/dashboard");
    renderPage("/dashboard");
}

window.addEventListener("popstate", function () {
    router();
});

export { navigateTo, router };
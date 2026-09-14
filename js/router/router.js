import { get } from "../storage/storage.js";
import { logoutUser, getCurrentUser } from "../services/userService.js";
import { addHistory } from "../services/historyService.js";

import { renderLoginPage } from "../pages/login.js";
import { renderRegisterPage } from "../pages/register.js";
import { renderForgotPasswordPage } from "../pages/forgotPassword.js";
import { renderDashboardPage } from "../pages/dashboard.js";
import { renderOffersPage } from "../pages/offers.js";
import { renderCreditPage } from "../pages/credit.js";
import { renderRewardsPage } from "../pages/rewards.js";
import { renderFlashSalesPage } from "../pages/flashSales.js";
import { renderProfilePage } from "../pages/profile.js";
import { renderHistoryPage } from "../pages/history.js";
import { renderNavbar } from "../components/navbar.js";

const BASE_PATH = "/smart-bank";

const publicPages = {
    "/login": renderLoginPage,
    "/register": renderRegisterPage,
    "/forgot-password": renderForgotPasswordPage
};

const protectedPages = {
    "/dashboard": renderDashboardPage,
    "/offers": renderOffersPage,
    "/credit": renderCreditPage,
    "/rewards": renderRewardsPage,
    "/flash-sales": renderFlashSalesPage,
    "/profile": renderProfilePage,
    "/history": renderHistoryPage
};

const navigationLinks = Object.keys(protectedPages).map(function (path) {
    return {
        path: path,
        label: path.slice(1)
    };
});

function getAppElement() {
    return document.getElementById("root");
}

function renderPage(path) {
    const appElement = getAppElement();

    if (publicPages[path]) {
        publicPages[path](appElement);
        connectNavigationLinks();
        return;
    }

    renderProtectedPage(path);
}

function renderProtectedPage(path) {
    const appElement = getAppElement();
    const currentUser = get("currentUser");

    const navbar = renderNavbar({
        isAuthenticated: true,
        currentPath: path,
        userName: currentUser.firstName + " " + currentUser.lastName,
        links: navigationLinks
    });

    appElement.innerHTML = `
        <main class="protected-page">
            ${navbar}
            <section class="protected-card page-content"></section>
        </main>
    `;

    const renderFunction = protectedPages[path];

    if (renderFunction) {
        renderFunction();
    }

    const logoutButton = document.getElementById("logout-button");

    logoutButton.addEventListener("click", function () {
        const user = getCurrentUser();

        if (user !== null) {
            addHistory(user.id, "logout", "Logged out");
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

            const path = links[index].getAttribute("href");
            navigateTo(path);
        });
    }
}

function navigateTo(path) {
    window.history.replaceState({}, "", BASE_PATH + path);
    router();
}

function router() {
    let path = window.location.pathname;

    path = path.replace(BASE_PATH, "") || "/";

    const currentUser = get("currentUser");

    if (path === "/") {
        if (currentUser === null) {
            navigateTo("/login");
        } else {
            navigateTo("/dashboard");
        }
        return;
    }

    if (publicPages[path]) {
        if (currentUser !== null && path !== "/forgot-password") {
            navigateTo("/dashboard");
            return;
        }

        renderPage(path);
        return;
    }

    if (currentUser === null) {
        navigateTo("/login");
        return;
    }

    if (protectedPages[path]) {
        renderPage(path);
        return;
    }

    navigateTo("/dashboard");
}

window.addEventListener("popstate", router);

export { navigateTo, router };
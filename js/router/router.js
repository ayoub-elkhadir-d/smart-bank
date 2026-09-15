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

const navigationLinks = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/offers", label: "Offers" },
    { path: "/credit", label: "Credit simulation" },
    { path: "/rewards", label: "Rewards" },
    { path: "/flash-sales", label: "Flash offers" },
    { path: "/profile", label: "Profile" },
    { path: "/history", label: "History" }
];

document.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-route]");
    if (link) {
        e.preventDefault();
        navigateTo(link.getAttribute("href"));
    }

    if (e.target.id === "logout-button") {
        const user = getCurrentUser();
        if (user) addHistory(user.id, "logout", "Logged out");
        logoutUser();
        navigateTo("/login");
    }
});

function navigateTo(path) {
    window.history.replaceState({}, "", BASE_PATH + path);
    router();
}

function renderPage(path, isProtected) {
    const app = document.getElementById("root");
    const currentUser = get("currentUser");

    if (!isProtected) {
        publicPages[path](app);
        return;
    }

    app.innerHTML = `
    <main class="protected-page">
      ${renderNavbar({
        isAuthenticated: true,
        currentPath: path,
        userName: `${currentUser.firstName} ${currentUser.lastName}`,
        links: navigationLinks
    })}
      <section class="protected-card page-content"></section>
    </main>
  `;


    if (typeof protectedPages[path] === "function") {
        protectedPages[path]();
    }
}

function router() {
    const path = window.location.pathname.replace(BASE_PATH, "") || "/";
    const currentUser = get("currentUser");

    if (path === "/") {
        return navigateTo(currentUser ? "/dashboard" : "/login");
    }

    if (publicPages[path]) {
        if (currentUser && path !== "/forgot-password") {
            return navigateTo("/dashboard");
        }
        return renderPage(path, false);
    }

    if (protectedPages[path]) {
        if (!currentUser) {
            return navigateTo("/login");
        }
        return renderPage(path, true);
    }

    navigateTo("/dashboard");
}

window.addEventListener("popstate", router);

export { navigateTo, router };
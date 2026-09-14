import { getDashboardData } from "../services/dashboardService.js";
import { getCurrentUser } from "../services/userService.js";
import { escapeHtml, formatCurrency, formatDate, getPageContent } from "./pageHelpers.js";

function renderDashboardPage() {
    const currentUser = getCurrentUser();
    const dashboard = getDashboardData(currentUser.id);
    const activities = [];

    for (let index = dashboard.recentActivities.length - 1; index >= 0; index -= 1) {
        activities.push(dashboard.recentActivities[index]);
    }

    let activityContent = "";

    if (activities.length === 0) {
        activityContent = `<div class="empty-state"><strong>No activity yet</strong><p>Your account activity will appear here.</p></div>`;
    } else {
        let activityRows = "";

        for (let index = 0; index < activities.length; index += 1) {
            const activity = activities[index];

            activityRows += `
                <div class="activity-row">
                    <div>
                        <strong>${escapeHtml(activity.description)}</strong>
                        <span>${escapeHtml(activity.action.replace(/_/g, " "))}</span>
                    </div>
                    <time>${formatDate(activity.createdAt)}</time>
                </div>
            `;
        }

        activityContent = `<div class="activity-list">${activityRows}</div>`;
    }

    getPageContent().innerHTML = `
        <div class="page-heading">
            <div>
                <p class="eyebrow">Overview</p>
                <h1>Good to see you, ${escapeHtml(currentUser.firstName)}</h1>
                <p class="page-intro">Here is your financial snapshot and latest account activity.</p>
            </div>
            <a class="secondary-button" href="/credit" data-route>Run a simulation</a>
        </div>
        <div class="stat-grid">
            <article class="stat-card stat-card-primary">
                <span class="stat-label">Available balance</span>
                <strong>${formatCurrency(dashboard.balance)}</strong>
                <span class="stat-detail">Current account balance</span>
            </article>
            <article class="stat-card">
                <span class="stat-label">Reward points</span>
                <strong>${dashboard.points.toLocaleString("en-US")}</strong>
                <span class="stat-detail">Available to redeem</span>
            </article>
            <article class="stat-card">
                <span class="stat-label">Credit simulations</span>
                <strong>${dashboard.creditSimulationCount}</strong>
                <span class="stat-detail">Saved to your account</span>
            </article>
            <article class="stat-card">
                <span class="stat-label">Active offers</span>
                <strong>${dashboard.activeOfferCount}</strong>
                <span class="stat-detail">Available right now</span>
            </article>
        </div>
        <section class="content-section">
            <div class="section-heading">
                <div>
                    <p class="eyebrow">Account activity</p>
                    <h2>Recent activity</h2>
                </div>
                <a class="text-link" href="/history" data-route>View all activity</a>
            </div>
            ${activityContent}
        </section>
    `;
}

export { renderDashboardPage };

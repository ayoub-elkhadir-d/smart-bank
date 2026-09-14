import { getUserHistory } from "../services/historyService.js";
import { getCurrentUser } from "../services/userService.js";
import { escapeHtml, formatDate, getPageContent } from "./pageHelpers.js";

function renderHistoryPage() {
    const currentUser = getCurrentUser();
    const storedActivities = getUserHistory(currentUser.id);
    const activities = [];

    for (let index = storedActivities.length - 1; index >= 0; index -= 1) {
        activities.push(storedActivities[index]);
    }

    let historyContent = `<div class="panel table-panel"><div class="table-wrap"><table><thead><tr><th>Activity</th><th>Type</th><th>Date</th><th>Reference</th></tr></thead><tbody>`;

    for (let index = 0; index < activities.length; index += 1) {
        const activity = activities[index];

        historyContent += `
            <tr>
                <td><strong>${escapeHtml(activity.description)}</strong></td>
                <td><span class="status-badge neutral-badge">${escapeHtml(activity.action.replace(/_/g, " "))}</span></td>
                <td>${formatDate(activity.createdAt)}</td>
                <td>${escapeHtml(activity.id)}</td>
            </tr>
        `;
    }

    historyContent += `</tbody></table></div></div>`;

    if (activities.length === 0) {
        historyContent = `<div class="empty-state"><strong>No activity recorded</strong><p>New account actions will appear here.</p></div>`;
    }

    getPageContent().innerHTML = `
        <div class="page-heading">
            <div>
                <p class="eyebrow">Account record</p>
                <h1>Activity history</h1>
                <p class="page-intro">Review the important actions recorded on your SmartBank account.</p>
            </div>
            <span class="section-count">${activities.length} activities</span>
        </div>
        ${historyContent}
    `;
}

export { renderHistoryPage };

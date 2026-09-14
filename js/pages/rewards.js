import { getUserRewards, playReward } from "../services/rewardService.js";
import { addHistory } from "../services/historyService.js";
import { getCurrentUser } from "../services/userService.js";
import { escapeHtml, formatDate, getPageContent } from "./pageHelpers.js";
import { showSuccessMessage } from "../components/message.js";

function renderRewardHistory(rewards) {
    if (rewards.length === 0) {
        return `<div class="empty-state compact-empty"><strong>No reward draws yet</strong><p>Play the reward draw to start building your points history.</p></div>`;
    }

    let rows = "";

    for (let index = rewards.length - 1; index >= 0; index -= 1) {
        const reward = rewards[index];

        rows += `
            <tr>
                <td>${formatDate(reward.createdAt)}</td>
                <td><span class="status-badge success-badge">+${reward.points} points</span></td>
                <td>${escapeHtml(reward.id)}</td>
            </tr>
        `;
    }

    return `<div class="table-wrap"><table><thead><tr><th>Date</th><th>Points earned</th><th>Reference</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

function renderRewardsPage() {
    const currentUser = getCurrentUser();
    const rewards = getUserRewards(currentUser.id);

    getPageContent().innerHTML = `
        <div class="page-heading">
            <div>
                <p class="eyebrow">Member benefits</p>
                <h1>Rewards</h1>
                <p class="page-intro">Try your luck and earn points you can use across SmartBank benefits.</p>
            </div>
        </div>
        <section class="reward-panel panel">
            <div><span class="result-label">Your current balance</span><strong class="reward-points" id="reward-points">${currentUser.points.toLocaleString("en-US")} points</strong><p>Each draw awards between 0 and 100 points.</p></div>
            <button class="primary-button" id="reward-button" type="button">Play reward draw</button>
        </section>
        <div id="reward-message" aria-live="polite"></div>
        <section class="content-section">
            <div class="section-heading"><div><p class="eyebrow">Your records</p><h2>Reward history</h2></div><span class="section-count">${rewards.length} draws</span></div>
            <div id="reward-table">${renderRewardHistory(rewards)}</div>
        </section>
    `;

    const rewardButton = document.getElementById("reward-button");
    const pointsElement = document.getElementById("reward-points");
    const messageElement = document.getElementById("reward-message");
    const rewardTable = document.getElementById("reward-table");
    const countElement = document.querySelector(".section-count");

    rewardButton.addEventListener("click", function () {
        const points = playReward();
        const updatedUser = getCurrentUser();
        addHistory(updatedUser.id, "reward_played", `Reward earned: ${points} points`);
        pointsElement.textContent = `${updatedUser.points.toLocaleString("en-US")} points`;
        showSuccessMessage(messageElement, `You earned ${points} points. Your balance has been updated.`);
        const updatedRewards = getUserRewards(updatedUser.id);
        rewardTable.innerHTML = renderRewardHistory(updatedRewards);
        countElement.textContent = `${updatedRewards.length} draws`;
    });
}

export { renderRewardsPage };

import { simulateCredit, saveCreditSimulation, getUserCreditSimulations } from "../services/creditService.js";
import { addHistory } from "../services/historyService.js";
import { getCurrentUser } from "../services/userService.js";
import { formatCurrency, formatDate, getPageContent } from "./pageHelpers.js";
import { showSuccessMessage, showErrorMessage } from "../components/message.js";

function renderSimulationRows(simulations) {
    if (simulations.length === 0) {
        return `<div class="empty-state compact-empty"><strong>No saved simulations</strong><p>Your saved calculations will appear here.</p></div>`;
    }

    let rows = "";

    for (let index = simulations.length - 1; index >= 0; index -= 1) {
        const simulation = simulations[index];

        rows += `
            <tr>
                <td>${formatDate(simulation.createdAt)}</td>
                <td>${formatCurrency(simulation.amount)}</td>
                <td>${Number(simulation.annualRate).toFixed(2)}%</td>
                <td>${simulation.duration} months</td>
                <td>${formatCurrency(simulation.monthlyPayment)}</td>
                <td>${formatCurrency(simulation.totalCost)}</td>
            </tr>
        `;
    }

    return `<div class="table-wrap"><table><thead><tr><th>Date</th><th>Amount</th><th>Rate</th><th>Term</th><th>Monthly payment</th><th>Total cost</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

function renderCreditPage() {
    const simulations = getUserCreditSimulations();

    getPageContent().innerHTML = `
        <div class="page-heading">
            <div>
                <p class="eyebrow">Planning tool</p>
                <h1>Simulate your credit</h1>
                <p class="page-intro">Adjust the amount, rate and term to estimate your monthly payment.</p>
            </div>
        </div>
        <div class="split-layout">
            <form class="panel form-panel" id="credit-form" novalidate>
                <div class="panel-heading"><h2>Simulation details</h2><p>All amounts are estimates.</p></div>
                <label for="credit-amount">Amount</label>
                <input id="credit-amount" type="number" min="1" step="0.01" placeholder="50000" required>
                <p class="field-message error" id="credit-amount-error"></p>
                <label for="credit-rate">Annual interest rate (%)</label>
                <input id="credit-rate" type="number" min="0" step="0.01" placeholder="5.9" required>
                <p class="field-message error" id="credit-rate-error"></p>
                <label for="credit-duration">Term (months)</label>
                <input id="credit-duration" type="number" min="1" step="1" placeholder="48" required>
                <p class="field-message error" id="credit-duration-error"></p>
                <div id="credit-action-message" aria-live="polite"></div>
                <button class="primary-button" type="submit">Calculate and save</button>
            </form>
            <section class="panel result-panel" id="credit-result" aria-live="polite">
                <span class="result-label">Estimated monthly payment</span>
                <strong class="result-value">--</strong>
                <p>Enter your details to see an estimate.</p>
            </section>
        </div>
        <section class="content-section">
            <div class="section-heading"><div><p class="eyebrow">Your records</p><h2>Saved simulations</h2></div><span class="section-count">${simulations.length} total</span></div>
            <div id="simulation-table">${renderSimulationRows(simulations)}</div>
        </section>
    `;

    const form = document.getElementById("credit-form");
    const actionMessage = document.getElementById("credit-action-message");
    const result = document.getElementById("credit-result");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const amountText = document.getElementById("credit-amount").value.trim();
        const rateText = document.getElementById("credit-rate").value.trim();
        const durationText = document.getElementById("credit-duration").value.trim();
        const amount = Number(amountText);
        const annualRate = Number(rateText);
        const duration = Number(durationText);

        document.getElementById("credit-amount-error").textContent = "";
        document.getElementById("credit-rate-error").textContent = "";
        document.getElementById("credit-duration-error").textContent = "";

        let formIsValid = true;

        if (amountText === "" || !Number.isFinite(amount) || amount <= 0) {
            document.getElementById("credit-amount-error").textContent = "Enter an amount greater than zero.";
            formIsValid = false;
        }

        if (rateText === "" || !Number.isFinite(annualRate) || annualRate < 0) {
            document.getElementById("credit-rate-error").textContent = "Enter a valid interest rate.";
            formIsValid = false;
        }

        if (durationText === "" || !Number.isFinite(duration) || duration <= 0) {
            document.getElementById("credit-duration-error").textContent = "Enter a term greater than zero.";
            formIsValid = false;
        }

        if (!formIsValid) {
            return;
        }

        const simulation = simulateCredit(amount, annualRate, duration);

        if (simulation === null) {
            return;
        }

        const savedSimulation = saveCreditSimulation(simulation);
        const currentUser = getCurrentUser();

        if (savedSimulation === null) {
            showErrorMessage(actionMessage, "We could not save this simulation. Please try again.");
            return;
        }

        addHistory(currentUser.id, "credit_simulation", "Credit simulation created");
        showSuccessMessage(actionMessage, "Simulation saved to your account.");
        result.innerHTML = `
            <span class="result-label">Estimated monthly payment</span>
            <strong class="result-value">${formatCurrency(simulation.monthlyPayment)}</strong>
            <dl class="result-details">
                <div><dt>Total cost</dt><dd>${formatCurrency(simulation.totalCost)}</dd></div>
                <div><dt>Total interest</dt><dd>${formatCurrency(simulation.totalInterest)}</dd></div>
            </dl>
        `;
        const updatedSimulations = getUserCreditSimulations();
        document.getElementById("simulation-table").innerHTML = renderSimulationRows(updatedSimulations);
        document.querySelector(".section-count").textContent = `${updatedSimulations.length} total`;
    });
}

export { renderCreditPage };

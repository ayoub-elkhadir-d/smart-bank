import { getActiveOffers } from "../services/offerService.js";
import { escapeHtml, formatCurrency, getPageContent } from "./pageHelpers.js";

function renderOffersPage() {
    const offers = getActiveOffers();
    let offerCards = "";

    for (let index = 0; index < offers.length; index += 1) {
        const offer = offers[index];

        offerCards += `
            <article class="offer-card">
                <div class="card-topline">
                    <span class="status-badge success-badge">Available</span>
                    <span class="card-id">${escapeHtml(offer.id)}</span>
                </div>
                <h2>${escapeHtml(offer.title)}</h2>
                <p>${escapeHtml(offer.description)}</p>
                <dl class="detail-list">
                    <div><dt>Up to</dt><dd>${formatCurrency(offer.amount)}</dd></div>
                    <div><dt>Rate from</dt><dd>${Number(offer.interestRate).toFixed(2)}%</dd></div>
                    <div><dt>Term</dt><dd>${offer.duration} months</dd></div>
                </dl>
                <a class="primary-button button-link" href="/credit" data-route>Simulate this offer</a>
            </article>
        `;
    }

    let offersContent = `<div class="offer-grid">${offerCards}</div>`;

    if (offers.length === 0) {
        offersContent = `<div class="empty-state"><strong>No active offers</strong><p>There are no available offers at the moment.</p></div>`;
    }

    getPageContent().innerHTML = `
        <div class="page-heading">
            <div>
                <p class="eyebrow">Borrowing options</p>
                <h1>Offers made for your plans</h1>
                <p class="page-intro">Explore flexible credit options and find a payment plan that fits your needs.</p>
            </div>
            <a class="secondary-button" href="/credit" data-route>Calculate a payment</a>
        </div>
        ${offersContent}
    `;
}

export { renderOffersPage };

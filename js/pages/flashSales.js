import { getActiveFlashSales } from "../services/flashSaleService.js";
import { escapeHtml, formatCurrency, getPageContent } from "./pageHelpers.js";

function renderFlashSalesPage() {
    const sales = getActiveFlashSales();

    const salesContent = sales.length === 0
        ? `<div class="empty-state"><strong>No active flash offers</strong><p>Check back soon for new partner benefits.</p></div>`
        : `<div class="offer-grid sale-grid">
            ${sales.map(sale => {
            const endDate = new Date(sale.endDate).toLocaleDateString("en-US");
            return `
                    <article class="offer-card sale-card">
                        <div class="card-topline">
                            <span class="status-badge warning-badge">${sale.discount}% off</span>
                            <span class="card-id">${escapeHtml(sale.partner)}</span>
                        </div>
                        <h2>${escapeHtml(sale.title)}</h2>
                        <p>${escapeHtml(sale.description)}</p>
                        <div class="price-row">
                            <span class="sale-price">${formatCurrency(sale.salePrice)}</span>
                            <del>${formatCurrency(sale.originalPrice)}</del>
                        </div>
                        <p class="sale-validity">Available until ${endDate}</p>
                    </article>
                `;
        }).join("")}
           </div>`;

    getPageContent().innerHTML = `
        <div class="page-heading">
            <div>
                <p class="eyebrow">Limited-time benefits</p>
                <h1>Flash offers</h1>
                <p class="page-intro">Enjoy selected partner discounts available for a limited time.</p>
            </div>
        </div>
        ${salesContent}
    `;
}

export { renderFlashSalesPage };
import { getActiveFlashSales } from "../services/flashSaleService.js";
import { escapeHtml, formatCurrency, getPageContent } from "./pageHelpers.js";

function renderFlashSalesPage() {
    const sales = getActiveFlashSales();
    let saleCards = "";

    for (let index = 0; index < sales.length; index += 1) {
        const sale = sales[index];
        const endDate = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(sale.endDate));

        saleCards += `
            <article class="offer-card sale-card">
                <div class="card-topline">
                    <span class="status-badge warning-badge">${sale.discount}% off</span>
                    <span class="card-id">${escapeHtml(sale.partner)}</span>
                </div>
                <h2>${escapeHtml(sale.title)}</h2>
                <p>${escapeHtml(sale.description)}</p>
                <div class="price-row"><span class="sale-price">${formatCurrency(sale.salePrice)}</span><del>${formatCurrency(sale.originalPrice)}</del></div>
                <p class="sale-validity">Available until ${endDate}</p>
            </article>
        `;
    }

    let salesContent = `<div class="offer-grid sale-grid">${saleCards}</div>`;

    if (sales.length === 0) {
        salesContent = `<div class="empty-state"><strong>No active flash offers</strong><p>Check back soon for new partner benefits.</p></div>`;
    }

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

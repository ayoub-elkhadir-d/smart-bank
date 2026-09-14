function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function formatCurrency(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "MAD",
        minimumFractionDigits: 2
    }).format(Number(value) || 0);
}

function formatDate(value) {
    return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short"
    }).format(new Date(value));
}

function getPageContent() {
    return document.querySelector(".page-content");
}

export { escapeHtml, formatCurrency, formatDate, getPageContent };

function clearMessage(container) {
    if (container.messageTimer !== undefined) {
        clearTimeout(container.messageTimer);
    }

    container.innerHTML = "";
}

function showMessage(container, text, type) {
    clearMessage(container);

    const message = document.createElement("p");
    message.className = `action-message ${type}-message`;
    message.setAttribute("role", "status");
    message.textContent = text;
    container.appendChild(message);

    container.messageTimer = setTimeout(function () {
        message.classList.add("is-hiding");

        container.messageTimer = setTimeout(function () {
            if (container.contains(message)) {
                container.innerHTML = "";
            }
        }, 250);
    }, 3000);
}

function showSuccessMessage(container, text) {
    showMessage(container, text, "success");
}

function showErrorMessage(container, text) {
    showMessage(container, text, "error");
}

export { showSuccessMessage, showErrorMessage };

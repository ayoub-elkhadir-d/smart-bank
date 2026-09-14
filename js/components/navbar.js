function renderNavbar(options) {
    let navigationLinks = "";

    if (options.isAuthenticated !== true) {
        const loginClass = options.currentPath === "/login" ? "active" : "";
        const registerClass = options.currentPath === "/register" ? "active" : "";

        return `
            <header class="auth-navbar">
                <a class="brand" href="/login" data-route>SmartBank</a>
                <nav class="auth-nav" aria-label="Account navigation">
                    <a class="${loginClass}" href="/login" data-route>Login</a>
                    <a class="${registerClass}" href="/register" data-route>Register</a>
                </nav>
            </header>
        `;
    }

    const links = options.links || [];

    for (let index = 0; index < links.length; index += 1) {
        const link = links[index];
        const activeClass = link.path === options.currentPath ? "active" : "";

        navigationLinks += `<a class="${activeClass}" href="${link.path}" data-route>${link.label}</a>`;
    }

    return `
        <header class="app-header">
            <a class="brand" href="/dashboard" data-route>SmartBank</a>
            <div class="user-summary">
                <span class="user-label">Signed in as</span>
                <strong>${options.userName}</strong>
                <button class="header-action" id="logout-button" type="button">Logout</button>
            </div>
        </header>
        <nav class="main-nav" aria-label="Main navigation">${navigationLinks}</nav>
    `;
}

export { renderNavbar };

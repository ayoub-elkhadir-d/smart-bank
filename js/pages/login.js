import { loginUser } from "../services/userService.js";
import { addHistory } from "../services/historyService.js";
import { validateEmail, validateLoginForm, validateRequired } from "../validation/validation.js";
import { navigateTo } from "../router/router.js";
import { renderNavbar } from "../components/navbar.js";
import { showErrorMessage } from "../components/message.js";

function renderLoginPage(appElement) {
    appElement.innerHTML = `
        <main class="auth-page">
            ${renderNavbar({ isAuthenticated: false, currentPath: "/login" })}
            <section class="auth-card">
                <p class="eyebrow">Secure banking made simple</p>
                <h1>Welcome back</h1>
                <p class="intro">Sign in to manage your money with confidence.</p>
                <form id="login-form" novalidate>
                    <label for="login-email">Email</label>
                    <input id="login-email" name="email" type="email" autocomplete="email" required>
                    <p class="field-message error" id="login-email-error"></p>
                    <label for="login-password">Password</label>
                    <input id="login-password" name="password" type="password" autocomplete="current-password" required>
                    <p class="field-message error" id="login-password-error"></p>
                    <p class="form-message error" id="login-message"></p>
                    <div id="login-action-message" aria-live="polite"></div>
                    <button class="primary-button" type="submit">Login</button>
                </form>
                <a class="text-link" href="/forgot-password" data-route>Forgot password?</a>
                <p class="form-footer">Don't have an account? <a href="/register" data-route>Create an account</a></p>
            </section>
        </main>
    `;

    const loginForm = document.getElementById("login-form");
    const loginMessage = document.getElementById("login-message");
    const loginActionMessage = document.getElementById("login-action-message");

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = {
            email: document.getElementById("login-email").value,
            password: document.getElementById("login-password").value
        };

        document.getElementById("login-email-error").textContent = "";
        document.getElementById("login-password-error").textContent = "";
        loginMessage.textContent = "";

        if (validateEmail(formData.email) === false) {
            document.getElementById("login-email-error").textContent = "Enter a valid email address.";
        }

        if (validateRequired(formData.password) === false) {
            document.getElementById("login-password-error").textContent = "Enter your password.";
        }

        if (validateLoginForm(formData) === false) {
            return;
        }

        const user = await loginUser(formData.email, formData.password);

        if (user === null) {
            showErrorMessage(loginActionMessage, "Email or password is incorrect.");
            return;
        }

        addHistory(user.id, "login", "Successful login");
        navigateTo("/dashboard");
    });
}

export { renderLoginPage };

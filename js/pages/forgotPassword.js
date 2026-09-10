import { getUserByEmail } from "../services/userService.js";
import { navigateTo } from "../router/router.js";

function renderForgotPasswordPage(appElement) {
    appElement.innerHTML = `
        <main class="auth-page">
            <section class="auth-card">
                <a class="brand" href="/login" data-route>SmartBank</a>
                <p class="eyebrow">Account recovery</p>
                <h1>Forgot password?</h1>
                <p class="intro">Enter your email to check your account.</p>
                <form id="forgot-password-form" novalidate>
                    <label for="forgot-password-email">Email</label>
                    <input id="forgot-password-email" name="email" type="email" autocomplete="email" required>
                    <p class="form-message" id="forgot-password-message"></p>
                    <button class="primary-button" type="submit">Reset Password</button>
                </form>
                <p class="form-footer"><a href="/login" data-route>Back to Login</a></p>
            </section>
        </main>
    `;

    const form = document.getElementById("forgot-password-form");
    const message = document.getElementById("forgot-password-message");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("forgot-password-email").value.trim();
        const user = getUserByEmail(email);

        if (user === null) {
            message.className = "form-message error";
            message.textContent = "No account was found with this email.";
            return;
        }

        message.className = "form-message success";
        message.textContent = "If the email exists, you can reset your password.";
    });
}

export { renderForgotPasswordPage };

import { registerUser } from "../services/userService.js";
import { addHistory } from "../services/historyService.js";
import {
    validateEmail,
    validatePassword,
    validatePhone,
    validateRegisterForm,
    validateRequired
} from "../validation/validation.js";
import { navigateTo } from "../router/router.js";
import { renderNavbar } from "../components/navbar.js";
import { showErrorMessage } from "../components/message.js";

function renderRegisterPage(appElement) {
    appElement.innerHTML = `
        <main class="auth-page">
            ${renderNavbar({ isAuthenticated: false, currentPath: "/register" })}
            <section class="auth-card register-card">
                <p class="eyebrow">Start your SmartBank journey</p>
                <h1>Create your account</h1>
                <p class="intro">Open your account in a few simple steps.</p>
                <form id="register-form" novalidate>
                    <div class="form-grid">
                        <div>
                            <label for="register-first-name">First Name</label>
                            <input id="register-first-name" name="firstName" type="text" autocomplete="given-name" required>
                            <p class="field-message error" id="register-first-name-error"></p>
                        </div>
                        <div>
                            <label for="register-last-name">Last Name</label>
                            <input id="register-last-name" name="lastName" type="text" autocomplete="family-name" required>
                            <p class="field-message error" id="register-last-name-error"></p>
                        </div>
                    </div>
                    <label for="register-email">Email</label>
                    <input id="register-email" name="email" type="email" autocomplete="email" required>
                    <p class="field-message error" id="register-email-error"></p>
                    <label for="register-phone">Phone</label>
                    <input id="register-phone" name="phone" type="tel" autocomplete="tel" required>
                    <p class="field-message error" id="register-phone-error"></p>
                    <label for="register-password">Password</label>
                    <input id="register-password" name="password" type="password" autocomplete="new-password" required>
                    <p class="field-message error" id="register-password-error"></p>
                    <label for="register-confirm-password">Confirm Password</label>
                    <input id="register-confirm-password" name="confirmPassword" type="password" autocomplete="new-password" required>
                    <p class="field-message error" id="register-confirm-password-error"></p>
                    <div id="register-action-message" aria-live="polite"></div>
                    <button class="primary-button" type="submit">Create Account</button>
                </form>
                <p class="form-footer">Already have an account? <a href="/login" data-route>Login</a></p>
            </section>
        </main>
    `;

    const registerForm = document.getElementById("register-form");
    const registerActionMessage = document.getElementById("register-action-message");

    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = {
            firstName: document.getElementById("register-first-name").value,
            lastName: document.getElementById("register-last-name").value,
            email: document.getElementById("register-email").value,
            phone: document.getElementById("register-phone").value,
            password: document.getElementById("register-password").value,
            confirmPassword: document.getElementById("register-confirm-password").value
        };

        const errorIds = [
            "register-first-name-error",
            "register-last-name-error",
            "register-email-error",
            "register-phone-error",
            "register-password-error",
            "register-confirm-password-error"
        ];

        for (let index = 0; index < errorIds.length; index += 1) {
            document.getElementById(errorIds[index]).textContent = "";
        }

        if (validateRequired(formData.firstName) === false) {
            document.getElementById("register-first-name-error").textContent = "Enter your first name.";
        }

        if (validateRequired(formData.lastName) === false) {
            document.getElementById("register-last-name-error").textContent = "Enter your last name.";
        }

        if (validateEmail(formData.email) === false) {
            document.getElementById("register-email-error").textContent = "Enter a valid email address.";
        }

        if (validatePhone(formData.phone) === false) {
            document.getElementById("register-phone-error").textContent = "Enter a valid phone number.";
        }

        if (validatePassword(formData.password) === false) {
            document.getElementById("register-password-error").textContent = "Use at least 8 characters.";
        }

        if (validateRequired(formData.confirmPassword) === false) {
            document.getElementById("register-confirm-password-error").textContent = "Confirm your password.";
        } else if (formData.password !== formData.confirmPassword) {
            document.getElementById("register-confirm-password-error").textContent = "Passwords must match.";
        }

        if (validateRegisterForm(formData) === false) {
            return;
        }

        const user = await registerUser(formData);

        if (user === null) {
            showErrorMessage(registerActionMessage, "An account with this email already exists.");
            return;
        }

        addHistory(user.id, "register", "SmartBank account created");
        navigateTo("/login");
    });
}

export { renderRegisterPage };

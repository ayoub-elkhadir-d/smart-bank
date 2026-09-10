import { registerUser } from "../services/userService.js";
import { addHistory } from "../services/historyService.js";
import { validateRegisterForm } from "../validation/validation.js";
import { navigateTo } from "../router/router.js";

function renderRegisterPage(appElement) {
    appElement.innerHTML = `
        <main class="auth-page">
            <section class="auth-card register-card">
                <a class="brand" href="/login" data-route>SmartBank</a>
                <p class="eyebrow">Start your SmartBank journey</p>
                <h1>Create your account</h1>
                <p class="intro">Open your account in a few simple steps.</p>
                <form id="register-form" novalidate>
                    <div class="form-grid">
                        <div>
                            <label for="register-first-name">First Name</label>
                            <input id="register-first-name" name="firstName" type="text" autocomplete="given-name" required>
                        </div>
                        <div>
                            <label for="register-last-name">Last Name</label>
                            <input id="register-last-name" name="lastName" type="text" autocomplete="family-name" required>
                        </div>
                    </div>
                    <label for="register-email">Email</label>
                    <input id="register-email" name="email" type="email" autocomplete="email" required>
                    <label for="register-phone">Phone</label>
                    <input id="register-phone" name="phone" type="tel" autocomplete="tel" required>
                    <label for="register-password">Password</label>
                    <input id="register-password" name="password" type="password" autocomplete="new-password" required>
                    <label for="register-confirm-password">Confirm Password</label>
                    <input id="register-confirm-password" name="confirmPassword" type="password" autocomplete="new-password" required>
                    <p class="form-message error" id="register-message"></p>
                    <button class="primary-button" type="submit">Create Account</button>
                </form>
                <p class="form-footer">Already have an account? <a href="/login" data-route>Login</a></p>
            </section>
        </main>
    `;

    const registerForm = document.getElementById("register-form");
    const registerMessage = document.getElementById("register-message");

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = {
            firstName: document.getElementById("register-first-name").value,
            lastName: document.getElementById("register-last-name").value,
            email: document.getElementById("register-email").value,
            phone: document.getElementById("register-phone").value,
            password: document.getElementById("register-password").value,
            confirmPassword: document.getElementById("register-confirm-password").value
        };

        if (validateRegisterForm(formData) === false) {
            registerMessage.textContent = "Please check all fields and your password confirmation.";
            return;
        }

        const user = registerUser(formData);

        if (user === null) {
            registerMessage.textContent = "An account with this email already exists.";
            return;
        }

        addHistory(user.id, "register", "Compte SmartBank cree");
        navigateTo("/login");
    });
}

export { renderRegisterPage };

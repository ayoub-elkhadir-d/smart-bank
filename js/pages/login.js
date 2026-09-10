import { loginUser } from "../services/userService.js";
import { addHistory } from "../services/historyService.js";
import { validateLoginForm } from "../validation/validation.js";
import { navigateTo } from "../router/router.js";
const event = new Event("")

function renderLoginPage(appElement) {
    let main = document.createElement('main');
    main.className = "auth-page"
    appElement.appendChild(main)

    main.innerHTML = `
            <section class="auth-card">
                <a class="brand" href="/login" data-route>SmartBank</a>
                <p class="eyebrow">Secure banking made simple</p>
                <h1>Welcome Back</h1>
                <p class="intro">Sign in to manage your money with confidence.</p>
                <form id="login-form" novalidate>
                    <label for="login-email">Email</label>
                    <input id="login-email" name="email" type="email" autocomplete="email" required>
                    <label for="login-password">Password</label>
                    <input id="login-password" name="password" type="password" autocomplete="current-password" required>
                    <p class="form-message error" id="login-message"></p>
                    <button class="primary-button" type="submit">Login</button>
                </form>
                <a class="text-link" href="/forgot-password" data-route>Forgot password?</a>
                <p class="form-footer">Don't have an account? <a href="/register" data-route>Create an account</a></p>
            </section>
       
    `;

    const loginForm = document.getElementById("login-form");
    const loginMessage = document.getElementById("login-message");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = {
            email: document.getElementById("login-email").value,
            password: document.getElementById("login-password").value
        };

        if (validateLoginForm(formData) === false) {
            loginMessage.textContent = "Please enter a valid email and password.";
            return;
        }

        const user = loginUser(formData.email, formData.password);

        if (user === null) {
            loginMessage.textContent = "Email or password is incorrect.";
            return;
        }

        addHistory(user.id, "login", "Connexion reussie");
        navigateTo("/dashboard");
    });
}

export { renderLoginPage };

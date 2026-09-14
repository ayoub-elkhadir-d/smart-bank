import { changePassword, getCurrentUser, updateUser } from "../services/userService.js";
import { addHistory } from "../services/historyService.js";
import { validatePassword, validatePhone, validateRequired } from "../validation/validation.js";
import { escapeHtml, formatDate, getPageContent } from "./pageHelpers.js";
import { showSuccessMessage, showErrorMessage } from "../components/message.js";

function renderProfilePage() {
    const user = getCurrentUser();

    getPageContent().innerHTML = `
        <div class="page-heading">
            <div>
                <p class="eyebrow">Account settings</p>
                <h1>Your profile</h1>
                <p class="page-intro">Keep your personal information and sign-in details up to date.</p>
            </div>
        </div>
        <div class="profile-grid">
            <form class="panel" id="profile-form" novalidate>
                <div class="panel-heading"><h2>Personal information</h2><p>Member since ${formatDate(user.createdAt).split(",")[0]}</p></div>
                <div class="form-grid">
                    <div><label for="profile-first-name">First name</label><input id="profile-first-name" type="text" value="${escapeHtml(user.firstName)}" required><p class="field-message error" id="profile-first-name-error"></p></div>
                    <div><label for="profile-last-name">Last name</label><input id="profile-last-name" type="text" value="${escapeHtml(user.lastName)}" required><p class="field-message error" id="profile-last-name-error"></p></div>
                </div>
                <label for="profile-email">Email</label>
                <input id="profile-email" type="email" value="${escapeHtml(user.email)}" disabled>
                <label for="profile-phone">Phone</label>
                <input id="profile-phone" type="tel" value="${escapeHtml(user.phone)}" required>
                <p class="field-message error" id="profile-phone-error"></p>
                <div id="profile-action-message" aria-live="polite"></div>
                <button class="primary-button" type="submit">Save changes</button>
            </form>
            <form class="panel" id="password-form" novalidate>
                <div class="panel-heading"><h2>Change password</h2><p>Use at least 8 characters.</p></div>
                <label for="current-password">Current password</label>
                <input id="current-password" type="password" autocomplete="current-password" required>
                <p class="field-message error" id="current-password-error"></p>
                <label for="new-password">New password</label>
                <input id="new-password" type="password" autocomplete="new-password" required>
                <p class="field-message error" id="new-password-error"></p>
                <label for="confirm-new-password">Confirm new password</label>
                <input id="confirm-new-password" type="password" autocomplete="new-password" required>
                <p class="field-message error" id="confirm-new-password-error"></p>
                <div id="password-action-message" aria-live="polite"></div>
                <button class="secondary-button" type="submit">Update password</button>
            </form>
        </div>
    `;

    document.getElementById("profile-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const firstName = document.getElementById("profile-first-name").value.trim();
        const lastName = document.getElementById("profile-last-name").value.trim();
        const phone = document.getElementById("profile-phone").value.trim();
        const actionMessage = document.getElementById("profile-action-message");

        document.getElementById("profile-first-name-error").textContent = "";
        document.getElementById("profile-last-name-error").textContent = "";
        document.getElementById("profile-phone-error").textContent = "";

        let profileIsValid = true;

        if (!validateRequired(firstName)) {
            document.getElementById("profile-first-name-error").textContent = "Enter your first name.";
            profileIsValid = false;
        }

        if (!validateRequired(lastName)) {
            document.getElementById("profile-last-name-error").textContent = "Enter your last name.";
            profileIsValid = false;
        }

        if (!validatePhone(phone)) {
            document.getElementById("profile-phone-error").textContent = "Enter a valid phone number.";
            profileIsValid = false;
        }

        if (!profileIsValid) {
            return;
        }

        updateUser(user.id, { firstName, lastName, phone });
        addHistory(user.id, "profile_updated", "Profile information updated");
        showSuccessMessage(actionMessage, "Your profile has been updated.");
    });

    document.getElementById("password-form").addEventListener("submit", async function (event) {
        event.preventDefault();
        const oldPassword = document.getElementById("current-password").value;
        const newPassword = document.getElementById("new-password").value;
        const confirmPassword = document.getElementById("confirm-new-password").value;
        const actionMessage = document.getElementById("password-action-message");

        document.getElementById("current-password-error").textContent = "";
        document.getElementById("new-password-error").textContent = "";
        document.getElementById("confirm-new-password-error").textContent = "";

        let passwordFormIsValid = true;

        if (!validateRequired(oldPassword)) {
            document.getElementById("current-password-error").textContent = "Enter your current password.";
            passwordFormIsValid = false;
        }

        if (!validatePassword(newPassword)) {
            document.getElementById("new-password-error").textContent = "Use at least 8 characters.";
            passwordFormIsValid = false;
        }

        if (!validateRequired(confirmPassword)) {
            document.getElementById("confirm-new-password-error").textContent = "Confirm your new password.";
            passwordFormIsValid = false;
        } else if (newPassword !== confirmPassword) {
            document.getElementById("confirm-new-password-error").textContent = "Passwords must match.";
            passwordFormIsValid = false;
        }

        if (!passwordFormIsValid) {
            return;
        }

        const passwordChanged = await changePassword(user.id, oldPassword, newPassword);

        if (!passwordChanged) {
            showErrorMessage(actionMessage, "The current password is incorrect.");
            return;
        }

        addHistory(user.id, "password_changed", "Password updated");
        showSuccessMessage(actionMessage, "Your password has been updated.");
        document.getElementById("password-form").reset();
    });
}

export { renderProfilePage };

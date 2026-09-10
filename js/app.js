import { save, get } from "./storage/storage.js";
import { initialData } from "./data/initialData.js";
import {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
} from "./services/userService.js";
import {
    simulateCredit,
    saveCreditSimulation
} from "./services/creditService.js";
import { playReward } from "./services/rewardService.js";
import { addHistory } from "./services/historyService.js";
import { getDashboardData } from "./services/dashboardService.js";
import {
    validateRegisterForm,
    validateLoginForm
} from "./validation/validation.js";
import { navigateTo, router } from "./router/router.js";


function initializeData() {
    for (const key in initialData) {
        if (get(key) === null) {
            save(key, initialData[key]);
        }
    }
}


function register(formData) {
    if (validateRegisterForm(formData) === false) {
        return null;
    }

    const newUser = registerUser(formData);

    if (newUser === null) {
        return null;
    }

    addHistory(newUser.id, "register", "Compte SmartBank cree");
    navigateTo("/login");

    return newUser;
}


function login(formData) {
    if (validateLoginForm(formData) === false) {
        return null;
    }

    const user = loginUser(formData.email, formData.password);

    if (user === null) {
        return null;
    }

    addHistory(user.id, "login", "Connexion reussie");
    navigateTo("/dashboard");

    return user;
}


function logout() {
    const currentUser = getCurrentUser();

    if (currentUser !== null) {
        addHistory(currentUser.id, "logout", "Deconnexion");
    }

    logoutUser();
    navigateTo("/login");
}


function createCreditSimulation(amount, annualRate, duration) {
    const simulation = simulateCredit(amount, annualRate, duration);

    if (simulation === null) {
        return null;
    }

    const savedSimulation = saveCreditSimulation(simulation);

    if (savedSimulation !== null) {
        addHistory(savedSimulation.userId, "credit_simulation", "Simulation de credit creee");
    }

    return savedSimulation;
}


function playUserReward() {
    const currentUser = getCurrentUser();

    if (currentUser === null) {
        return null;
    }

    const rewardPoints = playReward();
    addHistory(currentUser.id, "reward_played", "Recompense obtenue : " + rewardPoints + " points");

    return rewardPoints;
}


function loadDashboard() {
    const currentUser = getCurrentUser();

    if (currentUser === null) {
        return null;
    }

    return getDashboardData(currentUser.id);
}


initializeData();
router();

export {
    initializeData,
    register,
    login,
    logout,
    createCreditSimulation,
    playUserReward,
    loadDashboard
};

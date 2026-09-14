import { save, get, remove } from "./storage/storage.js";
import { initialData } from "./data/initialData.js";
import { router } from "./router/router.js";

function initializeData() {
    remove("transactions");

    for (const key in initialData) {
        if (get(key) === null) {
            save(key, initialData[key]);
        }
    }

    const users = get("users") || [];
    const currentUser = get("currentUser");

    if (currentUser !== null) {
        for (let index = 0; index < users.length; index += 1) {
            if (users[index].id === currentUser.id) {
                save("currentUser", users[index]);
                break;
            }
        }
    }
}

initializeData();
router();

export { initializeData };

import { save, get, remove } from "../storage/storage.js";


function registerUser(userData) {
    
    const users = get("users") || [];

    
    for (let index = 0; index < users.length; index += 1) {
        if (users[index].email.toLowerCase() === userData.email.toLowerCase()) {
            return null;
        }
    }

    
    const newUser = {
        id: "USR-" + Date.now(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
        balance: 0,
        points: 0,
        createdAt: new Date().toISOString()
    };

    
    users.push(newUser);

    
    save("users", users);

    
    return newUser;
}


function loginUser(email, password) {
    
    const users = get("users") || [];

    
    for (let index = 0; index < users.length; index += 1) {
        const user = users[index];

        if (user.email.toLowerCase() === email.toLowerCase() && user.password === password) {
            
            save("currentUser", user);

            
            return user;
        }
    }

    
    return null;
}


function logoutUser() {
    
    remove("currentUser");
}


function getCurrentUser() {
    
    return get("currentUser");
}


function getUserById(userId) {
    
    const users = get("users") || [];

    
    for (let index = 0; index < users.length; index += 1) {
        if (users[index].id === userId) {
            return users[index];
        }
    }

    
    return null;
}

function getUserByEmail(email) {
    const users = get("users") || [];

    for (let index = 0; index < users.length; index += 1) {
        if (users[index].email.toLowerCase() === email.toLowerCase()) {
            return users[index];
        }
    }

    return null;
}


function updateUser(userId, userData) {
    
    const users = get("users") || [];

    
    for (let index = 0; index < users.length; index += 1) {
        const user = users[index];

        if (user.id === userId) {
            
            for (const property in userData) {
                user[property] = userData[property];
            }

            
            save("users", users);

            
            const currentUser = get("currentUser");

            if (currentUser !== null && currentUser.id === userId) {
                save("currentUser", user);
            }

            
            return user;
        }
    }

    
    return null;
}


function changePassword(userId, oldPassword, newPassword) {
    
    const user = getUserById(userId);

    
    if (user === null || user.password !== oldPassword) {
        return false;
    }

    
    const users = get("users") || [];

    for (let index = 0; index < users.length; index += 1) {
        if (users[index].id === userId) {
            users[index].password = newPassword;
            save("users", users);

            
            const currentUser = get("currentUser");

            if (currentUser !== null && currentUser.id === userId) {
                currentUser.password = newPassword;
                save("currentUser", currentUser);
            }

            return true;
        }
    }

    
    return false;
}

export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    getUserById,
    getUserByEmail,
    updateUser,
    changePassword
};

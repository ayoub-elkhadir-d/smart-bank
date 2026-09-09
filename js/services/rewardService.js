import { save, get } from "../storage/storage.js";


function getUserPoints(userId) {
    
    const users = get("users") || [];

    
    for (let index = 0; index < users.length; index += 1) {
        if (users[index].id === userId) {
            return users[index].points;
        }
    }

    
    return null;
}


function addPoints(userId, points) {
    
    if (points <= 0) {
        return null;
    }

    
    const users = get("users") || [];

    
    for (let index = 0; index < users.length; index += 1) {
        const user = users[index];

        if (user.id === userId) {
            
            user.points += points;

            
            save("users", users);

            
            const currentUser = get("currentUser");

            if (currentUser !== null && currentUser.id === userId) {
                currentUser.points = user.points;
                save("currentUser", currentUser);
            }

            
            return user.points;
        }
    }

    
    return null;
}


function removePoints(userId, points) {
    
    if (points <= 0) {
        return null;
    }

    
    const users = get("users") || [];

    
    for (let index = 0; index < users.length; index += 1) {
        const user = users[index];

        if (user.id === userId) {
            
            if (user.points < points) {
                return null;
            }

            
            user.points -= points;

            
            save("users", users);

            
            const currentUser = get("currentUser");

            if (currentUser !== null && currentUser.id === userId) {
                currentUser.points = user.points;
                save("currentUser", currentUser);
            }

            
            return user.points;
        }
    }

    
    return null;
}


function playReward() {
    
    const currentUser = get("currentUser");

    
    if (currentUser === null) {
        return null;
    }

    
    const possibleRewards = [10, 20, 50, 100, 0];

    
    const randomNumber = Math.random();

    
    const randomIndex = Math.floor(randomNumber * possibleRewards.length);

    
    const rewardPoints = possibleRewards[randomIndex];

    
    addPoints(currentUser.id, rewardPoints);

    
    saveReward(currentUser.id, rewardPoints);

    
    return rewardPoints;
}


function saveReward(userId, points) {
    
    const rewardHistory = get("rewardHistory") || [];

    
    const reward = {
        id: "RWD-HISTORY-" + Date.now(),
        userId,
        points,
        createdAt: new Date().toISOString()
    };

    
    rewardHistory.push(reward);

    
    save("rewardHistory", rewardHistory);

    
    return reward;
}


function getUserRewards(userId) {
    
    const rewardHistory = get("rewardHistory") || [];
    const userRewards = [];

    
    for (let index = 0; index < rewardHistory.length; index += 1) {
        if (rewardHistory[index].userId === userId) {
            userRewards.push(rewardHistory[index]);
        }
    }

    
    return userRewards;
}

export {
    getUserPoints,
    addPoints,
    removePoints,
    playReward,
    saveReward,
    getUserRewards
};

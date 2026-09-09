import { save, get } from "../storage/storage.js";


function addHistory(userId, action, description) {
    
    const history = get("history") || [];

    
    const newActivity = {
        id: "HIS-" + Date.now(),
        userId,
        action,
        description,
        createdAt: new Date().toISOString()
    };

    
    history.push(newActivity);

    
    save("history", history);

    
    return newActivity;
}


function getUserHistory(userId) {
    
    const history = get("history") || [];
    const userHistory = [];

    
    for (let index = 0; index < history.length; index += 1) {
        if (history[index].userId === userId) {
            userHistory.push(history[index]);
        }
    }

    
    return userHistory;
}

export { addHistory, getUserHistory };

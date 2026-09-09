import { getUserById } from "./userService.js";
import { getUserCreditSimulations } from "./creditService.js";
import { getUserRewards } from "./rewardService.js";
import { getActiveFlashSales } from "./flashSaleService.js";
import { getUserHistory } from "./historyService.js";


function getDashboardData(userId) {
    
    const user = getUserById(userId);

    
    if (user === null) {
        return null;
    }

    
    const creditSimulations = getUserCreditSimulations(userId);

    
    const rewards = getUserRewards(userId);

    
    const activeFlashSales = getActiveFlashSales();

    
    const recentActivities = getUserHistory(userId);

    
    if (recentActivities.length > 5) {
        recentActivities.splice(0, recentActivities.length - 5);
    }

    
    return {
        user: user,
        balance: user.balance,
        points: user.points,
        creditSimulationCount: creditSimulations.length,
        rewardCount: rewards.length,
        activeOfferCount: activeFlashSales.length,
        recentActivities: recentActivities
    };
}

export { getDashboardData };

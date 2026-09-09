import { save, get } from "../storage/storage.js";


function simulateCredit(amount, annualRate, duration) {
    
    if (amount <= 0 || annualRate < 0 || duration <= 0) {
        return null;
    }

    
    const annualRateDecimal = annualRate / 100;

    
    const durationInYears = duration / 12;

    
    const totalInterest = amount * annualRateDecimal * durationInYears;

    
    const totalCost = amount + totalInterest;

    
    const monthlyPayment = totalCost / duration;

    
    return {
        amount: Math.round(amount * 100) / 100,
        annualRate: Math.round(annualRate * 100) / 100,
        duration,
        monthlyPayment: Math.round(monthlyPayment * 100) / 100,
        totalCost: Math.round(totalCost * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100
    };
}


function saveCreditSimulation(simulationData) {
    
    const currentUser = get("currentUser");

    
    if (currentUser === null) {
        return null;
    }

    
    const simulations = get("creditSimulations") || [];

    
    const newSimulation = {
        id: "SIM-" + Date.now(),
        userId: currentUser.id,
        amount: simulationData.amount,
        annualRate: simulationData.annualRate,
        duration: simulationData.duration,
        monthlyPayment: simulationData.monthlyPayment,
        totalCost: simulationData.totalCost,
        totalInterest: simulationData.totalInterest,
        createdAt: new Date().toISOString()
    };

    
    simulations.push(newSimulation);

    
    save("creditSimulations", simulations);

    
    return newSimulation;
}


function getUserCreditSimulations(userId) {
    
    if (userId === undefined) {
        const currentUser = get("currentUser");

        if (currentUser === null) {
            return [];
        }

        userId = currentUser.id;
    }

    
    const simulations = get("creditSimulations") || [];
    const userSimulations = [];

    
    for (let index = 0; index < simulations.length; index += 1) {
        if (simulations[index].userId === userId) {
            userSimulations.push(simulations[index]);
        }
    }

    
    return userSimulations;
}


function getCreditSimulationById(simulationId) {
    
    const simulations = get("creditSimulations") || [];

    for (let index = 0; index < simulations.length; index += 1) {
        if (simulations[index].id === simulationId) {
            return simulations[index];
        }
    }

    
    return null;
}

export {
    simulateCredit,
    saveCreditSimulation,
    getUserCreditSimulations,
    getCreditSimulationById
};

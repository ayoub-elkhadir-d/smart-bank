const users = [
    {
        id: "USR-001",
        firstName: "Nadia",
        lastName: "Bennani",
        email: "nadia.bennani@example.com",
        phone: "+212600000001",
        password: "Nadia123!",
        balance: 12500.5,
        points: 840,
        createdAt: "2026-01-15T09:30:00Z"
    },
    {
        id: "USR-002",
        firstName: "Youssef",
        lastName: "Amrani",
        email: "youssef.amrani@example.com",
        phone: "+212600000002",
        password: "Youssef123!",
        balance: 7850,
        points: 420,
        createdAt: "2026-02-03T14:10:00Z"
    },
    {
        id: "USR-003",
        firstName: "Salma",
        lastName: "Idrissi",
        email: "salma.idrissi@example.com",
        phone: "+212600000003",
        password: "Salma123!",
        balance: 24800.75,
        points: 1560,
        createdAt: "2026-02-20T11:45:00Z"
    }
];





const currentUser = null;

const offers = [
    {
        id: "OFF-001",
        title: "Credit Projet",
        description: "Financez un projet personnel avec des mensualites adaptees.",
        type: "personal",
        amount: 50000,
        interestRate: 5.9,
        duration: 48,
        active: true
    },
    {
        id: "OFF-002",
        title: "Credit Auto",
        description: "Une solution de financement pour acheter une voiture neuve ou d'occasion.",
        type: "auto",
        amount: 120000,
        interestRate: 4.75,
        duration: 60,
        active: true
    },
    {
        id: "OFF-003",
        title: "Credit Travaux",
        description: "Realisez vos travaux de renovation avec un financement flexible.",
        type: "home",
        amount: 80000,
        interestRate: 6.2,
        duration: 36,
        active: false
    }
];












const creditSimulations = [
    {
        id: "SIM-001",
        userId: "USR-001",
        offerId: "OFF-001",
        amount: 30000,
        interestRate: 5.9,
        duration: 48,
        monthlyPayment: 702.4,
        totalPayment: 33715.2,
        createdAt: "2026-09-01T10:20:00Z",
        status: "draft"
    },
    {
        id: "SIM-002",
        userId: "USR-002",
        offerId: "OFF-002",
        amount: 90000,
        interestRate: 4.75,
        duration: 60,
        monthlyPayment: 1686.15,
        totalPayment: 101169,
        createdAt: "2026-09-03T16:05:00Z",
        status: "submitted"
    }
];








const rewards = [
    {
        id: "RWD-001",
        title: "Bon d'achat 50 DH",
        description: "Un bon d'achat utilisable chez un partenaire SmartBank.",
        pointsCost: 500,
        category: "shopping",
        active: true
    },
    {
        id: "RWD-002",
        title: "Frais de transfert offerts",
        description: "Un transfert national sans frais.",
        pointsCost: 300,
        category: "banking",
        active: true
    },
    {
        id: "RWD-003",
        title: "Bonus de bienvenue",
        description: "Une ancienne recompense qui n'est plus disponible.",
        pointsCost: 1000,
        category: "bonus",
        active: false
    }
];







const flashSales = [
    {
        id: "SALE-001",
        title: "Week-end partenaire",
        description: "Profitez d'une reduction sur une selection de produits.",
        partner: "Maroc Market",
        discount: 15,
        originalPrice: 1200,
        salePrice: 1020,
        startDate: "2026-09-01T00:00:00Z",
        endDate: "2026-09-15T23:59:59Z",
        active: true
    },
    {
        id: "SALE-002",
        title: "Reduction epargne",
        description: "Profitez de 10% de reduction sur les frais d'epargne.",
        partner: "SmartBank",
        discount: 10,
        originalPrice: 500,
        salePrice: 450,
        startDate: "2026-08-01T00:00:00Z",
        endDate: "2026-08-31T23:59:59Z",
        active: false
    }
];









const transactions = [
    {
        id: "TXN-001",
        userId: "USR-001",
        type: "deposit",
        amount: 2500,
        description: "Virement recu",
        status: "completed",
        createdAt: "2026-09-04T08:45:00Z"
    },
    {
        id: "TXN-002",
        userId: "USR-001",
        type: "payment",
        amount: -185.5,
        description: "Paiement facture internet",
        status: "completed",
        createdAt: "2026-09-05T19:15:00Z"
    },
    {
        id: "TXN-003",
        userId: "USR-002",
        type: "transfer",
        amount: -600,
        description: "Transfert vers un beneficiaire",
        status: "pending",
        createdAt: "2026-09-06T12:00:00Z"
    }
];







const history = [
    {
        id: "HIS-001",
        userId: "USR-001",
        action: "login",
        description: "Connexion reussie",
        createdAt: "2026-09-06T09:00:00Z"
    },
    {
        id: "HIS-002",
        userId: "USR-001",
        action: "simulation_created",
        description: "Simulation de credit creee",
        createdAt: "2026-09-06T09:12:00Z"
    },
    {
        id: "HIS-003",
        userId: "USR-002",
        action: "profile_updated",
        description: "Numero de telephone modifie",
        createdAt: "2026-09-06T15:30:00Z"
    }
];


const initialData = {
    users,
    currentUser,
    offers,
    creditSimulations,
    rewards,
    flashSales,
    transactions,
    history
};

export {
    users,
    currentUser,
    offers,
    creditSimulations,
    rewards,
    flashSales,
    transactions,
    history,
    initialData
};

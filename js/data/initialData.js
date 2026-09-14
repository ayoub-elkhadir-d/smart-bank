const users = [
    {
        id: "USR-001",
        firstName: "Nadia",
        lastName: "Bennani",
        email: "nadia.bennani@example.com",
        phone: "+212600000001",
        password: "password",
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
        title: "Personal project credit",
        description: "Finance a personal project with flexible monthly payments.",
        type: "personal",
        amount: 50000,
        interestRate: 5.9,
        duration: 48,
        active: true
    },
    {
        id: "OFF-002",
        title: "Auto credit",
        description: "A financing solution for a new or used car.",
        type: "auto",
        amount: 120000,
        interestRate: 4.75,
        duration: 60,
        active: true
    },
    {
        id: "OFF-003",
        title: "Home improvement credit",
        description: "Complete your renovation with flexible financing.",
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
        annualRate: 5.9,
        duration: 48,
        monthlyPayment: 702.4,
        totalCost: 33715.2,
        totalInterest: 3715.2,
        createdAt: "2026-09-01T10:20:00Z",
        status: "draft"
    },
    {
        id: "SIM-002",
        userId: "USR-002",
        offerId: "OFF-002",
        amount: 90000,
        annualRate: 4.75,
        duration: 60,
        monthlyPayment: 1686.15,
        totalCost: 101169,
        totalInterest: 11169,
        createdAt: "2026-09-03T16:05:00Z",
        status: "submitted"
    }
];

const rewards = [
    {
        id: "RWD-001",
        title: "50 DH shopping voucher",
        description: "A voucher to use with a SmartBank partner.",
        pointsCost: 500,
        category: "shopping",
        active: true
    },
    {
        id: "RWD-002",
        title: "Fee-free transfer",
        description: "One national transfer with no fee.",
        pointsCost: 300,
        category: "banking",
        active: true
    },
    {
        id: "RWD-003",
        title: "Welcome bonus",
        description: "A previous reward that is no longer available.",
        pointsCost: 1000,
        category: "bonus",
        active: false
    }
];


const flashSales = [
    {
        id: "SALE-001",
        title: "Partner weekend",
        description: "Enjoy a discount on a selection of products.",
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
        title: "Savings discount",
        description: "Get 10% off savings fees.",
        partner: "SmartBank",
        discount: 10,
        originalPrice: 500,
        salePrice: 450,
        startDate: "2026-08-01T00:00:00Z",
        endDate: "2026-08-31T23:59:59Z",
        active: false
    }
];









const history = [
    {
        id: "HIS-001",
        userId: "USR-001",
        action: "login",
        description: "Successful login",
        createdAt: "2026-09-06T09:00:00Z"
    },
    {
        id: "HIS-002",
        userId: "USR-001",
        action: "simulation_created",
        description: "Credit simulation created",
        createdAt: "2026-09-06T09:12:00Z"
    },
    {
        id: "HIS-003",
        userId: "USR-002",
        action: "profile_updated",
        description: "Phone number updated",
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
    history
};

export {
    users,
    currentUser,
    offers,
    creditSimulations,
    rewards,
    flashSales,
    history,
    initialData
};

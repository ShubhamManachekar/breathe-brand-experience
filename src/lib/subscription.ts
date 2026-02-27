// EZE AirCare Subscription Model
// - 6 and 12 month subscription options
// - Customer selects aroma oil for each device each month
// - Oil size (ml) is based on the device type
// - Can change oil selection 15 days before delivery

export interface SubscriptionPlan {
    id: string;
    name: string;
    durationMonths: 6 | 12;
    discountPercent: number;
    description: string;
}

export interface DeviceType {
    id: string;
    name: string;
    oilCapacityMl: number;
    coverageArea: string;
}

export interface AromaOil {
    id: string;
    name: string;
    category: 'fresh' | 'floral' | 'woody' | 'citrus' | 'herbal' | 'signature';
    description: string;
    color: string; // For visual display
}

export interface MonthlyOilSelection {
    month: string; // "YYYY-MM"
    selections: DeviceOilSelection[];
    status: 'completed' | 'current' | 'upcoming' | 'pending';
    canModify: boolean;
    daysUntilDeadline: number;
}

export interface DeviceOilSelection {
    deviceId: string;
    deviceName: string;
    deviceType: DeviceType;
    selectedOilId: string;
    selectedOil: AromaOil | null;
}

export interface UserDevice {
    id: string;
    name: string;
    location: string;
    deviceType: DeviceType;
    status: 'online' | 'offline';
    installedDate: string;
}

export interface UserSubscription {
    id: string;
    plan: SubscriptionPlan;
    status: 'active' | 'paused' | 'cancelled' | 'expired';
    startDate: string;
    endDate: string;
    devices: UserDevice[];
    monthlySelections: MonthlyOilSelection[];
    paymentMethod?: PaymentMethod;
    autoRenew: boolean;
}

export interface PaymentMethod {
    id: string;
    type: 'card' | 'upi' | 'bank_transfer';
    last4?: string;
    brand?: string;
}

// Subscription Plans - 6 and 12 months
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
    {
        id: '6-month',
        name: '6 Month Plan',
        durationMonths: 6,
        discountPercent: 10,
        description: 'Flexible 6-month subscription with 10% discount',
    },
    {
        id: '12-month',
        name: '12 Month Plan',
        durationMonths: 12,
        discountPercent: 20,
        description: 'Best value! 12-month subscription with 20% discount',
    },
];

// Device Types with Oil Capacity
export const DEVICE_TYPES: DeviceType[] = [
    { id: 'eze-mini', name: 'EZE Mini', oilCapacityMl: 100, coverageArea: 'Up to 500 sq ft' },
    { id: 'eze-pro', name: 'EZE Pro', oilCapacityMl: 250, coverageArea: 'Up to 2,000 sq ft' },
    { id: 'eze-max', name: 'EZE Max', oilCapacityMl: 500, coverageArea: 'Up to 5,000 sq ft' },
    { id: 'eze-industrial', name: 'EZE Industrial', oilCapacityMl: 1000, coverageArea: 'Up to 10,000 sq ft' },
];

// Available Aroma Oils
export const AROMA_OILS: AromaOil[] = [
    { id: 'lavender-dream', name: 'Lavender Dream', category: 'floral', description: 'Calming lavender with hints of chamomile', color: '#9b87f5' },
    { id: 'citrus-burst', name: 'Citrus Burst', category: 'citrus', description: 'Energizing orange and lemon blend', color: '#f59e0b' },
    { id: 'ocean-breeze', name: 'Ocean Breeze', category: 'fresh', description: 'Fresh marine notes with sea salt', color: '#0ea5e9' },
    { id: 'forest-mist', name: 'Forest Mist', category: 'woody', description: 'Pine and cedar wood essence', color: '#22c55e' },
    { id: 'green-tea', name: 'Green Tea', category: 'herbal', description: 'Light green tea with jasmine', color: '#84cc16' },
    { id: 'sandalwood-spice', name: 'Sandalwood Spice', category: 'woody', description: 'Warm sandalwood with cinnamon', color: '#a16207' },
    { id: 'rose-garden', name: 'Rose Garden', category: 'floral', description: 'Classic rose with soft petals', color: '#ec4899' },
    { id: 'eze-signature', name: 'EZE Signature', category: 'signature', description: 'Our exclusive premium blend', color: '#252442' },
    { id: 'mint-fresh', name: 'Mint Fresh', category: 'herbal', description: 'Cool peppermint sensation', color: '#14b8a6' },
    { id: 'vanilla-comfort', name: 'Vanilla Comfort', category: 'woody', description: 'Warm vanilla with amber', color: '#d4a574' },
];

// Mock User Devices
export const MOCK_USER_DEVICES: UserDevice[] = [
    { id: 'dev-001', name: 'Lobby Diffuser', location: 'Main Lobby', deviceType: DEVICE_TYPES[1], status: 'online', installedDate: '2024-01-01' },
    { id: 'dev-002', name: 'Conference Room', location: 'Floor 2, Room 201', deviceType: DEVICE_TYPES[0], status: 'online', installedDate: '2024-01-15' },
    { id: 'dev-003', name: 'Executive Suite', location: 'Floor 5', deviceType: DEVICE_TYPES[2], status: 'online', installedDate: '2024-01-20' },
];

// Helper Functions
export const formatMonth = (monthStr: string): string => {
    const [year, month] = monthStr.split('-').map(Number);
    const date = new Date(year, month - 1, 1);
    return date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
};

export const formatMonthFull = (monthStr: string): string => {
    const [year, month] = monthStr.split('-').map(Number);
    const date = new Date(year, month - 1, 1);
    return date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
};

export const canModifySelection = (monthStr: string): { canModify: boolean; daysUntilDeadline: number } => {
    const today = new Date();
    const [year, month] = monthStr.split('-').map(Number);
    const deliveryDate = new Date(year, month - 1, 1);
    const deadlineDate = new Date(deliveryDate);
    deadlineDate.setDate(deliveryDate.getDate() - 15);

    const diffTime = deadlineDate.getTime() - today.getTime();
    const daysUntilDeadline = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
        canModify: daysUntilDeadline > 0,
        daysUntilDeadline: Math.max(0, daysUntilDeadline),
    };
};

export const calculateOilPrice = (capacityMl: number): number => {
    const pricePerMl = 2;
    return capacityMl * pricePerMl;
};

export const getMonthStatus = (monthStr: string): 'completed' | 'current' | 'upcoming' | 'pending' => {
    const today = new Date();
    const [year, month] = monthStr.split('-').map(Number);
    const monthDate = new Date(year, month - 1, 1);
    const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    if (monthDate < currentMonth) return 'completed';
    if (monthDate.getTime() === currentMonth.getTime()) return 'current';

    const { canModify } = canModifySelection(monthStr);
    return canModify ? 'upcoming' : 'pending';
};

export const getOilById = (id: string): AromaOil | null => {
    return AROMA_OILS.find(oil => oil.id === id) || null;
};

// Generate all months for subscription duration
export const generateSubscriptionMonths = (startDate: string, durationMonths: number): string[] => {
    const months: string[] = [];
    const start = new Date(startDate);

    for (let i = 0; i < durationMonths; i++) {
        const date = new Date(start.getFullYear(), start.getMonth() + i, 1);
        months.push(date.toISOString().slice(0, 7));
    }

    return months;
};

// Fetch monthly selections for entire plan from API
export const fetchMonthlySelections = async (startDate = '2024-01-01', durationMonths = 12): Promise<MonthlyOilSelection[]> => {
    // In a real application, this would be a Supabase call:
    // const { data, error } = await supabase.from('monthly_selections').select('*').eq('subscription_id', 'sub-001');

    // For now, we simulate an API call with a delay
    return new Promise((resolve) => {
        setTimeout(() => {
            const subscriptionMonths = generateSubscriptionMonths(startDate, durationMonths);
            const oilRotation = [
                ['lavender-dream', 'citrus-burst', 'eze-signature'],
                ['ocean-breeze', 'forest-mist', 'lavender-dream'],
                ['citrus-burst', 'green-tea', 'ocean-breeze'],
                ['eze-signature', 'rose-garden', 'forest-mist'],
                ['mint-fresh', 'vanilla-comfort', 'citrus-burst'],
                ['lavender-dream', 'sandalwood-spice', 'green-tea'],
                ['forest-mist', 'citrus-burst', 'rose-garden'],
                ['ocean-breeze', 'eze-signature', 'mint-fresh'],
                ['vanilla-comfort', 'lavender-dream', 'sandalwood-spice'],
                ['green-tea', 'ocean-breeze', 'eze-signature'],
                ['rose-garden', 'mint-fresh', 'lavender-dream'],
                ['eze-signature', 'citrus-burst', 'forest-mist'],
            ];

            const selections = subscriptionMonths.map((month, index) => {
                const status = getMonthStatus(month);
                const { canModify, daysUntilDeadline } = canModifySelection(month);
                const oils = oilRotation[index % oilRotation.length];

                return {
                    month,
                    status,
                    canModify,
                    daysUntilDeadline,
                    selections: MOCK_USER_DEVICES.map((device, deviceIndex) => ({
                        deviceId: device.id,
                        deviceName: device.name,
                        deviceType: device.deviceType,
                        selectedOilId: oils[deviceIndex],
                        selectedOil: getOilById(oils[deviceIndex]),
                    })),
                };
            });

            resolve(selections);
        }, 800);
    });
};

// Fetch current subscription from API
export const fetchUserSubscription = async (): Promise<UserSubscription> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const monthlySelections = await fetchMonthlySelections();

    return {
        id: 'sub-001',
        plan: SUBSCRIPTION_PLANS[1], // 12 month plan
        status: 'active',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        devices: MOCK_USER_DEVICES,
        autoRenew: true,
        paymentMethod: {
            id: 'pm-001',
            type: 'card',
            brand: 'Visa',
            last4: '4242',
        },
        monthlySelections,
    };
};

// Mock current subscription with all months (kept for backward compatibility during transition)
export const MOCK_USER_SUBSCRIPTION: UserSubscription = {
    id: 'sub-001',
    plan: SUBSCRIPTION_PLANS[1], // 12 month plan
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    devices: MOCK_USER_DEVICES,
    autoRenew: true,
    paymentMethod: {
        id: 'pm-001',
        type: 'card',
        brand: 'Visa',
        last4: '4242',
    },
    monthlySelections: [], // Initially empty, to be fetched via API
};

// Get subscription summary for dashboard
export const getSubscriptionSummary = (sub: UserSubscription = MOCK_USER_SUBSCRIPTION) => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const currentSelection = sub.monthlySelections.find(m => m.month === currentMonth);
    const upcomingSelections = sub.monthlySelections.filter(m => m.status === 'upcoming' || m.status === 'pending');
    const completedMonths = sub.monthlySelections.filter(m => m.status === 'completed').length;
    const totalMonths = sub.plan.durationMonths;

    return {
        plan: sub.plan,
        status: sub.status,
        currentMonth: currentSelection,
        upcomingCount: upcomingSelections.length,
        completedMonths,
        totalMonths,
        progressPercent: Math.round((completedMonths / totalMonths) * 100),
        devicesCount: sub.devices.length,
        endDate: sub.endDate,
    };
};

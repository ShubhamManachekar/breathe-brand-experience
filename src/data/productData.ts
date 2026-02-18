const diffuserImage = "/optimized/diffuser-360-960.webp";

const sampleDiffuserCompact = "/sample-images/diffuser-compact.svg";
const sampleDiffuserPro = "/sample-images/diffuser-pro.svg";
const sampleDiffuserElite = "/sample-images/diffuser-elite.svg";
const sampleOilLavender = "/sample-images/aroma-lavender.svg";
const sampleOilCitrus = "/sample-images/aroma-citrus.svg";
const sampleOilWood = "/sample-images/aroma-wood.svg";

export type ProductCategory = "cold-air" | "ultrasonic" | "reed" | "car" | "oil" | "evaporative";

export interface Product {
    id: string;
    name: string;
    model: string;
    category: ProductCategory;
    coverage: string;
    features: string[];
    price: number;
    image: string;
    images: string[];
    description: string;
    tag: string;
    rating: number;
    reviews: number;
    homeUse: string[];          // B2C label: rooms / home areas
    businessUse: string[];      // B2B label: commercial applications
}

export interface ProductCategoryInfo {
    id: ProductCategory;
    name: string;
    description: string;
    icon: string; // emoji for quick visual
}

export const productCategories: ProductCategoryInfo[] = [
    { id: "cold-air", name: "Cold-Air Diffusers", description: "Professional-grade nebulizing technology — no heat, no water", icon: "❄️" },
    { id: "ultrasonic", name: "Ultrasonic Diffusers", description: "Water-based mist with ambient LED mood lighting", icon: "🌊" },
    { id: "reed", name: "Reed Diffusers", description: "Elegant, flame-free fragrance for any room", icon: "🌿" },
    { id: "car", name: "Car Diffusers", description: "Portable scent for your vehicle — clip-on or vent-mount", icon: "🚗" },
    { id: "oil", name: "Essential Oil Diffusers", description: "Therapeutic aromatherapy with pure essential oils", icon: "💧" },
    { id: "evaporative", name: "Evaporative Diffusers", description: "Fan-powered evaporation — silent, filter-based", icon: "🍃" },
];

export const products: Product[] = [
    // ── Cold-Air (EZE lineup) ──────────────────────────────────
    {
        id: "diffuser-ec200",
        name: "EZE Compact",
        model: "EC-200",
        category: "cold-air",
        coverage: "Up to 200 sqm",
        features: ["Bluetooth Control", "Whisper Quiet", "Easy Setup", "30-Day Cartridge"],
        price: 18000,
        image: sampleDiffuserCompact,
        images: [sampleDiffuserCompact, sampleDiffuserPro, sampleDiffuserElite, diffuserImage],
        description: "Perfect for bedrooms, living rooms, and personal spaces. Plug in and enjoy in minutes.",
        tag: "Best Seller",
        rating: 4.8,
        reviews: 234,
        homeUse: ["Bedroom", "Living Room", "Study", "Yoga Space"],
        businessUse: ["Small Office", "Boutique", "Clinic Waiting Room", "Salon"],
    },
    {
        id: "diffuser-ep500",
        name: "EZE Pro",
        model: "EP-500",
        category: "cold-air",
        coverage: "Up to 500 sqm",
        features: ["Wi-Fi & App Control", "Smart Scheduling", "Multi-Room", "60-Day Cartridge"],
        price: 45000,
        image: sampleDiffuserPro,
        images: [sampleDiffuserPro, sampleDiffuserCompact, sampleDiffuserElite, diffuserImage],
        description: "Our most popular diffuser. Control from your phone, set schedules, and cover your entire space.",
        tag: "Most Popular",
        rating: 4.9,
        reviews: 189,
        homeUse: ["Whole Home", "Open Floor Plans", "Large Rooms", "Home Office"],
        businessUse: ["Restaurant", "Hotel Lobby", "Retail Store", "Coworking Space"],
    },
    {
        id: "diffuser-ee1000",
        name: "EZE Elite",
        model: "EE-1000",
        category: "cold-air",
        coverage: "Up to 1000 sqm",
        features: ["Central HVAC Integration", "Multi-Zone", "Voice Control", "Auto-Refill Alerts"],
        price: 85000,
        image: sampleDiffuserElite,
        images: [sampleDiffuserElite, sampleDiffuserPro, sampleDiffuserCompact, diffuserImage],
        description: "The ultimate scent system. Integrates with your HVAC for seamless, everywhere fragrance.",
        tag: "Premium",
        rating: 5.0,
        reviews: 67,
        homeUse: ["Villas", "Large Homes", "Luxury Apartments", "Penthouses"],
        businessUse: ["Shopping Mall", "Hotel Chain", "Corporate Campus", "Convention Center"],
    },

    // ── Ultrasonic Diffusers ──────────────────────────────────
    {
        id: "ultrasonic-luna",
        name: "Luna Mist",
        model: "UL-300",
        category: "ultrasonic",
        coverage: "Up to 40 sqm",
        features: ["7 LED Colors", "Auto Shut-Off", "Whisper Quiet", "BPA-Free Tank"],
        price: 3499,
        image: diffuserImage,
        images: [diffuserImage, diffuserImage, diffuserImage, diffuserImage],
        description: "Soothing mist with color-changing ambient light. A nightstand essential for restful sleep.",
        tag: "Best Seller",
        rating: 4.7,
        reviews: 512,
        homeUse: ["Bedroom", "Nursery", "Meditation Corner", "Bathroom"],
        businessUse: ["Spa Treatment Room", "Yoga Studio", "Therapy Office", "Waiting Room"],
    },
    {
        id: "ultrasonic-zen",
        name: "Zen Aura",
        model: "UZ-500",
        category: "ultrasonic",
        coverage: "Up to 60 sqm",
        features: ["500ml Tank", "Timer Function", "Warm & Cool Mist", "Essential Oil Tray"],
        price: 5999,
        image: diffuserImage,
        images: [diffuserImage, diffuserImage, diffuserImage, diffuserImage],
        description: "Large-capacity ultrasonic diffuser with dual-mist modes for living rooms and open spaces.",
        tag: "",
        rating: 4.6,
        reviews: 287,
        homeUse: ["Living Room", "Family Room", "Open Kitchen", "Home Office"],
        businessUse: ["Small Café", "Boutique Store", "Reception Area", "Meditation Center"],
    },

    // ── Reed Diffusers ────────────────────────────────────────
    {
        id: "reed-signature",
        name: "Signature Reed Set",
        model: "RD-100",
        category: "reed",
        coverage: "Up to 20 sqm",
        features: ["Handblown Glass Vessel", "8 Natural Rattan Reeds", "3-Month Longevity", "No Electricity Needed"],
        price: 1999,
        image: diffuserImage,
        images: [diffuserImage, diffuserImage, diffuserImage, diffuserImage],
        description: "Elegant handblown glass with premium rattan reeds. Constant, subtle fragrance — zero maintenance.",
        tag: "Gift Favorite",
        rating: 4.8,
        reviews: 678,
        homeUse: ["Entryway", "Bathroom", "Guest Room", "Bookshelf"],
        businessUse: ["Boutique", "Show Room", "Office Desk", "Restaurant Table"],
    },
    {
        id: "reed-luxe",
        name: "Luxe Reed Collection",
        model: "RD-200",
        category: "reed",
        coverage: "Up to 35 sqm",
        features: ["Premium Ceramic Vessel", "12 Fiber Reeds", "6-Month Longevity", "Decorative Gift Box"],
        price: 3499,
        image: diffuserImage,
        images: [diffuserImage, diffuserImage, diffuserImage, diffuserImage],
        description: "Statement ceramic vessel with fiber reeds for stronger, longer-lasting scent throw.",
        tag: "Premium",
        rating: 4.9,
        reviews: 324,
        homeUse: ["Living Room", "Dining Room", "Master Bedroom", "Home Library"],
        businessUse: ["Hotel Suite", "Executive Office", "Boutique Hotel", "Gallery"],
    },

    // ── Car Diffusers ─────────────────────────────────────────
    {
        id: "car-clip",
        name: "DriveScent Clip",
        model: "CD-10",
        category: "car",
        coverage: "Vehicle cabin",
        features: ["AC Vent Clip", "Refillable Pad", "Compact Design", "30-Day Scent Life"],
        price: 899,
        image: diffuserImage,
        images: [diffuserImage, diffuserImage, diffuserImage, diffuserImage],
        description: "Clips onto any car AC vent. Compact, refillable, and lasts a full month per pad.",
        tag: "Best Seller",
        rating: 4.5,
        reviews: 1203,
        homeUse: ["Car", "SUV", "Locker", "Small Closet"],
        businessUse: ["Fleet Vehicles", "Ride-Share Cars", "Delivery Vans", "Rental Cars"],
    },
    {
        id: "car-smart",
        name: "DriveScent Smart",
        model: "CD-50",
        category: "car",
        coverage: "Vehicle cabin",
        features: ["USB-C Powered", "Adjustable Intensity", "Auto On/Off", "Essential Oil Compatible"],
        price: 2499,
        image: diffuserImage,
        images: [diffuserImage, diffuserImage, diffuserImage, diffuserImage],
        description: "Smart car diffuser with USB-C power. Detects ignition — auto on when you drive, off when you park.",
        tag: "New",
        rating: 4.7,
        reviews: 456,
        homeUse: ["Car", "RV", "Desk (USB)", "Bedside (USB)"],
        businessUse: ["Executive Cars", "Luxury Fleet", "Showroom Vehicles", "Ambulance"],
    },

    // ── Essential Oil Diffusers ───────────────────────────────
    {
        id: "oil-pure",
        name: "PureEssence",
        model: "OD-150",
        category: "oil",
        coverage: "Up to 30 sqm",
        features: ["Nebulizer Technology", "No Water Needed", "Timer Modes", "Pure Oil Diffusion"],
        price: 6999,
        image: sampleOilLavender,
        images: [sampleOilLavender, sampleOilCitrus, sampleOilWood, sampleOilLavender],
        description: "Direct oil nebulizer — no water dilution means stronger, purer therapeutic aroma.",
        tag: "Therapist Pick",
        rating: 4.8,
        reviews: 198,
        homeUse: ["Yoga Room", "Meditation Space", "Bedroom", "Home Spa"],
        businessUse: ["Ayurveda Clinic", "Spa Suite", "Therapy Room", "Wellness Center"],
    },
    {
        id: "oil-aroma360",
        name: "Aroma360 Pro",
        model: "OD-360",
        category: "oil",
        coverage: "Up to 80 sqm",
        features: ["Dual-Nozzle Nebulizer", "Bluetooth + App", "Intensity Control", "Compatible with All Oils"],
        price: 12999,
        image: sampleOilCitrus,
        images: [sampleOilCitrus, sampleOilWood, sampleOilLavender, sampleOilCitrus],
        description: "Professional aromatherapy unit with dual nozzles and app control for large spaces.",
        tag: "Premium",
        rating: 4.9,
        reviews: 112,
        homeUse: ["Large Living Room", "Whole Apartment", "Home Gym", "Entertainment Room"],
        businessUse: ["Wellness Resort", "Luxury Spa", "Premium Gym", "Yoga Studio Chain"],
    },

    // ── Evaporative Diffusers ─────────────────────────────────
    {
        id: "evap-breeze",
        name: "Breeze Fan",
        model: "EV-100",
        category: "evaporative",
        coverage: "Up to 25 sqm",
        features: ["Silent Fan", "Disposable Pads", "Battery Operated", "3 Speed Settings"],
        price: 1499,
        image: diffuserImage,
        images: [diffuserImage, diffuserImage, diffuserImage, diffuserImage],
        description: "Wind-powered scent diffusion — completely silent. Drop oil on the pad, let the fan do the rest.",
        tag: "Budget Pick",
        rating: 4.4,
        reviews: 890,
        homeUse: ["Desk", "Closet", "Bathroom", "Car Dashboard"],
        businessUse: ["Office Cubicle", "Washroom", "Small Kiosk", "Pop-up Store"],
    },
    {
        id: "evap-flow",
        name: "Flow Tower",
        model: "EV-300",
        category: "evaporative",
        coverage: "Up to 50 sqm",
        features: ["Tower Design", "HEPA Filter Pad", "USB + Battery", "Adjustable Fan"],
        price: 3999,
        image: diffuserImage,
        images: [diffuserImage, diffuserImage, diffuserImage, diffuserImage],
        description: "Sleek tower design with HEPA filter pad — diffuses scent while cleaning air particles.",
        tag: "New",
        rating: 4.6,
        reviews: 167,
        homeUse: ["Living Room", "Bedroom", "Home Office", "Hallway"],
        businessUse: ["Small Office", "Consultation Room", "Retail Counter", "Library"],
    },
];

/** Grab a product by model string (e.g. "EP-500") */
export const getProductByModel = (model: string) =>
    products.find((p) => p.model.toLowerCase() === model.toLowerCase());

/** Get all products in a category */
export const getProductsByCategory = (category: ProductCategory) =>
    products.filter((p) => p.category === category);

/** Get category info */
export const getCategoryInfo = (category: ProductCategory) =>
    productCategories.find((c) => c.id === category);

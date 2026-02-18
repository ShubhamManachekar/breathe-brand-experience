import { Flower2, Leaf, Sparkles, Wind, type LucideIcon } from "lucide-react";

const sampleAromaGold = "/sample-images/aroma-gold.svg";
const sampleAromaOcean = "/sample-images/aroma-ocean.svg";
const sampleAromaLavender = "/sample-images/aroma-lavender.svg";
const sampleAromaCitrus = "/sample-images/aroma-citrus.svg";
const sampleAromaWood = "/sample-images/aroma-wood.svg";

/* ── Shared Sizes (B2C pricing) ─────────────────────────────── */
export const aromaSizes = [
    { label: "100ml", price: 1200 },
    { label: "250ml", price: 2500 },
    { label: "500ml", price: 4200 },
] as const;

/* ── Fragrance Families ─────────────────────────────────────── */
export interface FragranceFamily {
    id: string;
    name: string;
    description: string;
    icon: LucideIcon;
    color: string;
    bgColor: string;
    mood: string;
    applications: string[];   // B2B: commercial applications
}

export const fragranceFamilies: FragranceFamily[] = [
    {
        id: "citrus-fresh", name: "Citrus Fresh",
        description: "Energizing and uplifting blends",
        icon: Wind, color: "text-orange-500", bgColor: "from-orange-500/10 to-yellow-500/20",
        mood: "Energetic & Inspiring",
        applications: ["Retail spaces", "Gyms & fitness", "Morning environments", "Creative workspaces"],
    },
    {
        id: "aromatic-cool", name: "Aromatic Cool",
        description: "Calm and composed fragrances",
        icon: Leaf, color: "text-green-500", bgColor: "from-green-500/10 to-emerald-500/20",
        mood: "Calm & Relaxing",
        applications: ["Spas & wellness", "Waiting areas", "Sleep environments", "Meditation spaces"],
    },
    {
        id: "amber-musk", name: "Amber Musk",
        description: "Luxurious and sophisticated scents",
        icon: Sparkles, color: "text-amber-500", bgColor: "from-amber-500/10 to-orange-600/20",
        mood: "Indulgent & Luxurious",
        applications: ["Luxury retail", "Hotel lobbies", "Premium services", "Executive offices"],
    },
    {
        id: "green-florals", name: "Green Florals",
        description: "Natural and fresh botanical blends",
        icon: Flower2, color: "text-emerald-500", bgColor: "from-emerald-500/10 to-green-600/20",
        mood: "Natural & Fresh",
        applications: ["Healthcare", "Organic stores", "Nature centers", "Wellness clinics"],
    },
];

/* ── Fragrances ──────────────────────────────────────────────── */
export interface Fragrance {
    id: string;
    name: string;
    family: string;
    notes: string[];
    description: string;
    mood: string;
    intensity: string;
    longevity: string;
    image: string;
    bestForHome: string[];       // B2C: rooms
    bestForBusiness: string[];   // B2B: commercial spaces
}

export const fragrances: Fragrance[] = [
    {
        id: "energizing-burst", name: "Energizing Burst", family: "citrus-fresh",
        notes: ["Grapefruit", "Lemon", "Mint", "Ginger"],
        description: "An invigorating blend that awakens the senses and boosts motivation.",
        mood: "Uplifting & Energetic", intensity: "Medium-High", longevity: "4-6 hours",
        image: sampleAromaCitrus,
        bestForHome: ["Morning Routine", "Home Office", "Workout Space"],
        bestForBusiness: ["Retail stores", "Fitness centers", "Coworking spaces"],
    },
    {
        id: "citrus-sparkle", name: "Citrus Sparkle", family: "citrus-fresh",
        notes: ["Orange", "Bergamot", "Rosemary", "White Tea"],
        description: "A sophisticated citrus blend with herbal undertones.",
        mood: "Fresh & Sophisticated", intensity: "Medium", longevity: "5-7 hours",
        image: sampleAromaGold,
        bestForHome: ["Living Room", "Kitchen", "Guest Room"],
        bestForBusiness: ["Boutiques", "Cafes", "Creative studios"],
    },
    {
        id: "tranquil-mist", name: "Tranquil Mist", family: "aromatic-cool",
        notes: ["Lavender", "Eucalyptus", "Chamomile", "Cedar"],
        description: "A calming blend that reduces stress and promotes relaxation.",
        mood: "Peaceful & Restorative", intensity: "Medium", longevity: "6-8 hours",
        image: sampleAromaLavender,
        bestForHome: ["Bedroom", "Bath", "Reading Nook"],
        bestForBusiness: ["Spas", "Waiting rooms", "Meditation studios"],
    },
    {
        id: "cool-breeze", name: "Cool Breeze", family: "aromatic-cool",
        notes: ["Sage", "Sea Salt", "Mint", "Bamboo"],
        description: "Fresh and clean with marine influences.",
        mood: "Clean & Refreshing", intensity: "Light-Medium", longevity: "4-6 hours",
        image: sampleAromaOcean,
        bestForHome: ["Entryway", "Laundry Room", "Bathroom"],
        bestForBusiness: ["Healthcare clinics", "Dental offices", "Hotels"],
    },
    {
        id: "luxury-embrace", name: "Luxury Embrace", family: "amber-musk",
        notes: ["Amber", "Sandalwood", "Vanilla", "Patchouli"],
        description: "Rich and opulent blend for an atmosphere of luxury.",
        mood: "Opulent & Sophisticated", intensity: "Medium-High", longevity: "8-10 hours",
        image: sampleAromaWood,
        bestForHome: ["Master Suite", "Home Bar", "Dining Room"],
        bestForBusiness: ["Luxury retail", "Five-star lobbies", "VIP lounges"],
    },
    {
        id: "golden-warmth", name: "Golden Warmth", family: "amber-musk",
        notes: ["Oud", "Rose", "Saffron", "Leather"],
        description: "An exotic blend with Middle Eastern influences.",
        mood: "Exotic & Memorable", intensity: "High", longevity: "10-12 hours",
        image: sampleAromaWood,
        bestForHome: ["Living Room", "Library", "Den"],
        bestForBusiness: ["Executive offices", "Private members clubs", "Fine dining"],
    },
    {
        id: "botanical-garden", name: "Botanical Garden", family: "green-florals",
        notes: ["Jasmine", "Green Tea", "Aloe", "Fresh Grass"],
        description: "Pure and natural blend promoting wellness.",
        mood: "Pure & Natural", intensity: "Light", longevity: "4-5 hours",
        image: sampleAromaLavender,
        bestForHome: ["Yoga Room", "Sunroom", "Nursery"],
        bestForBusiness: ["Organic stores", "Wellness clinics", "Yoga studios"],
    },
    {
        id: "fresh-meadow", name: "Fresh Meadow", family: "green-florals",
        notes: ["Lily of the Valley", "Green Leaves", "Cucumber", "White Musk"],
        description: "Light and airy floral blend creating freshness.",
        mood: "Fresh & Pure", intensity: "Light", longevity: "3-5 hours",
        image: sampleAromaLavender,
        bestForHome: ["Bedroom", "Closet", "Study"],
        bestForBusiness: ["Showrooms", "Conference rooms", "Reception areas"],
    },
];

/** Get the family object for a fragrance */
export const getFamilyForFragrance = (familyId: string) =>
    fragranceFamilies.find((f) => f.id === familyId);

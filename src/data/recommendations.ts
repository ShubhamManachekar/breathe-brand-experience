/**
 * Recommendation engine — pairs diffusers with aroma oils,
 * suggests bottle sizes based on device coverage, and finds
 * related diffusers in the same category.
 */
import { type Product, products } from "./productData";
import { type Fragrance, fragrances, aromaSizes } from "./aromaData";

/* ── Coverage → Suggested Size ─────────────────────────────── */

/** Parse "Up to 500 sqm" → 500 */
const parseCoverage = (coverage: string): number => {
    const match = coverage.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
};

/**
 * Returns the recommended aromaSize index (0 = 100ml, 1 = 250ml, 2 = 500ml)
 * based on diffuser coverage area.
 */
export const getSuggestedOilSizeIndex = (product: Product): number => {
    const sqm = parseCoverage(product.coverage);
    if (sqm <= 50) return 0;   // small rooms → 100ml
    if (sqm <= 300) return 1;  // mid-range → 250ml
    return 2;                   // large / commercial → 500ml
};

export const getSuggestedOilSize = (product: Product) =>
    aromaSizes[getSuggestedOilSizeIndex(product)];

/* ── Oil Recommendations ───────────────────────────────────── */

/**
 * Score each fragrance for compatibility with a given diffuser
 * by comparing homeUse/bestForHome and businessUse/bestForBusiness
 * context overlap.
 */
export const getRecommendedOils = (
    product: Product,
    limit = 4,
): Fragrance[] => {
    const scored = fragrances.map((oil) => {
        let score = 0;

        // Match home contexts
        for (const use of product.homeUse) {
            for (const best of oil.bestForHome) {
                if (
                    use.toLowerCase().includes(best.toLowerCase()) ||
                    best.toLowerCase().includes(use.toLowerCase())
                ) {
                    score += 2;
                }
            }
        }

        // Match business contexts
        for (const use of product.businessUse) {
            for (const best of oil.bestForBusiness) {
                if (
                    use.toLowerCase().includes(best.toLowerCase()) ||
                    best.toLowerCase().includes(use.toLowerCase())
                ) {
                    score += 2;
                }
            }
        }

        // Bonus for medium intensity (versatile)
        if (oil.intensity === "Medium") score += 1;

        return { oil, score };
    });

    // Sort by score descending, take top N
    return scored
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map((s) => s.oil);
};

/* ── Related Diffusers ─────────────────────────────────────── */

/**
 * Returns diffusers in the same category, excluding the current product.
 * Falls back to other categories if fewer than `limit` in the same one.
 */
export const getRelatedDiffusers = (
    product: Product,
    limit = 4,
): Product[] => {
    const sameCategory = products.filter(
        (p) => p.category === product.category && p.id !== product.id,
    );

    if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

    // Fill with other diffusers (not oils, not current)
    const others = products.filter(
        (p) =>
            p.id !== product.id &&
            p.category !== product.category &&
            p.category !== "oil",
    );

    return [...sameCategory, ...others].slice(0, limit);
};

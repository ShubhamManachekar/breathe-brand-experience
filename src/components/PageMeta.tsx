import { useEffect } from "react";

interface PageMetaProps {
    title: string;
    description: string;
    keywords?: string;
    ogImage?: string;
    ogType?: "website" | "article" | "product";
    canonicalUrl?: string;
    structuredData?: object | object[];
    twitterCard?: "summary" | "summary_large_image";
}

/**
 * PageMeta - Dynamic SEO component for page-specific meta tags
 * 
 * Updates document head with:
 * - Title
 * - Meta description
 * - Keywords
 * - Open Graph tags
 * - Twitter Card tags
 * - JSON-LD structured data
 * - Canonical URL
 */
const PageMeta = ({
    title,
    description,
    keywords,
    ogImage = "/og-image.jpg",
    ogType = "website",
    canonicalUrl,
    structuredData,
    twitterCard = "summary_large_image",
}: PageMetaProps) => {
    useEffect(() => {
        // Update document title
        const fullTitle = title.includes("EZE AirCare")
            ? title
            : `${title} | EZE AirCare`;
        document.title = fullTitle;

        // Helper to update or create meta tags
        const updateMeta = (name: string, content: string, isProperty = false) => {
            const selector = isProperty
                ? `meta[property="${name}"]`
                : `meta[name="${name}"]`;
            let meta = document.querySelector(selector) as HTMLMetaElement;

            if (!meta) {
                meta = document.createElement("meta");
                if (isProperty) {
                    meta.setAttribute("property", name);
                } else {
                    meta.setAttribute("name", name);
                }
                document.head.appendChild(meta);
            }
            meta.setAttribute("content", content);
        };

        // Update meta description
        updateMeta("description", description);

        // Update keywords if provided
        if (keywords) {
            updateMeta("keywords", keywords);
        }

        // Update Open Graph tags
        updateMeta("og:title", fullTitle, true);
        updateMeta("og:description", description, true);
        updateMeta("og:type", ogType, true);
        updateMeta("og:image", ogImage, true);

        if (canonicalUrl) {
            updateMeta("og:url", canonicalUrl, true);

            // Update canonical link
            let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
            if (!canonical) {
                canonical = document.createElement("link");
                canonical.setAttribute("rel", "canonical");
                document.head.appendChild(canonical);
            }
            canonical.setAttribute("href", canonicalUrl);
        }

        // Update Twitter Card tags
        updateMeta("twitter:card", twitterCard);
        updateMeta("twitter:title", fullTitle);
        updateMeta("twitter:description", description);
        updateMeta("twitter:image", ogImage);

        // Inject JSON-LD structured data
        if (structuredData) {
            // Remove any existing structured data injected by this component
            const existingScript = document.querySelector('script[data-seo="page-meta"]');
            if (existingScript) {
                existingScript.remove();
            }

            const script = document.createElement("script");
            script.type = "application/ld+json";
            script.setAttribute("data-seo", "page-meta");
            script.textContent = JSON.stringify(
                Array.isArray(structuredData) ? structuredData : [structuredData]
            );
            document.head.appendChild(script);
        }

        // Cleanup function
        return () => {
            // Optionally remove structured data on unmount
            const script = document.querySelector('script[data-seo="page-meta"]');
            if (script) {
                script.remove();
            }
        };
    }, [title, description, keywords, ogImage, ogType, canonicalUrl, structuredData, twitterCard]);

    // This component doesn't render anything
    return null;
};

export default PageMeta;

// Pre-defined structured data templates
export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EZE AirCare",
    "description": "Premium scent marketing and fragrance technology solutions for businesses",
    "url": "https://ezeaircare.com",
    "logo": "https://ezeaircare.com/logo.png",
    "sameAs": [
        "https://www.linkedin.com/company/ezeaircare",
        "https://twitter.com/ezeaircare",
        "https://www.instagram.com/ezeaircare"
    ],
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91 98765 43210",
        "contactType": "sales",
        "availableLanguage": ["English", "Hindi"]
    }
};

export const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "EZE AirCare",
    "url": "https://ezeaircare.com",
    "potentialAction": {
        "@type": "SearchAction",
        "target": "https://ezeaircare.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
    }
};

export const createProductSchema = (product: {
    name: string;
    model?: string;
    description: string;
    price: number;
    currency?: string;
    image?: string;
    sku?: string;
    url?: string;
}) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "sku": product.sku || product.model,
    "url": product.url,
    "brand": {
        "@type": "Brand",
        "name": "EZE AirCare"
    },
    "image": product.image || "https://ezeaircare.com/products/diffuser.jpg",
    "offers": {
        "@type": "Offer",
        "price": product.price,
        "priceCurrency": product.currency || "INR",
        "availability": "https://schema.org/InStock",
        "seller": {
            "@type": "Organization",
            "name": "EZE AirCare"
        }
    }
});

export const createBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
    }))
});

export const createFAQSchema = (faqs: { question: string; answer: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }))
});

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ShopNavigation from "@/components/ShopNavigation";
import BusinessNavigation from "@/components/BusinessNavigation";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import PageMeta from "@/components/PageMeta";

const getFallbackMeta = (pathname: string) => {
  const routeMeta: Array<{ match: (path: string) => boolean; title: string; description: string; keywords: string }> = [
    {
      match: (path) => path === "/shop",
      title: "Shop Premium Diffusers & Aroma Oils",
      description: "Discover premium home and lifestyle diffusers with curated aroma oils from EZE AirCare.",
      keywords: "shop diffusers, aroma oils, home fragrance, premium scents",
    },
    {
      match: (path) => path === "/shop/products",
      title: "Shop Products",
      description: "Browse EZE AirCare diffuser collections crafted for modern homes and premium spaces.",
      keywords: "diffuser products, scent devices, aroma diffusers",
    },
    {
      match: (path) => path === "/shop/aromas",
      title: "Shop Aroma Collection",
      description: "Explore curated aroma oils by mood, notes, and fragrance family.",
      keywords: "aroma oils, fragrance collection, scent library",
    },
    {
      match: (path) => path === "/shop/cart",
      title: "Your Cart",
      description: "Review your selected diffusers and aroma oils before checkout.",
      keywords: "shopping cart, diffuser cart, aroma oils cart",
    },
    {
      match: (path) => path === "/shop/checkout",
      title: "Checkout",
      description: "Secure checkout for EZE AirCare products and fragrance collections.",
      keywords: "checkout, secure payment, fragrance purchase",
    },
    {
      match: (path) => path === "/shop/login",
      title: "Shop Login",
      description: "Sign in to access your account, orders, and saved fragrance preferences.",
      keywords: "shop login, account access, customer portal",
    },
    {
      match: (path) => path === "/shop/contact",
      title: "Contact Shop Support",
      description: "Get product guidance and support for EZE AirCare shop orders.",
      keywords: "shop contact, product support, fragrance support",
    },
    {
      match: (path) => path === "/business",
      title: "Business Scent Marketing Solutions",
      description: "Design and deploy measurable scent strategies for hospitality, retail, offices, and wellness.",
      keywords: "business scent marketing, b2b fragrance solutions, scent strategy",
    },
    {
      match: (path) => path === "/business/login",
      title: "Business Login",
      description: "Access your EZE AirCare business account and dashboard.",
      keywords: "business login, enterprise dashboard, client portal",
    },
    {
      match: (path) => path.includes("/dashboard"),
      title: "Customer Dashboard",
      description: "Manage devices, subscriptions, orders, and support from your EZE AirCare dashboard.",
      keywords: "dashboard, subscription management, diffuser management",
    },
  ];

  return routeMeta.find((entry) => entry.match(pathname));
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isBusiness = location.pathname.startsWith("/business");
  const isDashboard = location.pathname.includes("/dashboard");
  const isAuthPage = location.pathname === "/shop/login" || location.pathname === "/business/login";
  const segment = isBusiness ? "business" : "shop";
  const fallbackMeta = getFallbackMeta(location.pathname);

  useEffect(() => {
    document.body.dataset.segment = segment;
  }, [segment]);

  const renderNav = () => {
    if (isDashboard || isAuthPage) return null;
    if (isBusiness) return <BusinessNavigation />;
    return <ShopNavigation />;
  };

  const showFooter = !isDashboard && !isAuthPage;

  return (
    <div className="min-h-screen bg-diffuser-atmosphere text-foreground">
      {fallbackMeta && (
        <PageMeta
          title={fallbackMeta.title}
          description={fallbackMeta.description}
          keywords={fallbackMeta.keywords}
          ogType="website"
        />
      )}
      {renderNav()}
      <main className={!isDashboard && !isAuthPage ? "pt-16" : ""}>
        {children}
      </main>
      {showFooter && <Footer />}
      <Chatbot />
    </div>
  );
};

export default AppLayout;

import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ShopNavigation from "@/components/ShopNavigation";
import BusinessNavigation from "@/components/BusinessNavigation";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isShop = location.pathname.startsWith("/shop");
  const isBusiness = location.pathname.startsWith("/business");
  const isDashboard = location.pathname.startsWith("/user/") || location.pathname.startsWith("/shop/dashboard") || location.pathname.startsWith("/business/dashboard");

  const renderNav = () => {
    if (isDashboard) return null;
    if (isShop) return <ShopNavigation />;
    if (isBusiness) return <BusinessNavigation />;
    return <Navigation />;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {renderNav()}
      <main className={isDashboard ? "" : "pt-16"}>
        {children}
      </main>
      {!isDashboard && <Footer />}
      <Chatbot />
    </div>
  );
};

export default AppLayout;

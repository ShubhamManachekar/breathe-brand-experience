import { useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import DashboardDevices from "@/components/dashboard/DashboardDevices";
import DashboardOrders from "@/components/dashboard/DashboardOrders";
import DashboardAromaPrefs from "@/components/dashboard/DashboardAromaPrefs";
import DashboardSupport from "@/components/dashboard/DashboardSupport";
import DashboardSettings from "@/components/dashboard/DashboardSettings";
import DashboardSubscription from "@/components/dashboard/DashboardSubscription";
import PageMeta from "@/components/PageMeta";

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const location = useLocation();
  const canonicalUrl = location.pathname.startsWith("/shop")
    ? "https://ezeaircare.com/shop/dashboard"
    : "https://ezeaircare.com/business/dashboard";

  // Handle navigation from child components
  const handleNavigate = (section: string) => {
    setActiveSection(section);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview onNavigate={handleNavigate} />;
      case "diffusers":
        return <DashboardDevices onNavigate={handleNavigate} />;
      case "orders":
        return <DashboardOrders onNavigate={handleNavigate} />;
      case "aroma-oils":
        return <DashboardAromaPrefs onNavigate={handleNavigate} />;
      case "subscription":
        return <DashboardSubscription onNavigate={handleNavigate} />;
      case "support":
        return <DashboardSupport onNavigate={handleNavigate} />;
      case "settings":
        return <DashboardSettings onNavigate={handleNavigate} />;
      default:
        return <DashboardOverview onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      <PageMeta
        title="Customer Dashboard"
        description="Manage devices, orders, subscriptions, aroma preferences, and support tickets in one dashboard."
        keywords="customer dashboard, diffuser management, subscription, support"
        canonicalUrl={canonicalUrl}
        ogType="website"
      />

      {/* ── Dashboard Background ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute inset-0 bg-grid-fade opacity-[0.03]" />
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      {/* ── Sidebar ── */}
      <DashboardSidebar
        activeSection={activeSection}
        setActiveSection={handleNavigate}
      />

      {/* ── Main Content ── */}
      <main className="flex-1 min-h-screen relative z-10 overflow-y-auto overflow-x-hidden">
        <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-10 pt-20 md:pt-10">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;

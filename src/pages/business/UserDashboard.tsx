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
    <div className="min-h-screen bg-transparent flex relative overflow-hidden">
      <PageMeta
        title="Customer Dashboard"
        description="Manage devices, orders, subscriptions, aroma preferences, and support tickets in one dashboard."
        keywords="customer dashboard, diffuser management, subscription, support"
        canonicalUrl={canonicalUrl}
        ogType="website"
      />
      <div className="pointer-events-none absolute inset-0 bg-grid-fade opacity-50" />
      {/* Sidebar */}
      <DashboardSidebar
        activeSection={activeSection}
        setActiveSection={handleNavigate}
      />

      {/* Main Content */}
      <main className="flex-1 min-h-screen p-4 md:p-6 lg:p-8 pt-16 md:pt-8 overflow-x-hidden relative">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
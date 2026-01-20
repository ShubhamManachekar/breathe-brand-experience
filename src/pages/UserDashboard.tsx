import { useState } from "react";
import { cn } from "@/lib/utils";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import DashboardDevices from "@/components/dashboard/DashboardDevices";
import DashboardOrders from "@/components/dashboard/DashboardOrders";
import DashboardAromaPrefs from "@/components/dashboard/DashboardAromaPrefs";
import DashboardSupport from "@/components/dashboard/DashboardSupport";
import DashboardSettings from "@/components/dashboard/DashboardSettings";
import DashboardSubscription from "@/components/dashboard/DashboardSubscription";

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");

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
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <DashboardSidebar
        activeSection={activeSection}
        setActiveSection={handleNavigate}
      />

      {/* Main Content */}
      <main className="flex-1 min-h-screen p-4 md:p-6 lg:p-8 pt-16 md:pt-6 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
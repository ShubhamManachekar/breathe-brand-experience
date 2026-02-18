import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingBag,
  Droplets,
  HeadphonesIcon,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Menu,
  Wifi,
  Crown,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface DashboardSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const menuItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "diffusers", label: "Diffusers", icon: Wifi },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "aroma-oils", label: "Aroma Oils", icon: Droplets },
  { id: "subscription", label: "Subscription", icon: Crown },
  { id: "support", label: "Support", icon: HeadphonesIcon },
  { id: "settings", label: "Settings", icon: Settings },
];

const DashboardSidebar = ({ activeSection, setActiveSection }: DashboardSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="h-full flex flex-col bg-sidebar/95 backdrop-blur-md text-sidebar-foreground border-r border-sidebar-border/70">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className={cn(
          "flex items-center gap-3",
          isCollapsed && !isMobile && "justify-center"
        )}>
          <div className="w-9 h-9 rounded-lg bg-accent/90 text-accent-foreground flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="text-white font-bold text-base">E</span>
          </div>
          {(!isCollapsed || isMobile) && (
            <div className="overflow-hidden">
              <h1 className="font-display font-bold text-base text-sidebar-foreground">EZE AirCare</h1>
              <p className="text-[11px] text-sidebar-foreground/60">Business Portal</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1.5">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
              activeSection === item.id
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm ring-1 ring-white/10"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent/80 hover:text-sidebar-foreground",
              isCollapsed && !isMobile && "justify-center px-2"
            )}
            title={isCollapsed ? item.label : undefined}
          >
            <item.icon className={cn(
              "w-4 h-4 flex-shrink-0",
              activeSection === item.id ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/70"
            )} />
            {(!isCollapsed || isMobile) && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-3 border-t border-sidebar-border">
        <div className={cn(
          "flex items-center gap-3 p-2.5 rounded-xl hover:bg-sidebar-accent/80 transition-colors cursor-pointer",
          isCollapsed && !isMobile && "justify-center"
        )}>
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-sidebar-foreground/70" />
          </div>
          {(!isCollapsed || isMobile) && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">Premium Member</p>
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "w-full mt-2 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/80 justify-start rounded-xl",
            isCollapsed && !isMobile && "justify-center"
          )}
        >
          <LogOut className="w-4 h-4" />
          {(!isCollapsed || isMobile) && <span className="ml-2 text-sm">Sign Out</span>}
        </Button>
      </div>

      {/* Collapse Toggle (Desktop Only) */}
      {!isMobile && (
        <div className="p-3 border-t border-sidebar-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/80 rounded-xl"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4 mr-2" />
                <span className="text-sm">Collapse</span>
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden md:flex flex-col h-screen transition-all duration-200 bg-sidebar/95 backdrop-blur-md",
        isCollapsed ? "w-[4.5rem]" : "w-60"
      )}>
        <SidebarContent />
      </aside>

      {/* Mobile Toggle & Sheet */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="bg-background/90 backdrop-blur-sm shadow-elegant border-border rounded-xl"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 border-0">
            <SidebarContent isMobile />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default DashboardSidebar;

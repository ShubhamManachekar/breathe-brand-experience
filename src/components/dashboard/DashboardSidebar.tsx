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
    <div className="h-full flex flex-col bg-background/80 backdrop-blur-xl border-r border-border/40 text-foreground transition-all duration-300">
      {/* Header */}
      <div className="p-6 border-b border-border/30">
        <div className={cn(
          "flex items-center gap-3",
          isCollapsed && !isMobile && "justify-center"
        )}>
          <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 shadow-neo">
            <span className="font-display font-bold text-lg">E</span>
          </div>
          {(!isCollapsed || isMobile) && (
            <div className="overflow-hidden animate-fade-in-scale">
              <h1 className="font-display font-bold text-lg leading-none tracking-tight">EZE AirCare</h1>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Command Center</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                isActive
                  ? "text-primary bg-primary/5 shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
                isCollapsed && !isMobile && "justify-center px-2"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
              )}
              <item.icon className={cn(
                "w-5 h-5 flex-shrink-0 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )} />
              {(!isCollapsed || isMobile) && (
                <span className={cn("truncate", isActive && "font-semibold")}>{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border/30 bg-muted/5">
        <div className={cn(
          "flex items-center gap-3 p-2 rounded-xl transition-colors mb-2",
          isCollapsed && !isMobile && "justify-center"
        )}>
          <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 border border-accent/30">
            <User className="w-4 h-4 text-accent" />
          </div>
          {(!isCollapsed || isMobile) && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">John Doe</p>
              <p className="text-[10px] text-muted-foreground truncate uppercase tracking-wider">Premium Plan</p>
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 justify-start rounded-lg h-9",
            isCollapsed && !isMobile && "justify-center"
          )}
        >
          <LogOut className="w-4 h-4" />
          {(!isCollapsed || isMobile) && <span className="ml-2 text-xs font-medium uppercase tracking-wide">Sign Out</span>}
        </Button>
      </div>

      {/* Collapse Toggle (Desktop Only) */}
      {!isMobile && (
        <div className="p-2 border-t border-border/30">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full text-muted-foreground hover:text-foreground hover:bg-muted/40 h-8"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <div className="flex items-center">
                <ChevronLeft className="w-4 h-4 mr-2" />
                <span className="text-[10px] uppercase tracking-wider font-bold">Collapse</span>
              </div>
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
        "hidden md:flex flex-col h-screen sticky top-0 transition-all duration-300 ease-in-out border-r border-border/40 bg-background/95 backdrop-blur-xl z-30",
        isCollapsed ? "w-[5rem]" : "w-72"
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
              className="bg-background/80 backdrop-blur-md shadow-neo border-border/40 rounded-xl h-10 w-10"
            >
              <Menu className="w-5 h-5 text-foreground" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-80 border-r border-border/40 bg-background/95 backdrop-blur-xl">
            <SidebarContent isMobile />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default DashboardSidebar;

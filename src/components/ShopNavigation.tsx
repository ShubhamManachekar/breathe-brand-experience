import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, User } from "lucide-react";
import { useState } from "react";
import ScrollProgress from "@/components/ScrollProgress";
import { ThemeToggle } from "@/components/ThemeToggle";
import SegmentSwitcher from "@/components/SegmentSwitcher";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const ShopNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();
  const { user } = useAuth();

  const navItems = [
    { href: "/shop", label: "Home" },
    { href: "/shop/products", label: "Diffusers" },
    { href: "/shop/aromas", label: "Aroma Oils" },
    { href: "/shop/contact", label: "Support" },
  ];

  const isActive = (path: string) => {
    if (path === "/shop" && location.pathname === "/shop") return true;
    if (path !== "/shop" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <ScrollProgress />
      <nav className="fixed top-0 w-full z-50 transition-all duration-500 font-body">
        {/* Soft, floating pill container for B2C */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="bg-background/80 backdrop-blur-2xl rounded-full px-6 sm:px-8 border border-white/20 dark:border-white/5 shadow-neo">
            <div className="flex items-center justify-between h-20">
              {/* Logo - Organic / Soft */}
              <Link to="/shop" className="flex items-center gap-3.5 group">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-foreground text-background shadow-neo-sm transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                  <span className="font-display font-bold text-2xl">E</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-xl font-bold text-foreground leading-none group-hover:text-primary transition-colors">EZE AirCare</span>
                  <span className="text-[10px] font-medium text-muted-foreground tracking-[0.2em] uppercase mt-1">Refined Living</span>
                </div>
              </Link>

              {/* Desktop Nav - Centered Pills */}
              <div className="hidden md:flex items-center justify-center flex-1 mx-8">
                <div className="flex items-center gap-1 bg-muted/30 p-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-500 ${isActive(item.href)
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/40'
                        }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA & Actions */}
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-2 pr-4 border-r border-border/30">
                  <ThemeToggle />
                  <SegmentSwitcher />
                </div>

                {user ? (
                  <div className="flex items-center gap-2 pl-2">
                    <Link to="/shop/dashboard">
                      <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 hover:bg-muted transition-transform" title="Account">
                        <User className="w-5 h-5" />
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Link to="/shop/login" className="pl-2">
                    <Button variant="ghost" className="font-medium hover:bg-transparent hover:text-primary px-2 rounded-full">Login</Button>
                  </Link>
                )}

                <Link to="/shop/cart">
                  <Button className="rounded-full px-6 h-11 bg-accent hover:bg-accent/90 text-accent-foreground shadow-neo hover:-translate-y-0.5 transition-all">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    <span className="font-semibold">Cart</span>
                    {totalItems > 0 && (
                      <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        {totalItems}
                      </span>
                    )}
                  </Button>
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center gap-3">
                <Link to="/shop/cart" className="relative p-2">
                  <ShoppingCart className="w-6 h-6 text-foreground" />
                  {totalItems > 0 && (
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-accent rounded-full border-2 border-background animate-pulse" />
                  )}
                </Link>
                <button
                  className="w-10 h-10 rounded-full border border-border/40 bg-background/50 flex items-center justify-center text-foreground hover:text-primary transition-all active:scale-95"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Nav Dropdown */}
          <div className={`md:hidden transition-all duration-500 ${isOpen ? 'max-h-[500px] opacity-100 mt-4 translate-y-0' : 'max-h-0 opacity-0 mt-0 -translate-y-4 pointer-events-none'}`}>
            <div className="bg-background/90 backdrop-blur-xl rounded-3xl p-5 space-y-2 overflow-hidden border border-white/20 shadow-neo">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`block px-5 py-4 text-lg font-medium rounded-2xl transition-all duration-300 ${isActive(item.href)
                    ? 'bg-accent/10 text-accent'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center justify-between">
                    {item.label}
                    {isActive(item.href) && <div className="w-2 h-2 rounded-full bg-accent" />}
                  </div>
                </Link>
              ))}

              <div className="border-t border-border/20 pt-5 mt-4 space-y-4">
                <div className="flex items-center justify-between px-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Preferences</span>
                  <div className="flex gap-2">
                    <ThemeToggle />
                    <SegmentSwitcher />
                  </div>
                </div>

                {user ? (
                  <Link to="/shop/dashboard" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full justify-start pl-4 h-12 rounded-2xl">
                      <User className="w-5 h-5 mr-3" /> My Account
                    </Button>
                  </Link>
                ) : (
                  <Link to="/shop/login" onClick={() => setIsOpen(false)}>
                    <Button className="w-full h-12 rounded-2xl bg-foreground text-background shadow-neo">Login / Register</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default ShopNavigation;

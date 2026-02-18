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
      <nav className="fixed top-0 w-full z-50 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="surface-glass rounded-2xl px-6 sm:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link to="/shop" className="flex items-center gap-3.5 group">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-foreground text-background shadow-clay-sm border border-border/40 transition-all duration-500 group-hover:shadow-clay-hover group-hover:scale-105">
                  <span className="font-display font-bold text-2xl">E</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-xl font-bold text-foreground leading-none group-hover:text-primary transition-colors">EZE AirCare</span>
                  <span className="text-[10px] font-medium text-muted-foreground tracking-[0.2em] uppercase mt-1">Refined Living</span>
                </div>
              </Link>

              {/* Desktop Nav - Centered & Refined */}
              <div className="hidden md:flex items-center justify-center flex-1 mx-8">
                <div className="flex items-center gap-1 bg-background/70 p-1.5 rounded-full border border-border/60 backdrop-blur-sm">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-500 ${isActive(item.href)
                          ? 'text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-white/10'
                        }`}
                    >
                      {isActive(item.href) && (
                        <div className="absolute inset-0 bg-primary rounded-full shadow-clay-sm -z-10 animate-in zoom-in-90 duration-300" />
                      )}
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA & Actions */}
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <div className="h-8 w-px bg-border/40 mx-1" />
                  <SegmentSwitcher />
                </div>

                {user ? (
                  <div className="flex items-center gap-2 pl-2">
                    <Link to="/shop/dashboard">
                      <Button variant="glass" size="icon" className="rounded-full w-10 h-10 hover:scale-105 transition-transform" title="Account">
                        <User className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Link to="/shop/login" className="pl-2">
                    <Button variant="ghost" className="font-medium hover:bg-transparent hover:text-primary px-2">Login</Button>
                  </Link>
                )}

                <Link to="/shop/cart">
                  <Button variant="premium" size="sm" className="rounded-full px-5 h-10 shadow-clay-sm hover:translate-y-[-2px] transition-transform">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    <span className="font-semibold">Cart</span>
                    {totalItems > 0 && (
                      <span className="ml-2 bg-white/20 px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                        {totalItems}
                      </span>
                    )}
                  </Button>
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center gap-3">
                <Link to="/shop/cart" className="relative p-2">
                  <ShoppingCart className="w-5 h-5 text-foreground" />
                  {totalItems > 0 && (
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-background animate-pulse" />
                  )}
                </Link>
                <button
                  className="w-10 h-10 rounded-full ink-outline bg-background/80 flex items-center justify-center text-foreground hover:text-primary transition-all active:scale-95"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Nav Dropdown */}
          <div className={`md:hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'max-h-[500px] opacity-100 mt-4 translate-y-0' : 'max-h-0 opacity-0 mt-0 -translate-y-4 pointer-events-none'}`}>
            <div className="surface-glass rounded-2xl p-5 space-y-2 overflow-hidden">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`block px-5 py-3.5 text-base font-semibold rounded-xl transition-all duration-300 ${isActive(item.href)
                      ? 'bg-primary/5 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center justify-between">
                    {item.label}
                    {isActive(item.href) && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  </div>
                </Link>
              ))}

              <div className="border-t border-border/20 pt-5 mt-4 space-y-4">
                <div className="flex items-center justify-between px-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Settings</span>
                  <div className="flex gap-2">
                    <ThemeToggle />
                    <SegmentSwitcher />
                  </div>
                </div>

                {user ? (
                  <Link to="/shop/dashboard" onClick={() => setIsOpen(false)}>
                    <Button variant="glass" className="w-full justify-start pl-4 h-12 rounded-xl">
                      <User className="w-4 h-4 mr-3" /> My Account
                    </Button>
                  </Link>
                ) : (
                  <Link to="/shop/login" onClick={() => setIsOpen(false)}>
                    <Button variant="premium" className="w-full h-12 rounded-xl shadow-clay-sm">Login / Register</Button>
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

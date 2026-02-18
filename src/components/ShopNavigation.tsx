import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight, Menu, X, ShoppingCart } from "lucide-react";
import { useState } from "react";
import ScrollProgress from "@/components/ScrollProgress";
import { ThemeToggle } from "@/components/ThemeToggle";

const ShopNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { href: "/shop", label: "Home" },
    { href: "/shop/products", label: "Diffusers" },
    { href: "/shop/aromas", label: "Aroma Oils" },
    { href: "/about-us", label: "About" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <ScrollProgress />
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/shop" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center shadow-glow transition-all duration-300 group-hover:shadow-elegant group-hover:scale-110">
                <span className="text-primary-foreground font-display font-bold text-xl">E</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">EZE AirCare</span>
                <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">Shop</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-accent/20 ${
                    isActive(item.href) ? 'text-primary bg-accent/10' : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center space-x-3">
              <ThemeToggle />
              <Link to="/business" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                For Business →
              </Link>
              <Link to="/shop/login">
                <Button variant="glass" size="sm">Login</Button>
              </Link>
              <Button variant="hero" size="sm" className="group">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart (0)
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden w-10 h-10 rounded-lg bg-accent/10 border border-border/50 flex items-center justify-center text-foreground hover:text-primary"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Nav */}
          <div className={`md:hidden transition-all duration-300 ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="bg-background/95 backdrop-blur-lg rounded-xl m-4 shadow-elegant border border-border/50">
              <div className="p-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`block p-3 text-base font-medium rounded-lg transition-all duration-200 hover:bg-accent/20 ${
                      isActive(item.href) ? 'text-primary bg-accent/10' : 'text-foreground'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-border/50 pt-4 mt-4 space-y-3">
                  <ThemeToggle />
                  <Link to="/business" className="block text-center text-sm text-muted-foreground hover:text-primary" onClick={() => setIsOpen(false)}>
                    Switch to Business →
                  </Link>
                  <Link to="/shop/login" className="block" onClick={() => setIsOpen(false)}>
                    <Button variant="glass" size="sm" className="w-full">Login</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default ShopNavigation;

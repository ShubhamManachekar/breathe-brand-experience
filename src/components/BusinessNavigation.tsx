import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import ScrollProgress from "@/components/ScrollProgress";
import { ThemeToggle } from "@/components/ThemeToggle";

const BusinessNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { href: "/business", label: "Home" },
    { href: "/business/why-scent-marketing", label: "Why Scent Marketing" },
    {
      href: "/business/solutions",
      label: "Solutions",
      hasDropdown: true,
      subItems: [
        { href: "/business/solutions/hospitality", label: "Hospitality", badge: "Hotels & Spas" },
        { href: "/business/solutions/retail", label: "Retail", badge: "Stores & Malls" },
        { href: "/business/solutions/corporate", label: "Corporate", badge: "Offices & Workspaces" },
        { href: "/business/solutions/wellness", label: "Wellness", badge: "Healthcare & Therapy" }
      ]
    },
    { href: "/business/products", label: "Products" },
    { href: "/business/aromas", label: "Aroma Library" },
    { href: "/about-us", label: "About Us" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <ScrollProgress />
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/business" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center shadow-glow transition-all duration-300 group-hover:shadow-elegant group-hover:scale-110">
                <span className="text-primary-foreground font-display font-bold text-xl">E</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">EZE AirCare</span>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">Business</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <div key={item.href} className="relative">
                  {item.hasDropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setSolutionsOpen(true)}
                      onMouseLeave={() => setSolutionsOpen(false)}
                    >
                      <button
                        className={`flex items-center space-x-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-accent/20 ${
                          location.pathname.startsWith('/business/solutions') ? 'text-primary bg-accent/10' : 'text-muted-foreground hover:text-primary'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <div className={`absolute top-full left-0 mt-2 w-72 z-50 bg-background/95 backdrop-blur-lg rounded-xl shadow-elegant border border-border/50 transition-all duration-300 ${
                        solutionsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
                      }`}>
                        <div className="p-3">
                          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">Industry Solutions</div>
                          {item.subItems?.map((subItem) => (
                            <Link
                              key={subItem.href}
                              to={subItem.href}
                              className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/20 transition-all duration-200 group"
                            >
                              <div>
                                <div className="font-medium text-foreground group-hover:text-primary transition-colors">{subItem.label}</div>
                                <div className="text-xs text-muted-foreground">{subItem.badge}</div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-all duration-200 group-hover:translate-x-1" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-accent/20 ${
                        isActive(item.href) ? 'text-primary bg-accent/10' : 'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center space-x-3">
              <ThemeToggle />
              <Link to="/shop" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                Shop for Home →
              </Link>
              <Link to="/business/login">
                <Button variant="glass" size="sm">Login</Button>
              </Link>
              <Link to="/business/contact">
                <Button variant="hero" size="sm" className="group">
                  Get Demo
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Mobile menu */}
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
                  <div key={item.href}>
                    <Link
                      to={item.href}
                      className={`flex items-center justify-between p-3 text-base font-medium rounded-lg transition-all duration-200 hover:bg-accent/20 ${
                        isActive(item.href) ? 'text-primary bg-accent/10' : 'text-foreground hover:text-primary'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{item.label}</span>
                      {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                    </Link>
                    {item.hasDropdown && item.subItems && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            to={subItem.href}
                            className="flex items-center justify-between p-2 text-sm text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-accent/10"
                            onClick={() => setIsOpen(false)}
                          >
                            <span>{subItem.label}</span>
                            <Badge variant="secondary" className="text-xs">{subItem.badge?.split(' ')[0]}</Badge>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="border-t border-border/50 pt-4 mt-4 space-y-3">
                  <ThemeToggle />
                  <Link to="/shop" className="block text-center text-sm text-muted-foreground" onClick={() => setIsOpen(false)}>
                    Switch to Shop →
                  </Link>
                  <Link to="/business/login" className="block" onClick={() => setIsOpen(false)}>
                    <Button variant="glass" size="sm" className="w-full">Login</Button>
                  </Link>
                  <Link to="/business/contact" className="block" onClick={() => setIsOpen(false)}>
                    <Button variant="hero" size="sm" className="w-full group">
                      Get Demo
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
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

export default BusinessNavigation;

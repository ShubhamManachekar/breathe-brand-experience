import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import ScrollProgress from "@/components/ScrollProgress";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/providers/AuthProvider";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/why-scent-marketing", label: "Why Scent Marketing" },
    {
      href: "/solutions",
      label: "Solutions",
      hasDropdown: true,
      subItems: [
        { href: "/solutions/hospitality", label: "Hospitality", badge: "Hotels & Spas" },
        { href: "/solutions/retail", label: "Retail", badge: "Stores & Malls" },
        { href: "/solutions/corporate", label: "Corporate", badge: "Offices & Workspaces" },
        { href: "/solutions/wellness", label: "Wellness", badge: "Healthcare & Therapy" }
      ]
    },
    { href: "/products", label: "Products" },
    { href: "/aroma-library", label: "Aroma Library" },
    { href: "/about-us", label: "About Us" },
  ];

  const isActive = (path: string) => location.pathname === path;
  const auth = useAuth();

  return (
    <>
      <ScrollProgress />
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Enhanced Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center shadow-glow transition-all duration-300 group-hover:shadow-elegant group-hover:scale-110">
                  <span className="text-primary-foreground font-display font-bold text-xl">E</span>
                </div>
                <div className="absolute -inset-1 gradient-accent rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10" />
              </div>
              <div className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                EZE AirCare
              </div>
            </Link>

            {/* Enhanced Desktop Navigation */}
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
                          location.pathname.startsWith('/solutions')
                            ? 'text-primary bg-accent/10'
                            : 'text-muted-foreground hover:text-primary'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Enhanced Dropdown */}
                      <div className={`absolute top-full left-0 mt-2 w-72 z-50 bg-background/95 backdrop-blur-lg rounded-xl shadow-elegant border border-border/50 transition-all duration-300 ${
                        solutionsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
                      }`}>
                        <div className="p-3">
                          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
                            Industry Solutions
                          </div>
                          {item.subItems?.map((subItem) => (
                            <Link
                              key={subItem.href}
                              to={subItem.href}
                              className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/20 transition-all duration-200 group"
                            >
                              <div>
                                <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                                  {subItem.label}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {subItem.badge}
                                </div>
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
                        isActive(item.href)
                          ? 'text-primary bg-accent/10'
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <ThemeToggle />
              {auth && auth.isAuthenticated && auth.user ? (
                <div className="flex items-center space-x-2">
                  <Link to="/user/dashboard">
                    <Button variant="outline" size="sm">{auth.user.name}</Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={() => auth.logout()}>
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="glass" size="sm" className="group">
                      <span className="group-hover:scale-105 transition-transform">Login</span>
                    </Button>
                  </Link>
                  <Link to="/contact-quote">
                    <Button variant="hero" size="sm" className="group">
                      <span className="group-hover:scale-105 transition-transform">Get Demo</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Enhanced Mobile Menu Button */}
            <button
              className="md:hidden relative w-10 h-10 rounded-lg bg-accent/10 border border-border/50 flex items-center justify-center text-foreground hover:text-primary hover:bg-accent/20 transition-all duration-200"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="relative">
                {isOpen ? (
                  <X className="w-5 h-5 animate-fade-in-scale" />
                ) : (
                  <Menu className="w-5 h-5 animate-fade-in-scale" />
                )}
              </div>
            </button>
          </div>

          {/* Enhanced Mobile Navigation */}
          <div className={`md:hidden transition-all duration-300 z-50 ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="bg-background/95 backdrop-blur-lg rounded-xl m-4 shadow-elegant border border-border/50 animate-fade-in-scale">
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
                            <Badge variant="secondary" className="text-xs">
                              {subItem.badge?.split(' ')[0]}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Mobile CTA Buttons */}
                <div className="border-t border-border/50 pt-4 mt-4 space-y-3">
                  <div className="flex justify-center">
                    <ThemeToggle />
                  </div>
                  {auth && auth.isAuthenticated && auth.user ? (
                    <>
                      <Link to="/user/dashboard" className="block">
                        <Button variant="outline" size="sm" className="w-full" onClick={() => setIsOpen(false)}>
                          Dashboard
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="w-full" onClick={() => { auth.logout(); setIsOpen(false); }}>
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="block">
                        <Button variant="glass" size="sm" className="w-full" onClick={() => setIsOpen(false)}>
                          Login
                        </Button>
                      </Link>
                      <Link to="/contact-quote" className="block">
                        <Button variant="hero" size="sm" className="w-full group" onClick={() => setIsOpen(false)}>
                          Get Demo
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
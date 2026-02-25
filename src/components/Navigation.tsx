import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import ScrollProgress from "@/components/ScrollProgress";
import { ThemeToggle } from "@/components/ThemeToggle";
import SegmentSwitcher from "@/components/SegmentSwitcher";

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

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <ScrollProgress />
      <nav className="fixed top-0 w-full z-50 transition-all duration-500 font-body">
        {/* Floating pill container for global nav to match Business/Shop */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="bg-background/80 backdrop-blur-2xl rounded-full px-6 sm:px-8 border border-white/20 dark:border-white/5 shadow-neo">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3.5 group">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-foreground text-background shadow-neo-sm transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                  <span className="font-display font-bold text-2xl">E</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-xl font-bold text-foreground leading-none group-hover:text-primary transition-colors">EZE AirCare</span>
                  <span className="text-[10px] font-medium text-muted-foreground tracking-[0.2em] uppercase mt-1">Experience</span>
                </div>
              </Link>

              {/* Desktop Nav - Centered Pills */}
              <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
                <div className="flex items-center gap-1 bg-muted/30 p-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                  {navItems.map((item) => (
                    <div key={item.href} className="relative">
                      {item.hasDropdown ? (
                        <div
                          className="relative"
                          onMouseEnter={() => setSolutionsOpen(true)}
                          onMouseLeave={() => setSolutionsOpen(false)}
                        >
                          <button
                            className={`flex items-center gap-1 px-5 py-2 rounded-full text-sm font-medium transition-all duration-500 ${location.pathname.startsWith('/solutions')
                              ? 'bg-background text-foreground shadow-sm'
                              : 'text-muted-foreground hover:text-foreground hover:bg-white/40'
                              }`}
                          >
                            <span>{item.label}</span>
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${solutionsOpen ? 'rotate-180' : ''}`} />
                          </button>

                          {/* Mega Menu */}
                          <div className={`absolute top-full left-1/2 -translate-x-1/2 w-72 pt-3 transition-all duration-300 transform origin-top ${solutionsOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}`}>
                            <div className="bg-background/95 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-neo p-2 rounded-2xl">
                              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1 px-3 py-2 border-b border-border/30">Explore Solutions</div>
                              {item.subItems?.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  to={subItem.href}
                                  className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-all duration-200 group/item"
                                >
                                  <div>
                                    <div className="font-semibold text-sm text-foreground group-hover/item:text-primary transition-colors">{subItem.label}</div>
                                    <div className="text-[10px] text-muted-foreground tracking-wide">{subItem.badge}</div>
                                  </div>
                                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover/item:text-accent transition-all duration-200 -translate-x-2 opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Link
                          to={item.href}
                          className={`px-4 xl:px-6 py-2 rounded-full text-sm font-medium transition-all duration-500 block ${isActive(item.href)
                            ? 'bg-background text-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground hover:bg-white/40'
                            }`}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="hidden lg:flex items-center gap-4">
                <div className="flex items-center gap-2 pr-4 border-r border-border/30">
                  <SegmentSwitcher />
                  <ThemeToggle />
                </div>
                <div className="flex items-center gap-3 pl-2">
                  <Link to="/login">
                    <Button variant="ghost" className="font-medium hover:bg-transparent hover:text-primary px-2 rounded-full">Login</Button>
                  </Link>
                  <Link to="/contact-quote">
                    <Button className="rounded-full px-6 h-11 bg-primary hover:bg-primary/90 text-primary-foreground shadow-neo hover:-translate-y-0.5 transition-all">
                      Get Demo
                      <ArrowRight className="w-3.5 h-3.5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden flex items-center gap-3">
                <button
                  className="w-10 h-10 rounded-full border border-border/40 bg-background/50 flex items-center justify-center text-foreground hover:text-primary transition-all active:scale-95"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Dropdown */}
          <div className={`lg:hidden transition-all duration-500 ${isOpen ? 'max-h-[700px] opacity-100 mt-4 translate-y-0' : 'max-h-0 opacity-0 mt-0 -translate-y-4 pointer-events-none'}`}>
            <div className="bg-background/90 backdrop-blur-xl rounded-3xl p-5 space-y-2 overflow-hidden border border-white/20 shadow-neo">
              {navItems.map((item) => (
                <div key={item.href}>
                  <Link
                    to={item.href}
                    className={`block px-5 py-3 text-base font-medium rounded-2xl transition-all duration-300 ${isActive(item.href)
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center justify-between">
                      {item.label}
                      {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                      {isActive(item.href) && !item.hasDropdown && <div className="w-2 h-2 rounded-full bg-primary" />}
                    </div>
                  </Link>
                  {item.hasDropdown && item.subItems && (
                    <div className="ml-4 mt-1 space-y-1 pl-4 border-l border-border/30">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          to={subItem.href}
                          className="block py-2.5 px-3 text-sm rounded-xl text-muted-foreground hover:text-primary hover:bg-muted/30 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="font-medium">{subItem.label}</span>
                          <span className="block text-[10px] text-muted-foreground/70 tracking-wide">{subItem.badge}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="border-t border-border/20 pt-5 mt-4 space-y-4">
                <div className="flex items-center justify-between px-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Preferences</span>
                  <div className="flex gap-2">
                    <ThemeToggle />
                    <SegmentSwitcher />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full rounded-2xl">Login</Button>
                  </Link>
                  <Link to="/contact-quote" onClick={() => setIsOpen(false)}>
                    <Button className="w-full rounded-2xl bg-primary text-primary-foreground shadow-neo">Get Demo</Button>
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

export default Navigation;
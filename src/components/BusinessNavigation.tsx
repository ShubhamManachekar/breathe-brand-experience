import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ArrowRight, User, LogOut } from "lucide-react";
import ScrollProgress from "@/components/ScrollProgress";
import { ThemeToggle } from "@/components/ThemeToggle";
import SegmentSwitcher from "@/components/SegmentSwitcher";
import { useAuth } from "@/contexts/AuthContext";

const BusinessNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  const navItems = [
    { href: "/business", label: "Home" },
    { href: "/business/why-scent-marketing", label: "Scent Marketing" },
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
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  return (
    <>
      <ScrollProgress />
      <nav className="fixed top-0 w-full z-50 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="surface-glass rounded-2xl px-6 sm:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link to="/business" className="flex items-center gap-3.5 group">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-foreground text-background shadow-clay-sm border border-border/40 transition-all duration-500 group-hover:shadow-clay-hover group-hover:scale-105">
                  <span className="font-display font-bold text-2xl">E</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-xl font-bold text-foreground leading-none group-hover:text-primary transition-colors">EZE AirCare</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-medium text-muted-foreground tracking-[0.2em] uppercase">Business</span>
                    <div className="w-1 h-1 rounded-full bg-accent" />
                    <span className="text-[10px] font-medium text-muted-foreground tracking-wide uppercase">Solutions</span>
                  </div>
                </div>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center justify-center flex-1 mx-4">
                <div className="flex items-center gap-0.5 bg-background/70 p-1.5 rounded-full border border-border/60 backdrop-blur-sm">
                  {navItems.map((item) => (
                    <div key={item.href} className="relative group">
                      {item.hasDropdown ? (
                        <div
                          className="relative"
                          onMouseEnter={() => setSolutionsOpen(true)}
                          onMouseLeave={() => setSolutionsOpen(false)}
                        >
                          <button
                            className={`flex items-center space-x-1 px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${location.pathname.startsWith('/business/solutions')
                              ? 'text-primary-foreground relative z-10'
                              : 'text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-white/10'
                              }`}
                          >
                            {location.pathname.startsWith('/business/solutions') && (
                              <div className="absolute inset-0 bg-primary rounded-full shadow-clay-sm -z-10 animate-in zoom-in-90 duration-300" />
                            )}
                            <span>{item.label}</span>
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${solutionsOpen ? 'rotate-180' : ''}`} />
                          </button>

                          <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 z-50 transition-all duration-300 ${solutionsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                            <div className="surface-glass p-4 shadow-xl bg-background/95">
                              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 px-2 border-b border-border/30 pb-2">Use Cases</div>
                              {item.subItems?.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  to={subItem.href}
                                  className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-all duration-200 group/item"
                                >
                                  <div>
                                    <div className="font-semibold text-sm text-foreground group-hover/item:text-primary transition-colors">{subItem.label}</div>
                                    <div className="text-[10px] text-muted-foreground">{subItem.badge}</div>
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
                          className={`relative block px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${isActive(item.href)
                            ? 'text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-white/10'
                            }`}
                        >
                          {isActive(item.href) && (
                            <div className="absolute inset-0 bg-primary rounded-full shadow-clay-sm -z-10 animate-in zoom-in-90 duration-300" />
                          )}
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="hidden lg:flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <div className="h-8 w-px bg-border/40 mx-1" />
                  <SegmentSwitcher />
                </div>

                {user ? (
                  <div className="flex items-center gap-2 pl-2">
                    <Link to="/business/dashboard">
                      <Button variant="glass" size="icon" className="rounded-full w-10 h-10 hover:scale-105 transition-transform">
                        <User className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link to="/business/login">
                      <Button variant="ghost" size="icon" onClick={handleSignOut} className="rounded-full w-10 h-10 text-muted-foreground hover:text-destructive">
                        <LogOut className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 pl-2">
                    <Link to="/business/login">
                      <Button variant="glass" size="sm" className="rounded-full px-5 h-9">Login</Button>
                    </Link>
                    <Link to="/business/contact">
                      <Button variant="hero" size="sm" className="rounded-full px-5 h-9 shadow-clay-sm hover:translate-y-[-2px] transition-transform group">
                        Get Demo
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile menu */}
              <button
                className="lg:hidden w-10 h-10 rounded-full ink-outline bg-background/80 flex items-center justify-center text-foreground hover:text-primary transition-all active:scale-95"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          <div className={`lg:hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'max-h-screen opacity-100 mt-4 translate-y-0' : 'max-h-0 opacity-0 mt-0 -translate-y-4 pointer-events-none'}`}>
            <div className="surface-glass rounded-2xl p-5 space-y-2 overflow-hidden">
              <div className="flex justify-center pb-3 border-b border-border/30 mb-2">
                <SegmentSwitcher />
              </div>

              {navItems.map((item) => (
                <div key={item.href}>
                  <Link
                    to={item.href}
                    className={`flex items-center justify-between p-3.5 text-base font-semibold rounded-xl transition-all duration-300 ${isActive(item.href)
                      ? 'bg-primary/5 text-primary'
                      : 'text-foreground hover:text-primary hover:bg-muted/30'
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                    {isActive(item.href) && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  </Link>

                  {item.hasDropdown && item.subItems && (
                    <div className="ml-4 mt-2 space-y-1 border-l-2 border-border/30 pl-3">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          to={subItem.href}
                          className="flex items-center justify-between p-2.5 text-sm text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted/30"
                          onClick={() => setIsOpen(false)}
                        >
                          <span>{subItem.label}</span>
                          <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{subItem.badge?.split(' ')[0]}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="border-t border-border/30 pt-5 mt-4 space-y-3">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <span className="text-xs font-semibold text-muted-foreground">Dark Mode</span>
                  </div>
                </div>

                {user ? (
                  <>
                    <Link to="/business/dashboard" className="block" onClick={() => setIsOpen(false)}>
                      <Button variant="glass" size="lg" className="w-full gap-2 rounded-xl justify-start pl-4">
                        <User className="w-4 h-4" />
                        {profile?.full_name || "My Account"}
                      </Button>
                    </Link>
                    <Button variant="ghost" size="lg" className="w-full text-muted-foreground hover:text-destructive gap-2 justify-start pl-4" onClick={handleSignOut}>
                      <LogOut className="w-4 h-4" /> Sign Out
                    </Button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link to="/business/login" onClick={() => setIsOpen(false)}>
                      <Button variant="glass" size="lg" className="w-full rounded-xl">Login</Button>
                    </Link>
                    <Link to="/business/contact" onClick={() => setIsOpen(false)}>
                      <Button variant="hero" size="lg" className="w-full rounded-xl shadow-clay-sm">Get Demo</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default BusinessNavigation;

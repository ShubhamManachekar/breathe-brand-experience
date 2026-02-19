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
      <nav className="fixed top-0 w-full z-50 transition-all duration-500 font-body">
        <div className="w-full bg-background/80 backdrop-blur-2xl border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo - Architectural / Sharp */}
              <Link to="/business" className="flex items-center gap-4 group">
                <div className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground border border-primary-foreground/20 rounded-sm shadow-neo transition-transform duration-500 group-hover:scale-105">
                  <span className="font-display font-bold text-2xl">E</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-lg font-bold text-foreground leading-none tracking-tight group-hover:text-primary transition-colors">EZE AIRCARE</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-semibold text-muted-foreground tracking-[0.25em] uppercase">Enterprise</span>
                  </div>
                </div>
              </Link>

              {/* Desktop Nav - Clean & Minimal */}
              <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
                <div className="flex items-center gap-6">
                  {navItems.map((item) => (
                    <div key={item.href} className="relative group h-20 flex items-center">
                      {item.hasDropdown ? (
                        <div
                          className="relative h-full flex items-center"
                          onMouseEnter={() => setSolutionsOpen(true)}
                          onMouseLeave={() => setSolutionsOpen(false)}
                        >
                          <button
                            className={`flex items-center space-x-1 text-sm font-semibold uppercase tracking-wider transition-colors duration-300 ${location.pathname.startsWith('/business/solutions')
                              ? 'text-primary'
                              : 'text-muted-foreground hover:text-foreground'
                              }`}
                          >
                            <span>{item.label}</span>
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${solutionsOpen ? 'rotate-180' : ''}`} />
                          </button>

                          {/* Active Indicator Line */}
                          {location.pathname.startsWith('/business/solutions') && (
                             <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary" />
                          )}

                          {/* Mega Menu - Architectural Glass Panel */}
                          <div className={`absolute top-full left-1/2 -translate-x-1/2 w-80 pt-2 transition-all duration-300 transform origin-top ${solutionsOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}`}>
                            <div className="bg-background/95 backdrop-blur-xl border border-border/50 shadow-neo-hover p-2 rounded-sm">
                              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-3 py-2 border-b border-border/30">Industries</div>
                              {item.subItems?.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  to={subItem.href}
                                  className="flex items-center justify-between p-3 rounded-sm hover:bg-muted/50 transition-all duration-200 group/item"
                                >
                                  <div>
                                    <div className="font-semibold text-sm text-foreground group-hover/item:text-primary transition-colors">{subItem.label}</div>
                                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{subItem.badge}</div>
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
                          className={`relative h-full flex items-center text-sm font-semibold uppercase tracking-wider transition-colors duration-300 ${isActive(item.href)
                            ? 'text-primary'
                            : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                          {item.label}
                          {isActive(item.href) && (
                             <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary" />
                          )}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA - Sharp & Professional */}
              <div className="hidden lg:flex items-center gap-4 shrink-0">
                <div className="flex items-center gap-3 pr-4 border-r border-border/30">
                  <ThemeToggle />
                  <SegmentSwitcher />
                </div>

                {user ? (
                  <div className="flex items-center gap-2 pl-2">
                    <Link to="/business/dashboard">
                      <Button variant="outline" size="icon" className="rounded-sm w-10 h-10 border-primary/20 hover:bg-primary/5 hover:border-primary transition-all">
                        <User className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link to="/business/login">
                      <Button variant="ghost" size="icon" onClick={handleSignOut} className="rounded-sm w-10 h-10 text-muted-foreground hover:text-destructive">
                        <LogOut className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link to="/business/login">
                      <span className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide cursor-pointer">Login</span>
                    </Link>
                    <Link to="/business/contact">
                      <Button className="rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-5 shadow-neo hover:translate-y-[-1px] transition-all uppercase tracking-wider text-xs font-bold">
                        Request Proposal
                        <ArrowRight className="w-3.5 h-3.5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile menu toggle */}
              <button
                className="lg:hidden w-10 h-10 flex items-center justify-center text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav - Slide Down Panel */}
        <div className={`lg:hidden fixed inset-x-0 top-20 bg-background/95 backdrop-blur-xl border-b border-border/50 transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
          <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-center pb-4 border-b border-border/30">
              <SegmentSwitcher />
            </div>

            {navItems.map((item) => (
              <div key={item.href}>
                <Link
                  to={item.href}
                  className={`flex items-center justify-between p-3 text-sm font-bold uppercase tracking-wider transition-colors ${isActive(item.href)
                    ? 'text-primary bg-primary/5 border-l-2 border-primary pl-2'
                    : 'text-foreground hover:text-primary'
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </Link>

                {item.hasDropdown && item.subItems && (
                  <div className="ml-4 mt-2 space-y-1 border-l border-border/30 pl-4">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        to={subItem.href}
                        className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="font-semibold">{subItem.label}</span>
                        <span className="block text-[10px] uppercase tracking-wide opacity-70">{subItem.badge?.split(' ')[0]}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="border-t border-border/30 pt-6 mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Preferences</span>
                <ThemeToggle />
              </div>

              {user ? (
                <div className="space-y-3">
                  <Link to="/business/dashboard" className="block" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full rounded-sm justify-start gap-2 border-primary/30">
                      <User className="w-4 h-4" />
                      {profile?.full_name || "My Account"}
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start gap-2 text-destructive" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4" /> Sign Out
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/business/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full rounded-sm border-primary/30">Login</Button>
                  </Link>
                  <Link to="/business/contact" onClick={() => setIsOpen(false)}>
                    <Button className="w-full rounded-sm bg-primary text-primary-foreground shadow-neo">Get Demo</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default BusinessNavigation;

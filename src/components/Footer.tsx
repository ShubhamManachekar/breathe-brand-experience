import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Linkedin, Send, MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isShop = location.pathname.startsWith("/shop");
  const isBusiness = location.pathname.startsWith("/business");

  const primaryLinks = isBusiness
    ? [
      { to: "/business/solutions/hospitality", label: "Hospitality" },
      { to: "/business/solutions/retail", label: "Retail" },
      { to: "/business/solutions/corporate", label: "Corporate" },
      { to: "/business/solutions/wellness", label: "Wellness" },
    ]
    : [
      { to: "/shop/products", label: "Diffusers" },
      { to: "/shop/aromas", label: "Aroma Oils" },
      { to: "/shop/cart", label: "Cart" },
      { to: "/shop/contact", label: "Support" },
    ];

  const companyLinks = isBusiness
    ? [
      { to: "/about-us", label: "About Us" },
      { to: "/business/products", label: "Products" },
      { to: "/business/aromas", label: "Fragrance Library" },
      { to: "/business/contact", label: "Request a Quote" },
    ]
    : [
      { to: "/about-us", label: "About Us" },
      { to: "/shop", label: "Shop Home" },
      { to: "/business", label: "For Business" },
      { to: "/shop/login", label: "My Account" },
    ];

  return (
    <footer className="relative overflow-hidden">
      <div className="h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="bg-background pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="surface-glass rounded-3xl p-6 sm:p-8 md:p-12 mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
            <div>
              <div className="pill-label mb-4">{isBusiness ? "Business" : "Shop"}</div>
              <h3 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                {isBusiness ? "Ready for a tailored scent program?" : "Design your home scent ritual."}
              </h3>
              <p className="text-muted-foreground mt-3 max-w-xl">
                {isBusiness
                  ? "Book a strategy session and receive a custom deployment plan."
                  : "Explore diffusers and aroma oils curated for every room."}
              </p>
            </div>
            <Link to={isBusiness ? "/business/contact" : "/shop/products"}>
              <Button variant="hero" size="lg" className="group">
                {isBusiness ? "Request a demo" : "Start shopping"}
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 mb-16">
            <div className="lg:col-span-4 space-y-6">
              <Link to={isShop ? "/shop" : isBusiness ? "/business" : "/"} className="flex items-center gap-3 group w-fit">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-foreground text-background shadow-clay-sm border border-border/40 transition-all duration-300 group-hover:shadow-clay-hover group-hover:scale-105">
                  <span className="font-display font-bold text-2xl">E</span>
                </div>
                <div className="font-display text-2xl font-semibold text-foreground">EZE AirCare</div>
              </Link>
              <p className="text-muted-foreground max-w-sm">
                {isBusiness
                  ? "We translate scent science into measurable brand outcomes for hospitality, retail, and corporate environments."
                  : "Premium diffusers and aroma oils inspired by Indian perfumery, crafted for modern living."}
              </p>
              <div className="flex items-center gap-3">
                {[Instagram, Linkedin, Twitter, Facebook].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    aria-label="Social"
                    className="w-10 h-10 rounded-xl card-loom flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-display text-lg font-semibold text-foreground">{isBusiness ? "Solutions" : "Shop"}</h4>
              <ul className="space-y-3">
                {primaryLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-display text-lg font-semibold text-foreground">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4 space-y-5">
              <h4 className="font-display text-lg font-semibold text-foreground">Stay Connected</h4>
              <p className="text-sm text-muted-foreground">
                {isBusiness
                  ? "Receive industry insights, trend reports, and scent strategy updates."
                  : "Get early access to launches and curated home fragrance tips."}
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <Input placeholder="you@company.com" className="h-11" />
                <Button type="submit" variant="hero" size="icon">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
              <div className="space-y-3">
                {[
                  { icon: MapPin, text: "101, Tech Park Avenue, Gurgaon, India" },
                  { icon: Mail, text: `${isShop ? "support" : "hello"}@ezeaircare.com`, href: `mailto:${isShop ? "support" : "hello"}@ezeaircare.com` },
                  { icon: Phone, text: "+91 98765 43210", href: "tel:+919876543210" },
                ].map(({ icon: Icon, text, href }) => (
                  <div key={text} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <div className="w-7 h-7 rounded-lg card-loom flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5 text-accent" />
                    </div>
                    {href ? (
                      <a href={href} className="hover:text-foreground transition-colors">{text}</a>
                    ) : (
                      <span>{text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border/60 pt-6">
            <p className="text-xs text-muted-foreground">© {currentYear} EZE AirCare Technologies. All rights reserved.</p>
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
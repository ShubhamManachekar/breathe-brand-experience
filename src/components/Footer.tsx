import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Linkedin, Send, MapPin, Mail, Phone, ExternalLink } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background border-t border-border/50 pt-16 pb-8 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-muted/20 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link to="/" className="flex items-center space-x-3 group w-fit">
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
                        <p className="text-muted-foreground leading-relaxed max-w-sm">
                            Transforming spaces through the science of scent. We engineer premium fragrance experiences for global brands, hospitality leaders, and wellness environments.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="p-2 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-300">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-300">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-300">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-300">
                                <Facebook className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="font-display font-semibold text-foreground">Solutions</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/solutions/hospitality" className="text-muted-foreground hover:text-primary transition-colors flex items-center group">
                                    <span className="w-1 h-1 bg-accent rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Hospitality
                                </Link>
                            </li>
                            <li>
                                <Link to="/solutions/retail" className="text-muted-foreground hover:text-primary transition-colors flex items-center group">
                                    <span className="w-1 h-1 bg-accent rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Retail
                                </Link>
                            </li>
                            <li>
                                <Link to="/solutions/corporate" className="text-muted-foreground hover:text-primary transition-colors flex items-center group">
                                    <span className="w-1 h-1 bg-accent rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Corporate
                                </Link>
                            </li>
                            <li>
                                <Link to="/solutions/wellness" className="text-muted-foreground hover:text-primary transition-colors flex items-center group">
                                    <span className="w-1 h-1 bg-accent rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Wellness
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="font-display font-semibold text-foreground">Company</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/about-us" className="text-muted-foreground hover:text-primary transition-colors flex items-center group">
                                    <span className="w-1 h-1 bg-accent rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors flex items-center group">
                                    <span className="w-1 h-1 bg-accent rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/aroma-library" className="text-muted-foreground hover:text-primary transition-colors flex items-center group">
                                    <span className="w-1 h-1 bg-accent rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Fragrance Library
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact-quote" className="text-muted-foreground hover:text-primary transition-colors flex items-center group">
                                    <span className="w-1 h-1 bg-accent rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Contact & Support
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm">
                            <h4 className="font-display font-semibold text-foreground mb-2">Stay Connected</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                                Subscribe to our newsletter for the latest scent marketing trends and product updates.
                            </p>
                            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                                <Input
                                    placeholder="Enter your email"
                                    className="bg-background/80 border-border/50 focus:border-primary/50"
                                />
                                <Button type="submit" variant="hero" size="icon" className="shrink-0">
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-start gap-3 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4 text-accent mt-1 shrink-0" />
                                <span>101, Tech Park Avenue, Cyber City, Gurgaon, India</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Mail className="w-4 h-4 text-accent shrink-0" />
                                <a href="mailto:hello@ezeaircare.com" className="hover:text-primary transition-colors">hello@ezeaircare.com</a>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Phone className="w-4 h-4 text-accent shrink-0" />
                                <a href="tel:+919876543210" className="hover:text-primary transition-colors">+91 98765 43210</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground text-center md:text-left">
                        © {currentYear} EZE AirCare Technologies. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-xs text-muted-foreground">
                        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

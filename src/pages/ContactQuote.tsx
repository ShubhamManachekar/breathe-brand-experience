import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Building2, MapPin, Mail, Phone, Calendar, ArrowRight, Star, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageMeta from "@/components/PageMeta";
import AnimatedSection from "@/components/AnimatedSection";
import NeoHero from "@/components/NeoHero";
import { Link } from "react-router-dom";
import heroContact from "@/assets/hero-contact.jpg";

const ContactQuote = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({
        title: "Proposal Requested",
        description: "Our team will be in touch within 24 hours.",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Request a Quote - Scent Marketing Solutions"
        description="Get a custom scent marketing proposal for your business. Expert consultation for hotels, retail, and corporate spaces."
        keywords="scent marketing quote, business fragrance proposal, ambient scent consultation"
        ogType="website"
      />

      {/* ── Minimalist Hero ── */}
      <NeoHero
        label="Contact Us"
        headline={
          <>
            Start your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-navy to-accent animate-gradient-x">
              scent journey.
            </span>
          </>
        }
        subheadline="Book a consultation with our scent strategists to audit your space and receive a tailored proposal."
        variant="business"
        texture="loom"
        heroImage={heroContact}
        heroImageAlt="Luxury aroma collection"
      />

      <section className="section-shell -mt-32 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.45fr_0.55fr] gap-0 shadow-2xl shadow-primary/10 rounded-sm overflow-hidden border border-border/40 bg-background">

            {/* ── Left Column: Trust & Context ── */}
            <div className="bg-primary text-primary-foreground p-10 md:p-14 relative overflow-hidden flex flex-col justify-between min-h-[600px]">
              <div className="absolute inset-0 bg-oil-texture opacity-30 mix-blend-overlay" />

              <div className="relative z-10">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-accent/20 text-accent text-[10px] font-bold uppercase tracking-widest mb-8 border border-accent/20">
                   Complimentary Audit
                 </div>
                 <h2 className="font-display text-4xl font-semibold mb-6">Why partner with EZE?</h2>
                 <ul className="space-y-6">
                   {[
                     { title: "Science-Backed Strategy", desc: "Fragrance design based on behavioral psychology." },
                     { title: "Global Installation", desc: "Seamless deployment across multiple locations." },
                     { title: "Health & Safety", desc: "IFRA-compliant, hypoallergenic formulations." },
                   ].map((item) => (
                     <li key={item.title} className="flex gap-4">
                       <div className="mt-1 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                         <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                       </div>
                       <div>
                         <h3 className="font-bold text-lg">{item.title}</h3>
                         <p className="text-primary-foreground/70 text-sm leading-relaxed">{item.desc}</p>
                       </div>
                     </li>
                   ))}
                 </ul>
              </div>

              <div className="relative z-10 mt-12 pt-12 border-t border-primary-foreground/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-primary bg-muted flex items-center justify-center text-primary font-bold text-xs relative z-10">
                        <Users className="w-4 h-4" />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <div className="font-bold">Trusted by 500+ Brands</div>
                    <div className="flex items-center text-accent text-xs">
                      <Star className="w-3 h-3 fill-current mr-1" />
                      <Star className="w-3 h-3 fill-current mr-1" />
                      <Star className="w-3 h-3 fill-current mr-1" />
                      <Star className="w-3 h-3 fill-current mr-1" />
                      <Star className="w-3 h-3 fill-current" />
                    </div>
                  </div>
                </div>
                <blockquote className="text-sm italic text-primary-foreground/80">
                  "EZE AirCare transformed our lobby experience. Guest retention is up 15%."
                </blockquote>
                <div className="mt-2 text-xs font-bold uppercase tracking-wide opacity-70">— VP Operations, Luxe Hotels</div>
              </div>
            </div>

            {/* ── Right Column: The Form ── */}
            <div className="p-10 md:p-14 bg-background">
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6 animate-scale-in">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-foreground mb-4">Request Received</h3>
                  <p className="text-muted-foreground max-w-md mb-8">
                    Thank you for your interest. A scent strategist has been notified and will review your requirements shortly.
                  </p>
                  <Button onClick={() => window.location.href = '/business/solutions'} variant="outline" className="uppercase tracking-wider text-xs font-bold">
                    Return to Solutions
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-semibold text-foreground">Tell us about your project</h3>
                    <p className="text-sm text-muted-foreground">Fill out the form below or email <a href="mailto:hello@ezeaircare.com" className="text-primary hover:underline">hello@ezeaircare.com</a></p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">First Name</Label>
                      <Input id="firstName" required placeholder="Jane" className="h-12 rounded-sm border-border/60 focus-visible:ring-primary" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Last Name</Label>
                      <Input id="lastName" required placeholder="Doe" className="h-12 rounded-sm border-border/60 focus-visible:ring-primary" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Work Email</Label>
                    <Input id="email" type="email" required placeholder="jane@company.com" className="h-12 rounded-sm border-border/60 focus-visible:ring-primary" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Company</Label>
                      <Input id="company" required placeholder="Company Name" className="h-12 rounded-sm border-border/60 focus-visible:ring-primary" />
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="industry" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Industry</Label>
                       <Select>
                        <SelectTrigger className="h-12 rounded-sm border-border/60 focus:ring-primary">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hospitality">Hospitality</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="corporate">Corporate</SelectItem>
                          <SelectItem value="wellness">Wellness</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Project Details</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your space size, goals, and timeline..."
                      className="min-h-[120px] rounded-sm border-border/60 focus-visible:ring-primary resize-none p-4"
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm uppercase tracking-wider text-xs font-bold shadow-neo group">
                    {isSubmitting ? "Sending..." : "Request Proposal"}
                    {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground mt-4">
                    By submitting this form, you agree to our <Link to="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Info Footer ── */}
      <section className="py-20 bg-background border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">Global Headquarters</h3>
              <p className="text-muted-foreground text-sm">123 Business Bay, Tower A<br />Mumbai, India 400001</p>
            </div>
            <div className="p-6 border-x border-border/30">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">Phone Support</h3>
              <p className="text-muted-foreground text-sm">+91 98765 43210<br />Mon-Fri, 9am - 6pm IST</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">Email Us</h3>
              <p className="text-muted-foreground text-sm">hello@ezeaircare.com<br />support@ezeaircare.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactQuote;

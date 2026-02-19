import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import PageMeta from "@/components/PageMeta";
import AnimatedSection from "@/components/AnimatedSection";

const ContactQuote = () => {
  const location = useLocation();
  const [interest, setInterest] = useState(location.state?.interest || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-loom overflow-hidden">
      <PageMeta
        title="Get a Quote - Request Demo & Consultation"
        description="Request a personalized quote for EZE AirCare scent solutions. Free consultation, custom fragrance recommendations, and competitive pricing for your business space."
        keywords="scent marketing quote, diffuser pricing, fragrance consultation, commercial diffuser quote"
        ogType="website"
      />

      {/* Hero */}
      <section className="section-shell pt-28 relative">
        <div className="absolute inset-0 bg-grid-fade" />
        <div className="absolute -top-10 right-12 w-64 h-64 rounded-full bg-accent/15 blur-3xl animate-float-slower" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="pill-label justify-center mb-6">Business consultation</div>
          <AnimatedSection animation="fadeInUp">
            <h1 className="font-display text-5xl md:text-6xl font-semibold text-foreground">
              Build a scent program
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-glow">
                tailored to your space.
              </span>
            </h1>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={150}>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-6">
              Share your goals and we will craft a custom proposal with hardware sizing, fragrance direction, and pricing.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-shell">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10">
            <Card className="card-loom relative">
              {isSuccess && (
                <div className="absolute inset-0 bg-background/95 backdrop-blur-sm z-20 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-foreground mb-2">Request received.</h3>
                    <p className="text-muted-foreground mb-6">Our team will reach out within 24 hours.</p>
                    <Button onClick={() => setIsSuccess(false)} variant="outline">Send another request</Button>
                  </div>
                </div>
              )}

              <CardContent className="p-8 sm:p-10">
                <h2 className="font-display text-2xl font-semibold text-foreground">Request your quote</h2>
                <p className="text-sm text-muted-foreground mt-2">Tell us about your space and goals.</p>

                {interest && (
                  <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest">Inquiring about</p>
                      <p className="font-display text-lg font-semibold text-foreground">{interest}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setInterest("")}>
                      Change
                    </Button>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" required placeholder="Jane Sharma" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Work Email *</Label>
                      <Input id="email" type="email" required placeholder="jane@company.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input id="phone" required placeholder="+91 98765 43210" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" placeholder="Purchase Manager" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Company name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Industry *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="retail">Retail & Shopping</SelectItem>
                          <SelectItem value="hospitality">Hospitality & Hotels</SelectItem>
                          <SelectItem value="corporate">Corporate & Offices</SelectItem>
                          <SelectItem value="wellness">Wellness & Healthcare</SelectItem>
                          <SelectItem value="fitness">Gyms & Fitness</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interest">Interested In</Label>
                    <Input
                      id="interest"
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      placeholder="EZE Pro Diffuser, Signature scenting"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="space-size">Space Size (sqm)</Label>
                      <Input id="space-size" placeholder="500" />
                    </div>
                    <div className="space-y-2">
                      <Label>Timeline</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="1-3">1-3 Months</SelectItem>
                          <SelectItem value="3+">3+ Months</SelectItem>
                          <SelectItem value="planning">Planning</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Budget</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="economy">Economy</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="bespoke">Bespoke</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Details *</Label>
                    <Textarea id="message" className="min-h-[140px]" placeholder="Tell us about your requirements." required />
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="w-4 h-4 mr-2" />
                        Request Custom Quote
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="card-loom">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-display text-xl font-semibold text-foreground">Contact information</h3>
                  {[{ icon: Phone, label: "Phone", value: "+91 98765 43210" }, { icon: Mail, label: "Email", value: "hello@ezeaircare.com" }, { icon: MapPin, label: "Address", value: "Gurgaon, India" }].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">{item.label}</p>
                        <p className="text-sm text-foreground">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="card-loom">
                <CardContent className="p-6">
                  <h4 className="font-display text-lg font-semibold text-foreground">Need faster guidance?</h4>
                  <p className="text-sm text-muted-foreground mt-2">Schedule a 15-minute discovery call with a scent strategist.</p>
                  <Button variant="outline" className="mt-4 w-full">Book a call</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactQuote;
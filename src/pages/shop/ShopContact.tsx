import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, MessageSquare, ChevronDown, ChevronUp, Send } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useToast } from "@/hooks/use-toast";
import PageMeta from "@/components/PageMeta";

const faqs = [
  { q: "How long does shipping take?", a: "Orders ship within 2 business days. Standard delivery is 5-7 days across India." },
  { q: "What is the return policy?", a: "We offer a 30-day hassle-free return policy in original packaging." },
  { q: "How often do I need to refill the oil?", a: "A 250ml cartridge lasts 30-60 days depending on intensity and model." },
  { q: "Are the aroma oils safe for pets and children?", a: "Our cold-air diffusion uses no heat and oils are IFRA-compliant." },
  { q: "Can I use third-party oils?", a: "We recommend EZE AirCare oils to maintain performance and warranty." },
];

const ShopContact = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast({ title: "Message sent!", description: "We will reply within 24 hours." });
      setForm({ name: "", email: "", subject: "", message: "" });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-loom overflow-hidden">
      <PageMeta
        title="Shop Support & Contact"
        description="Get help with orders, product setup, and aroma recommendations from EZE AirCare support."
        keywords="shop support, customer contact, order help, aroma guidance"
        canonicalUrl="https://ezeaircare.com/shop/contact"
        ogType="website"
      />
      {/* Hero */}
      <section className="section-shell pt-28 relative">
        <div className="absolute inset-0 bg-grid-fade" />
        <div className="absolute -top-10 right-12 w-64 h-64 rounded-full bg-accent/15 blur-3xl animate-float-slower" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="pill-label justify-center mb-6">
            <MessageSquare className="w-3.5 h-3.5" /> Support
          </div>
          <AnimatedSection animation="fadeInUp">
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground">We are here to help.</h1>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={150}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
              Questions about orders, diffusers, or aroma oils? Let us know.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-shell">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-10">
            <div className="pill-label justify-center">FAQ</div>
            <h2 className="font-display text-3xl font-semibold text-foreground mt-4">Answers, quick and clear.</h2>
          </AnimatedSection>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <AnimatedSection key={faq.q} animation="fadeInUp" delay={index * 60}>
                <Card className="card-loom overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium text-foreground pr-4">{faq.q}</span>
                    {openFaq === index ? <ChevronUp className="w-5 h-5 text-accent" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                  </button>
                  <div className={`transition-all duration-300 ${openFaq === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                    <div className="px-5 pb-5 text-sm text-muted-foreground border-t border-border/40 pt-4">
                      {faq.a}
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section-shell">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <AnimatedSection animation="fadeInUp">
                <Card className="card-loom">
                  <CardContent className="p-6 sm:p-8">
                    <h2 className="font-display text-xl font-semibold text-foreground mb-6">Send a message</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="Order inquiry, product help" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <textarea
                          id="message"
                          rows={4}
                          className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none text-sm"
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          required
                        />
                      </div>
                      <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                        {loading ? "Sending..." : (<><Send className="w-4 h-4 mr-2" /> Send Message</>)}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <AnimatedSection animation="fadeInUp" delay={100}>
                <Card className="card-loom">
                  <CardContent className="p-6 space-y-4">
                    <h2 className="font-display text-lg font-semibold text-foreground">Other ways to reach us</h2>
                    {[{ icon: Mail, label: "Email", value: "support@ezeaircare.com" }, { icon: Phone, label: "Phone", value: "+91 98765 43210" }, { icon: MapPin, label: "Address", value: "Gurgaon, India" }].map((c) => (
                      <div key={c.label} className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center">
                          <c.icon className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-widest text-muted-foreground">{c.label}</p>
                          <p className="text-sm text-foreground">{c.value}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" delay={200}>
                <Card className="card-loom">
                  <CardContent className="p-6">
                    <h3 className="font-display font-semibold text-foreground mb-2">Business inquiries?</h3>
                    <p className="text-sm text-muted-foreground mb-4">For bulk orders or corporate solutions, reach our business team.</p>
                    <Link to="/business/contact">
                      <Button variant="outline" size="sm">Go to Business Contact</Button>
                    </Link>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopContact;
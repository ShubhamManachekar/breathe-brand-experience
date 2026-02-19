import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowRight,
  Building2,
  TrendingUp,
  Users,
  Clock,
  ShieldCheck,
  Hotel,
  ShoppingBag,
  Briefcase,
  Heart,
  CheckCircle2,
  Calendar,
  Target,
  Zap,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import DynamicCounter from "@/components/DynamicCounter";
import { useToast } from "@/hooks/use-toast";
import PageMeta from "@/components/PageMeta";
import ParticleField from "@/components/ParticleField";
import NeoHero from "@/components/NeoHero";

const INDUSTRIES = ["Hospitality", "Retail", "Corporate", "Wellness & Healthcare", "Real Estate", "Education", "Other"];

const solutions = [
  { icon: Hotel, title: "Hospitality", desc: "Signature scent identity from lobby to spa.", to: "/business/solutions/hospitality", tag: "Hotels & Spas" },
  { icon: ShoppingBag, title: "Retail", desc: "Lift dwell time and perceived value in-store.", to: "/business/solutions/retail", tag: "Stores & Malls" },
  { icon: Briefcase, title: "Corporate", desc: "Focus, calm, and a premium arrival experience.", to: "/business/solutions/corporate", tag: "Offices" },
  { icon: Heart, title: "Wellness", desc: "Therapeutic aromatics for care-forward spaces.", to: "/business/solutions/wellness", tag: "Healthcare" },
];

const caseStudies = [
  { company: "Luxe Hotels Group", industry: "Hospitality", metric: "+40%", metricLabel: "Guest satisfaction", quote: "Our signature fragrance became the most talked-about amenity across properties." },
  { company: "Metro Mall", industry: "Retail", metric: "+28%", metricLabel: "Avg. dwell time", quote: "Scent zoning increased engagement and lifted anchor tenant sales." },
  { company: "ZenWork Spaces", industry: "Corporate", metric: "+15%", metricLabel: "Employee satisfaction", quote: "A calibrated ambient program improved focus and mood across floors." },
];

const BusinessHome = () => {
  const { toast } = useToast();
  const [leadForm, setLeadForm] = useState({ name: "", email: "", company: "", industry: "" });
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadSubmitted(true);
    toast({ title: "We will be in touch.", description: "A scent strategist will reach out within 24 hours." });
  };

  return (
    <div className="overflow-hidden bg-background">
      <PageMeta
        title="Business Scent Marketing Solutions"
        description="Design and deploy measurable scent programs for hospitality, retail, corporate, and wellness environments."
        keywords="business scent marketing, b2b fragrance, scent strategy, ambient scent solutions"
        canonicalUrl="https://ezeaircare.com/business"
        ogType="website"
      />

      {/* ── Neo Hero Section ── */}
      <NeoHero
        label="Enterprise Scent Strategy"
        headline={
          <>
            Scent strategy that
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-navy to-accent animate-gradient-x">
              compounds ROI.
            </span>
          </>
        }
        subheadline="We design, deploy, and optimize ambient scent programs for hospitality, retail, and corporate environments worldwide."
        actions={
          <>
            <Link to="/business/contact">
              <Button size="lg" className="rounded-sm neo-btn-primary uppercase tracking-wider text-xs font-bold px-8 h-12">
                Schedule Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/business/solutions">
              <Button variant="outline" size="lg" className="rounded-sm border-primary/20 hover:bg-primary/5 uppercase tracking-wider text-xs font-bold px-8 h-12">
                View Solutions
              </Button>
            </Link>
          </>
        }
        variant="business"
        texture="oil"
      >
        {/* Right Side Visual - Architectural Card */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent opacity-20 blur-xl rounded-sm" />
          <Card className="relative bg-background/80 backdrop-blur-xl border border-primary/10 shadow-neo rounded-sm overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-8 border-b border-border/40 pb-4">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Impact Snapshot</div>
                  <div className="font-display text-2xl font-semibold text-foreground mt-1">Proof in the numbers</div>
                </div>
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: TrendingUp, value: 40, suffix: "%", label: "Dwell time lift" },
                  { icon: Target, value: 20, suffix: "%", label: "Revenue impact" },
                  { icon: Users, value: 15, suffix: "%", label: "Retention gain" },
                  { icon: Clock, value: 24, suffix: "hr", label: "Install window" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-background/50 border border-border/40 p-4 hover:border-primary/30 transition-colors duration-300">
                    <stat.icon className="w-4 h-4 text-primary mb-3" />
                    <div className="text-3xl font-display font-semibold text-foreground">
                      <DynamicCounter endValue={stat.value} duration={2000} />{stat.suffix}
                    </div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground mt-1 font-semibold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Floating Decor */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent/20 backdrop-blur-md border border-accent/30 flex items-center justify-center animate-float-slow">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">4.9</div>
              <div className="text-[8px] uppercase tracking-wider text-accent-foreground">Rating</div>
            </div>
          </div>
        </div>
      </NeoHero>

      {/* ── Trust Bar (Minimalist) ── */}
      <section className="py-12 border-b border-border/40 bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {["Luxe Hotels", "Metro Mall", "ZenWork", "Serenity Clinics", "Apex Towers"].map((name) => (
              <div key={name} className="text-sm md:text-base font-display font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solutions Grid (Architectural) ── */}
      <section className="section-shell bg-background relative">
        <div className="absolute inset-0 bg-grid-fade opacity-[0.03]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <span className="inline-block py-1 px-3 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              Our Capabilities
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">Tailored for every environment.</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Precision scenting systems that adapt to your architectural and brand requirements.</p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((sol, i) => (
              <AnimatedSection key={sol.title} animation="fadeInUp" delay={i * 100}>
                <Link to={sol.to} className="group block h-full">
                  <div className="h-full bg-background border border-border/60 hover:border-primary/40 p-8 transition-all duration-500 hover:shadow-neo hover:-translate-y-1 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="w-12 h-12 border border-border/60 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                      <sol.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>

                    <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{sol.title}</h3>
                    <Badge variant="secondary" className="bg-muted text-muted-foreground rounded-sm text-[10px] uppercase tracking-wide mb-4 px-2 py-0.5 border-none group-hover:bg-primary/10 group-hover:text-primary transition-colors">{sol.tag}</Badge>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 border-t border-border/30 pt-4">
                      {sol.desc}
                    </p>

                    <div className="flex items-center text-xs font-bold uppercase tracking-wider text-primary opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Explore
                      <ArrowRight className="w-3 h-3 ml-2" />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case Studies (Editorial Layout) ── */}
      <section className="section-shell bg-muted/20 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.4fr_1fr] gap-12 items-start">
            <div className="sticky top-24">
              <span className="text-primary font-display text-6xl font-bold opacity-10 block mb-4">Results</span>
              <h2 className="font-display text-4xl font-semibold text-foreground mb-6">Documented, measurable impact.</h2>
              <p className="text-muted-foreground mb-8">See how leading brands use scent to drive retention and revenue.</p>
              <Button variant="outline" className="rounded-sm border-primary/20 uppercase tracking-wider text-xs font-bold">
                View All Case Studies
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {caseStudies.map((cs, i) => (
                <AnimatedSection key={cs.company} animation="fadeInUp" delay={i * 150}>
                  <div className="bg-background border border-border/50 p-8 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <Badge variant="outline" className="rounded-sm text-[10px] uppercase tracking-wide border-primary/20 text-primary bg-primary/5">{cs.industry}</Badge>
                        <div className="text-right">
                          <div className="text-3xl font-display font-bold text-foreground">{cs.metric}</div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{cs.metricLabel}</div>
                        </div>
                      </div>
                      <blockquote className="font-display text-lg italic text-muted-foreground mb-6">"{cs.quote}"</blockquote>
                    </div>
                    <div className="border-t border-border/30 pt-4 mt-auto">
                      <div className="font-semibold text-foreground text-sm uppercase tracking-wide">{cs.company}</div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Engagement Model (Process) ── */}
      <section className="section-shell">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">The Partnership Model</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[1px] bg-border/40 -z-10" />

            {[
              { title: "Discovery", desc: "Audit footfall, brand goals, and space acoustics to map the scent journey.", icon: Target },
              { title: "Design", desc: "Blend custom fragrances and device placement based on zones and HVAC flow.", icon: Zap },
              { title: "Optimize", desc: "Measure impact and tune intensity for seasonal shifts and events.", icon: TrendingUp },
            ].map((step, i) => (
              <AnimatedSection key={step.title} animation="fadeInUp" delay={i * 120}>
                <div className="text-center bg-background p-6 border border-transparent hover:border-border/40 transition-colors duration-300">
                  <div className="w-24 h-24 mx-auto bg-background border border-border/40 rounded-full flex items-center justify-center mb-6 shadow-neo">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed px-4">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lead Capture (Split Layout) ── */}
      <section className="section-shell bg-muted/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-0 shadow-2xl shadow-primary/5 rounded-sm overflow-hidden border border-border/40">
            {/* Left: Content */}
            <div className="bg-primary text-primary-foreground p-10 md:p-14 flex flex-col justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-oil-texture opacity-30 mix-blend-overlay" />
               <div className="relative z-10">
                 <Calendar className="w-12 h-12 text-accent mb-6" />
                 <h2 className="font-display text-4xl font-semibold mb-4">Let's craft your signature atmosphere.</h2>
                 <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
                   Book a consultation with our scent strategists to audit your space and receive a custom proposal.
                 </p>
                 <div className="flex items-center gap-4 text-sm font-semibold uppercase tracking-wide opacity-80">
                   <CheckCircle2 className="w-4 h-4 text-accent" />
                   <span>Free Site Audit</span>
                 </div>
                 <div className="flex items-center gap-4 text-sm font-semibold uppercase tracking-wide opacity-80 mt-2">
                   <CheckCircle2 className="w-4 h-4 text-accent" />
                   <span>Custom Fragrance Samples</span>
                 </div>
               </div>
            </div>

            {/* Right: Form */}
            <div className="bg-background p-10 md:p-14">
              {leadSubmitted ? (
                <div className="text-center h-full flex flex-col items-center justify-center py-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-2">Request Received.</h3>
                  <p className="text-muted-foreground mb-8">We will be in touch shortly.</p>
                  <Link to="/business/solutions">
                    <Button variant="outline" className="uppercase tracking-wider text-xs font-bold">Explore Solutions</Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="lead-name" className="text-xs uppercase tracking-wider text-muted-foreground">Your name</Label>
                      <Input
                        id="lead-name"
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        placeholder="Jane Sharma"
                        className="rounded-sm border-border/60 focus-visible:ring-primary h-11"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lead-email" className="text-xs uppercase tracking-wider text-muted-foreground">Work email</Label>
                      <Input
                        id="lead-email"
                        type="email"
                        value={leadForm.email}
                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                        placeholder="jane@company.com"
                         className="rounded-sm border-border/60 focus-visible:ring-primary h-11"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lead-company" className="text-xs uppercase tracking-wider text-muted-foreground">Company</Label>
                    <Input
                      id="lead-company"
                      value={leadForm.company}
                      onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                      placeholder="Company Name"
                       className="rounded-sm border-border/60 focus-visible:ring-primary h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">Industry</Label>
                    <Select onValueChange={(value) => setLeadForm({ ...leadForm, industry: value })}>
                      <SelectTrigger className="rounded-sm border-border/60 focus:ring-primary h-11">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDUSTRIES.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm uppercase tracking-wider text-xs font-bold mt-2 group shadow-neo">
                    Request Proposal
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessHome;

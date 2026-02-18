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
    <div className="overflow-hidden bg-loom">
      <PageMeta
        title="Business Scent Marketing Solutions"
        description="Design and deploy measurable scent programs for hospitality, retail, corporate, and wellness environments."
        keywords="business scent marketing, b2b fragrance, scent strategy, ambient scent solutions"
        canonicalUrl="https://ezeaircare.com/business"
        ogType="website"
      />
      {/* Hero */}
      <section className="section-shell pt-32 relative bg-oil-texture">
        <div className="absolute inset-0 bg-grid-fade" />
        <div className="absolute inset-0 bg-smoke-texture opacity-75" />
        <div className="absolute inset-0 bg-sparkle-texture opacity-45" />
        <div className="absolute -top-16 left-10 w-72 h-72 rounded-full bg-accent/20 blur-3xl animate-float-slower" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float-slow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div>
              <div className="pill-label mb-6">
                <Building2 className="w-3.5 h-3.5" />
                Business Solutions
              </div>
              <AnimatedSection animation="fadeInUp">
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-foreground leading-[1.05]">
                  Scent strategy
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-glow">
                    that compounds ROI.
                  </span>
                </h1>
              </AnimatedSection>
              <AnimatedSection animation="fadeInUp" delay={150}>
                <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl">
                  We design, deploy, and optimize ambient scent programs for hospitality, retail, and corporate environments worldwide.
                </p>
              </AnimatedSection>
              <AnimatedSection animation="fadeInUp" delay={300}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/business/contact">
                    <Button variant="hero" size="lg" className="group">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule a demo
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/business/solutions">
                    <Button variant="outline" size="lg" className="group">
                      View solutions
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection animation="fadeInUp" delay={200}>
              <Card className="card-loom">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-sm uppercase tracking-widest text-muted-foreground">Impact snapshot</div>
                      <div className="font-display text-2xl font-semibold text-foreground mt-2">Proof in the numbers</div>
                    </div>
                    <ShieldCheck className="w-6 h-6 text-accent" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { icon: TrendingUp, value: 40, suffix: "%", label: "Dwell time lift" },
                      { icon: Target, value: 20, suffix: "%", label: "Revenue impact" },
                      { icon: Users, value: 15, suffix: "%", label: "Retention gain" },
                      { icon: Clock, value: 24, suffix: "hr", label: "Install window" },
                    ].map((stat) => (
                      <div key={stat.label} className="card-loom rounded-2xl p-4">
                        <stat.icon className="w-4 h-4 text-accent" />
                        <div className="mt-3 text-2xl font-semibold text-foreground">
                          <DynamicCounter endValue={stat.value} duration={2000} />{stat.suffix}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm uppercase tracking-[0.2em] text-muted-foreground/80">
            {["Luxe Hotels", "Metro Mall", "ZenWork", "Serenity Clinics"].map((name) => (
              <div key={name} className="text-center card-loom rounded-2xl py-4">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="section-shell">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-12">
            <div className="pill-label justify-center">Solutions by industry</div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mt-4">Tailored programs for every space.</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">From flagship retail to wellness clinics, we craft scent systems that align with brand identity.</p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((sol, i) => (
              <AnimatedSection key={sol.title} animation="fadeInUp" delay={i * 120}>
                <Link to={sol.to}>
                  <Card className="card-loom h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center mx-auto mb-4">
                        <sol.icon className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="font-display text-xl font-semibold text-foreground">{sol.title}</h3>
                      <Badge variant="secondary" className="text-[10px] uppercase tracking-wide mt-2">{sol.tag}</Badge>
                      <p className="text-sm text-muted-foreground mt-3">{sol.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section-shell">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-12">
            <div className="pill-label justify-center">Client results</div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mt-4">Documented, measurable impact.</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <AnimatedSection key={cs.company} animation="fadeInUp" delay={i * 120}>
                <Card className="card-loom h-full">
                  <CardContent className="p-6">
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wide">{cs.industry}</Badge>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-3xl font-semibold text-foreground">{cs.metric}</span>
                      <span className="text-sm text-muted-foreground">{cs.metricLabel}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">"{cs.quote}"</p>
                    <div className="mt-6 text-sm font-semibold text-foreground">{cs.company}</div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Model */}
      <section className="section-shell">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-12">
            <div className="pill-label justify-center">Engagement model</div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mt-4">A measured, end-to-end partnership.</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Discovery", desc: "Audit footfall, brand goals, and space acoustics to map the scent journey.", icon: Target },
              { title: "Design", desc: "Blend custom fragrances and device placement based on zones and HVAC flow.", icon: Zap },
              { title: "Optimize", desc: "Measure impact and tune intensity for seasonal shifts and events.", icon: TrendingUp },
            ].map((step, i) => (
              <AnimatedSection key={step.title} animation="fadeInUp" delay={i * 120}>
                <Card className="card-loom h-full">
                  <CardContent className="p-6">
                    <step.icon className="w-6 h-6 text-accent" />
                    <h3 className="font-display text-xl font-semibold text-foreground mt-4">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mt-3">{step.desc}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture */}
      <section className="section-shell">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp">
            <Card className="card-loom">
              <CardContent className="p-8 sm:p-10">
                {leadSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-14 h-14 text-accent mx-auto mb-4" />
                    <h3 className="font-display text-2xl font-semibold text-foreground mb-2">Thank you.</h3>
                    <p className="text-muted-foreground mb-6">We will reach out with a tailored proposal.</p>
                    <Link to="/business/solutions">
                      <Button variant="hero">Explore solutions</Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-8">
                      <Calendar className="w-10 h-10 text-accent mx-auto mb-3" />
                      <h3 className="font-display text-2xl font-semibold text-foreground mb-2">Book a consultation</h3>
                      <p className="text-sm text-muted-foreground">
                        Tell us about your space and we will design a custom scent strategy.
                      </p>
                    </div>

                    <form onSubmit={handleLeadSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="lead-name">Your name</Label>
                          <Input
                            id="lead-name"
                            value={leadForm.name}
                            onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                            placeholder="Jane Sharma"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lead-email">Work email</Label>
                          <Input
                            id="lead-email"
                            type="email"
                            value={leadForm.email}
                            onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                            placeholder="jane@company.com"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="lead-company">Company</Label>
                          <Input
                            id="lead-company"
                            value={leadForm.company}
                            onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                            placeholder="EZE Hospitality"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Industry</Label>
                          <Select onValueChange={(value) => setLeadForm({ ...leadForm, industry: value })}>
                            <SelectTrigger>
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
                      </div>
                      <Button type="submit" variant="hero" className="w-full group">
                        Request proposal
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </form>
                  </>
                )}
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default BusinessHome;
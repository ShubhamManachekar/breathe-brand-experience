import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Building2, Store, Briefcase, Heart, ArrowRight, Zap, Sparkles } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import AnimatedSection from "@/components/AnimatedSection";
import NeoHero from "@/components/NeoHero";

const Solutions = () => {
  const solutions = [
    {
      id: "hospitality",
      title: "Hospitality & Hotels",
      description: "Create signature guest experiences that build loyalty and premium perception.",
      icon: Building2,
      metrics: "+35% Guest Satisfaction",
      highlights: ["Lobby scent identity", "Spa & wellness integration", "Room experience tuning"],
    },
    {
      id: "retail",
      title: "Retail & Shopping",
      description: "Boost dwell time and purchase intent with immersive scent journeys.",
      icon: Store,
      metrics: "+23% Dwell Time",
      highlights: ["Zone-specific fragrance", "Seasonal programs", "POS activation"],
    },
    {
      id: "corporate",
      title: "Corporate & Offices",
      description: "Enhance focus, reduce stress, and impress clients with refined atmospheres.",
      icon: Briefcase,
      metrics: "+14% Task Accuracy",
      highlights: ["Reception impact", "Meeting room focus", "HVAC integration"],
    },
    {
      id: "wellness",
      title: "Wellness & Healthcare",
      description: "Therapeutic aromatics designed for calm, healing, and care-forward environments.",
      icon: Heart,
      metrics: "40% Anxiety Reduction",
      highlights: ["Waiting room calm", "Treatment room support", "Natural formulations"],
    },
  ];

  const process = [
    {
      step: "1",
      title: "Discovery",
      description: "Audit space, brand goals, and visitor behavior to map scent touchpoints.",
    },
    {
      step: "2",
      title: "Design",
      description: "Select or craft signature blends aligned with brand identity and outcomes.",
    },
    {
      step: "3",
      title: "Deploy",
      description: "Install diffusion systems with minimal disruption and precise tuning.",
    },
    {
      step: "4",
      title: "Optimize",
      description: "Monitor performance and adjust intensity to seasonal or campaign shifts.",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <PageMeta
        title="Industry Solutions - Scent Marketing for Every Business"
        description="Tailored scent marketing solutions for hospitality, retail, corporate, and wellness industries."
        keywords="scent marketing solutions, hotel scenting, retail fragrance, corporate aromatherapy, wellness scenting"
        ogType="website"
      />

      <NeoHero
        label="Industry Solutions"
        headline={
          <>
            Strategies for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-navy to-accent animate-gradient-x">
              every environment.
            </span>
          </>
        }
        subheadline="We help brands translate scent into measurable business impact across hospitality, retail, corporate, and wellness."
        actions={
          <Link to="/business/contact">
            <Button size="lg" className="rounded-sm neo-btn-primary uppercase tracking-wider text-xs font-bold px-8 h-12">
              Book Strategy Call
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        }
        variant="business"
        texture="smoke"
      >
        {/* Abstract 3D shape or minimalist graphic for solutions index */}
        <div className="relative w-full h-[400px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl animate-pulse-gold" />
            <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="w-32 h-40 bg-background/80 backdrop-blur-xl border border-primary/20 rounded-sm shadow-neo animate-float-slow flex items-center justify-center">
                    <Building2 className="w-10 h-10 text-primary opacity-80" />
                </div>
                <div className="w-32 h-40 bg-background/80 backdrop-blur-xl border border-accent/20 rounded-sm shadow-neo animate-float-slower mt-12 flex items-center justify-center">
                    <Store className="w-10 h-10 text-accent opacity-80" />
                </div>
            </div>
        </div>
      </NeoHero>

      <section className="section-shell relative">
        <div className="absolute inset-0 bg-grid-fade opacity-[0.03]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <AnimatedSection key={solution.id} animation="fadeInUp" delay={index * 120}>
                <div className="group h-full bg-background border border-border/60 p-8 hover:border-primary/40 transition-all duration-300 hover:shadow-neo relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                   <div className="flex items-start justify-between mb-6">
                      <div>
                        <Badge variant="outline" className="rounded-sm text-[10px] uppercase tracking-wide border-primary/20 text-primary bg-primary/5 mb-3">{solution.metrics}</Badge>
                        <h3 className="font-display text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">{solution.title}</h3>
                      </div>
                      <div className="w-10 h-10 rounded-sm bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                        <solution.icon className="w-5 h-5" />
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{solution.description}</p>

                    <div className="space-y-3 mb-8">
                      {solution.highlights.map((item) => (
                        <div key={item} className="flex items-center gap-3 text-xs font-medium text-muted-foreground/80">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          {item}
                        </div>
                      ))}
                    </div>

                    <Link to={`/business/solutions/${solution.id}`}>
                      <Button className="w-full rounded-sm border-primary/20 hover:bg-primary/5 hover:border-primary transition-all uppercase tracking-wider text-[10px] font-bold h-10" variant="outline">
                        Explore {solution.title.split(' ')[0]}
                        <ArrowRight className="w-3 h-3 ml-2" />
                      </Button>
                    </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-muted/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block">Methodology</span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground">From discovery to optimization.</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Horizontal Line for Desktop */}
            <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-[1px] bg-border/40 -z-10" />

            {process.map((step, index) => (
              <AnimatedSection key={step.step} animation="fadeInUp" delay={index * 120}>
                <div className="text-center bg-background p-6 border border-transparent hover:border-border/40 transition-colors duration-300">
                   <div className="w-16 h-16 mx-auto bg-background border border-primary/20 text-primary font-display font-bold text-xl flex items-center justify-center mb-6 shadow-sm z-10 relative">
                     {step.step}
                   </div>
                   <h3 className="font-display text-lg font-semibold text-foreground mb-3">{step.title}</h3>
                   <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between bg-primary text-primary-foreground p-10 md:p-14 rounded-sm shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-loom opacity-20 mix-blend-overlay" />
            <div className="relative z-10 max-w-2xl">
              <h3 className="font-display text-3xl md:text-4xl font-semibold mb-4">Ready to build your scent strategy?</h3>
              <p className="text-primary-foreground/80 text-lg">Book a consultation and receive a tailored plan for your space.</p>
            </div>
            <div className="relative z-10 mt-8 md:mt-0">
              <Link to="/business/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-sm px-8 h-12 uppercase tracking-wider text-xs font-bold">
                  Request Demo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;

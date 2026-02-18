import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Building2, Store, Briefcase, Heart, ArrowRight, Zap, Sparkles } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import AnimatedSection from "@/components/AnimatedSection";

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
    <div className="min-h-screen bg-loom overflow-hidden">
      <PageMeta
        title="Industry Solutions - Scent Marketing for Every Business"
        description="Tailored scent marketing solutions for hospitality, retail, corporate, and wellness industries."
        keywords="scent marketing solutions, hotel scenting, retail fragrance, corporate aromatherapy, wellness scenting"
        ogType="website"
      />

      {/* Hero */}
      <section className="section-shell pt-28 relative bg-oil-texture">
        <div className="absolute inset-0 bg-grid-fade" />
        <div className="absolute inset-0 bg-smoke-texture opacity-75" />
        <div className="absolute inset-0 bg-sparkle-texture opacity-45" />
        <div className="absolute -top-10 right-12 w-64 h-64 rounded-full bg-accent/15 blur-3xl animate-float-slower" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="pill-label justify-center mb-6">Business solutions</div>
          <AnimatedSection animation="fadeInUp">
            <h1 className="font-display text-5xl md:text-6xl font-semibold text-foreground">
              Scent strategies for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-glow">
                every industry.
              </span>
            </h1>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={150}>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-6">
              We help brands translate scent into measurable business impact across hospitality, retail, corporate, and wellness.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="section-shell">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solutions.map((solution, index) => (
              <AnimatedSection key={solution.id} animation="fadeInUp" delay={index * 120}>
                <Card className="card-loom h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="pill-label mb-4">{solution.metrics}</div>
                        <h3 className="font-display text-2xl font-semibold text-foreground">{solution.title}</h3>
                        <p className="text-sm text-muted-foreground mt-3">{solution.description}</p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center">
                        <solution.icon className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                    <div className="mt-5 space-y-2">
                      {solution.highlights.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Sparkles className="w-3.5 h-3.5 text-accent" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <Link to={`/business/solutions/${solution.id}`}>
                      <Button className="mt-6 w-full" variant="outline">
                        Learn more
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-shell">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-12">
            <div className="pill-label justify-center">Our process</div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mt-4">From discovery to optimization.</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <AnimatedSection key={step.step} animation="fadeInUp" delay={index * 120}>
                <Card className="card-loom h-full">
                  <CardContent className="p-6">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Step {step.step}</div>
                    <h3 className="font-display text-xl font-semibold text-foreground mt-3">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mt-3">{step.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-shell">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="surface-glass rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div className="pill-label mb-4">Get started</div>
              <h3 className="font-display text-3xl md:text-4xl font-semibold text-foreground">Ready to build your scent strategy?</h3>
              <p className="text-muted-foreground mt-3 max-w-xl">Book a consultation and receive a tailored plan for your space.</p>
            </div>
            <Link to="/business/contact">
              <Button variant="hero" size="lg" className="group">
                Request a demo
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
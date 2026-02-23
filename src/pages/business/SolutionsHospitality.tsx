import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { Building2, Star, TrendingUp, ArrowRight, Award, Target, Sparkles } from "lucide-react";
import PageMeta, { createBreadcrumbSchema } from "@/components/PageMeta";
import NeoHero from "@/components/NeoHero";

const SolutionsHospitality = () => {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://ezeaircare.com" },
    { name: "Solutions", url: "https://ezeaircare.com/solutions" },
    { name: "Hospitality", url: "https://ezeaircare.com/solutions/hospitality" },
  ]);

  const caseStudies = [
    {
      hotel: "Shangri-La Hotels Asia",
      result: "+42% Brand Recall",
      description: "Signature White Tea scent increased loyalty and premium bookings.",
    },
    {
      hotel: "Marriott Premium Collection",
      result: "+35% Guest Satisfaction",
      description: "Lobby and room scents lifted review scores and rebooking rates.",
    },
    {
      hotel: "Boutique Resort Network",
      result: "+45% Rebooking Rate",
      description: "Destination scents created emotional connections and referrals.",
    },
  ];

  const benefits = [
    { title: "Emotional Connection", value: "70%", desc: "Signature scents deepen brand memory." },
    { title: "Luxury Perception", value: "25%", desc: "Premium aromatics elevate positioning." },
    { title: "Guest Comfort", value: "35%", desc: "Welcoming scents reduce travel stress." },
    { title: "Differentiation", value: "42%", desc: "Stand out from competitors." },
  ];

  const steps = [
    { step: "1", title: "Brand Scent Design", desc: "Create signature scents aligned with your identity." },
    { step: "2", title: "Journey Mapping", desc: "Plan scent touchpoints from lobby to suites." },
    { step: "3", title: "Installation", desc: "Hotel-grade diffusion systems tuned for consistency." },
    { step: "4", title: "Optimization", desc: "Monitor satisfaction and refine the program." },
  ];

  return (
    <div className="min-h-screen bg-transparent overflow-hidden">
      <PageMeta
        title="Hotel & Hospitality Scent Marketing Solutions"
        description="Create unforgettable guest experiences with signature hotel scents. Trusted by luxury hospitality brands."
        keywords="hotel scent marketing, hospitality aromatherapy, signature hotel scent"
        ogType="article"
        structuredData={breadcrumbSchema}
      />

      <NeoHero
        heroImage="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80&auto=format"
        label="Hospitality"
        headline={<>Hospitality scenting <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-shimmer bg-[length:200%_auto]">that guests remember.</span></>}
        subheadline="Create signature arrival moments, calming spa environments, and room experiences that drive loyalty."
        variant="business"
        texture="oil"
      />

      <section className="section-shell">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={benefit.title} animation="fadeInUp" delay={index * 120}>
                <Card className="card-loom h-full text-center">
                  <CardContent className="p-6">
                    <Star className="w-6 h-6 text-accent mx-auto" />
                    <div className="text-3xl font-semibold text-foreground mt-4">{benefit.value}</div>
                    <h3 className="font-display text-lg font-semibold mt-3">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{benefit.desc}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-10">
            <div className="pill-label justify-center">Case studies</div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mt-4">Luxury brands trust EZE AirCare.</h2>
          </AnimatedSection>
          <div className="grid lg:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <AnimatedSection key={study.hotel} animation="fadeInUp" delay={index * 120}>
                <Card className="card-loom h-full">
                  <CardContent className="p-6">
                    <Badge variant="secondary">Hospitality</Badge>
                    <h3 className="font-display text-xl font-semibold mt-4">{study.hotel}</h3>
                    <div className="text-2xl font-semibold text-foreground mt-3">{study.result}</div>
                    <p className="text-sm text-muted-foreground mt-3">{study.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-10">
            <div className="pill-label justify-center">Implementation</div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mt-4">Designed for luxury operations.</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <AnimatedSection key={step.step} animation="fadeInUp" delay={index * 120}>
                <Card className="card-loom h-full">
                  <CardContent className="p-6">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Step {step.step}</div>
                    <h3 className="font-display text-lg font-semibold mt-3">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mt-3">{step.desc}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="surface-glass rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div className="pill-label mb-4">Hospitality consulting</div>
              <h3 className="font-display text-3xl md:text-4xl font-semibold text-foreground">Ready to craft your signature scent?</h3>
              <p className="text-muted-foreground mt-3 max-w-xl">Book a consultation and receive a tailored program.</p>
            </div>
            <Link to="/business/contact">
              <Button variant="hero" size="lg" className="group">
                Request a proposal
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsHospitality;
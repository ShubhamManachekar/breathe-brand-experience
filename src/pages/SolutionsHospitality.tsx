import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { Star, ArrowRight, Sparkles, CheckCircle2, BedDouble } from "lucide-react";
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

  const heroImageSrcSet = "/optimized/hero-scent-diffuser-640.webp 640w, /optimized/hero-scent-diffuser-960.webp 960w, /optimized/hero-scent-diffuser-1280.webp 1280w";


  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <PageMeta
        title="Hotel & Hospitality Scent Marketing Solutions"
        description="Create unforgettable guest experiences with signature hotel scents. Trusted by luxury hospitality brands."
        keywords="hotel scent marketing, hospitality aromatherapy, signature hotel scent"
        ogType="article"
        structuredData={breadcrumbSchema}
      />

      <NeoHero
        label="Hospitality Solutions"
        headline={
          <>
            Atmospheres that
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-navy to-accent animate-gradient-x">
              guests remember.
            </span>
          </>
        }
        subheadline="Create signature arrival moments, calming spa environments, and room experiences that drive loyalty and revenue."
        actions={
          <Link to="/business/contact">
            <Button size="lg" className="rounded-sm neo-btn-primary uppercase tracking-wider text-xs font-bold px-8 h-12">
              Request Hotel Plan
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        }
        variant="business"
        texture="loom"
      >
        <div className="relative z-10 rounded-sm overflow-hidden shadow-2xl shadow-primary/20 border border-primary/10">
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10" />
            <img
                src="/optimized/hero-scent-diffuser-1280.webp"
                srcSet={heroImageSrcSet}
                alt="Premium Hotel Diffuser"
                className="w-full h-auto object-cover scale-105 hover:scale-100 transition-transform duration-1000 ease-out"
            />
            {/* Architectural Overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-background/90 backdrop-blur-xl p-6 border-l-4 border-primary shadow-lg">
                <div className="flex items-center gap-3 text-primary text-sm font-bold uppercase tracking-widest mb-2">
                    <BedDouble className="w-4 h-4" />
                    <span>Lobby & Suites</span>
                </div>
                <p className="text-sm text-muted-foreground">
                    "Scent is the strongest trigger of memory. We make your guests remember their stay forever."
                </p>
            </div>
        </div>
      </NeoHero>

      <section className="section-shell bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={benefit.title} animation="fadeInUp" delay={index * 120}>
                <div className="h-full bg-background border border-border/50 p-6 hover:border-primary/40 transition-all duration-300 group">
                  <Star className="w-6 h-6 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-4xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{benefit.value}</div>
                  <h3 className="font-semibold uppercase tracking-wide text-xs text-muted-foreground mb-3">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground/80 leading-relaxed border-t border-border/30 pt-3">{benefit.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] border border-primary/20 px-3 py-1 mb-4 inline-block">Trusted Partners</span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mt-4">Luxury brands trust EZE AirCare.</h2>
          </AnimatedSection>
          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <AnimatedSection key={study.hotel} animation="fadeInUp" delay={index * 120}>
                <div className="h-full bg-background p-8 border border-border/60 hover:shadow-neo transition-shadow duration-300 relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1 h-full bg-primary/20" />
                   <Badge variant="secondary" className="mb-6 rounded-sm text-[10px] uppercase tracking-wide bg-primary/5 text-primary border-none">Hospitality</Badge>
                   <h3 className="font-display text-xl font-bold mb-2">{study.hotel}</h3>
                   <div className="text-2xl font-semibold text-primary mb-4">{study.result}</div>
                   <p className="text-sm text-muted-foreground leading-relaxed">"{study.description}"</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-background relative">
        <div className="absolute inset-0 bg-grid-fade opacity-[0.03]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground">Designed for luxury operations.</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <AnimatedSection key={step.step} animation="fadeInUp" delay={index * 120}>
                <Card className="bg-background/60 backdrop-blur-sm border border-border/50 h-full hover:-translate-y-1 transition-transform duration-300">
                  <CardContent className="p-8">
                    <div className="w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center text-xs font-bold text-primary mb-6">
                        {step.step}
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-3">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-primary text-primary-foreground p-12 md:p-20 text-center overflow-hidden rounded-sm shadow-2xl shadow-primary/20">
            <div className="absolute inset-0 bg-oil-texture opacity-20 mix-blend-overlay" />
            <div className="relative z-10">
              <Sparkles className="w-12 h-12 text-accent mx-auto mb-6" />
              <h3 className="font-display text-3xl md:text-5xl font-semibold mb-6">Ready to define your signature scent?</h3>
              <p className="text-primary-foreground/80 max-w-xl mx-auto mb-10 text-lg">
                Book a consultation and receive a tailored fragrance strategy for your property.
              </p>
              <Link to="/business/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-sm px-10 h-14 uppercase tracking-wider text-xs font-bold">
                  Request Hotel Proposal
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

export default SolutionsHospitality;

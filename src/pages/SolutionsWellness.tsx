import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { Heart, Shield, TrendingUp, ArrowRight } from "lucide-react";
import PageMeta, { createBreadcrumbSchema } from "@/components/PageMeta";

const SolutionsWellness = () => {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://ezeaircare.com" },
    { name: "Solutions", url: "https://ezeaircare.com/solutions" },
    { name: "Wellness", url: "https://ezeaircare.com/solutions/wellness" },
  ]);

  const metrics = [
    { icon: Shield, value: "-45%", label: "Patient anxiety" },
    { icon: Heart, value: "+35%", label: "Satisfaction" },
    { icon: TrendingUp, value: "+28%", label: "Treatment outcomes" },
  ];

  const caseStudies = [
    { facility: "Mayo Clinic Wellness Center", result: "-45% Anxiety", description: "Lavender-eucalyptus blend reduced pre-treatment stress." },
    { facility: "Spa Retreat Network", result: "+52% Retention", description: "Custom aromatherapy boosted repeat bookings." },
    { facility: "Senior Care Facilities", result: "+30% Engagement", description: "Memory-stimulating scents improved social interaction." },
  ];

  return (
    <div className="min-h-screen bg-loom overflow-hidden">
      <PageMeta
        title="Wellness & Healthcare Aromatherapy Solutions"
        description="Improve patient outcomes with therapeutic aromatherapy. Trusted by clinics, spas, and wellness providers."
        keywords="healthcare aromatherapy, wellness scent solutions, spa fragrance"
        ogType="article"
        structuredData={breadcrumbSchema}
      />

      <section className="section-shell pt-28 relative bg-oil-texture">
        <div className="absolute inset-0 bg-grid-fade" />
        <div className="absolute inset-0 bg-smoke-texture opacity-75" />
        <div className="absolute inset-0 bg-sparkle-texture opacity-45" />
        <div className="absolute -top-10 right-12 w-64 h-64 rounded-full bg-accent/15 blur-3xl animate-float-slower" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="pill-label justify-center mb-6">Wellness</div>
          <AnimatedSection animation="fadeInUp">
            <h1 className="font-display text-5xl md:text-6xl font-semibold text-foreground">
              Therapeutic scenting
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-glow">
                for healing spaces.
              </span>
            </h1>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={150}>
            <p className="text-lg text-muted-foreground mt-6 max-w-3xl mx-auto">
              Reduce anxiety and create calm environments with clinically informed aromatherapy.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-shell">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {metrics.map((metric, index) => (
              <AnimatedSection key={metric.label} animation="fadeInUp" delay={index * 120}>
                <Card className="card-loom text-center">
                  <CardContent className="p-6">
                    <metric.icon className="w-6 h-6 text-accent mx-auto" />
                    <div className="text-3xl font-semibold text-foreground mt-4">{metric.value}</div>
                    <div className="text-sm text-muted-foreground mt-2">{metric.label}</div>
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
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mt-4">Healing environments transformed.</h2>
          </AnimatedSection>
          <div className="grid lg:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <AnimatedSection key={study.facility} animation="fadeInUp" delay={index * 120}>
                <Card className="card-loom h-full">
                  <CardContent className="p-6">
                    <Badge variant="secondary">Wellness</Badge>
                    <h3 className="font-display text-xl font-semibold mt-4">{study.facility}</h3>
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
          <div className="surface-glass rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div className="pill-label mb-4">Clinical programs</div>
              <h3 className="font-display text-3xl md:text-4xl font-semibold text-foreground">Ready to calm and restore?</h3>
              <p className="text-muted-foreground mt-3 max-w-xl">Design a therapeutic scent program with our experts.</p>
            </div>
            <Link to="/business/contact">
              <Button variant="hero" size="lg" className="group">
                Request a wellness plan
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsWellness;
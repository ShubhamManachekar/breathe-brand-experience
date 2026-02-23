import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { Briefcase, Brain, Users, TrendingUp, ArrowRight } from "lucide-react";
import PageMeta, { createBreadcrumbSchema } from "@/components/PageMeta";
import NeoHero from "@/components/NeoHero";

const SolutionsCorporate = () => {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://ezeaircare.com" },
    { name: "Solutions", url: "https://ezeaircare.com/solutions" },
    { name: "Corporate", url: "https://ezeaircare.com/solutions/corporate" },
  ]);

  const metrics = [
    { icon: Brain, value: "+22%", label: "Productivity" },
    { icon: Users, value: "+25%", label: "Employee satisfaction" },
    { icon: TrendingUp, value: "+30%", label: "Client impression" },
  ];

  const caseStudies = [
    { company: "Google Workspace India", result: "+22% Productivity", description: "Citrus-mint blend improved focus and performance." },
    { company: "Deloitte Offices", result: "+30% Client Impression", description: "Woody scent enhanced professional atmosphere." },
    { company: "Microsoft Technology Center", result: "+25% Wellness", description: "Aromatherapy reduced stress and fatigue." },
  ];

  return (
    <div className="min-h-screen bg-transparent overflow-hidden">
      <PageMeta
        title="Corporate Office Scent Marketing Solutions"
        description="Boost workplace productivity with office scent solutions. Trusted by leading global companies."
        keywords="office scent marketing, corporate aromatherapy, workplace productivity scent"
        ogType="article"
        structuredData={breadcrumbSchema}
      />

      <NeoHero
        heroImage="https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1920&q=80&auto=format"
        label="Corporate"
        headline={<>Workplace scenting <span className="block text-gradient-animated">that sharpens focus.</span></>}
        subheadline="Create environments that boost productivity, reduce stress, and impress clients."
        variant="business"
        texture="oil"
      />

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
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mt-4">Corporate teams trust EZE AirCare.</h2>
          </AnimatedSection>
          <div className="grid lg:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <AnimatedSection key={study.company} animation="fadeInUp" delay={index * 120}>
                <Card className="card-loom h-full">
                  <CardContent className="p-6">
                    <Badge variant="secondary">Corporate</Badge>
                    <h3 className="font-display text-xl font-semibold mt-4">{study.company}</h3>
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
              <div className="pill-label mb-4">Corporate strategy</div>
              <h3 className="font-display text-3xl md:text-4xl font-semibold text-foreground">Ready to elevate your workplace?</h3>
              <p className="text-muted-foreground mt-3 max-w-xl">Design a scent program aligned with productivity and culture.</p>
            </div>
            <Link to="/business/contact">
              <Button variant="hero" size="lg" className="group">
                Request a corporate plan
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsCorporate;
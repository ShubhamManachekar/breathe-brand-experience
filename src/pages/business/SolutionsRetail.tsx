import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { Store, ShoppingCart, Eye, TrendingUp, ArrowRight, Award } from "lucide-react";
import PageMeta, { createBreadcrumbSchema } from "@/components/PageMeta";

const SolutionsRetail = () => {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://ezeaircare.com" },
    { name: "Solutions", url: "https://ezeaircare.com/solutions" },
    { name: "Retail", url: "https://ezeaircare.com/solutions/retail" },
  ]);

  const caseStudies = [
    { brand: "Nike Tokyo Flagship", result: "+23% Dwell Time", description: "Custom citrus blend increased engagement and exploration." },
    { brand: "Zara Global Stores", result: "+28% Purchase Intent", description: "Signature vanilla-cedar scent boosted conversion." },
    { brand: "Apple Store Premium", result: "+15% Perceived Value", description: "Clean tech scent elevated product perception." },
  ];

  const metrics = [
    { icon: Eye, value: "+23%", label: "Dwell time" },
    { icon: ShoppingCart, value: "+28%", label: "Purchase intent" },
    { icon: TrendingUp, value: "+18%", label: "Revenue lift" },
  ];

  return (
    <div className="min-h-screen bg-loom overflow-hidden">
      <PageMeta
        title="Retail Store Scent Marketing Solutions"
        description="Boost retail sales with strategic scent marketing. Trusted by leading retailers worldwide."
        keywords="retail scent marketing, store fragrance, shopping atmosphere scent"
        ogType="article"
        structuredData={breadcrumbSchema}
      />

      <section className="section-shell pt-28 relative bg-oil-texture">
        <div className="absolute inset-0 bg-grid-fade" />
        <div className="absolute inset-0 bg-smoke-texture opacity-75" />
        <div className="absolute inset-0 bg-sparkle-texture opacity-45" />
        <div className="absolute -top-10 right-12 w-64 h-64 rounded-full bg-accent/15 blur-3xl animate-float-slower" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="pill-label justify-center mb-6">Retail</div>
          <AnimatedSection animation="fadeInUp">
            <h1 className="font-display text-5xl md:text-6xl font-semibold text-foreground">
              Retail scenting that
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-glow">
                drives conversion.
              </span>
            </h1>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={150}>
            <p className="text-lg text-muted-foreground mt-6 max-w-3xl mx-auto">
              Increase dwell time and purchase intent with scent journeys designed for modern retail.
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
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mt-4">Results from leading retailers.</h2>
          </AnimatedSection>
          <div className="grid lg:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <AnimatedSection key={study.brand} animation="fadeInUp" delay={index * 120}>
                <Card className="card-loom h-full">
                  <CardContent className="p-6">
                    <Badge variant="secondary">Retail</Badge>
                    <h3 className="font-display text-xl font-semibold mt-4">{study.brand}</h3>
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
              <div className="pill-label mb-4">Retail strategy</div>
              <h3 className="font-display text-3xl md:text-4xl font-semibold text-foreground">Ready to elevate your store experience?</h3>
              <p className="text-muted-foreground mt-3 max-w-xl">Build a scent program that amplifies sales and loyalty.</p>
            </div>
            <Link to="/business/contact">
              <Button variant="hero" size="lg" className="group">
                Request a retail plan
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsRetail;
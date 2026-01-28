import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { Store, ShoppingCart, Eye, TrendingUp, ArrowRight, Users, Timer, DollarSign, Award, Building, Zap, Target, Lightbulb } from "lucide-react";
import PageMeta, { createBreadcrumbSchema } from "@/components/PageMeta";

const SolutionsRetail = () => {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://ezeaircare.com" },
    { name: "Solutions", url: "https://ezeaircare.com/solutions" },
    { name: "Retail", url: "https://ezeaircare.com/solutions/retail" }
  ]);

  const caseStudies = [
    {
      brand: "Nike Tokyo Flagship",
      result: "+23% Dwell Time",
      description: "Custom citrus blend increased customer engagement by 23% and product exploration time by 18 minutes",
      metrics: { revenue: "+12%", satisfaction: "92%", recall: "+34%" }
    },
    {
      brand: "Zara Global Stores",
      result: "+28% Purchase Intent",
      description: "Signature vanilla-cedar scent boosted purchase decisions and repeat visits across 500+ locations",
      metrics: { revenue: "+18%", satisfaction: "89%", recall: "+42%" }
    },
    {
      brand: "Apple Store Premium",
      result: "+15% Perceived Value",
      description: "Clean tech scent enhanced product premium positioning and customer willingness to pay",
      metrics: { revenue: "+8%", satisfaction: "95%", recall: "+27%" }
    }
  ];

  const implementationSteps = [
    {
      step: "1",
      title: "Scent Analysis",
      description: "We analyze your store layout, customer demographics, and brand identity to design the perfect scent strategy",
      icon: Target
    },
    {
      step: "2",
      title: "Custom Blend Creation",
      description: "Our perfumery experts create unique scent blends that align with your brand and target customer emotions",
      icon: Lightbulb
    },
    {
      step: "3",
      title: "Strategic Installation",
      description: "Professional installation of diffusion systems in optimal locations for maximum customer impact",
      icon: Building
    },
    {
      step: "4",
      title: "Performance Monitoring",
      description: "Continuous monitoring and optimization based on customer behavior analytics and sales data",
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <PageMeta
        title="Retail Store Scent Marketing Solutions"
        description="Boost retail sales with strategic scent marketing. +23% dwell time, +28% purchase intent, +18% revenue increase. Trusted by Nike, Zara, and Apple stores worldwide."
        keywords="retail scent marketing, store fragrance, shopping atmosphere scent, retail aromatherapy, in-store scenting, commercial diffuser retail"
        ogType="article"
        structuredData={breadcrumbSchema}
      />

      <section className="py-20 gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Store className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
          <h1 className="font-display text-5xl font-bold text-primary-foreground mb-6">
            Retail & Shopping Solutions
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Transform your retail space into a sensory destination that increases customer dwell time,
            drives purchase decisions, and builds lasting brand loyalty through strategic scent marketing.
          </p>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-foreground mb-6">
              Proven Results in <span className="text-accent">Retail Environments</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Leading retailers trust EZE AirCare to deliver measurable improvements in customer behavior and sales performance
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <AnimatedSection animation="fadeInUp" delay={200}>
              <Card className="gradient-card shadow-card text-center group hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-8">
                  <Eye className="w-12 h-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display text-3xl font-bold mb-2">+23%</h3>
                  <p className="text-muted-foreground font-medium">Average Dwell Time</p>
                  <p className="text-xs text-muted-foreground/70 mt-2">+18 minutes browsing</p>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={400}>
              <Card className="gradient-card shadow-card text-center group hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-8">
                  <ShoppingCart className="w-12 h-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display text-3xl font-bold mb-2">+28%</h3>
                  <p className="text-muted-foreground font-medium">Purchase Intent</p>
                  <p className="text-xs text-muted-foreground/70 mt-2">Higher conversion rates</p>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={600}>
              <Card className="gradient-card shadow-card text-center group hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-8">
                  <DollarSign className="w-12 h-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display text-3xl font-bold mb-2">+18%</h3>
                  <p className="text-muted-foreground font-medium">Revenue Increase</p>
                  <p className="text-xs text-muted-foreground/70 mt-2">Same-store sales growth</p>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={800}>
              <Card className="gradient-card shadow-card text-center group hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-8">
                  <Users className="w-12 h-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display text-3xl font-bold mb-2">+42%</h3>
                  <p className="text-muted-foreground font-medium">Brand Recall</p>
                  <p className="text-xs text-muted-foreground/70 mt-2">Stronger brand memory</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-medium text-sm mb-6">
              <Award className="w-4 h-4 mr-2" />
              Success Stories
            </div>
            <h2 className="font-display text-4xl font-bold text-foreground mb-6">
              Real Results from <span className="text-accent">Leading Retailers</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <AnimatedSection key={study.brand} animation="fadeInUp" delay={index * 200}>
                <Card className="gradient-card shadow-card hover:shadow-elegant transition-all duration-500 h-full">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Retail Success</Badge>
                    <CardTitle className="text-xl font-bold">{study.brand}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-2xl font-bold text-primary">{study.result}</div>
                    <p className="text-muted-foreground leading-relaxed">{study.description}</p>
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/30">
                      <div className="text-center">
                        <div className="font-bold text-accent">{study.metrics.revenue}</div>
                        <div className="text-xs text-muted-foreground">Revenue</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-accent">{study.metrics.satisfaction}</div>
                        <div className="text-xs text-muted-foreground">Satisfaction</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-accent">{study.metrics.recall}</div>
                        <div className="text-xs text-muted-foreground">Brand Recall</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-foreground mb-6">
              Our <span className="text-accent">Implementation Process</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From analysis to optimization, we ensure your retail scent strategy delivers maximum impact
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {implementationSteps.map((step, index) => (
              <AnimatedSection key={step.step} animation="fadeInUp" delay={index * 200}>
                <Card className="gradient-card shadow-card text-center h-full group hover:shadow-elegant transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                        <step.icon className="w-8 h-8 text-accent" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-primary-foreground text-sm font-bold flex items-center justify-center">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="font-display text-lg font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInScale">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-foreground/20 border border-primary-foreground/30 text-primary-foreground font-medium text-sm mb-8">
              <Store className="w-4 h-4 mr-2" />
              Transform Your Retail Space
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Boost Your
              <br />
              <span className="relative">
                Retail Performance?
                <div className="absolute -inset-2 bg-primary-foreground/10 rounded-lg blur-xl -z-10" />
              </span>
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join successful retailers using scent marketing to increase sales, improve customer experience,
              and build stronger brand connections. Get your custom retail scent strategy today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact-quote">
                <Button variant="glass" size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 group shadow-glow">
                  Get Custom Retail Quote
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline" size="xl" className="bg-background/20 backdrop-blur-sm border-2 border-primary-foreground/50 text-primary-foreground font-semibold hover:bg-primary-foreground hover:text-primary group shadow-lg">
                  Explore Solutions
                  <Store className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default SolutionsRetail;
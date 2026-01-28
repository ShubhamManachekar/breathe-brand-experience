import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { Building2, Users, Star, TrendingUp, ArrowRight, Timer, DollarSign, Award, Building, Zap, Target, Lightbulb, Coffee, Sparkles } from "lucide-react";
import PageMeta, { createBreadcrumbSchema } from "@/components/PageMeta";

const SolutionsHospitality = () => {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://ezeaircare.com" },
    { name: "Solutions", url: "https://ezeaircare.com/solutions" },
    { name: "Hospitality", url: "https://ezeaircare.com/solutions/hospitality" }
  ]);

  const caseStudies = [
    {
      hotel: "Shangri-La Hotels Asia",
      result: "+42% Brand Recall",
      description: "Signature White Tea scent became synonymous with luxury, increasing guest loyalty and premium bookings",
      metrics: { satisfaction: "96%", recall: "+42%", rebooking: "+28%" }
    },
    {
      hotel: "Marriott Premium Collection",
      result: "+35% Guest Satisfaction",
      description: "Custom lobby and room scents enhanced guest experiences and increased positive reviews by 40%",
      metrics: { satisfaction: "+35%", recall: "+38%", rebooking: "+32%" }
    },
    {
      hotel: "Boutique Resort Network",
      result: "+45% Rebooking Rate",
      description: "Unique destination scents created emotional connections driving repeat visits and referrals",
      metrics: { satisfaction: "+40%", recall: "+50%", rebooking: "+45%" }
    }
  ];

  const hospitalityBenefits = [
    {
      title: "Emotional Connection",
      description: "Signature scents create lasting memories that guests associate with your brand",
      icon: Sparkles,
      percentage: "70%"
    },
    {
      title: "Luxury Perception",
      description: "Premium aromatherapy elevates brand positioning and justifies higher room rates",
      icon: Star,
      percentage: "25%"
    },
    {
      title: "Guest Comfort",
      description: "Welcoming scents reduce travel stress and enhance overall satisfaction",
      icon: Coffee,
      percentage: "35%"
    },
    {
      title: "Brand Differentiation",
      description: "Unique olfactory experiences set your property apart from competitors",
      icon: Building2,
      percentage: "42%"
    }
  ];

  const implementationSteps = [
    {
      step: "1",
      title: "Brand Scent Design",
      description: "We create signature scents that perfectly reflect your hotel's brand identity and guest demographics",
      icon: Target
    },
    {
      step: "2",
      title: "Guest Journey Mapping",
      description: "Strategic placement throughout guest touchpoints from lobby to rooms for cohesive experience",
      icon: Lightbulb
    },
    {
      step: "3",
      title: "Luxury Installation",
      description: "Discreet, hotel-grade diffusion systems that maintain consistent scent quality 24/7",
      icon: Building
    },
    {
      step: "4",
      title: "Performance Analytics",
      description: "Monitor guest satisfaction scores, reviews, and rebooking rates to optimize scent strategy",
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <PageMeta
        title="Hotel & Hospitality Scent Marketing Solutions"
        description="Create unforgettable guest experiences with signature hotel scents. +35% guest satisfaction, +42% brand recall, +28% rebooking rates. Trusted by Shangri-La, Marriott, and luxury resorts."
        keywords="hotel scent marketing, hospitality aromatherapy, signature hotel scent, lobby fragrance, guest experience scenting, luxury hotel aroma"
        ogType="article"
        structuredData={breadcrumbSchema}
      />

      <section className="py-20 gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Building2 className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
          <h1 className="font-display text-5xl font-bold text-primary-foreground mb-6">
            Hospitality & Hotel Solutions
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Create unforgettable guest experiences with signature scents that enhance satisfaction,
            build emotional connections, command premium rates, and transform stays into lasting memories.
          </p>
        </div>
      </section>

      {/* Hospitality Benefits */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-foreground mb-6">
              Luxury <span className="text-accent">Guest Experience Benefits</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform guest perceptions and create emotional bonds that drive loyalty and premium pricing
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hospitalityBenefits.map((benefit, index) => (
              <AnimatedSection key={benefit.title} animation="fadeInUp" delay={index * 200}>
                <Card className="gradient-card shadow-card text-center group hover:shadow-elegant transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    <benefit.icon className="w-12 h-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-display text-xl font-bold mb-3">{benefit.title}</h3>
                    <div className="text-3xl font-bold text-primary mb-3">{benefit.percentage}</div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-foreground mb-6">
              Exceptional Results in <span className="text-accent">Hospitality Industry</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <AnimatedSection animation="fadeInUp" delay={200}>
              <Card className="gradient-card shadow-card text-center group hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-8">
                  <Users className="w-12 h-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display text-3xl font-bold mb-2">+35%</h3>
                  <p className="text-muted-foreground font-medium">Guest Satisfaction</p>
                  <p className="text-xs text-muted-foreground/70 mt-2">Overall experience scores</p>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={400}>
              <Card className="gradient-card shadow-card text-center group hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-8">
                  <Star className="w-12 h-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display text-3xl font-bold mb-2">+42%</h3>
                  <p className="text-muted-foreground font-medium">Brand Recall</p>
                  <p className="text-xs text-muted-foreground/70 mt-2">Memorable experiences</p>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={600}>
              <Card className="gradient-card shadow-card text-center group hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-8">
                  <TrendingUp className="w-12 h-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display text-3xl font-bold mb-2">+28%</h3>
                  <p className="text-muted-foreground font-medium">Rebooking Rate</p>
                  <p className="text-xs text-muted-foreground/70 mt-2">Guest loyalty increase</p>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={800}>
              <Card className="gradient-card shadow-card text-center group hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-8">
                  <DollarSign className="w-12 h-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display text-3xl font-bold mb-2">+25%</h3>
                  <p className="text-muted-foreground font-medium">Premium Pricing</p>
                  <p className="text-xs text-muted-foreground/70 mt-2">Rate command ability</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-medium text-sm mb-6">
              <Award className="w-4 h-4 mr-2" />
              Hospitality Success Stories
            </div>
            <h2 className="font-display text-4xl font-bold text-foreground mb-6">
              Luxury Hotels <span className="text-accent">Trust EZE AirCare</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <AnimatedSection key={study.hotel} animation="fadeInUp" delay={index * 200}>
                <Card className="gradient-card shadow-card hover:shadow-elegant transition-all duration-500 h-full">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Hospitality Success</Badge>
                    <CardTitle className="text-xl font-bold">{study.hotel}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-2xl font-bold text-primary">{study.result}</div>
                    <p className="text-muted-foreground leading-relaxed">{study.description}</p>
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/30">
                      <div className="text-center">
                        <div className="font-bold text-accent">{study.metrics.satisfaction}</div>
                        <div className="text-xs text-muted-foreground">Satisfaction</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-accent">{study.metrics.recall}</div>
                        <div className="text-xs text-muted-foreground">Brand Recall</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-accent">{study.metrics.rebooking}</div>
                        <div className="text-xs text-muted-foreground">Rebooking</div>
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-foreground mb-6">
              Our <span className="text-accent">Hospitality Implementation</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Seamless integration designed specifically for luxury hospitality environments
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
              <Building2 className="w-4 h-4 mr-2" />
              Elevate Your Guest Experience
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Create
              <br />
              <span className="relative">
                Unforgettable Stays?
                <div className="absolute -inset-2 bg-primary-foreground/10 rounded-lg blur-xl -z-10" />
              </span>
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform your hotel into a sensory destination that guests remember, recommend, and return to.
              Join luxury hospitality leaders creating signature experiences with scent marketing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact-quote">
                <Button variant="glass" size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 group shadow-glow">
                  Get Hospitality Quote
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline" size="xl" className="bg-background/20 backdrop-blur-sm border-2 border-primary-foreground/50 text-primary-foreground font-semibold hover:bg-primary-foreground hover:text-primary group shadow-lg">
                  Explore Hotel Solutions
                  <Building2 className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default SolutionsHospitality;
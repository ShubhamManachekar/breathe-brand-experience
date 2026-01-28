import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { Heart, Shield, Smile, TrendingUp, ArrowRight, Users, Timer, Activity, Award, Building, Zap, Target, Lightbulb, Stethoscope, Brain } from "lucide-react";
import PageMeta, { createBreadcrumbSchema } from "@/components/PageMeta";

const SolutionsWellness = () => {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://ezeaircare.com" },
    { name: "Solutions", url: "https://ezeaircare.com/solutions" },
    { name: "Wellness", url: "https://ezeaircare.com/solutions/wellness" }
  ]);

  const caseStudies = [
    {
      facility: "Mayo Clinic Wellness Center",
      result: "-45% Patient Anxiety",
      description: "Lavender-eucalyptus blend reduced pre-treatment anxiety and improved patient comfort scores by 40%",
      metrics: { satisfaction: "96%", anxiety: "-45%", outcomes: "+28%" }
    },
    {
      facility: "Spa Retreat Network",
      result: "+52% Client Retention",
      description: "Custom aromatherapy blends enhanced relaxation experiences and increased repeat bookings significantly",
      metrics: { satisfaction: "98%", anxiety: "-38%", outcomes: "+35%" }
    },
    {
      facility: "Senior Care Facilities",
      result: "+30% Cognitive Response",
      description: "Memory-stimulating scents improved cognitive engagement and social interaction among elderly residents",
      metrics: { satisfaction: "93%", anxiety: "-42%", outcomes: "+30%" }
    }
  ];

  const therapeuticBenefits = [
    {
      title: "Stress Reduction",
      description: "Lavender and chamomile blends reduce cortisol levels and promote relaxation",
      icon: Shield,
      percentage: "40%"
    },
    {
      title: "Anxiety Relief",
      description: "Scientifically proven aromatherapy reduces pre-treatment anxiety",
      icon: Heart,
      percentage: "45%"
    },
    {
      title: "Pain Management",
      description: "Peppermint and eucalyptus help manage chronic pain perception",
      icon: Activity,
      percentage: "25%"
    },
    {
      title: "Sleep Quality",
      description: "Valerian and bergamot improve sleep quality and duration",
      icon: Timer,
      percentage: "35%"
    }
  ];

  const implementationSteps = [
    {
      step: "1",
      title: "Clinical Assessment",
      description: "We evaluate your facility's specific wellness goals, patient demographics, and therapeutic objectives",
      icon: Stethoscope
    },
    {
      step: "2",
      title: "Therapeutic Blend Design",
      description: "Our aromatherapy experts create custom blends based on proven therapeutic benefits and patient needs",
      icon: Brain
    },
    {
      step: "3",
      title: "Professional Installation",
      description: "Discreet installation of medical-grade diffusion systems with precise scent control and hygiene standards",
      icon: Building
    },
    {
      step: "4",
      title: "Outcome Monitoring",
      description: "Continuous monitoring of patient responses and treatment outcomes with detailed analytics reporting",
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <PageMeta
        title="Wellness & Healthcare Aromatherapy Solutions"
        description="Improve patient outcomes with therapeutic aromatherapy. -45% patient anxiety, +35% satisfaction, +28% treatment effectiveness. Trusted by Mayo Clinic, spas, and senior care facilities."
        keywords="healthcare aromatherapy, wellness scent solutions, spa fragrance, therapeutic scenting, patient anxiety reduction, medical aromatherapy"
        ogType="article"
        structuredData={breadcrumbSchema}
      />

      <section className="py-20 gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
          <h1 className="font-display text-5xl font-bold text-primary-foreground mb-6">
            Wellness & Healthcare Solutions
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Transform healing environments with therapeutic aromatherapy that reduces patient anxiety,
            enhances treatment outcomes, and creates calming spaces that promote wellness and recovery.
          </p>
        </div>
      </section>

      {/* Therapeutic Benefits */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-foreground mb-6">
              Proven <span className="text-accent">Therapeutic Benefits</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Evidence-based aromatherapy solutions that improve patient outcomes and enhance healing environments
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {therapeuticBenefits.map((benefit, index) => (
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
              Clinical Results in <span className="text-accent">Healthcare Settings</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection animation="fadeInUp" delay={200}>
              <Card className="gradient-card shadow-card text-center group hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-8">
                  <Shield className="w-12 h-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display text-3xl font-bold mb-2">-45%</h3>
                  <p className="text-muted-foreground font-medium">Patient Anxiety Reduction</p>
                  <p className="text-xs text-muted-foreground/70 mt-2">Pre-treatment stress levels</p>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={400}>
              <Card className="gradient-card shadow-card text-center group hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-8">
                  <Smile className="w-12 h-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display text-3xl font-bold mb-2">+35%</h3>
                  <p className="text-muted-foreground font-medium">Patient Satisfaction</p>
                  <p className="text-xs text-muted-foreground/70 mt-2">Overall care experience</p>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={600}>
              <Card className="gradient-card shadow-card text-center group hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-8">
                  <TrendingUp className="w-12 h-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display text-3xl font-bold mb-2">+28%</h3>
                  <p className="text-muted-foreground font-medium">Treatment Effectiveness</p>
                  <p className="text-xs text-muted-foreground/70 mt-2">Improved outcomes</p>
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
              Healthcare Success Stories
            </div>
            <h2 className="font-display text-4xl font-bold text-foreground mb-6">
              Transforming <span className="text-accent">Healing Environments</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <AnimatedSection key={study.facility} animation="fadeInUp" delay={index * 200}>
                <Card className="gradient-card shadow-card hover:shadow-elegant transition-all duration-500 h-full">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Healthcare Success</Badge>
                    <CardTitle className="text-xl font-bold">{study.facility}</CardTitle>
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
                        <div className="font-bold text-accent">{study.metrics.anxiety}</div>
                        <div className="text-xs text-muted-foreground">Anxiety</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-accent">{study.metrics.outcomes}</div>
                        <div className="text-xs text-muted-foreground">Outcomes</div>
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
              Our <span className="text-accent">Clinical Implementation</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Evidence-based approach ensuring optimal therapeutic benefits and compliance with healthcare standards
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
              <Heart className="w-4 h-4 mr-2" />
              Enhance Your Healing Environment
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Improve
              <br />
              <span className="relative">
                Patient Outcomes?
                <div className="absolute -inset-2 bg-primary-foreground/10 rounded-lg blur-xl -z-10" />
              </span>
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform your healthcare facility with evidence-based aromatherapy solutions that reduce patient anxiety,
              improve satisfaction scores, and enhance therapeutic outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact-quote">
                <Button variant="glass" size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 group shadow-glow">
                  Get Healthcare Quote
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline" size="xl" className="bg-background/20 backdrop-blur-sm border-2 border-primary-foreground/50 text-primary-foreground font-semibold hover:bg-primary-foreground hover:text-primary group shadow-lg">
                  Explore Wellness Solutions
                  <Heart className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default SolutionsWellness;
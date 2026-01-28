import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { Briefcase, Brain, Users, TrendingUp, ArrowRight, Timer, DollarSign, Award, Building, Zap, Target, Lightbulb, Coffee, Focus } from "lucide-react";
import PageMeta, { createBreadcrumbSchema } from "@/components/PageMeta";

const SolutionsCorporate = () => {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://ezeaircare.com" },
    { name: "Solutions", url: "https://ezeaircare.com/solutions" },
    { name: "Corporate", url: "https://ezeaircare.com/solutions/corporate" }
  ]);

  const caseStudies = [
    {
      company: "Google Workspace India",
      result: "+22% Productivity",
      description: "Citrus-mint blend improved focus and cognitive performance across multiple office floors in Bangalore",
      metrics: { productivity: "+22%", satisfaction: "94%", retention: "+15%" }
    },
    {
      company: "Deloitte Corporate Offices",
      result: "+30% Client Impression",
      description: "Sophisticated woody scent enhanced professional atmosphere and client meeting experiences",
      metrics: { productivity: "+18%", satisfaction: "91%", retention: "+25%" }
    },
    {
      company: "Microsoft Technology Center",
      result: "+25% Employee Wellness",
      description: "Energizing aromatherapy reduced stress levels and improved work-life balance scores",
      metrics: { productivity: "+20%", satisfaction: "96%", retention: "+18%" }
    }
  ];

  const workplaceBenefits = [
    {
      title: "Enhanced Focus",
      description: "Peppermint and rosemary scents improve concentration and cognitive performance",
      icon: Focus,
      percentage: "22%"
    },
    {
      title: "Stress Reduction",
      description: "Lavender and eucalyptus blends reduce workplace stress and anxiety",
      icon: Brain,
      percentage: "28%"
    },
    {
      title: "Energy Boost",
      description: "Citrus scents increase alertness and combat afternoon fatigue",
      icon: Coffee,
      percentage: "35%"
    },
    {
      title: "Team Morale",
      description: "Pleasant environments improve collaboration and job satisfaction",
      icon: Users,
      percentage: "20%"
    }
  ];

  const implementationSteps = [
    {
      step: "1",
      title: "Workplace Analysis",
      description: "We assess your office layout, work patterns, and corporate culture to design optimal scent zones",
      icon: Target
    },
    {
      step: "2",
      title: "Custom Scent Strategy",
      description: "Professional blend creation aligned with your brand identity and productivity goals",
      icon: Lightbulb
    },
    {
      step: "3",
      title: "Discreet Installation",
      description: "Seamless integration of enterprise-grade diffusion systems without disrupting operations",
      icon: Building
    },
    {
      step: "4",
      title: "Performance Analytics",
      description: "Monitor employee satisfaction, productivity metrics, and air quality with detailed reporting",
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <PageMeta
        title="Corporate Office Scent Marketing Solutions"
        description="Boost workplace productivity with office scent solutions. +22% productivity, +30% client impression, -28% stress levels. Trusted by Google, Deloitte, and Microsoft offices."
        keywords="office scent marketing, corporate aromatherapy, workplace productivity scent, office air freshener, professional scent solutions, employee wellness fragrance"
        ogType="article"
        structuredData={breadcrumbSchema}
      />

      <section className="py-20 gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Briefcase className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
          <h1 className="font-display text-5xl font-bold text-primary-foreground mb-6">
            Corporate & Office Solutions
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Transform your workplace into a high-performance environment that boosts productivity,
            reduces stress, enhances employee satisfaction, and creates impressive spaces for clients and partners.
          </p>
        </div>
      </section>

      {/* Workplace Benefits */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-foreground mb-6">
              Workplace <span className="text-accent">Performance Benefits</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Science-backed aromatherapy solutions that enhance cognitive function and create optimal work environments
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workplaceBenefits.map((benefit, index) => (
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
              Proven Results in <span className="text-accent">Corporate Environments</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <AnimatedSection animation="fadeInUp" delay={200}>
              <Card className="gradient-card shadow-card text-center group hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-8">
                  <Brain className="w-12 h-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display text-3xl font-bold mb-2">+22%</h3>
                  <p className="text-muted-foreground font-medium">Productivity Increase</p>
                  <p className="text-xs text-muted-foreground/70 mt-2">Task completion rates</p>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={400}>
              <Card className="gradient-card shadow-card text-center group hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-8">
                  <Users className="w-12 h-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display text-3xl font-bold mb-2">+25%</h3>
                  <p className="text-muted-foreground font-medium">Employee Satisfaction</p>
                  <p className="text-xs text-muted-foreground/70 mt-2">Workplace happiness</p>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={600}>
              <Card className="gradient-card shadow-card text-center group hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-8">
                  <TrendingUp className="w-12 h-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display text-3xl font-bold mb-2">+30%</h3>
                  <p className="text-muted-foreground font-medium">Client Impression</p>
                  <p className="text-xs text-muted-foreground/70 mt-2">Meeting effectiveness</p>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={800}>
              <Card className="gradient-card shadow-card text-center group hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-8">
                  <Timer className="w-12 h-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display text-3xl font-bold mb-2">-28%</h3>
                  <p className="text-muted-foreground font-medium">Stress Levels</p>
                  <p className="text-xs text-muted-foreground/70 mt-2">Cortisol reduction</p>
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
              Corporate Success Stories
            </div>
            <h2 className="font-display text-4xl font-bold text-foreground mb-6">
              Leading Companies <span className="text-accent">Choose EZE AirCare</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <AnimatedSection key={study.company} animation="fadeInUp" delay={index * 200}>
                <Card className="gradient-card shadow-card hover:shadow-elegant transition-all duration-500 h-full">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Corporate Success</Badge>
                    <CardTitle className="text-xl font-bold">{study.company}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-2xl font-bold text-primary">{study.result}</div>
                    <p className="text-muted-foreground leading-relaxed">{study.description}</p>
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/30">
                      <div className="text-center">
                        <div className="font-bold text-accent">{study.metrics.productivity}</div>
                        <div className="text-xs text-muted-foreground">Productivity</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-accent">{study.metrics.satisfaction}</div>
                        <div className="text-xs text-muted-foreground">Satisfaction</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-accent">{study.metrics.retention}</div>
                        <div className="text-xs text-muted-foreground">Retention</div>
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
              Our <span className="text-accent">Corporate Implementation</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Seamless integration with minimal disruption to ensure maximum workplace enhancement
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
              <Briefcase className="w-4 h-4 mr-2" />
              Transform Your Workplace
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Enhance
              <br />
              <span className="relative">
                Workplace Performance?
                <div className="absolute -inset-2 bg-primary-foreground/10 rounded-lg blur-xl -z-10" />
              </span>
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join leading corporations using scent marketing to boost productivity, reduce stress,
              and create impressive environments that attract top talent and impress clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact-quote">
                <Button variant="glass" size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 group shadow-glow">
                  Get Corporate Quote
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline" size="xl" className="bg-background/20 backdrop-blur-sm border-2 border-primary-foreground/50 text-primary-foreground font-semibold hover:bg-primary-foreground hover:text-primary group shadow-lg">
                  Explore Office Solutions
                  <Briefcase className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default SolutionsCorporate;
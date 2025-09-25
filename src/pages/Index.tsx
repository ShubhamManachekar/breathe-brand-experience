import HeroSection from "@/components/HeroSection";
import ROICalculator from "@/components/ROICalculator";
import ScentFinderQuiz from "@/components/ScentFinderQuiz";
import AnimatedSection from "@/components/AnimatedSection";
import DynamicCounter from "@/components/DynamicCounter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, TrendingUp, Users, Heart, Building2, Store, Briefcase, Zap, Shield, Eye, Award, Target, Lightbulb } from "lucide-react";

const Index = () => {
  const caseStudies = [
    {
      brand: "Nike Tokyo Flagship",
      industry: "Retail",
      result: "+23% Dwell Time",
      description: "Custom citrus blend increased customer engagement and product exploration",
      icon: Store,
      metric: 23,
      bgGradient: "from-blue-500/10 to-cyan-500/20"
    },
    {
      brand: "Shangri-La Hotels",
      industry: "Hospitality", 
      result: "+35% Guest Satisfaction",
      description: "Signature scent improved brand recall and repeat bookings",
      icon: Building2,
      metric: 35,
      bgGradient: "from-emerald-500/10 to-green-500/20"
    },
    {
      brand: "Singapore Airlines",
      industry: "Corporate",
      result: "+70% Brand Recall", 
      description: "Stefan Floridian Waters became synonymous with premium service",
      icon: Briefcase,
      metric: 70,
      bgGradient: "from-purple-500/10 to-violet-500/20"
    }
  ];

  const benefits = [
    {
      icon: Brain,
      title: "Neuroscience-Backed",
      description: "Scent is the only sense directly connected to memory and emotion centers",
      stat: "75%",
      statLabel: "of emotions triggered by smell"
    },
    {
      icon: TrendingUp, 
      title: "Proven ROI",
      description: "Measurable increases in dwell time, purchase intent, and perceived value",
      stat: "240%",
      statLabel: "average ROI increase"
    },
    {
      icon: Users,
      title: "Customer Experience",
      description: "Creates memorable, positive associations that drive loyalty",
      stat: "98%",
      statLabel: "project success rate"
    },
    {
      icon: Heart,
      title: "Heritage & Innovation", 
      description: "Indian perfumery tradition meets modern atomization technology",
      stat: "20+",
      statLabel: "years of expertise"
    }
  ];

  const industryMetrics = [
    { value: 500, label: "Successful Deployments", icon: Award },
    { value: 95, label: "Client Retention Rate", icon: Target, suffix: "%" },
    { value: 24, label: "Hour Installation", icon: Zap, suffix: "hr" },
    { value: 15, label: "Countries Served", icon: Lightbulb }
  ];

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Industry Metrics Section */}
      <AnimatedSection animation="fadeInUp" className="py-12 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {industryMetrics.map((metric, index) => (
              <div key={metric.label} className="text-center">
                <div className="flex flex-col items-center space-y-2">
                  <metric.icon className="w-8 h-8 text-accent mb-2" />
                  <DynamicCounter
                    endValue={metric.value}
                    label={metric.label}
                    suffix={metric.suffix || ''}
                    duration={3000}
                    className="text-2xl font-bold text-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Enhanced Why Scent Works Section */}
      <section className="py-20 bg-gradient-to-br from-muted/40 via-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-6">
              <Brain className="w-4 h-4 mr-2" />
              Science-Based Approach
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Scent Marketing 
              <span className="text-accent font-extrabold"> Transforms Business</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Up to <span className="text-accent font-semibold">75% of daily emotions</span> are triggered by smell—more than sight, sound, or touch. 
              Harness this powerful connection to create <span className="text-primary font-semibold">unforgettable customer experiences</span>.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <AnimatedSection 
                key={benefit.title} 
                animation="fadeInScale" 
                delay={index * 200}
                className="h-full"
              >
                <Card className="gradient-card shadow-card hover:shadow-elegant transition-all duration-500 group h-full border-border/50 hover:border-accent/30">
                  <CardContent className="p-8 text-center h-full flex flex-col">
                    <div className="flex-1">
                      <div className="relative mb-6">
                        <div className="absolute -inset-3 gradient-accent opacity-0 group-hover:opacity-20 rounded-full blur transition-all duration-500" />
                        <benefit.icon className="w-14 h-14 text-accent mx-auto relative group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                    <div className="border-t border-border/30 pt-4 mt-auto">
                      <div className="text-2xl font-bold text-accent mb-1">
                        {benefit.stat}
                      </div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">
                        {benefit.statLabel}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Case Studies Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--accent)) 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-medium text-sm mb-6">
              <Award className="w-4 h-4 mr-2" />
              Success Stories
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Real Results from 
              <span className="text-accent font-extrabold"> Global Brands</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              See how leading companies use scent marketing to drive <span className="text-primary font-medium">measurable business outcomes</span>
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <AnimatedSection 
                key={study.brand} 
                animation="fadeInUp" 
                delay={index * 300}
              >
                <Card className="gradient-card shadow-card hover:shadow-elegant transition-all duration-500 group overflow-hidden h-full">
                  <div className={`h-2 bg-gradient-to-r ${study.bgGradient}`} />
                  <CardContent className="p-8 relative">
                    {/* Background Number */}
                    <div className="absolute top-4 right-4 text-6xl font-bold text-accent/10 group-hover:text-accent/20 transition-colors duration-500">
                      {study.metric}
                    </div>
                    
                    <div className="relative z-10">
                      <study.icon className="w-12 h-12 text-accent mb-6 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="font-display text-xl font-bold text-foreground mb-2">
                        {study.brand}
                      </h3>
                      <Badge variant="secondary" className="mb-4 text-accent border-accent/30">
                        {study.industry}
                      </Badge>
                      <div className="text-3xl font-bold text-primary mb-4 group-hover:scale-105 transition-transform duration-300">
                        {study.result}
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {study.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection animation="fadeInUp" delay={1000} className="text-center mt-12">
            <Link to="/why-scent-marketing">
              <Button variant="hero" size="lg" className="group">
                Explore More Case Studies
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ROI Calculator */}
      <ROICalculator />

      {/* Scent Finder Quiz */}
      <ScentFinderQuiz />

      {/* Enhanced CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-foreground/5 to-accent/5 opacity-40" />
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInScale">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-foreground/20 border border-primary-foreground/30 text-primary-foreground font-medium text-sm mb-8">
              <Heart className="w-4 h-4 mr-2" />
              Transform Your Business Today
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Create Memorable
              <br />
              <span className="relative">
                Customer Experiences?
                <div className="absolute -inset-2 bg-primary-foreground/10 rounded-lg blur-xl -z-10" />
              </span>
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join leading brands who use EZE AirCare to create <span className="font-semibold">memorable experiences</span> 
              and drive <span className="font-semibold">measurable results</span>. Start with a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact-quote">
                <Button variant="glass" size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 group shadow-glow">
                  Schedule Free Demo
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline" size="xl" className="bg-background/20 backdrop-blur-sm border-2 border-primary-foreground/50 text-primary-foreground font-semibold hover:bg-primary-foreground hover:text-primary group shadow-lg">
                  Explore Products
                  <Eye className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Index;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Building2, Store, Briefcase, Heart, Brain, TrendingUp, Users, Sparkles, Award, Target, Zap, Lightbulb, Activity, Calendar } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import DynamicCounter from "@/components/DynamicCounter";
import HeroSection from "@/components/HeroSection";
import ScentFinderQuiz from "@/components/ScentFinderQuiz";

const BusinessHome = () => {
  const caseStudies = [
    { brand: "Nike Tokyo Flagship", industry: "Retail", result: "+23% Dwell Time", description: "Custom citrus blend increased customer engagement and product exploration", icon: Store, metric: 23, bgGradient: "from-blue-500/10 to-cyan-500/20" },
    { brand: "Shangri-La Hotels", industry: "Hospitality", result: "+35% Guest Satisfaction", description: "Signature scent improved brand recall and repeat bookings", icon: Building2, metric: 35, bgGradient: "from-emerald-500/10 to-green-500/20" },
    { brand: "Singapore Airlines", industry: "Corporate", result: "+70% Brand Recall", description: "Stefan Floridian Waters became synonymous with premium service", icon: Briefcase, metric: 70, bgGradient: "from-purple-500/10 to-violet-500/20" }
  ];

  const benefits = [
    { icon: Brain, title: "Neuroscience-Backed", description: "Scent is the only sense directly connected to memory and emotion centers", stat: "75%", statLabel: "of emotions triggered by smell" },
    { icon: TrendingUp, title: "Proven ROI", description: "Measurable increases in dwell time, purchase intent, and perceived value", stat: "240%", statLabel: "average ROI increase" },
    { icon: Users, title: "Customer Experience", description: "Creates memorable, positive associations that drive loyalty", stat: "98%", statLabel: "project success rate" },
    { icon: Heart, title: "Heritage & Innovation", description: "Indian perfumery tradition meets modern atomization technology", stat: "20+", statLabel: "years of expertise" }
  ];

  const industryMetrics = [
    { value: 500, label: "Successful Deployments", icon: Award },
    { value: 95, label: "Client Retention Rate", icon: Target, suffix: "%" },
    { value: 24, label: "Hour Installation", icon: Zap, suffix: "hr" },
    { value: 15, label: "Countries Served", icon: Lightbulb }
  ];

  return (
    <div className="overflow-hidden">
      <HeroSection />

      {/* Industry Metrics */}
      <AnimatedSection animation="fadeInUp" className="py-16 bg-muted/20 border-y border-border/30 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/40 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {industryMetrics.map((metric) => (
              <div key={metric.label} className="text-center group">
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-3 rounded-full bg-accent/5 group-hover:bg-accent/10 transition-colors duration-300">
                    <metric.icon className="w-6 h-6 text-accent" />
                  </div>
                  <DynamicCounter endValue={metric.value} label={metric.label} suffix={metric.suffix || ''} duration={3000} className="text-3xl font-display font-bold text-foreground" />
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide opacity-80">{metric.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Why Scent Works */}
      <section className="py-24 relative">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection animation="fadeInUp" className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              The Science of Presence
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-8 tracking-tight">
              Why Scent Marketing
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> Transforms Business</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              Up to <span className="text-accent font-semibold">75% of daily emotions</span> are triggered by smell. We harness this to create <span className="text-primary font-semibold">unforgettable brand experiences</span>.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={benefit.title} animation="fadeInScale" delay={index * 150} className="h-full">
                <Card className="gradient-card shadow-sm hover:shadow-elegant transition-all duration-500 group h-full border-border/40 hover:border-accent/30 overflow-hidden bg-background/50 backdrop-blur-sm">
                  <CardContent className="p-8 text-center h-full flex flex-col relative z-10">
                    <div className="flex-1">
                      <benefit.icon className="w-12 h-12 text-foreground group-hover:text-accent transition-colors duration-300 mx-auto mb-6" />
                      <h3 className="font-display text-xl font-semibold text-foreground mb-4">{benefit.title}</h3>
                      <p className="text-muted-foreground mb-8 leading-relaxed text-sm">{benefit.description}</p>
                    </div>
                    <div className="border-t border-border/30 pt-6 mt-auto">
                      <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">{benefit.stat}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">{benefit.statLabel}</div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 relative overflow-hidden bg-muted/10">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-medium text-sm mb-6">
              <Activity className="w-4 h-4 mr-2" />
              Measurable Impact
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Real Results, <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Real Growth</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <AnimatedSection key={study.brand} animation="fadeInUp" delay={index * 200}>
                <Card className="shadow-lg hover:shadow-2xl transition-all duration-500 group overflow-hidden h-full border-border/50 bg-card">
                  <div className={`h-1.5 w-full bg-gradient-to-r ${study.bgGradient}`} />
                  <CardContent className="p-8 relative">
                    <div className="absolute top-4 right-6 text-7xl font-display font-bold text-foreground/5 select-none">{study.metric}</div>
                    <div className="relative z-10 pt-4">
                      <study.icon className="w-8 h-8 text-foreground group-hover:text-accent transition-colors duration-300 mb-6" />
                      <h3 className="font-display text-2xl font-bold text-foreground mb-2">{study.brand}</h3>
                      <Badge variant="outline" className="mb-6 border-accent/30 text-accent bg-accent/5">{study.industry}</Badge>
                      <div className="text-2xl font-bold text-primary mb-4">{study.result}</div>
                      <p className="text-muted-foreground text-sm">"{study.description}"</p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <ScentFinderQuiz />

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0A0A0F]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-30" />
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInScale">
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
              Ready to Define Your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">Brand Signature?</span>
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Join the world's most distinguished brands using EZE AirCare to captivate audiences and inspire loyalty.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/business/contact">
                <Button size="xl" className="h-14 px-8 text-lg bg-white text-primary hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.3)] rounded-full group">
                  Schedule Consultation
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/business/products">
                <Button variant="outline" size="xl" className="h-14 px-8 text-lg border-white/30 text-white hover:bg-white/10 hover:text-white rounded-full">
                  Explore Products
                </Button>
              </Link>
            </div>
            <p className="mt-8 text-white/40 text-sm">No commitment required • Free demo units available</p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default BusinessHome;

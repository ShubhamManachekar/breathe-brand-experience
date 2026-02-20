import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "@/components/HeroSection";
import ScentFinderQuiz from "@/components/ScentFinderQuiz";
import SegmentSelector from "@/components/SegmentSelector";
import AnimatedSection from "@/components/AnimatedSection";
import DynamicCounter from "@/components/DynamicCounter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Users, Heart, Building2, Store, Briefcase, Award, Target, Zap, Lightbulb, Sparkles, Activity } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const benefitsRef = useRef<HTMLDivElement>(null);
  const caseStudiesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger benefit cards on scroll
      if (benefitsRef.current) {
        gsap.fromTo(
          benefitsRef.current.children,
          { opacity: 0, y: 60, scale: 0.93 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7, stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: benefitsRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
      // Case study cards stagger
      if (caseStudiesRef.current) {
        gsap.fromTo(
          caseStudiesRef.current.children,
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0,
            duration: 0.7, stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: caseStudiesRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

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

      {/* Segment Selector - Shop vs Business */}
      <SegmentSelector />

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
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
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
              Up to <span className="text-accent font-semibold">75% of daily emotions</span> are triggered by smell—more than sight, sound, or touch.
              We harness this biological connection to create <span className="text-primary font-semibold">unforgettable brand experiences</span> that resonate on a deeper level.
            </p>
          </AnimatedSection>

          <div ref={benefitsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="gradient-card shadow-sm hover:shadow-elegant transition-all duration-500 group h-full border-border/40 hover:border-accent/30 overflow-hidden bg-background/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-6 sm:p-8 text-center h-full flex flex-col relative z-10">
                  <div className="flex-1">
                    <div className="relative mb-5 sm:mb-6 inline-block">
                      <div className="absolute -inset-4 bg-accent/10 rounded-full opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-500 blur-md" />
                      <benefit.icon className="w-10 h-10 sm:w-12 sm:h-12 text-foreground group-hover:text-accent transition-colors duration-300 relative z-10" />
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">{benefit.title}</h3>
                    <p className="text-muted-foreground mb-6 sm:mb-8 leading-relaxed text-sm">{benefit.description}</p>
                  </div>
                  <div className="border-t border-border/30 pt-4 sm:pt-6 mt-auto">
                    <div className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">{benefit.stat}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">{benefit.statLabel}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 relative overflow-hidden bg-muted/10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          opacity: 0.03
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-medium text-sm mb-6">
              <Activity className="w-4 h-4 mr-2" />
              Measurable Impact
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Real Results,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary"> Real Growth</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              See how industry leaders are leveraging scent to drive <span className="font-semibold text-foreground">measurable business outcomes</span>.
            </p>
          </AnimatedSection>

          <div ref={caseStudiesRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {caseStudies.map((study) => (
              <Card key={study.brand} className="shadow-lg hover:shadow-2xl transition-all duration-500 group overflow-hidden h-full border-border/50 bg-card hover:-translate-y-1">
                <div className={`h-1.5 w-full bg-gradient-to-r ${study.bgGradient}`} />
                <CardContent className="p-6 sm:p-8 relative">
                  <div className="absolute top-4 right-6 text-6xl sm:text-7xl font-display font-bold text-foreground/5 group-hover:text-foreground/10 transition-colors duration-500 select-none">{study.metric}</div>
                  <div className="relative z-10 pt-4">
                    <div className="p-2.5 sm:p-3 bg-muted/50 rounded-xl w-fit mb-5 sm:mb-6 group-hover:bg-accent/10 transition-colors duration-300">
                      <study.icon className="w-7 h-7 sm:w-8 sm:h-8 text-foreground group-hover:text-accent transition-colors duration-300" />
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-2">{study.brand}</h3>
                    <Badge variant="outline" className="mb-5 sm:mb-6 border-accent/30 text-accent bg-accent/5">{study.industry}</Badge>
                    <div className="text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-4 group-hover:translate-x-1 transition-transform duration-300">{study.result}</div>
                    <p className="text-muted-foreground leading-relaxed text-sm">"{study.description}"</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ScentFinderQuiz />
    </div>
  );
};

export default Index;

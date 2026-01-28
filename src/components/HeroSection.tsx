import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlayCircle, ArrowRight, TrendingUp, Users, Eye, ShoppingCart, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import DynamicCounter from "@/components/DynamicCounter";
import InteractiveBackground from "@/components/InteractiveBackground";
import { useParallax } from "@/hooks/useScrollAnimation";
import heroImage from "@/assets/hero-scent-diffuser.jpg";

const HeroSection = () => {
  const { elementRef: parallaxRef, offset } = useParallax(0.3);

  const metrics = [
    { icon: Eye, value: 30, label: "Dwell Time Increase", color: "text-accent", suffix: "%" },
    { icon: TrendingUp, value: 20, label: "Perceived Value Boost", color: "text-primary", suffix: "%" },
    { icon: Users, value: 25, label: "Store Revisit Rate", color: "text-accent", suffix: "%" },
    { icon: ShoppingCart, value: 17, label: "Purchase Intent Lift", color: "text-primary", suffix: "%" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <InteractiveBackground />

      {/* Enhanced Background with Parallax */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background/60 to-accent/30 z-20" />
        <div
          ref={parallaxRef}
          className="absolute inset-0 z-10"
          style={{ transform: `translateY(${offset}px)` }}
        >
          <img
            src={heroImage}
            alt="EZE AirCare Premium Scent Technology"
            className="w-full h-full object-cover scale-110"
            loading="lazy"
          />
        </div>

        {/* Dynamic Floating Elements */}
        <div className="absolute inset-0 z-30">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            >
              <Sparkles
                className="text-accent/40 transition-all duration-300 hover:text-accent/80 hover:scale-125"
                size={12 + Math.random() * 16}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Content with Better Segmentation */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          {/* Animated Badge */}
          <AnimatedSection animation="fadeInScale" delay={200}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent font-medium text-sm mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
              Premium Fragrance Technology
              <div className="w-2 h-2 bg-accent rounded-full ml-2 animate-ping" />
            </div>
          </AnimatedSection>

          {/* Main Headline with Staggered Animation */}
          <AnimatedSection animation="fadeInUp" delay={400}>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Before They Buy,<br />
              <span className="relative">
                <span className="bg-gradient-to-r from-primary via-accent to-primary-glow bg-clip-text text-transparent font-extrabold text-6xl sm:text-7xl lg:text-8xl leading-tight">
                  They BREATHE
                </span>
                <div className="absolute -inset-4 gradient-accent opacity-30 rounded-lg blur-2xl -z-10 animate-pulse" />
              </span>
            </h1>
          </AnimatedSection>

          {/* Enhanced Subheadline */}
          <AnimatedSection animation="fadeInUp" delay={600}>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
              Where <span className="text-accent font-medium">Indian perfumery heritage</span> meets
              <span className="text-primary font-medium"> modern scent technology</span>.
              Transform your business with premium fragrance solutions that drive
              <span className="text-accent font-medium"> measurable results</span>.
            </p>
          </AnimatedSection>

          {/* Enhanced CTA Buttons */}
          <AnimatedSection animation="fadeInUp" delay={800}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link to="/contact-quote">
                <Button variant="hero" size="xl" className="group shadow-glow hover:shadow-elegant">
                  Request Free Demo
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Button variant="glass" size="xl" className="group backdrop-blur-md">
                <PlayCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Our Story
              </Button>
            </div>
          </AnimatedSection>

          {/* Enhanced Business Impact Metrics with Dynamic Counters */}
          <AnimatedSection animation="fadeInScale" delay={1000}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {metrics.map((metric, index) => (
                <div
                  key={metric.label}
                  className="relative group"
                  style={{ animationDelay: `${1200 + index * 200}ms` }}
                >
                  {/* Background Glow Effect */}
                  <div className="absolute -inset-1 gradient-accent opacity-0 group-hover:opacity-30 rounded-xl blur transition-all duration-500" />

                  {/* Card Content */}
                  <div className="relative gradient-card p-8 rounded-xl shadow-card backdrop-blur-sm border border-border/50 hover:shadow-elegant transition-all duration-300 hover:scale-105 hover:border-accent/50">
                    <metric.icon className={`w-10 h-10 ${metric.color} mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`} />

                    <div className="mb-3">
                      <DynamicCounter
                        endValue={metric.value}
                        label={metric.label}
                        suffix={metric.suffix}
                        prefix="+"
                        duration={2500}
                        className={`text-4xl font-bold ${metric.color}`}
                      />
                    </div>

                    <div className="text-sm text-muted-foreground font-medium leading-tight mb-2">
                      {metric.label}
                    </div>

                    {/* Hover Effect Indicator */}
                    <div className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Enhanced Scroll Indicator */}
          <AnimatedSection animation="fadeInUp" delay={1600}>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
              <div className="flex flex-col items-center space-y-2 animate-bounce">
                <div className="text-xs text-muted-foreground font-medium tracking-wider uppercase">
                  Discover More
                </div>
                <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center p-2 group hover:border-accent transition-colors">
                  <div className="w-1 h-3 bg-accent/50 rounded-full group-hover:bg-accent transition-colors animate-pulse" />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Building2, ArrowRight, Home, Briefcase } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const SegmentSelector = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection animation="fadeInUp" className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
            How Can We Help You?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            Whether you're looking for personal home fragrances or professional scent solutions — we've got you covered.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* B2C Card */}
          <AnimatedSection animation="fadeInUp" delay={100}>
            <Link to="/shop" className="block h-full">
              <Card className="gradient-card h-full hover:shadow-elegant transition-all duration-500 group border-border/50 hover:border-accent/40 overflow-hidden cursor-pointer">
                <CardContent className="p-10 text-center flex flex-col items-center h-full">
                  <div className="p-5 rounded-2xl bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300 mb-8">
                    <Home className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">Shop for Home</h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    Browse and buy premium diffusers & aroma oils for your personal space. Free shipping, easy returns.
                  </p>
                  <Button variant="hero" className="group/btn mt-auto">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Start Shopping
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </AnimatedSection>

          {/* B2B Card */}
          <AnimatedSection animation="fadeInUp" delay={250}>
            <Link to="/business" className="block h-full">
              <Card className="gradient-card h-full hover:shadow-elegant transition-all duration-500 group border-border/50 hover:border-primary/40 overflow-hidden cursor-pointer">
                <CardContent className="p-10 text-center flex flex-col items-center h-full">
                  <div className="p-5 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 mb-8">
                    <Building2 className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">Business Solutions</h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    Professional scent marketing for hotels, retail, corporate & wellness. Schedule a demo today.
                  </p>
                  <Button variant="glass" className="group/btn mt-auto border-primary/30 text-primary hover:bg-primary/10">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Explore Solutions
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default SegmentSelector;

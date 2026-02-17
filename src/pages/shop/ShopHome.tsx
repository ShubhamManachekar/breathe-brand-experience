import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ShoppingBag, Sparkles, Star, Truck, Shield } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import diffuserImage from "@/assets/diffuser-360.jpg";

const ShopHome = () => {
  const featuredProducts = [
    {
      name: "EZE Compact",
      model: "EC-200",
      price: "₹18,000",
      description: "Perfect for homes, bedrooms & personal spaces",
      image: diffuserImage,
      tag: "Best Seller"
    },
    {
      name: "EZE Pro Diffuser",
      model: "EP-500",
      price: "₹45,000",
      description: "Professional-grade for large living spaces",
      image: diffuserImage,
      tag: "Premium"
    },
    {
      name: "EZE Elite",
      model: "EE-1000",
      price: "₹85,000",
      description: "Whole-home scent system with multi-zone control",
      image: diffuserImage,
      tag: "Luxury"
    }
  ];

  const perks = [
    { icon: Truck, title: "Free Shipping", desc: "On orders above ₹5,000" },
    { icon: Shield, title: "2-Year Warranty", desc: "Complete peace of mind" },
    { icon: Star, title: "Premium Quality", desc: "Handcrafted fragrances" },
    { icon: Sparkles, title: "Easy Returns", desc: "30-day return policy" },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection animation="fadeInUp" className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm border-accent/30 text-accent bg-accent/5">
              <ShoppingBag className="w-3.5 h-3.5 mr-2" />
              Shop for Home & Personal Use
            </Badge>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
              Elevate Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> Living Space</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed font-light">
              Bring the luxury of professional scent technology into your home. Browse our curated collection of diffusers and signature aromas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop/products">
                <Button variant="hero" size="lg" className="group">
                  Shop Diffusers
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/shop/aromas">
                <Button variant="glass" size="lg">
                  Explore Aromas
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Perks Bar */}
      <section className="py-8 bg-muted/20 border-y border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {perks.map((perk) => (
              <div key={perk.title} className="flex items-center gap-3 justify-center">
                <perk.icon className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-foreground">{perk.title}</div>
                  <div className="text-xs text-muted-foreground">{perk.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">Featured Diffusers</h2>
            <p className="text-xl text-muted-foreground">Professional-grade scent technology for your home</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <AnimatedSection key={product.model} animation="fadeInUp" delay={index * 200}>
                <Card className="gradient-card h-full hover:shadow-elegant transition-all duration-500 group overflow-hidden border-border/50">
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-accent text-white border-0">{product.tag}</Badge>
                  </div>
                  <div className="aspect-square bg-muted/20 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="font-display text-xl font-semibold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{product.price}</span>
                      <Link to={`/shop/products/${product.model}`}>
                        <Button variant="hero" size="sm" className="group/btn">
                          Buy Now
                          <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Aromas CTA */}
      <section className="py-20 bg-muted/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="fadeInUp">
            <Sparkles className="w-10 h-10 text-accent mx-auto mb-6" />
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">Discover Your Signature Scent</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore our curated collection of handcrafted aroma oils — from calming lavender to energizing citrus.
            </p>
            <Link to="/shop/aromas">
              <Button variant="hero" size="lg" className="group">
                Browse Aroma Collection
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default ShopHome;

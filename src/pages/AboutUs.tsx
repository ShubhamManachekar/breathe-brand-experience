import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "@/components/AnimatedSection";
import { Heart, Users, Lightbulb, Award, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutUs() {
  const timelineEvents = [
    {
      year: "1965",
      title: "Eze Perfumes Founded",
      description: "Eze Perfumes established with a commitment to fragrance innovation and excellence in perfumery artistry."
    },
    {
      year: "1980s",
      title: "Sawai Fragrances Legacy",
      description: "Sawai Fragrances developed their harvest-to-fragrance integration, becoming suppliers to market leaders with decades of expertise."
    },
    {
      year: "2015",
      title: "The Partnership",
      description: "Two industry pioneers - Sawai Fragrances and Eze Perfumes - joined forces to create the ultimate scent marketing solution."
    },
    {
      year: "2018",
      title: "Innovation Breakthrough",
      description: "Combined Sawai's premium aroma expertise with Eze's advanced diffusion technology, revolutionizing scent marketing."
    },
    {
      year: "2020",
      title: "Global Expansion",
      description: "EZE Aircare launched internationally, bringing the perfect fusion of artisanal fragrances and smart diffusion systems worldwide."
    },
    {
      year: "Today",
      title: "Industry Leaders United",
      description: "The trusted choice for Fortune 500 companies, combining Sawai's fragrance mastery with Eze's diffusion innovation."
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "We pour our heart into every fragrance, believing that scent has the power to create unforgettable experiences."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Constantly pushing boundaries with cutting-edge technology to deliver the most advanced scent solutions."
    },
    {
      icon: Users,
      title: "Partnership",
      description: "We don't just serve clients - we partner with them to understand their unique needs and exceed expectations."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "From premium fragrances to world-class service, we maintain the highest standards in everything we do."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - The Beginning of Our Story */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-accent/10 py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
              Our Story
            </Badge>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 gradient-text">
              Crafting Experiences,<br />One Scent at a Time
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              What started as a simple question - "Why do some spaces feel more memorable than others?" - 
              evolved into a mission to transform environments through the art and science of scent.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fadeInScale" delay={200} className="max-w-4xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-elegant border border-border/50">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-hero flex items-center justify-center shadow-glow">
                  <span className="text-white font-display font-bold text-3xl">E</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">The EZE Aircare Story</h2>
              </div>
              
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="text-lg leading-relaxed mb-6">
                  In 2015, two industry pioneers crossed paths at a fragrance innovation summit. Sawai Fragrances, with their rich legacy spanning decades in creating exquisite aromas and natural fragrance solutions, met Eze Perfumes, renowned since 1965 for their commitment to fragrance innovation and cutting-edge diffusion technology. That meeting sparked a revolutionary partnership.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Sawai Fragrances brought their expertise in harvest-to-fragrance integration, world-class innovation, and creative excellence in aroma development. Eze Perfumes contributed their heritage of fine perfume artistry and advanced diffusion systems. Together, they realized they could solve what no single company had achieved before: the perfect marriage of premium fragrances with intelligent scent distribution.
                </p>
                <p className="text-lg leading-relaxed">
                  Today, EZE Aircare stands as the culmination of this partnership - where Sawai's artisanal fragrances meet Eze's innovative diffusion technology. We've transformed from two separate industry leaders into a unified force, creating signature scent experiences that customers remember long after they leave. Our core mission remains unchanged: helping businesses tell their story through the perfect combination of premium aromas and advanced diffusion systems.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From a simple idea to transforming thousands of spaces worldwide
            </p>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            {timelineEvents.map((event, index) => (
              <AnimatedSection 
                key={event.year} 
                animation="fadeInLeft" 
                delay={index * 100}
                className="relative"
              >
                <div className="flex items-start mb-12 last:mb-0">
                  <div className="flex-shrink-0 w-32 text-right mr-8">
                    <span className="text-2xl font-display font-bold text-primary">{event.year}</span>
                  </div>
                  <div className="flex-grow bg-card rounded-xl p-6 shadow-md border border-border/50 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground">{event.description}</p>
                  </div>
                </div>
                {index < timelineEvents.length - 1 && (
                  <div className="absolute left-32 top-20 w-px h-8 bg-border ml-4"></div>
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">What Drives Us</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our core values shape every decision we make and every solution we create
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <AnimatedSection 
                key={value.title} 
                animation="fadeInScale" 
                delay={index * 100}
              >
                <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="fadeInLeft">
              <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              The Perfect Partnership:<br />Sawai Fragrances × Eze Perfumes
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              We're the fusion of two industry legends - Sawai's artisanal aroma expertise meets Eze's innovative diffusion technology, 
              creating the most advanced scent marketing solutions in the industry.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl border border-primary/20">
                <h3 className="text-xl font-semibold mb-3 text-primary">Sawai Fragrances - Aroma Masters</h3>
                <ul className="space-y-2 text-muted-foreground">  
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                    Decades of harvest-to-fragrance expertise
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                    Suppliers to global market leaders
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                    Premium natural fragrance solutions
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-6 rounded-xl border border-accent/20">
                <h3 className="text-xl font-semibold mb-3 text-accent">Eze Perfumes - Diffusion Innovation</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-2 flex-shrink-0" />
                    Rich heritage since 1965
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-2 flex-shrink-0" />
                    Advanced diffusion technology
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-2 flex-shrink-0" />
                    Perfumery artistry and innovation
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {[
                "Premium Sawai fragrances in every diffuser",
                "Eze's cutting-edge diffusion systems",
                "10,000+ spaces transformed worldwide",
                "99.8% client satisfaction rate",
                "24/7 global support network"
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

                <Link to="/contact-quote">
                  <Button size="lg" className="group">
                    Start Your Transformation
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInRight" delay={200}>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-8 backdrop-blur-sm border border-border/50">
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-display font-bold gradient-text mb-4">10K+</div>
                      <p className="text-xl font-semibold mb-2">Spaces Transformed</p>
                      <p className="text-muted-foreground">Creating memorable experiences across the globe</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-accent to-primary opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-primary to-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection animation="fadeInUp" className="text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses worldwide who trust EZE Aircare to create unforgettable experiences through scent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact-quote">
                <Button size="lg" variant="secondary" className="group">
                  Get Your Custom Quote
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/solutions">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Explore Solutions
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

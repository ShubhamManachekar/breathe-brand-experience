import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "@/components/AnimatedSection";
import { Heart, Users, Lightbulb, Award, ArrowRight, CheckCircle, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import PageMeta, { organizationSchema } from "@/components/PageMeta";
import NeoHero from "@/components/NeoHero";
import heroAbout from "@/assets/hero-about.jpg";

export default function AboutUs() {
  const timelineEvents = [
    { year: "1965", title: "The Foundation", desc: "Eze Perfumes established with a commitment to fragrance innovation." },
    { year: "1980s", title: "Harvest Mastery", desc: "Sawai Fragrances pioneers harvest-to-fragrance integration." },
    { year: "2015", title: "The Union", desc: "Two industry pioneers join forces to create the ultimate scent solution." },
    { year: "2018", title: "Tech Fusion", desc: "Combining premium aroma expertise with advanced cold-air diffusion." },
    { year: "2024", title: "Neo-Heritage", desc: "Launching the next generation of scent marketing for the digital age." },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <PageMeta
        title="About EZE AirCare - Heritage & Innovation"
        description="A fusion of Sawai Fragrances' artisanal mastery and Eze Perfumes' innovation excellence."
        keywords="EZE AirCare, about us, scent marketing history, perfumery heritage"
        ogType="website"
        structuredData={organizationSchema}
      />

      <NeoHero
        label="Our Story"
        headline={
          <>
            A legacy built for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-navy to-accent animate-gradient-x">
              modern senses.
            </span>
          </>
        }
        subheadline="EZE AirCare is the union of deep perfumery heritage and forward-looking scent technology."
        variant="business"
        texture="oil"
        heroImage={heroAbout}
        heroImageAlt="Luxury retail scent experience"
      />

      {/* ── The Origin Story ── */}
      <section className="section-shell -mt-20 relative z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp">
            <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-[2rem] p-8 md:p-12 shadow-neo relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-display text-3xl font-semibold mb-6">Two Legacies, One Vision.</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      <strong>Sawai Fragrances</strong> brought decades of harvest-to-fragrance mastery and enduring client trust.
                    </p>
                    <p>
                      <strong>Eze Perfumes</strong> brought a heritage of innovation dating back to 1965.
                    </p>
                    <p>
                      Together, we formed a single vision: make scent strategy measurable, scalable, and memorable. Today, we design olfactory identities for the world's most discerning brands.
                    </p>
                  </div>
                </div>

                <div className="relative h-64 md:h-full min-h-[300px] bg-muted/20 rounded-2xl overflow-hidden flex items-center justify-center border border-border/30">
                   <div className="absolute inset-0 bg-grid-fade opacity-20" />
                   <Leaf className="w-24 h-24 text-accent opacity-20 animate-float-slow" />
                   <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                         <span>1965</span>
                         <span>2024</span>
                      </div>
                      <div className="h-1 w-full bg-border/40 mt-2 relative">
                         <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-accent to-primary" />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="section-shell">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent text-[10px] font-bold uppercase tracking-[0.2em]">Milestones</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mt-2">The Journey</h2>
          </div>

          <div className="relative border-l border-border/40 ml-4 md:ml-0 md:pl-0 space-y-12">
            {timelineEvents.map((event, index) => (
              <AnimatedSection key={event.year} animation="fadeInUp" delay={index * 100}>
                <div className="relative pl-8 md:pl-0 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 items-center group">
                  {/* Dot */}
                  <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full bg-border group-hover:bg-primary transition-colors ring-4 ring-background" />

                  <div className={`md:text-right ${index % 2 === 0 ? 'md:order-1' : 'md:order-3'}`}>
                    <span className="text-4xl font-display font-bold text-muted-foreground/20 group-hover:text-primary/20 transition-colors">{event.year}</span>
                  </div>

                  <div className="hidden md:block md:order-2" /> {/* Spacer for center line */}

                  <div className={`${index % 2 === 0 ? 'md:order-3' : 'md:order-1'}`}>
                    <h3 className="font-display text-xl font-semibold mb-1 group-hover:text-primary transition-colors">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values Grid ── */}
      <section className="section-shell bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: "Passion", desc: "We treat every fragrance as a crafted experience." },
              { icon: Lightbulb, title: "Innovation", desc: "Combining sensory science with modern diffusion." },
              { icon: Users, title: "Partnership", desc: "Building long-term relationships with brands." },
              { icon: Award, title: "Excellence", desc: "Holding every touchpoint to premium standards." },
            ].map((value, i) => (
              <AnimatedSection key={value.title} animation="fadeInUp" delay={i * 100}>
                <div className="bg-background rounded-2xl p-6 border border-border/40 hover:border-accent/30 hover:shadow-neo transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 text-accent">
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-shell">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="font-display text-3xl md:text-5xl font-semibold mb-6">Create your signature journey.</h2>
          <div className="flex justify-center gap-4">
            <Link to="/business/solutions">
              <Button size="lg" className="rounded-sm uppercase tracking-wider text-xs font-bold px-8 h-12 shadow-neo">
                Business Solutions
              </Button>
            </Link>
            <Link to="/shop">
              <Button variant="outline" size="lg" className="rounded-sm uppercase tracking-wider text-xs font-bold px-8 h-12">
                Shop Home
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

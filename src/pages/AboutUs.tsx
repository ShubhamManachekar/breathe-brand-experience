import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "@/components/AnimatedSection";
import { Heart, Users, Lightbulb, Award, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import PageMeta, { organizationSchema } from "@/components/PageMeta";

export default function AboutUs() {
  const timelineEvents = [
    {
      year: "1965",
      title: "Eze Perfumes Founded",
      description:
        "Eze Perfumes established with a commitment to fragrance innovation and excellence in perfumery artistry, setting the foundation for the legacy of EZE.",
    },
    {
      year: "1980s",
      title: "Sawai's Legacy Grows",
      description:
        "Sawai Fragrances developed their decades-spanning expertise in harvest-to-fragrance integration, building strong foundations of sustained relationships and becoming suppliers to market leaders.",
    },
    {
      year: "2015",
      title: "The Legacy United",
      description:
        "Two industry pioneers with complementary legacies joined forces to create the ultimate scent marketing solution.",
    },
    {
      year: "2018",
      title: "Innovation Breakthrough",
      description:
        "The legacy of EZE achieved what neither company could alone by combining premium aroma expertise with advanced diffusion technology.",
    },
    {
      year: "2020",
      title: "Global Expansion",
      description:
        "EZE Aircare's combined legacy launched internationally, bringing traditional fragrance artistry and modern diffusion systems worldwide.",
    },
    {
      year: "Today",
      title: "Living Legacy",
      description:
        "The legacy of EZE continues to exceed expectations for enterprise and premium spaces through a fusion of two industry legends.",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "We treat every fragrance as a crafted experience that should be felt, remembered, and trusted.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We combine sensory science and modern diffusion design to deliver better outcomes at scale.",
    },
    {
      icon: Users,
      title: "Partnership",
      description: "We build long-term relationships with businesses and teams that want distinct brand atmospheres.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "From formulation to service support, we hold every touchpoint to premium standards.",
    },
  ];

  return (
    <div className="min-h-screen bg-loom">
      <PageMeta
        title="About EZE AirCare - Our Story & Heritage"
        description="Discover the story behind EZE AirCare. A fusion of Sawai Fragrances' artisanal mastery and Eze Perfumes' innovation excellence, creating premium scent marketing solutions since 1965."
        keywords="EZE AirCare about, scent marketing company, fragrance innovation, Sawai Fragrances, Eze Perfumes, perfumery heritage"
        ogType="website"
        structuredData={organizationSchema}
      />

      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-grid-fade opacity-60" />
        <div className="container mx-auto px-6 relative">
          <AnimatedSection animation="fadeInUp" className="text-center max-w-4xl mx-auto">
            <Badge className="mb-5 rounded-full px-4 py-1.5 bg-accent/10 text-accent border-accent/20">
              Legacy & Craft
            </Badge>
            <h1 className="font-display text-4xl md:text-6xl leading-tight text-balance">
              A Heritage Built for
              <span className="block text-primary">Modern Scent Experiences</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              EZE AirCare is the union of deep perfumery heritage and forward-looking scent technology,
              shaping environments that are emotionally resonant and commercially effective.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fadeInScale" delay={120} className="mt-12 max-w-5xl mx-auto">
            <div className="surface-glass rounded-3xl p-8 md:p-12 border border-border/50 shadow-elegant">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
                <div>
                  <h2 className="font-display text-2xl md:text-3xl mb-4">The EZE Story</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Sawai Fragrances brought decades of harvest-to-fragrance mastery and enduring client
                    trust. Eze Perfumes brought a heritage of innovation dating back to 1965. Together,
                    they formed a single vision: make scent strategy measurable, scalable, and memorable.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Today, our teams design olfactory identities for hospitality, wellness, retail, and
                    corporate spaces, balancing classic perfumery artistry with contemporary deployment.
                  </p>
                </div>
                <Card className="bg-card/70 border-border/50">
                  <CardContent className="p-7 text-center">
                    <p className="text-5xl font-display text-primary mb-2">10K+</p>
                    <p className="font-medium">Spaces Transformed</p>
                    <p className="text-sm text-muted-foreground mt-2">Across enterprise and consumer-facing environments globally.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-18 sm:py-22">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="fadeInUp" className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl">Our Journey</h2>
          </AnimatedSection>
          <div className="max-w-5xl mx-auto space-y-4">
            {timelineEvents.map((event, index) => (
              <AnimatedSection key={event.year} animation="fadeInUp" delay={index * 80}>
                <div className="surface-glass rounded-2xl p-5 md:p-6 border border-border/50 grid md:grid-cols-[120px_1fr] gap-3 md:gap-6">
                  <p className="font-display text-2xl text-primary">{event.year}</p>
                  <div>
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <p className="text-muted-foreground mt-1 leading-relaxed">{event.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-18 sm:py-22">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="fadeInUp" className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl">What Drives Us</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} animation="fadeInScale" delay={index * 80}>
                <Card className="h-full border-border/50 bg-card/70 hover:-translate-y-0.5 transition-transform">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/15" />
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection animation="fadeInUp" className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-5xl">Let’s Create Your Signature Scent Journey</h2>
            <p className="mt-4 text-white/85 text-lg">
              Bring heritage-grade fragrance craft into your next brand experience.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/business/contact">
                <Button variant="secondary" size="lg" className="group">
                  Request a Strategy Call
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/business/solutions">
                <Button size="lg" className="bg-white/10 hover:bg-white/20 border border-white/25 text-white">
                  Explore Solutions
                </Button>
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-4 justify-center text-sm text-white/85">
              <span className="inline-flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> Enterprise ready</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> Segment-specific curation</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> Global deployment support</span>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ArrowRight } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import AnimatedSection from "@/components/AnimatedSection";
import { fragranceFamilies, fragrances, getFamilyForFragrance } from "@/data/aromaData";

const AromaLibrary = () => {
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFragrances = fragrances.filter((fragrance) => {
    const matchesFamily = !selectedFamily || fragrance.family === selectedFamily;
    const matchesSearch =
      !searchTerm ||
      fragrance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fragrance.notes.some((note) => note.toLowerCase().includes(searchTerm.toLowerCase())) ||
      fragrance.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFamily && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-loom overflow-hidden">
      <PageMeta
        title="Fragrance Library - Premium Aroma Collection"
        description="Explore EZE AirCare's curated fragrance library crafted for hospitality, retail, corporate, and wellness environments."
        keywords="fragrance library, aroma collection, commercial scents, ambient fragrances"
        ogType="website"
      />

      {/* Hero */}
      <section className="section-shell pt-28 relative">
        <div className="absolute inset-0 bg-grid-fade" />
        <div className="absolute -top-10 right-12 w-64 h-64 rounded-full bg-accent/15 blur-3xl animate-float-slower" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="pill-label justify-center mb-6">Fragrance library</div>
          <AnimatedSection animation="fadeInUp">
            <h1 className="font-display text-5xl md:text-6xl font-semibold text-foreground">
              Signature scents for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-glow">
                every brand moment.
              </span>
            </h1>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={150}>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-6">
              Explore fragrance families designed for hospitality, retail, corporate, and wellness environments.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-6 border-y border-border/40 bg-background/70 sticky top-16 z-30 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search fragrance notes or moods"
              className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant={selectedFamily === null ? "hero" : "ghost"} size="sm" onClick={() => setSelectedFamily(null)}>
              <Filter className="w-4 h-4 mr-1" /> All Families
            </Button>
            {fragranceFamilies.map((family) => (
              <Button
                key={family.id}
                variant={selectedFamily === family.id ? "hero" : "ghost"}
                size="sm"
                onClick={() => setSelectedFamily(family.id)}
              >
                <family.icon className="w-4 h-4 mr-1" /> {family.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Families */}
      <section className="section-shell">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-12">
            <div className="pill-label justify-center">Fragrance families</div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mt-4">Four curated moods.</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">Each family anchors a different emotional response and brand outcome.</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fragranceFamilies.map((family, index) => (
              <AnimatedSection key={family.id} animation="fadeInUp" delay={index * 120}>
                <Card className={`card-loom h-full ${selectedFamily === family.id ? "ring-2 ring-accent" : ""}`}>
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${family.bgColor} flex items-center justify-center mb-4`}>
                      <family.icon className={`w-6 h-6 ${family.color}`} />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground">{family.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{family.description}</p>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mt-4">{family.mood}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Fragrances */}
      <section className="section-shell">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">{selectedFamily ? getFamilyForFragrance(selectedFamily)?.name : "All Fragrances"}</h2>
            <p className="text-muted-foreground mt-2">{filteredFragrances.length} fragrance{filteredFragrances.length !== 1 ? "s" : ""}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFragrances.map((fragrance, index) => {
              const family = getFamilyForFragrance(fragrance.family);
              return (
                <AnimatedSection key={fragrance.id} animation="fadeInUp" delay={index * 100}>
                  <Card className="card-loom h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-muted-foreground">{fragrance.mood}</p>
                          <h3 className="font-display text-xl font-semibold text-foreground mt-2">{fragrance.name}</h3>
                        </div>
                        {family && <family.icon className={`w-5 h-5 ${family.color}`} />}
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">{fragrance.description}</p>
                      <div className="mt-4 flex flex-wrap gap-1">
                        {fragrance.notes.map((note) => (
                          <Badge key={note} variant="secondary" className="text-[10px]">
                            {note}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-4">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">Best for</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {fragrance.bestForBusiness.map((use) => (
                            <Badge key={use} variant="outline" className="text-[10px]">
                              {use}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="mt-5">
                        <Link to="/business/contact" state={{ interest: `Signature scent: ${fragrance.name}` }}>
                          <Button variant="outline" className="w-full">
                            Request sample
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-shell">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="surface-glass rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div className="pill-label mb-4">Custom blending</div>
              <h3 className="font-display text-3xl md:text-4xl font-semibold text-foreground">Need a signature scent?</h3>
              <p className="text-muted-foreground mt-3 max-w-xl">We craft bespoke blends that align with your brand story and environment.</p>
            </div>
            <Link to="/business/contact">
              <Button variant="hero" size="lg" className="group">
                Talk to a perfumer
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AromaLibrary;
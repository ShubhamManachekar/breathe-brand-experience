import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Filter, ArrowRight, Sparkles, FlaskConical, Droplets } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import AnimatedSection from "@/components/AnimatedSection";
import NeoHero from "@/components/NeoHero";
import { fragranceFamilies, fragrances, getFamilyForFragrance } from "@/data/aromaData";

const AromaLibrary = () => {
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    return fragrances.filter((fragrance) => {
      const matchesFamily = !selectedFamily || fragrance.family === selectedFamily;
      const matchesSearch =
        !searchTerm ||
        fragrance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fragrance.notes.some((note) => note.toLowerCase().includes(searchTerm.toLowerCase())) ||
        fragrance.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFamily && matchesSearch;
    });
  }, [selectedFamily, searchTerm]);

  return (
    <div className="min-h-screen bg-transparent overflow-hidden">
      <PageMeta
        title="Fragrance Library - Premium Aroma Collection"
        description="Explore EZE AirCare's curated fragrance library crafted for hospitality, retail, corporate, and wellness environments."
        keywords="fragrance library, aroma collection, commercial scents, ambient fragrances"
        ogType="website"
      />

      {/* ═══ Hero — same pattern as ShopAromas ═══ */}
      <NeoHero
        heroImage="https://images.unsplash.com/photo-1608571423902-ced4e5f3a475?w=1920&q=80&auto=format"
        label="Fragrance Library"
        headline={
          <>
            Signature scents for
            <span className="block text-gradient-animated">
              every brand moment.
            </span>
          </>
        }
        subheadline="Explore fragrance families designed for hospitality, retail, corporate, and wellness environments."
        variant="business"
        texture="loom"
      />

      {/* ═══ Filter Bar — matches Shop pill bar ═══ */}
      <section className="sticky top-20 z-40 py-6 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="bg-background/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-neo rounded-full p-1.5 flex flex-wrap gap-1 pointer-events-auto items-center">
            <Filter className="w-4 h-4 ml-3 mr-2 text-muted-foreground" />
            <Button
              variant={!selectedFamily ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedFamily(null)}
              className={`rounded-full px-4 h-9 ${!selectedFamily ? 'bg-foreground text-background hover:bg-foreground/90' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
            >
              All
            </Button>
            {fragranceFamilies.map((fam) => (
              <Button
                key={fam.id}
                variant={selectedFamily === fam.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedFamily(fam.id)}
                className={`rounded-full px-4 h-9 ${selectedFamily === fam.id ? 'bg-foreground text-background hover:bg-foreground/90' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
              >
                {fam.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Fragrance Grid — Shop-style tiles ═══ */}
      <section className="section-shell -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-muted-foreground">{filtered.length} fragrances found</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((aroma, index) => {
              const family = getFamilyForFragrance(aroma.family);

              return (
                <AnimatedSection key={aroma.id} animation="fadeInUp" delay={index * 80}>
                  <div className="group h-full bg-background rounded-[2rem] border border-border/40 hover:border-accent/30 shadow-sm hover:shadow-neo-hover transition-all duration-500 hover:-translate-y-2 flex flex-col overflow-hidden">

                    {/* Image Area — identical to Shop */}
                    <div className="relative aspect-square bg-muted/10 m-2 rounded-[1.5rem] overflow-hidden flex items-center justify-center">
                      <div className={`absolute inset-0 bg-gradient-to-tr ${family?.bgColor || 'from-gray-100 to-gray-50'} opacity-30`} />
                      <img src={aroma.image} alt={aroma.name} className="w-1/2 h-1/2 object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110" loading="lazy" />

                      <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-2 py-1 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-wider text-foreground">
                        {aroma.intensity}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 pt-2 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2 h-2 rounded-full ${family?.color.replace('text-', 'bg-')}`} />
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{family?.name}</span>
                      </div>

                      <h3 className="font-display text-lg font-semibold text-foreground mb-1">{aroma.name}</h3>
                      <p className="text-xs text-muted-foreground italic mb-3">"{aroma.mood}"</p>

                      {/* Notes Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {aroma.notes.map(note => (
                          <span key={note} className="text-[10px] bg-muted/30 px-2 py-1 rounded-md text-foreground/80 font-medium">
                            {note}
                          </span>
                        ))}
                      </div>

                      {/* Best For */}
                      <div className="mb-4">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">Best for</span>
                        <div className="flex flex-wrap gap-1">
                          {aroma.bestForBusiness.map((use) => (
                            <span key={use} className="text-[10px] border border-border/50 text-foreground/70 px-2 py-0.5 rounded-full font-medium">
                              {use}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA — Request Sample (Business) */}
                      <div className="mt-auto pt-4 border-t border-border/20">
                        <Link to="/business/contact" state={{ aromaId: aroma.id, productType: "oil" }}>
                          <Button variant="hero" className="w-full rounded-xl h-10 text-xs group/btn">
                            Request Sample
                            <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ Custom Blending CTA ═══ */}
      <section className="section-shell">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp">
            <div className="relative rounded-[2rem] overflow-hidden">
              <div className="absolute inset-0 gradient-hero" />
              <div className="absolute inset-0 bg-grid-fade opacity-10" />

              <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 text-white/90 text-xs font-bold uppercase tracking-wider mb-4">
                    <FlaskConical className="w-3 h-3" /> Custom Blending
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl font-semibold text-white">Need a signature scent?</h3>
                  <p className="text-white/70 mt-3 max-w-xl leading-relaxed">We craft bespoke blends that align with your brand story and environment.</p>
                </div>
                <Link to="/business/contact">
                  <Button size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 font-bold shadow-lg shadow-black/20 group">
                    Talk to a Perfumer
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default AromaLibrary;
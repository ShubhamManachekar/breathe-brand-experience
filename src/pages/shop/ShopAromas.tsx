import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, ShoppingCart, Star, Droplets, Wind, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { fragrances, fragranceFamilies, aromaSizes } from "@/data/aromaData";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import PageMeta from "@/components/PageMeta";
import NeoHero from "@/components/NeoHero";

const ShopAromas = () => {
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
  const { addItem } = useCart();
  const { toast } = useToast();

  const filtered = useMemo(() => {
    if (!selectedFamily) return fragrances;
    return fragrances.filter((f) => f.family === selectedFamily);
  }, [selectedFamily]);

  const handleAddToCart = (aroma: typeof fragrances[0]) => {
    addItem({
      id: `${aroma.id}-100ml`,
      name: aroma.name,
      type: "aroma",
      price: aromaSizes[0].price,
      variant: "100ml",
      image: aroma.image,
    });
    toast({
      title: "Added to Cart",
      description: (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
            <img src={aroma.image} alt={aroma.name} className="w-6 h-6 object-contain" />
          </div>
          <span>{aroma.name} (100ml) added.</span>
        </div>
      )
    });
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <PageMeta
        title="Aroma Oil Library | Shop Fragrances"
        description="Explore our collection of premium aroma oils. From calming Lavender to energizing Citrus, find the perfect scent for your space."
        keywords="aroma oils, essential oils, home fragrance, scent library"
        canonicalUrl="https://ezeaircare.com/shop/aromas"
        ogType="website"
      />

      <NeoHero
        label="Scent Library"
        headline={
          <>
            Curated
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent animate-shimmer bg-[length:200%_auto]">
              Moods.
            </span>
          </>
        }
        subheadline="Handcrafted fragrance blends designed to transform your environment. Clean, safe, and long-lasting."
        variant="shop"
        texture="loom"
      />

      {/* ── Filter Bar ── */}
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

      {/* ── Aroma Grid ── */}
      <section className="section-shell -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
             <p className="text-sm text-muted-foreground">{filtered.length} fragrances found</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((aroma, index) => {
              const family = fragranceFamilies.find(f => f.id === aroma.family);

              return (
                <AnimatedSection key={aroma.id} animation="fadeInUp" delay={index * 80}>
                  <div className="group h-full bg-background rounded-[2rem] border border-border/40 hover:border-accent/30 shadow-sm hover:shadow-neo-hover transition-all duration-500 hover:-translate-y-2 flex flex-col overflow-hidden">

                    <div className="relative aspect-square bg-muted/10 m-2 rounded-[1.5rem] overflow-hidden flex items-center justify-center">
                       <div className={`absolute inset-0 bg-gradient-to-tr ${family?.bgColor || 'from-gray-100 to-gray-50'} opacity-30`} />
                       <img src={aroma.image} alt={aroma.name} className="w-1/2 h-1/2 object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110" loading="lazy" />

                       <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-2 py-1 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-wider text-foreground">
                          {aroma.intensity}
                       </div>
                    </div>

                    <div className="p-5 pt-2 flex flex-col flex-1">
                       <div className="flex items-center gap-2 mb-1">
                          <span className={`w-2 h-2 rounded-full ${family?.color.replace('text-', 'bg-')}`} />
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{family?.name}</span>
                       </div>

                       <h3 className="font-display text-lg font-semibold text-foreground mb-1">{aroma.name}</h3>
                       <p className="text-xs text-muted-foreground italic mb-4">"{aroma.mood}"</p>

                       <div className="flex flex-wrap gap-1.5 mb-6">
                          {aroma.notes.map(note => (
                             <span key={note} className="text-[10px] bg-muted/30 px-2 py-1 rounded-md text-foreground/80 font-medium">
                                {note}
                             </span>
                          ))}
                       </div>

                       <div className="mt-auto pt-4 border-t border-border/20 flex items-center justify-between">
                          <div>
                             <span className="text-[10px] text-muted-foreground uppercase tracking-wide block">Starts at</span>
                             <span className="text-lg font-semibold text-foreground">₹{aromaSizes[0].price.toLocaleString("en-IN")}</span>
                          </div>
                          <Button
                             size="icon"
                             className="rounded-full h-10 w-10 bg-accent text-accent-foreground shadow-lg shadow-accent/20 hover:scale-105 transition-transform"
                             onClick={() => handleAddToCart(aroma)}
                          >
                             <ShoppingCart className="w-4 h-4" />
                          </Button>
                       </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopAromas;

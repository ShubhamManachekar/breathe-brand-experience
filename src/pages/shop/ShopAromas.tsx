import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Filter, Search } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import AnimatedSection from "@/components/AnimatedSection";
import { fragrances, fragranceFamilies, aromaSizes, getFamilyForFragrance } from "@/data/aromaData";
import PageMeta from "@/components/PageMeta";

const ShopAromas = () => {
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<Record<string, number>>({});
  const { addItem } = useCart();
  const { toast } = useToast();


  const filteredFragrances = fragrances.filter((f) => {
    const matchesFamily = !selectedFamily || f.family === selectedFamily;
    const matchesSearch =
      !searchTerm ||
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.notes.some((n) => n.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFamily && matchesSearch;
  });

  const getSizeIndex = (id: string) => selectedSizes[id] ?? 1;

  const handleAddToCart = (fragrance: typeof fragrances[0]) => {
    const sizeIdx = getSizeIndex(fragrance.id);
    const size = aromaSizes[sizeIdx];
    addItem({
      id: `${fragrance.id}-${size.label}`,
      name: fragrance.name,
      type: "aroma",
      price: size.price,
      variant: size.label,
    });
    toast({
      title: "Added to Cart!",
      description: `${fragrance.name} (${size.label}) added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-loom overflow-hidden">
      <PageMeta
        title="Shop Aroma Oils"
        description="Explore premium aroma oils by fragrance family, notes, and mood with flexible size options."
        keywords="aroma oils, fragrance families, scent notes, essential oils"
        canonicalUrl="https://ezeaircare.com/shop/aromas"
        ogType="product"
      />
      {/* Hero */}
      <section className="section-shell pt-32 relative">
        <div className="absolute inset-0 bg-grid-fade" />
        <div className="absolute -top-10 right-12 w-64 h-64 rounded-full bg-accent/15 blur-3xl animate-float-slower" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="pill-label justify-center mb-6">Aroma oils</div>
          <AnimatedSection animation="fadeInUp">
            <h1 className="font-display text-5xl md:text-6xl font-semibold text-foreground">
              Fragrances crafted for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-glow">
                modern rituals.
              </span>
            </h1>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={150}>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-6">
              Choose your mood and create a signature scent story for every room.
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
              placeholder="Search by name or note"
              className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant={selectedFamily === null ? "hero" : "ghost"} size="sm" onClick={() => setSelectedFamily(null)}>
              <Filter className="w-4 h-4 mr-1" /> All
            </Button>
            {fragranceFamilies.map((f) => (
              <Button key={f.id} variant={selectedFamily === f.id ? "hero" : "ghost"} size="sm" onClick={() => setSelectedFamily(f.id)}>
                <f.icon className="w-4 h-4 mr-1" /> {f.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-shell">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
              {selectedFamily ? getFamilyForFragrance(selectedFamily)?.name : "All Fragrances"}
            </h2>
            <p className="text-muted-foreground mt-2">{filteredFragrances.length} fragrance{filteredFragrances.length !== 1 ? "s" : ""}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFragrances.map((fragrance, index) => {
              const family = getFamilyForFragrance(fragrance.family);
              const sizeIdx = getSizeIndex(fragrance.id);
              const currentSize = aromaSizes[sizeIdx];

              return (
                <AnimatedSection key={fragrance.id} animation="fadeInUp" delay={index * 80}>
                  <Card className="card-loom h-full">
                    <div className="h-40 border-b border-border/40 bg-muted/25">
                      <img src={fragrance.image} alt={fragrance.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-muted-foreground">{fragrance.mood}</p>
                          <h3 className="font-display text-lg font-semibold text-foreground mt-2">{fragrance.name}</h3>
                        </div>
                        {family && <family.icon className={`w-5 h-5 ${family.color}`} />}
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">{fragrance.description}</p>

                      <div className="mt-4 flex flex-wrap gap-1">
                        {fragrance.notes.map((n) => (
                          <Badge key={n} variant="secondary" className="text-[10px]">
                            {n}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-4">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">Perfect for</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {fragrance.bestForHome.map((u) => (
                            <Badge key={u} variant="outline" className="text-[10px]">
                              {u}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">Select size</p>
                        <div className="flex gap-2 mt-2">
                          {aromaSizes.map((s, i) => (
                            <button
                              key={s.label}
                              onClick={() => setSelectedSizes((prev) => ({ ...prev, [fragrance.id]: i }))}
                              className={`flex-1 text-center py-1.5 rounded-lg border text-xs font-medium transition-all ${sizeIdx === i ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:border-accent/30"
                                }`}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/40">
                        <span className="text-lg font-semibold text-foreground">INR {currentSize.price.toLocaleString("en-IN")}</span>
                        <Button variant="hero" size="sm" onClick={() => handleAddToCart(fragrance)}>
                          <ShoppingCart className="w-4 h-4 mr-1" /> Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
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
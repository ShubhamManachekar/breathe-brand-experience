import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, ArrowRight, Check, Filter, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { products, productCategories, type ProductCategory } from "@/data/productData";
import PageMeta from "@/components/PageMeta";
import NeoHero from "@/components/NeoHero";

const ShopProducts = () => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") as ProductCategory | null;

  const filtered = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const setCategory = (cat: ProductCategory | null) => {
    if (cat) setSearchParams({ category: cat });
    else setSearchParams({});
  };

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      model: product.model,
      type: "diffuser",
      price: product.price,
      image: product.image,
    });
    toast({
      title: "Added to Cart",
      description: (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
            <img src={product.image} alt={product.name} className="w-6 h-6 object-contain" />
          </div>
          <span>{product.name} added.</span>
        </div>
      )
    });
  };

  const currentCatInfo = selectedCategory
    ? productCategories.find((c) => c.id === selectedCategory)
    : null;

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <PageMeta
        title="Shop Diffuser Collection"
        description="Browse cold-air, ultrasonic, reed, car, and essential oil diffuser collections for every room and mood."
        keywords="diffuser collection, shop products, home scent devices, cold-air diffusers"
        canonicalUrl="https://ezeaircare.com/shop/products"
        ogType="product"
      />

      {/* ── Neo Hero ── */}
      <NeoHero
        label="The Collection"
        headline={
          <>
            {currentCatInfo ? currentCatInfo.name : "Curated Scentscapes"}
          </>
        }
        subheadline={currentCatInfo?.description || "From smart cold-air systems for large living spaces to intimate reed diffusers for your sanctuary."}
        variant="shop"
        texture="smoke"
      />

      {/* ── Floating Filter Bar ── */}
      <section className="sticky top-20 z-40 py-6 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="bg-background/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-neo rounded-full p-1.5 flex flex-wrap gap-1 pointer-events-auto">
            <Button
              variant={!selectedCategory ? "default" : "ghost"}
              size="sm"
              onClick={() => setCategory(null)}
              className={`rounded-full px-4 h-9 ${!selectedCategory ? 'bg-foreground text-background hover:bg-foreground/90' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
            >
              All
            </Button>
            {productCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <Button
                  key={cat.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCategory(cat.id)}
                  className={`rounded-full px-4 h-9 ${isActive ? 'bg-foreground text-background hover:bg-foreground/90' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
                >
                  <span className="mr-2">{cat.icon}</span> {cat.name}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="section-shell -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
             <p className="text-sm text-muted-foreground">{filtered.length} products found</p>
             <div className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer hover:text-accent transition-colors">
                <span>Sort by: Featured</span>
                <Filter className="w-4 h-4" />
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map((product, index) => {
              const cat = productCategories.find((c) => c.id === product.category);
              return (
                <AnimatedSection key={product.id} animation="fadeInUp" delay={index * 80}>
                  <div className="group relative bg-background rounded-[2rem] border border-border/40 hover:border-accent/30 shadow-sm hover:shadow-neo-hover transition-all duration-500 hover:-translate-y-2 flex flex-col h-full overflow-hidden">

                    {/* Image Area */}
                    <Link to={`/shop/products/${product.model}`} className="block relative aspect-square bg-muted/10 m-2 rounded-[1.5rem] overflow-hidden">
                       <div className="absolute inset-0 flex items-center justify-center p-8 group-hover:scale-110 transition-transform duration-700 ease-out">
                          <img src={product.image} alt={product.name} className="w-full h-full object-contain drop-shadow-xl" loading="lazy" />
                       </div>

                       {/* Tags */}
                       <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                          {product.tag && (
                            <span className="bg-background/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-foreground border border-border/20 shadow-sm">
                              {product.tag}
                            </span>
                          )}
                          <div className="w-8 h-8 rounded-full bg-background/90 backdrop-blur-md flex items-center justify-center shadow-sm text-xs font-bold text-foreground">
                             {product.rating}
                          </div>
                       </div>

                       {/* Quick Add Overlay */}
                       <div className="absolute inset-x-4 bottom-4 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-300 z-10">
                          <Button className="w-full rounded-full shadow-lg bg-foreground text-background hover:bg-foreground/90 h-10 text-xs font-bold uppercase tracking-wide" onClick={(e) => {
                             e.preventDefault();
                             handleAddToCart(product);
                          }}>
                             Quick Add
                          </Button>
                       </div>
                    </Link>

                    {/* Details */}
                    <div className="p-5 pt-2 flex flex-col flex-1">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                        <span>{cat?.name}</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                        <span>{product.model}</span>
                      </div>

                      <Link to={`/shop/products/${product.model}`}>
                        <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors">{product.name}</h3>
                      </Link>

                      <div className="mt-3 space-y-1">
                        {product.features.slice(0, 2).map((f) => (
                          <div key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Check className="w-3 h-3 text-accent/70" />
                            {f}
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto pt-4 flex items-end justify-between border-t border-border/20">
                        <div>
                           <span className="text-[10px] text-muted-foreground uppercase tracking-wide block">Price</span>
                           <span className="text-lg font-semibold text-foreground">₹{product.price.toLocaleString("en-IN")}</span>
                        </div>
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent/10 hover:text-accent transition-colors -mr-2" onClick={() => handleAddToCart(product)}>
                           <ShoppingCart className="w-5 h-5" />
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

      {/* ── Complete the Set CTA ── */}
      <section className="section-shell">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[2.5rem] bg-accent/5 overflow-hidden border border-accent/10 p-10 md:p-16 text-center">
             <div className="absolute inset-0 bg-grid-fade opacity-30" />
             <Sparkles className="w-12 h-12 text-accent mx-auto mb-6 animate-pulse-gold" />
             <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">Complete the ritual.</h2>
             <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
               Pair your new diffuser with our handcrafted aroma oils, designed for calm, focus, and joy.
             </p>
             <Link to="/shop/aromas">
                <Button size="lg" className="rounded-full px-8 h-12 shadow-neo hover:translate-y-[-2px] transition-transform">
                   Shop Aroma Oils
                   <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopProducts;

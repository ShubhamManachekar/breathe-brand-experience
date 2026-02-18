import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, ArrowRight, Check, Filter } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { products, productCategories, type ProductCategory } from "@/data/productData";
import PageMeta from "@/components/PageMeta";

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
    toast({ title: "Added to Cart!", description: `${product.name} has been added to your cart.` });
  };

  const currentCatInfo = selectedCategory
    ? productCategories.find((c) => c.id === selectedCategory)
    : null;


  return (
    <div className="min-h-screen bg-loom overflow-hidden">
      <PageMeta
        title="Shop Diffuser Collection"
        description="Browse cold-air, ultrasonic, reed, car, and essential oil diffuser collections for every room and mood."
        keywords="diffuser collection, shop products, home scent devices, cold-air diffusers"
        canonicalUrl="https://ezeaircare.com/shop/products"
        ogType="product"
      />
      {/* Hero */}
      <section className="section-shell pt-32 relative">
        <div className="absolute inset-0 bg-grid-fade" />
        <div className="absolute -top-10 right-12 w-64 h-64 rounded-full bg-accent/15 blur-3xl animate-float-slower" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="pill-label justify-center mb-6">Shop diffusers</div>
          <AnimatedSection animation="fadeInUp">
            <h1 className="font-display text-5xl md:text-6xl font-semibold text-foreground">
              {currentCatInfo ? currentCatInfo.name : "All Diffusers"}
            </h1>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={150}>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-6">
              {currentCatInfo?.description || "Curated home scenting—from reed diffusers to smart cold-air systems."}
            </p>
          </AnimatedSection>
        </div>
      </section>


      {/* Category Filter */}
      <section className="py-5 border-y border-border/40 bg-background/70 sticky top-16 z-30 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-2">
          <Button variant={!selectedCategory ? "hero" : "ghost"} size="sm" onClick={() => setCategory(null)}>
            <Filter className="w-4 h-4 mr-1" /> All ({products.length})
          </Button>
          {productCategories.map((cat) => {
            const count = products.filter((p) => p.category === cat.id).length;
            return (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "hero" : "ghost"}
                size="sm"
                onClick={() => setCategory(cat.id)}
              >
                <span className="mr-1">{cat.icon}</span> {cat.name} ({count})
              </Button>
            );
          })}
        </div>
      </section>

      {/* Product Grid */}
      <section className="section-shell">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">{currentCatInfo ? currentCatInfo.name : "All Products"}</h2>
            <p className="text-muted-foreground mt-2">{filtered.length} product{filtered.length !== 1 ? "s" : ""}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, index) => {
              const cat = productCategories.find((c) => c.id === product.category);
              return (
                <AnimatedSection key={product.id} animation="fadeInUp" delay={index * 80}>
                  <Card className="card-loom h-full overflow-hidden flex flex-col">
                    <div className="relative shrink-0">
                      {product.tag && (
                        <div className="absolute top-4 right-4 text-[10px] uppercase tracking-widest bg-foreground text-background px-2 py-1 rounded-full">
                          {product.tag}
                        </div>
                      )}
                      <div className="aspect-square bg-muted/30 rounded-2xl m-4 overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    </div>
                    <CardContent className="p-6 pt-2 flex flex-col flex-1">
                      <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                        <span>{cat?.icon}</span>
                        <span>{cat?.name}</span>
                      </div>
                      <h3 className="font-display text-lg font-semibold text-foreground text-center mt-2">{product.name}</h3>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground text-center">{product.model}</p>

                      <div className="flex items-center justify-center gap-1.5 mt-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-accent fill-accent" : "text-muted-foreground/30"}`} />
                        ))}
                        <span className="text-[10px] text-muted-foreground">{product.rating} ({product.reviews})</span>
                      </div>

                      <p className="text-xs text-muted-foreground text-center mt-3 line-clamp-2">{product.description}</p>
                      <div className="mt-4 space-y-1">
                        {product.features.slice(0, 2).map((f) => (
                          <div key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Check className="w-3 h-3 text-accent" />
                            {f}
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto pt-4 space-y-2">
                        <div className="text-center text-xl font-semibold text-foreground">INR {product.price.toLocaleString("en-IN")}</div>
                        <Button className="w-full" variant="hero" size="sm" onClick={() => handleAddToCart(product)}>
                          <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                        </Button>
                        <Link to={`/shop/products/${product.model}`}>
                          <Button className="w-full" variant="outline" size="sm">
                            View Details
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
              <div className="pill-label mb-4">Complete the ritual</div>
              <h3 className="font-display text-3xl md:text-4xl font-semibold text-foreground">Pair your diffuser with aroma oils.</h3>
              <p className="text-muted-foreground mt-3 max-w-xl">Choose fragrances crafted for calm mornings and cozy evenings.</p>
            </div>
            <Link to="/shop/aromas">
              <Button variant="hero" size="lg" className="group">
                Browse aroma oils
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopProducts;
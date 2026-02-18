import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Star,
  ShieldCheck,
  Truck,
  Leaf,
  Wind,
  Droplets,
} from "lucide-react";
import { aromaSizes } from "@/data/aromaData";
import AnimatedSection from "@/components/AnimatedSection";
import { products } from "@/data/productData";
import { fragranceFamilies, fragrances } from "@/data/aromaData";
import PageMeta from "@/components/PageMeta";

/* ── Decorative Divider ────────────────────────────────────── */
const SectionDivider = () => (
  <div className="flex items-center justify-center py-10 opacity-50">
    <div className="h-px w-28 bg-gradient-to-r from-transparent via-accent to-transparent" />
    <span className="mx-5 text-accent font-display text-xl select-none">✦</span>
    <div className="h-px w-28 bg-gradient-to-r from-transparent via-accent to-transparent" />
  </div>
);

const ShopHome = () => {
  const featured = products.filter((p) => p.category === "cold-air").slice(0, 3);
  const spotlight = fragrances.slice(0, 4);

  /* Carousel data */
  const diffuserProducts = products.filter((p) => !p.category.includes("oil"));
  const aromaOils = fragrances;

  return (
    <div className="overflow-hidden bg-loom">
      <PageMeta
        title="Shop Home Diffusers & Aroma Oils"
        description="Discover premium home diffusers and curated aroma oils designed for modern daily rituals."
        keywords="shop diffusers, home fragrance, aroma oils, scent rituals"
        canonicalUrl="https://ezeaircare.com/shop"
        ogType="website"
      />

      {/* ═══════════ HERO ═══════════ */}
      <section className="section-shell pt-32 relative bg-oil-texture">
        <div className="absolute inset-0 bg-grid-fade" />
        <div className="absolute inset-0 bg-smoke-texture opacity-75" />
        <div className="absolute inset-0 bg-sparkle-texture opacity-45" />
        <div className="absolute -top-10 right-10 w-56 h-56 rounded-full bg-accent/20 blur-3xl animate-float-slower" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-float-slow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div>
              <div className="pill-label mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Home Collection
              </div>
              <AnimatedSection animation="fadeInUp">
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-foreground leading-[1.05]">
                  A modern ritual
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-glow">
                    for every room.
                  </span>
                </h1>
              </AnimatedSection>
              <AnimatedSection animation="fadeInUp" delay={150}>
                <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl">
                  Curated diffusers and aroma oils inspired by Indian perfumery.
                  Designed for calm mornings, cozy evenings, and everything in between.
                </p>
              </AnimatedSection>
              <AnimatedSection animation="fadeInUp" delay={300}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/shop/products">
                    <Button variant="hero" size="lg" className="group">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Shop Diffusers
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/shop/aromas">
                    <Button variant="outline" size="lg" className="group">
                      Explore Aroma Oils
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </AnimatedSection>
              <AnimatedSection animation="fadeInUp" delay={450}>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  {[
                    { icon: Truck, label: "Free shipping above INR 2000" },
                    { icon: ShieldCheck, label: "2-year diffuser warranty" },
                    { icon: Leaf, label: "Clean, IFRA-safe oils" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 card-clay-sm px-4 py-3">
                      <item.icon className="w-4 h-4 text-accent" />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection animation="fadeInUp" delay={200}>
              <div className="grid gap-6">
                {featured.map((product, idx) => (
                  <Card key={product.id} className="card-clay overflow-hidden">
                    <CardContent className="p-5 flex items-center gap-5">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden surface-sunken">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          loading={idx === 0 ? "eager" : "lazy"}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-display text-lg font-semibold text-foreground">{product.name}</h3>
                          {product.tag && (
                            <span className="pill-gold text-[9px] font-bold uppercase tracking-wider px-2 py-0.5">
                              {product.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{product.coverage}</p>
                      </div>
                      <Link to={`/shop/products/${product.model}`}>
                        <Button variant="ghost" size="sm" className="group">
                          View
                          <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════ DIFFUSER CAROUSEL — Forward Marquee ═══════════ */}
      <section className="section-shell overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <AnimatedSection animation="fadeInUp">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl gradient-gold shadow-clay-sm flex items-center justify-center">
                <Wind className="w-5 h-5 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-3xl font-semibold text-foreground">Premium Diffusers</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Auto-scrolling showcase of our full range</p>
              </div>
              <Link to="/shop/products" className="hidden sm:inline-flex">
                <Button variant="outline" size="sm" className="group">
                  View All
                  <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>

        <div className="relative flex overflow-x-hidden group">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

          <div className="flex animate-marquee gap-6 group-hover:[animation-play-state:paused] py-6 px-4">
            {[...diffuserProducts, ...diffuserProducts].map((product, i) => (
              <Link to={`/shop/products/${product.model}`} key={`d-${product.id}-${i}`} className="shrink-0">
                <div className="w-72 card-clay p-5 cursor-pointer">
                  <div className="aspect-square surface-sunken rounded-2xl mb-4 overflow-hidden flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="font-display text-base font-semibold text-foreground truncate">{product.name}</h4>
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mt-0.5">{product.model}</p>
                    </div>
                    {product.tag && (
                      <span className="pill-gold text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 shrink-0 mt-0.5">
                        {product.tag}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 pt-3 border-t border-border/30 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-muted-foreground">from</span>
                      <span className="text-lg font-semibold text-foreground ml-1.5">₹{product.price.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                      {product.rating}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ AROMA OIL CAROUSEL — Reverse Marquee ═══════════ */}
      <section className="section-shell overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <AnimatedSection animation="fadeInUp">
            <div className="flex items-center gap-4 flex-row-reverse text-right">
              <div className="w-11 h-11 rounded-2xl gradient-gold shadow-clay-sm flex items-center justify-center">
                <Droplets className="w-5 h-5 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-3xl font-semibold text-foreground">Aroma Oils</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Handcrafted fragrances for every mood</p>
              </div>
              <Link to="/shop/aromas" className="hidden sm:inline-flex">
                <Button variant="outline" size="sm" className="group">
                  Explore All
                  <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>

        <div className="relative flex overflow-x-hidden group">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

          <div className="flex animate-marquee-reverse gap-6 group-hover:[animation-play-state:paused] py-6 px-4">
            {[...aromaOils, ...aromaOils].map((oil, i) => (
              <Link to="/shop/aromas" key={`a-${oil.id}-${i}`} className="shrink-0">
                <div className="w-72 card-clay p-5 cursor-pointer">
                  <div className="aspect-square surface-sunken rounded-2xl mb-4 overflow-hidden flex items-center justify-center relative">
                    <img
                      src={oil.image}
                      alt={oil.name}
                      className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2 right-2">
                      <span className="pill-raised text-[9px] font-semibold px-2.5 py-1 text-muted-foreground">
                        {oil.intensity}
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-display text-base font-semibold text-foreground truncate">{oil.name}</h4>
                    <p className="text-xs text-muted-foreground italic mt-0.5">{oil.mood}</p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {oil.notes.slice(0, 3).map((note) => (
                      <span key={note} className="pill-raised text-[10px] font-medium px-2.5 py-0.5 text-muted-foreground">
                        {note}
                      </span>
                    ))}
                    {oil.notes.length > 3 && (
                      <span className="text-[10px] text-muted-foreground/60 self-center ml-1">+{oil.notes.length - 3}</span>
                    )}
                  </div>
                  <div className="mt-3 pt-3 border-t border-border/30 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-muted-foreground">from</span>
                      <span className="text-lg font-semibold text-foreground ml-1.5">₹{aromaSizes[0].price.toLocaleString("en-IN")}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{aromaSizes[0].label}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════ FEATURED COLLECTION ═══════════ */}
      <section className="section-shell">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div>
              <div className="pill-label mb-4">Featured Collection</div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground">Diffusers made to be seen.</h2>
            </div>
            <Link to="/shop/products">
              <Button variant="outline" className="group">
                View all products
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product, idx) => (
              <AnimatedSection key={product.id} animation="fadeInUp" delay={idx * 120}>
                <Card className="card-clay h-full overflow-hidden">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="rounded-2xl overflow-hidden surface-sunken mb-6 flex items-center justify-center">
                      <img src={product.image} alt={product.name} className="w-full h-52 object-contain p-4" loading="lazy" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-display text-2xl font-semibold text-foreground">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.coverage}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">from</div>
                        <div className="text-lg font-semibold text-foreground">INR {product.price.toLocaleString("en-IN")}</div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      {product.rating} ({product.reviews} reviews)
                    </div>
                    {product.tag && (
                      <div className="mt-3">
                        <span className="pill-gold text-[9px] font-bold uppercase tracking-wider px-2.5 py-1">
                          {product.tag}
                        </span>
                      </div>
                    )}
                    <div className="mt-auto pt-6">
                      <Link to={`/shop/products/${product.model}`}>
                        <Button variant="hero" className="w-full group">
                          Explore {product.model}
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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

      <SectionDivider />

      {/* ═══════════ SCENT DISCOVERY ═══════════ */}
      <section className="section-shell">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-12">
            <div className="pill-label justify-center">Scent Discovery</div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mt-4">Find your fragrance family.</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Explore scent moods crafted for rituals, routines, and curated spaces.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fragranceFamilies.map((family, idx) => (
              <AnimatedSection key={family.id} animation="fadeInUp" delay={idx * 120}>
                <Card className="card-clay h-full">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${family.bgColor} flex items-center justify-center mb-4 shadow-clay-sm`}>
                      <family.icon className={`w-6 h-6 ${family.color}`} />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground">{family.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{family.description}</p>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mt-4 pill-raised inline-block px-3 py-1">{family.mood}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {spotlight.map((scent, idx) => (
              <AnimatedSection key={scent.id} animation="fadeInUp" delay={idx * 90}>
                <Card className="card-clay-sm h-full">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl surface-sunken overflow-hidden flex items-center justify-center">
                        <img src={scent.image} alt={scent.name} className="w-full h-full object-contain p-1" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-display text-base font-semibold text-foreground truncate">{scent.name}</h4>
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{scent.mood}</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{scent.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {scent.notes.slice(0, 2).map((note) => (
                        <span key={note} className="pill-raised text-[9px] font-medium px-2 py-0.5 text-muted-foreground">{note}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="section-shell">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp">
            <div className="card-clay rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden">
              {/* Decorative accent strip */}
              <div className="absolute top-0 left-0 right-0 h-1 gradient-gold" />
              <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="pill-label mb-4">Scent Concierge</div>
                <h3 className="font-display text-3xl md:text-4xl font-semibold text-foreground">Need help choosing?</h3>
                <p className="text-muted-foreground mt-3 max-w-xl">
                  Tell us your space and mood. We will curate a personalized diffuser and oil pairing.
                </p>
              </div>
              <Link to="/shop/contact" className="relative z-10 shrink-0">
                <Button variant="hero" size="lg" className="group shadow-clay-sm">
                  Talk to a consultant
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default ShopHome;
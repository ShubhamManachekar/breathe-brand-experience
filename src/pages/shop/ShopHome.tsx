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
import ParticleField from "@/components/ParticleField";
import NeoHero from "@/components/NeoHero";
import heroShopHome from "@/assets/hero-shop-home.jpg";

/* ── Decorative Divider ────────────────────────────────────── */
const SectionDivider = () => (
  <div className="flex items-center justify-center py-10 opacity-50">
    <div className="h-px w-28 bg-gradient-to-r from-transparent via-accent to-transparent" />
    <span className="mx-5 text-accent font-display text-xl select-none animate-pulse-gold">✦</span>
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
    <div className="overflow-hidden bg-background">
      <PageMeta
        title="Shop Home Diffusers & Aroma Oils"
        description="Discover premium home diffusers and curated aroma oils designed for modern daily rituals."
        keywords="shop diffusers, home fragrance, aroma oils, scent rituals"
        canonicalUrl="https://ezeaircare.com/shop"
        ogType="website"
      />

      {/* ═══════════ NEO HERO ═══════════ */}
      <NeoHero
        label="Home Collection"
        headline={
          <>
            A modern ritual
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent animate-shimmer bg-[length:200%_auto]">
              for every room.
            </span>
          </>
        }
        subheadline="Curated diffusers and aroma oils inspired by Indian perfumery. Designed for calm mornings, cozy evenings, and everything in between."
        actions={
          <>
            <Link to="/shop/products">
              <Button size="lg" className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-8 h-12 shadow-neo hover:translate-y-[-2px] transition-all">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Shop Diffusers
              </Button>
            </Link>
            <Link to="/shop/aromas">
              <Button variant="outline" size="lg" className="rounded-full border-foreground/20 hover:bg-foreground/5 px-8 h-12">
                Explore Oils
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </>
        }
        variant="shop"
        texture="loom"
        heroImage={heroShopHome}
        heroImageAlt="Home diffuser lifestyle"
      >
        <div className="relative z-10 w-full h-full min-h-[340px] sm:min-h-[400px] flex items-center justify-center">
           <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-primary/10 rounded-full blur-3xl animate-float-slow" />
           <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-3 sm:space-y-4 pt-10 sm:pt-12">
                 <div className="w-32 h-40 sm:w-40 sm:h-48 bg-background/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-neo p-3 sm:p-4 rotate-[-6deg] hover:rotate-0 transition-transform duration-500 hover:scale-105 cursor-pointer">
                    <img src={featured[0]?.image} alt="Diffuser" className="w-full h-full object-contain" />
                 </div>
                 <div className="w-24 h-24 sm:w-32 sm:h-32 bg-background/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-neo p-2 sm:p-3 translate-x-6 sm:translate-x-8 hover:scale-105 transition-transform duration-500">
                    <img src={spotlight[0]?.image} alt="Oil" className="w-full h-full object-contain" />
                 </div>
              </div>
              <div className="space-y-3 sm:space-y-4">
                 <div className="w-28 h-28 sm:w-36 sm:h-36 bg-background/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-neo p-3 sm:p-4 translate-y-6 sm:translate-y-8 hover:scale-105 transition-transform duration-500">
                    <img src={spotlight[1]?.image} alt="Oil" className="w-full h-full object-contain" />
                 </div>
                 <div className="w-36 h-44 sm:w-44 sm:h-56 bg-background/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-neo p-3 sm:p-4 rotate-[4deg] hover:rotate-0 transition-transform duration-500 hover:scale-105 cursor-pointer">
                    <img src={featured[1]?.image} alt="Diffuser" className="w-full h-full object-contain" />
                 </div>
              </div>
           </div>
        </div>
      </NeoHero>

      {/* ═══════════ TRUST PILLS ═══════════ */}
      <section className="py-8 bg-muted/10 border-b border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              {[
                { icon: Truck, label: "Free shipping > ₹2000" },
                { icon: ShieldCheck, label: "2-year warranty" },
                { icon: Leaf, label: "Clean, IFRA-safe oils" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 text-sm text-muted-foreground font-medium bg-background/50 px-4 py-2 rounded-full border border-border/40 shadow-sm">
                  <item.icon className="w-4 h-4 text-accent" />
                  <span>{item.label}</span>
                </div>
              ))}
           </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════ DIFFUSER CAROUSEL ═══════════ */}
      <section className="section-shell overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <AnimatedSection animation="fadeInUp">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <Wind className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-3xl font-semibold text-foreground">Premium Diffusers</h2>
                <p className="text-sm text-muted-foreground mt-1">Auto-scrolling showcase of our full range</p>
              </div>
              <Link to="/shop/products" className="hidden sm:inline-flex">
                <Button variant="outline" className="rounded-full">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>

        <div className="relative flex overflow-x-hidden group">
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

          <div className="flex animate-marquee gap-8 group-hover:[animation-play-state:paused] py-10 px-4">
            {[...diffuserProducts, ...diffuserProducts].map((product, i) => (
              <Link to={`/shop/products/${product.model}`} key={`d-${product.id}-${i}`} className="shrink-0">
                <div className="w-72 bg-background rounded-3xl p-5 border border-border/40 hover:border-accent/30 shadow-neo hover:shadow-neo-hover transition-all duration-500 hover:-translate-y-2 cursor-pointer group/card">
                  <div className="aspect-square bg-muted/20 rounded-2xl mb-5 overflow-hidden flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover/card:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="font-display text-lg font-semibold text-foreground truncate">{product.name}</h4>
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mt-1">{product.model}</p>
                    </div>
                    {product.tag && (
                      <span className="bg-foreground text-background text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shrink-0">
                        {product.tag}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border/20 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-muted-foreground">from</span>
                      <span className="text-lg font-semibold text-foreground ml-1.5">₹{product.price.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 text-accent fill-accent" />
                      {product.rating}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ AROMA OIL CAROUSEL ═══════════ */}
      <section className="section-shell overflow-hidden bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <AnimatedSection animation="fadeInUp">
            <div className="flex items-center gap-4 flex-row-reverse text-right">
              <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg shadow-accent/20">
                <Droplets className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-3xl font-semibold text-foreground">Aroma Oils</h2>
                <p className="text-sm text-muted-foreground mt-1">Handcrafted fragrances for every mood</p>
              </div>
              <Link to="/shop/aromas" className="hidden sm:inline-flex">
                <Button variant="outline" className="rounded-full">
                  Explore All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>

        <div className="relative flex overflow-x-hidden group">
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

          <div className="flex animate-marquee-reverse gap-8 group-hover:[animation-play-state:paused] py-10 px-4">
            {[...aromaOils, ...aromaOils].map((oil, i) => (
              <Link to="/shop/aromas" key={`a-${oil.id}-${i}`} className="shrink-0">
                <div className="w-72 bg-background rounded-3xl p-5 border border-border/40 hover:border-accent/30 shadow-neo hover:shadow-neo-hover transition-all duration-500 hover:-translate-y-2 cursor-pointer group/card">
                  <div className="aspect-square bg-muted/20 rounded-2xl mb-5 overflow-hidden flex items-center justify-center relative">
                    <img
                      src={oil.image}
                      alt={oil.name}
                      className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover/card:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute bottom-3 right-3">
                      <span className="bg-background/80 backdrop-blur-md text-[10px] font-semibold px-2.5 py-1 rounded-full text-foreground border border-border/20 shadow-sm">
                        {oil.intensity}
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-display text-lg font-semibold text-foreground truncate">{oil.name}</h4>
                    <p className="text-xs text-muted-foreground italic mt-1">{oil.mood}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {oil.notes.slice(0, 3).map((note) => (
                      <span key={note} className="bg-muted/40 text-[10px] font-medium px-2.5 py-1 rounded-full text-muted-foreground border border-border/20">
                        {note}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border/20 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-muted-foreground">from</span>
                      <span className="text-lg font-semibold text-foreground ml-1.5">₹{aromaSizes[0].price.toLocaleString("en-IN")}</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">{aromaSizes[0].label}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════ SCENT DISCOVERY ═══════════ */}
      <section className="section-shell">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <span className="text-accent font-bold text-xs uppercase tracking-[0.2em] mb-3 block">Curated Moods</span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground">Find your fragrance family.</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Explore scent moods crafted for rituals, routines, and curated spaces.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fragranceFamilies.map((family, idx) => (
              <AnimatedSection key={family.id} animation="fadeInUp" delay={idx * 120}>
                <div className="h-full bg-background rounded-3xl p-8 border border-border/40 hover:border-accent/30 transition-all duration-300 hover:shadow-neo-hover group">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${family.bgColor} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                    <family.icon className={`w-7 h-7 ${family.color}`} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">{family.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{family.description}</p>
                  <span className="text-[10px] uppercase tracking-widest text-accent font-bold bg-accent/5 px-3 py-1 rounded-full">{family.mood}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="section-shell">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp">
            <div className="bg-foreground text-background rounded-[2rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <div className="relative z-10 max-w-lg text-center md:text-left">
                <span className="inline-block py-1 px-3 rounded-full border border-background/20 text-background/80 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Scent Concierge</span>
                <h3 className="font-display text-3xl md:text-5xl font-semibold mb-6">Need help choosing?</h3>
                <p className="text-background/70 text-lg leading-relaxed">
                  Tell us your space and mood. We will curate a personalized diffuser and oil pairing just for you.
                </p>
              </div>
              <Link to="/shop/contact" className="relative z-10 shrink-0">
                <Button size="lg" className="bg-background text-foreground hover:bg-white rounded-full px-8 h-14 text-base font-semibold shadow-xl hover:scale-105 transition-all">
                  Talk to a consultant
                  <ArrowRight className="w-5 h-5 ml-2" />
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

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Send, CheckCircle, ArrowRight, Plus, Minus, Wind, Droplets, X, Sparkles } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import PageMeta from "@/components/PageMeta";
import AnimatedSection from "@/components/AnimatedSection";
import NeoHero from "@/components/NeoHero";
import { products, type Product } from "@/data/productData";
import { fragrances, type Fragrance, getFamilyForFragrance } from "@/data/aromaData";
import { getRecommendedOils, getDiffusersForOil } from "@/data/recommendations";

/* ── Types for smart state ──────────────────────────────────── */
interface BundleItem {
  type: "diffuser" | "oil";
  id: string;
  name: string;
  image: string;
  detail: string;        // coverage or intensity
  qty: number;
}

const ContactQuote = () => {
  const location = useLocation();
  const state = location.state as {
    productId?: string;
    aromaId?: string;
    productType?: "diffuser" | "oil";
    interest?: string;     // backward-compat
  } | null;

  /* ── Resolve product / aroma from state ──────────────────── */
  const selectedProduct: Product | undefined = useMemo(() => {
    if (state?.productId) return products.find((p) => p.id === state.productId);
    return undefined;
  }, [state?.productId]);

  const selectedAroma: Fragrance | undefined = useMemo(() => {
    if (state?.aromaId) return fragrances.find((f) => f.id === state.aromaId);
    return undefined;
  }, [state?.aromaId]);

  const productType = state?.productType || (selectedProduct ? "diffuser" : selectedAroma ? "oil" : undefined);

  /* ── Smart suggestions ───────────────────────────────────── */
  const suggestedOils = useMemo(() => {
    if (selectedProduct) return getRecommendedOils(selectedProduct, 3);
    return [];
  }, [selectedProduct]);

  const suggestedDiffusers = useMemo(() => {
    if (selectedAroma) return getDiffusersForOil(selectedAroma, 3);
    return [];
  }, [selectedAroma]);

  /* ── Bundle state ────────────────────────────────────────── */
  const initialBundle: BundleItem[] = [];
  if (selectedProduct) {
    initialBundle.push({
      type: "diffuser",
      id: selectedProduct.id,
      name: `${selectedProduct.name} (${selectedProduct.model})`,
      image: selectedProduct.image,
      detail: selectedProduct.coverage,
      qty: 1,
    });
  }
  if (selectedAroma) {
    const family = getFamilyForFragrance(selectedAroma.family);
    initialBundle.push({
      type: "oil",
      id: selectedAroma.id,
      name: selectedAroma.name,
      image: selectedAroma.image,
      detail: `${family?.name || ""} · ${selectedAroma.intensity}`,
      qty: 1,
    });
  }

  const [bundle, setBundle] = useState<BundleItem[]>(initialBundle);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  /* ── Legacy interest fallback ────────────────────────────── */
  const legacyInterest = state?.interest || "";

  /* ── Bundle helpers ──────────────────────────────────────── */
  const addToBundle = (item: BundleItem) => {
    if (bundle.find((b) => b.id === item.id)) return;
    setBundle((prev) => [...prev, item]);
  };

  const removeFromBundle = (id: string) => {
    setBundle((prev) => prev.filter((b) => b.id !== id));
  };

  const updateQty = (id: string, delta: number) => {
    setBundle((prev) =>
      prev.map((b) => (b.id === id ? { ...b, qty: Math.max(1, b.qty + delta) } : b))
    );
  };

  /* ── Build structured interest summary ───────────────────── */
  const interestSummary = useMemo(() => {
    if (bundle.length === 0) return legacyInterest;
    return bundle
      .map((b) => `${b.name} × ${b.qty}`)
      .join(", ");
  }, [bundle, legacyInterest]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-transparent overflow-hidden">
      <PageMeta
        title="Get a Quote - Request Demo & Consultation"
        description="Request a personalized quote for EZE AirCare scent solutions. Free consultation, custom fragrance recommendations, and competitive pricing for your business space."
        keywords="scent marketing quote, diffuser pricing, fragrance consultation, commercial diffuser quote"
        ogType="website"
      />

      <NeoHero
        heroImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80&auto=format"
        label="Business consultation"
        headline={<>Build a scent program <span className="block text-gradient-animated">tailored to your space.</span></>}
        subheadline="Share your goals and we will craft a custom proposal with hardware sizing, fragrance direction, and pricing."
        variant="business"
      />

      <section className="section-shell">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10">
            <Card className="card-loom relative">
              {isSuccess && (
                <div className="absolute inset-0 bg-background/95 backdrop-blur-sm z-20 flex items-center justify-center rounded-[inherit]">
                  <div className="text-center p-8">
                    <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-foreground mb-2">Request received.</h3>
                    <p className="text-muted-foreground mb-6">Our team will reach out within 24 hours.</p>
                    <Button onClick={() => { setIsSuccess(false); setBundle(initialBundle); }} variant="outline">Send another request</Button>
                  </div>
                </div>
              )}

              <CardContent className="p-8 sm:p-10">
                <h2 className="font-display text-2xl font-semibold text-foreground">Request your quote</h2>
                <p className="text-sm text-muted-foreground mt-2">Tell us about your space and goals.</p>

                {/* ══════════ SELECTED ITEM CARD ══════════ */}
                {bundle.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Your selection</p>
                    {bundle.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-3 bg-accent/5 border border-accent/15 rounded-2xl"
                      >
                        <div className="w-14 h-14 shrink-0 rounded-xl bg-muted/30 flex items-center justify-center overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-display text-sm font-semibold text-foreground truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                            {item.type === "diffuser" ? <Wind className="w-3 h-3" /> : <Droplets className="w-3 h-3" />}
                            {item.detail}
                          </p>
                        </div>
                        {/* Quantity stepper */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <Button
                            type="button" variant="outline" size="icon"
                            className="w-7 h-7 rounded-lg"
                            onClick={() => updateQty(item.id, -1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-semibold text-foreground">{item.qty}</span>
                          <Button
                            type="button" variant="outline" size="icon"
                            className="w-7 h-7 rounded-lg"
                            onClick={() => updateQty(item.id, 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <Button
                          type="button" variant="ghost" size="icon"
                          className="w-7 h-7 rounded-full text-muted-foreground hover:text-destructive shrink-0"
                          onClick={() => removeFromBundle(item.id)}
                        >
                          <X className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* ══════════ SMART SUGGESTIONS ══════════ */}
                {productType === "diffuser" && suggestedOils.length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-accent" />
                      <p className="text-xs text-muted-foreground uppercase tracking-widest">Recommended oils to pair</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {suggestedOils.map((oil) => {
                        const alreadyAdded = bundle.some((b) => b.id === oil.id);
                        const family = getFamilyForFragrance(oil.family);
                        return (
                          <button
                            type="button"
                            key={oil.id}
                            disabled={alreadyAdded}
                            onClick={() =>
                              addToBundle({
                                type: "oil",
                                id: oil.id,
                                name: oil.name,
                                image: oil.image,
                                detail: `${family?.name || ""} · ${oil.intensity}`,
                                qty: 1,
                              })
                            }
                            className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 ${alreadyAdded
                              ? "bg-accent/10 border-accent/30 opacity-60 cursor-default"
                              : "border-border/40 hover:border-accent/40 hover:bg-accent/5 cursor-pointer"
                              }`}
                          >
                            <div className="w-10 h-10 shrink-0 rounded-lg bg-muted/30 flex items-center justify-center overflow-hidden">
                              <img src={oil.image} alt={oil.name} className="w-full h-full object-contain p-0.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-foreground truncate">{oil.name}</p>
                              <p className="text-[10px] text-muted-foreground">{oil.mood}</p>
                            </div>
                            {alreadyAdded ? (
                              <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                            ) : (
                              <Plus className="w-4 h-4 text-muted-foreground shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {productType === "oil" && suggestedDiffusers.length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-accent" />
                      <p className="text-xs text-muted-foreground uppercase tracking-widest">Recommended diffusers to pair</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {suggestedDiffusers.map((diffuser) => {
                        const alreadyAdded = bundle.some((b) => b.id === diffuser.id);
                        return (
                          <button
                            type="button"
                            key={diffuser.id}
                            disabled={alreadyAdded}
                            onClick={() =>
                              addToBundle({
                                type: "diffuser",
                                id: diffuser.id,
                                name: `${diffuser.name} (${diffuser.model})`,
                                image: diffuser.image,
                                detail: diffuser.coverage,
                                qty: 1,
                              })
                            }
                            className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 ${alreadyAdded
                              ? "bg-accent/10 border-accent/30 opacity-60 cursor-default"
                              : "border-border/40 hover:border-accent/40 hover:bg-accent/5 cursor-pointer"
                              }`}
                          >
                            <div className="w-10 h-10 shrink-0 rounded-lg bg-muted/30 flex items-center justify-center overflow-hidden">
                              <img src={diffuser.image} alt={diffuser.name} className="w-full h-full object-contain p-0.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-foreground truncate">{diffuser.name}</p>
                              <p className="text-[10px] text-muted-foreground">{diffuser.coverage}</p>
                            </div>
                            {alreadyAdded ? (
                              <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                            ) : (
                              <Plus className="w-4 h-4 text-muted-foreground shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ══════════ FORM ══════════ */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" required placeholder="Jane Sharma" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Work Email *</Label>
                      <Input id="email" type="email" required placeholder="jane@company.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input id="phone" required placeholder="+91 98765 43210" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role / Designation</Label>
                      <Input id="role" placeholder="Purchase Manager" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Company name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Industry *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="retail">Retail & Shopping</SelectItem>
                          <SelectItem value="hospitality">Hospitality & Hotels</SelectItem>
                          <SelectItem value="corporate">Corporate & Offices</SelectItem>
                          <SelectItem value="wellness">Wellness & Healthcare</SelectItem>
                          <SelectItem value="fitness">Gyms & Fitness</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Interest summary — auto-populated from bundle or manual */}
                  <div className="space-y-2">
                    <Label htmlFor="interest">Interested In</Label>
                    <Input
                      id="interest"
                      value={interestSummary}
                      onChange={(e) => { /* allow manual edit only when no bundle */ }}
                      readOnly={bundle.length > 0}
                      placeholder="Select products above, or type your interest"
                      className={bundle.length > 0 ? "bg-muted/30 cursor-default" : ""}
                    />
                    {bundle.length > 0 && (
                      <p className="text-[10px] text-muted-foreground">Auto-filled based on your selection above</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="space-size">Space Size (sqm)</Label>
                      <Input
                        id="space-size"
                        placeholder={selectedProduct ? selectedProduct.coverage.replace("Up to ", "") : "500"}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Timeline</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="1-3">1-3 Months</SelectItem>
                          <SelectItem value="3+">3+ Months</SelectItem>
                          <SelectItem value="planning">Planning</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Budget</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="economy">Economy</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="bespoke">Bespoke</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Details *</Label>
                    <Textarea id="message" className="min-h-[140px]" placeholder="Tell us about your requirements, number of locations, deployment preferences…" required />
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="w-4 h-4 mr-2" />
                        Request Custom Quote
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* ══════════ SIDEBAR ══════════ */}
            <div className="space-y-6">
              <Card className="card-loom">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-display text-xl font-semibold text-foreground">Contact information</h3>
                  {[{ icon: Phone, label: "Phone", value: "+91 98765 43210" }, { icon: Mail, label: "Email", value: "hello@ezeaircare.com" }, { icon: MapPin, label: "Address", value: "Gurgaon, India" }].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">{item.label}</p>
                        <p className="text-sm text-foreground">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick links to browse if no selection */}
              {bundle.length === 0 && (
                <Card className="card-loom">
                  <CardContent className="p-6 space-y-3">
                    <h4 className="font-display text-lg font-semibold text-foreground">Browse our solutions</h4>
                    <p className="text-sm text-muted-foreground">Select a product or oil first for a tailored quote.</p>
                    <div className="space-y-2">
                      <Link to="/business/products">
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <Wind className="w-4 h-4" />
                          View Diffusers
                          <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                        </Button>
                      </Link>
                      <Link to="/business/aromas">
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <Droplets className="w-4 h-4" />
                          Explore Aroma Library
                          <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Bundle summary when items selected */}
              {bundle.length > 0 && (
                <Card className="card-loom border-accent/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-4 h-4 text-accent" />
                      <h4 className="font-display text-lg font-semibold text-foreground">Quote summary</h4>
                    </div>
                    <div className="space-y-3">
                      {bundle.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground truncate max-w-[70%]">{item.name}</span>
                          <Badge variant="secondary" className="text-[10px] shrink-0">× {item.qty}</Badge>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-border/30">
                      <p className="text-xs text-muted-foreground">
                        {bundle.length} item{bundle.length > 1 ? "s" : ""} · {bundle.reduce((sum, b) => sum + b.qty, 0)} total units
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-1">Volume pricing available upon request</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="card-loom">
                <CardContent className="p-6">
                  <h4 className="font-display text-lg font-semibold text-foreground">Need faster guidance?</h4>
                  <p className="text-sm text-muted-foreground mt-2">Schedule a 15-minute discovery call with a scent strategist.</p>
                  <Button variant="outline" className="mt-4 w-full">Book a call</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactQuote;
import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ShoppingCart,
  Calendar,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Share2,
  Check,
  Droplets,
  Plus,
  PackagePlus,
  Wind,
} from "lucide-react";
import PageMeta, { createProductSchema, createBreadcrumbSchema } from "@/components/PageMeta";
import { getProductByModel, products } from "@/data/productData";
import { aromaSizes } from "@/data/aromaData";
import { getRecommendedOils, getSuggestedOilSize, getSuggestedOilSizeIndex, getRelatedDiffusers } from "@/data/recommendations";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import AnimatedSection from "@/components/AnimatedSection";

const specifications = [
  { label: "Dimensions", value: "25cm × 15cm × 10cm" },
  { label: "Weight", value: "2.5 kg" },
  { label: "Power Consumption", value: "12W" },
  { label: "Noise Level", value: "< 35dB" },
  { label: "Connectivity", value: "Wi-Fi, Bluetooth 5.0" },
  { label: "Cartridge Capacity", value: "500ml" },
  { label: "Coverage Area", value: "Up to 500 sqm" },
];

const ProductDetail = () => {
  const { model } = useParams();
  const location = useLocation();
  const product = getProductByModel(model || "");
  const [activeImage, setActiveImage] = useState(0);
  const { addItem } = useCart();
  const { toast } = useToast();
  const isShop = location.pathname.startsWith("/shop");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold mb-4 text-foreground">Product Not Found</h1>
          <Link to={isShop ? "/shop/products" : "/business/products"}>
            <Button variant="hero">Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      model: product.model,
      type: "diffuser",
      price: product.price,
      image: product.image,
    });
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  /* ── Recommendations ──────────────────────────────────────── */
  const recommendedOils = useMemo(() => getRecommendedOils(product, 4), [product]);
  const suggestedSize = getSuggestedOilSize(product);
  const suggestedSizeIdx = getSuggestedOilSizeIndex(product);
  const relatedDiffusers = useMemo(() => getRelatedDiffusers(product, 4), [product]);

  const handleAddOilToCart = (oil: typeof recommendedOils[0], sizeIdx?: number) => {
    const idx = sizeIdx ?? suggestedSizeIdx;
    const size = aromaSizes[idx];
    addItem({
      id: `${oil.id}-${size.label}`,
      name: oil.name,
      type: "aroma",
      price: size.price,
      variant: size.label,
    });
    toast({ title: "Added to Cart!", description: `${oil.name} (${size.label}) added.` });
  };

  const handleAddBundleToCart = () => {
    handleAddToCart();
    recommendedOils.slice(0, 2).forEach((oil) => handleAddOilToCart(oil));
    toast({ title: "Bundle Added!", description: `${product.name} + ${recommendedOils.slice(0, 2).map((o) => o.name).join(" & ")} added to cart.` });
  };

  const bundleOils = recommendedOils.slice(0, 2);
  const bundleTotal =
    product.price + bundleOils.reduce((sum, _) => sum + suggestedSize.price, 0);
  const bundleSavings = Math.round(bundleTotal * 0.1);

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://ezeaircare.com" },
    { name: "Products", url: "https://ezeaircare.com/products" },
    { name: product.name, url: `https://ezeaircare.com/products/${product.model}` },
  ]);

  const productSchema = createProductSchema({
    name: product.name,
    description: product.description,
    image: window.location.origin + product.image,
    price: product.price,
    currency: "INR",
    url: window.location.href,
  });

  return (
    <div className="min-h-screen bg-transparent overflow-hidden">
      <PageMeta
        title={`${product.name} (${product.model}) - Premium Scent Diffuser`}
        description={product.description}
        keywords={`${product.name}, diffuser, scent marketing, aroma oil`}
        ogType="product"
        structuredData={[breadcrumbSchema, productSchema]}
      />

      <section className="section-shell pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to={isShop ? "/shop" : "/business"} className="hover:text-foreground transition-colors">Home</Link>
            <span className="opacity-40">/</span>
            <Link to={isShop ? "/shop/products" : "/business/products"} className="hover:text-foreground transition-colors">Products</Link>
            <span className="opacity-40">/</span>
            <span className="text-foreground font-medium">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection animation="fadeInUp" className="space-y-6">
              <div className="surface-glass rounded-3xl p-6">
                <div className="w-full aspect-square bg-muted/30 rounded-2xl flex items-center justify-center overflow-hidden">
                  <img
                    src={product.images ? product.images[activeImage] : product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                {product.tag && (
                  <span className="inline-block mt-4 text-[10px] uppercase tracking-widest bg-foreground text-background px-3 py-1 rounded-full">
                    {product.tag}
                  </span>
                )}
              </div>

              <div className="flex gap-3 overflow-x-auto">
                {(product.images || [product.image]).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`shrink-0 w-20 h-20 rounded-xl p-2 transition-all duration-300 ${activeImage === i ? "card-loom ring-2 ring-accent" : "bg-muted/40"
                      }`}
                  >
                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={150} className="flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{product.model}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  <span className="text-sm font-semibold">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                </div>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold text-foreground">{product.name}</h1>
              <p className="text-lg text-muted-foreground mt-4">{product.description}</p>

              {isShop ? (
                <Card className="card-loom mt-6">
                  <CardContent className="p-6">
                    <div className="flex items-end gap-3">
                      <span className="text-3xl font-semibold text-foreground">INR {product.price.toLocaleString("en-IN")}</span>
                      <span className="text-sm text-muted-foreground line-through">INR {(product.price * 1.2).toLocaleString("en-IN")}</span>
                      <span className="text-xs text-green-600 font-semibold">Save 20%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Inclusive of all taxes. Free shipping included.</p>
                    <div className="mt-4 flex flex-col sm:flex-row gap-3">
                      <Button variant="hero" size="lg" className="flex-1" onClick={handleAddToCart}>
                        <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                      </Button>
                      <Button variant="outline" size="lg" className="flex-1">
                        <Share2 className="w-4 h-4 mr-2" /> Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="card-loom mt-6">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs uppercase tracking-widest text-muted-foreground">Business pricing</div>
                        <div className="text-lg font-semibold text-foreground">Contact for volume rates</div>
                      </div>
                      <Badge variant="secondary">Enterprise</Badge>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <Link to="/business/contact" state={{ productId: product.id, productType: "diffuser" }} className="flex-1">
                        <Button variant="hero" size="lg" className="w-full">
                          <Calendar className="w-4 h-4 mr-2" /> Request Quote
                        </Button>
                      </Link>
                      <Link to="/business/products" className="flex-1">
                        <Button variant="outline" size="lg" className="w-full">
                          View Range
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-2 gap-3 mt-6">
                {product.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
                      <Check className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { icon: Truck, label: "Free Delivery" },
                  { icon: ShieldCheck, label: "2 Year Warranty" },
                  { icon: RotateCcw, label: "30 Day Return" },
                ].map((policy) => (
                  <div key={policy.label} className="text-center text-xs text-muted-foreground">
                    <div className="w-10 h-10 mx-auto rounded-full bg-muted/50 flex items-center justify-center mb-2">
                      <policy.icon className="w-4 h-4" />
                    </div>
                    {policy.label}
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          <section className="section-shell">
            <div className="text-center mb-8">
              <div className="pill-label justify-center">Ideal for</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(isShop ? product.homeUse : product.businessUse).map((use, i) => (
                <AnimatedSection key={use} animation="fadeInUp" delay={i * 80}>
                  <div className="card-loom rounded-2xl p-4 text-center text-sm text-foreground">{use}</div>
                </AnimatedSection>
              ))}
            </div>
          </section>

          <section className="section-shell">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl font-semibold text-center mb-8">Technical Specifications</h2>
              <div className="card-loom rounded-2xl divide-y divide-border/40">
                {specifications.map((spec) => (
                  <div key={spec.label} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">{spec.label}</span>
                    <span className="text-sm text-foreground font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
          {/* ═══════════ COMPLETE YOUR SETUP — Suggested Oils ═══════════ */}
          {isShop && recommendedOils.length > 0 && (
            <section className="section-shell">
              <AnimatedSection animation="fadeInUp">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-11 h-11 rounded-2xl gradient-gold shadow-clay-sm flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">Complete Your Setup</h2>
                    <p className="text-sm text-muted-foreground">
                      Recommended size: <span className="font-semibold text-accent">{suggestedSize.label}</span> for {product.name} ({product.coverage})
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {recommendedOils.map((oil, idx) => (
                  <AnimatedSection key={oil.id} animation="fadeInUp" delay={idx * 100}>
                    <Card className="card-clay h-full flex flex-col overflow-hidden">
                      <div className="shrink-0">
                        <div className="aspect-square surface-sunken rounded-2xl m-4 overflow-hidden flex items-center justify-center relative">
                          <img src={oil.image} alt={oil.name} className="w-full h-full object-contain p-4" loading="lazy" />
                          <div className="absolute bottom-2 right-2">
                            <span className="pill-raised text-[9px] font-semibold px-2 py-0.5">{oil.intensity}</span>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-5 pt-0 flex flex-col flex-1">
                        <h4 className="font-display text-base font-semibold text-foreground">{oil.name}</h4>
                        <p className="text-xs text-muted-foreground italic">{oil.mood}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {oil.notes.slice(0, 3).map((note) => (
                            <span key={note} className="pill-raised text-[9px] px-2 py-0.5 text-muted-foreground">{note}</span>
                          ))}
                        </div>
                        <div className="mt-auto pt-4 space-y-2">
                          <div className="flex items-end gap-2">
                            <span className="text-lg font-semibold text-foreground">₹{suggestedSize.price.toLocaleString("en-IN")}</span>
                            <span className="text-xs text-muted-foreground">{suggestedSize.label}</span>
                          </div>
                          <Button variant="hero" size="sm" className="w-full" onClick={() => handleAddOilToCart(oil)}>
                            <ShoppingCart className="w-3.5 h-3.5 mr-1.5" /> Add {suggestedSize.label}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            </section>
          )}

          {/* ═══════════ FREQUENTLY BOUGHT TOGETHER ═══════════ */}
          {isShop && bundleOils.length > 0 && (
            <section className="section-shell">
              <AnimatedSection animation="fadeInUp">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-11 h-11 rounded-2xl gradient-gold shadow-clay-sm flex items-center justify-center">
                    <PackagePlus className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">Frequently Bought Together</h2>
                    <p className="text-sm text-muted-foreground">Save 10% when you buy the bundle</p>
                  </div>
                </div>

                <Card className="card-clay overflow-hidden">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      {/* Diffuser */}
                      <div className="text-center shrink-0">
                        <div className="w-28 h-28 surface-sunken rounded-2xl flex items-center justify-center mx-auto">
                          <img src={product.image} alt={product.name} className="w-full h-full object-contain p-3" />
                        </div>
                        <p className="text-sm font-semibold text-foreground mt-2">{product.name}</p>
                        <p className="text-xs text-muted-foreground">₹{product.price.toLocaleString("en-IN")}</p>
                      </div>

                      {bundleOils.map((oil) => (
                        <div key={oil.id} className="flex items-center gap-6">
                          <Plus className="w-5 h-5 text-muted-foreground shrink-0" />
                          <div className="text-center shrink-0">
                            <div className="w-28 h-28 surface-sunken rounded-2xl flex items-center justify-center mx-auto">
                              <img src={oil.image} alt={oil.name} className="w-full h-full object-contain p-3" />
                            </div>
                            <p className="text-sm font-semibold text-foreground mt-2">{oil.name}</p>
                            <p className="text-xs text-muted-foreground">₹{suggestedSize.price.toLocaleString("en-IN")} ({suggestedSize.label})</p>
                          </div>
                        </div>
                      ))}

                      {/* Total + CTA */}
                      <div className="md:ml-auto text-center md:text-right space-y-3">
                        <div>
                          <span className="text-xs text-muted-foreground line-through">₹{bundleTotal.toLocaleString("en-IN")}</span>
                          <span className="block text-2xl font-semibold text-foreground">
                            ₹{(bundleTotal - bundleSavings).toLocaleString("en-IN")}
                          </span>
                          <span className="text-xs text-green-600 font-semibold">Save ₹{bundleSavings.toLocaleString("en-IN")}</span>
                        </div>
                        <Button variant="hero" size="lg" onClick={handleAddBundleToCart}>
                          <ShoppingCart className="w-4 h-4 mr-2" /> Add All to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </section>
          )}

          {/* ═══════════ YOU MIGHT ALSO LIKE ═══════════ */}
          {relatedDiffusers.length > 0 && (
            <section className="section-shell">
              <AnimatedSection animation="fadeInUp">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-11 h-11 rounded-2xl gradient-gold shadow-clay-sm flex items-center justify-center">
                    <Wind className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">You Might Also Like</h2>
                    <p className="text-sm text-muted-foreground">Similar diffusers in our range</p>
                  </div>
                  <Link to={isShop ? "/shop/products" : "/business/products"} className="hidden sm:inline-flex">
                    <Button variant="outline" size="sm" className="group">
                      View All <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </AnimatedSection>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {relatedDiffusers.map((rel, idx) => (
                  <AnimatedSection key={rel.id} animation="fadeInUp" delay={idx * 100}>
                    <Link to={`${isShop ? "/shop" : "/business"}/products/${rel.model}`}>
                      <Card className="card-clay h-full flex flex-col overflow-hidden hover:shadow-clay-lg transition-shadow duration-300 cursor-pointer">
                        <div className="shrink-0 relative">
                          {rel.tag && (
                            <div className="absolute top-3 right-3 z-10">
                              <span className="pill-gold text-[8px] font-bold uppercase tracking-wider px-2 py-0.5">{rel.tag}</span>
                            </div>
                          )}
                          <div className="aspect-square surface-sunken rounded-2xl m-4 overflow-hidden flex items-center justify-center">
                            <img src={rel.image} alt={rel.name} className="w-full h-full object-contain p-4" loading="lazy" />
                          </div>
                        </div>
                        <CardContent className="p-5 pt-0 flex flex-col flex-1">
                          <h4 className="font-display text-base font-semibold text-foreground">{rel.name}</h4>
                          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{rel.model}</p>
                          <p className="text-xs text-muted-foreground mt-1">{rel.coverage}</p>
                          <div className="flex items-center gap-1 mt-2">
                            <Star className="w-3 h-3 text-accent fill-accent" />
                            <span className="text-xs text-muted-foreground">{rel.rating} ({rel.reviews})</span>
                          </div>
                          <div className="mt-auto pt-4">
                            {isShop ? (
                              <div className="text-lg font-semibold text-foreground">₹{rel.price.toLocaleString("en-IN")}</div>
                            ) : (
                              <Badge variant="secondary" className="text-[10px]">Request Quote</Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
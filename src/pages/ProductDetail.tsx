import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ShoppingCart,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Share2,
  Check,
  Plus,
  Minus,
  PackagePlus,
  MapPin,
  Clock,
  Heart,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  User,
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

/* ── Sample reviews for demo ─────────────────────────────── */
const sampleReviews = [
  { id: 1, author: "Priya M.", rating: 5, date: "2 weeks ago", title: "Absolutely love it!", body: "The scent fills my entire living room within minutes. Setup was a breeze and the app control is super convenient. Best purchase this year!", helpful: 24 },
  { id: 2, author: "Rahul S.", rating: 4, date: "1 month ago", title: "Great product, minor gripe", body: "Excellent diffuser with strong coverage. The only minor issue is the cartridge could last a bit longer. Otherwise it's absolutely premium quality.", helpful: 18 },
  { id: 3, author: "Anita K.", rating: 5, date: "3 weeks ago", title: "Perfect for my boutique", body: "I bought two for my boutique store — customers always ask what smells so good. The scheduling feature means it's ready before we open.", helpful: 31 },
  { id: 4, author: "Vikram D.", rating: 5, date: "1 week ago", title: "Premium feel throughout", body: "From unboxing to daily use, everything feels premium. The whisper-quiet operation means I forget it's even running. Highly recommended.", helpful: 12 },
];

const ratingBreakdown = [
  { stars: 5, percentage: 72 },
  { stars: 4, percentage: 18 },
  { stars: 3, percentage: 6 },
  { stars: 2, percentage: 3 },
  { stars: 1, percentage: 1 },
];

const ProductDetail = () => {
  const { model } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const product = getProductByModel(model || "");
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();
  const isShop = location.pathname.startsWith("/shop");

  const recommendedOils = useMemo(() => product ? getRecommendedOils(product, 4) : [], [product]);
  const relatedDiffusers = useMemo(() => product ? getRelatedDiffusers(product, 4) : [], [product]);

  const suggestedSize = product ? getSuggestedOilSize(product) : aromaSizes[0];
  const suggestedSizeIdx = product ? getSuggestedOilSizeIndex(product) : 0;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold mb-4 text-foreground">Product Not Found</h1>
          <Link to={isShop ? "/shop/products" : "/business/products"}>
            <Button variant="default" className="rounded-full">Back to Products</Button>
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
    }, quantity);
    toast({
      title: "Added to Cart",
      description: (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
            <img src={product.image} alt={product.name} className="w-6 h-6 object-contain" />
          </div>
          <span>{quantity}× {product.name} added to your cart.</span>
        </div>
      ),
    });
  };

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      name: product.name,
      model: product.model,
      type: "diffuser",
      price: product.price,
      image: product.image,
    }, quantity);
    navigate("/shop/checkout");
  };

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
  const bundleTotal = product.price + bundleOils.reduce((sum, _) => sum + suggestedSize.price, 0);
  const bundleSavings = Math.round(bundleTotal * 0.1);

  const mrp = Math.round(product.price * 1.2);
  const savingsPercent = Math.round(((mrp - product.price) / mrp) * 100);

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

      <div className="pt-24 lg:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Breadcrumbs ── */}
          <nav className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground mb-8">
            <Link to={isShop ? "/shop" : "/business"} className="hover:text-foreground transition-colors">Home</Link>
            <span className="opacity-40">/</span>
            <Link to={isShop ? "/shop/products" : "/business/products"} className="hover:text-foreground transition-colors">Products</Link>
            <span className="opacity-40">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          {/* ═══════════════════ MAIN GRID ═══════════════════ */}
          <div className="grid lg:grid-cols-[1fr_0.45fr] gap-8 lg:gap-12">

            {/* ── LEFT COL: Image + Product Info ── */}
            <div className="space-y-8">

              {/* Image Gallery + Core Details Row */}
              <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12">

                {/* Image Gallery */}
                <div className="space-y-4">
                  <AnimatedSection animation="fadeInUp">
                    <div className="relative aspect-square bg-muted/10 rounded-[2rem] border border-border/40 overflow-hidden flex items-center justify-center group">
                      <div className="absolute inset-0 bg-grid-fade opacity-30" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <img
                        src={product.images ? product.images[activeImage] : product.image}
                        alt={product.name}
                        className="w-3/4 h-3/4 object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                      />
                      {product.tag && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-background/90 backdrop-blur-xl border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-foreground shadow-sm">
                            {product.tag}
                          </span>
                        </div>
                      )}
                      <button onClick={() => setWishlisted(!wishlisted)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                        <Heart className={`w-5 h-5 transition-colors ${wishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                      </button>
                    </div>
                  </AnimatedSection>

                  <div className="grid grid-cols-4 gap-3">
                    {(product.images || [product.image]).map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-300 border-2 ${activeImage === i ? "border-foreground shadow-md" : "border-transparent opacity-60 hover:opacity-100"}`}
                      >
                        <div className="absolute inset-0 bg-muted/20" />
                        <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-contain p-2" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Core Product Info (visible on md+, hidden on mobile since buy box shows it) */}
                <div className="hidden md:flex flex-col">
                  <AnimatedSection animation="fadeInUp" delay={100}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest bg-muted/30 px-2 py-1 rounded-md">{product.model}</span>
                      <div className="flex items-center gap-1 bg-accent/10 px-2 py-1 rounded-md">
                        <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                        <span className="text-xs font-bold text-accent-foreground">{product.rating}</span>
                        <span className="text-[10px] text-muted-foreground ml-1">({product.reviews})</span>
                      </div>
                    </div>

                    <h1 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-4 text-balance">{product.name}</h1>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 border-l-2 border-accent/30 pl-4">{product.description}</p>

                    {/* ── About This Item ── */}
                    <div className="mb-6">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">About this item</h3>
                      <ul className="space-y-2.5">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2.5">
                            <div className="mt-0.5 w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 text-accent" />
                            </div>
                            <span className="text-sm text-foreground/80">{feature}</span>
                          </li>
                        ))}
                        <li className="flex items-start gap-2.5">
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 text-accent" />
                          </div>
                          <span className="text-sm text-foreground/80">Coverage: {product.coverage}</span>
                        </li>
                      </ul>
                    </div>

                    {/* ── Use Cases ── */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-muted/10 rounded-xl p-4 border border-border/20">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Home Use</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {product.homeUse.map((use) => (
                            <span key={use} className="text-[11px] bg-background border border-border/30 px-2 py-0.5 rounded-full text-foreground/70">{use}</span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-muted/10 rounded-xl p-4 border border-border/20">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Business Use</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {product.businessUse.map((use) => (
                            <span key={use} className="text-[11px] bg-background border border-border/30 px-2 py-0.5 rounded-full text-foreground/70">{use}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* ── Trust Badges ── */}
                    <div className="flex items-center gap-6 py-4 border-t border-border/30">
                      {[
                        { icon: Truck, label: "Free Delivery" },
                        { icon: ShieldCheck, label: "2 Year Warranty" },
                        { icon: RotateCcw, label: "30 Day Return" },
                      ].map((item) => (
                        <div key={item.label} className="text-center group cursor-default">
                          <div className="w-9 h-9 mx-auto rounded-full bg-muted/20 flex items-center justify-center mb-1.5 group-hover:bg-accent/20 transition-colors">
                            <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                          </div>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </AnimatedSection>
                </div>
              </div>

              {/* ── Technical Specifications ── */}
              <section>
                <div className="bg-muted/10 rounded-[2rem] p-6 md:p-10 border border-border/30">
                  <h2 className="font-display text-xl md:text-2xl font-semibold mb-6">Technical Specifications</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {(showAllSpecs ? specifications : specifications.slice(0, 4)).map((spec) => (
                      <div key={spec.label} className="bg-background p-4 rounded-xl border border-border/20 shadow-sm">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">{spec.label}</div>
                        <div className="font-semibold text-sm text-foreground">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                  {specifications.length > 4 && (
                    <button onClick={() => setShowAllSpecs(!showAllSpecs)} className="mt-4 flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors mx-auto">
                      {showAllSpecs ? "Show Less" : `Show All ${specifications.length} Specs`}
                      {showAllSpecs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </section>

              {/* ── Bundle Upsell ── */}
              {isShop && bundleOils.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                      <PackagePlus className="w-4 h-4" />
                    </div>
                    <h2 className="font-display text-xl md:text-2xl font-semibold">Frequently Bought Together</h2>
                  </div>

                  <div className="bg-background rounded-[2rem] border border-border/40 shadow-neo p-6 md:p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 bg-green-100 dark:bg-green-900/30 rounded-bl-2xl text-green-700 dark:text-green-400 font-bold text-xs uppercase tracking-wider">
                      Save ₹{bundleSavings.toLocaleString("en-IN")}
                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-6">
                      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
                        <div className="text-center">
                          <div className="w-28 h-28 bg-muted/20 rounded-2xl flex items-center justify-center p-3 mb-2 border border-border/20">
                            <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                          </div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Diffuser</div>
                        </div>
                        <Plus className="w-5 h-5 text-muted-foreground/50" />
                        {bundleOils.map((oil, i) => (
                          <div key={oil.id} className="flex items-center gap-3 md:gap-6">
                            <div className="text-center">
                              <div className="w-28 h-28 bg-muted/20 rounded-2xl flex items-center justify-center p-3 mb-2 border border-border/20 relative">
                                <img src={oil.image} alt={oil.name} className="w-full h-full object-contain" />
                                {i === 0 && <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[9px] font-bold px-2 py-0.5 rounded-full">Best Seller</div>}
                              </div>
                              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Oil</div>
                            </div>
                            {i < bundleOils.length - 1 && <Plus className="w-5 h-5 text-muted-foreground/50" />}
                          </div>
                        ))}
                      </div>

                      <div className="lg:ml-auto text-center lg:text-right">
                        <div className="mb-3">
                          <div className="text-base text-muted-foreground line-through">₹{bundleTotal.toLocaleString("en-IN")}</div>
                          <div className="text-3xl font-display font-bold text-foreground">₹{(bundleTotal - bundleSavings).toLocaleString("en-IN")}</div>
                        </div>
                        <Button onClick={handleAddBundleToCart} size="lg" className="rounded-full h-11 w-full md:w-auto shadow-lg shadow-accent/20">
                          Add Bundle to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* ═══════════════ CUSTOMER REVIEWS ═══════════════ */}
              <section>
                <h2 className="font-display text-xl md:text-2xl font-semibold mb-6">Customer Reviews</h2>

                <div className="grid md:grid-cols-[280px_1fr] gap-8">
                  {/* Star Breakdown */}
                  <div className="bg-muted/10 rounded-2xl p-6 border border-border/20 h-fit">
                    <div className="text-center mb-5">
                      <div className="text-5xl font-display font-bold text-foreground mb-1">{product.rating}</div>
                      <div className="flex items-center justify-center gap-0.5 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? "text-accent fill-accent" : "text-muted-foreground/30"}`} />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">{product.reviews} global ratings</p>
                    </div>

                    <div className="space-y-2">
                      {ratingBreakdown.map((r) => (
                        <div key={r.stars} className="flex items-center gap-2">
                          <span className="text-xs font-medium text-accent whitespace-nowrap w-12">{r.stars} star</span>
                          <div className="flex-1 h-2.5 bg-muted/30 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${r.percentage}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground w-8 text-right">{r.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Review Cards */}
                  <div className="space-y-4">
                    {sampleReviews.map((review) => (
                      <div key={review.id} className="bg-background rounded-xl p-5 border border-border/30 hover:border-accent/20 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center">
                            <User className="w-4 h-4 text-accent" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{review.author}</p>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star key={i} className={`w-3 h-3 ${i < review.rating ? "text-accent fill-accent" : "text-muted-foreground/30"}`} />
                                ))}
                              </div>
                              <span className="text-[10px] text-muted-foreground">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <h4 className="font-semibold text-sm text-foreground mb-1">{review.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{review.body}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <button className="flex items-center gap-1 hover:text-accent transition-colors">
                            <ThumbsUp className="w-3.5 h-3.5" /> Helpful ({review.helpful})
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ── Related Products ── */}
              {relatedDiffusers.length > 0 && (
                <section>
                  <h2 className="font-display text-xl md:text-2xl font-semibold mb-6 text-center">You Might Also Like</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {relatedDiffusers.map((rel, idx) => (
                      <AnimatedSection key={rel.id} animation="fadeInUp" delay={idx * 100}>
                        <Link to={`${isShop ? "/shop" : "/business"}/products/${rel.model}`} className="group block">
                          <div className="bg-background rounded-2xl p-3 border border-border/40 hover:border-accent/30 hover:shadow-neo transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                            <div className="aspect-square bg-muted/20 rounded-xl mb-3 overflow-hidden flex items-center justify-center">
                              <img src={rel.image} alt={rel.name} className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <h4 className="font-display text-sm font-semibold text-foreground text-center mb-1 group-hover:text-accent transition-colors">{rel.name}</h4>
                            <p className="text-center text-[11px] text-muted-foreground mb-3">{rel.coverage}</p>
                            <div className="mt-auto text-center">
                              {isShop ? (
                                <span className="font-semibold text-sm">₹{rel.price.toLocaleString("en-IN")}</span>
                              ) : (
                                <span className="text-xs uppercase tracking-wider font-bold text-muted-foreground">View Details</span>
                              )}
                            </div>
                          </div>
                        </Link>
                      </AnimatedSection>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* ═══════════════════ RIGHT COL: STICKY BUY BOX ═══════════════════ */}
            <div className="lg:order-last order-first">
              <div className="lg:sticky lg:top-24">
                <AnimatedSection animation="fadeInUp" delay={150}>
                  <div className="bg-background rounded-[2rem] border border-border/40 shadow-neo p-6 space-y-5">

                    {/* Mobile-only: Title + Rating (hidden on md+ since left col shows it) */}
                    <div className="md:hidden">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest bg-muted/30 px-2 py-0.5 rounded">{product.model}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                          <span className="text-xs font-bold">{product.rating}</span>
                          <span className="text-[10px] text-muted-foreground">({product.reviews})</span>
                        </div>
                      </div>
                      <h1 className="font-display text-2xl font-semibold text-foreground mb-2">{product.name}</h1>
                      <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
                    </div>

                    {isShop ? (
                      <>
                        {/* ── Price Block ── */}
                        <div className="border-b border-border/30 pb-5">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-xs text-muted-foreground">M.R.P.:</span>
                            <span className="text-sm text-muted-foreground line-through">₹{mrp.toLocaleString("en-IN")}</span>
                          </div>
                          <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-display font-bold text-foreground">₹{product.price.toLocaleString("en-IN")}</span>
                            <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-0 rounded-full text-xs font-bold px-2.5">
                              {savingsPercent}% off
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes</p>
                        </div>

                        {/* ── Delivery Info ── */}
                        <div className="space-y-3 border-b border-border/30 pb-5">
                          <div className="flex items-start gap-3">
                            <Truck className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                            <div>
                              <p className="text-sm font-semibold text-foreground">Free Delivery</p>
                              <p className="text-xs text-muted-foreground">On orders above ₹2,000</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                            <div>
                              <p className="text-sm font-semibold text-foreground">Deliver to all India</p>
                              <p className="text-xs text-muted-foreground">Usually ships within 24 hours</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Clock className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                            <div>
                              <p className="text-sm font-semibold text-foreground">Estimated delivery</p>
                              <p className="text-xs text-muted-foreground">2–5 business days</p>
                            </div>
                          </div>
                        </div>

                        {/* ── Stock Status ── */}
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-sm font-semibold text-green-600 dark:text-green-400">In Stock</span>
                        </div>

                        {/* ── Quantity Selector ── */}
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Quantity</label>
                          <div className="flex items-center gap-0 border border-border/40 rounded-full overflow-hidden w-fit">
                            <button
                              onClick={() => setQuantity(Math.max(1, quantity - 1))}
                              disabled={quantity <= 1}
                              className="w-10 h-10 flex items-center justify-center hover:bg-muted/30 transition-colors disabled:opacity-30"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-semibold text-foreground text-sm">{quantity}</span>
                            <button
                              onClick={() => setQuantity(Math.min(10, quantity + 1))}
                              disabled={quantity >= 10}
                              className="w-10 h-10 flex items-center justify-center hover:bg-muted/30 transition-colors disabled:opacity-30"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* ── Action Buttons ── */}
                        <div className="space-y-3 pt-1">
                          <Button onClick={handleAddToCart} size="lg" className="w-full rounded-full h-13 text-base font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                            <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                          </Button>
                          <Button onClick={handleBuyNow} variant="outline" size="lg" className="w-full rounded-full h-13 text-base font-bold border-accent/40 text-accent hover:bg-accent/10 hover:border-accent transition-all">
                            Buy Now
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>

                        {/* ── Wishlist + Share ── */}
                        <div className="flex gap-3 pt-1">
                          <button onClick={() => setWishlisted(!wishlisted)} className={`flex-1 flex items-center justify-center gap-2 rounded-full h-10 border transition-all text-sm font-medium ${wishlisted ? "border-red-300 bg-red-50 dark:bg-red-900/20 text-red-600" : "border-border/40 text-muted-foreground hover:text-foreground hover:border-border"}`}>
                            <Heart className={`w-4 h-4 ${wishlisted ? "fill-red-500 text-red-500" : ""}`} />
                            {wishlisted ? "Wishlisted" : "Add to Wishlist"}
                          </button>
                          <button className="w-10 h-10 rounded-full border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-all">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* ── Trust Row ── */}
                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/20">
                          {[
                            { icon: Truck, label: "Free Ship" },
                            { icon: ShieldCheck, label: "2yr Warranty" },
                            { icon: RotateCcw, label: "30d Return" },
                          ].map((item) => (
                            <div key={item.label} className="text-center py-2">
                              <item.icon className="w-4 h-4 text-accent mx-auto mb-1" />
                              <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block">{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      /* ── B2B Buy Box ── */
                      <>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-foreground">Enterprise Solution</h3>
                          <Badge variant="secondary" className="rounded-full">B2B Pricing</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">Contact us for volume pricing and installation services.</p>
                        <div className="space-y-3">
                          <Link to="/business/contact" state={{ interest: `${product.name} (${product.model})` }} className="block">
                            <Button className="w-full rounded-full h-12 uppercase tracking-wide text-xs font-bold">
                              Request Quote
                            </Button>
                          </Link>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-border/20">
                          <div className="flex items-start gap-3">
                            <Truck className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                            <p className="text-xs text-muted-foreground">Free delivery & installation for enterprise orders</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <ShieldCheck className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                            <p className="text-xs text-muted-foreground">Extended 3-year warranty for B2B customers</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

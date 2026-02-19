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

  // Move hooks before conditional return
  const recommendedOils = useMemo(() => product ? getRecommendedOils(product, 4) : [], [product]);
  const relatedDiffusers = useMemo(() => product ? getRelatedDiffusers(product, 4) : [], [product]);

  // Safe access for derived values
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
    });
    toast({
      title: "Added to Cart",
      description: (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
            <img src={product.image} alt={product.name} className="w-6 h-6 object-contain" />
          </div>
          <span>{product.name} is in your cart.</span>
        </div>
      ),
    });
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
    <div className="min-h-screen bg-background overflow-hidden">
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

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20">

            {/* ── Left: Image Gallery ── */}
            <div className="space-y-6">
              <AnimatedSection animation="fadeInUp">
                <div className="relative aspect-square bg-muted/10 rounded-[2.5rem] border border-border/40 overflow-hidden flex items-center justify-center group">
                  <div className="absolute inset-0 bg-grid-fade opacity-30" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <img
                    src={product.images ? product.images[activeImage] : product.image}
                    alt={product.name}
                    className="w-3/4 h-3/4 object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.tag && (
                    <div className="absolute top-6 left-6">
                      <span className="bg-background/90 backdrop-blur-xl border border-white/20 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-foreground shadow-sm">
                        {product.tag}
                      </span>
                    </div>
                  )}
                </div>
              </AnimatedSection>

              <div className="grid grid-cols-4 gap-4">
                {(product.images || [product.image]).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative aspect-square rounded-2xl overflow-hidden transition-all duration-300 ${activeImage === i ? "ring-2 ring-foreground ring-offset-2 ring-offset-background" : "opacity-70 hover:opacity-100"
                      }`}
                  >
                    <div className="absolute inset-0 bg-muted/20" />
                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-contain p-2" />
                  </button>
                ))}
              </div>
            </div>

            {/* ── Right: Product Details ── */}
            <div className="flex flex-col h-full">
              <AnimatedSection animation="fadeInUp" delay={150}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest bg-muted/30 px-2 py-1 rounded-md">{product.model}</span>
                  <div className="flex items-center gap-1 bg-accent/10 px-2 py-1 rounded-md">
                    <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                    <span className="text-xs font-bold text-accent-foreground">{product.rating}</span>
                    <span className="text-[10px] text-muted-foreground ml-1">({product.reviews} reviews)</span>
                  </div>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground mb-6 text-balance">{product.name}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 border-l-2 border-accent/30 pl-4">{product.description}</p>

                {isShop ? (
                  <div className="bg-background rounded-3xl p-6 border border-border/60 shadow-neo mb-8">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-4xl font-display font-bold text-foreground">₹{product.price.toLocaleString("en-IN")}</span>
                      <span className="text-lg text-muted-foreground line-through decoration-muted-foreground/50">₹{(product.price * 1.2).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-6">
                       <span className="text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">Save 20%</span>
                       <span className="text-xs text-muted-foreground">Free shipping included</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button onClick={handleAddToCart} size="lg" className="flex-1 rounded-full h-14 text-base font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                        <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full h-14 w-14 border-border/60 hover:bg-muted/30">
                        <Share2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-background rounded-3xl p-6 border border-border/60 shadow-neo mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Enterprise Solution</h3>
                      <Badge variant="secondary" className="rounded-full">B2B Pricing</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">Contact us for volume pricing and installation services.</p>
                    <div className="flex gap-3">
                      <Link to="/business/contact" state={{ interest: `${product.name} (${product.model})` }} className="flex-1">
                        <Button className="w-full rounded-full h-12 uppercase tracking-wide text-xs font-bold">
                          Request Quote
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {product.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between py-6 border-t border-border/30">
                   {[
                     { icon: Truck, label: "Free Delivery" },
                     { icon: ShieldCheck, label: "2 Year Warranty" },
                     { icon: RotateCcw, label: "30 Day Return" },
                   ].map((item) => (
                     <div key={item.label} className="text-center group cursor-default">
                        <div className="w-10 h-10 mx-auto rounded-full bg-muted/20 flex items-center justify-center mb-2 group-hover:bg-accent/20 transition-colors">
                           <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{item.label}</span>
                     </div>
                   ))}
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* ── Technical Specs ── */}
          <section className="mt-20 lg:mt-32">
            <div className="bg-muted/10 rounded-[2.5rem] p-8 md:p-12 border border-border/30">
              <h2 className="font-display text-2xl md:text-3xl font-semibold mb-8 text-center">Technical Specifications</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {specifications.map((spec) => (
                  <div key={spec.label} className="bg-background p-6 rounded-2xl border border-border/20 shadow-sm">
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">{spec.label}</div>
                    <div className="font-semibold text-foreground">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Bundle Upsell ── */}
          {isShop && bundleOils.length > 0 && (
            <section className="mt-20 lg:mt-32">
              <div className="flex items-center gap-3 mb-8">
                 <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <PackagePlus className="w-5 h-5" />
                 </div>
                 <h2 className="font-display text-2xl md:text-3xl font-semibold">Frequently Bought Together</h2>
              </div>

              <div className="bg-background rounded-[2rem] border border-border/40 shadow-neo p-8 md:p-10 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 bg-green-100 dark:bg-green-900/30 rounded-bl-3xl text-green-700 dark:text-green-400 font-bold text-xs uppercase tracking-wider">
                    Save ₹{bundleSavings.toLocaleString("en-IN")}
                 </div>

                 <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
                       <div className="text-center">
                          <div className="w-32 h-32 bg-muted/20 rounded-2xl flex items-center justify-center p-4 mb-3 border border-border/20">
                             <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                          </div>
                          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Diffuser</div>
                       </div>
                       <Plus className="w-6 h-6 text-muted-foreground/50" />
                       {bundleOils.map((oil, i) => (
                          <div key={oil.id} className="flex items-center gap-4 md:gap-8">
                             <div className="text-center">
                                <div className="w-32 h-32 bg-muted/20 rounded-2xl flex items-center justify-center p-4 mb-3 border border-border/20 relative">
                                   <img src={oil.image} alt={oil.name} className="w-full h-full object-contain" />
                                   {i === 0 && <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">Best Seller</div>}
                                </div>
                                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Oil</div>
                             </div>
                             {i < bundleOils.length - 1 && <Plus className="w-6 h-6 text-muted-foreground/50" />}
                          </div>
                       ))}
                    </div>

                    <div className="lg:ml-auto text-center lg:text-right">
                       <div className="mb-4">
                          <div className="text-lg text-muted-foreground line-through decoration-muted-foreground/50">₹{bundleTotal.toLocaleString("en-IN")}</div>
                          <div className="text-4xl font-display font-bold text-foreground">₹{(bundleTotal - bundleSavings).toLocaleString("en-IN")}</div>
                       </div>
                       <Button onClick={handleAddBundleToCart} size="lg" className="rounded-full h-12 w-full md:w-auto shadow-lg shadow-accent/20">
                          Add Bundle to Cart
                       </Button>
                    </div>
                 </div>
              </div>
            </section>
          )}

          {/* ── Related Products ── */}
          {relatedDiffusers.length > 0 && (
            <section className="mt-20 lg:mt-32">
              <h2 className="font-display text-2xl md:text-3xl font-semibold mb-8 text-center">You Might Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedDiffusers.map((rel, idx) => (
                  <AnimatedSection key={rel.id} animation="fadeInUp" delay={idx * 100}>
                    <Link to={`${isShop ? "/shop" : "/business"}/products/${rel.model}`} className="group block">
                      <div className="bg-background rounded-3xl p-4 border border-border/40 hover:border-accent/30 hover:shadow-neo transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                        <div className="aspect-square bg-muted/20 rounded-2xl mb-4 overflow-hidden flex items-center justify-center">
                           <img src={rel.image} alt={rel.name} className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <h4 className="font-display text-base font-semibold text-foreground text-center mb-1 group-hover:text-accent transition-colors">{rel.name}</h4>
                        <p className="text-center text-xs text-muted-foreground mb-4">{rel.coverage}</p>
                        <div className="mt-auto text-center">
                           {isShop ? (
                              <span className="font-semibold">₹{rel.price.toLocaleString("en-IN")}</span>
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
      </div>
    </div>
  );
};

export default ProductDetail;

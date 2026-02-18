import { useParams, Link, useLocation } from "react-router-dom";
import { useState } from "react";
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
} from "lucide-react";
import PageMeta, { createProductSchema, createBreadcrumbSchema } from "@/components/PageMeta";
import { getProductByModel } from "@/data/productData";
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
    <div className="min-h-screen bg-loom overflow-hidden">
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
                    className={`shrink-0 w-20 h-20 rounded-xl p-2 transition-all duration-300 ${
                      activeImage === i ? "card-loom ring-2 ring-accent" : "bg-muted/40"
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
                      <Link to="/business/contact" state={{ interest: `${product.name} (${product.model})` }} className="flex-1">
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
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
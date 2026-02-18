import { Link } from "react-router-dom";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    ShoppingCart,
    Plus,
    Minus,
    Trash2,
    ArrowLeft,
    ArrowRight,
    ShieldCheck,
    Truck,
    CreditCard,
    Droplets,
    Sparkles,
    Star,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import AnimatedSection from "@/components/AnimatedSection";
import PageMeta from "@/components/PageMeta";
import { fragrances, aromaSizes } from "@/data/aromaData";
import { products } from "@/data/productData";

const ShopCart = () => {
    const { items, updateQuantity, removeItem, clearCart, totalItems, totalPrice, addItem } = useCart();

    /* ── Smart suggestions: if cart has diffusers, suggest oils; if oils, suggest diffusers ── */
    const suggestedOils = useMemo(() => {
        const hasDiffuser = items.some((i) => i.type === "diffuser");
        const cartOilIds = new Set(items.filter((i) => i.type === "aroma").map((i) => i.id.split("-").slice(0, -1).join("-")));
        if (!hasDiffuser) return [];
        return fragrances.filter((f) => !cartOilIds.has(f.id)).slice(0, 4);
    }, [items]);

    const suggestedDiffusers = useMemo(() => {
        const hasOil = items.some((i) => i.type === "aroma");
        const cartDiffuserIds = new Set(items.filter((i) => i.type === "diffuser").map((i) => i.id));
        if (!hasOil || items.some((i) => i.type === "diffuser")) return [];
        return products.filter((p) => p.category !== "oil" && !cartDiffuserIds.has(p.id)).slice(0, 3);
    }, [items]);

    const handleAddOil = (oil: typeof fragrances[0]) => {
        addItem({
            id: `${oil.id}-${aromaSizes[0].label}`,
            name: oil.name,
            type: "aroma",
            price: aromaSizes[0].price,
            variant: aromaSizes[0].label,
        });
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <PageMeta
                    title="Your Cart"
                    description="Review your selected diffusers and aroma oils before checkout."
                    keywords="shopping cart, diffuser cart, aroma oil cart"
                    canonicalUrl="https://ezeaircare.com/shop/cart"
                    ogType="website"
                />
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingCart className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h1 className="font-display text-3xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
                    <p className="text-muted-foreground mb-8">Explore our premium diffusers and handcrafted aroma oils.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link to="/shop/products">
                            <Button variant="hero">Shop Diffusers</Button>
                        </Link>
                        <Link to="/shop/aromas">
                            <Button variant="outline">Browse Aromas</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-20">
            <PageMeta
                title="Your Cart"
                description="Review your selected diffusers and aroma oils before checkout."
                keywords="shopping cart, diffuser cart, aroma oil cart"
                canonicalUrl="https://ezeaircare.com/shop/cart"
                ogType="website"
            />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <AnimatedSection animation="fadeInUp">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-3 transition-colors">
                                <ArrowLeft className="w-4 h-4" /> Continue Shopping
                            </Link>
                            <h1 className="font-display text-4xl font-bold text-foreground">Your Cart</h1>
                            <p className="text-muted-foreground mt-1">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={clearCart}>
                            <Trash2 className="w-4 h-4 mr-2" /> Clear All
                        </Button>
                    </div>
                </AnimatedSection>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item, index) => (
                            <AnimatedSection key={item.id} animation="fadeInUp" delay={index * 100}>
                                <Card className="gradient-card border-border/50">
                                    <CardContent className="p-4 sm:p-6">
                                        <div className="flex items-center gap-4">
                                            {/* Image placeholder */}
                                            <div className="w-20 h-20 bg-muted/20 rounded-xl flex items-center justify-center shrink-0">
                                                <ShoppingCart className="w-8 h-8 text-muted-foreground/40" />
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div>
                                                        <h3 className="font-display font-semibold text-foreground">{item.name}</h3>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <Badge variant="secondary" className="text-xs">
                                                                {item.type === "diffuser" ? "Diffuser" : "Aroma Oil"}
                                                            </Badge>
                                                            {item.model && <span className="text-xs text-muted-foreground font-mono">{item.model}</span>}
                                                            {item.variant && <span className="text-xs text-muted-foreground">{item.variant}</span>}
                                                        </div>
                                                    </div>
                                                    <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between mt-4">
                                                    {/* Quantity */}
                                                    <div className="flex items-center gap-1 bg-muted/30 rounded-lg border border-border/50">
                                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-muted/50 rounded-l-lg transition-colors">
                                                            <Minus className="w-3.5 h-3.5" />
                                                        </button>
                                                        <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-muted/50 rounded-r-lg transition-colors">
                                                            <Plus className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                    <span className="text-lg font-bold text-primary">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </AnimatedSection>
                        ))}

                        {/* ═══════ SUGGESTED OILS (when cart has diffusers) ═══════ */}
                        {suggestedOils.length > 0 && (
                            <AnimatedSection animation="fadeInUp" delay={items.length * 100 + 100}>
                                <div className="mt-8">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-9 h-9 rounded-xl gradient-gold shadow-clay-sm flex items-center justify-center">
                                            <Droplets className="w-4 h-4 text-accent-foreground" />
                                        </div>
                                        <div>
                                            <h3 className="font-display text-lg font-semibold text-foreground">Complete Your Setup</h3>
                                            <p className="text-xs text-muted-foreground">Add premium oils for your diffuser</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {suggestedOils.map((oil) => (
                                            <Card key={oil.id} className="card-clay overflow-hidden hover:shadow-clay-lg transition-shadow duration-300">
                                                <div className="aspect-square surface-sunken rounded-xl m-2.5 overflow-hidden flex items-center justify-center relative">
                                                    <img src={oil.image} alt={oil.name} className="w-full h-full object-contain p-3" loading="lazy" />
                                                    <div className="absolute bottom-1.5 right-1.5">
                                                        <span className="pill-raised text-[8px] font-semibold px-1.5 py-0.5">{oil.intensity}</span>
                                                    </div>
                                                </div>
                                                <CardContent className="p-3 pt-0">
                                                    <h4 className="font-display text-sm font-semibold text-foreground truncate">{oil.name}</h4>
                                                    <p className="text-[10px] text-muted-foreground italic">{oil.mood}</p>
                                                    <div className="mt-2 flex items-center justify-between">
                                                        <span className="text-sm font-semibold text-foreground">₹{aromaSizes[0].price.toLocaleString("en-IN")}</span>
                                                        <span className="text-[10px] text-muted-foreground">{aromaSizes[0].label}</span>
                                                    </div>
                                                    <Button variant="hero" size="sm" className="w-full mt-2 text-xs h-8" onClick={() => handleAddOil(oil)}>
                                                        <Plus className="w-3 h-3 mr-1" /> Add
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </AnimatedSection>
                        )}

                        {/* ═══════ SUGGESTED DIFFUSERS (when cart has only oils) ═══════ */}
                        {suggestedDiffusers.length > 0 && (
                            <AnimatedSection animation="fadeInUp" delay={items.length * 100 + 100}>
                                <div className="mt-8">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-9 h-9 rounded-xl gradient-gold shadow-clay-sm flex items-center justify-center">
                                            <Sparkles className="w-4 h-4 text-accent-foreground" />
                                        </div>
                                        <div>
                                            <h3 className="font-display text-lg font-semibold text-foreground">You'll Need a Diffuser</h3>
                                            <p className="text-xs text-muted-foreground">Pair your oils with a premium device</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        {suggestedDiffusers.map((d) => (
                                            <Link key={d.id} to={`/shop/products/${d.model}`}>
                                                <Card className="card-clay overflow-hidden hover:shadow-clay-lg transition-shadow duration-300 cursor-pointer">
                                                    <div className="flex items-center gap-3 p-3">
                                                        <div className="w-16 h-16 surface-sunken rounded-xl flex items-center justify-center shrink-0">
                                                            <img src={d.image} alt={d.name} className="w-full h-full object-contain p-2" />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <h4 className="font-display text-sm font-semibold text-foreground truncate">{d.name}</h4>
                                                            <p className="text-[10px] text-muted-foreground">{d.coverage}</p>
                                                            <div className="flex items-center gap-1 mt-1">
                                                                <Star className="w-3 h-3 text-accent fill-accent" />
                                                                <span className="text-[10px] text-muted-foreground">{d.rating}</span>
                                                            </div>
                                                            <p className="text-sm font-semibold text-foreground mt-1">₹{d.price.toLocaleString("en-IN")}</p>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </AnimatedSection>
                        )}

                        {/* ═══════ OFFER BANNER ═══════ */}
                        <AnimatedSection animation="fadeInUp" delay={items.length * 100 + 200}>
                            <Card className="overflow-hidden mt-6 bg-gradient-to-r from-accent/10 via-accent/5 to-transparent border-accent/20">
                                <CardContent className="p-5 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl gradient-gold flex items-center justify-center shrink-0">
                                        <Sparkles className="w-5 h-5 text-accent-foreground" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-display font-semibold text-foreground text-sm">Bundle & Save 10%</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">Buy any diffuser + 2 oils and get 10% off your entire order</p>
                                    </div>
                                    <Link to="/shop/products">
                                        <Button variant="outline" size="sm" className="shrink-0 text-xs">
                                            Shop Now <ArrowRight className="w-3 h-3 ml-1" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <AnimatedSection animation="fadeInUp" delay={200}>
                            <Card className="gradient-card border-border/50 sticky top-24">
                                <CardContent className="p-6 space-y-6">
                                    <h2 className="font-display text-xl font-bold text-foreground">Order Summary</h2>

                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>Subtotal ({totalItems} items)</span>
                                            <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                                        </div>
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>Shipping</span>
                                            <span className="text-accent font-medium">FREE</span>
                                        </div>
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>GST (18%)</span>
                                            <span>₹{Math.round(totalPrice * 0.18).toLocaleString("en-IN")}</span>
                                        </div>
                                        <div className="border-t border-border/50 pt-3 flex justify-between text-lg font-bold text-foreground">
                                            <span>Total</span>
                                            <span>₹{Math.round(totalPrice * 1.18).toLocaleString("en-IN")}</span>
                                        </div>
                                    </div>

                                    <Link to="/shop/checkout">
                                        <Button variant="hero" size="lg" className="w-full group">
                                            <CreditCard className="w-4 h-4 mr-2" />
                                            Proceed to Checkout
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>

                                    <div className="space-y-2 pt-2">
                                        {[
                                            { icon: Truck, text: "Free shipping on all orders" },
                                            { icon: ShieldCheck, text: "Secure payment processing" },
                                        ].map((p) => (
                                            <div key={p.text} className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <p.icon className="w-3.5 h-3.5 text-accent" />
                                                <span>{p.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopCart;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    ArrowRight, ArrowLeft, ShieldCheck, Truck, CreditCard, CheckCircle2,
    MapPin, Package, Sparkles
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import AnimatedSection from "@/components/AnimatedSection";
import PageMeta from "@/components/PageMeta";

type Step = "shipping" | "payment" | "confirmation";

const ShopCheckout = () => {
    const { items, totalPrice, clearCart } = useCart();
    const { toast } = useToast();
    const navigate = useNavigate();

    const [step, setStep] = useState<Step>("shipping");
    const [shipping, setShipping] = useState({
        name: "", email: "", phone: "", address: "", city: "", state: "", pincode: ""
    });
    const [processing, setProcessing] = useState(false);

    const SHIPPING_FREE_ABOVE = 2000;
    const shippingCost = totalPrice >= SHIPPING_FREE_ABOVE ? 0 : 199;
    const orderTotal = totalPrice + shippingCost;

    if (items.length === 0 && step !== "confirmation") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Package className="w-16 h-16 text-muted-foreground/30 mx-auto" />
                    <h2 className="font-display text-2xl font-bold text-foreground">Your cart is empty</h2>
                    <Link to="/shop/products">
                        <Button variant="hero">Browse Products</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const handleShippingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep("payment");
        window.scrollTo(0, 0);
    };

    const handlePayment = async () => {
        setProcessing(true);
        // Mock payment processing
        await new Promise((r) => setTimeout(r, 2000));
        setProcessing(false);
        setStep("confirmation");
        clearCart();
        toast({ title: "Order Placed! 🎉", description: "You'll receive a confirmation email shortly." });
        window.scrollTo(0, 0);
    };

    const stepLabels: { key: Step; label: string; icon: React.ElementType }[] = [
        { key: "shipping", label: "Shipping", icon: MapPin },
        { key: "payment", label: "Payment", icon: CreditCard },
        { key: "confirmation", label: "Confirmation", icon: CheckCircle2 },
    ];
    const currentStepIdx = stepLabels.findIndex((s) => s.key === step);

    return (
        <div className="min-h-screen pt-28 pb-20">
            <PageMeta
                title="Checkout"
                description="Secure checkout for EZE AirCare diffusers and aroma oils with fast delivery and trusted payment flow."
                keywords="checkout, secure order, fragrance purchase, diffuser payment"
                canonicalUrl="https://ezeaircare.com/shop/checkout"
                ogType="website"
            />
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Step Indicator */}
                <div className="flex items-center justify-center gap-2 mb-12">
                    {stepLabels.map((s, i) => (
                        <div key={s.key} className="flex items-center gap-2">
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${i <= currentStepIdx ? "bg-primary/10 text-primary border border-primary/30" : "bg-muted/30 text-muted-foreground border border-border/30"}`}>
                                <s.icon className="w-4 h-4" />
                                <span className="hidden sm:inline">{s.label}</span>
                            </div>
                            {i < stepLabels.length - 1 && (
                                <div className={`w-8 h-0.5 ${i < currentStepIdx ? "bg-primary" : "bg-border"}`} />
                            )}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left: Form Area */}
                    <div className="lg:col-span-2">
                        {/* ── SHIPPING ── */}
                        {step === "shipping" && (
                            <AnimatedSection animation="fadeInUp">
                                <Card className="gradient-card shadow-elegant border-border/50">
                                    <CardContent className="p-8">
                                        <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                                            <MapPin className="w-6 h-6 text-primary" /> Shipping Address
                                        </h2>
                                        <form onSubmit={handleShippingSubmit} className="space-y-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name">Full Name</Label>
                                                    <Input id="name" placeholder="Jane Smith" required value={shipping.name}
                                                        onChange={(e) => setShipping(p => ({ ...p, name: e.target.value }))} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input id="email" type="email" placeholder="you@email.com" required value={shipping.email}
                                                        onChange={(e) => setShipping(p => ({ ...p, email: e.target.value }))} />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone</Label>
                                                <Input id="phone" type="tel" placeholder="+91 98765 43210" required value={shipping.phone}
                                                    onChange={(e) => setShipping(p => ({ ...p, phone: e.target.value }))} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="address">Address</Label>
                                                <Input id="address" placeholder="Street address, apartment, suite" required value={shipping.address}
                                                    onChange={(e) => setShipping(p => ({ ...p, address: e.target.value }))} />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="city">City</Label>
                                                    <Input id="city" placeholder="Mumbai" required value={shipping.city}
                                                        onChange={(e) => setShipping(p => ({ ...p, city: e.target.value }))} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="state">State</Label>
                                                    <Input id="state" placeholder="Maharashtra" required value={shipping.state}
                                                        onChange={(e) => setShipping(p => ({ ...p, state: e.target.value }))} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="pincode">PIN Code</Label>
                                                    <Input id="pincode" placeholder="400001" required value={shipping.pincode}
                                                        onChange={(e) => setShipping(p => ({ ...p, pincode: e.target.value }))} />
                                                </div>
                                            </div>
                                            <div className="flex gap-3 pt-4">
                                                <Link to="/shop/cart">
                                                    <Button variant="outline" type="button">
                                                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Cart
                                                    </Button>
                                                </Link>
                                                <Button variant="hero" type="submit" className="flex-1">
                                                    Continue to Payment
                                                    <ArrowRight className="w-4 h-4 ml-2" />
                                                </Button>
                                            </div>
                                        </form>
                                    </CardContent>
                                </Card>
                            </AnimatedSection>
                        )}

                        {/* ── PAYMENT ── */}
                        {step === "payment" && (
                            <AnimatedSection animation="fadeInUp">
                                <Card className="gradient-card shadow-elegant border-border/50">
                                    <CardContent className="p-8">
                                        <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                                            <CreditCard className="w-6 h-6 text-primary" /> Payment
                                        </h2>

                                        <div className="space-y-4 mb-8">
                                            <div className="p-4 bg-accent/5 border border-accent/20 rounded-xl flex items-start gap-3">
                                                <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-sm font-semibold text-foreground">Secure Payment</p>
                                                    <p className="text-xs text-muted-foreground">All transactions are encrypted and processed securely.</p>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Card Number</Label>
                                                <Input placeholder="4242 4242 4242 4242" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label>Expiry</Label>
                                                    <Input placeholder="MM / YY" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>CVV</Label>
                                                    <Input placeholder="123" type="password" />
                                                </div>
                                            </div>

                                            <div className="p-3 bg-muted/30 rounded-lg text-xs text-muted-foreground">
                                                💡 This is a demo checkout — no real charges will be made.
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <Button variant="outline" onClick={() => { setStep("shipping"); window.scrollTo(0, 0); }}>
                                                <ArrowLeft className="w-4 h-4 mr-2" /> Back
                                            </Button>
                                            <Button variant="hero" className="flex-1" onClick={handlePayment} disabled={processing}>
                                                {processing ? (
                                                    <>Processing...</>
                                                ) : (
                                                    <>
                                                        Pay ₹{orderTotal.toLocaleString("en-IN")}
                                                        <ArrowRight className="w-4 h-4 ml-2" />
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </AnimatedSection>
                        )}

                        {/* ── CONFIRMATION ── */}
                        {step === "confirmation" && (
                            <AnimatedSection animation="fadeInUp">
                                <Card className="gradient-card shadow-elegant border-border/50">
                                    <CardContent className="p-8 sm:p-12 text-center">
                                        <div className="animate-in zoom-in-50 duration-500">
                                            <CheckCircle2 className="w-20 h-20 text-primary mx-auto mb-6" />
                                        </div>
                                        <h2 className="font-display text-3xl font-bold text-foreground mb-3">Order Confirmed!</h2>
                                        <p className="text-lg text-muted-foreground mb-2">Thank you, {shipping.name || "you"}!</p>
                                        <p className="text-muted-foreground mb-6">
                                            Order #{Math.random().toString(36).substring(2, 10).toUpperCase()} has been placed. We'll email you tracking info soon.
                                        </p>

                                        <div className="bg-muted/20 rounded-xl p-6 mb-8 text-left space-y-2 max-w-md mx-auto">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Shipping to</span>
                                                <span className="font-medium">{shipping.city}, {shipping.state}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Estimated delivery</span>
                                                <span className="font-medium">3-5 business days</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                            <Link to="/shop">
                                                <Button variant="hero" className="group">
                                                    <Sparkles className="w-4 h-4 mr-2" />
                                                    Continue Shopping
                                                </Button>
                                            </Link>
                                            <Link to="/shop/dashboard">
                                                <Button variant="outline">View My Orders</Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            </AnimatedSection>
                        )}
                    </div>

                    {/* Right: Order Summary */}
                    {step !== "confirmation" && (
                        <div className="lg:col-span-1">
                            <Card className="gradient-card shadow-elegant border-border/50 sticky top-28">
                                <CardContent className="p-6">
                                    <h3 className="font-display text-lg font-bold text-foreground mb-4">Order Summary</h3>
                                    <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex items-center gap-3 py-2 border-b border-border/30 last:border-0">
                                                {item.image && (
                                                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-muted/20" />
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                                                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                                </div>
                                                <span className="text-sm font-semibold text-foreground">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-2 pt-3 border-t border-border/30">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span className="text-foreground">₹{totalPrice.toLocaleString("en-IN")}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Shipping</span>
                                            <span className={shippingCost === 0 ? "text-accent font-medium" : "text-foreground"}>
                                                {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-lg font-bold pt-2 border-t border-border/30">
                                            <span>Total</span>
                                            <span className="text-primary">₹{orderTotal.toLocaleString("en-IN")}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 space-y-2">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Truck className="w-3.5 h-3.5 text-accent" /> Free shipping above ₹2,000
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <ShieldCheck className="w-3.5 h-3.5 text-accent" /> 30-day easy returns
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShopCheckout;

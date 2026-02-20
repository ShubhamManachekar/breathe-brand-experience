import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import PageMeta from "@/components/PageMeta";
import AnimatedSection from "@/components/AnimatedSection";

const ShopCart = () => {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const subtotal = totalPrice;
  const discount = 0;
  const shipping = totalPrice >= 2000 ? 0 : 150;
  const total = subtotal - discount + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <PageMeta
          title="Your Shopping Cart"
          description="Review your selected diffusers and aroma oils."
          keywords="shopping cart, checkout, basket"
          ogType="website"
        />
        <AnimatedSection animation="fadeInUp" className="text-center max-w-md">
          <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-10 h-10 text-accent" />
          </div>
          <h1 className="font-display text-3xl font-semibold text-foreground mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Explore our collection of premium diffusers and handcrafted aroma oils to find your perfect scent.
          </p>
          <Link to="/shop/products">
            <Button size="lg" className="rounded-full px-8 shadow-neo hover:translate-y-[-2px] transition-transform">
              Start Shopping
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <PageMeta
        title="Your Shopping Cart"
        description="Review your items and proceed to secure checkout."
        keywords="cart, checkout, eze aircare store"
        ogType="website"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-10">Your Cart</h1>

        <div className="grid lg:grid-cols-[1fr_0.6fr] gap-12">
          {/* ── Cart Items ── */}
          <div className="space-y-6">
            {items.map((item, index) => (
              <AnimatedSection key={`${item.id}-${item.variant}`} animation="fadeInUp" delay={index * 50}>
                <div className="flex gap-6 p-4 rounded-[1.5rem] bg-background border border-border/40 hover:border-accent/30 transition-colors group">
                  <div className="w-24 h-24 bg-muted/20 rounded-2xl flex items-center justify-center shrink-0 p-2">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    ) : (
                      <Sparkles className="w-8 h-8 text-accent/50" />
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-display text-lg font-semibold text-foreground">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.type === 'aroma' ? 'Aroma Oil' : 'Diffuser'} {item.variant && `• ${item.variant}`}</p>
                      </div>
                      <p className="font-semibold text-foreground">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3 bg-muted/30 rounded-full px-3 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-background text-muted-foreground transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-background text-foreground transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* ── Order Summary ── */}
          <div className="lg:sticky lg:top-24 h-fit">
            <AnimatedSection animation="fadeInUp" delay={200}>
              <div className="bg-background/80 backdrop-blur-xl rounded-[2rem] border border-white/20 dark:border-white/5 shadow-neo p-8">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-foreground/70">
                      <span>Discount</span>
                      <span>-₹{discount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-foreground">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                  </div>

                  <div className="h-px bg-border/40 my-4" />

                  <div className="flex justify-between items-end">
                    <span className="text-base font-semibold text-foreground">Total</span>
                    <span className="text-2xl font-display font-bold text-foreground">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <Link to="/shop/checkout" className="block w-full">
                  <Button size="lg" className="w-full rounded-full h-14 text-base font-bold shadow-lg shadow-primary/20 hover:translate-y-[-2px] transition-transform">
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span>Secure SSL Encrypted Payment</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCart;

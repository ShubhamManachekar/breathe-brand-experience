import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles, ShoppingBag, Star, Wind } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import PageMeta from "@/components/PageMeta";
import AnimatedSection from "@/components/AnimatedSection";
import { products, productCategories } from "@/data/productData";
import { fragrances, aromaSizes, fragranceFamilies } from "@/data/aromaData";

const ShopCart = () => {
  const { items, removeItem, updateQuantity, total, subtotal, shipping, discount, addItem } = useCart();

  const suggestedDiffusers = products.filter(p => !p.category.includes("oil")).slice(0, 2);
  const suggestedOils = fragrances.slice(0, 2);
  const suggestions = [...suggestedDiffusers, ...suggestedOils];

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
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
    <div className="min-h-screen bg-transparent pt-24 pb-20">
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
                    <div className="flex justify-between text-sm text-green-600">
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

        {/* ── Suggestions Section ── */}
        <div className="mt-20 pt-10 border-t border-border/20">
          <AnimatedSection animation="fadeInUp">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-8">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {suggestions.map((suggestionItem, index) => {
                const isDiffuser = 'model' in suggestionItem;

                if (isDiffuser) {
                  const product = suggestionItem as typeof products[0];
                  const cat = productCategories.find((c) => c.id === product.category);
                  return (
                    <div key={`sugg-d-${product.id}`} className="h-full">
                      <div className="group relative bg-background rounded-[2rem] border border-border/40 hover:border-accent/30 shadow-sm hover:shadow-neo-hover transition-all duration-500 hover:-translate-y-2 flex flex-col h-full overflow-hidden">
                        {/* Image Area */}
                        <Link to={`/shop/products/${product.model}`} className="block relative aspect-square bg-muted/10 m-2 rounded-[1.5rem] overflow-hidden shrink-0 h-[220px]">
                          <div className="absolute inset-0 flex items-center justify-center p-8 group-hover:scale-110 transition-transform duration-700 ease-out">
                            <img src={product.image} alt={product.name} className="w-full h-full object-contain drop-shadow-xl" loading="lazy" />
                          </div>

                          {/* Tags */}
                          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                            {product.tag && (
                              <span className="bg-background/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-foreground border border-border/20 shadow-sm">
                                {product.tag}
                              </span>
                            )}
                            <div className="w-8 h-8 rounded-full bg-background/90 backdrop-blur-md flex items-center justify-center shadow-sm text-xs font-bold text-foreground ml-auto">
                              {product.rating}
                            </div>
                          </div>

                          {/* Quick Add Overlay */}
                          <div className="absolute inset-x-4 bottom-4 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-300 z-10">
                            <Button className="w-full rounded-full shadow-lg bg-foreground text-background hover:bg-foreground/90 h-10 text-xs font-bold uppercase tracking-wide" onClick={(e) => {
                              e.preventDefault();
                              addItem({
                                id: product.id,
                                name: product.name,
                                model: product.model,
                                type: "diffuser",
                                price: product.price,
                                image: product.image,
                              });
                            }}>
                              Quick Add
                            </Button>
                          </div>
                        </Link>

                        {/* Details */}
                        <div className="p-5 pt-2 flex flex-col flex-1 min-h-[180px]">
                          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                            <span>{cat?.name}</span>
                            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                            <span>{product.model}</span>
                          </div>

                          <Link to={`/shop/products/${product.model}`}>
                            <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors truncate">{product.name}</h3>
                          </Link>

                          <div className="mt-3 space-y-1">
                            {product.features.slice(0, 2).map((f) => (
                              <div key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground truncate">
                                <Wind className="w-3 h-3 text-accent/70 shrink-0" />
                                <span className="truncate">{f}</span>
                              </div>
                            ))}
                          </div>

                          <div className="mt-auto pt-4 border-t border-border/20 flex items-center justify-between">
                            <div>
                              <span className="text-[10px] text-muted-foreground uppercase tracking-wide block">Price</span>
                              <span className="text-lg font-semibold text-foreground">₹{product.price.toLocaleString("en-IN")}</span>
                            </div>
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent/10 hover:text-accent transition-colors -mr-2" onClick={(e) => {
                              e.preventDefault();
                              addItem({
                                id: product.id,
                                name: product.name,
                                model: product.model,
                                type: "diffuser",
                                price: product.price,
                                image: product.image,
                              });
                            }}>
                              <ShoppingBag className="w-5 h-5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                const aroma = suggestionItem as typeof fragrances[0];
                const family = fragranceFamilies.find(f => f.id === aroma.family);
                return (
                  <div key={`sugg-a-${aroma.id}`} className="h-full">
                    <Link to="/shop/aromas" className="block group h-full bg-background rounded-[2rem] border border-border/40 hover:border-accent/30 shadow-sm hover:shadow-neo-hover transition-all duration-500 hover:-translate-y-2 flex flex-col overflow-hidden">
                      <div className="relative aspect-square bg-muted/10 m-2 rounded-[1.5rem] overflow-hidden flex items-center justify-center shrink-0 h-[220px]">
                        <div className={`absolute inset-0 bg-gradient-to-tr ${family?.bgColor || 'from-gray-100 to-gray-50'} opacity-30`} />
                        <img src={aroma.image} alt={aroma.name} className="w-1/2 h-1/2 object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110" loading="lazy" />

                        <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-2 py-1 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-wider text-foreground">
                          {aroma.intensity}
                        </div>

                        {/* Quick Add Overlay */}
                        <div className="absolute inset-x-4 bottom-4 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-300 z-10">
                          <Button className="w-full rounded-full shadow-lg bg-foreground text-background hover:bg-foreground/90 h-10 text-xs font-bold uppercase tracking-wide" onClick={(e) => {
                            e.preventDefault();
                            addItem({
                              id: `${aroma.id}-100ml`,
                              name: aroma.name,
                              type: "aroma",
                              price: aromaSizes[0].price,
                              variant: "100ml",
                              image: aroma.image,
                            });
                          }}>
                            Quick Add
                          </Button>
                        </div>
                      </div>

                      <div className="p-5 pt-2 flex flex-col flex-1 min-h-[180px]">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`w-2 h-2 rounded-full ${family?.color.replace('text-', 'bg-')}`} />
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{family?.name}</span>
                        </div>

                        <h3 className="font-display text-lg font-semibold text-foreground mb-1 truncate">{aroma.name}</h3>
                        <p className="text-xs text-muted-foreground italic mb-4 truncate">"{aroma.mood}"</p>

                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {aroma.notes.slice(0, 3).map(note => (
                            <span key={note} className="text-[10px] bg-muted/30 px-2 py-1 rounded-md text-foreground/80 font-medium truncate max-w-[80px]">
                              {note}
                            </span>
                          ))}
                        </div>

                        <div className="mt-auto pt-4 border-t border-border/20 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-wide block">Starts at</span>
                            <span className="text-lg font-semibold text-foreground">₹{aromaSizes[0].price.toLocaleString("en-IN")}</span>
                          </div>
                          <Button
                            size="icon"
                            className="rounded-full h-10 w-10 bg-accent text-accent-foreground shadow-lg shadow-accent/20 hover:scale-105 transition-transform"
                            onClick={(e) => {
                              e.preventDefault();
                              addItem({
                                id: `${aroma.id}-100ml`,
                                name: aroma.name,
                                type: "aroma",
                                price: aromaSizes[0].price,
                                variant: "100ml",
                                image: aroma.image,
                              });
                            }}
                          >
                            <ShoppingBag className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>

      </div>
    </div>
  );
};

export default ShopCart;

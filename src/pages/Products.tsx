import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Wifi, Bluetooth, Zap, Shield, Settings, ArrowRight, RotateCcw, MousePointer, Info, ChevronRight, Wind, Activity } from "lucide-react";
import diffuserImage from "@/assets/diffuser-360.jpg";
import AnimatedSection from "@/components/AnimatedSection";

const Products = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  const products = [
    {
      name: "EZE Pro Diffuser",
      model: "EP-500",
      coverage: "Up to 500 sqm",
      features: ["Wi-Fi & Bluetooth", "HVAC Integration", "App Control", "Smart Scheduling"],
      price: "₹45,000",
      image: diffuserImage,
      description: "Professional-grade diffuser perfect for large retail spaces and offices",
      popular: true
    },
    {
      name: "EZE Compact",
      model: "EC-200",
      coverage: "Up to 200 sqm",
      features: ["Bluetooth Control", "Portable Design", "Easy Installation", "Timer Function"],
      price: "₹18,000",
      image: diffuserImage,
      description: "Compact solution ideal for boutiques, clinics, and small offices",
      popular: false
    },
    {
      name: "EZE Elite",
      model: "EE-1000",
      coverage: "Up to 1000 sqm",
      features: ["Central HVAC", "Multi-Zone Control", "Professional Installation", "24/7 Monitoring"],
      price: "₹85,000",
      image: diffuserImage,
      description: "Enterprise-level system for hotels, shopping malls, and large corporate spaces",
      popular: false
    }
  ];

  const hotspots = [
    {
      id: "nozzle",
      x: 35,
      y: 40,
      title: "Atomization Nozzle",
      description: "Patented turbofan atomization technology ensures even scent distribution without heat or residue. Creates ultra-fine particles for optimal coverage."
    },
    {
      id: "control",
      x: 65,
      y: 25,
      title: "Smart Control Panel",
      description: "Wi-Fi and Bluetooth enabled control system. Manage intensity, scheduling, and monitoring remotely via smartphone app or web dashboard."
    },
    {
      id: "cartridge",
      x: 50,
      y: 70,
      title: "Fragrance Cartridge",
      description: "Easy-swap capsule system with leak-proof design. Each cartridge lasts 30-60 days depending on usage intensity and coverage area."
    },
    {
      id: "hvac",
      x: 20,
      y: 60,
      title: "HVAC Connection",
      description: "Direct integration with existing air conditioning systems for seamless building-wide scent distribution through existing ductwork."
    }
  ];

  const specifications = [
    { label: "Dimensions", value: "25cm × 15cm × 10cm" },
    { label: "Weight", value: "2.5 kg" },
    { label: "Power Consumption", value: "12W" },
    { label: "Noise Level", value: "< 35dB" },
    { label: "Connectivity", value: "Wi-Fi, Bluetooth 5.0" },
    { label: "Operating Temperature", value: "5°C to 45°C" },
    { label: "Cartridge Capacity", value: "500ml" },
    { label: "Coverage Area", value: "Up to 500 sqm" }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimatedSection animation="fadeInUp">
            <Badge variant="outline" className="mb-6 px-4 py-1 text-sm border-primary/20 text-primary bg-primary/5 backdrop-blur-sm">
              Engineering Excellence
            </Badge>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tight">
              Professional Scent
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> Diffusion Systems</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              Advanced atomization technology meets elegant design. Explore our range of
              professional-grade diffusers engineered for reliability.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Interactive 360° Product Explorer */}
      <section className="py-20 bg-muted/20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Interactive 360° Explorer
            </h2>
            <p className="text-lg text-muted-foreground">
              Interact with our flagship diffuser. Click hotspots to discover key features.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* 360° Viewer */}
            <AnimatedSection animation="fadeInScale" className="gradient-card rounded-3xl p-1 shadow-2xl border border-white/20 bg-white/5 backdrop-blur-xl">
              <div className="bg-background rounded-[1.4rem] p-8 h-full relative overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] opacity-[0.03] pointer-events-none">
                  {[...Array(400)].map((_, i) => <div key={i} className="border-r border-b border-foreground" />)}
                </div>

                <div className="relative aspect-square flex items-center justify-center">
                  <img
                    src={diffuserImage}
                    alt="EZE AirCare Pro Diffuser 360 View"
                    className="w-full h-full object-contain transition-transform duration-300 drop-shadow-2xl"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  />

                  {/* Hotspots */}
                  {hotspots.map((hotspot) => (
                    <button
                      key={hotspot.id}
                      className={`absolute w-8 h-8 rounded-full border-2 border-accent bg-accent/20 hover:bg-accent hover:text-white hover:scale-125 transition-all duration-300 flex items-center justify-center group z-20 ${selectedHotspot === hotspot.id ? 'bg-accent scale-125 text-white' : 'text-accent'
                        }`}
                      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                      onClick={() => setSelectedHotspot(selectedHotspot === hotspot.id ? null : hotspot.id)}
                    >
                      <MousePointer className="w-4 h-4" />
                      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {hotspot.title}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Rotation Controls */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-background/80 backdrop-blur-md px-4 py-2 rounded-full border border-border/50 shadow-lg">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setRotation(r => r - 45)}
                    className="hover:bg-accent/10 hover:text-accent rounded-full"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </Button>
                  <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Rotate</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setRotation(r => r + 45)}
                    className="hover:bg-accent/10 hover:text-accent rounded-full"
                  >
                    <RotateCcw className="w-5 h-5 scale-x-[-1]" />
                  </Button>
                </div>
              </div>
            </AnimatedSection>

            {/* Feature Details */}
            <div className="space-y-6">
              <div className="min-h-[140px]">
                {selectedHotspot ? (
                  <Card className="gradient-card shadow-lg animate-fade-in-scale border-accent/20 bg-accent/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <div className="p-2 rounded-lg bg-accent/10">
                          <Info className="w-5 h-5 text-accent" />
                        </div>
                        <span>{hotspots.find(h => h.id === selectedHotspot)?.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {hotspots.find(h => h.id === selectedHotspot)?.description}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="gradient-card shadow-sm border-dashed border-2 bg-transparent">
                    <CardContent className="flex flex-col items-center justify-center p-8 text-center h-full">
                      <MousePointer className="w-8 h-8 text-muted-foreground/50 mb-4 animate-bounce" />
                      <p className="text-lg font-medium text-foreground">Select a hotspot</p>
                      <p className="text-muted-foreground text-sm">
                        Click on the indicators to view technical details
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Specifications */}
              <Card className="gradient-card shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-accent" />
                    Technical Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {specifications.map((spec) => (
                      <div key={spec.label} className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-border/30 last:border-0">
                        <span className="text-muted-foreground text-sm">{spec.label}</span>
                        <span className="font-medium text-sm text-foreground">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-wrap gap-3 pt-4">
                <Badge variant="secondary" className="px-3 py-1.5 text-sm gap-1.5"><Wifi className="w-3.5 h-3.5" /> Wi-Fi Enabled</Badge>
                <Badge variant="secondary" className="px-3 py-1.5 text-sm gap-1.5"><Bluetooth className="w-3.5 h-3.5" /> Bluetooth 5.0</Badge>
                <Badge variant="secondary" className="px-3 py-1.5 text-sm gap-1.5"><Wind className="w-3.5 h-3.5" /> HVAC Ready</Badge>
                <Badge variant="secondary" className="px-3 py-1.5 text-sm gap-1.5"><Shield className="w-3.5 h-3.5" /> 2-Year Warranty</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Range */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Complete Product Range
            </h2>
            <p className="text-xl text-muted-foreground">
              Professional diffusers designed for every space size and application
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <AnimatedSection key={product.model} animation="fadeInUp" delay={index * 200}>
                <Card className={`gradient-card h-full transition-all duration-500 hover:shadow-elegant group relative overflow-hidden border-border/50 ${product.popular ? 'border-accent/40 shadow-lg' : ''}`}>
                  {product.popular && (
                    <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-3 py-1 rounded-bl-xl shadow-sm z-10">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <CardHeader className="text-center pb-2 relative z-10">
                    <div className="aspect-square bg-muted/20 rounded-2xl mb-6 overflow-hidden relative group-hover:scale-105 transition-transform duration-500">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover mix-blend-multiply"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <CardTitle className="font-display text-2xl mb-1">{product.name}</CardTitle>
                    <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider">{product.model}</p>
                  </CardHeader>

                  <CardContent className="space-y-6 relative z-10">
                    <div className="text-center pb-2 border-b border-border/30">
                      <div className="text-3xl font-bold text-primary mb-1">{product.price}</div>
                      <p className="text-xs text-muted-foreground">+ GST</p>
                    </div>

                    <p className="text-muted-foreground text-center text-sm leading-relaxed min-h-[40px]">
                      {product.description}
                    </p>

                    <div className="space-y-3">
                      {product.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                          <span className="text-muted-foreground group-hover:text-foreground transition-colors">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs font-medium text-accent bg-accent/5 rounded-lg p-3">
                      <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> Coverage</span>
                      <span>{product.coverage}</span>
                    </div>

                    <div className="pt-2 flex gap-3">
                      <Link to={`/products/${product.model}`} className="flex-1">
                        <Button className="w-full group" variant="hero">
                          View Details
                        </Button>
                      </Link>
                      <Link to="/contact-quote" state={{ interest: `${product.name} (${product.model})` }} className="flex-1">
                        <Button className="w-full" variant="outline">
                          Request Quote
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-24 bg-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <AnimatedSection animation="fadeInUp">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                  <Zap className="w-3.5 h-3.5" />
                  Core Technology
                </div>
                <h2 className="font-display text-4xl font-bold text-foreground mb-6 leading-tight">
                  Patented Cold-Air <br />
                  <span className="text-accent">Diffusion Technology</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Our proprietary turbofan atomization system creates scent particles smaller than 1 micron—50x smaller than traditional sprays. This ensures scent remains suspended in the air longer and maintains the true integrity of the fragrance profile.
                </p>
              </AnimatedSection>

              <div className="space-y-6">
                {[
                  { icon: Wind, title: "Heat-Free Operation", desc: "Preserves fragrance integrity and therapeutic properties by avoiding thermal degradation." },
                  { icon: Shield, title: "Hypoallergenic & Safe", desc: "No resident, parabens, or harmful VOCs. Perfectly safe for pets and children." },
                  { icon: Settings, title: "Micro-Dosing Control", desc: "Precise intensity management allows for subtle background scenting or bold statements." }
                ].map((item, i) => (
                  <AnimatedSection key={i} animation="fadeInUp" delay={200 + (i * 100)}>
                    <div className="flex gap-4 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-accent/30 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            <AnimatedSection animation="fadeInScale" delay={400}>
              <Card className="gradient-card shadow-2xl border-0 bg-gradient-to-br from-primary/90 to-accent text-white overflow-hidden relative">
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-black/10 rounded-full blur-3xl pointer-events-none" />

                <CardContent className="p-12 relative z-10 flex flex-col h-full justify-between gap-12">
                  <div>
                    <h3 className="font-display text-3xl font-bold mb-8">Performance Metrics</h3>
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium opacity-90">
                          <span>Scent Coverage Efficiency</span>
                          <span>98.5%</span>
                        </div>
                        <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                          <div className="h-full bg-white w-[98.5%] rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium opacity-90">
                          <span>Fragrance Oil Economy</span>
                          <span>40% More Efficient</span>
                        </div>
                        <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                          <div className="h-full bg-white w-[85%] rounded-full opacity-80" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium opacity-90">
                          <span>Silent Operation</span>
                          <span>&lt; 30dB (Whisper Quiet)</span>
                        </div>
                        <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                          <div className="h-full bg-white w-[95%] rounded-full opacity-80" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/20">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <div className="text-4xl font-bold mb-1">60<span className="text-xl opacity-60 ml-1">Days</span></div>
                        <div className="text-sm opacity-70">Average Refill Cycle</div>
                      </div>
                      <div>
                        <div className="text-4xl font-bold mb-1">12<span className="text-xl opacity-60 ml-1">Watts</span></div>
                        <div className="text-sm opacity-70">Energy Consumption</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/95" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />

        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              Experience the Difference
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Transform your environment with EZE AirCare. Get a personalized consultation and discover the perfect scent branding strategy for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact-quote" state={{ interest: "General Product Inquiry" }}>
                <Button size="xl" className="bg-white text-primary hover:bg-gray-100 font-bold px-8 shadow-xl hover:shadow-2xl transition-all">
                  Get Custom Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/aroma-library">
                <Button variant="outline" size="xl" className="border-white/40 text-white hover:bg-white/10 backdrop-blur-sm px-8">
                  Browse Fragrance Library
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Products;
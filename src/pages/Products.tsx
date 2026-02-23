import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NeoHero from "@/components/NeoHero";
import {
  Wifi,
  Bluetooth,
  ShieldCheck,
  Settings,
  ArrowRight,
  RotateCcw,
  MousePointer,
  Info,
  Wind,
  Activity,
  Calendar,
  CheckCircle,
} from "lucide-react";
const diffuserImage = "/optimized/diffuser-360-1280.webp";
const diffuserImageSrcSet = "/optimized/diffuser-360-640.webp 640w, /optimized/diffuser-360-960.webp 960w, /optimized/diffuser-360-1280.webp 1280w";
import AnimatedSection from "@/components/AnimatedSection";
import PageMeta, { createProductSchema, createBreadcrumbSchema } from "@/components/PageMeta";
import { products } from "@/data/productData";

const Products = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  const b2bProducts = products.filter((p) => p.category === "cold-air");

  const productSchemas = b2bProducts.map((p) =>
    createProductSchema({
      name: p.name,
      model: p.model,
      description: p.description,
      price: p.price,
    })
  );

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://ezeaircare.com/business" },
    { name: "Products", url: "https://ezeaircare.com/business/products" },
  ]);

  const hotspots = [
    {
      id: "nozzle",
      x: 35,
      y: 40,
      title: "Atomization Nozzle",
      description:
        "Patented turbofan atomization ensures even scent distribution without heat or residue.",
    },
    {
      id: "control",
      x: 65,
      y: 25,
      title: "Smart Control Panel",
      description:
        "Wi-Fi and Bluetooth control with scheduling, intensity, and remote monitoring.",
    },
    {
      id: "cartridge",
      x: 50,
      y: 70,
      title: "Fragrance Cartridge",
      description:
        "Quick-swap capsule system with leak-proof design and long-lasting output.",
    },
    {
      id: "hvac",
      x: 20,
      y: 60,
      title: "HVAC Connection",
      description:
        "Direct integration with ductwork for seamless building-wide diffusion.",
    },
  ];

  const specifications = [
    { label: "Dimensions", value: "25cm × 15cm × 10cm" },
    { label: "Weight", value: "2.5 kg" },
    { label: "Power Consumption", value: "12W" },
    { label: "Noise Level", value: "< 35dB" },
    { label: "Connectivity", value: "Wi-Fi, Bluetooth 5.0" },
    { label: "Cartridge Capacity", value: "500ml" },
    { label: "Coverage Area", value: "Up to 1000 sqm" },
  ];

  return (
    <div className="min-h-screen bg-transparent overflow-hidden">
      <PageMeta
        title="Commercial Scent Diffusers for Business"
        description="Professional-grade scent diffusers for hotels, retail, corporate spaces. Wi-Fi enabled, HVAC integration, 2-year warranty. Request a quote today."
        keywords="commercial diffuser, business scent diffuser, HVAC scenting, professional aromatherapy"
        ogType="website"
        structuredData={[breadcrumbSchema, ...productSchemas]}
      />

      <NeoHero
        heroImage="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=1920&q=80&auto=format"
        label="Commercial diffusion systems"
        headline={<>Precision scenting for <span className="block text-gradient-animated">enterprise spaces.</span></>}
        subheadline="Engineered atomization, elegant housings, and measurable performance for hospitality, retail, and corporate environments."
        variant="business"
      />

      {/* System Highlights */}
      <section className="section-shell">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Wifi, label: "Wi-Fi Control" },
              { icon: Bluetooth, label: "Bluetooth 5.0" },
              { icon: Wind, label: "HVAC Ready" },
              { icon: ShieldCheck, label: "2-Year Warranty" },
            ].map((item) => (
              <div key={item.label} className="card-clay-sm rounded-2xl px-4 py-5 flex items-center gap-3">
                <item.icon className="w-5 h-5 text-accent" />
                <span className="text-sm text-foreground font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 360 Explorer */}
      <section className="section-shell">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-12">
            <div className="pill-label justify-center">360 explorer</div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mt-4">
              Build confidence with every detail.
            </h2>
          </AnimatedSection>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
            <AnimatedSection animation="fadeInUp">
              <div className="surface-glass rounded-3xl p-6 relative overflow-hidden">
                <div className="relative aspect-square flex items-center justify-center">
                  <img
                    src={diffuserImage}
                    srcSet={diffuserImageSrcSet}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    alt="EZE AirCare Pro Diffuser 360 View"
                    className="w-full h-full object-contain transition-transform duration-300"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  />

                  {hotspots.map((hotspot) => (
                    <button
                      key={hotspot.id}
                      className={`absolute w-8 h-8 rounded-full border border-accent bg-accent/20 hover:bg-accent hover:text-background hover:scale-110 transition-all duration-300 flex items-center justify-center ${selectedHotspot === hotspot.id ? "bg-accent text-background scale-110" : "text-accent"
                        }`}
                      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                      onClick={() => setSelectedHotspot(selectedHotspot === hotspot.id ? null : hotspot.id)}
                    >
                      <MousePointer className="w-4 h-4" />
                    </button>
                  ))}
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-background/80 px-4 py-2 rounded-full border border-border/50">
                  <Button size="icon" variant="ghost" onClick={() => setRotation((r) => r - 45)} className="rounded-full">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Rotate</span>
                  <Button size="icon" variant="ghost" onClick={() => setRotation((r) => r + 45)} className="rounded-full">
                    <RotateCcw className="w-4 h-4 scale-x-[-1]" />
                  </Button>
                </div>
              </div>
            </AnimatedSection>

            <div className="space-y-6">
              <Card className="card-clay">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Info className="w-4 h-4 text-accent" />
                    {selectedHotspot
                      ? hotspots.find((h) => h.id === selectedHotspot)?.title
                      : "Select a hotspot"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {selectedHotspot
                      ? hotspots.find((h) => h.id === selectedHotspot)?.description
                      : "Click the markers to explore system components and capabilities."}
                  </p>
                </CardContent>
              </Card>

              <Card className="card-clay">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Settings className="w-4 h-4 text-accent" />
                    Technical Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  {specifications.map((spec) => (
                    <div key={spec.label} className="flex flex-col">
                      <span className="text-muted-foreground text-xs uppercase tracking-wider">{spec.label}</span>
                      <span className="text-foreground font-medium">{spec.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Product Range */}
      <section className="section-shell">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-12">
            <div className="pill-label justify-center">Commercial range</div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mt-4">
              Scale from boutique to enterprise.
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {b2bProducts.map((product, index) => (
              <AnimatedSection key={product.model} animation="fadeInUp" delay={index * 120}>
                <Card className="card-clay h-full overflow-hidden flex flex-col">
                  <div className="relative shrink-0">
                    {product.tag && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="pill-gold text-[9px] font-bold uppercase tracking-wider px-2.5 py-1">
                          {product.tag}
                        </span>
                      </div>
                    )}
                    <div className="aspect-[4/3] surface-sunken rounded-2xl m-4 overflow-hidden flex items-center justify-center">
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4" loading="lazy" />
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-display text-2xl font-semibold text-foreground">{product.name}</h3>
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{product.model}</p>
                      </div>
                      <div className="text-xs text-muted-foreground">{product.coverage}</div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">{product.description}</p>
                    <div className="mt-4 space-y-2">
                      {product.features.slice(0, 3).map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-accent" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-1">
                      {product.businessUse.slice(0, 4).map((use) => (
                        <Badge key={use} variant="secondary" className="text-[10px]">
                          {use}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-auto pt-6 space-y-3">
                      <Link to="/business/contact" state={{ interest: `${product.name} (${product.model})` }}>
                        <Button className="w-full group" variant="hero">
                          <Calendar className="w-4 h-4 mr-2" />
                          Request Quote
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                      <Link to={`/business/products/${product.model}`}>
                        <Button variant="outline" className="w-full group shadow-clay-sm">
                          View in Detail
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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

      {/* CTA */}
      <section className="section-shell">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="surface-glass rounded-3xl p-6 sm:p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div className="pill-label mb-4">Enterprise support</div>
              <h3 className="font-display text-3xl md:text-4xl font-semibold text-foreground">Design a scent program built for scale.</h3>
              <p className="text-muted-foreground mt-3 max-w-xl">
                Get a tailored deployment plan, hardware sizing, and aroma recommendations for your locations.
              </p>
            </div>
            <Link to="/business/contact">
              <Button variant="hero" size="lg" className="group">
                Talk to a strategist
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
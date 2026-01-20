import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Wifi, Bluetooth, Zap, Shield, Settings, RotateCcw, MousePointer, Info } from "lucide-react";
import diffuserImage from "@/assets/diffuser-360.jpg";
import { useState } from "react";

const products = [
  {
    name: "EZE Pro Diffuser",
    model: "EP-500",
    coverage: "Up to 500 sqm",
    features: ["Wi-Fi & Bluetooth", "HVAC Integration", "App Control", "Smart Scheduling"],
    price: "₹45,000",
    image: diffuserImage,
    description: "Professional-grade diffuser perfect for large retail spaces and offices"
  },
  {
    name: "EZE Compact",
    model: "EC-200",
    coverage: "Up to 200 sqm",
    features: ["Bluetooth Control", "Portable Design", "Easy Installation", "Timer Function"],
    price: "₹18,000",
    image: diffuserImage,
    description: "Compact solution ideal for boutiques, clinics, and small offices"
  },
  {
    name: "EZE Elite",
    model: "EE-1000",
    coverage: "Up to 1000 sqm",
    features: ["Central HVAC", "Multi-Zone Control", "Professional Installation", "24/7 Monitoring"],
    price: "₹85,000",
    image: diffuserImage,
    description: "Enterprise-level system for hotels, shopping malls, and large corporate spaces"
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

const ProductDetail = () => {
  const { model } = useParams();
  const product = products.find(p => p.model === model);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl font-bold text-primary-foreground mb-6">
            {product.name}
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            {product.description}
          </p>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* 360° Viewer */}
            <div className="gradient-card rounded-2xl p-8 shadow-elegant">
              <div className="relative aspect-square bg-background rounded-xl overflow-hidden">
                <img
                  src={product.image}
                  alt={`${product.name} 360 View`}
                  className="w-full h-full object-cover transition-transform duration-300"
                  style={{ transform: `rotate(${rotation}deg)` }}
                />

                {/* Hotspots */}
                {hotspots.map((hotspot) => (
                  <button
                    key={hotspot.id}
                    className={`absolute w-6 h-6 rounded-full border-2 border-accent bg-accent/20 hover:bg-accent hover:scale-125 transition-all duration-200 ${selectedHotspot === hotspot.id ? 'bg-accent scale-125' : ''
                      }`}
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                    onClick={() => setSelectedHotspot(selectedHotspot === hotspot.id ? null : hotspot.id)}
                  >
                    <MousePointer className="w-3 h-3 text-accent-foreground m-auto" />
                  </button>
                ))}

                {/* Rotation Controls */}
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <Button
                    size="sm"
                    variant="glass"
                    onClick={() => setRotation(r => r - 90)}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="glass"
                    onClick={() => setRotation(r => r + 90)}
                  >
                    <RotateCcw className="w-4 h-4 scale-x-[-1]" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Feature Details */}
            <div className="space-y-6">
              {selectedHotspot ? (
                <Card className="gradient-card shadow-card animate-fade-in-scale">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Info className="w-5 h-5 text-accent" />
                      <span>{hotspots.find(h => h.id === selectedHotspot)?.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {hotspots.find(h => h.id === selectedHotspot)?.description}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card className="gradient-card shadow-card">
                  <CardHeader>
                    <CardTitle>{product.name} {product.model}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Click on the hotspots to explore the advanced features of this
                      professional diffuser system.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">
                        <Wifi className="w-3 h-3 mr-1" />
                        Wi-Fi Enabled
                      </Badge>
                      <Badge variant="secondary">
                        <Bluetooth className="w-3 h-3 mr-1" />
                        Bluetooth 5.0
                      </Badge>
                      <Badge variant="secondary">
                        <Zap className="w-3 h-3 mr-1" />
                        Heat-Free Technology
                      </Badge>
                      <Badge variant="secondary">
                        <Shield className="w-3 h-3 mr-1" />
                        2-Year Warranty
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Specifications */}
              <Card className="gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-accent" />
                    <span>Technical Specifications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {specifications.map((spec, index) => (
                      <div key={spec.label} className="flex justify-between">
                        <span className="text-muted-foreground text-sm">{spec.label}</span>
                        <span className="font-medium text-sm">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Link to="/contact-quote" state={{ interest: `${product.name} (${product.model})` }}>
                <Button size="lg" className="w-full">
                  Request a Quote for the {product.model}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
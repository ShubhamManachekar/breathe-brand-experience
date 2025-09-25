import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Wifi, Bluetooth, Zap, Shield, Settings, ArrowRight, RotateCcw, MousePointer, Info } from "lucide-react";
import diffuserImage from "@/assets/diffuser-360.jpg";

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
            Professional Scent Diffusion Systems
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Advanced atomization technology meets elegant design. Explore our range of
            professional-grade diffusers engineered for reliable, consistent performance.
          </p>
        </div>
      </section>

      {/* Interactive 360° Product Explorer */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              360° Product Explorer
            </h2>
            <p className="text-xl text-muted-foreground">
              Interact with our flagship diffuser. Click hotspots to learn about key features.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* 360° Viewer */}
            <div className="gradient-card rounded-2xl p-8 shadow-elegant">
              <div className="relative aspect-square bg-background rounded-xl overflow-hidden">
                <img
                  src={diffuserImage}
                  alt="EZE AirCare Pro Diffuser 360 View"
                  className="w-full h-full object-cover transition-transform duration-300"
                  style={{ transform: `rotate(${rotation}deg)` }}
                />

                {/* Hotspots */}
                {hotspots.map((hotspot) => (
                  <button
                    key={hotspot.id}
                    className={`absolute w-6 h-6 rounded-full border-2 border-accent bg-accent/20 hover:bg-accent hover:scale-125 transition-all duration-200 ${
                      selectedHotspot === hotspot.id ? 'bg-accent scale-125' : ''
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
                    <CardTitle>EZE Pro Diffuser EP-500</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Click on the hotspots to explore the advanced features of our flagship
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
            </div>
          </div>
        </div>
      </section>

      {/* Product Range */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Complete Product Range
            </h2>
            <p className="text-xl text-muted-foreground">
              Professional diffusers designed for every space size and application
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card key={product.model} className="gradient-card shadow-card hover:shadow-elegant transition-all duration-300 animate-fade-in-scale" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardHeader className="text-center">
                  <div className="aspect-square bg-muted/30 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardTitle className="font-display text-xl">{product.name}</CardTitle>
                  <p className="text-muted-foreground">{product.model}</p>
                  <div className="text-2xl font-bold text-primary">{product.price}</div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{product.description}</p>
                  
                  <div className="text-center">
                    <Badge variant="secondary" className="text-accent">
                      {product.coverage}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Key Features</h4>
                    <ul className="space-y-1">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-accent rounded-full" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <Link to={`/products/${product.model}`}>
                      <Button className="w-full" variant="hero">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-4xl font-bold text-foreground mb-6">
                Advanced Atomization Technology
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our patented turbofan atomization system creates ultra-fine scent particles
                without heat, ensuring pure fragrance delivery and extended oil life.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Zap className="w-6 h-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Heat-Free Operation</h3>
                    <p className="text-muted-foreground">Preserves fragrance integrity and prevents degradation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Safe & Clean</h3>
                    <p className="text-muted-foreground">No residue, stains, or harmful emissions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Settings className="w-6 h-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Precise Control</h3>
                    <p className="text-muted-foreground">Adjustable intensity and smart scheduling</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="gradient-card shadow-elegant">
              <CardContent className="p-8">
                <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                  Performance Benefits
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Scent Coverage Efficiency</span>
                    <span className="font-bold text-primary">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Energy Consumption</span>
                    <span className="font-bold text-primary">12W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Noise Level</span>
                    <span className="font-bold text-primary">&lt; 35dB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fragrance Oil Life</span>
                    <span className="font-bold text-primary">60 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl font-bold text-primary-foreground mb-6">
            Experience Professional Scent Technology
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Ready to transform your space with our advanced diffusion systems?
            Get a personalized quote and professional consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact-quote">
              <Button variant="glass" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Get Custom Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/aroma-library">
                      <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                        Explore Fragrances
                      </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
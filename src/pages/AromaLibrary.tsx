import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Flower2, Leaf, Sparkles, Wind, Filter, Search, ArrowRight } from "lucide-react";

const AromaLibrary = () => {
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fragranceFamilies = [
    {
      id: "citrus-fresh",
      name: "Citrus Fresh",
      description: "Energizing and uplifting blends",
      icon: Wind,
      color: "text-orange-500",
      bgColor: "from-orange-500/10 to-yellow-500/20",
      mood: "Energetic & Inspiring",
      applications: ["Retail spaces", "Gyms & fitness", "Morning environments", "Creative workspaces"]
    },
    {
      id: "aromatic-cool",
      name: "Aromatic Cool",
      description: "Calm and composed fragrances",
      icon: Leaf,
      color: "text-green-500",
      bgColor: "from-green-500/10 to-emerald-500/20",
      mood: "Calm & Relaxing",
      applications: ["Spas & wellness", "Waiting areas", "Sleep environments", "Meditation spaces"]
    },
    {
      id: "amber-musk",
      name: "Amber Musk",
      description: "Luxurious and sophisticated scents",
      icon: Sparkles,
      color: "text-amber-500",
      bgColor: "from-amber-500/10 to-orange-600/20",
      mood: "Indulgent & Luxurious",
      applications: ["Luxury retail", "Hotel lobbies", "Premium services", "Executive offices"]
    },
    {
      id: "green-florals",
      name: "Green Florals",
      description: "Natural and fresh botanical blends",
      icon: Flower2,
      color: "text-emerald-500",
      bgColor: "from-emerald-500/10 to-green-600/20",
      mood: "Natural & Fresh",
      applications: ["Healthcare", "Organic stores", "Nature centers", "Wellness clinics"]
    }
  ];

  const fragrances = [
    // Citrus Fresh Collection
    {
      id: "energizing-burst",
      name: "Energizing Burst",
      family: "citrus-fresh",
      notes: ["Grapefruit", "Lemon", "Mint", "Ginger"],
      description: "An invigorating blend that awakens the senses and boosts motivation. Perfect for retail environments and morning spaces.",
      intensity: "Medium-High",
      longevity: "4-6 hours",
      bestFor: ["Retail stores", "Fitness centers", "Coworking spaces"],
      mood: "Uplifting & Energetic"
    },
    {
      id: "citrus-sparkle",
      name: "Citrus Sparkle",
      family: "citrus-fresh",
      notes: ["Orange", "Bergamot", "Rosemary", "White Tea"],
      description: "A sophisticated citrus blend with herbal undertones. Encourages focus while maintaining a welcoming atmosphere.",
      intensity: "Medium",
      longevity: "5-7 hours",
      bestFor: ["Boutiques", "Cafes", "Creative studios"],
      mood: "Fresh & Sophisticated"
    },

    // Aromatic Cool Collection
    {
      id: "tranquil-mist",
      name: "Tranquil Mist",
      family: "aromatic-cool",
      notes: ["Lavender", "Eucalyptus", "Chamomile", "Cedar"],
      description: "A calming blend that reduces stress and promotes relaxation. Ideal for wellness environments and waiting areas.",
      intensity: "Medium-Low",
      longevity: "6-8 hours",
      bestFor: ["Spas", "Medical offices", "Therapy centers"],
      mood: "Peaceful & Restorative"
    },
    {
      id: "cool-breeze",
      name: "Cool Breeze",
      family: "aromatic-cool",
      notes: ["Sage", "Sea Salt", "Mint", "Bamboo"],
      description: "Fresh and clean with marine influences. Creates a sense of space and clarity in any environment.",
      intensity: "Light-Medium",
      longevity: "4-6 hours",
      bestFor: ["Offices", "Clinics", "Reception areas"],
      mood: "Clean & Refreshing"
    },

    // Amber Musk Collection  
    {
      id: "luxury-embrace",
      name: "Luxury Embrace",
      family: "amber-musk",
      notes: ["Amber", "Sandalwood", "Vanilla", "Patchouli"],
      description: "Rich and opulent blend that creates an atmosphere of luxury and sophistication. Perfect for premium experiences.",
      intensity: "High",
      longevity: "8-10 hours",
      bestFor: ["Luxury retail", "Five-star hotels", "Executive suites"],
      mood: "Opulent & Sophisticated"
    },
    {
      id: "golden-warmth",
      name: "Golden Warmth",
      family: "amber-musk",
      notes: ["Oud", "Rose", "Saffron", "Leather"],
      description: "An exotic blend with Middle Eastern influences. Creates memorable experiences and strong brand associations.",
      intensity: "Medium-High",
      longevity: "7-9 hours",
      bestFor: ["Boutique hotels", "Premium showrooms", "VIP lounges"],
      mood: "Exotic & Memorable"
    },

    // Green Florals Collection
    {
      id: "botanical-garden",
      name: "Botanical Garden",
      family: "green-florals",
      notes: ["Jasmine", "Green Tea", "Aloe", "Fresh Grass"],
      description: "Pure and natural blend that promotes wellness and creates a connection to nature. Perfect for health-focused environments.",
      intensity: "Light-Medium",
      longevity: "5-7 hours",
      bestFor: ["Wellness centers", "Organic stores", "Yoga studios"],
      mood: "Pure & Natural"
    },
    {
      id: "fresh-meadow",
      name: "Fresh Meadow",
      family: "green-florals",
      notes: ["Lily of the Valley", "Green Leaves", "Cucumber", "White Musk"],
      description: "Light and airy floral blend that creates a sense of freshness and purity. Ideal for clean, modern spaces.",
      intensity: "Light",
      longevity: "4-6 hours",
      bestFor: ["Modern offices", "Beauty salons", "Clean environments"],
      mood: "Fresh & Pure"
    }
  ];

  const filteredFragrances = fragrances.filter(fragrance => {
    const matchesFamily = !selectedFamily || fragrance.family === selectedFamily;
    const matchesSearch = !searchTerm ||
      fragrance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fragrance.notes.some(note => note.toLowerCase().includes(searchTerm.toLowerCase())) ||
      fragrance.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFamily && matchesSearch;
  });

  const getIntensityColor = (intensity: string) => {
    if (intensity.includes('Light')) return 'text-green-500';
    if (intensity.includes('Medium')) return 'text-yellow-500';
    if (intensity.includes('High')) return 'text-red-500';
    return 'text-gray-500';
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
            Curated Aroma Library
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Discover our expertly crafted fragrance collection. Each scent is designed to evoke
            specific emotions and create memorable experiences for your customers.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search fragrances, notes, or descriptions..."
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedFamily === null ? "hero" : "ghost"}
                size="sm"
                onClick={() => setSelectedFamily(null)}
              >
                <Filter className="w-4 h-4 mr-2" />
                All Families
              </Button>
              {fragranceFamilies.map((family) => (
                <Button
                  key={family.id}
                  variant={selectedFamily === family.id ? "premium" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedFamily(family.id)}
                >
                  <family.icon className="w-4 h-4 mr-2" />
                  {family.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fragrance Families Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Fragrance Families
            </h2>
            <p className="text-xl text-muted-foreground">
              Four distinct collections designed for different moods and environments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fragranceFamilies.map((family, index) => (
              <Card
                key={family.id}
                className={`gradient-card shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer animate-fade-in-scale ${selectedFamily === family.id ? 'ring-2 ring-accent' : ''
                  }`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => setSelectedFamily(family.id)}
              >
                <div className={`h-2 bg-gradient-to-r ${family.bgColor}`} />

                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${family.bgColor} flex items-center justify-center mx-auto mb-4`}>
                    <family.icon className={`w-8 h-8 ${family.color}`} />
                  </div>
                  <CardTitle className="font-display text-xl">{family.name}</CardTitle>
                  <p className="text-muted-foreground">{family.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="text-center">
                    <Badge variant="secondary" className={family.color}>
                      {family.mood}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2 text-sm">Best Applications</h4>
                    <ul className="space-y-1">
                      {family.applications.slice(0, 3).map((app, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                          <span className="text-xs text-muted-foreground">{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fragrance Collection */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              {selectedFamily
                ? `${fragranceFamilies.find(f => f.id === selectedFamily)?.name} Collection`
                : "Complete Fragrance Collection"
              }
            </h2>
            <p className="text-xl text-muted-foreground">
              {filteredFragrances.length} fragrance{filteredFragrances.length !== 1 ? 's' : ''} available
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFragrances.map((fragrance, index) => {
              const family = fragranceFamilies.find(f => f.id === fragrance.family);

              return (
                <Card
                  key={fragrance.id}
                  className="gradient-card shadow-card hover:shadow-elegant transition-all duration-300 animate-fade-in-scale"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`h-2 bg-gradient-to-r ${family?.bgColor}`} />

                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-display text-xl">{fragrance.name}</CardTitle>
                      {family && <family.icon className={`w-5 h-5 ${family.color}`} />}
                    </div>
                    <p className="text-muted-foreground">{fragrance.mood}</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {fragrance.description}
                    </p>

                    {/* Fragrance Notes */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 text-sm">Fragrance Notes</h4>
                      <div className="flex flex-wrap gap-1">
                        {fragrance.notes.map((note, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {note}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Properties */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Intensity:</span>
                        <div className={`font-medium ${getIntensityColor(fragrance.intensity)}`}>
                          {fragrance.intensity}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Longevity:</span>
                        <div className="font-medium text-foreground">{fragrance.longevity}</div>
                      </div>
                    </div>

                    {/* Best For */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 text-sm">Best For</h4>
                      <div className="flex flex-wrap gap-1">
                        {fragrance.bestFor.map((use, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {use}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link to="/contact-quote" state={{ interest: `Sample: ${fragrance.name}` }}>
                        <Button className="w-full" variant="hero" size="sm">
                          Request Sample
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredFragrances.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">
                No fragrances found matching your criteria
              </p>
              <Button variant="hero" onClick={() => { setSelectedFamily(null); setSearchTerm(''); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Custom Fragrance Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gradient-card p-12 rounded-2xl shadow-elegant text-center">
            <Sparkles className="w-12 h-12 text-accent mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Need Something Unique?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our master perfumers can create a custom signature scent that perfectly
              captures your brand essence and creates a truly unique sensory experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact-quote" state={{ interest: "Custom Fragrance Design" }}>
                <Button variant="hero" size="lg">
                  Discuss Custom Fragrance
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="glass" size="lg">
                Download Fragrance Guide
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AromaLibrary;
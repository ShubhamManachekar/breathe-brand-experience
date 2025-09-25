import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Flower2, Leaf, Sparkles, Wind, Filter, Search, ArrowRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ErrorBoundary from '@/components/ErrorBoundary';
import aromaData from '@/lib/aromaLibrary.json';
import diffusers from '@/lib/diffusers.json';
import debounce from 'lodash.debounce';

const AromaLibrary = () => {
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Expanded fragrance families to match user's categories
  const fragranceFamilies = [
    { id: 'florals', name: 'Florals', description: 'Classic floral scents', icon: Flower2, color: 'text-pink-500', bgColor: 'from-pink-500/10 to-rose-500/20', mood: 'Romantic & Elegant', applications: ['Beauty salons', 'Boutiques', 'Luxury retail', 'Weddings'] },
    { id: 'citrus-fresh', name: 'Citrus Fresh', description: 'Energizing and uplifting blends', icon: Wind, color: 'text-orange-500', bgColor: 'from-orange-500/10 to-yellow-500/20', mood: 'Energetic & Inspiring', applications: ['Retail spaces', 'Gyms & fitness', 'Morning environments', 'Creative workspaces'] },
    { id: 'french-oriental', name: 'French Oriental', description: 'Rich oriental and oud-driven scents', icon: Sparkles, color: 'text-amber-500', bgColor: 'from-amber-500/10 to-orange-600/20', mood: 'Exotic & Memorable', applications: ['Luxury retail', 'Hotel lobbies', 'VIP lounges'] },
    { id: 'aqua-citrus', name: 'Aqua Citrus', description: 'Marine and fresh citrus accords', icon: Leaf, color: 'text-sky-500', bgColor: 'from-sky-500/10 to-blue-500/20', mood: 'Clean & Refreshing', applications: ['Spas', 'Pools', 'Beach resorts', 'Casual retail'] },
    { id: 'soil-flowers', name: 'Soil Flowers', description: 'Earthy floral blends', icon: Flower2, color: 'text-emerald-600', bgColor: 'from-emerald-600/10 to-teal-600/20', mood: 'Grounded & Natural', applications: ['Nature centers', 'Organic stores', 'Wellness clinics'] },
    { id: 'clean-notes', name: 'Clean Notes', description: 'Soft, soapy and musky clean scents', icon: Wind, color: 'text-slate-500', bgColor: 'from-slate-500/10 to-gray-500/20', mood: 'Pure & Simple', applications: ['Clinics', 'Offices', 'Modern retail'] },
    { id: 'gourmand', name: 'Gourmand', description: 'Sweet and edible accords', icon: Sparkles, color: 'text-yellow-600', bgColor: 'from-yellow-600/10 to-amber-500/20', mood: 'Warm & Comforting', applications: ['Cafes', 'Bakeries', 'Boutiques'] },
    { id: 'woody-aromatherapy', name: 'Woody / Aromatherapy', description: 'Woodsy and therapeutic blends', icon: Leaf, color: 'text-amber-700', bgColor: 'from-amber-700/10 to-orange-700/20', mood: 'Calm & Grounding', applications: ['Spas', 'Wellness centers', 'Hotels'] }
  ];

  // Load aroma data from JSON and merge with any inline definitions (if needed)
  const fragrances = useMemo(() => {
    // aromaData imported from src/lib/aromaLibrary.json
    // Normalize entries to guard against malformed JSON fields (coerce to arrays/strings)
    const normalized = (aromaData as any[]).map(a => {
      const item = { ...a } as any;
      if (!item.notes || !Array.isArray(item.notes)) item.notes = [];
      if (!item.bestFor || !Array.isArray(item.bestFor)) item.bestFor = [];
      if (!item.sectors || !Array.isArray(item.sectors)) item.sectors = [];
      if (!item.intensity) item.intensity = '';
      if (!item.longevity) item.longevity = '';
      // Normalize family: ensure it's a trimmed string (matching family ids in fragranceFamilies)
      if (Array.isArray(item.family)) {
        item.family = String(item.family[0] || '').trim();
      } else if (typeof item.family === 'string') {
        item.family = item.family.trim();
      } else {
        item.family = '';
      }
      return item;
    });

    // Deduplicate by `id` to avoid duplicates in the JSON causing the same fragrance
    // to appear multiple times (sometimes with different family tags).
    const seen = new Set<string>();
    const unique: any[] = [];
    for (const f of normalized) {
      if (!f || !f.id) continue;
      if (seen.has(f.id)) continue;
      seen.add(f.id);
      unique.push(f);
    }

    return unique;
  }, []);

  // Debugging: log data load to help diagnose runtime issues in the browser
  useEffect(() => {
    try {
      // eslint-disable-next-line no-console
      console.log('[AromaLibrary] loaded fragrances', fragrances.length);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('[AromaLibrary] error logging fragrances', e);
    }
  }, [fragrances]);

  // Runtime validation: print first items and flag malformed entries
  useEffect(() => {
    try {
      // eslint-disable-next-line no-console
      console.log('[AromaLibrary] sample fragrances', fragrances.slice(0, 10));

      const problems: any[] = [];
      fragrances.forEach((f, idx) => {
        if (!f || typeof f !== 'object') problems.push({ idx, reason: 'not-object', value: f });
        if (!f.id) problems.push({ idx, reason: 'missing-id', value: f });
        if (!f.name) problems.push({ idx, reason: 'missing-name', value: f });
        if (f.notes && !Array.isArray(f.notes)) problems.push({ idx, reason: 'notes-not-array', value: f.notes });
        if (f.bestFor && !Array.isArray(f.bestFor)) problems.push({ idx, reason: 'bestFor-not-array', value: f.bestFor });
        if (f.sectors && !Array.isArray(f.sectors)) problems.push({ idx, reason: 'sectors-not-array', value: f.sectors });
      });

      if (problems.length) {
        // eslint-disable-next-line no-console
        console.warn('[AromaLibrary] data validation problems', problems.slice(0, 20));
      } else {
        // eslint-disable-next-line no-console
        console.log('[AromaLibrary] data validation passed');
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('[AromaLibrary] validation error', e);
    }
  }, [fragrances]);

  // Added fragrances list is empty because we load from JSON
  const additionalFragrances: any[] = [];

  // Merge the JSON fragrances with any additional (currently empty) list
  const allFragrances = useMemo(() => [...fragrances, ...additionalFragrances], [fragrances]);

  // Sector matching: prefer explicit `sectors` array on each fragrance.
  // Fallback to `bestFor` text when `sectors` is not available.
  const matchesSector = (fragrance: any) => {
    if (!selectedSector) return true;
    const target = String(selectedSector).toLowerCase();

    // If the fragrance defines explicit sectors, use them.
    if (Array.isArray(fragrance.sectors) && fragrance.sectors.length > 0) {
      return fragrance.sectors.some((s: string) => String(s).toLowerCase() === target);
    }

    // Fallback: check `bestFor` text entries for the target keyword.
    if (Array.isArray(fragrance.bestFor) && fragrance.bestFor.length > 0) {
      return fragrance.bestFor.some((bf: string) => String(bf).toLowerCase().includes(target));
    }

    return false;
  };

  const filteredFragrances = allFragrances.filter(fragrance => {
    const matchesFamily = !selectedFamily ? true : (typeof fragrance.family === 'string' && fragrance.family === selectedFamily);
    const term = debouncedSearch || searchTerm;
    const matchesSearch = !term || 
      fragrance.name.toLowerCase().includes(term.toLowerCase()) ||
      (fragrance.notes || []).some((note: string) => note.toLowerCase().includes(term.toLowerCase())) ||
      (fragrance.description || '').toLowerCase().includes(term.toLowerCase());

    return matchesFamily && matchesSearch && matchesSector(fragrance);
  });

  // Counter for display
  const fragranceCount = filteredFragrances.length;

  // Debounce the search input to avoid filtering on every keystroke
  useEffect(() => {
    const debounced = debounce((val: string) => setDebouncedSearch(val), 250);
    debounced(searchTerm);
    return () => debounced.cancel();
  }, [searchTerm]);

  const getIntensityColor = (intensity: string) => {
    if (intensity.includes('Light')) return 'text-green-500';
    if (intensity.includes('Medium')) return 'text-yellow-500';  
    if (intensity.includes('High')) return 'text-red-500';
    return 'text-gray-500';
  };

  return (
    <ErrorBoundary>
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

      {/* Search and Filter Section (moved below families) — placeholder removed here */}

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
                className={`gradient-card shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer animate-fade-in-scale ${
                  selectedFamily === family.id ? 'ring-2 ring-accent' : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => setSelectedFamily(selectedFamily === family.id ? null : family.id)}
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

      {/* Search and Filter Section (moved here, below Fragrance Families) */}
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

            {/* Family Select Dropdown */}
            <div className="w-48">
              <Select value={selectedFamily ?? 'all'} onValueChange={(v) => setSelectedFamily(v === 'all' ? null : v)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Families" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={'all'}>All Families</SelectItem>
                  {fragranceFamilies.map(f => (
                    <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Sector Select Dropdown */}
            <div className="w-48">
              <Select value={selectedSector ?? 'all'} onValueChange={(v) => setSelectedSector(v === 'all' ? null : v)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Sectors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={'all'}>All Sectors</SelectItem>
                  <SelectItem value={'retail'}>Retail</SelectItem>
                  <SelectItem value={'hospitality'}>Hospitality</SelectItem>
                  <SelectItem value={'corporate'}>Corporate</SelectItem>
                  <SelectItem value={'wellness'}>Wellness</SelectItem>
                  <SelectItem value={'healthcare'}>Healthcare</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
              {fragranceCount} fragrance{fragranceCount !== 1 ? 's' : ''} available
              {selectedSector && (
                <span className="ml-3 text-sm text-muted-foreground">• Sector: {selectedSector}</span>
              )}
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
                        {(fragrance.notes || []).map((note, i) => (
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
                        <div className={`font-medium ${getIntensityColor(fragrance.intensity || '')}`}>
                          {fragrance.intensity || '—'}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Longevity:</span>
                        <div className="font-medium text-foreground">{fragrance.longevity || '—'}</div>
                      </div>
                    </div>

                    {/* Best For / Sectors */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 text-sm">Best For</h4>
                      <div className="flex flex-wrap gap-1">
                        {((Array.isArray(fragrance.bestFor) && fragrance.bestFor.length) ? fragrance.bestFor : (Array.isArray(fragrance.sectors) ? fragrance.sectors : [])).map((use: any, i: number) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {use}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link to={`/contact-quote?fragrance=${encodeURIComponent(fragrance.name)}`}>
                        <Button className="w-full" variant="hero" size="sm">
                          Request Quote
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
              <Link to="/contact-quote">
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
    </ErrorBoundary>
  );
};

export default AromaLibrary;
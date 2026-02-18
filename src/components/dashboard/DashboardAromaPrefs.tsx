import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";
import {
    Heart,
    HeartOff,
    Sparkles,
    Leaf,
    Waves,
    Flower2,
    Coffee,
    Star,
    ArrowRight,
    Plus,
} from "lucide-react";

interface DashboardAromaPrefsProps {
    onNavigate?: (section: string) => void;
}

const DashboardAromaPrefs = ({ onNavigate }: DashboardAromaPrefsProps) => {
    const [favoriteIds, setFavoriteIds] = useState<number[]>([1, 2, 3]);
    const [activeAromaIndex, setActiveAromaIndex] = useState(0);

    // Mock aroma data
    const aromas = [
        {
            id: 1,
            name: "Lavender Dream",
            category: "Relaxing",
            description: "Calming French lavender with hints of vanilla",
            image: "/sample-images/aroma-lavender.svg",
            icon: Flower2,
            color: "from-purple-500/20 to-violet-500/20",
            borderColor: "border-purple-500/30",
        },
        {
            id: 2,
            name: "Ocean Breeze",
            category: "Fresh",
            description: "Crisp sea air with marine notes",
            image: "/sample-images/aroma-ocean.svg",
            icon: Waves,
            color: "from-blue-500/20 to-cyan-500/20",
            borderColor: "border-blue-500/30",
        },
        {
            id: 3,
            name: "Citrus Burst",
            category: "Energizing",
            description: "Zesty blend of orange, lemon, and grapefruit",
            image: "/sample-images/aroma-citrus.svg",
            icon: Sparkles,
            color: "from-amber-500/20 to-yellow-500/20",
            borderColor: "border-amber-500/30",
        },
        {
            id: 4,
            name: "Forest Pine",
            category: "Grounding",
            description: "Fresh pine needles with earthy undertones",
            image: "/sample-images/aroma-wood.svg",
            icon: Leaf,
            color: "from-emerald-500/20 to-green-500/20",
            borderColor: "border-emerald-500/30",
        },
        {
            id: 5,
            name: "Warm Coffee",
            category: "Comforting",
            description: "Rich roasted coffee beans aroma",
            image: "/sample-images/aroma-gold.svg",
            icon: Coffee,
            color: "from-amber-700/20 to-amber-600/20",
            borderColor: "border-amber-700/30",
        },
    ];

    const favoriteAromas = useMemo(
        () => aromas.filter((aroma) => favoriteIds.includes(aroma.id)),
        [aromas, favoriteIds],
    );

    const recommendedAromas = useMemo(
        () => aromas.filter((aroma) => !favoriteIds.includes(aroma.id)),
        [aromas, favoriteIds],
    );

    useEffect(() => {
        if (favoriteAromas.length === 0) return;
        const rotation = window.setInterval(() => {
            setActiveAromaIndex((prev) => (prev + 1) % favoriteAromas.length);
        }, 4200);

        return () => window.clearInterval(rotation);
    }, [favoriteAromas.length]);

    useEffect(() => {
        if (activeAromaIndex >= favoriteAromas.length) {
            setActiveAromaIndex(0);
        }
    }, [activeAromaIndex, favoriteAromas.length]);

    const scentProfiles = [
        { name: "Relaxing", selected: true },
        { name: "Energizing", selected: true },
        { name: "Fresh", selected: false },
        { name: "Warming", selected: false },
        { name: "Floral", selected: true },
        { name: "Woody", selected: false },
    ];

    const toggleFavorite = (id: number) => {
        setFavoriteIds((prev) =>
            prev.includes(id)
                ? prev.filter((itemId) => itemId !== id)
                : [...prev, id],
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <AnimatedSection animation="fadeInUp">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-display font-bold text-foreground">Aroma Preferences</h1>
                        <p className="text-muted-foreground">Manage your favorite scents and preferences</p>
                    </div>
                    <Button variant="hero" className="gap-2" onClick={() => onNavigate?.("subscription")}>
                        <Plus className="w-4 h-4" />
                        Explore Subscription
                    </Button>
                </div>
            </AnimatedSection>

            <Tabs defaultValue="favorites" className="space-y-6">
                {favoriteAromas.length > 0 && (
                    <AnimatedSection animation="fadeInUp" delay={80}>
                        <Card className="border border-border/50 bg-card">
                            <CardContent className="p-6">
                                <div className="grid md:grid-cols-[220px_1fr] gap-5 items-center">
                                    <div className="rounded-2xl overflow-hidden border border-border/40 bg-muted/20">
                                        <img
                                            src={favoriteAromas[activeAromaIndex].image}
                                            alt={favoriteAromas[activeAromaIndex].name}
                                            className="w-full h-44 object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground mb-2">Auto oil carousel</p>
                                        <h3 className="text-xl font-semibold text-foreground">{favoriteAromas[activeAromaIndex].name}</h3>
                                        <p className="text-sm text-muted-foreground mt-1">{favoriteAromas[activeAromaIndex].category}</p>
                                        <p className="text-sm text-muted-foreground mt-3">{favoriteAromas[activeAromaIndex].description}</p>
                                        <div className="flex gap-2 mt-4">
                                            {favoriteAromas.map((aroma, index) => (
                                                <button
                                                    key={aroma.id}
                                                    onClick={() => setActiveAromaIndex(index)}
                                                    className={`h-1.5 rounded-full transition-all ${activeAromaIndex === index ? "w-8 bg-accent" : "w-4 bg-border"}`}
                                                    aria-label={`Show ${aroma.name}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </AnimatedSection>
                )}

                <AnimatedSection animation="fadeInUp" delay={100}>
                    <TabsList className="surface-glass p-1 w-full flex-wrap sm:flex-nowrap justify-start overflow-x-auto border border-border/50">
                        <TabsTrigger value="favorites" className="gap-2">
                            <Heart className="w-4 h-4" />
                            Favorites
                        </TabsTrigger>
                        <TabsTrigger value="profile" className="gap-2">
                            <Star className="w-4 h-4" />
                            Scent Profile
                        </TabsTrigger>
                        <TabsTrigger value="recommendations" className="gap-2">
                            <Sparkles className="w-4 h-4" />
                            For You
                        </TabsTrigger>
                    </TabsList>
                </AnimatedSection>

                {/* Favorites Tab */}
                <TabsContent value="favorites" className="space-y-6">
                    <AnimatedSection animation="fadeInUp" delay={200}>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {favoriteAromas.map((aroma) => (
                                <Card
                                    key={aroma.id}
                                    className={`surface-glass border border-border/50 hover:shadow-elegant transition-all duration-300 group overflow-hidden ${aroma.borderColor}`}
                                >
                                    <div className={`h-2 bg-gradient-to-r ${aroma.color}`} />
                                    <div className="h-32 border-b border-border/30 bg-muted/20">
                                        <img src={aroma.image} alt={aroma.name} className="w-full h-full object-cover" loading="lazy" />
                                    </div>
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`p-3 rounded-xl bg-gradient-to-br ${aroma.color} group-hover:scale-110 transition-transform`}>
                                                <aroma.icon className="w-6 h-6 text-foreground" />
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-500 hover:bg-red-500/10"
                                                onClick={() => toggleFavorite(aroma.id)}
                                            >
                                                <Heart className="w-5 h-5 fill-current" />
                                            </Button>
                                        </div>
                                        <h3 className="font-semibold text-foreground mb-1">{aroma.name}</h3>
                                        <Badge variant="secondary" className="mb-3 text-xs">
                                            {aroma.category}
                                        </Badge>
                                        <p className="text-sm text-muted-foreground">{aroma.description}</p>
                                        <Button variant="outline" size="sm" className="w-full mt-4 gap-2">
                                            Order Now
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </AnimatedSection>

                    {favoriteAromas.length === 0 && (
                        <Card className="surface-glass border border-border/50">
                            <CardContent className="py-12 text-center">
                                <HeartOff className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="font-semibold text-foreground mb-2">No favorites yet</h3>
                                <p className="text-muted-foreground mb-4">Start exploring our aroma library</p>
                                <Link to="/aroma-library">
                                    <Button variant="hero">Browse Aromas</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                {/* Scent Profile Tab */}
                <TabsContent value="profile" className="space-y-6">
                    <AnimatedSection animation="fadeInUp" delay={200}>
                        <Card className="surface-glass border border-border/50">
                            <CardHeader>
                                <CardTitle>Your Scent Profile</CardTitle>
                                <CardDescription>Select your preferred scent categories for personalized recommendations</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-3">
                                    {scentProfiles.map((profile) => (
                                        <Button
                                            key={profile.name}
                                            variant={profile.selected ? "default" : "outline"}
                                            className={profile.selected ? "gradient-hero" : ""}
                                        >
                                            {profile.name}
                                        </Button>
                                    ))}
                                </div>
                                <Button variant="outline" className="mt-6">
                                    Save Preferences
                                </Button>
                            </CardContent>
                        </Card>
                    </AnimatedSection>

                    <AnimatedSection animation="fadeInUp" delay={300}>
                        <Card className="surface-glass border border-border/50">
                            <CardHeader>
                                <CardTitle>Industry Preference</CardTitle>
                                <CardDescription>Help us recommend the best scents for your space</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                                    {["Hospitality", "Retail", "Corporate", "Wellness"].map((industry) => (
                                        <Button
                                            key={industry}
                                            variant="outline"
                                            className="h-auto py-4 flex-col gap-2 hover:bg-accent/10 hover:border-accent/30"
                                        >
                                            <span className="font-medium">{industry}</span>
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </AnimatedSection>
                </TabsContent>

                {/* Recommendations Tab */}
                <TabsContent value="recommendations" className="space-y-6">
                    <AnimatedSection animation="fadeInUp" delay={200}>
                        <Card className="surface-glass border border-accent/25">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-accent/20">
                                        <Sparkles className="w-8 h-8 text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">Personalized for You</h3>
                                        <p className="text-sm text-muted-foreground">Based on your preferences and industry</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </AnimatedSection>

                    <AnimatedSection animation="fadeInUp" delay={300}>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {recommendedAromas.map((aroma) => (
                                <Card
                                    key={aroma.id}
                                    className={`surface-glass border border-border/50 hover:shadow-elegant transition-all duration-300 group overflow-hidden ${aroma.borderColor}`}
                                >
                                    <div className={`h-2 bg-gradient-to-r ${aroma.color}`} />
                                    <div className="h-32 border-b border-border/30 bg-muted/20">
                                        <img src={aroma.image} alt={aroma.name} className="w-full h-full object-cover" loading="lazy" />
                                    </div>
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`p-3 rounded-xl bg-gradient-to-br ${aroma.color} group-hover:scale-110 transition-transform`}>
                                                <aroma.icon className="w-6 h-6 text-foreground" />
                                            </div>
                                            <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                                                Recommended
                                            </Badge>
                                        </div>
                                        <h3 className="font-semibold text-foreground mb-1">{aroma.name}</h3>
                                        <Badge variant="secondary" className="mb-3 text-xs">
                                            {aroma.category}
                                        </Badge>
                                        <p className="text-sm text-muted-foreground">{aroma.description}</p>
                                        <div className="flex gap-2 mt-4">
                                            <Button variant="ghost" size="icon" onClick={() => toggleFavorite(aroma.id)}>
                                                <Heart className="w-5 h-5" />
                                            </Button>
                                            <Button variant="outline" size="sm" className="flex-1 gap-2">
                                                View Details
                                                <ArrowRight className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </AnimatedSection>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default DashboardAromaPrefs;

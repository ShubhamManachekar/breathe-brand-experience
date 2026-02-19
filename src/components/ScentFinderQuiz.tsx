import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Building2, Store, Briefcase, Heart, Zap, Leaf, Sparkles, Users } from "lucide-react";

interface QuizResult {
  fragrance: string;
  description: string;
  mood: string;
  benefits: string[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
}

const ScentFinderQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ industry?: string; mood?: string }>({});
  const [result, setResult] = useState<QuizResult | null>(null);

  const industries = [
    { id: 'retail', label: 'Retail & Shopping', icon: Store, desc: 'Stores, boutiques, shopping centers' },
    { id: 'hospitality', label: 'Hotel & Spa', icon: Building2, desc: 'Hotels, resorts, wellness centers' },
    { id: 'corporate', label: 'Office & Corporate', icon: Briefcase, desc: 'Offices, coworking spaces, meetings' },
    { id: 'wellness', label: 'Wellness & Healthcare', icon: Heart, desc: 'Clinics, therapy centers, gyms' }
  ];

  const moods = [
    { id: 'energetic', label: 'Energetic & Inspiring', icon: Zap, desc: 'Boost activity and motivation' },
    { id: 'calm', label: 'Calm & Relaxing', icon: Leaf, desc: 'Promote tranquility and comfort' },
    { id: 'luxurious', label: 'Indulgent & Luxurious', icon: Sparkles, desc: 'Create premium experience' },
    { id: 'natural', label: 'Natural & Fresh', icon: Users, desc: 'Clean, organic, welcoming feel' }
  ];

  const fragranceMap: Record<string, QuizResult> = {
    'retail-energetic': {
      fragrance: 'Citrus Fresh Collection',
      description: 'Invigorating citrus blends with subtle spice notes that encourage exploration and purchasing decisions.',
      mood: 'Energetic & Uplifting',
      benefits: ['Increases browsing time', 'Boosts purchase confidence', 'Creates positive associations'],
      icon: Zap
    },
    'retail-calm': {
      fragrance: 'Aromatic Cool Collection',
      description: 'Sophisticated lavender and eucalyptus blend that reduces shopping anxiety and promotes thoughtful decisions.',
      mood: 'Calm & Composed',
      benefits: ['Reduces decision fatigue', 'Extends shopping time', 'Enhances perceived value'],
      icon: Leaf
    },
    'retail-luxurious': {
      fragrance: 'Amber Musk Collection',
      description: 'Rich amber and musk notes that elevate brand perception and justify premium pricing.',
      mood: 'Luxurious & Premium',
      benefits: ['Increases perceived value', 'Justifies premium pricing', 'Creates memorable experiences'],
      icon: Sparkles
    },
    'retail-natural': {
      fragrance: 'Green Florals Collection',
      description: 'Fresh botanical blend with jasmine and green tea that creates welcoming, trustworthy atmosphere.',
      mood: 'Natural & Welcoming',
      benefits: ['Builds brand trust', 'Encourages exploration', 'Creates comfort'],
      icon: Users
    },
    'hospitality-energetic': {
      fragrance: 'Citrus Fresh Collection',
      description: 'Vibrant citrus and mint blend perfect for lobbies and common areas to energize guests.',
      mood: 'Welcoming & Energetic',
      benefits: ['Enhances first impressions', 'Reduces travel fatigue', 'Boosts mood'],
      icon: Zap
    },
    'hospitality-calm': {
      fragrance: 'Aromatic Cool Collection',
      description: 'Calming lavender and chamomile blend ideal for spa areas and relaxation zones.',
      mood: 'Tranquil & Restorative',
      benefits: ['Promotes relaxation', 'Enhances sleep quality', 'Reduces stress'],
      icon: Leaf
    },
    'hospitality-luxurious': {
      fragrance: 'Amber Musk Collection',
      description: 'Opulent amber and oud blend that creates five-star luxury experience in any space.',
      mood: 'Opulent & Sophisticated',
      benefits: ['Elevates brand perception', 'Justifies premium rates', 'Creates lasting memories'],
      icon: Sparkles
    },
    'hospitality-natural': {
      fragrance: 'Green Florals Collection',
      description: 'Fresh botanical blend with ocean breeze notes perfect for creating serene retreat atmosphere.',
      mood: 'Natural & Serene',
      benefits: ['Connects with nature', 'Promotes wellness', 'Creates authenticity'],
      icon: Users
    },
    'corporate-energetic': {
      fragrance: 'Citrus Fresh Collection',
      description: 'Crisp citrus and rosemary blend designed to enhance focus and productivity in work environments.',
      mood: 'Focused & Productive',
      benefits: ['Improves concentration', 'Boosts energy levels', 'Enhances creativity'],
      icon: Zap
    },
    'corporate-calm': {
      fragrance: 'Aromatic Cool Collection',
      description: 'Gentle eucalyptus and sage blend that reduces stress and promotes clear thinking.',
      mood: 'Balanced & Clear',
      benefits: ['Reduces workplace stress', 'Improves decision-making', 'Enhances collaboration'],
      icon: Leaf
    },
    'corporate-luxurious': {
      fragrance: 'Amber Musk Collection',
      description: 'Sophisticated cedar and leather notes that project success and professionalism.',
      mood: 'Professional & Prestigious',
      benefits: ['Projects success', 'Impresses clients', 'Builds confidence'],
      icon: Sparkles
    },
    'corporate-natural': {
      fragrance: 'Green Florals Collection',
      description: 'Fresh green tea and bamboo blend that creates clean, sustainable work environment feel.',
      mood: 'Clean & Sustainable',
      benefits: ['Supports wellness initiatives', 'Improves air quality perception', 'Promotes sustainability'],
      icon: Users
    },
    'wellness-energetic': {
      fragrance: 'Citrus Fresh Collection',
      description: 'Uplifting grapefruit and peppermint blend that motivates and energizes during treatments.',
      mood: 'Motivating & Revitalizing',
      benefits: ['Boosts workout motivation', 'Enhances treatment effectiveness', 'Improves mood'],
      icon: Zap
    },
    'wellness-calm': {
      fragrance: 'Aromatic Cool Collection',
      description: 'Therapeutic lavender and bergamot blend designed for relaxation and healing environments.',
      mood: 'Therapeutic & Calming',
      benefits: ['Promotes healing', 'Reduces anxiety', 'Enhances relaxation'],
      icon: Leaf
    },
    'wellness-luxurious': {
      fragrance: 'Amber Musk Collection',
      description: 'Luxurious sandalwood and vanilla blend that creates premium spa-like experience.',
      mood: 'Luxurious & Indulgent',
      benefits: ['Creates spa luxury', 'Justifies premium services', 'Enhances satisfaction'],
      icon: Sparkles
    },
    'wellness-natural': {
      fragrance: 'Green Florals Collection',
      description: 'Pure botanical blend with aloe and eucalyptus that supports natural healing and wellness.',
      mood: 'Pure & Healing',
      benefits: ['Supports natural healing', 'Purifies atmosphere', 'Promotes wellness'],
      icon: Users
    }
  };

  const handleIndustrySelect = (industry: string) => {
    setAnswers(prev => ({ ...prev, industry }));
    setCurrentStep(1);
  };

  const handleMoodSelect = (mood: string) => {
    setAnswers(prev => ({ ...prev, mood }));
    
    const key = `${answers.industry}-${mood}`;
    const fragranceResult = fragranceMap[key];
    
    if (fragranceResult) {
      setResult(fragranceResult);
      setCurrentStep(2);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-foreground mb-4">
            Find Your Perfect Scent
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Answer two simple questions to discover the ideal fragrance solution for your business space.
          </p>
        </div>

        <Card className="shadow-elegant gradient-card backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="font-display text-2xl">
              {currentStep === 0 && "What type of space do you have?"}
              {currentStep === 1 && "What mood do you want to create?"}
              {currentStep === 2 && "Your Perfect Scent Match"}
            </CardTitle>
            
            {/* Progress Indicator */}
            <div className="flex justify-center mt-4">
              <div className="flex space-x-2">
                {[0, 1, 2].map((step) => (
                  <div
                    key={step}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      step <= currentStep ? 'bg-accent' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Step 1: Industry Selection */}
            {currentStep === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-scale">
                {industries.map((industry) => (
                  <Button
                    key={industry.id}
                    variant="ghost"
                    className="h-auto p-6 text-left hover:shadow-card transition-all duration-300 group"
                    onClick={() => handleIndustrySelect(industry.id)}
                  >
                    <div className="flex items-start space-x-4 w-full">
                      <industry.icon className="w-8 h-8 text-accent group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {industry.label}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {industry.desc}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors ml-auto" />
                    </div>
                  </Button>
                ))}
              </div>
            )}

            {/* Step 2: Mood Selection */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-fade-in-scale">
                <div className="text-center mb-6">
                  <Badge variant="secondary" className="mb-2">
                    Selected: {industries.find(i => i.id === answers.industry)?.label}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {moods.map((mood) => (
                    <Button
                      key={mood.id}
                      variant="ghost"
                      className="h-auto p-6 text-left hover:shadow-card transition-all duration-300 group"
                      onClick={() => handleMoodSelect(mood.id)}
                    >
                      <div className="flex items-start space-x-4 w-full">
                        <mood.icon className="w-8 h-8 text-accent group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {mood.label}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {mood.desc}
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors ml-auto" />
                      </div>
                    </Button>
                  ))}
                </div>
                
                <div className="text-center mt-6">
                  <Button variant="ghost" onClick={() => setCurrentStep(0)}>
                    ← Back to Industry
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Results */}
            {currentStep === 2 && result && (
              <div className="animate-fade-in-scale">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 gradient-accent rounded-full mb-4">
                    <result.icon className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    {result.fragrance}
                  </h3>
                  <Badge variant="secondary">{result.mood}</Badge>
                </div>

                <div className="gradient-card p-6 rounded-xl shadow-card mb-6">
                  <p className="text-lg text-foreground leading-relaxed mb-6">
                    {result.description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Key Benefits:</h4>
                    <ul className="space-y-2">
                      {result.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-accent rounded-full" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="hero" size="lg">
                    Request Sample Kit
                  </Button>
                  <Button variant="glass" onClick={resetQuiz}>
                    Take Quiz Again
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ScentFinderQuiz;
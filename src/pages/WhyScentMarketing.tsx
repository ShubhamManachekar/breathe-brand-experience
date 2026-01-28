import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Brain, Eye, TrendingUp, Heart, ArrowRight, Users, Building2, Store } from "lucide-react";
import PageMeta, { createFAQSchema } from "@/components/PageMeta";

const WhyScentMarketing = () => {
  const researchData = [
    {
      stat: "75%",
      description: "of daily emotions triggered by smell",
      source: "Harvard Medical School",
      icon: Brain
    },
    {
      stat: "70%",
      description: "improvement in brand recall",
      source: "Oxford Brookes University",
      icon: Eye
    },
    {
      stat: "20-30%",
      description: "increase in dwell time",
      source: "Singapore Retail Study",
      icon: TrendingUp
    },
    {
      stat: "Direct",
      description: "connection to limbic system",
      source: "Neuroscience Research",
      icon: Heart
    }
  ];

  const caseStudies = [
    {
      company: "Nike Tokyo Flagship",
      industry: "Retail",
      challenge: "Increase customer engagement in flagship store",
      solution: "Custom citrus blend throughout the store",
      results: [
        "23% increase in dwell time",
        "18% boost in product trials",
        "15% higher conversion rate"
      ],
      icon: Store
    },
    {
      company: "Shangri-La Hotels",
      industry: "Hospitality",
      challenge: "Create memorable brand experience",
      solution: "Signature scent across all properties",
      results: [
        "35% improvement in guest satisfaction",
        "40% increase in brand recall",
        "25% higher rebooking rates"
      ],
      icon: Building2
    },
    {
      company: "Singapore Airlines",
      industry: "Aviation",
      challenge: "Differentiate premium service",
      solution: "Stefan Floridian Waters signature scent",
      results: [
        "70% brand recall improvement",
        "Premium service perception boost",
        "Industry-leading customer loyalty"
      ],
      icon: Users
    }
  ];

  // Create FAQ structured data for SEO
  const faqSchema = createFAQSchema([
    {
      question: "What is scent marketing?",
      answer: "Scent marketing uses strategically chosen fragrances to influence customer behavior, emotions, and brand perception. Research shows that scent is directly connected to the brain's limbic system, making it the most powerful sense for triggering emotions and memories."
    },
    {
      question: "Does scent marketing really work?",
      answer: "Yes, extensive research proves scent marketing effectiveness. Studies show 20-30% increase in dwell time, 70% improvement in brand recall, and 17% boost in purchase intent when the right fragrances are used strategically."
    },
    {
      question: "How can scent marketing help my business?",
      answer: "Scent marketing can increase customer dwell time, boost purchase intent, improve brand recall, enhance perceived value, and create memorable customer experiences that drive loyalty and repeat visits."
    }
  ]);

  return (
    <div className="min-h-screen">
      <PageMeta
        title="Why Scent Marketing Works - The Science of Fragrance"
        description="Discover the neuroscience behind scent marketing. Learn how fragrances trigger 75% of daily emotions, boost brand recall by 70%, and increase dwell time by 20-30%. Backed by Harvard research."
        keywords="scent marketing science, why scent marketing works, fragrance psychology, olfactory marketing, scent branding research, limbic system marketing"
        ogType="article"
        structuredData={faqSchema}
      />

      {/* Hero Section */}
      <section className="pt-20 pb-16 gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
            The Science of Scent Marketing
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Discover how leading brands harness the power of scent to create deeper emotional
            connections, drive measurable business results, and transform customer experiences.
          </p>
        </div>
      </section>

      {/* Research Data Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              The Neuroscience Behind Scent
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Research proves that scent is the most powerful sense for triggering emotions and memories.
              Unlike other senses, smell bypasses the thalamus and directly impacts the limbic system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {researchData.map((data, index) => (
              <Card key={data.description} className="gradient-card shadow-card text-center animate-fade-in-scale" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardContent className="p-8">
                  <data.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <div className="text-4xl font-bold text-primary mb-2">
                    {data.stat}
                  </div>
                  <p className="text-foreground font-medium mb-4">
                    {data.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {data.source}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-4xl font-bold text-foreground mb-6">
                How Scent Influences Behavior
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 gradient-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-accent-foreground font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Immediate Recognition</h3>
                    <p className="text-muted-foreground">Scent molecules are detected in milliseconds, faster than visual or auditory processing.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 gradient-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-accent-foreground font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Emotional Response</h3>
                    <p className="text-muted-foreground">Direct connection to the limbic system triggers emotions and influences decision-making.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 gradient-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-accent-foreground font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Memory Formation</h3>
                    <p className="text-muted-foreground">Creates lasting brand associations that customers remember long after they leave.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 gradient-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-accent-foreground font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Behavioral Change</h3>
                    <p className="text-muted-foreground">Influences purchasing decisions, dwell time, and overall customer satisfaction.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="gradient-card p-8 rounded-2xl shadow-elegant">
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">Business Impact Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Dwell Time</span>
                  <span className="font-bold text-primary">+20-30%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Purchase Intent</span>
                  <span className="font-bold text-primary">+17%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Perceived Value</span>
                  <span className="font-bold text-primary">+15-20%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Store Revisit Rate</span>
                  <span className="font-bold text-primary">+25%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Brand Recall</span>
                  <span className="font-bold text-primary">+70%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Success Stories from Global Brands
            </h2>
            <p className="text-xl text-muted-foreground">
              Real-world examples of how scent marketing drives measurable business results
            </p>
          </div>

          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <Card key={study.company} className="gradient-card shadow-elegant animate-fade-in-scale" style={{ animationDelay: `${index * 0.3}s` }}>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    <div className="text-center lg:text-left">
                      <study.icon className="w-12 h-12 text-accent mx-auto lg:mx-0 mb-4" />
                      <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                        {study.company}
                      </h3>
                      <p className="text-accent font-medium">{study.industry}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Challenge & Solution</h4>
                      <p className="text-muted-foreground mb-4">{study.challenge}</p>
                      <p className="text-foreground font-medium">{study.solution}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Results</h4>
                      <ul className="space-y-2">
                        {study.results.map((result, i) => (
                          <li key={i} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-accent rounded-full" />
                            <span className="text-muted-foreground">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl font-bold text-foreground mb-6">
            Ready to Harness the Power of Scent?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover how EZE AirCare can transform your business with scientifically-proven
            scent marketing solutions tailored to your industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/solutions">
              <Button variant="hero" size="lg">
                Explore Solutions
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/contact-quote">
              <Button variant="glass" size="lg">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyScentMarketing;
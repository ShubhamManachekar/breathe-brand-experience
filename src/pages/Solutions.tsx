import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Building2, Store, Briefcase, Heart, ArrowRight, Users, Zap, Sparkles } from "lucide-react";
import PageMeta from "@/components/PageMeta";

const Solutions = () => {
  const solutions = [
    {
      id: "hospitality",
      title: "Hospitality & Hotels",
      description: "Create memorable guest experiences that drive loyalty and premium perception",
      icon: Building2,
      benefits: ["Enhance first impressions", "Improve guest satisfaction", "Increase rebooking rates"],
      metrics: "+35% Guest Satisfaction",
      color: "text-blue-500",
      bgColor: "from-blue-500/10 to-blue-600/20",
      features: ["Lobby & common area scenting", "Spa & wellness integration", "Room fragrance options", "Signature brand scent development"]
    },
    {
      id: "retail",
      title: "Retail & Shopping",
      description: "Boost sales with scents that encourage browsing and increase purchase confidence",
      icon: Store,
      benefits: ["Increase dwell time", "Boost purchase intent", "Enhance product perception"],
      metrics: "+23% Dwell Time",
      color: "text-emerald-500",
      bgColor: "from-emerald-500/10 to-emerald-600/20",
      features: ["Store-wide ambient scenting", "Zone-specific fragrances", "Seasonal scent programs", "Point-of-sale activation"]
    },
    {
      id: "corporate",
      title: "Corporate & Offices",
      description: "Improve employee productivity and create impressive client meeting environments",
      icon: Briefcase,
      benefits: ["Enhance focus & productivity", "Impress clients", "Improve workplace wellness"],
      metrics: "+14% Task Accuracy",
      color: "text-purple-500",
      bgColor: "from-purple-500/10 to-purple-600/20",
      features: ["Office & workspace scenting", "Meeting room enhancement", "Reception area impact", "HVAC system integration"]
    },
    {
      id: "wellness",
      title: "Wellness & Healthcare",
      description: "Support healing and relaxation with therapeutic scents for better patient outcomes",
      icon: Heart,
      benefits: ["Reduce patient anxiety", "Support healing process", "Improve treatment perception"],
      metrics: "40% Anxiety Reduction",
      color: "text-rose-500",
      bgColor: "from-rose-500/10 to-rose-600/20",
      features: ["Waiting room calming scents", "Treatment room enhancement", "Therapy-specific fragrances", "Natural & organic options"]
    }
  ];

  const process = [
    {
      step: "1",
      title: "Consultation & Analysis",
      description: "We assess your space, understand your brand, and identify the best scent strategy"
    },
    {
      step: "2",
      title: "Custom Fragrance Selection",
      description: "Our perfumers create or select the perfect scent blend for your specific needs"
    },
    {
      step: "3",
      title: "Installation & Setup",
      description: "Professional installation of diffusion systems with minimal disruption to operations"
    },
    {
      step: "4",
      title: "Ongoing Support & Optimization",
      description: "Regular maintenance, scent replenishment, and performance optimization"
    }
  ];

  return (
    <div className="min-h-screen">
      <PageMeta
        title="Industry Solutions - Scent Marketing for Every Business"
        description="Tailored scent marketing solutions for hospitality, retail, corporate, and wellness industries. +35% guest satisfaction, +23% dwell time, +14% task accuracy. Choose your industry."
        keywords="scent marketing solutions, hotel scenting, retail fragrance, corporate aromatherapy, wellness scenting, industry-specific scent solutions"
        ogType="website"
      />

      {/* Hero Section */}
      <section className="pt-20 pb-16 gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
            Scent Solutions for Every Industry
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Tailored fragrance strategies that align with your business goals, enhance customer
            experiences, and deliver measurable results across all industry sectors.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <Card key={solution.id} className="group hover:shadow-elegant transition-all duration-300 overflow-hidden animate-fade-in-scale" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className={`h-2 bg-gradient-to-r ${solution.bgColor}`} />

                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${solution.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <solution.icon className={`w-6 h-6 ${solution.color}`} />
                    </div>
                    <div>
                      <CardTitle className="font-display text-2xl text-foreground">
                        {solution.title}
                      </CardTitle>
                      <p className={`font-bold ${solution.color}`}>
                        {solution.metrics}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-muted-foreground text-lg">
                    {solution.description}
                  </p>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Key Benefits</h4>
                    <ul className="space-y-2">
                      {solution.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center space-x-3">
                          <Zap className="w-4 h-4 text-accent" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Features</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {solution.features.map((feature, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Sparkles className="w-3 h-3 text-accent" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link to={`/solutions/${solution.id}`}>
                    <Button className="w-full group" variant="ghost">
                      Learn More About {solution.title}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Our Proven Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From initial consultation to ongoing optimization, we ensure your scent marketing
              program delivers maximum impact with minimal effort on your part.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={step.step} className="text-center animate-fade-in-scale" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-accent-foreground font-bold text-xl">{step.step}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Expertise */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-4xl font-bold text-foreground mb-6">
                Industry Expertise & Heritage
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                With deep roots in Indian perfumery tradition and cutting-edge scent technology,
                EZE AirCare brings unmatched expertise to every project.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-accent" />
                  <span className="text-foreground">Expert perfumers with 20+ years experience</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Building2 className="w-6 h-6 text-accent" />
                  <span className="text-foreground">Successful deployments across 500+ locations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="w-6 h-6 text-accent" />
                  <span className="text-foreground">Patented atomization technology</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-6 h-6 text-accent" />
                  <span className="text-foreground">Custom fragrance development capabilities</span>
                </div>
              </div>
            </div>

            <Card className="gradient-card shadow-elegant">
              <CardContent className="p-8">
                <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                  Why Choose EZE AirCare?
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Project Success Rate</span>
                    <span className="font-bold text-primary">98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average ROI Increase</span>
                    <span className="font-bold text-primary">240%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Client Retention Rate</span>
                    <span className="font-bold text-primary">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Installation Time</span>
                    <span className="font-bold text-primary">24-48hrs</span>
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
            Transform Your Space Today
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Ready to experience the power of scent marketing? Schedule a free consultation
            to discover the perfect solution for your industry and space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact-quote">
              <Button variant="glass" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Schedule Free Consultation
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

export default Solutions;
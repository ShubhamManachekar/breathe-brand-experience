import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { Brain, Smile, Zap, ArrowRight, Activity, Layers, Fingerprint } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import NeoHero from "@/components/NeoHero";

const WhyScentMarketing = () => {
  const stats = [
    { value: "75%", label: "Of emotions are triggered by smell", icon: Smile },
    { value: "100x", label: "More memorable than tactile sense", icon: Zap },
    { value: "65%", label: "Accuracy of scent recall after 1 year", icon: Brain },
    { value: "40%", label: "Improvement in mood", icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <PageMeta
        title="The Science of Scent Marketing | Why Scent Works"
        description="Understand the psychology and neuroscience behind scent marketing. Learn how fragrance influences behavior and emotion."
        keywords="scent marketing science, olfactory branding, scent psychology, limbic system marketing"
        ogType="article"
      />

      <NeoHero
        label="The Science"
        headline={
          <>
            The shortest path to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-navy to-accent animate-gradient-x">
              human emotion.
            </span>
          </>
        }
        subheadline="Scent is the only sense that bypasses the rational brain and connects directly to the limbic system—the seat of memory and emotion."
        actions={
          <Link to="/business/solutions">
            <Button size="lg" className="rounded-sm neo-btn-primary uppercase tracking-wider text-xs font-bold px-8 h-12">
              See Applications
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        }
        variant="business"
        texture="smoke"
      >
        {/* Abstract Brain/Scent Visualization */}
        <div className="relative flex items-center justify-center h-[500px]">
           <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 via-transparent to-primary/20 blur-[100px] animate-pulse-slow" />
           <div className="relative z-10 w-64 h-64 border border-border/40 rounded-full animate-spin-slow opacity-30">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full blur-sm" />
           </div>
           <div className="absolute z-10 w-96 h-96 border border-border/20 rounded-full animate-spin-reverse-slower opacity-20">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-accent rounded-full blur-md" />
           </div>

           <div className="absolute z-20 bg-background/80 backdrop-blur-xl border border-primary/20 p-8 rounded-sm shadow-neo max-w-xs">
              <Brain className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-display text-xl font-bold mb-2">The Limbic Connection</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Processing scent 10,000x faster than visual or auditory cues.</p>
           </div>
        </div>
      </NeoHero>

      <section className="section-shell bg-muted/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <AnimatedSection key={stat.label} animation="fadeInUp" delay={index * 120}>
                <div className="bg-background border border-border/50 p-6 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-neo group h-full">
                  <div className="w-12 h-12 bg-primary/5 rounded-sm flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <stat.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div className="text-4xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{stat.value}</div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide font-medium">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="fadeInUp">
               <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block">Neuromarketing</span>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-6">Why traditional marketing falls short.</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Visuals and sound are processed by the rational cortex. They are analyzed, filtered, and often ignored.
                </p>
                <p>
                  Scent is different. It travels directly to the olfactory bulb, intimately connected to the amygdala (emotion) and hippocampus (memory).
                </p>
                <p>
                  This biological shortcut means customers feel before they think. A branded environment becomes an emotional experience, not just a transaction.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-border/40 grid grid-cols-2 gap-8">
                <div>
                   <div className="font-display text-3xl font-bold text-foreground mb-1">Visual</div>
                   <div className="text-xs uppercase tracking-wide text-muted-foreground">Short-term recall</div>
                </div>
                <div>
                   <div className="font-display text-3xl font-bold text-primary mb-1">Olfactory</div>
                   <div className="text-xs uppercase tracking-wide text-muted-foreground">Long-term emotional bond</div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={200}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 blur-3xl rounded-full opacity-40" />
                <div className="relative z-10 grid gap-6">
                   {[
                     { title: "Attention", desc: "Break through the noise of digital saturation.", icon: Fingerprint },
                     { title: "Immersion", desc: "Create a 360-degree brand world.", icon: Layers },
                     { title: "Retention", desc: "Increase dwell time by up to 40%.", icon: Clock },
                   ].map((item, i) => (
                     <div key={item.title} className="bg-background/80 backdrop-blur-xl border border-border/50 p-6 flex items-start gap-4 rounded-sm hover:border-primary/40 transition-colors">
                        <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center shrink-0">
                           <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                           <h4 className="font-display text-lg font-semibold text-foreground">{item.title}</h4>
                           <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-shell bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-loom opacity-20 mix-blend-overlay" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimatedSection animation="fadeInUp">
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">Turn science into strategy.</h2>
            <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              Leverage the power of scent to drive measurable business outcomes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/business/solutions">
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-sm uppercase tracking-wider text-xs font-bold h-12 px-8">
                  Explore Solutions
                </Button>
              </Link>
              <Link to="/business/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-sm uppercase tracking-wider text-xs font-bold h-12 px-8">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

// Simple Icon component for the map
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Clock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

export default WhyScentMarketing;

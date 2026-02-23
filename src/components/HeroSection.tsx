import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlayCircle, ArrowRight, TrendingUp, Users, Eye, ShoppingCart, Sparkles } from "lucide-react";
import DynamicCounter from "@/components/DynamicCounter";

const heroImage = "/optimized/hero-scent-diffuser-1280.webp";
const heroImageSrcSet =
  "/optimized/hero-scent-diffuser-640.webp 640w, /optimized/hero-scent-diffuser-960.webp 960w, /optimized/hero-scent-diffuser-1280.webp 1280w";

const metrics = [
  { icon: Eye, value: 30, label: "Dwell Time Increase", color: "text-accent", suffix: "%" },
  { icon: TrendingUp, value: 20, label: "Perceived Value Boost", color: "text-primary", suffix: "%" },
  { icon: Users, value: 25, label: "Store Revisit Rate", color: "text-accent", suffix: "%" },
  { icon: ShoppingCart, value: 17, label: "Purchase Intent Lift", color: "text-primary", suffix: "%" },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated blobs
      gsap.to(blob1Ref.current, {
        scale: 1.3,
        x: 40,
        y: -30,
        duration: 9,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(blob2Ref.current, {
        scale: 1.2,
        x: -30,
        y: 40,
        duration: 12,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 3,
      });

      // Floating sparkles
      sparklesRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: -20 - Math.random() * 30,
          x: (Math.random() - 0.5) * 20,
          rotation: 360,
          duration: 4 + Math.random() * 5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: Math.random() * 4,
        });
      });

      // Entrance wipe + stagger
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        overlayRef.current,
        { scaleX: 1 },
        { scaleX: 0, duration: 1, transformOrigin: "right center", ease: "power4.inOut" }
      )
        .fromTo(badgeRef.current, { opacity: 0, y: 24, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 }, "-=0.2")
        .fromTo(headlineRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.4")
        .fromTo(subRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
        .fromTo(
          metricsRef.current?.children ? Array.from(metricsRef.current.children) : [],
          { opacity: 0, y: 40, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.7 },
          "-=0.3"
        );

      // Parallax image on mousemove
      const section = sectionRef.current;
      const handleMove = (e: MouseEvent) => {
        const rect = section?.getBoundingClientRect();
        if (!rect) return;
        const cx = (e.clientX - rect.left) / rect.width - 0.5;
        const cy = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(imgRef.current, {
          x: cx * 25,
          y: cy * 18,
          duration: 1.5,
          ease: "power1.out",
        });
      };
      section?.addEventListener("mousemove", handleMove);
      return () => section?.removeEventListener("mousemove", handleMove);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Wipe overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-50 bg-foreground pointer-events-none"
        style={{ transformOrigin: "right center" }}
      />

      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <img
          ref={imgRef}
          src={heroImage}
          srcSet={heroImageSrcSet}
          sizes="100vw"
          alt="EZE AirCare Premium Scent Technology"
          className="w-full h-full object-cover scale-110"
          style={{ willChange: "transform" }}
          loading="eager"
        />
        {/* Gradient overlay — left heavy so text reads */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
      </div>

      {/* Animated blobs */}
      <div
        ref={blob1Ref}
        className="absolute top-[-10%] right-[5%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)/0.15), transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        ref={blob2Ref}
        className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--accent)/0.12), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Floating sparkles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (sparklesRef.current[i] = el)}
            className="absolute"
            style={{
              left: `${8 + (i * 7.5) % 84}%`,
              top: `${10 + (i * 13) % 80}%`,
            }}
          >
            <Sparkles
              className="text-accent/30"
              size={10 + (i % 4) * 5}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent font-medium text-xs sm:text-sm mb-6 sm:mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 mr-2 animate-pulse" />
            Premium Fragrance Technology
            <span className="w-2 h-2 bg-accent rounded-full ml-2 animate-ping" />
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground mb-5 sm:mb-7 leading-[1.05]"
          >
            Before They Buy,
            <br />
            <span className="relative inline-block">
              <span className="text-gradient-animated">
                They BREATHE
              </span>
              <span className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-primary/20 opacity-40 rounded-lg blur-2xl -z-10" />
            </span>
          </h1>

          {/* Sub */}
          <p
            ref={subRef}
            className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl leading-relaxed"
          >
            Where{" "}
            <span className="text-accent font-medium">Indian perfumery heritage</span> meets{" "}
            <span className="text-primary font-medium">modern scent technology</span>. Transform
            your business with premium fragrance solutions that drive{" "}
            <span className="text-accent font-medium">measurable results</span>.
          </p>

          {/* CTAs */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-14 sm:mb-20"
          >
            <Link to="/contact-quote">
              <Button
                size="lg"
                className="w-full sm:w-auto group shadow-lg px-8 h-12 sm:h-14 text-sm font-bold uppercase tracking-wider"
              >
                Request Free Demo
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto group border-foreground/20 hover:bg-foreground/5 backdrop-blur-md px-8 h-12 sm:h-14 text-sm font-semibold"
            >
              <PlayCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Our Story
            </Button>
          </div>

          {/* Metric Cards */}
          <div
            ref={metricsRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
          >
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="group relative bg-background/60 backdrop-blur-md border border-border/50 hover:border-accent/40 rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-default overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <metric.icon
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${metric.color} mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300`}
                />
                <DynamicCounter
                  endValue={metric.value}
                  label={metric.label}
                  suffix={metric.suffix}
                  prefix="+"
                  duration={2500}
                  className={`text-2xl sm:text-3xl font-bold ${metric.color}`}
                />
                <div className="text-[10px] sm:text-xs text-muted-foreground font-medium leading-tight mt-1">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[10px] text-muted-foreground font-medium tracking-widest uppercase">
          Discover
        </span>
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-accent/40 rounded-full flex justify-center pt-1.5 hover:border-accent transition-colors">
          <div className="w-1 h-2 bg-accent/60 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

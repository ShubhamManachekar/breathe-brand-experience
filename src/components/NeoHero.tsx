import { useRef, ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ParticleField from "@/components/ParticleField";

gsap.registerPlugin(useGSAP);

interface NeoHeroProps {
  label?: string;
  headline: ReactNode;
  subheadline: string;
  actions?: ReactNode;
  children?: ReactNode; // For the right-side visual
  variant?: "business" | "shop";
  texture?: "oil" | "smoke" | "loom";
  heroImage?: string; // URL for personalized background image
}

const NeoHero = ({ label, headline, subheadline, actions, children, variant = "business", texture = "oil", heroImage }: NeoHeroProps) => {
  const isBusiness = variant === "business";
  const hasImage = !!heroImage;
  const containerRef = useRef<HTMLElement>(null);

  /* ── GSAP timeline animation ─────────────────────────────── */
  useGSAP(() => {
    const ctx = containerRef.current;
    if (!ctx) return;

    const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1 } });

    // Atmospheric light orbs fade in
    tl.fromTo(
      ctx.querySelectorAll(".hero-orb"),
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 1.4, stagger: 0.2 },
      0
    );

    // Hero background image — cinematic fade in + subtle zoom
    if (ctx.querySelector(".hero-bg-image")) {
      tl.fromTo(
        ctx.querySelector(".hero-bg-image"),
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 2, ease: "power2.out" },
        0
      );
    }

    // Label — slide in from left with clip
    if (ctx.querySelector(".hero-label")) {
      tl.fromTo(
        ctx.querySelector(".hero-label"),
        { opacity: 0, y: 24, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7 },
        0.1
      );
    }

    // Headline — staggered word reveal
    tl.fromTo(
      ctx.querySelector(".hero-headline"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1 },
      0.2
    );

    // Subheadline
    tl.fromTo(
      ctx.querySelector(".hero-sub"),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.8 },
      0.4
    );

    // Actions
    if (ctx.querySelector(".hero-actions")) {
      tl.fromTo(
        ctx.querySelector(".hero-actions"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.55
      );
    }

    // Visual panel — 3D float entrance
    if (ctx.querySelector(".hero-visual")) {
      tl.fromTo(
        ctx.querySelector(".hero-visual"),
        { opacity: 0, scale: 0.92, y: 50, rotateX: 6 },
        { opacity: 1, scale: 1, y: 0, rotateX: 0, duration: 1.2, ease: "power3.out" },
        0.25
      );
    }

    // Subtle parallax float on the orbs
    ctx.querySelectorAll(".hero-orb").forEach((orb, i) => {
      gsap.to(orb, {
        y: i % 2 === 0 ? -20 : 20,
        x: i % 2 === 0 ? 10 : -10,
        duration: 4 + i * 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className={`relative min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] flex items-center overflow-hidden ${hasImage ? 'bg-[#0c0c1a]' : 'bg-background'}`}
    >
      {/* ── Atmospheric Layers ── */}
      <div className={`absolute inset-0 z-0 ${texture === 'oil' ? 'bg-oil-texture' : texture === 'smoke' ? 'bg-smoke-texture' : 'bg-loom'} opacity-40`} />
      {heroImage ? (
        <>
          <div
            className="hero-bg-image absolute inset-0 z-0 opacity-0"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'saturate(0.7) brightness(0.55) contrast(1.1)',
            }}
          />
          {/* Gradient overlay for text legibility */}
          <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/50 via-transparent to-black/20" />
        </>
      ) : (
        <div className="absolute inset-0 z-0 bg-grid-fade opacity-[0.15]" />
      )}
      <ParticleField variant={variant} />

      {/* ── Lighting Orbs ── */}
      <div className="hero-orb absolute -top-[20%] right-0 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[800px] lg:h-[800px] bg-primary/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none opacity-0" />
      <div className="hero-orb hidden sm:block absolute bottom-0 left-[-10%] w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] bg-accent/5 blur-[100px] rounded-full mix-blend-screen pointer-events-none opacity-0" />

      <div className="container-polished relative z-10 w-full pt-28 pb-12 lg:pt-20 lg:pb-0 h-full flex items-center">
        <div className={`w-full ${children ? 'grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center' : 'flex flex-col items-center justify-center text-center'}`}>

          {/* ── Text Content ── */}
          <div className={`max-w-3xl ${!children ? 'flex flex-col items-center' : ''}`}>
            {label && (
              <div
                className={`hero-label inline-flex items-center gap-2 mb-6 px-3 py-1 opacity-0 ${hasImage
                  ? 'border border-white/25 bg-white/10 text-white/90 backdrop-blur-sm rounded-sm uppercase tracking-[0.2em] text-[10px] font-bold'
                  : isBusiness
                    ? 'border border-primary/20 bg-primary/5 text-primary rounded-sm uppercase tracking-[0.2em] text-[10px] font-bold'
                    : 'border border-accent/20 bg-accent/10 text-accent rounded-full uppercase tracking-wider text-xs font-semibold'
                  }`}
              >
                <span className={`w-1.5 h-1.5 ${hasImage ? 'bg-white rounded-sm' : isBusiness ? 'bg-primary rounded-sm' : 'bg-accent rounded-full'}`} />
                {label}
              </div>
            )}

            <h1
              className={`hero-headline font-display font-semibold leading-[1.1] mb-6 opacity-0 ${hasImage ? 'text-white' : ''}`}
              style={{ fontSize: 'clamp(1.875rem, 5vw, 4.5rem)', letterSpacing: isBusiness ? '-0.02em' : '-0.01em' }}
            >
              {headline}
            </h1>

            <p className={`hero-sub text-base sm:text-lg lg:text-xl leading-relaxed mb-8 opacity-0 max-w-2xl ${hasImage ? 'text-white/80' : 'text-muted-foreground'}`}>
              {subheadline}
            </p>

            {actions && (
              <div className={`hero-actions flex flex-wrap gap-4 opacity-0 ${!children ? 'justify-center' : ''}`}>
                {actions}
              </div>
            )}
          </div>

          {/* ── Visual/Media Content ── */}
          {children && (
            <div className="hero-visual relative opacity-0 w-full" style={{ perspective: '1000px' }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NeoHero;

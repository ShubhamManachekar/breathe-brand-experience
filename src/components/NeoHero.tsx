import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import ParticleField from "@/components/ParticleField";

gsap.registerPlugin(useGSAP);

interface NeoHeroProps {
  label?: string;
  headline: ReactNode;
  subheadline: string;
  actions?: ReactNode;
  children?: ReactNode;
  variant?: "business" | "shop";
  texture?: "oil" | "smoke" | "loom";
  heroImage?: string;
  heroImageAlt?: string;
}

const NeoHero = ({
  label,
  headline,
  subheadline,
  actions,
  children,
  variant = "business",
  texture = "oil",
  heroImage,
  heroImageAlt = "EZE AirCare",
}: NeoHeroProps) => {
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

  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Blobs breathe in perpetually
      if (blob1Ref.current) {
        gsap.to(blob1Ref.current, {
          scale: 1.15,
          x: 30,
          y: -20,
          duration: 8,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }
      if (blob2Ref.current) {
        gsap.to(blob2Ref.current, {
          scale: 1.2,
          x: -20,
          y: 30,
          duration: 10,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: 2,
        });
      }

      // Entrance sequence
      tl.fromTo(
        overlayRef.current,
        { scaleX: 1 },
        { scaleX: 0, duration: 0.9, transformOrigin: "right center", ease: "power4.inOut" }
      );

      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { opacity: 0, y: 24, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 },
          "-=0.3"
        );
      }

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.4"
      )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          actionsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          visualRef.current,
          { opacity: 0, scale: 0.92, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" },
          "-=0.8"
        );

      // Hero image parallax on mousemove
      if (imgRef.current) {
        const section = sectionRef.current;
        const handleMove = (e: MouseEvent) => {
          const rect = section?.getBoundingClientRect();
          if (!rect) return;
          const cx = (e.clientX - rect.left) / rect.width - 0.5;
          const cy = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(imgRef.current, {
            x: cx * 18,
            y: cy * 12,
            duration: 1.2,
            ease: "power1.out",
          });
        };
        section?.addEventListener("mousemove", handleMove);
        return () => section?.removeEventListener("mousemove", handleMove);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-[92vh] flex items-center overflow-hidden ${isBusiness ? "bg-background" : "bg-background"}`}
    >
      {/* Wipe overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-50 bg-foreground pointer-events-none"
        style={{ transformOrigin: "right center" }}
      />

      {/* Atmospheric blobs */}
      <div
        ref={blob1Ref}
        className="absolute -top-1/4 right-[-10%] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: isBusiness
            ? "radial-gradient(circle, hsl(var(--primary)/0.12), transparent 70%)"
            : "radial-gradient(circle, hsl(var(--accent)/0.15), transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        ref={blob2Ref}
        className="absolute bottom-[-15%] left-[-8%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: isBusiness
            ? "radial-gradient(circle, hsl(var(--accent)/0.08), transparent 70%)"
            : "radial-gradient(circle, hsl(var(--primary)/0.1), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Texture + grid */}
      <div
        className={`absolute inset-0 z-0 ${texture === "oil" ? "bg-oil-texture" : texture === "smoke" ? "bg-smoke-texture" : "bg-loom"} opacity-30`}
      />
      <div className="absolute inset-0 z-0 bg-grid-fade opacity-[0.12]" />
      <ParticleField variant={variant} />

      {/* Full-bleed hero image (behind content) */}
      {heroImage && (
        <div className="absolute inset-0 z-0">
          <img
            ref={imgRef}
            src={heroImage}
            alt={heroImageAlt}
            className="w-full h-full object-cover scale-110"
            style={{ willChange: "transform" }}
          />
          <div
            className={`absolute inset-0 ${
              isBusiness
                ? "bg-gradient-to-r from-background/95 via-background/80 to-background/40"
                : "bg-gradient-to-r from-background/90 via-background/75 to-background/30"
            }`}
          />
        </div>
      )}

      <div className="container-polished relative z-10 w-full pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div
          className={`grid gap-10 lg:gap-16 items-center ${children ? "lg:grid-cols-2" : "max-w-3xl"}`}
        >
          {/* Text Content */}
          <div className="max-w-2xl">
            {label && (
              <div
                ref={labelRef}
                className={`inline-flex items-center gap-2 mb-5 sm:mb-7 px-3 py-1.5 ${
                  isBusiness
                    ? "border border-primary/20 bg-primary/5 text-primary rounded-sm uppercase tracking-[0.2em] text-[10px] font-bold"
                    : "border border-accent/20 bg-accent/10 text-accent rounded-full uppercase tracking-wider text-xs font-semibold"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 ${isBusiness ? "bg-primary rounded-sm" : "bg-accent rounded-full animate-pulse"}`}
                />
                {label}
              </div>
            )}

            <h1
              ref={headlineRef}
              className={`font-display font-semibold leading-[1.08] mb-5 sm:mb-7 ${
                isBusiness
                  ? "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-balance"
                  : "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight"
              }`}
            >
              {headline}
            </h1>

            <p
              ref={subRef}
              className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg mb-8 sm:mb-10"
            >
              {subheadline}
            </p>

            {actions && (
              <div ref={actionsRef} className="flex flex-wrap gap-3 sm:gap-4">
                {actions}
              </div>
            )}
          </div>

          {/* Visual/Media */}
          {children && (
            <div ref={visualRef} className="relative hidden sm:block">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NeoHero;

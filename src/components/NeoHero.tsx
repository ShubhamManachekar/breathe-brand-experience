import { motion } from "framer-motion";
import { ReactNode } from "react";
import ParticleField from "@/components/ParticleField";

interface NeoHeroProps {
  label?: string;
  headline: ReactNode;
  subheadline: string;
  actions?: ReactNode;
  children?: ReactNode; // For the right-side visual
  variant?: "business" | "shop";
  texture?: "oil" | "smoke" | "loom";
}

const NeoHero = ({ label, headline, subheadline, actions, children, variant = "business", texture = "oil" }: NeoHeroProps) => {
  const isBusiness = variant === "business";

  return (
    <section className={`relative min-h-[90vh] flex items-center overflow-hidden ${isBusiness ? 'bg-background' : 'bg-background'}`}>
      {/* ── Atmospheric Layers ── */}
      <div className={`absolute inset-0 z-0 ${texture === 'oil' ? 'bg-oil-texture' : texture === 'smoke' ? 'bg-smoke-texture' : 'bg-loom'} opacity-40`} />
      <div className="absolute inset-0 z-0 bg-grid-fade opacity-[0.15]" />
      <ParticleField variant={variant} />

      {/* ── Lighting Effects ── */}
      <div className="absolute -top-[20%] right-0 w-[800px] h-[800px] bg-primary/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-accent/5 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="container-polished relative z-10 w-full pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Text Content ── */}
          <div className="max-w-2xl">
            {label && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`inline-flex items-center gap-2 mb-6 px-3 py-1 ${isBusiness ? 'border border-primary/20 bg-primary/5 text-primary rounded-sm uppercase tracking-[0.2em] text-[10px] font-bold' : 'border border-accent/20 bg-accent/10 text-accent rounded-full uppercase tracking-wider text-xs font-semibold'}`}
              >
                <span className={`w-1.5 h-1.5 ${isBusiness ? 'bg-primary rounded-sm' : 'bg-accent rounded-full'}`} />
                {label}
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`font-display font-semibold leading-[1.1] mb-6 ${isBusiness ? 'text-5xl sm:text-6xl lg:text-7xl tracking-tight text-balance' : 'text-5xl sm:text-6xl lg:text-7xl tracking-tight'}`}
            >
              {headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg mb-8"
            >
              {subheadline}
            </motion.p>

            {actions && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-4"
              >
                {actions}
              </motion.div>
            )}
          </div>

          {/* ── Visual/Media Content ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
             {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NeoHero;

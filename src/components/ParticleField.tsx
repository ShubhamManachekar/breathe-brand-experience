import { useMemo } from "react";

interface ParticleFieldProps {
    variant?: "business" | "shop";
    count?: number;
}

const COLORS = {
    business: [
        "hsl(var(--accent-violet))",
        "hsl(var(--accent-teal))",
        "hsl(var(--accent))",
        "hsl(var(--primary-glow))",
    ],
    shop: [
        "hsl(var(--accent))",
        "hsl(var(--accent-coral))",
        "hsl(var(--accent-violet))",
        "hsl(var(--accent-teal))",
    ],
};

const ParticleField = ({ variant = "business", count = 35 }: ParticleFieldProps) => {
    const particles = useMemo(() => {
        const palette = COLORS[variant];
        // Increase count by 1.5x for a richer atmospheric feel
        const actualCount = count * 1.5;
        return Array.from({ length: actualCount }, (_, i) => {
            const size = 2 + Math.random() * 6;
            // Higher base opacity for better visibility across light/dark modes
            const opacity = 0.25 + Math.random() * 0.45;
            const duration = 8 + Math.random() * 12;
            const delay = Math.random() * -20;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const dx = -40 + Math.random() * 80;
            const dy = -60 + Math.random() * 120;
            const color = palette[i % palette.length];
            const blur = size > 4 ? 2 : 0;
            const usePulse = Math.random() > 0.5;

            return { id: i, size, opacity, duration, delay, x, y, dx, dy, color, blur, usePulse };
        });
    }, [variant, count]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="particle absolute rounded-full"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        backgroundColor: p.color,
                        opacity: p.opacity,
                        filter: p.blur ? `blur(${p.blur}px)` : undefined,
                        boxShadow: `0 0 ${p.size * 2}px ${p.color.replace(")", " / 0.4)")}`,
                        animation: p.usePulse
                            ? `particleFloat ${p.duration}s ease-in-out ${p.delay}s infinite, particlePulse ${p.duration * 0.6}s ease-in-out ${p.delay}s infinite`
                            : `particleFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
                        "--p-opacity": p.opacity,
                        "--p-dx": `${p.dx}px`,
                        "--p-dy": `${p.dy}px`,
                    } as React.CSSProperties}
                />
            ))}
        </div>
    );
};

export default ParticleField;

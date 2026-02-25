import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLocation } from "react-router-dom";

const AnimatedBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    // Determine the page context
    const isBusiness = location.pathname.startsWith("/business");
    const isShop = location.pathname.startsWith("/shop");

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.killTweensOf(".bg-element");

            gsap.utils.toArray(".bg-element").forEach((el: any, i: number) => {
                // Determine a random movement profile for each element
                const duration = 15 + Math.random() * 15;
                const xMove = (Math.random() > 0.5 ? 1 : -1) * (15 + Math.random() * 25) + "vw";
                const yMove = (Math.random() > 0.5 ? 1 : -1) * (15 + Math.random() * 25) + "vh";
                const scale = 1.1 + Math.random() * 0.4;
                const rotation = -45 + Math.random() * 90;

                // Base continuous movement
                gsap.to(el, {
                    x: xMove,
                    y: yMove,
                    rotation: rotation,
                    scale: scale * 1.5, // Make them larger
                    opacity: 0.8 + Math.random() * 0.2, // Much more visible
                    duration: duration,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: -Math.random() * 10
                });

                // Secondary subtle pulse
                gsap.to(el, {
                    scale: scale * 1.8, // Bigger pulse
                    opacity: 1, // Full opacity on pulse
                    duration: duration * 0.4,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut",
                    delay: -Math.random() * 5
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, [isBusiness, isShop, location.pathname]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 -z-50 overflow-hidden pointer-events-none transition-colors duration-1000 bg-background"
        >
            {isBusiness ? (
                // Business Elements
                <>
                    <div className="bg-element bg-element-1 absolute top-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-primary/25 blur-[100px] mix-blend-screen" />
                    <div className="bg-element bg-element-2 absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-accent/30 blur-[120px] mix-blend-screen" />
                    <div className="bg-element bg-element-3 absolute top-[40%] left-[50%] -translate-x-1/2 w-[50vw] h-[20vw] rounded-[100%] bg-gold/20 blur-[80px]" />
                    <div className="absolute inset-0 bg-oil-texture opacity-30 mix-blend-overlay" />
                </>
            ) : isShop ? (
                // Shop Elements
                <>
                    <div className="bg-element bg-element-1 absolute -top-[10%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-accent/25 blur-[120px]" />
                    <div className="bg-element bg-element-2 absolute top-[60%] -left-[10%] w-[40vw] h-[40vw] rounded-full bg-sage/25 blur-[100px]" />
                    <div className="bg-element bg-element-3 absolute top-[20%] left-[30%] w-[30vw] h-[30vw] rounded-[40%_60%_70%_30%] bg-primary/20 blur-[90px]" />
                    <div className="absolute inset-0 bg-smoke-texture opacity-20" />
                </>
            ) : (
                // Home/Default Elements
                <>
                    <div className="bg-element bg-element-1 absolute top-[0%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-primary/25 blur-[100px]" />
                    <div className="bg-element bg-element-2 absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-accent/25 blur-[100px]" />
                    <div className="absolute inset-0 bg-loom opacity-40 mix-blend-overlay" />
                </>
            )}

            {/* Light Noise Overlay for Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        </div>
    );
};

export default AnimatedBackground;

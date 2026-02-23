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
            // Clear previous animations if context changes
            gsap.killTweensOf(".bg-element");

            if (isBusiness) {
                // Business: Structured, sharp, gold/navy accents
                gsap.to(".bg-element-1", {
                    x: "10vw",
                    y: "-15vh",
                    rotation: 45,
                    duration: 25,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
                gsap.to(".bg-element-2", {
                    x: "-10vw",
                    y: "20vh",
                    rotation: -30,
                    scale: 1.2,
                    duration: 30,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
                gsap.to(".bg-element-3", {
                    opacity: 0.8,
                    scale: 1.5,
                    duration: 20,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut"
                });
            } else if (isShop) {
                // Shop: Organic, floating, soft sage/clay
                gsap.to(".bg-element-1", {
                    y: "-20vh",
                    x: "5vw",
                    scale: 1.1,
                    duration: 20,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
                gsap.to(".bg-element-2", {
                    y: "15vh",
                    x: "-8vw",
                    scale: 0.9,
                    duration: 25,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
                gsap.to(".bg-element-3", {
                    rotation: 360,
                    scale: 1.2,
                    duration: 40,
                    repeat: -1,
                    ease: "linear"
                });
            } else {
                // Home/Default: Subtle breathing mix
                gsap.to(".bg-element-1", {
                    y: "-10vh",
                    x: "5vw",
                    duration: 22,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
                gsap.to(".bg-element-2", {
                    y: "10vh",
                    x: "-5vw",
                    duration: 28,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }
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
                    <div className="bg-element bg-element-1 absolute top-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[100px] mix-blend-screen" />
                    <div className="bg-element bg-element-2 absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-accent/10 blur-[120px] mix-blend-screen" />
                    <div className="bg-element bg-element-3 absolute top-[40%] left-[50%] -translate-x-1/2 w-[50vw] h-[20vw] rounded-[100%] bg-gold/5 blur-[80px]" />
                    <div className="absolute inset-0 bg-oil-texture opacity-30 mix-blend-overlay" />
                </>
            ) : isShop ? (
                // Shop Elements
                <>
                    <div className="bg-element bg-element-1 absolute -top-[10%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-accent/10 blur-[120px]" />
                    <div className="bg-element bg-element-2 absolute top-[60%] -left-[10%] w-[40vw] h-[40vw] rounded-full bg-sage/10 blur-[100px]" />
                    <div className="bg-element bg-element-3 absolute top-[20%] left-[30%] w-[30vw] h-[30vw] rounded-[40%_60%_70%_30%] bg-primary/5 blur-[90px]" />
                    <div className="absolute inset-0 bg-smoke-texture opacity-20" />
                </>
            ) : (
                // Home/Default Elements
                <>
                    <div className="bg-element bg-element-1 absolute top-[0%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[100px]" />
                    <div className="bg-element bg-element-2 absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-accent/5 blur-[100px]" />
                    <div className="absolute inset-0 bg-loom opacity-40 mix-blend-overlay" />
                </>
            )}

            {/* Light Noise Overlay for Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        </div>
    );
};

export default AnimatedBackground;

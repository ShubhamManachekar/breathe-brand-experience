import { Link, useLocation } from "react-router-dom";
import { Building2, ShoppingBag } from "lucide-react";

const SegmentSwitcher = () => {
    const location = useLocation();
    const isShop = location.pathname.startsWith("/shop");
    const isBusiness = location.pathname.startsWith("/business");

    const segments = [
        { key: "shop", href: "/shop", label: "Shop", icon: ShoppingBag, active: isShop || (!isShop && !isBusiness) },
        { key: "business", href: "/business", label: "Business", icon: Building2, active: isBusiness },
    ];

    return (
        <div className="flex items-center bg-background/70 rounded-full p-0.5 border border-border/60 backdrop-blur-sm">
            {segments.map((seg) => (
                <Link
                    key={seg.key}
                    to={seg.href}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${seg.active
                        ? "bg-foreground text-background shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                        }`}
                >
                    <seg.icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{seg.label}</span>
                </Link>
            ))}
        </div>
    );
};

export default SegmentSwitcher;

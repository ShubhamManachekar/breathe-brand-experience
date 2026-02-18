import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import AnimatedSection from "@/components/AnimatedSection";
import {
    Wifi,
    WifiOff,
    Droplets,
    AlertTriangle,
    Settings,
    RefreshCw,
    MapPin,
    Clock,
} from "lucide-react";

interface DashboardDevicesProps {
    onNavigate?: (section: string) => void;
}

const DashboardDevices = ({ onNavigate }: DashboardDevicesProps) => {
    const [activeDeviceIndex, setActiveDeviceIndex] = useState(0);

    // Mock data - would come from API in production
    const devices = [
        {
            id: "DIF-001",
            name: "Lobby Diffuser",
            model: "EZE Pro 5000",
            image: "/sample-images/diffuser-pro.svg",
            location: "Main Lobby",
            status: "online",
            aromaLevel: 75,
            currentAroma: "Lavender Dream",
            lastSync: "2 mins ago",
        },
        {
            id: "DIF-002",
            name: "Conference Room A",
            model: "EZE Pro 3000",
            image: "/sample-images/diffuser-compact.svg",
            location: "2nd Floor",
            status: "online",
            aromaLevel: 45,
            currentAroma: "Citrus Fresh",
            lastSync: "5 mins ago",
        },
        {
            id: "DIF-003",
            name: "Reception Area",
            model: "EZE Pro 5000",
            image: "/sample-images/diffuser-compact.svg",
            location: "Ground Floor",
            status: "offline",
            aromaLevel: 20,
            currentAroma: "Ocean Breeze",
            lastSync: "2 hours ago",
        },
        {
            id: "DIF-004",
            name: "Executive Suite",
            model: "EZE Elite 7000",
            image: "/sample-images/diffuser-elite.svg",
            location: "5th Floor",
            status: "low_oil",
            aromaLevel: 15,
            currentAroma: "Signature Blend",
            lastSync: "1 min ago",
        },
    ];

    useEffect(() => {
        const rotation = window.setInterval(() => {
            setActiveDeviceIndex((prev) => (prev + 1) % devices.length);
        }, 4500);

        return () => window.clearInterval(rotation);
    }, [devices.length]);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "online":
                return (
                    <Badge className="bg-emerald-500 text-white border-0 flex items-center gap-1">
                        <Wifi className="w-3 h-3" />
                        Online
                    </Badge>
                );
            case "offline":
                return (
                    <Badge className="bg-gray-500 text-white border-0 flex items-center gap-1">
                        <WifiOff className="w-3 h-3" />
                        Offline
                    </Badge>
                );
            case "low_oil":
                return (
                    <Badge className="bg-amber-500 text-white border-0 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Low Oil
                    </Badge>
                );
            default:
                return <Badge variant="secondary">Unknown</Badge>;
        }
    };

    const getAromaLevelColor = (level: number) => {
        if (level >= 50) return "bg-emerald-500";
        if (level >= 25) return "bg-amber-500";
        return "bg-red-500";
    };

    const onlineCount = devices.filter(d => d.status === "online").length;
    const alertCount = devices.filter(d => d.status === "low_oil" || d.status === "offline").length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <AnimatedSection animation="fadeInUp">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-display font-bold text-foreground">Active Diffusers</h1>
                        <p className="text-muted-foreground">Monitor your installed diffuser units</p>
                    </div>
                    <Button variant="outline" className="gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Sync All Devices
                    </Button>
                </div>
            </AnimatedSection>

            {/* Status Summary */}
            <AnimatedSection animation="fadeInUp" delay={80}>
                <Card className="border border-border/50 bg-card">
                    <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row gap-6 lg:items-center">
                            <div className="w-full lg:w-[320px] rounded-2xl overflow-hidden border border-border/40 bg-muted/30">
                                <img
                                    src={devices[activeDeviceIndex].image}
                                    alt={devices[activeDeviceIndex].name}
                                    className="w-full h-48 object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground mb-2">Auto diffuser spotlight</p>
                                <div className="flex items-center justify-between gap-3 flex-wrap">
                                    <h3 className="text-xl font-semibold text-foreground">{devices[activeDeviceIndex].name}</h3>
                                    {getStatusBadge(devices[activeDeviceIndex].status)}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{devices[activeDeviceIndex].model} • {devices[activeDeviceIndex].location}</p>
                                <p className="text-sm text-muted-foreground mt-2">Current oil: {devices[activeDeviceIndex].currentAroma}</p>
                                <div className="flex gap-2 mt-4">
                                    {devices.map((device, index) => (
                                        <button
                                            key={device.id}
                                            onClick={() => setActiveDeviceIndex(index)}
                                            className={`h-1.5 rounded-full transition-all ${activeDeviceIndex === index ? "w-8 bg-accent" : "w-4 bg-border"}`}
                                            aria-label={`Show ${device.name}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </AnimatedSection>

            {/* Status Summary */}
            <AnimatedSection animation="fadeInUp" delay={100}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="surface-glass border border-border/50">
                        <CardContent className="p-4 text-center">
                            <div className="text-3xl font-bold text-foreground">{devices.length}</div>
                            <p className="text-sm text-muted-foreground">Total Diffusers</p>
                        </CardContent>
                    </Card>
                    <Card className="surface-glass border border-border/50">
                        <CardContent className="p-4 text-center">
                            <div className="text-3xl font-bold text-emerald-500">{onlineCount}</div>
                            <p className="text-sm text-muted-foreground">Online</p>
                        </CardContent>
                    </Card>
                    <Card className="surface-glass border border-border/50">
                        <CardContent className="p-4 text-center">
                            <div className="text-3xl font-bold text-amber-500">{alertCount}</div>
                            <p className="text-sm text-muted-foreground">Needs Attention</p>
                        </CardContent>
                    </Card>
                    <Card className="surface-glass border border-border/50">
                        <CardContent className="p-4 text-center">
                            <div className="text-3xl font-bold text-primary">
                                {Math.round(devices.reduce((acc, d) => acc + d.aromaLevel, 0) / devices.length)}%
                            </div>
                            <p className="text-sm text-muted-foreground">Avg Oil Level</p>
                        </CardContent>
                    </Card>
                </div>
            </AnimatedSection>

            {/* Device Grid */}
            <AnimatedSection animation="fadeInUp" delay={200}>
                <div className="grid md:grid-cols-2 gap-4">
                    {devices.map((device, index) => (
                        <Card
                            key={device.id}
                            className={`surface-glass border border-border/50 hover:shadow-elegant transition-all duration-300 ${device.status === "offline" ? "opacity-75" : ""
                                } ${device.status === "low_oil" ? "border-amber-500/50" : ""}`}
                        >
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-14 h-14 rounded-xl overflow-hidden border border-border/50 bg-muted/20">
                                            <img src={device.image} alt={device.name} className="w-full h-full object-cover" loading="lazy" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground">{device.name}</h3>
                                            <p className="text-sm text-muted-foreground">{device.model}</p>
                                        </div>
                                    </div>
                                    {getStatusBadge(device.status)}
                                </div>

                                <div className="space-y-4">
                                    {/* Location */}
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPin className="w-4 h-4" />
                                        {device.location}
                                    </div>

                                    {/* Current Aroma */}
                                    <div className="p-3 rounded-lg bg-muted/30">
                                        <p className="text-xs text-muted-foreground mb-1">Current Aroma Oil</p>
                                        <p className="font-medium text-foreground">{device.currentAroma}</p>
                                    </div>

                                    {/* Oil Level */}
                                    <div>
                                        <div className="flex items-center justify-between text-sm mb-2">
                                            <span className="text-muted-foreground">Oil Level</span>
                                            <span className={`font-semibold ${device.aromaLevel >= 50 ? "text-emerald-500" :
                                                device.aromaLevel >= 25 ? "text-amber-500" : "text-red-500"
                                                }`}>{device.aromaLevel}%</span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all ${getAromaLevelColor(device.aromaLevel)}`}
                                                style={{ width: `${device.aromaLevel}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Last Sync & Actions */}
                                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Clock className="w-3 h-3" />
                                            Last sync: {device.lastSync}
                                        </div>
                                        <Button variant="ghost" size="sm" className="gap-1">
                                            <Settings className="w-4 h-4" />
                                            Details
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </AnimatedSection>

            {/* Order More Oil CTA */}
            <AnimatedSection animation="fadeInUp" delay={300}>
                <Card className="bg-gradient-to-r from-amber-500/10 via-accent/10 to-amber-500/10 border-accent/20">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-accent/20">
                                    <Droplets className="w-8 h-8 text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">Running Low on Aroma Oils?</h3>
                                    <p className="text-sm text-muted-foreground">Order refills to keep your spaces fresh</p>
                                </div>
                            </div>
                            <Button variant="hero" onClick={() => onNavigate?.("aroma-oils")}>Order Aroma Oils</Button>
                        </div>
                    </CardContent>
                </Card>
            </AnimatedSection>
        </div>
    );
};

export default DashboardDevices;

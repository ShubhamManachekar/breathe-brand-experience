import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";
import {
    getSubscriptionSummary,
    MOCK_USER_SUBSCRIPTION,
    formatMonth,
} from "@/lib/subscription";
import {
    ShoppingBag,
    Package,
    Crown,
    ArrowRight,
    Clock,
    CheckCircle2,
    Truck,
    Droplets,
    Wifi,
    HeadphonesIcon,
    MessageSquare,
    Calendar,
    Edit3,
    Sparkles
} from "lucide-react";

interface DashboardOverviewProps {
    onNavigate?: (section: string) => void;
}

const DashboardOverview = ({ onNavigate }: DashboardOverviewProps) => {
    const subscriptionSummary = getSubscriptionSummary();
    const subscription = MOCK_USER_SUBSCRIPTION;

    const currentMonthData = subscription.monthlySelections.find(m => m.status === 'current');
    const upcomingMonths = subscription.monthlySelections.filter(m => m.status === 'upcoming');

    const stats = [
        {
            label: "Active Diffusers",
            value: subscriptionSummary.devicesCount.toString(),
            subtext: `${subscription.devices.filter(d => d.status === 'online').length} online`,
            icon: Wifi,
            onClick: () => onNavigate?.("diffusers"),
        },
        {
            label: "Pending Orders",
            value: "2",
            subtext: "1 shipped",
            icon: Package,
            onClick: () => onNavigate?.("orders"),
        },
        {
            label: "Subscription",
            value: `${subscriptionSummary.completedMonths}/${subscriptionSummary.totalMonths}`,
            subtext: subscriptionSummary.plan.name,
            icon: Crown,
            onClick: () => onNavigate?.("subscription"),
        },
        {
            label: "Open Tickets",
            value: "1",
            subtext: "Avg 2hr response",
            icon: MessageSquare,
            onClick: () => onNavigate?.("support"),
        },
    ];

    const recentOrders = [
        {
            id: "ORD-2024-001",
            date: "Jan 15, 2024",
            product: "Lavender Dream Aroma Oil (5L)",
            status: "Delivered",
            statusColor: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
        },
        {
            id: "ORD-2024-002",
            date: "Jan 18, 2024",
            product: "EZE Pro 5000 Diffuser",
            status: "Shipped",
            statusColor: "bg-blue-500/10 text-blue-600 border-blue-200",
        },
        {
            id: "ORD-2024-003",
            date: "Jan 20, 2024",
            product: "Citrus Fresh Aroma Oil (10L)",
            status: "Processing",
            statusColor: "bg-amber-500/10 text-amber-600 border-amber-200",
        },
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Delivered": return <CheckCircle2 className="w-3.5 h-3.5 mr-1" />;
            case "Shipped": return <Truck className="w-3.5 h-3.5 mr-1" />;
            default: return <Clock className="w-3.5 h-3.5 mr-1" />;
        }
    };

    return (
        <div className="space-y-8">
            {/* ── Welcome Header ── */}
            <AnimatedSection animation="fadeInUp">
                <div className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground p-8 shadow-2xl shadow-primary/20">
                    <div className="absolute inset-0 bg-loom opacity-20 mix-blend-overlay" />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
                                <span className="text-xs font-bold uppercase tracking-widest text-primary-foreground/70">System Operational</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                                Welcome back, John
                            </h1>
                            <p className="text-primary-foreground/80 max-w-lg">
                                Your <span className="font-semibold text-white">{subscriptionSummary.devicesCount} devices</span> are active and your next scent delivery is scheduled for <span className="font-semibold text-white">Feb 1st</span>.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Link to="/products">
                                <Button className="bg-white text-primary hover:bg-white/90 border-0 shadow-lg font-semibold rounded-lg h-11 px-6">
                                    <Package className="w-4 h-4 mr-2" />
                                    New Order
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </AnimatedSection>

            {/* ── Stats Grid ── */}
            <AnimatedSection animation="fadeInUp" delay={100}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            onClick={stat.onClick}
                            className="bg-background rounded-xl p-5 border border-border/50 hover:border-primary/30 hover:shadow-neo transition-all duration-300 cursor-pointer group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2.5 rounded-lg bg-muted/30 group-hover:bg-primary/10 transition-colors">
                                    <stat.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-colors -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                            </div>
                            <div>
                                <div className="text-3xl font-display font-bold text-foreground mb-1">{stat.value}</div>
                                <div className="text-sm font-medium text-foreground/80">{stat.label}</div>
                                <div className="text-xs text-muted-foreground mt-1">{stat.subtext}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </AnimatedSection>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* ── Main Activity Column ── */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Current Scent Rotation */}
                    {currentMonthData && (
                        <AnimatedSection animation="fadeInUp" delay={150}>
                            <Card className="border border-border/50 shadow-sm bg-background/50 backdrop-blur-sm">
                                <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border/30">
                                    <div>
                                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-accent" />
                                            Active Scents
                                        </CardTitle>
                                        <CardDescription className="text-xs uppercase tracking-wide mt-1">
                                            Current Rotation • {formatMonth(currentMonthData.month)}
                                        </CardDescription>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => onNavigate?.("subscription")}>
                                        Manage
                                    </Button>
                                </CardHeader>
                                <CardContent className="pt-4 space-y-3">
                                    {currentMonthData.selections.map((selection) => (
                                        <div key={selection.deviceId} className="flex items-center justify-between p-3 rounded-lg bg-background border border-border/40 hover:border-primary/20 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center border border-border/30">
                                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selection.selectedOil?.color || '#ccc' }} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-foreground">{selection.deviceName}</p>
                                                    <p className="text-xs text-muted-foreground">{selection.deviceType.oilCapacityMl}ml Cartridge</p>
                                                </div>
                                            </div>
                                            <Badge variant="outline" className="font-normal bg-muted/20">
                                                {selection.selectedOil?.name || 'Standard Blend'}
                                            </Badge>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    )}

                    {/* Recent Orders Table */}
                    <AnimatedSection animation="fadeInUp" delay={200}>
                        <div className="bg-background rounded-xl border border-border/50 overflow-hidden">
                            <div className="p-4 border-b border-border/30 flex justify-between items-center bg-muted/5">
                                <h3 className="font-semibold text-foreground">Recent Orders</h3>
                                <Button variant="link" size="sm" className="text-primary h-auto p-0" onClick={() => onNavigate?.("orders")}>View All</Button>
                            </div>
                            <div className="divide-y divide-border/30">
                                {recentOrders.map((order) => (
                                    <div key={order.id} className="p-4 flex items-center justify-between hover:bg-muted/5 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center">
                                                <ShoppingBag className="w-4 h-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-foreground">{order.product}</p>
                                                <p className="text-xs text-muted-foreground">{order.id} • {order.date}</p>
                                            </div>
                                        </div>
                                        <Badge className={`border ${order.statusColor} bg-opacity-10 shadow-none font-medium`}>
                                            {getStatusIcon(order.status)}
                                            {order.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AnimatedSection>
                </div>

                {/* ── Sidebar Column ── */}
                <div className="space-y-6">
                    {/* Subscription Status */}
                    <AnimatedSection animation="fadeInUp" delay={250}>
                        <div className="bg-background rounded-xl border border-border/50 p-6 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full" />

                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                                    <Crown className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-foreground">{subscriptionSummary.plan.name}</p>
                                    <p className="text-xs text-muted-foreground">Active Plan</p>
                                </div>
                            </div>

                            <div className="space-y-4 relative z-10">
                                <div>
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="text-muted-foreground">Plan Progress</span>
                                        <span className="font-medium text-foreground">{subscriptionSummary.progressPercent}%</span>
                                    </div>
                                    <Progress value={subscriptionSummary.progressPercent} className="h-1.5" />
                                </div>

                                {upcomingMonths.length > 0 && (
                                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex gap-3">
                                        <Edit3 className="w-4 h-4 text-amber-600 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-bold text-amber-700 dark:text-amber-400">Selection Required</p>
                                            <p className="text-[10px] text-amber-600/80 dark:text-amber-500">Choose oils for next {upcomingMonths.length} months</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Support & Quick Actions */}
                    <AnimatedSection animation="fadeInUp" delay={300}>
                        <div className="space-y-4">
                            <div className="bg-background rounded-xl border border-border/50 p-5">
                                <div className="flex items-center gap-3 mb-4">
                                    <HeadphonesIcon className="w-4 h-4 text-muted-foreground" />
                                    <h4 className="text-sm font-semibold text-foreground">Support Status</h4>
                                </div>
                                <div className="text-sm p-3 bg-muted/20 rounded-lg border border-border/30">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                        <span className="font-medium text-foreground">Ticket #1024</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground pl-3.5">Diffuser calibration • Open</p>
                                </div>
                                <Button variant="outline" size="sm" className="w-full mt-3 h-8 text-xs" onClick={() => onNavigate?.("support")}>
                                    View Tickets
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <Link to="/aroma-library">
                                    <Button variant="ghost" className="w-full justify-start h-auto py-3 bg-muted/10 hover:bg-muted/20 border border-border/20">
                                        <div className="text-left">
                                            <Droplets className="w-4 h-4 text-accent mb-2" />
                                            <div className="text-xs font-medium">Library</div>
                                        </div>
                                    </Button>
                                </Link>
                                <Link to="/products">
                                    <Button variant="ghost" className="w-full justify-start h-auto py-3 bg-muted/10 hover:bg-muted/20 border border-border/20">
                                        <div className="text-left">
                                            <Package className="w-4 h-4 text-primary mb-2" />
                                            <div className="text-xs font-medium">Add Device</div>
                                        </div>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    TrendingUp,
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
} from "lucide-react";

interface DashboardOverviewProps {
    onNavigate?: (section: string) => void;
}

const DashboardOverview = ({ onNavigate }: DashboardOverviewProps) => {
    const subscriptionSummary = getSubscriptionSummary();
    const subscription = MOCK_USER_SUBSCRIPTION;

    // Get current and next month selections
    const currentMonthData = subscription.monthlySelections.find(m => m.status === 'current');
    const upcomingMonths = subscription.monthlySelections.filter(m => m.status === 'upcoming');

    const stats = [
        {
            label: "Active Diffusers",
            value: subscriptionSummary.devicesCount.toString(),
            subtext: `${subscription.devices.filter(d => d.status === 'online').length} online`,
            icon: Wifi,
            trend: "All connected",
            onClick: () => onNavigate?.("diffusers"),
        },
        {
            label: "Pending Orders",
            value: "2",
            subtext: "1 shipped",
            icon: Package,
            trend: "Est. delivery: 3 days",
            onClick: () => onNavigate?.("orders"),
        },
        {
            label: "Subscription",
            value: `${subscriptionSummary.completedMonths}/${subscriptionSummary.totalMonths}`,
            subtext: subscriptionSummary.plan.name,
            icon: Crown,
            trend: `${subscriptionSummary.progressPercent}% complete`,
            onClick: () => onNavigate?.("subscription"),
        },
        {
            label: "Open Tickets",
            value: "1",
            subtext: "Avg 2hr response",
            icon: MessageSquare,
            trend: "Priority: Normal",
            onClick: () => onNavigate?.("support"),
        },
    ];

    const recentOrders = [
        {
            id: "ORD-2024-001",
            date: "Jan 15, 2024",
            product: "Lavender Dream Aroma Oil (5L)",
            status: "Delivered",
            statusColor: "bg-emerald-500",
        },
        {
            id: "ORD-2024-002",
            date: "Jan 18, 2024",
            product: "EZE Pro 5000 Diffuser",
            status: "Shipped",
            statusColor: "bg-blue-500",
        },
        {
            id: "ORD-2024-003",
            date: "Jan 20, 2024",
            product: "Citrus Fresh Aroma Oil (10L)",
            status: "Processing",
            statusColor: "bg-amber-500",
        },
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Delivered":
                return <CheckCircle2 className="w-3.5 h-3.5" />;
            case "Shipped":
                return <Truck className="w-3.5 h-3.5" />;
            default:
                return <Clock className="w-3.5 h-3.5" />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Welcome Header */}
            <AnimatedSection animation="fadeInUp">
                <div className="rounded-xl gradient-hero text-white p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-display font-bold mb-1">
                                Welcome back, John
                            </h1>
                            <p className="text-white/80 text-sm md:text-base">
                                Manage your {subscriptionSummary.devicesCount} diffusers and {subscriptionSummary.plan.name} subscription
                            </p>
                        </div>
                        <Link to="/products">
                            <Button
                                size="lg"
                                className="bg-white/15 hover:bg-white/25 border border-white/20 text-white backdrop-blur-sm"
                            >
                                Order Diffusers & Oils
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </AnimatedSection>

            {/* Stats Grid */}
            <AnimatedSection animation="fadeInUp" delay={100}>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat) => (
                        <Card
                            key={stat.label}
                            className="border-border/40 hover:border-accent/30 transition-colors cursor-pointer"
                            onClick={stat.onClick}
                        >
                            <CardContent className="p-4 md:p-5">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2 rounded-lg bg-primary/5">
                                        <stat.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                    <p className="text-xs text-muted-foreground/70">{stat.trend}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </AnimatedSection>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-5 gap-6">
                {/* Left Column - 3/5 */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Current Month Oil Selections */}
                    {currentMonthData && (
                        <AnimatedSection animation="fadeInUp" delay={150}>
                            <Card className="border-border/40">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                                <Droplets className="w-4 h-4 text-accent" />
                                                This Month's Oils
                                            </CardTitle>
                                            <CardDescription className="text-sm">
                                                {formatMonth(currentMonthData.month)} delivery
                                            </CardDescription>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-accent hover:text-accent/80 text-sm"
                                            onClick={() => onNavigate?.("subscription")}
                                        >
                                            View All <ArrowRight className="w-3.5 h-3.5 ml-1" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="space-y-3">
                                        {currentMonthData.selections.map((selection) => (
                                            <div
                                                key={selection.deviceId}
                                                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="w-3 h-3 rounded-full"
                                                        style={{ backgroundColor: selection.selectedOil?.color || '#ccc' }}
                                                    />
                                                    <div>
                                                        <span className="font-medium text-sm text-foreground">{selection.deviceName}</span>
                                                        <span className="text-muted-foreground text-sm"> • {selection.deviceType.oilCapacityMl}ml</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline" className="text-xs">
                                                        {selection.selectedOil?.name || 'Not selected'}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    )}

                    {/* Recent Orders */}
                    <AnimatedSection animation="fadeInUp" delay={200}>
                        <Card className="border-border/40">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                            <ShoppingBag className="w-4 h-4 text-accent" />
                                            Recent Orders
                                        </CardTitle>
                                        <CardDescription className="text-sm">Your latest purchases</CardDescription>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-accent hover:text-accent/80 text-sm"
                                        onClick={() => onNavigate?.("orders")}
                                    >
                                        View All <ArrowRight className="w-3.5 h-3.5 ml-1" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="space-y-3">
                                    {recentOrders.map((order) => (
                                        <div
                                            key={order.id}
                                            className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                                        >
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                                                    <Droplets className="w-4 h-4 text-accent" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-medium text-sm text-foreground truncate">{order.product}</p>
                                                    <p className="text-xs text-muted-foreground">{order.id} · {order.date}</p>
                                                </div>
                                            </div>
                                            <Badge
                                                className={`${order.statusColor} text-white border-0 text-xs flex items-center gap-1 ml-3`}
                                            >
                                                {getStatusIcon(order.status)}
                                                {order.status}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </AnimatedSection>
                </div>

                {/* Right Column - 2/5 */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Subscription Card */}
                    <AnimatedSection animation="fadeInUp" delay={250}>
                        <Card
                            className="border-accent/20 bg-gradient-to-br from-accent/5 to-transparent cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => onNavigate?.("subscription")}
                        >
                            <CardContent className="p-5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2.5 rounded-lg bg-accent/15">
                                        <Crown className="w-5 h-5 text-accent" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-foreground">{subscriptionSummary.plan.name}</p>
                                        <Badge className="bg-emerald-500 text-white border-0 text-xs mt-0.5">Active</Badge>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                                </div>

                                {/* Progress */}
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-muted-foreground">Plan Progress</span>
                                        <span className="font-medium">{subscriptionSummary.completedMonths}/{subscriptionSummary.totalMonths} months</span>
                                    </div>
                                    <Progress value={subscriptionSummary.progressPercent} className="h-2" />
                                </div>

                                {/* Upcoming oils to select */}
                                {upcomingMonths.length > 0 && (
                                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-500/10 border-l-2 border-amber-500">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                                            <p className="font-medium text-sm text-foreground">Action Required</p>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Select oils for {upcomingMonths.length} upcoming month{upcomingMonths.length > 1 ? 's' : ''}
                                        </p>
                                    </div>
                                )}

                                <div className="grid grid-cols-3 gap-3 pt-3 mt-3 border-t border-border/50">
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-foreground">{subscriptionSummary.devicesCount}</p>
                                        <p className="text-xs text-muted-foreground">Devices</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-foreground">{subscriptionSummary.plan.discountPercent}%</p>
                                        <p className="text-xs text-muted-foreground">Discount</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-foreground">{subscriptionSummary.upcomingCount}</p>
                                        <p className="text-xs text-muted-foreground">Pending</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </AnimatedSection>

                    {/* Support Card */}
                    <AnimatedSection animation="fadeInUp" delay={300}>
                        <Card className="border-border/40">
                            <CardContent className="p-5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2.5 rounded-lg bg-primary/5">
                                        <HeadphonesIcon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">Support Tickets</p>
                                        <p className="text-xs text-muted-foreground">1 open request</p>
                                    </div>
                                </div>

                                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-500/10 border-l-2 border-amber-500 mb-4">
                                    <p className="font-medium text-sm text-foreground">Diffuser installation query</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">TKT-001 · Updated 2 hours ago</p>
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full text-sm"
                                    onClick={() => onNavigate?.("support")}
                                >
                                    <MessageSquare className="w-3.5 h-3.5 mr-2" />
                                    View Support
                                </Button>
                            </CardContent>
                        </Card>
                    </AnimatedSection>

                    {/* Quick Actions */}
                    <AnimatedSection animation="fadeInUp" delay={350}>
                        <Card className="border-border/40">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                                    Quick Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0 space-y-2">
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start h-auto py-3 px-3 hover:bg-accent/5"
                                    onClick={() => onNavigate?.("subscription")}
                                >
                                    <div className="p-1.5 rounded bg-accent/10 mr-3">
                                        <Calendar className="w-4 h-4 text-accent" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium text-sm">Manage Oil Selections</p>
                                        <p className="text-xs text-muted-foreground">Choose oils for upcoming months</p>
                                    </div>
                                </Button>
                                <Link to="/aroma-library" className="block">
                                    <Button variant="ghost" className="w-full justify-start h-auto py-3 px-3 hover:bg-accent/5">
                                        <div className="p-1.5 rounded bg-accent/10 mr-3">
                                            <Droplets className="w-4 h-4 text-accent" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-medium text-sm">Browse Aroma Library</p>
                                            <p className="text-xs text-muted-foreground">Explore our collection</p>
                                        </div>
                                    </Button>
                                </Link>
                                <Link to="/products" className="block">
                                    <Button variant="ghost" className="w-full justify-start h-auto py-3 px-3 hover:bg-primary/5">
                                        <div className="p-1.5 rounded bg-primary/10 mr-3">
                                            <Package className="w-4 h-4 text-primary" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-medium text-sm">Add New Diffuser</p>
                                            <p className="text-xs text-muted-foreground">Expand your setup</p>
                                        </div>
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </AnimatedSection>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AnimatedSection from "@/components/AnimatedSection";
import {
    SUBSCRIPTION_PLANS,
    MOCK_USER_SUBSCRIPTION,
    AROMA_OILS,
    formatMonth,
    formatMonthFull,
    calculateOilPrice,
    getSubscriptionSummary,
    type AromaOil,
    type MonthlyOilSelection,
    type SubscriptionPlan,
} from "@/lib/subscription";
import {
    Check,
    Crown,
    Calendar,
    Droplets,
    Edit3,
    AlertCircle,
    Clock,
    CheckCircle,
    Wifi,
    MapPin,
    ArrowRight,
    ArrowLeft,
    RefreshCw,
    Package,
    Eye,
    Lock,
    CreditCard,
    ChevronLeft,
    ChevronRight,
    X,
    ShoppingCart,
} from "lucide-react";

interface DashboardSubscriptionProps {
    onNavigate?: (section: string) => void;
}

const DashboardSubscription = ({ onNavigate }: DashboardSubscriptionProps) => {
    const subscription = MOCK_USER_SUBSCRIPTION;
    const summary = getSubscriptionSummary();

    // State
    const [selectedMonthIndex, setSelectedMonthIndex] = useState(() => {
        const index = subscription.monthlySelections.findIndex(m => m.status === 'current');
        return index >= 0 ? index : 0;
    });
    const [editingDevice, setEditingDevice] = useState<{ deviceId: string; oilId: string } | null>(null);
    const [selectedOil, setSelectedOil] = useState<string>("");

    // Plan switching state
    const [showPlanSwitch, setShowPlanSwitch] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

    // Checkout state
    const [showCheckout, setShowCheckout] = useState(false);
    const [checkoutStep, setCheckoutStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState("card");

    const currentMonth = subscription.monthlySelections[selectedMonthIndex];

    // Navigation for months
    const canGoBack = selectedMonthIndex > 0;
    const canGoForward = selectedMonthIndex < subscription.monthlySelections.length - 1;

    const goToPrevMonth = () => {
        if (canGoBack) setSelectedMonthIndex(prev => prev - 1);
    };

    const goToNextMonth = () => {
        if (canGoForward) setSelectedMonthIndex(prev => prev + 1);
    };

    const handleSaveOilSelection = () => {
        console.log("Saving oil selection:", editingDevice, selectedOil);
        setEditingDevice(null);
        setSelectedOil("");
    };

    const handlePlanSwitch = () => {
        if (selectedPlan) {
            setShowPlanSwitch(false);
            setShowCheckout(true);
            setCheckoutStep(1);
        }
    };

    const handleCheckoutComplete = () => {
        console.log("Checkout complete for plan:", selectedPlan);
        setShowCheckout(false);
        setCheckoutStep(1);
        setSelectedPlan(null);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-emerald-500';
            case 'current': return 'bg-blue-500';
            case 'upcoming': return 'bg-amber-500';
            default: return 'bg-gray-400';
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
                return <Badge className="bg-emerald-500 text-white border-0"><CheckCircle className="w-3 h-3 mr-1" />Delivered</Badge>;
            case 'current':
                return <Badge className="bg-blue-500 text-white border-0"><Clock className="w-3 h-3 mr-1" />Current</Badge>;
            case 'upcoming':
                return <Badge className="bg-amber-500 text-white border-0"><Edit3 className="w-3 h-3 mr-1" />Editable</Badge>;
            default:
                return <Badge variant="secondary"><Lock className="w-3 h-3 mr-1" />Locked</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <AnimatedSection animation="fadeInUp">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-display font-bold text-foreground">Subscription</h1>
                        <p className="text-muted-foreground mt-1">
                            {summary.plan.name} • {summary.devicesCount} devices • {summary.completedMonths}/{summary.totalMonths} months
                        </p>
                    </div>
                    <Button variant="outline" onClick={() => onNavigate?.("overview")}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Button>
                </div>
            </AnimatedSection>

            {/* Plan Progress */}
            <AnimatedSection animation="fadeInUp" delay={50}>
                <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
                    <CardContent className="p-5">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                            <div className="flex items-center gap-4 flex-1">
                                <div className="p-3 rounded-xl bg-accent/15">
                                    <Crown className="w-6 h-6 text-accent" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h2 className="font-bold text-lg">{summary.plan.name}</h2>
                                        <Badge className="bg-emerald-500 text-white border-0">Active</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {summary.plan.discountPercent}% discount • Ends {new Date(summary.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </p>
                                </div>
                            </div>

                            <div className="w-full lg:w-64">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-muted-foreground">Progress</span>
                                    <span className="font-medium">{summary.progressPercent}%</span>
                                </div>
                                <Progress value={summary.progressPercent} className="h-2" />
                            </div>

                            <Button onClick={() => setShowPlanSwitch(true)}>
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Change Plan
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </AnimatedSection>

            {/* Month Navigator - Easy to Use */}
            <AnimatedSection animation="fadeInUp" delay={100}>
                <Card className="border-border/40">
                    <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-primary" />
                                Monthly Oil Selections
                            </CardTitle>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                    Month {selectedMonthIndex + 1} of {subscription.monthlySelections.length}
                                </span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {/* Month Navigation - Large and Easy */}
                        <div className="flex items-center justify-between mb-6 p-4 bg-muted/30 rounded-xl">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={goToPrevMonth}
                                disabled={!canGoBack}
                                className="h-12 px-6"
                            >
                                <ChevronLeft className="w-5 h-5 mr-2" />
                                Previous
                            </Button>

                            <div className="text-center flex-1 px-4">
                                <h3 className="text-xl font-bold text-foreground">
                                    {formatMonthFull(currentMonth.month)}
                                </h3>
                                <div className="flex items-center justify-center gap-2 mt-1">
                                    {getStatusBadge(currentMonth.status)}
                                    {currentMonth.canModify && currentMonth.daysUntilDeadline > 0 && (
                                        <span className="text-sm text-amber-600">
                                            {currentMonth.daysUntilDeadline} days to modify
                                        </span>
                                    )}
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                size="lg"
                                onClick={goToNextMonth}
                                disabled={!canGoForward}
                                className="h-12 px-6"
                            >
                                Next
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>

                        {/* Month Timeline Pills */}
                        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-thin">
                            {subscription.monthlySelections.map((month, index) => (
                                <button
                                    key={month.month}
                                    onClick={() => setSelectedMonthIndex(index)}
                                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${index === selectedMonthIndex
                                        ? 'bg-primary text-primary-foreground shadow-md'
                                        : `${getStatusColor(month.status)} bg-opacity-20 hover:bg-opacity-30 text-foreground`
                                        }`}
                                >
                                    {formatMonth(month.month)}
                                </button>
                            ))}
                        </div>

                        {/* Device Oil Selections for Current Month */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                                Oil Selections for This Month
                            </h4>

                            {currentMonth.selections.map((selection) => (
                                <div
                                    key={selection.deviceId}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-accent/30 transition-colors"
                                >
                                    {/* Device Info */}
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-xl bg-primary/10">
                                            <Wifi className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h5 className="font-semibold text-foreground">{selection.deviceName}</h5>
                                            <p className="text-sm text-muted-foreground">
                                                {selection.deviceType.name} • {selection.deviceType.oilCapacityMl}ml
                                            </p>
                                        </div>
                                    </div>

                                    {/* Selected Oil */}
                                    <div className="flex items-center gap-3 flex-1 sm:justify-center">
                                        <div
                                            className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                                            style={{ backgroundColor: selection.selectedOil?.color || '#ccc' }}
                                        />
                                        <div>
                                            <p className="font-medium text-foreground">
                                                {selection.selectedOil?.name || 'Not selected'}
                                            </p>
                                            <p className="text-xs text-muted-foreground capitalize">
                                                {selection.selectedOil?.category || 'Choose oil'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Price & Action */}
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="font-bold text-foreground">
                                                ₹{calculateOilPrice(selection.deviceType.oilCapacityMl).toLocaleString()}
                                            </p>
                                            <p className="text-xs text-muted-foreground">per month</p>
                                        </div>

                                        {currentMonth.canModify ? (
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setEditingDevice({ deviceId: selection.deviceId, oilId: selection.selectedOilId });
                                                    setSelectedOil(selection.selectedOilId);
                                                }}
                                            >
                                                <Edit3 className="w-4 h-4 mr-2" />
                                                Change
                                            </Button>
                                        ) : (
                                            <Badge variant="secondary" className="h-10 px-4">
                                                <Lock className="w-4 h-4 mr-2" />
                                                Locked
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Monthly Total */}
                            <div className="flex items-center justify-between p-4 rounded-xl bg-accent/10 border border-accent/20 mt-6">
                                <div>
                                    <p className="font-semibold text-foreground">Monthly Total</p>
                                    <p className="text-sm text-muted-foreground">
                                        {currentMonth.selections.length} devices
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-muted-foreground line-through">
                                        ₹{currentMonth.selections.reduce((sum, s) => sum + calculateOilPrice(s.deviceType.oilCapacityMl), 0).toLocaleString()}
                                    </p>
                                    <p className="text-2xl font-bold text-foreground">
                                        ₹{Math.round(currentMonth.selections.reduce((sum, s) => sum + calculateOilPrice(s.deviceType.oilCapacityMl), 0) * (1 - summary.plan.discountPercent / 100)).toLocaleString()}
                                    </p>
                                    <Badge className="bg-emerald-500 text-white border-0 text-xs">
                                        {summary.plan.discountPercent}% discount applied
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </AnimatedSection>

            {/* Legend */}
            <AnimatedSection animation="fadeInUp" delay={150}>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground p-4 bg-muted/20 rounded-lg">
                    <span className="font-medium">Status:</span>
                    <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-emerald-500" /> Delivered</span>
                    <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-500" /> Current</span>
                    <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-amber-500" /> Editable</span>
                    <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-gray-400" /> Locked</span>
                </div>
            </AnimatedSection>

            {/* Oil Selection Dialog */}
            <Dialog open={!!editingDevice} onOpenChange={() => setEditingDevice(null)}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Change Aroma Oil</DialogTitle>
                        <DialogDescription>
                            Select a new oil for {currentMonth.selections.find(s => s.deviceId === editingDevice?.deviceId)?.deviceName}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4 space-y-4">
                        <Select value={selectedOil} onValueChange={setSelectedOil}>
                            <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select an aroma oil" />
                            </SelectTrigger>
                            <SelectContent>
                                {AROMA_OILS.map((oil) => (
                                    <SelectItem key={oil.id} value={oil.id} className="py-3">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-4 h-4 rounded-full"
                                                style={{ backgroundColor: oil.color }}
                                            />
                                            <div>
                                                <span className="font-medium">{oil.name}</span>
                                                <span className="text-muted-foreground ml-2 capitalize">({oil.category})</span>
                                            </div>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {selectedOil && (
                            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full"
                                        style={{ backgroundColor: AROMA_OILS.find(o => o.id === selectedOil)?.color }}
                                    />
                                    <div>
                                        <p className="font-medium">{AROMA_OILS.find(o => o.id === selectedOil)?.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {AROMA_OILS.find(o => o.id === selectedOil)?.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditingDevice(null)}>Cancel</Button>
                        <Button onClick={handleSaveOilSelection} disabled={!selectedOil}>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Save Selection
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Plan Switch Dialog */}
            <Dialog open={showPlanSwitch} onOpenChange={setShowPlanSwitch}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Change Subscription Plan</DialogTitle>
                        <DialogDescription>
                            Select a new plan for your subscription
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        <RadioGroup value={selectedPlan?.id || ''} onValueChange={(id) => setSelectedPlan(SUBSCRIPTION_PLANS.find(p => p.id === id) || null)}>
                            <div className="grid md:grid-cols-2 gap-4">
                                {SUBSCRIPTION_PLANS.map((plan) => (
                                    <label
                                        key={plan.id}
                                        className={`relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedPlan?.id === plan.id
                                            ? 'border-accent bg-accent/5'
                                            : subscription.plan.id === plan.id
                                                ? 'border-primary/50 bg-primary/5'
                                                : 'border-border hover:border-accent/50'
                                            }`}
                                    >
                                        <RadioGroupItem value={plan.id} className="sr-only" />

                                        {subscription.plan.id === plan.id && (
                                            <Badge className="absolute -top-2 right-2 bg-primary text-primary-foreground">Current</Badge>
                                        )}

                                        <div className="flex items-center gap-3 mb-3">
                                            <Crown className="w-5 h-5 text-accent" />
                                            <span className="font-bold text-lg">{plan.name}</span>
                                        </div>

                                        <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>

                                        <div className="flex items-center gap-2 mb-4">
                                            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                                                Save {plan.discountPercent}%
                                            </Badge>
                                            <span className="text-sm text-muted-foreground">{plan.durationMonths} months</span>
                                        </div>

                                        {selectedPlan?.id === plan.id && (
                                            <div className="absolute top-4 right-4">
                                                <CheckCircle className="w-5 h-5 text-accent" />
                                            </div>
                                        )}
                                    </label>
                                ))}
                            </div>
                        </RadioGroup>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowPlanSwitch(false)}>Cancel</Button>
                        <Button
                            onClick={handlePlanSwitch}
                            disabled={!selectedPlan || selectedPlan.id === subscription.plan.id}
                        >
                            <ArrowRight className="w-4 h-4 mr-2" />
                            Continue to Checkout
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Checkout Dialog */}
            <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>
                            {checkoutStep === 1 ? 'Confirm Plan Change' : checkoutStep === 2 ? 'Payment Method' : 'Complete'}
                        </DialogTitle>
                        <DialogDescription>
                            Step {checkoutStep} of 3
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        {checkoutStep === 1 && selectedPlan && (
                            <div className="space-y-4">
                                <Alert>
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        You're switching from <strong>{subscription.plan.name}</strong> to <strong>{selectedPlan.name}</strong>
                                    </AlertDescription>
                                </Alert>

                                <div className="p-4 rounded-lg bg-muted/50 space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">New Plan</span>
                                        <span className="font-medium">{selectedPlan.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Duration</span>
                                        <span className="font-medium">{selectedPlan.durationMonths} months</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Discount</span>
                                        <span className="font-medium text-emerald-600">{selectedPlan.discountPercent}% off</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {checkoutStep === 2 && (
                            <div className="space-y-4">
                                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                                    <div className="space-y-3">
                                        <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer ${paymentMethod === 'card' ? 'border-accent bg-accent/5' : 'border-border'}`}>
                                            <RadioGroupItem value="card" />
                                            <CreditCard className="w-5 h-5" />
                                            <div>
                                                <p className="font-medium">Credit/Debit Card</p>
                                                <p className="text-sm text-muted-foreground">Visa, Mastercard, RuPay</p>
                                            </div>
                                        </label>
                                        <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer ${paymentMethod === 'upi' ? 'border-accent bg-accent/5' : 'border-border'}`}>
                                            <RadioGroupItem value="upi" />
                                            <Package className="w-5 h-5" />
                                            <div>
                                                <p className="font-medium">UPI</p>
                                                <p className="text-sm text-muted-foreground">GPay, PhonePe, Paytm</p>
                                            </div>
                                        </label>
                                    </div>
                                </RadioGroup>

                                {paymentMethod === 'card' && (
                                    <div className="space-y-3 pt-4 border-t">
                                        <div>
                                            <Label>Card Number</Label>
                                            <Input placeholder="1234 5678 9012 3456" className="mt-1" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <Label>Expiry</Label>
                                                <Input placeholder="MM/YY" className="mt-1" />
                                            </div>
                                            <div>
                                                <Label>CVV</Label>
                                                <Input placeholder="123" className="mt-1" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {checkoutStep === 3 && (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Plan Updated Successfully!</h3>
                                <p className="text-muted-foreground">
                                    Your subscription has been updated to {selectedPlan?.name}
                                </p>
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        {checkoutStep < 3 && (
                            <Button variant="outline" onClick={() => checkoutStep === 1 ? setShowCheckout(false) : setCheckoutStep(checkoutStep - 1)}>
                                {checkoutStep === 1 ? 'Cancel' : 'Back'}
                            </Button>
                        )}
                        {checkoutStep < 3 ? (
                            <Button onClick={() => setCheckoutStep(checkoutStep + 1)}>
                                {checkoutStep === 2 ? (
                                    <>
                                        <ShoppingCart className="w-4 h-4 mr-2" />
                                        Pay & Confirm
                                    </>
                                ) : (
                                    <>
                                        Continue
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        ) : (
                            <Button onClick={handleCheckoutComplete}>Done</Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default DashboardSubscription;

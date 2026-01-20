import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimatedSection from "@/components/AnimatedSection";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
    User,
    CreditCard,
    Bell,
    Shield,
    Camera,
    Save,
    Building2,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";

interface DashboardSettingsProps {
    onNavigate?: (section: string) => void;
}

const DashboardSettings = ({ onNavigate }: DashboardSettingsProps) => {
    const [notifications, setNotifications] = useState({
        orderUpdates: true,
        promotions: false,
        newsletter: true,
        productAlerts: true,
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <AnimatedSection animation="fadeInUp">
                <div>
                    <h1 className="text-2xl font-display font-bold text-foreground">Settings</h1>
                    <p className="text-muted-foreground">Manage your account and preferences</p>
                </div>
            </AnimatedSection>

            <Tabs defaultValue="profile" className="space-y-6">
                <AnimatedSection animation="fadeInUp" delay={100}>
                    <TabsList className="gradient-card p-1 flex-wrap h-auto">
                        <TabsTrigger value="profile" className="gap-2">
                            <User className="w-4 h-4" />
                            Profile
                        </TabsTrigger>
                        <TabsTrigger value="billing" className="gap-2">
                            <CreditCard className="w-4 h-4" />
                            Billing
                        </TabsTrigger>
                        <TabsTrigger value="notifications" className="gap-2">
                            <Bell className="w-4 h-4" />
                            Notifications
                        </TabsTrigger>
                        <TabsTrigger value="security" className="gap-2">
                            <Shield className="w-4 h-4" />
                            Security
                        </TabsTrigger>
                    </TabsList>
                </AnimatedSection>

                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-6">
                    <AnimatedSection animation="fadeInUp" delay={200}>
                        <Card className="gradient-card shadow-card">
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>Update your personal details</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Avatar */}
                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <Avatar className="h-24 w-24 border-4 border-accent/30">
                                            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                                            <AvatarFallback className="gradient-hero text-primary-foreground text-2xl font-semibold">
                                                JD
                                            </AvatarFallback>
                                        </Avatar>
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            className="absolute -bottom-2 -right-2 rounded-full shadow-card"
                                        >
                                            <Camera className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">Profile Photo</h3>
                                        <p className="text-sm text-muted-foreground">JPG or PNG. Max 2MB</p>
                                    </div>
                                </div>

                                <Separator />

                                {/* Personal Info */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input id="firstName" defaultValue="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input id="lastName" defaultValue="Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input id="email" type="email" defaultValue="john@company.com" className="pl-10" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input id="phone" type="tel" defaultValue="+91 98765 43210" className="pl-10" />
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {/* Company Info */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                                        <Building2 className="w-5 h-5 text-accent" />
                                        Company Details
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="company">Company Name</Label>
                                            <Input id="company" defaultValue="Acme Hotels" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="industry">Industry</Label>
                                            <Input id="industry" defaultValue="Hospitality" />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="address">Address</Label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                                <Input id="address" defaultValue="123 Business Park, Mumbai, India" className="pl-10" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Button variant="hero" className="gap-2">
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </Button>
                            </CardContent>
                        </Card>
                    </AnimatedSection>

                    {/* Theme Preference */}
                    <AnimatedSection animation="fadeInUp" delay={300}>
                        <Card className="gradient-card shadow-card">
                            <CardHeader>
                                <CardTitle>Appearance</CardTitle>
                                <CardDescription>Customize your dashboard look</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-foreground">Theme</p>
                                        <p className="text-sm text-muted-foreground">Switch between light and dark mode</p>
                                    </div>
                                    <ThemeToggle />
                                </div>
                            </CardContent>
                        </Card>
                    </AnimatedSection>
                </TabsContent>

                {/* Billing Tab */}
                <TabsContent value="billing" className="space-y-6">
                    <AnimatedSection animation="fadeInUp" delay={200}>
                        <Card className="gradient-card shadow-card">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-accent" />
                                    Current Plan
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20">
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground">Premium Plan</h3>
                                        <p className="text-muted-foreground">$49.99/month • Billed monthly</p>
                                        <p className="text-sm text-muted-foreground mt-1">Next billing: February 1, 2024</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" onClick={() => onNavigate?.("subscription")}>Change Plan</Button>
                                        <Button variant="ghost" className="text-destructive hover:text-destructive">
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </AnimatedSection>

                    <AnimatedSection animation="fadeInUp" delay={300}>
                        <Card className="gradient-card shadow-card">
                            <CardHeader>
                                <CardTitle>Payment Method</CardTitle>
                                <CardDescription>Manage your payment details</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-lg bg-background">
                                            <CreditCard className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground">•••• •••• •••• 4242</p>
                                            <p className="text-sm text-muted-foreground">Expires 12/25</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">Update</Button>
                                </div>
                                <Button variant="outline" className="w-full">Add Payment Method</Button>
                            </CardContent>
                        </Card>
                    </AnimatedSection>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="space-y-6">
                    <AnimatedSection animation="fadeInUp" delay={200}>
                        <Card className="gradient-card shadow-card">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bell className="w-5 h-5 text-accent" />
                                    Email Notifications
                                </CardTitle>
                                <CardDescription>Choose what updates you receive</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-foreground">Order Updates</p>
                                        <p className="text-sm text-muted-foreground">Shipping, delivery, and order status</p>
                                    </div>
                                    <Switch
                                        checked={notifications.orderUpdates}
                                        onCheckedChange={(checked) => setNotifications({ ...notifications, orderUpdates: checked })}
                                    />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-foreground">Promotions & Offers</p>
                                        <p className="text-sm text-muted-foreground">Special deals and discounts</p>
                                    </div>
                                    <Switch
                                        checked={notifications.promotions}
                                        onCheckedChange={(checked) => setNotifications({ ...notifications, promotions: checked })}
                                    />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-foreground">Newsletter</p>
                                        <p className="text-sm text-muted-foreground">Monthly updates and industry insights</p>
                                    </div>
                                    <Switch
                                        checked={notifications.newsletter}
                                        onCheckedChange={(checked) => setNotifications({ ...notifications, newsletter: checked })}
                                    />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-foreground">Product Alerts</p>
                                        <p className="text-sm text-muted-foreground">New aromas and product launches</p>
                                    </div>
                                    <Switch
                                        checked={notifications.productAlerts}
                                        onCheckedChange={(checked) => setNotifications({ ...notifications, productAlerts: checked })}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </AnimatedSection>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security" className="space-y-6">
                    <AnimatedSection animation="fadeInUp" delay={200}>
                        <Card className="gradient-card shadow-card">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-accent" />
                                    Password
                                </CardTitle>
                                <CardDescription>Update your password</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="currentPassword">Current Password</Label>
                                    <Input id="currentPassword" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="newPassword">New Password</Label>
                                    <Input id="newPassword" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                    <Input id="confirmPassword" type="password" />
                                </div>
                                <Button variant="hero">Update Password</Button>
                            </CardContent>
                        </Card>
                    </AnimatedSection>

                    <AnimatedSection animation="fadeInUp" delay={300}>
                        <Card className="gradient-card shadow-card border-destructive/20">
                            <CardHeader>
                                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                                <CardDescription>Irreversible actions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-foreground">Delete Account</p>
                                        <p className="text-sm text-muted-foreground">Permanently delete your account and data</p>
                                    </div>
                                    <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                                        Delete Account
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </AnimatedSection>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default DashboardSettings;

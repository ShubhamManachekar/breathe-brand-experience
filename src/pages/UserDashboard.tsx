import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/providers/AuthProvider";
import { 
  Building, 
  Users, 
  Package, 
  Droplets, 
  Star, 
  MessageSquare, 
  FileText, 
  Ticket, 
  Settings, 
  Gift,
  TrendingUp,
  MapPin,
  Calendar,
  Shield,
  Plus,
  Edit,
  Filter,
  LogOut
} from "lucide-react";
import mockData from "@/lib/mockUserData.json";
import SubscriptionManager from "@/components/SubscriptionManager";

const UserDashboard = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [quoteFilter, setQuoteFilter] = useState("all");
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isNewQuoteOpen, setIsNewQuoteOpen] = useState(false);
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [isNewReferralOpen, setIsNewReferralOpen] = useState(false);
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);
  
  const { user, company, devicesPurchased, oilsPurchased, suggestedOils, reviews, quotes, tickets, referrals, stats } = mockData;
  const { toast } = useToast();
  
  const handleLogout = () => {
    auth.logout();
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
    navigate("/");
  };
  
  // Form states - use auth user data
  const [profileForm, setProfileForm] = useState({ 
    name: auth.user?.name || user.name, 
    email: auth.user?.email || user.email, 
    phone: user.phone 
  });
  const [quoteForm, setQuoteForm] = useState({ type: "", items: "", outlet: "", notes: "" });
  const [ticketForm, setTicketForm] = useState({ subject: "", description: "", priority: "medium", outlet: "" });
  const [referralForm, setReferralForm] = useState({ companyName: "", contactPerson: "", email: "", phone: "" });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'converted': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Filter quotes based on type
  const filteredQuotes = quoteFilter === "all" ? quotes : quotes.filter(quote => quote.type === quoteFilter);

  // Handle form submissions
  const handleProfileUpdate = () => {
    toast({ title: "Profile Updated", description: "Your profile has been successfully updated." });
    setIsEditProfileOpen(false);
  };

  const handleNewQuote = () => {
    toast({ title: "Quote Requested", description: "Your quote request has been submitted successfully." });
    setIsNewQuoteOpen(false);
    setQuoteForm({ type: "", items: "", outlet: "", notes: "" });
  };

  const handleNewTicket = () => {
    toast({ title: "Ticket Created", description: "Support ticket has been created successfully." });
    setIsNewTicketOpen(false);
    setTicketForm({ subject: "", description: "", priority: "medium", outlet: "" });
  };

  const handleNewReferral = () => {
    toast({ title: "Referral Added", description: "New referral has been added to your program." });
    setIsNewReferralOpen(false);
    setReferralForm({ companyName: "", contactPerson: "", email: "", phone: "" });
  };

  const requestQuoteForOil = (oilName: string) => {
    toast({ title: "Quote Requested", description: `Quote requested for ${oilName}. We'll contact you soon.` });
  };

  const requestNewDevice = () => {
    toast({ title: "Device Request", description: "New device request submitted. Our team will contact you." });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-3 sm:p-4 md:p-6 lg:p-8 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <Card className="gradient-card shadow-elegant hover:shadow-glow transition-all duration-300 animate-scale-in">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
                <Avatar className="h-14 w-14 sm:h-16 sm:w-16 shadow-card ring-2 ring-primary/10">
                  <AvatarImage src={user.avatar} alt={auth.user?.name || user.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-lg sm:text-xl font-semibold">
                    {(auth.user?.name || user.name).split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground truncate">
                    Welcome, {auth.user?.name?.split(' ')[0] || user.name.split(' ')[0]}!
                  </h1>
                  <p className="text-muted-foreground text-sm sm:text-base md:text-lg truncate">{user.role} at {company.name}</p>
                  <div className="flex items-center space-x-2 mt-1 sm:mt-2">
                    <Building className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-muted-foreground truncate">{company.totalOutlets} outlets · Since {company.since}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" onClick={handleLogout} className="flex-1 sm:flex-none hover-scale">
                  <LogOut className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
                
                <Dialog open={isAccountSettingsOpen} onOpenChange={setIsAccountSettingsOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none hover-scale">
                      <Settings className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Settings</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Account Settings</DialogTitle>
                      <DialogDescription>Manage your account preferences and security.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full justify-start" onClick={() => { setIsEditProfileOpen(true); setIsAccountSettingsOpen(false); }}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        Notification Settings
                      </Button>
                      <Button variant="destructive" className="w-full justify-start" onClick={() => { setIsAccountSettingsOpen(false); handleLogout(); }}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Edit Profile Dialog */}
                <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                      <DialogDescription>Update your personal information.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="profile-name">Full Name</Label>
                        <Input 
                          id="profile-name"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="profile-email">Email</Label>
                        <Input 
                          id="profile-email"
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="profile-phone">Phone</Label>
                        <Input 
                          id="profile-phone"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleProfileUpdate} className="w-full">Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog open={isNewQuoteOpen} onOpenChange={setIsNewQuoteOpen}>
                  <DialogTrigger asChild>
                    <Button variant="premium" size="sm" className="flex-1 sm:flex-none hover-scale">
                      <Plus className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">New Quote</span>
                      <span className="sm:hidden">Quote</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Request New Quote</DialogTitle>
                      <DialogDescription>Submit a quote request for devices or oils.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="quote-type">Quote Type</Label>
                        <Select value={quoteForm.type} onValueChange={(value) => setQuoteForm({...quoteForm, type: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select quote type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="device">Device</SelectItem>
                            <SelectItem value="oil">Oil</SelectItem>
                            <SelectItem value="both">Both</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="quote-items">Items Needed</Label>
                        <Textarea 
                          id="quote-items"
                          placeholder="Describe the items you need..."
                          value={quoteForm.items}
                          onChange={(e) => setQuoteForm({...quoteForm, items: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="quote-outlet">Outlet</Label>
                        <Input 
                          id="quote-outlet"
                          placeholder="Which outlet is this for?"
                          value={quoteForm.outlet}
                          onChange={(e) => setQuoteForm({...quoteForm, outlet: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="quote-notes">Additional Notes</Label>
                        <Textarea 
                          id="quote-notes"
                          placeholder="Any additional requirements..."
                          value={quoteForm.notes}
                          onChange={(e) => setQuoteForm({...quoteForm, notes: e.target.value})}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleNewQuote} className="w-full">Submit Quote Request</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="gradient-card shadow-card hover:shadow-elegant transition-all duration-300 hover-scale animate-fade-in">
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Purchases</p>
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <p className="text-lg sm:text-2xl font-bold text-primary">₹{(stats.totalPurchases / 1000).toFixed(0)}K</p>
              </div>
            </CardContent>
          </Card>
          <Card className="gradient-card shadow-card hover:shadow-elegant transition-all duration-300 hover-scale animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs sm:text-sm text-muted-foreground">Active Devices</p>
                  <Package className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <p className="text-lg sm:text-2xl font-bold text-primary">{stats.activeDevices}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="gradient-card shadow-card hover:shadow-elegant transition-all duration-300 hover-scale animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs sm:text-sm text-muted-foreground">Satisfaction</p>
                  <Star className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500 fill-current" />
                </div>
                <p className="text-lg sm:text-2xl font-bold text-primary">{stats.customerSatisfactionScore}/5</p>
              </div>
            </CardContent>
          </Card>
          <Card className="gradient-card shadow-card hover:shadow-elegant transition-all duration-300 hover-scale animate-fade-in" style={{ animationDelay: '300ms' }}>
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs sm:text-sm text-muted-foreground">Rewards</p>
                  <Gift className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <p className="text-lg sm:text-2xl font-bold text-primary">₹{(stats.referralRewards / 1000).toFixed(1)}K</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="sticky top-16 z-10 bg-gradient-subtle pb-2 -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 px-3 sm:px-4 md:px-6 lg:px-8">
            <ScrollArea className="w-full">
              <TabsList className="inline-flex space-x-1 sm:space-x-2 w-full sm:w-auto bg-background/80 backdrop-blur-md border border-border/50 shadow-md rounded-lg p-1">
                <TabsTrigger className="flex-shrink-0 text-xs sm:text-sm transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" value="overview">
                  <span className="hidden sm:inline">Overview</span>
                  <span className="sm:hidden">Home</span>
                </TabsTrigger>
                <TabsTrigger className="flex-shrink-0 text-xs sm:text-sm transition-all duration-200" value="devices">Devices</TabsTrigger>
                <TabsTrigger className="flex-shrink-0 text-xs sm:text-sm transition-all duration-200" value="oils">Oils</TabsTrigger>
                <TabsTrigger className="flex-shrink-0 text-xs sm:text-sm transition-all duration-200" value="quotes">Quotes</TabsTrigger>
                <TabsTrigger className="flex-shrink-0 text-xs sm:text-sm transition-all duration-200" value="tickets">Tickets</TabsTrigger>
                <TabsTrigger className="flex-shrink-0 text-xs sm:text-sm transition-all duration-200" value="reviews">Reviews</TabsTrigger>
                <TabsTrigger className="flex-shrink-0 text-xs sm:text-sm transition-all duration-200" value="referrals">
                  <span className="hidden sm:inline">Referrals</span>
                  <span className="sm:hidden">Refer</span>
                </TabsTrigger>
                <TabsTrigger className="flex-shrink-0 text-xs sm:text-sm transition-all duration-200" value="subscriptions">
                  <span className="hidden sm:inline">Subscriptions</span>
                  <span className="sm:hidden">Subs</span>
                </TabsTrigger>
                <TabsTrigger className="flex-shrink-0 text-xs sm:text-sm transition-all duration-200" value="account">Account</TabsTrigger>
              </TabsList>
            </ScrollArea>
          </div>

          <TabsContent value="overview" className="space-y-4 sm:space-y-6 mt-4 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Company Info */}
              <Card className="gradient-card shadow-elegant hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="h-5 w-5 mr-2 text-primary" />
                    Company Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold text-lg">{company.name}</p>
                    <p className="text-muted-foreground">{company.businessType}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm sm:text-base">Outlets:</h4>
                    {company.outlets.map((outlet, idx) => (
                      <div 
                        key={outlet.id} 
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-200 animate-fade-in"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <div className="min-w-0 flex-1 mr-2">
                          <p className="font-medium text-sm sm:text-base truncate">{outlet.name}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground flex items-center">
                            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{outlet.location}</span>
                          </p>
                        </div>
                        <Badge variant="outline" className="flex-shrink-0 text-xs">{outlet.size}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="gradient-card shadow-elegant hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center text-base sm:text-lg">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64 sm:h-72">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Quote approved for Jasmine Bloom</p>
                          <p className="text-xs text-muted-foreground">2 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                        <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Ticket resolved - Oil refill completed</p>
                          <p className="text-xs text-muted-foreground">5 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-purple-50 border border-purple-200">
                        <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">New referral added - Tech World Store</p>
                          <p className="text-xs text-muted-foreground">1 week ago</p>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="devices" className="space-y-4 mt-4 animate-fade-in">
            <Card className="gradient-card shadow-elegant hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="flex items-center text-base sm:text-lg">
                    <Package className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary" />
                    Devices Purchased
                  </span>
                  <Button size="sm" variant="premium" onClick={requestNewDevice} className="w-full sm:w-auto hover-scale">
                    <Plus className="h-4 w-4 mr-2" />
                    Request Device
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:gap-4">
                  {devicesPurchased.map((device, idx) => (
                    <div 
                      key={device.id} 
                      className="p-3 sm:p-4 rounded-lg border bg-background/50 backdrop-blur-sm hover:bg-background/70 hover:shadow-md transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                        <div className="space-y-2 flex-1 min-w-0">
                          <h3 className="font-semibold text-base sm:text-lg truncate">{device.name}</h3>
                          <p className="text-sm text-muted-foreground">Model: {device.model}</p>
                          <p className="text-xs sm:text-sm flex items-center">
                            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{device.outlet}</span>
                          </p>
                          <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                            <span className="truncate">Coverage: {device.coverage}</span>
                            <span className="truncate">S/N: {device.serialNumber}</span>
                          </div>
                        </div>
                        <div className="flex sm:flex-col gap-2 sm:text-right w-full sm:w-auto">
                          <Badge className={`${getStatusColor(device.status)} flex-1 sm:flex-none justify-center`}>{device.status}</Badge>
                          <p className="text-xs sm:text-sm text-muted-foreground flex-1 sm:flex-none">
                            Warranty: {device.warrantyExpiry}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="oils" className="space-y-4 sm:space-y-6 mt-4 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Purchased Oils */}
              <Card className="gradient-card shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Droplets className="h-5 w-5 mr-2 text-primary" />
                    Oils Purchased
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {oilsPurchased.map((oil) => (
                      <div key={oil.id} className="p-3 rounded-lg border bg-background/50">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{oil.name}</h4>
                            <p className="text-sm text-muted-foreground">{oil.brand}</p>
                            <p className="text-xs text-muted-foreground">{oil.outlet}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(oil.status)}>{oil.status}</Badge>
                            <p className="text-sm font-medium">₹{oil.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Suggested Oils */}
              <Card className="gradient-card shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-primary" />
                    Suggested for You
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {suggestedOils.map((oil) => (
                      <div key={oil.id} className="p-3 rounded-lg border bg-background/50">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{oil.name}</h4>
                            <Badge variant="outline">₹{oil.price}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{oil.reason}</p>
                          <Button 
                            size="sm" 
                            variant="premium" 
                            className="w-full"
                            onClick={() => requestQuoteForOil(oil.name)}
                          >
                            Request Quote
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quotes" className="space-y-4 mt-4 animate-fade-in">
            <Card className="gradient-card shadow-elegant hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex flex-col gap-3">
                  <span className="flex items-center text-base sm:text-lg">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary" />
                    Quotes Tracker
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground hidden sm:block" />
                    <Button 
                      size="sm" 
                      variant={quoteFilter === "all" ? "default" : "outline"}
                      onClick={() => setQuoteFilter("all")}
                      className="flex-1 sm:flex-none text-xs sm:text-sm hover-scale"
                    >
                      All
                    </Button>
                    <Button 
                      size="sm" 
                      variant={quoteFilter === "device" ? "default" : "outline"}
                      onClick={() => setQuoteFilter("device")}
                      className="flex-1 sm:flex-none text-xs sm:text-sm hover-scale"
                    >
                      Devices
                    </Button>
                    <Button 
                      size="sm" 
                      variant={quoteFilter === "oil" ? "default" : "outline"}
                      onClick={() => setQuoteFilter("oil")}
                      className="flex-1 sm:flex-none text-xs sm:text-sm hover-scale"
                    >
                      Oils
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredQuotes.map((quote) => (
                    <div key={quote.id} className="p-4 rounded-lg border bg-background/50">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">Quote #{quote.id}</h4>
                          <p className="text-sm text-muted-foreground capitalize">{quote.type} Quote</p>
                        </div>
                        <Badge className={getStatusColor(quote.status)}>{quote.status}</Badge>
                      </div>
                      <div className="space-y-2">
                        {quote.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.name} x{item.quantity}</span>
                            <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                        <div className="border-t pt-2 flex justify-between font-medium">
                          <span>Total Amount:</span>
                          <span>₹{quote.totalAmount.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Valid until: {quote.validUntil} | Outlet: {quote.outlet}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-4 mt-4 animate-fade-in">
            <Card className="gradient-card shadow-elegant hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="flex items-center text-base sm:text-lg">
                    <Ticket className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary" />
                    Support Tickets
                  </span>
                  <Dialog open={isNewTicketOpen} onOpenChange={setIsNewTicketOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="premium" className="w-full sm:w-auto hover-scale">
                        <Plus className="h-4 w-4 mr-2" />
                        New Ticket
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create Support Ticket</DialogTitle>
                        <DialogDescription>Submit a support request for technical assistance.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="ticket-subject">Subject</Label>
                          <Input 
                            id="ticket-subject"
                            placeholder="Brief description of the issue"
                            value={ticketForm.subject}
                            onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="ticket-description">Description</Label>
                          <Textarea 
                            id="ticket-description"
                            placeholder="Detailed description of the issue..."
                            value={ticketForm.description}
                            onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="ticket-priority">Priority</Label>
                          <Select value={ticketForm.priority} onValueChange={(value) => setTicketForm({...ticketForm, priority: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="urgent">Urgent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="ticket-outlet">Outlet</Label>
                          <Select value={ticketForm.outlet} onValueChange={(value) => setTicketForm({...ticketForm, outlet: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select outlet" />
                            </SelectTrigger>
                            <SelectContent>
                              {company.outlets.map((outlet) => (
                                <SelectItem key={outlet.id} value={outlet.name}>{outlet.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleNewTicket} className="w-full">Create Ticket</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {tickets.map((ticket, idx) => (
                    <div 
                      key={ticket.id} 
                      className="p-3 sm:p-4 rounded-lg border bg-background/50 hover:bg-background/70 hover:shadow-md transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-3">
                        <div className="space-y-1 flex-1 min-w-0">
                          <h4 className="font-medium text-sm sm:text-base truncate">{ticket.subject}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">#{ticket.id}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                          <Badge variant={ticket.priority === 'high' ? 'destructive' : 'outline'} className="text-xs">
                            {ticket.priority}
                          </Badge>
                          <Badge className={`${getStatusColor(ticket.status)} text-xs`}>{ticket.status}</Badge>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-2">{ticket.description}</p>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 text-xs text-muted-foreground">
                        <span className="truncate">Assigned: {ticket.assignedTo}</span>
                        <span className="truncate">{ticket.outlet}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4 mt-4 animate-fade-in">
            <Card className="gradient-card shadow-elegant hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary" />
                  Your Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {reviews.map((review, idx) => (
                    <div 
                      key={review.id} 
                      className="p-3 sm:p-4 rounded-lg border bg-background/50 hover:bg-background/70 hover:shadow-md transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm sm:text-base truncate">{review.productName}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground capitalize">{review.productType}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 sm:h-4 sm:w-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-3">{review.comment}</p>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 text-xs text-muted-foreground">
                        <span className="truncate">{review.outlet}</span>
                        <span>{review.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="referrals" className="space-y-4 mt-4 animate-fade-in">
            <Card className="gradient-card shadow-elegant hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="flex items-center text-base sm:text-lg">
                    <Gift className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary" />
                    Referral Program
                  </span>
                  <Dialog open={isNewReferralOpen} onOpenChange={setIsNewReferralOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="premium" className="w-full sm:w-auto hover-scale">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Referral
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Referral</DialogTitle>
                        <DialogDescription>Refer a business to EZE Aircare and earn rewards.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="referral-company">Company Name</Label>
                          <Input 
                            id="referral-company"
                            placeholder="Enter company name"
                            value={referralForm.companyName}
                            onChange={(e) => setReferralForm({...referralForm, companyName: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="referral-contact">Contact Person</Label>
                          <Input 
                            id="referral-contact"
                            placeholder="Contact person name"
                            value={referralForm.contactPerson}
                            onChange={(e) => setReferralForm({...referralForm, contactPerson: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="referral-email">Email</Label>
                          <Input 
                            id="referral-email"
                            type="email"
                            placeholder="Contact email"
                            value={referralForm.email}
                            onChange={(e) => setReferralForm({...referralForm, email: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="referral-phone">Phone</Label>
                          <Input 
                            id="referral-phone"
                            placeholder="Contact phone number"
                            value={referralForm.phone}
                            onChange={(e) => setReferralForm({...referralForm, phone: e.target.value})}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleNewReferral} className="w-full">Add Referral</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Earn rewards by referring other businesses to EZE Aircare
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {referrals.map((referral, idx) => (
                    <div 
                      key={referral.id} 
                      className="p-3 sm:p-4 rounded-lg border bg-background/50 hover:bg-background/70 hover:shadow-md transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm sm:text-base truncate">{referral.companyName}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground truncate">{referral.contactPerson}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground truncate">{referral.email}</p>
                        </div>
                        <div className="flex flex-col items-start sm:items-end gap-1">
                          <Badge className={`${getStatusColor(referral.status)} text-xs`}>{referral.status}</Badge>
                          {referral.reward > 0 && (
                            <p className="text-xs sm:text-sm font-medium text-green-600">
                              Reward: ₹{referral.reward}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Referred: {referral.referralDate}
                        {referral.conversionDate && ` | Converted: ${referral.conversionDate}`}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-4 mt-4 animate-fade-in">
            <SubscriptionManager />
          </TabsContent>

          <TabsContent value="account" className="space-y-4 mt-4 animate-fade-in">
            <Card className="gradient-card shadow-elegant hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <Settings className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-primary" />
                      Personal Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Name</label>
                        <p className="text-sm text-muted-foreground">{user.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Phone</label>
                        <p className="text-sm text-muted-foreground">{user.phone}</p>
                      </div>
                      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">Edit Profile</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Profile</DialogTitle>
                            <DialogDescription>Update your personal information.</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="profile-name">Name</Label>
                              <Input 
                                id="profile-name"
                                value={profileForm.name}
                                onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="profile-email">Email</Label>
                              <Input 
                                id="profile-email"
                                type="email"
                                value={profileForm.email}
                                onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="profile-phone">Phone</Label>
                              <Input 
                                id="profile-phone"
                                value={profileForm.phone}
                                onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={handleProfileUpdate} className="w-full">Update Profile</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium flex items-center">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      Authorized Persons
                    </h3>
                    <div className="space-y-3">
                      {mockData.authorizedPersons.map((person) => (
                        <div key={person.id} className="p-3 rounded-lg bg-muted/30">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{person.name}</p>
                              <p className="text-sm text-muted-foreground">{person.role}</p>
                              <p className="text-xs text-muted-foreground">{person.email}</p>
                            </div>
                            <Badge variant="outline">
                              {person.permissions.length} permissions
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toast({ title: "Feature Coming Soon", description: "Add authorized person functionality will be available soon." })}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Person
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
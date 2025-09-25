import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  Plus
} from "lucide-react";
import mockData from "@/lib/mockUserData.json";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { user, company, devicesPurchased, oilsPurchased, suggestedOils, reviews, quotes, tickets, referrals, stats } = mockData;

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

  return (
    <div className="min-h-screen bg-gradient-subtle p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="gradient-card shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16 shadow-card">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Welcome back, {user.name}!</h1>
                  <p className="text-muted-foreground text-lg">{user.role} at {company.name}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Building className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{company.totalOutlets} outlets managed since {company.since}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
                <Button variant="premium" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Quote
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="gradient-card shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Purchases</p>
                  <p className="text-2xl font-bold text-primary">₹{stats.totalPurchases.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="gradient-card shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Devices</p>
                  <p className="text-2xl font-bold text-primary">{stats.activeDevices}</p>
                </div>
                <Package className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="gradient-card shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Satisfaction Score</p>
                  <p className="text-2xl font-bold text-primary">{stats.customerSatisfactionScore}/5</p>
                </div>
                <Star className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="gradient-card shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Referral Rewards</p>
                  <p className="text-2xl font-bold text-primary">₹{stats.referralRewards.toLocaleString()}</p>
                </div>
                <Gift className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 lg:grid-cols-8 w-full bg-background/50 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="oils">Oils</TabsTrigger>
            <TabsTrigger value="quotes">Quotes</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Company Info */}
              <Card className="gradient-card shadow-elegant">
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
                    <h4 className="font-medium">Outlets:</h4>
                    {company.outlets.map((outlet) => (
                      <div key={outlet.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <div>
                          <p className="font-medium">{outlet.name}</p>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {outlet.location}
                          </p>
                        </div>
                        <Badge variant="outline">{outlet.size}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="gradient-card shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
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

          <TabsContent value="devices" className="space-y-4">
            <Card className="gradient-card shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Package className="h-5 w-5 mr-2 text-primary" />
                    Devices Purchased
                  </span>
                  <Button size="sm" variant="premium">
                    <Plus className="h-4 w-4 mr-2" />
                    Request New Device
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {devicesPurchased.map((device) => (
                    <div key={device.id} className="p-4 rounded-lg border bg-background/50 backdrop-blur-sm">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg">{device.name}</h3>
                          <p className="text-muted-foreground">Model: {device.model}</p>
                          <p className="text-sm flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {device.outlet}
                          </p>
                          <div className="flex space-x-4 text-sm text-muted-foreground">
                            <span>Coverage: {device.coverage}</span>
                            <span>S/N: {device.serialNumber}</span>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <Badge className={getStatusColor(device.status)}>{device.status}</Badge>
                          <p className="text-sm text-muted-foreground">
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

          <TabsContent value="oils" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                          <Button size="sm" variant="premium" className="w-full">
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

          <TabsContent value="quotes" className="space-y-4">
            <Card className="gradient-card shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-primary" />
                    Quotes Tracker
                  </span>
                  <div className="space-x-2">
                    <Button size="sm" variant="outline">Device Quotes</Button>
                    <Button size="sm" variant="outline">Oil Quotes</Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quotes.map((quote) => (
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

          <TabsContent value="tickets" className="space-y-4">
            <Card className="gradient-card shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Ticket className="h-5 w-5 mr-2 text-primary" />
                    Support Tickets
                  </span>
                  <Button size="sm" variant="premium">
                    <Plus className="h-4 w-4 mr-2" />
                    New Ticket
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 rounded-lg border bg-background/50">
                      <div className="flex justify-between items-start mb-3">
                        <div className="space-y-1">
                          <h4 className="font-medium">{ticket.subject}</h4>
                          <p className="text-sm text-muted-foreground">#{ticket.id}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Badge variant={ticket.priority === 'high' ? 'destructive' : 'outline'}>
                            {ticket.priority}
                          </Badge>
                          <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{ticket.description}</p>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>Assigned to: {ticket.assignedTo}</span>
                        <span>{ticket.outlet}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            <Card className="gradient-card shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                  Your Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-4 rounded-lg border bg-background/50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{review.productName}</h4>
                          <p className="text-sm text-muted-foreground capitalize">{review.productType}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{review.outlet}</span>
                        <span>{review.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="referrals" className="space-y-4">
            <Card className="gradient-card shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Gift className="h-5 w-5 mr-2 text-primary" />
                    Referral Program
                  </span>
                  <Button size="sm" variant="premium">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Referral
                  </Button>
                </CardTitle>
                <CardDescription>
                  Earn rewards by referring other businesses to EZE Aircare
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {referrals.map((referral) => (
                    <div key={referral.id} className="p-4 rounded-lg border bg-background/50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{referral.companyName}</h4>
                          <p className="text-sm text-muted-foreground">{referral.contactPerson}</p>
                          <p className="text-sm text-muted-foreground">{referral.email}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(referral.status)}>{referral.status}</Badge>
                          {referral.reward > 0 && (
                            <p className="text-sm font-medium text-green-600 mt-1">
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

          <TabsContent value="account" className="space-y-4">
            <Card className="gradient-card shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-primary" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <Button variant="outline" size="sm">Edit Profile</Button>
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
                    <Button variant="outline" size="sm">
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
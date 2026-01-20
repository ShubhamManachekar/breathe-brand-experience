import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const ContactQuote = () => {
  const location = useLocation();
  const [interest, setInterest] = useState(location.state?.interest || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset success state when form changes
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl font-bold text-primary-foreground mb-6">
            Get Your Custom Quote
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Transform your space with EZE AirCare's premium scent solutions.
            Get a personalized consultation and quote today.
          </p>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Card className="gradient-card shadow-elegant border-primary/5 relative overflow-hidden">
                {isSuccess && (
                  <div className="absolute inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-300">
                    <div className="text-center p-8">
                      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <h3 className="font-display text-2xl font-bold mb-2">Request Received!</h3>
                      <p className="text-muted-foreground mb-6">
                        Thank you for your interest. Our fragrance experts will review your request and contact you within 24 hours.
                      </p>
                      <Button onClick={() => setIsSuccess(false)} variant="outline">
                        Send Another Request
                      </Button>
                    </div>
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="font-display text-2xl">Request Your Quote</CardTitle>
                </CardHeader>
                <CardContent>
                  {interest && (
                    <div className="mb-8 p-4 bg-accent/5 border border-accent/20 rounded-xl flex items-center justify-between animate-in slide-in-from-top-4 duration-500">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-accent/10 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Inquiring About</p>
                          <p className="font-display font-bold text-lg text-foreground">{interest}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setInterest("")} className="hover:text-destructive">
                        Change
                      </Button>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name *</Label>
                        <Input id="name" required className="bg-background/50 focus:bg-background transition-all" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address *</Label>
                        <Input id="email" type="email" required className="bg-background/50 focus:bg-background transition-all" placeholder="john@company.com" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone Number *</Label>
                        <Input id="phone" required className="bg-background/50 focus:bg-background transition-all" placeholder="+91 98765 43210" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Your Role</Label>
                        <Input id="role" className="bg-background/50 focus:bg-background transition-all" placeholder="e.g. Purchase Manager, Owner" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Company Name</Label>
                        <Input id="company" className="bg-background/50 focus:bg-background transition-all" placeholder="Your business name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="industry" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Industry Type *</Label>
                        <Select>
                          <SelectTrigger className="bg-background/50">
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="retail">Retail & Shopping</SelectItem>
                            <SelectItem value="hospitality">Hospitality & Hotels</SelectItem>
                            <SelectItem value="corporate">Corporate & Offices</SelectItem>
                            <SelectItem value="wellness">Wellness & Healthcare</SelectItem>
                            <SelectItem value="fitness">Gyms & Fitness</SelectItem>
                            <SelectItem value="residential">Luxury Residential</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="interest" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Interested In</Label>
                      <Input
                        id="interest"
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className="bg-background/50 focus:bg-background transition-all font-medium"
                        placeholder="e.g. EZE Pro Diffuser, Scent Branding..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="space-size" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Space Size (sqm)</Label>
                        <Input id="space-size" className="bg-background/50 focus:bg-background transition-all" placeholder="e.g. 500" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeline" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Project Timeline</Label>
                        <Select>
                          <SelectTrigger className="bg-background/50">
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immediately</SelectItem>
                            <SelectItem value="1-3">1-3 Months</SelectItem>
                            <SelectItem value="3+">3+ Months</SelectItem>
                            <SelectItem value="planning">Just Planning</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="budget" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Budget (Optional)</Label>
                        <Select>
                          <SelectTrigger className="bg-background/50">
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="economy">Economy</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                            <SelectItem value="luxury">Luxury / Bespoke</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Additional Details *</Label>
                      <Textarea
                        id="message"
                        className="bg-background/50 focus:bg-background transition-all min-h-[120px]"
                        placeholder="Tell us about your requirements, specific scent preferences, or any questions you have..."
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Sending Request...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="w-5 h-5 mr-2" />
                          Request Custom Quote
                        </span>
                      )}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      By submitting this form, you agree to our privacy policy and terms of service.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-accent" />
                    <span>Contact Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 group">
                    <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent group-hover:text-white transition-colors">
                      <Phone className="w-5 h-5 text-accent group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Phone</p>
                      <p className="text-muted-foreground">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent group-hover:text-white transition-colors">
                      <Mail className="w-5 h-5 text-accent group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Email</p>
                      <p className="text-muted-foreground">hello@ezeaircare.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent group-hover:text-white transition-colors">
                      <MapPin className="w-5 h-5 text-accent group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Address</p>
                      <p className="text-muted-foreground">Mumbai, India</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-card shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <CheckCircle className="w-8 h-8 text-accent" />
                    <div>
                      <h3 className="font-semibold">What's Next?</h3>
                      <p className="text-sm text-muted-foreground">After you submit</p>
                    </div>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5" />
                      <div>
                        <span className="font-medium block">Analysis</span>
                        <span className="text-muted-foreground text-xs">We analyze your space & requirements</span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5" />
                      <div>
                        <span className="font-medium block">Consultation</span>
                        <span className="text-muted-foreground text-xs">Expert call to discuss solutions</span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5" />
                      <div>
                        <span className="font-medium block">Proposal</span>
                        <span className="text-muted-foreground text-xs">Custom Quote & Implementation Plan</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactQuote;
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, ArrowLeft, Eye, EyeOff, CheckCircle2, Sparkles, Briefcase, LayoutDashboard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import PageMeta from "@/components/PageMeta";

const INDUSTRIES = ["Hospitality", "Retail", "Corporate", "Wellness & Healthcare", "Real Estate", "Education", "Other"];
const COMPANY_SIZES = ["1–10 employees", "11–50 employees", "51–200 employees", "201–1000 employees", "1000+ employees"];

const BusinessLogin = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: "", email: "", password: "",
    company_name: "", industry: "", job_title: "", company_size: "", website: "", city: ""
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const { demoLogin } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSelect = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (error) throw error;
      navigate("/business/dashboard");
    } catch (err: unknown) {
      toast({ title: "Error", description: (err as Error).message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSignupStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.full_name,
            user_type: "b2b",
            company_name: form.company_name,
            industry: form.industry,
            job_title: form.job_title,
            company_size: form.company_size,
          },
        },
      });
      if (error) throw error;
      setStep(3);
    } catch (err: unknown) {
      toast({ title: "Error", description: (err as Error).message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    demoLogin("b2b");
    toast({
      title: "Welcome, Rahul! 🏢",
      description: "You're now logged in as Luxe Hotels Group (demo).",
    });
    navigate("/business");
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <PageMeta
          title="Business Registration Success"
          description="Your business registration is received."
          keywords="business signup success"
          canonicalUrl="https://ezeaircare.com/business/login"
          ogType="website"
        />
        <div className="text-center max-w-md w-full bg-background border border-border/50 p-10 rounded-2xl shadow-neo">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Registration Received</h2>
          <p className="text-muted-foreground mb-8">
            Please verify your email address. Our team will review your application and activate your enterprise dashboard shortly.
          </p>
          <Link to="/business">
            <Button className="w-full rounded-sm h-12 uppercase tracking-wide text-xs font-bold">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <PageMeta
        title="Business Login"
        description="Sign in or create your EZE AirCare business account."
        keywords="business login, enterprise account"
        canonicalUrl="https://ezeaircare.com/business/login"
        ogType="website"
      />

      {/* ── Visual Side (Corporate) ── */}
      <div className="hidden lg:flex w-1/2 bg-primary relative overflow-hidden flex-col justify-between p-12 text-primary-foreground">
         <div className="absolute inset-0 bg-oil-texture opacity-20 mix-blend-overlay" />

         <div className="relative z-10">
            <Link to="/business" className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity">
               <ArrowLeft className="w-4 h-4" /> Back to Business
            </Link>
         </div>

         <div className="relative z-10 max-w-lg space-y-8">
            <div>
               <h1 className="font-display text-5xl font-semibold mb-4">Enterprise Control.</h1>
               <p className="text-lg text-primary-foreground/80">Manage scent diffusion, track consumable levels, and analyze guest dwell time from one dashboard.</p>
            </div>

            <div className="space-y-4">
               {[
                  { icon: LayoutDashboard, text: "Centralized device management" },
                  { icon: Briefcase, text: "Automated consumable reordering" },
                  { icon: Building2, text: "Multi-location analytics" }
               ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-sm bg-accent/20 flex items-center justify-center border border-accent/30">
                        <item.icon className="w-4 h-4 text-accent" />
                     </div>
                     <span className="text-sm font-medium">{item.text}</span>
                  </div>
               ))}
            </div>
         </div>

         <div className="relative z-10 flex gap-4 opacity-50">
            <div className="h-2 w-2 rounded-full bg-accent" />
            <div className="h-2 w-2 rounded-full bg-white" />
            <div className="h-2 w-2 rounded-full bg-white" />
         </div>
      </div>

      {/* ── Form Side ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 relative bg-background">
         <div className="max-w-md w-full space-y-8">
            <div className="text-center">
               <div className="w-12 h-12 rounded-sm bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-6 shadow-neo">
                  <span className="font-display font-bold text-xl">E</span>
               </div>
               <h2 className="font-display text-3xl font-semibold text-foreground">
                  {mode === "login" ? "Partner Portal" : "Partner Application"}
               </h2>
               <p className="text-muted-foreground mt-2 text-sm uppercase tracking-wide">
                  {mode === "login" ? "Secure access for enterprise clients" : "Join our network of premium spaces"}
               </p>
            </div>

            {/* Demo Login */}
            <div className="bg-muted/10 border border-primary/20 rounded-sm p-4 flex items-center gap-4 hover:bg-muted/20 transition-colors">
               <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5 text-primary" />
               </div>
               <div className="flex-1">
                  <div className="font-bold text-xs uppercase tracking-wide text-foreground">Demo Access</div>
                  <div className="text-xs text-muted-foreground">Log in as Luxe Hotels Group</div>
               </div>
               <Button size="sm" variant="outline" className="h-8 text-xs font-bold uppercase tracking-wider rounded-sm border-primary/30 text-primary hover:bg-primary/5" onClick={handleDemoLogin}>
                  Auto Fill
               </Button>
            </div>

            {mode === "login" ? (
               <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                     <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Work Email</Label>
                     <Input name="email" type="email" value={form.email} onChange={handleChange} required className="rounded-sm h-11 border-border/60 focus-visible:ring-primary" placeholder="name@company.com" />
                  </div>
                  <div className="space-y-2">
                     <div className="flex justify-between">
                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Password</Label>
                        <Link to="#" className="text-xs text-primary hover:underline">Forgot?</Link>
                     </div>
                     <div className="relative">
                        <Input name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange} required className="rounded-sm h-11 border-border/60 focus-visible:ring-primary" placeholder="••••••••" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                           {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                     </div>
                  </div>
                  <Button type="submit" className="w-full h-11 rounded-sm uppercase tracking-wider text-xs font-bold shadow-neo bg-primary text-primary-foreground hover:bg-primary/90" disabled={loading}>
                     {loading ? "Authenticating..." : "Access Dashboard"}
                  </Button>
               </form>
            ) : (
               <form onSubmit={step === 1 ? handleSignupStep1 : handleSignupSubmit} className="space-y-5">
                  {step === 1 ? (
                     <>
                        <div className="space-y-2">
                           <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</Label>
                           <Input name="full_name" value={form.full_name} onChange={handleChange} required className="rounded-sm h-11 border-border/60" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                           <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Work Email</Label>
                           <Input name="email" type="email" value={form.email} onChange={handleChange} required className="rounded-sm h-11 border-border/60" placeholder="name@company.com" />
                        </div>
                        <div className="space-y-2">
                           <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Password</Label>
                           <Input name="password" type="password" value={form.password} onChange={handleChange} required minLength={6} className="rounded-sm h-11 border-border/60" placeholder="••••••••" />
                        </div>
                        <Button type="submit" className="w-full h-11 rounded-sm uppercase tracking-wider text-xs font-bold bg-primary text-primary-foreground">Next Step</Button>
                     </>
                  ) : (
                     <>
                        <div className="space-y-2">
                           <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Company Name</Label>
                           <Input name="company_name" value={form.company_name} onChange={handleChange} required className="rounded-sm h-11 border-border/60" placeholder="Acme Corp" />
                        </div>
                        <div className="space-y-2">
                           <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Industry</Label>
                           <Select onValueChange={(v) => handleSelect("industry", v)}>
                              <SelectTrigger className="rounded-sm h-11 border-border/60"><SelectValue placeholder="Select..." /></SelectTrigger>
                              <SelectContent>
                                 {INDUSTRIES.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                              </SelectContent>
                           </Select>
                        </div>
                        <div className="flex gap-3">
                           <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 h-11 rounded-sm uppercase tracking-wider text-xs font-bold">Back</Button>
                           <Button type="submit" className="flex-1 h-11 rounded-sm uppercase tracking-wider text-xs font-bold bg-primary text-primary-foreground" disabled={loading}>
                              {loading ? "Processing..." : "Submit Application"}
                           </Button>
                        </div>
                     </>
                  )}
               </form>
            )}

            <div className="text-center pt-6 border-t border-border/40">
               <p className="text-xs text-muted-foreground">
                  {mode === "login" ? "Need an account?" : "Already a partner?"}{" "}
                  <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setStep(1); }} className="font-bold text-foreground hover:underline uppercase tracking-wide">
                     {mode === "login" ? "Apply Now" : "Sign In"}
                  </button>
               </p>
            </div>

            <div className="text-center">
               <Link to="/shop/login" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors">
                  Looking for Personal Shopping?
               </Link>
            </div>
         </div>
      </div>
    </div>
  );
};

export default BusinessLogin;

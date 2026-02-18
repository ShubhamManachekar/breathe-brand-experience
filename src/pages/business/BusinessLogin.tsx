import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, ArrowLeft, Eye, EyeOff, CheckCircle2, Sparkles, Briefcase } from "lucide-react";
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
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
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
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
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

  // Success screen
  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center px-4">
        <PageMeta
          title="Business Registration Success"
          description="Your business registration is received. Verify your email and our team will contact you for onboarding."
          keywords="business signup success, onboarding, scent strategy demo"
          canonicalUrl="https://ezeaircare.com/business/login"
          ogType="website"
        />
        <Card className="gradient-card shadow-elegant border-border/50 w-full max-w-md text-center">
          <CardContent className="pt-12 pb-10">
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">You're on the list!</h2>
            <p className="text-muted-foreground mb-8">
              We've received your registration. Please verify your email, then our team will reach out to schedule your demo.
            </p>
            <Link to="/business">
              <Button variant="hero" className="w-full">Back to Business Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center px-4 py-12">
      <PageMeta
        title="Business Login"
        description="Sign in or create your EZE AirCare business account to access dashboard tools and proposals."
        keywords="business login, enterprise account, b2b dashboard"
        canonicalUrl="https://ezeaircare.com/business/login"
        ogType="website"
      />
      <div className="w-full max-w-md space-y-6">
        <Link to="/business" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Business
        </Link>

        {/* Demo Quick Login Card */}
        <Card className="border-primary/30 bg-primary/5 shadow-md">
          <CardContent className="pt-6 pb-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 shadow-glow">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-foreground mb-1">Try Demo Account</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Explore as <strong>Rahul Mehta</strong>, VP Operations at <strong>Luxe Hotels Group</strong> — see B2B solutions, request quotes, and manage campaigns.
                </p>
                <Button variant="hero" size="sm" onClick={handleDemoLogin} className="group w-full sm:w-auto">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Quick Demo Login
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-border/50" />
          <span className="text-xs text-muted-foreground font-medium">or use your account</span>
          <div className="flex-1 h-px bg-border/50" />
        </div>

        {/* Main Card */}
        <Card className="gradient-card shadow-elegant border-border/50">
          <CardHeader className="text-center pb-2">
            <div className="w-14 h-14 gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
              <Building2 className="w-7 h-7 text-primary-foreground" />
            </div>
            <CardTitle className="font-display text-2xl">
              {mode === "login" ? "Business Portal" : step === 1 ? "Register Your Business" : "Company Details"}
            </CardTitle>
            <CardDescription>
              {mode === "login"
                ? "Access your scent marketing dashboard"
                : step === 1
                  ? "Step 1 of 2 — Account credentials"
                  : "Step 2 of 2 — Tell us about your business"}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            {/* LOGIN FORM */}
            {mode === "login" && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Work Email</Label>
                  <Input id="email" name="email" type="email" placeholder="you@company.com"
                    value={form.email} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <button type="button" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Input id="password" name="password" type={showPassword ? "text" : "password"}
                      placeholder="••••••••" value={form.password} onChange={handleChange} required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <Button variant="hero" type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            )}

            {/* SIGNUP STEP 1 */}
            {mode === "signup" && step === 1 && (
              <form onSubmit={handleSignupStep1} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input id="full_name" name="full_name" placeholder="John Smith"
                    value={form.full_name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Work Email</Label>
                  <Input id="email" name="email" type="email" placeholder="you@company.com"
                    value={form.email} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input id="password" name="password" type={showPassword ? "text" : "password"}
                      placeholder="Min. 6 characters" value={form.password} onChange={handleChange} required minLength={6} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <Button variant="hero" type="submit" className="w-full">Continue →</Button>
              </form>
            )}

            {/* SIGNUP STEP 2 */}
            {mode === "signup" && step === 2 && (
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company_name">Company Name</Label>
                  <Input id="company_name" name="company_name" placeholder="Acme Corp"
                    value={form.company_name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label>Industry</Label>
                  <Select onValueChange={(v) => handleSelect("industry", v)}>
                    <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
                    <SelectContent>
                      {INDUSTRIES.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job_title">Your Role</Label>
                  <Input id="job_title" name="job_title" placeholder="Marketing Manager"
                    value={form.job_title} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label>Company Size</Label>
                  <Select onValueChange={(v) => handleSelect("company_size", v)}>
                    <SelectTrigger><SelectValue placeholder="Select company size" /></SelectTrigger>
                    <SelectContent>
                      {COMPANY_SIZES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" placeholder="Mumbai"
                    value={form.city} onChange={handleChange} />
                </div>
                <div className="flex gap-3">
                  <Button variant="glass" type="button" className="flex-1" onClick={() => setStep(1)}>
                    ← Back
                  </Button>
                  <Button variant="hero" type="submit" className="flex-1" disabled={loading}>
                    {loading ? "Submitting..." : "Request Demo Access"}
                  </Button>
                </div>
              </form>
            )}

            {/* Toggle login/signup */}
            <div className="mt-6 text-center text-sm text-muted-foreground">
              {mode === "login" ? "New to EZE Business?" : "Already have an account?"}{" "}
              <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setStep(1); }}
                className="text-primary font-medium hover:underline">
                {mode === "login" ? "Register →" : "Sign in"}
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-border/50 text-center">
              <p className="text-xs text-muted-foreground">
                Shopping for home?{" "}
                <Link to="/shop/login" className="text-accent hover:underline font-medium">
                  Shop login →
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessLogin;

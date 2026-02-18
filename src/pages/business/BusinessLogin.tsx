import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, ArrowLeft, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

  // Success screen
  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center px-4">
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
      <div className="w-full max-w-md">
        <Link to="/business" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Business
        </Link>

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

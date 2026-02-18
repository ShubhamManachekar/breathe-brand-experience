import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag, ArrowLeft, Eye, EyeOff, Sparkles, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import PageMeta from "@/components/PageMeta";

const ShopLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ full_name: "", email: "", password: "" });
  const navigate = useNavigate();
  const { toast } = useToast();
  const { demoLogin } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
        navigate("/shop/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            data: { full_name: form.full_name, user_type: "b2c" },
          },
        });
        if (error) throw error;
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    demoLogin("b2c");
    toast({
      title: "Welcome, Priya! 👋",
      description: "You're now browsing as a demo shopper.",
    });
    navigate("/shop");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/5 via-background to-primary/5 flex items-center justify-center px-4 py-12">
      <PageMeta
        title="Shop Login"
        description="Sign in to your EZE AirCare shop account to manage orders and preferences."
        keywords="shop login, customer account, order tracking"
        canonicalUrl="https://ezeaircare.com/shop/login"
        ogType="website"
      />
      <div className="w-full max-w-md space-y-6">
        {/* Back link */}
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        {/* Demo Quick Login Card */}
        <Card className="border-accent/30 bg-accent/5 shadow-md">
          <CardContent className="pt-6 pb-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shrink-0 shadow-glow">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-foreground mb-1">Try Demo Account</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Explore as <strong>Priya Sharma</strong> — browse products, add to cart, and experience the shop without signing up.
                </p>
                <Button variant="hero" size="sm" onClick={handleDemoLogin} className="group w-full sm:w-auto">
                  <User className="w-4 h-4 mr-2" />
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

        {/* Main login card */}
        <Card className="gradient-card shadow-elegant border-border/50">
          <CardHeader className="text-center pb-2">
            <div className="w-14 h-14 gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
              <ShoppingBag className="w-7 h-7 text-primary-foreground" />
            </div>
            <CardTitle className="font-display text-2xl">
              {isLogin ? "Welcome back" : "Create your account"}
            </CardTitle>
            <CardDescription>
              {isLogin
                ? "Sign in to track orders & manage your preferences"
                : "Join EZE AirCare Shop for exclusive deals"}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    placeholder="Jane Smith"
                    value={form.full_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {isLogin && (
                    <button type="button" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button variant="hero" type="submit" className="w-full" disabled={loading}>
                {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-accent font-medium hover:underline"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-border/50 text-center">
              <p className="text-xs text-muted-foreground">
                Are you a business?{" "}
                <Link to="/business/login" className="text-primary hover:underline font-medium">
                  Business login →
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShopLogin;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff, Sparkles, User, ShoppingBag } from "lucide-react";
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
    } catch (err: unknown) {
      toast({ title: "Error", description: (err as Error).message, variant: "destructive" });
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
    <div className="min-h-screen bg-transparent flex">
      <PageMeta
        title="Shop Login"
        description="Sign in to your EZE AirCare shop account to manage orders and preferences."
        keywords="shop login, customer account, order tracking"
        canonicalUrl="https://ezeaircare.com/shop/login"
        ogType="website"
      />

      {/* ── Visual Side ── */}
      <div className="hidden lg:flex w-1/2 bg-muted relative overflow-hidden flex-col justify-between p-12 text-primary-foreground">
         <div className="absolute inset-0 bg-loom opacity-40 mix-blend-overlay" />
         <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20" />

         {/* Floating Elements */}
         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-background/30 backdrop-blur-xl rounded-full border border-white/20 animate-float-slow" />
         <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-accent/30 backdrop-blur-xl rounded-full border border-white/10 animate-float-slower" />

         <div className="relative z-10">
            <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity">
               <ArrowLeft className="w-4 h-4" /> Back to Shop
            </Link>
         </div>

         <div className="relative z-10 max-w-lg">
            <h1 className="font-display text-5xl font-semibold mb-6 text-foreground">Welcome to your sanctuary.</h1>
            <p className="text-lg text-foreground/70">Join our community of scent enthusiasts. Curate your home's atmosphere with premium diffusers and oils.</p>
         </div>

         <div className="relative z-10 text-xs text-foreground/50 uppercase tracking-widest font-bold">
            © EZE AirCare 2024
         </div>
      </div>

      {/* ── Form Side ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 relative">
         <div className="absolute top-8 left-8 lg:hidden">
            <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
               <ArrowLeft className="w-4 h-4" /> Back
            </Link>
         </div>

         <div className="max-w-md w-full space-y-8">
            <div className="text-center">
               <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6 text-accent">
                  <ShoppingBag className="w-6 h-6" />
               </div>
               <h2 className="font-display text-3xl font-semibold text-foreground">
                  {isLogin ? "Welcome back" : "Create account"}
               </h2>
               <p className="text-muted-foreground mt-2">
                  {isLogin ? "Enter your details to access your account." : "Start your scent journey today."}
               </p>
            </div>

            {/* Demo Login */}
            <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex items-center gap-4 hover:border-accent/30 transition-colors">
               <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-accent" />
               </div>
               <div className="flex-1">
                  <div className="font-medium text-sm text-foreground">Quick Demo</div>
                  <div className="text-xs text-muted-foreground">Try as Priya Sharma</div>
               </div>
               <Button size="sm" variant="ghost" className="text-accent hover:text-accent/80 hover:bg-accent/10" onClick={handleDemoLogin}>
                  Try Demo
               </Button>
            </div>

            <div className="relative">
               <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/50" />
               </div>
               <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
               </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
               {!isLogin && (
                  <div className="space-y-2">
                     <Label htmlFor="full_name">Full Name</Label>
                     <Input
                        id="full_name"
                        name="full_name"
                        placeholder="Jane Smith"
                        value={form.full_name}
                        onChange={handleChange}
                        className="h-11 rounded-lg bg-muted/20 border-border/50 focus:bg-background transition-colors"
                        required
                     />
                  </div>
               )}

               <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                     id="email"
                     name="email"
                     type="email"
                     placeholder="you@example.com"
                     value={form.email}
                     onChange={handleChange}
                     className="h-11 rounded-lg bg-muted/20 border-border/50 focus:bg-background transition-colors"
                     required
                  />
               </div>

               <div className="space-y-2">
                  <div className="flex items-center justify-between">
                     <Label htmlFor="password">Password</Label>
                     {isLogin && <Link to="#" className="text-xs text-muted-foreground hover:text-foreground">Forgot password?</Link>}
                  </div>
                  <div className="relative">
                     <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={form.password}
                        onChange={handleChange}
                        className="h-11 rounded-lg bg-muted/20 border-border/50 focus:bg-background transition-colors pr-10"
                        required
                        minLength={6}
                     />
                     <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                     >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                     </button>
                  </div>
               </div>

               <Button type="submit" size="lg" className="w-full rounded-full h-11 text-base shadow-lg shadow-primary/10 hover:translate-y-[-1px] transition-transform" disabled={loading}>
                  {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
               </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
               {isLogin ? "New to EZE?" : "Already have an account?"}{" "}
               <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-foreground hover:underline transition-all">
                  {isLogin ? "Sign up" : "Log in"}
               </button>
            </p>

            <div className="pt-6 border-t border-border/30 text-center">
               <Link to="/business/login" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  Go to Business Portal
               </Link>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ShopLogin;

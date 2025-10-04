import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/providers/AuthProvider";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const auth = useAuth();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (isLogin) {
      auth.login(email, password).then((ok) => {
        if (ok) {
          toast({ title: "Logged in", description: `Welcome back ${auth.user?.name || "user"}` });
          navigate("/user/dashboard");
        } else {
          toast({ title: "Login failed", description: "Invalid email or password." });
        }
      });
    } else {
      const firstName = String(formData.get("first-name") || "").trim();
      const name = firstName || "User";
      auth.register(name, email, password).then((ok) => {
        if (ok) {
          toast({ title: "Account created", description: `Welcome ${name}` });
          navigate("/user/dashboard");
        } else {
          toast({ title: "Registration failed", description: "Email already in use." });
        }
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <Card className="w-full max-w-sm gradient-card shadow-elegant">
        <CardHeader>
          <CardTitle className="text-2xl">{isLogin ? "Login" : "Sign Up"}</CardTitle>
          <CardDescription>
            {isLogin ? "Enter your email below to login to your account." : "Enter your information to create an account."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              {!isLogin && (
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" name="first-name" placeholder="Max" required />
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {isLogin && (
                    <a href="#" className="ml-auto inline-block text-sm underline">
                      Forgot your password?
                    </a>
                  )}
                </div>
                <Input id="password" name="password" type="password" required minLength={6} />
              </div>
              <Button type="submit" className="w-full">
                {isLogin ? "Login" : "Create an account"}
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={() => setIsLogin(!isLogin)} className="underline">
              {isLogin ? "Sign up" : "Login"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
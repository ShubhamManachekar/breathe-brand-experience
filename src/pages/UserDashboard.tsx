import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const UserDashboard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <Card className="w-full max-w-md gradient-card shadow-elegant">
        <CardHeader>
          <CardTitle className="text-3xl">Welcome Back!</CardTitle>
          <CardDescription>This is your personal dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Here you will be able to manage your account, view your order history, and more.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
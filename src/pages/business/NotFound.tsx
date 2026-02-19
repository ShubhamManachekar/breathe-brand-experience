import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import PageMeta from "@/components/PageMeta";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-accent/10">
      <PageMeta
        title="Page Not Found - EZE AirCare"
        description="The page you're looking for doesn't exist. Return to EZE AirCare homepage to explore our scent marketing solutions."
        keywords="404, page not found, EZE AirCare"
        ogType="website"
      />

      <div className="text-center px-6 py-12">
        <div className="mb-8">
          <h1 className="text-8xl font-display font-bold text-primary/20 mb-4">404</h1>
          <h2 className="text-3xl font-display font-bold text-foreground mb-4">Page Not Found</h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="group">
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

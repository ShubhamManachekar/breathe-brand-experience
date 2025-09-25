
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Navigation from "@/components/Navigation";
import { AuthProvider, ProtectedRoute } from "@/providers/AuthProvider";
import Index from "./pages/Index";
import WhyScentMarketing from "./pages/WhyScentMarketing";
import Solutions from "./pages/Solutions";
import SolutionsHospitality from "./pages/SolutionsHospitality";
import SolutionsRetail from "./pages/SolutionsRetail";
import SolutionsCorporate from "./pages/SolutionsCorporate";
import SolutionsWellness from "./pages/SolutionsWellness";
import Products from "./pages/Products";
import AromaLibrary from "./pages/AromaLibrary";
import ContactQuote from "./pages/ContactQuote";
import NotFound from "./pages/NotFound";
import Chatbot from "./components/Chatbot";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import ProductDetail from "./pages/ProductDetail";
import AboutUs from "./pages/AboutUs";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="eze-aircare-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-background text-foreground">
              <Navigation />
              <main className="pt-16">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/why-scent-marketing" element={<WhyScentMarketing />} />
                  <Route path="/solutions" element={<Solutions />} />
                  <Route path="/solutions/hospitality" element={<SolutionsHospitality />} />
                  <Route path="/solutions/retail" element={<SolutionsRetail />} />
                  <Route path="/solutions/corporate" element={<SolutionsCorporate />} />
                  <Route path="/solutions/wellness" element={<SolutionsWellness />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/products/:model" element={<ProductDetail />} />
                  <Route path="/aroma-library" element={<AromaLibrary />} />
                  <Route path="/contact-quote" element={<ContactQuote />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/user/dashboard"
                    element={
                      <ProtectedRoute>
                        <UserDashboard />
                      </ProtectedRoute>
                    }
                  />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Chatbot />
            </div>
          </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
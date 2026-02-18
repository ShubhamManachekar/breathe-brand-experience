import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";

// Shared pages
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";

// Homepage
import Index from "./pages/Index";

// B2C (Shop) pages
import ShopHome from "./pages/shop/ShopHome";
import ShopLogin from "./pages/shop/ShopLogin";

// B2B (Business) pages
import BusinessHome from "./pages/business/BusinessHome";
import BusinessLogin from "./pages/business/BusinessLogin";
import WhyScentMarketing from "./pages/WhyScentMarketing";
import Solutions from "./pages/Solutions";
import SolutionsHospitality from "./pages/SolutionsHospitality";
import SolutionsRetail from "./pages/SolutionsRetail";
import SolutionsCorporate from "./pages/SolutionsCorporate";
import SolutionsWellness from "./pages/SolutionsWellness";

// Shared content (available under both segments)
import Products from "./pages/Products";
import AromaLibrary from "./pages/AromaLibrary";
import ProductDetail from "./pages/ProductDetail";
import ContactQuote from "./pages/ContactQuote";

// Auth & Dashboard
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="eze-aircare-theme">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppLayout>
                <Routes>
                  {/* Main Homepage with segment selector */}
                  <Route path="/" element={<Index />} />

                  {/* ===== B2C (Shop) Routes ===== */}
                  <Route path="/shop" element={<ShopHome />} />
                  <Route path="/shop/products" element={<Products />} />
                  <Route path="/shop/products/:model" element={<ProductDetail />} />
                  <Route path="/shop/aromas" element={<AromaLibrary />} />
                  <Route path="/shop/login" element={<ShopLogin />} />
                  <Route path="/shop/dashboard" element={<UserDashboard />} />

                  {/* ===== B2B (Business) Routes ===== */}
                  <Route path="/business" element={<BusinessHome />} />
                  <Route path="/business/why-scent-marketing" element={<WhyScentMarketing />} />
                  <Route path="/business/solutions" element={<Solutions />} />
                  <Route path="/business/solutions/hospitality" element={<SolutionsHospitality />} />
                  <Route path="/business/solutions/retail" element={<SolutionsRetail />} />
                  <Route path="/business/solutions/corporate" element={<SolutionsCorporate />} />
                  <Route path="/business/solutions/wellness" element={<SolutionsWellness />} />
                  <Route path="/business/products" element={<Products />} />
                  <Route path="/business/products/:model" element={<ProductDetail />} />
                  <Route path="/business/aromas" element={<AromaLibrary />} />
                  <Route path="/business/contact" element={<ContactQuote />} />
                  <Route path="/business/login" element={<BusinessLogin />} />
                  <Route path="/business/dashboard" element={<UserDashboard />} />

                  {/* ===== Shared / Legacy Routes ===== */}
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:model" element={<ProductDetail />} />
                  <Route path="/aroma-library" element={<AromaLibrary />} />
                  <Route path="/why-scent-marketing" element={<WhyScentMarketing />} />
                  <Route path="/solutions" element={<Solutions />} />
                  <Route path="/solutions/hospitality" element={<SolutionsHospitality />} />
                  <Route path="/solutions/retail" element={<SolutionsRetail />} />
                  <Route path="/solutions/corporate" element={<SolutionsCorporate />} />
                  <Route path="/solutions/wellness" element={<SolutionsWellness />} />
                  <Route path="/contact-quote" element={<ContactQuote />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/user/dashboard" element={<UserDashboard />} />

                  {/* Catch-all */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AppLayout>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

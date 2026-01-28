import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import PageSkeleton from "@/components/PageSkeleton";

// Lazy load all page components for better performance
const Index = lazy(() => import("./pages/Index"));
const WhyScentMarketing = lazy(() => import("./pages/WhyScentMarketing"));
const Solutions = lazy(() => import("./pages/Solutions"));
const SolutionsHospitality = lazy(() => import("./pages/SolutionsHospitality"));
const SolutionsRetail = lazy(() => import("./pages/SolutionsRetail"));
const SolutionsCorporate = lazy(() => import("./pages/SolutionsCorporate"));
const SolutionsWellness = lazy(() => import("./pages/SolutionsWellness"));
const Products = lazy(() => import("./pages/Products"));
const AromaLibrary = lazy(() => import("./pages/AromaLibrary"));
const ContactQuote = lazy(() => import("./pages/ContactQuote"));
const Login = lazy(() => import("./pages/Login"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="eze-aircare-theme">
        <Toaster />
        <BrowserRouter>
          <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <main className="pt-16">
              <Suspense fallback={<PageSkeleton />}>
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
                  <Route path="/user/dashboard" element={<UserDashboard />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <Chatbot />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
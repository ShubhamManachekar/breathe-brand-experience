import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import AppLayout from "@/components/AppLayout";
import { Skeleton } from "@/components/ui/skeleton";
import AnalyticsTracker from "@/components/AnalyticsTracker";

/* ── Lazy-loaded pages (code-split into separate chunks) ── */

// B2C (Shop)
const ShopHome = lazy(() => import("./pages/shop/ShopHome"));
const ShopLogin = lazy(() => import("./pages/shop/ShopLogin"));
const ShopProducts = lazy(() => import("./pages/shop/ShopProducts"));
const ShopAromas = lazy(() => import("./pages/shop/ShopAromas"));
const ShopCart = lazy(() => import("./pages/shop/ShopCart"));
const ShopCheckout = lazy(() => import("./pages/shop/ShopCheckout"));
const ShopContact = lazy(() => import("./pages/shop/ShopContact"));

// B2B (Business)
const BusinessHome = lazy(() => import("./pages/business/BusinessHome"));
const BusinessLogin = lazy(() => import("./pages/business/BusinessLogin"));
const WhyScentMarketing = lazy(() => import("./pages/WhyScentMarketing"));
const Solutions = lazy(() => import("./pages/Solutions"));
const SolutionsHospitality = lazy(() => import("./pages/SolutionsHospitality"));
const SolutionsRetail = lazy(() => import("./pages/SolutionsRetail"));
const SolutionsCorporate = lazy(() => import("./pages/SolutionsCorporate"));
const SolutionsWellness = lazy(() => import("./pages/SolutionsWellness"));
const Products = lazy(() => import("./pages/Products"));
const AromaLibrary = lazy(() => import("./pages/AromaLibrary"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const ContactQuote = lazy(() => import("./pages/ContactQuote"));

// Shared
const AboutUs = lazy(() => import("./pages/AboutUs"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

/* ── Loading fallback ── */
const PageLoader = () => (
  <div className="min-h-screen bg-diffuser-atmosphere">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-14 w-full max-w-3xl" />
        <Skeleton className="h-6 w-full max-w-2xl" />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="surface-glass rounded-3xl p-6 space-y-4">
            <Skeleton className="h-40 w-full rounded-2xl" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="eze-aircare-theme">
        <AuthProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <AnalyticsTracker />
                <AppLayout>
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      {/* Default → Shop */}
                      <Route path="/" element={<Navigate to="/shop" replace />} />

                      {/* ===== B2C (Shop) Routes ===== */}
                      <Route path="/shop" element={<ShopHome />} />
                      <Route path="/shop/products" element={<ShopProducts />} />
                      <Route path="/shop/products/:model" element={<ProductDetail />} />
                      <Route path="/shop/aromas" element={<ShopAromas />} />
                      <Route path="/shop/cart" element={<ShopCart />} />
                      <Route path="/shop/checkout" element={<ShopCheckout />} />
                      <Route path="/shop/contact" element={<ShopContact />} />
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

                      {/* ===== Shared ===== */}
                      <Route path="/about-us" element={<AboutUs />} />

                      {/* Legacy redirects → proper segment */}
                      <Route path="/products" element={<Navigate to="/shop/products" replace />} />
                      <Route path="/products/:model" element={<Navigate to="/shop/products" replace />} />
                      <Route path="/aroma-library" element={<Navigate to="/shop/aromas" replace />} />
                      <Route path="/solutions" element={<Navigate to="/business/solutions" replace />} />
                      <Route path="/solutions/*" element={<Navigate to="/business/solutions" replace />} />
                      <Route path="/why-scent-marketing" element={<Navigate to="/business/why-scent-marketing" replace />} />
                      <Route path="/contact-quote" element={<Navigate to="/business/contact" replace />} />
                      <Route path="/login" element={<Navigate to="/shop/login" replace />} />

                      {/* Catch-all */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </AppLayout>
              </BrowserRouter>
            </TooltipProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

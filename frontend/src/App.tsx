import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider } from "@clerk/react";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Emergency from "./pages/Emergency";
import Maps from "./pages/Maps";
import Quiz from "./pages/Quiz";
import Games from "./pages/Games";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import ConstructionPopup from "./components/ConstructionPopup";


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient();

const App = () => (
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <ThemeProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <ConstructionPopup />
                <div className="min-h-screen bg-background flex flex-col">
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/*" element={
                      <>
                        <Navbar />
                        <main className="flex-1">
                          <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/emergency" element={<Emergency />} />
                            <Route path="/maps" element={<Maps />} />
                            <Route path="/quiz" element={<Quiz />} />
                            <Route path="/games" element={<Games />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </main>
                        <Footer />
                      </>
                    } />
                  </Routes>
                </div>
              </BrowserRouter>
            </TooltipProvider>
          </ThemeProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;

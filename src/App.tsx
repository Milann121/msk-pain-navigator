
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ExercisePlan from "./pages/ExercisePlan";
import Assessment from "./pages/Assessment";
import MyExercises from "./pages/MyExercises";
import Blog from "./pages/Blog";
import Profile from "./pages/Profile";
import Domov from "./pages/Domov";
import CookieConsent from "./components/CookieConsent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/domov" element={<Domov />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/exercise-plan" element={<ExercisePlan />} />
          <Route path="/my-exercises" element={<MyExercises />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieConsent />
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;

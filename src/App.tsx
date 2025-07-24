
import * as React from 'react';
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
import SpeechHistoryPage from "./pages/SpeechHistoryPage";
import OrebroQuestionnaire from "./pages/OrebroQuestionnaire";
import OrebroResult from "./pages/OrebroResult";
import PsfsQuestionnaire from "./pages/PsfsQuestionnaire";
import Stretching from "./pages/Stretching";
import StretchingProgram from "./pages/StretchingProgram";
import Strength from "./pages/Strength";
import StrengthProgram from "./pages/StrengthProgram";
import Yoga from "./pages/Yoga";
import YogaProgram from "./pages/YogaProgram";
import CookieConsent from "./components/CookieConsent";

// Create QueryClient instance outside of component to prevent recreation
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/domov" element={<Domov />} />
          <Route path="/speech-history" element={<SpeechHistoryPage />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/exercise-plan" element={<ExercisePlan />} />
          <Route path="/my-exercises" element={<MyExercises />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/stretching" element={<Stretching />} />
          <Route path="/stretching/:programId" element={<StretchingProgram />} />
          <Route path="/strength" element={<Strength />} />
          <Route path="/strength/:programId" element={<StrengthProgram />} />
          <Route path="/yoga" element={<Yoga />} />
          <Route path="/yoga/:programId" element={<YogaProgram />} />
          <Route path="/orebro-questionnaire" element={<OrebroQuestionnaire />} />
          <Route path="/orebro-result" element={<OrebroResult />} />
          <Route path="/psfs-questionnaire" element={<PsfsQuestionnaire />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieConsent />
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;

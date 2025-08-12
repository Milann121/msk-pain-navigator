
import * as React from 'react';
import { Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
// Lazy-load non-initial routes to reduce initial JS and improve TTI
const Auth = React.lazy(() => import("./pages/Auth"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const ExercisePlan = React.lazy(() => import("./pages/ExercisePlan"));
const Assessment = React.lazy(() => import("./pages/Assessment"));
const MyExercises = React.lazy(() => import("./pages/MyExercises"));
const Blog = React.lazy(() => import("./pages/Blog"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Domov = React.lazy(() => import("./pages/Domov"));
const SpeechHistoryPage = React.lazy(() => import("./pages/SpeechHistoryPage"));
const OrebroQuestionnaire = React.lazy(() => import("./pages/OrebroQuestionnaire"));
const OrebroResult = React.lazy(() => import("./pages/OrebroResult"));
const PsfsQuestionnaire = React.lazy(() => import("./pages/PsfsQuestionnaire"));
const Stretching = React.lazy(() => import("./pages/Stretching"));
const StretchingProgram = React.lazy(() => import("./pages/StretchingProgram"));
const Strength = React.lazy(() => import("./pages/Strength"));
const StrengthProgram = React.lazy(() => import("./pages/StrengthProgram"));
const Yoga = React.lazy(() => import("./pages/Yoga"));
const YogaProgram = React.lazy(() => import("./pages/YogaProgram"));
const CookieConsent = React.lazy(() => import("./components/CookieConsent"));
const PrototypeNotification = React.lazy(() => import("./components/PrototypeNotification"));
const GaPageViews = React.lazy(() => import("@/components/analytics/GaPageViews"));
const Community = React.lazy(() => import("./pages/Community"));

// Create QueryClient instance outside of component to prevent recreation
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  const [idle, setIdle] = React.useState(false);

  React.useEffect(() => {
    const onIdle = () => setIdle(true);
    // @ts-ignore - requestIdleCallback is not in TS lib by default
    if (typeof window !== 'undefined' && typeof window.requestIdleCallback === 'function') {
      // @ts-ignore
      const id = window.requestIdleCallback(onIdle, { timeout: 2000 });
      return () => {
        // @ts-ignore
        if (typeof window.cancelIdleCallback === 'function') {
          // @ts-ignore
          window.cancelIdleCallback(id);
        }
      };
    } else {
      const timeout = window.setTimeout(onIdle, 1500);
      return () => window.clearTimeout(timeout);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={null}>
            {idle && <PrototypeNotification />}
            <Toaster />
            <Sonner />
            {idle && <GaPageViews />}
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
              <Route path="/community" element={<Community />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            {idle && <CookieConsent />}
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

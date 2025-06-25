
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en/translation.json';
import cs from './locales/cs/translation.json';

// Import Slovak translation files
import skAuth from './locales/sk/auth.json';
import skProfile from './locales/sk/profile.json';
import skHome from './locales/sk/home.json';
import skWelcome from './locales/sk/welcome.json';
import skAssessment from './locales/sk/assessment.json';
import skExercises from './locales/sk/exercises.json';
import skExercisePlan from './locales/sk/exercise-plan.json';
import skExercisePlanPage from './locales/sk/exercise-plan-page.json';
import skBlog from './locales/sk/blog.json';
import skMyExercises from './locales/sk/my-exercises.json';
import skResults from './locales/sk/results.json';
import skCalendar from './locales/sk/calendar.json';
import skMedical from './locales/sk/medical.json';
import skUI from './locales/sk/ui.json';

// Combine Slovak translations
const sk = {
  auth: skAuth,
  profile: skProfile,
  home: skHome,
  welcome: skWelcome,
  assessment: skAssessment,
  exercises: skExercises,
  exercisePlan: skExercisePlan,
  exercisePlanPage: skExercisePlanPage,
  blog: skBlog,
  myExercises: skMyExercises,
  results: skResults,
  calendar: skCalendar,
  ...skMedical, // Spread medical terms at root level
  ...skUI, // Spread UI elements at root level
};

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      sk: { translation: sk },
      cs: { translation: cs }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

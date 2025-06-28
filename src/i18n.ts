
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
import enWelcome from './locales/en/welcome.json';
import enAdvice from './locales/en/advice.json';
import enProfile from './locales/en/profile.json';
import enCommon from './locales/en/common.json';
import enNavigation from './locales/en/navigation.json';
import enAssessment from './locales/en/assessment.json';
import enHome from './locales/en/home.json';
import enExercises from './locales/en/exercises.json';
import enMisc from './locales/en/misc.json';
import enQuestionnaire from './locales/en/questionnaire.json';

// Slovak translations
import skWelcome from './locales/sk/welcome.json';
import skAdvice from './locales/sk/advice.json';
import skProfile from './locales/sk/profile.json';
import skCommon from './locales/sk/common.json';
import skNavigation from './locales/sk/navigation.json';
import skAssessment from './locales/sk/assessment.json';
import skHome from './locales/sk/home.json';
import skExercises from './locales/sk/exercises.json';
import skMisc from './locales/sk/misc.json';
import skQuestionnaire from './locales/sk/questionnaire.json';

// Czech translations
import csWelcome from './locales/cs/welcome.json';
import csAdvice from './locales/cs/advice.json';
import csProfile from './locales/cs/profile.json';
import csCommon from './locales/cs/common.json';
import csNavigation from './locales/cs/navigation.json';
import csAssessment from './locales/cs/assessment.json';
import csHome from './locales/cs/home.json';
import csExercises from './locales/cs/exercises.json';
import csMisc from './locales/cs/misc.json';
import csQuestionnaire from './locales/cs/questionnaire.json';

// Combine all translations
const enTranslations = {
  welcome: enWelcome,
  advice: enAdvice,
  profile: enProfile,
  ...enCommon,
  ...enNavigation,
  assessment: enAssessment,
  home: enHome,
  ...enExercises,
  ...enMisc,
  questionnaire: enQuestionnaire
};

const skTranslations = {
  welcome: skWelcome,
  advice: skAdvice,
  profile: skProfile,
  ...skCommon,
  ...skNavigation,
  assessment: skAssessment,
  home: skHome,
  ...skExercises,
  ...skMisc,
  questionnaire: skQuestionnaire
};

const csTranslations = {
  welcome: csWelcome,
  advice: csAdvice,
  profile: csProfile,
  ...csCommon,
  ...csNavigation,
  assessment: csAssessment,
  home: csHome,
  ...csExercises,
  ...csMisc,
  questionnaire: csQuestionnaire
};

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      sk: { translation: skTranslations },
      cs: { translation: csTranslations }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

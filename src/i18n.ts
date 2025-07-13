
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
import enResults from './locales/en/results.json';
import enBlog from './locales/en/blog.json';
import enOrebro from './locales/en/orebro.json';
import enStretching from './locales/en/stretching.json';
import enStrength from './locales/en/strength.json';
import enYoga from './locales/en/yoga.json';
import enSections from './locales/en/sections.json';
import enStretchingPrograms from './locales/en/stretchingPrograms.json';
import enStrengthPrograms from './locales/en/strengthPrograms.json';
import enYogaPrograms from './locales/en/yogaPrograms.json';
import enBodyParts from './locales/en/bodyParts.json';
import enDifferentials from './locales/en/differentials.json';

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
import skResults from './locales/sk/results.json';
import skBlog from './locales/sk/blog.json';
import skOrebro from './locales/sk/orebro.json';
import skStretching from './locales/sk/stretching.json';
import skStrength from './locales/sk/strength.json';
import skYoga from './locales/sk/yoga.json';
import skSections from './locales/sk/sections.json';
import skStretchingPrograms from './locales/sk/stretchingPrograms.json';
import skStrengthPrograms from './locales/sk/strengthPrograms.json';
import skYogaPrograms from './locales/sk/yogaPrograms.json';
import skBodyParts from './locales/sk/bodyParts.json';
import skDifferentials from './locales/sk/differentials.json';

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
import csResults from './locales/cs/results.json';
import csBlog from './locales/cs/blog.json';
import csOrebro from './locales/cs/orebro.json';
import csStretching from './locales/cs/stretching.json';
import csStrength from './locales/cs/strength.json';
import csYoga from './locales/cs/yoga.json';
import csSections from './locales/cs/sections.json';
import csStretchingPrograms from './locales/cs/stretchingPrograms.json';
import csStrengthPrograms from './locales/cs/strengthPrograms.json';
import csYogaPrograms from './locales/cs/yogaPrograms.json';
import csBodyParts from './locales/cs/bodyParts.json';
import csDifferentials from './locales/cs/differentials.json';

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
  exercises: {
    ...enCommon.exercises,
    ...enExercises
  },
  misc: enMisc,
  questionnaire: enQuestionnaire,
  results: enResults,
  blog: enBlog,
  orebro: enOrebro,
  stretching: enStretching,
  strength: enStrength,
  yoga: enYoga,
  sections: enSections,
  stretchingPrograms: enStretchingPrograms,
  strengthPrograms: enStrengthPrograms,
  yogaPrograms: enYogaPrograms,
  bodyParts: enBodyParts,
  differentials: enDifferentials
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
  exercises: {
    ...skCommon.exercises,
    ...skExercises
  },
  misc: skMisc,
  questionnaire: skQuestionnaire,
  results: skResults,
  blog: skBlog,
  orebro: skOrebro,
  stretching: skStretching,
  strength: skStrength,
  yoga: skYoga,
  sections: skSections,
  stretchingPrograms: skStretchingPrograms,
  strengthPrograms: skStrengthPrograms,
  yogaPrograms: skYogaPrograms,
  bodyParts: skBodyParts,
  differentials: skDifferentials
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
  exercises: {
    ...csCommon.exercises,
    ...csExercises
  },
  misc: csMisc,
  questionnaire: csQuestionnaire,
  results: csResults,
  blog: csBlog,
  orebro: csOrebro,
  stretching: csStretching,
  strength: csStrength,
  yoga: csYoga,
  sections: csSections,
  stretchingPrograms: csStretchingPrograms,
  strengthPrograms: csStrengthPrograms,
  yogaPrograms: csYogaPrograms,
  bodyParts: csBodyParts,
  differentials: csDifferentials
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

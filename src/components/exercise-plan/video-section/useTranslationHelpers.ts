
import { useTranslation } from 'react-i18next';

export const useTranslationHelpers = () => {
  const { t } = useTranslation();

  const getTranslatedText = (text: string) => {
    if (!text) return '';
    
    // If it's a translation key, translate it
    if (text.startsWith('exercises.')) {
      const translated = t(text);
      // If translation returns the same key, it means translation wasn't found
      return translated === text ? text : translated;
    }
    
    return text;
  };

  return { getTranslatedText };
};

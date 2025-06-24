import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <div className="space-x-2 mb-4">
      <button onClick={() => i18n.changeLanguage('sk')}>SK</button>
      <button onClick={() => i18n.changeLanguage('cs')}>CZ</button>
      <button onClick={() => i18n.changeLanguage('en')}>EN</button>
    </div>
  );
};

export default LanguageSwitcher;

import { useTranslation } from 'react-i18next';

interface LastUsedIndicatorProps {
  className?: string;
}

const LastUsedIndicator = ({ className = '' }: LastUsedIndicatorProps) => {
  const { t } = useTranslation();

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full border border-green-200 shadow-sm mb-2 ${className}`}>
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
      {t('auth.lastUsed')}
    </span>
  );
};

export default LastUsedIndicator;
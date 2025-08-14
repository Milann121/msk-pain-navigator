import { useTranslation } from 'react-i18next';

interface LastUsedIndicatorProps {
  className?: string;
}

const LastUsedIndicator = ({ className = '' }: LastUsedIndicatorProps) => {
  const { t } = useTranslation();

  return (
    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full ${className}`}>
      {t('auth.lastUsed')}
    </span>
  );
};

export default LastUsedIndicator;
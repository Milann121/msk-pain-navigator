import { useTranslation } from 'react-i18next';

interface LastUsedIndicatorProps {
  className?: string;
}

const LastUsedIndicator = ({ className = '' }: LastUsedIndicatorProps) => {
  const { t } = useTranslation();

  return (
    <div className={`flex items-center gap-1 text-xs text-muted-foreground mb-2 ${className}`}>
      <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full"></span>
      {t('auth.lastUsed')}
    </div>
  );
};

export default LastUsedIndicator;
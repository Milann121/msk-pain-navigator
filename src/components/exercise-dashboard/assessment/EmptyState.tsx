
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export const EmptyState = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  return (
    <div className="text-center py-8">
      <p className="text-gray-500 mb-4">{t('emptyState.noAssessments')}</p>
      <Button onClick={() => navigate('/assessment')}>
        {t('emptyState.createNew')}
      </Button>
    </div>
  );
};

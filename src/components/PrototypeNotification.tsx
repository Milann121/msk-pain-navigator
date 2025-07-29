import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

const PrototypeNotification = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-blue-600 text-white py-2 px-3 md:px-6 flex justify-center">
      <Button 
        variant="outline" 
        className="bg-blue-700 text-white border-blue-500 hover:bg-blue-800 animate-pulse px-4 py-1 text-sm"
      >
        {t('prototype.message')}
      </Button>
    </div>
  );
};

export default PrototypeNotification;
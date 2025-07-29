import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

const PrototypeNotification = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white text-blue-600 py-2 px-3 md:px-6 flex justify-center border-b border-blue-200">
      <Button 
        variant="outline" 
        className="bg-blue-600 text-white border-blue-500 hover:bg-blue-700 animate-pulse px-4 py-1 text-sm uppercase font-medium"
      >
        {t('prototype.message')}
      </Button>
    </div>
  );
};

export default PrototypeNotification;
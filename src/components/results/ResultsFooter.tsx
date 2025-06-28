
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ResultsFooterProps {
  onRestart: () => void;
  userLoggedIn: boolean;
}

const ResultsFooter = ({ onRestart, userLoggedIn }: ResultsFooterProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        onClick={onRestart} 
        variant="outline" 
        className="flex-1"
      >
        {t('results.footer.startNew')}
      </Button>
      {userLoggedIn && (
        <Button 
          onClick={() => navigate('/my-exercises')} 
          variant="secondary"
          className="flex-1"
        >
          {t('results.footer.myExercises')}
        </Button>
      )}
    </div>
  );
};

export default ResultsFooter;

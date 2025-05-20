
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ResultsFooterProps {
  onRestart: () => void;
  userLoggedIn: boolean;
}

const ResultsFooter = ({ onRestart, userLoggedIn }: ResultsFooterProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        onClick={onRestart} 
        variant="outline" 
        className="flex-1"
      >
        Začať nové hodnotenie
      </Button>
      {userLoggedIn && (
        <Button 
          onClick={() => navigate('/my-exercises')} 
          variant="secondary"
          className="flex-1"
        >
          Moje cviky
        </Button>
      )}
    </div>
  );
};

export default ResultsFooter;

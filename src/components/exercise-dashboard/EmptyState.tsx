
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const EmptyState = () => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-8">
      <p className="text-gray-500 mb-4">Zatiaľ nemáte žiadne uložené hodnotenia.</p>
      <Button onClick={() => navigate('/assessment')}>
        Vytvoriť nové hodnotenie
      </Button>
    </div>
  );
};

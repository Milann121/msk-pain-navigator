import React from 'react';
import { Button } from '@/components/ui/button';
import { Shuffle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SwapExerciseButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const SwapExerciseButton: React.FC<SwapExerciseButtonProps> = ({
  onClick,
  disabled = false,
  className = ""
}) => {
  const { t } = useTranslation();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 ${className}`}
    >
      <Shuffle className="h-4 w-4" />
      {t('exerciseSwap.swapButton')}
    </Button>
  );
};

export default SwapExerciseButton;
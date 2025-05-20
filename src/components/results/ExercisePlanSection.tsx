
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ExercisePlanSectionProps {
  mechanismType: string;
  differentialType: string;
  painArea: string;
  assessmentId?: string | null;
}

const ExercisePlanSection = ({ 
  mechanismType, 
  differentialType, 
  painArea,
  assessmentId 
}: ExercisePlanSectionProps) => {
  const navigate = useNavigate();

  const handleExerciseClick = () => {
    navigate('/exercise-plan', { 
      state: { 
        mechanism: mechanismType,
        differential: differentialType,
        painArea: painArea,
        assessmentId
      } 
    });
  };

  return (
    <div className="mt-8 p-4 border border-blue-200 rounded-lg">
      <h3 className="font-semibold text-blue-700 mb-2">Váš personalizovaný cvičebný plán</h3>
      <p className="mb-4">
        Na základe vášho hodnotenia sme pripravili personalizovaný cvičebný program
        špeciálne navrhnutý pre váš stav. Prosím, berte na vedomie, že tento program aj tak nemusí byť pre vás vhodný a v žiadnom prípade nenahrádza návštevu lekára alebo fyzioterapeuta. V prípade akéhokoľvek pocitu diskomfortu alebo zhoršenia stavu, okamžite prestaňte s cvičením!
      </p>
      
      <Button 
        onClick={handleExerciseClick}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        OTVORIŤ CVIČEBNÝ PROGRAM
      </Button>
    </div>
  );
};

export default ExercisePlanSection;

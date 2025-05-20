
import { PainMechanism } from '@/utils/types';
import { getMechanismLabel } from './resultsHelpers';
import { painMechanismDescriptions } from '@/utils/scoreHelpers';

interface MechanismSectionProps {
  primaryMechanism: PainMechanism;
}

const MechanismSection = ({ primaryMechanism }: MechanismSectionProps) => {
  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <h4 className="font-semibold text-blue-800">Primárny mechanizmus bolesti</h4>
      <p className="text-blue-700 font-medium">{getMechanismLabel(primaryMechanism)}</p>
      <p className="text-blue-600 mt-2 text-sm">{painMechanismDescriptions[primaryMechanism]}</p>
    </div>
  );
};

export default MechanismSection;

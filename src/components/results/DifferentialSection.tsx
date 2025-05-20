
import { Differential } from '@/utils/types';
import { formatDifferential } from './resultsHelpers';
import { differentialDescriptions } from '@/utils/scoreHelpers';

interface DifferentialSectionProps {
  primaryDifferential: Differential;
}

const DifferentialSection = ({ primaryDifferential }: DifferentialSectionProps) => {
  return (
    <div className="bg-purple-50 p-4 rounded-lg">
      <h4 className="font-semibold text-purple-800">Diferenciálne hodnotenie</h4>
      <p className="text-purple-700 font-medium">{formatDifferential(primaryDifferential)}</p>
      <p className="text-purple-600 mt-2 text-sm">{differentialDescriptions[primaryDifferential]}</p>
    </div>
  );
};

export default DifferentialSection;

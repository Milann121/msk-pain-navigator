
import { SINGroup } from '@/utils/types';
import { getSINLabel } from './resultsHelpers';
import { sinGroupDescriptions } from '@/utils/scoreHelpers';

interface SINSectionProps {
  sinGroup: SINGroup;
}

const SINSection = ({ sinGroup }: SINSectionProps) => {
  return (
    <div className="bg-green-50 p-4 rounded-lg">
      <h4 className="font-semibold text-green-800">Úroveň citlivosti na bolesť</h4>
      <p className="text-green-700 font-medium">{getSINLabel(sinGroup)}</p>
      <p className="text-green-600 mt-2 text-sm">{sinGroupDescriptions[sinGroup]}</p>
    </div>
  );
};

export default SINSection;

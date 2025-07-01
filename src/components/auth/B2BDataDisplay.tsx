
import { Button } from '@/components/ui/button';

interface B2BDataDisplayProps {
  employerName: string;
  employeeId: string;
  onClear: () => void;
}

const B2BDataDisplay = ({ employerName, employeeId, onClear }: B2BDataDisplayProps) => {
  if (!employerName && !employeeId) return null;

  return (
    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
      <div className="flex justify-between items-start">
        <div className="text-sm">
          <p><strong>Zamestnávateľ:</strong> {employerName}</p>
          <p><strong>ID zamestnanca:</strong> {employeeId}</p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-blue-600 hover:text-blue-800"
        >
          Vymazať
        </Button>
      </div>
    </div>
  );
};

export default B2BDataDisplay;

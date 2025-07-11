import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GeneralProgramExpandedViewProps {
  hasGeneralProgram: boolean;
  exerciseCount: number;
  assessments: any[];
  onCollapse: () => void;
}

export const GeneralProgramExpandedView = ({
  hasGeneralProgram,
  exerciseCount,
  assessments,
  onCollapse,
}: GeneralProgramExpandedViewProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleShowGeneral = () => {
    navigate('/exercise-plan', {
      state: {
        showGeneral: true,
        assessments: assessments
      }
    });
  };

  return (
    <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 h-full">
      <CardContent className="pt-6 h-full flex flex-col">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-gray-900 text-2xl">
                {t('exercises.generalProgram.title')}
              </h3>
              <button onClick={onCollapse} className="ml-auto text-gray-500 hover:text-gray-700">
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              {hasGeneralProgram ? t('exercises.generalProgram.description') : t('exercises.generalProgram.noDataDescription')}
            </p>

            {hasGeneralProgram && (
              <>
                <p className="text-sm text-blue-600 mb-4">
                  {exerciseCount} {t('home.generalProgram.exerciseCount')}
                </p>
                
                <Button onClick={handleShowGeneral} className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                  <PlayCircle className="h-4 w-4 mr-2" />
                  {t('home.generalProgram.view')}
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
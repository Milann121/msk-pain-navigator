import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

interface GeneralProgramCollapsedViewProps {
  onExpand: () => void;
}

export const GeneralProgramCollapsedView = ({
  onExpand,
}: GeneralProgramCollapsedViewProps) => {
  const { t } = useTranslation();

  return (
    <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 h-[120px]">
      <CardContent className="pt-4 pb-4 h-full flex items-center">
        <div className="flex items-center gap-4 cursor-pointer" onClick={onExpand}>
          <div className="flex-shrink-0">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 my-[10px] text-xl">
              {t('exercises.generalProgram.title')}
            </h3>
          </div>
          
          <ChevronRight className="h-5 w-5 text-gray-500 my-[10px]" />
        </div>
      </CardContent>
    </Card>
  );
};
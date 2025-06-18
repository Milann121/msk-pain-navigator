
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface GeneralProgramBannerProps {
  showBanner: boolean;
}

export const GeneralProgramBanner: React.FC<GeneralProgramBannerProps> = ({ showBanner }) => {
  if (!showBanner) return null;

  return (
    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2">
      <AlertCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
      <p className="text-sm text-blue-800">
        Váš všeobecný program generujeme. Keďže ste rýchlo pridali a vymazali nové programy, môže to chvíľu trvať.
      </p>
    </div>
  );
};

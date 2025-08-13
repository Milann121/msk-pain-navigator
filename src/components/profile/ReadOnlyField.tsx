
import React from 'react';

interface ReadOnlyFieldProps {
  label: string;
  value: string;
}

export const ReadOnlyField = ({ label, value }: ReadOnlyFieldProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-xs md:text-sm font-medium text-gray-700">{label}</label>
      <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
        {value || '-'}
      </div>
    </div>
  );
};

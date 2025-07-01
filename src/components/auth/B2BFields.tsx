
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

interface B2BFieldsProps {
  employerName: string;
  employeeId: string;
  isEmployeeVerified: boolean;
  isVerifyingEmployee: boolean;
  employers: string[];
  showEmployerDropdown: boolean;
  onEmployerNameChange: (value: string) => void;
  onEmployeeIdChange: (value: string) => void;
  onVerifyEmployee: () => void;
  onEmployerSelect: (employer: string) => void;
  onDropdownClose: () => void;
}

const B2BFields = ({
  employerName,
  employeeId,
  isEmployeeVerified,
  isVerifyingEmployee,
  employers,
  showEmployerDropdown,
  onEmployerNameChange,
  onEmployeeIdChange,
  onVerifyEmployee,
  onEmployerSelect,
  onDropdownClose
}: B2BFieldsProps) => {
  const { t } = useTranslation();

  const handleVerifyClick = () => {
    console.log('=== B2BFields: Verify button clicked ===');
    console.log('Current state:', { 
      employerName, 
      employeeId, 
      isEmployeeVerified, 
      isVerifyingEmployee 
    });
    
    if (!employerName.trim() || !employeeId.trim()) {
      console.log('Missing required fields for verification');
      return;
    }
    
    console.log('Calling onVerifyEmployee with data:', { employerName, employeeId });
    onVerifyEmployee();
  };

  return (
    <>
      <div className="space-y-1 relative">
        <Label htmlFor="employerName">{t('auth.employerName')} *</Label>
        <div className="relative">
          <Input
            id="employerName"
            type="text"
            value={employerName}
            onChange={(e) => onEmployerNameChange(e.target.value)}
            placeholder={t('auth.employerNamePlaceholder')}
            required
            className={isEmployeeVerified ? "border-green-500 bg-green-50" : ""}
            disabled={isEmployeeVerified}
          />
          {showEmployerDropdown && employers.length > 0 && !isEmployeeVerified && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1">
              <Command className="border rounded-md shadow-lg bg-white">
                <CommandList className="max-h-40">
                  <CommandGroup>
                    {employers.map((employer, index) => (
                      <CommandItem
                        key={index}
                        onSelect={() => {
                          onEmployerSelect(employer);
                          onDropdownClose();
                        }}
                        className="cursor-pointer"
                      >
                        {employer}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="employeeId">{t('auth.employeeId')} *</Label>
        <div className="flex gap-2">
          <Input
            id="employeeId"
            type="text"
            value={employeeId}
            onChange={(e) => onEmployeeIdChange(e.target.value)}
            placeholder={t('auth.employeeIdPlaceholder')}
            required
            className={isEmployeeVerified ? "border-green-500 bg-green-50" : ""}
            disabled={isEmployeeVerified}
          />
          <Button
            type="button"
            variant={isEmployeeVerified ? "default" : "outline"}
            onClick={handleVerifyClick}
            disabled={!employerName.trim() || !employeeId.trim() || isVerifyingEmployee}
            className={`whitespace-nowrap ${isEmployeeVerified ? 'bg-green-600 hover:bg-green-700' : ''}`}
          >
            {isVerifyingEmployee ? t('auth.verifying') : isEmployeeVerified ? '✓ Overené' : t('auth.verify')}
          </Button>
        </div>
        {isEmployeeVerified && (
          <p className="text-sm text-green-600 font-medium">
            ✓ {t('auth.dataVerified')}
          </p>
        )}
      </div>
    </>
  );
};

export default B2BFields;

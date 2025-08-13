
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
  firstName: string;
  lastName: string;
  employerName: string;
  employeeId: string;
  isEmployeeVerified: boolean;
  isVerifyingEmployee: boolean;
  employers: string[];
  showEmployerDropdown: boolean;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmployerNameChange: (value: string) => void;
  onEmployeeIdChange: (value: string) => void;
  onVerifyEmployee: () => void;
  onEmployerSelect: (employer: string) => void;
  onDropdownClose: () => void;
}

const B2BFields = ({
  firstName,
  lastName,
  employerName,
  employeeId,
  isEmployeeVerified,
  isVerifyingEmployee,
  employers,
  showEmployerDropdown,
  onFirstNameChange,
  onLastNameChange,
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
      firstName,
      lastName,
      employerName, 
      employeeId, 
      isEmployeeVerified, 
      isVerifyingEmployee 
    });
    
    if (!firstName.trim() || !lastName.trim() || !employerName.trim() || !employeeId.trim()) {
      console.log('Missing required fields for verification');
      return;
    }
    
    console.log('Calling onVerifyEmployee with data:', { firstName, lastName, employerName, employeeId });
    onVerifyEmployee();
  };

  return (
    <div className="space-y-4">
      {/* First Name Field */}
      <div className="space-y-1">
        <Label htmlFor="firstName">{t('auth.firstName')} *</Label>
        <div className="relative">
          <Input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => onFirstNameChange(e.target.value)}
            placeholder="napr. Peter"
            required
            className={isEmployeeVerified ? "border-green-500 bg-green-50" : ""}
            disabled={isEmployeeVerified}
          />
          {isEmployeeVerified && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span className="text-green-600 text-sm font-semibold">✓</span>
            </div>
          )}
        </div>
      </div>

      {/* Last Name Field */}
      <div className="space-y-1">
        <Label htmlFor="lastName">{t('auth.lastName')} *</Label>
        <div className="relative">
          <Input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => onLastNameChange(e.target.value)}
            placeholder="napr. Novák"
            required
            className={isEmployeeVerified ? "border-green-500 bg-green-50" : ""}
            disabled={isEmployeeVerified}
          />
          {isEmployeeVerified && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span className="text-green-600 text-sm font-semibold">✓</span>
            </div>
          )}
        </div>
      </div>

      {/* Employer Name Field */}
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
          {isEmployeeVerified && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span className="text-green-600 text-sm font-semibold">✓</span>
            </div>
          )}
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

      {/* Employee ID Field */}
      <div className="space-y-1">
        <Label htmlFor="employeeId">{t('auth.employeeId')} *</Label>
        <div className="relative">
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
          {isEmployeeVerified && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span className="text-green-600 text-sm font-semibold">✓</span>
            </div>
          )}
        </div>
      </div>

      {/* Verify Button */}
      <div className="pt-2">
        <Button
          type="button"
          variant={isEmployeeVerified ? "default" : "outline"}
          onClick={handleVerifyClick}
          disabled={!firstName.trim() || !lastName.trim() || !employerName.trim() || !employeeId.trim() || isVerifyingEmployee}
          className={`w-full ${isEmployeeVerified ? 'bg-green-600 hover:bg-green-700' : ''}`}
        >
          {isVerifyingEmployee ? t('auth.verifying') : isEmployeeVerified ? '✓ Overené' : t('auth.verify')}
        </Button>
      </div>

      {/* Success Message */}
      {isEmployeeVerified && (
        <div className="text-center p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-700 font-medium">
            ✓ {t('auth.dataVerified')}
          </p>
        </div>
      )}
    </div>
  );
};

export default B2BFields;

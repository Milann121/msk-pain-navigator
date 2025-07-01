
import { useState } from 'react';
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
  return (
    <>
      <div className="space-y-1 relative">
        <Label htmlFor="employerName">Názov zamestnávateľa *</Label>
        <div className="relative">
          <Input
            id="employerName"
            type="text"
            value={employerName}
            onChange={(e) => onEmployerNameChange(e.target.value)}
            placeholder="Začnite písať názov zamestnávateľa..."
            required
            className={isEmployeeVerified ? "border-green-500" : ""}
          />
          {showEmployerDropdown && employers.length > 0 && (
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
        <Label htmlFor="employeeId">ID zamestnanca *</Label>
        <div className="flex gap-2">
          <Input
            id="employeeId"
            type="text"
            value={employeeId}
            onChange={(e) => onEmployeeIdChange(e.target.value)}
            placeholder="Zadajte vaše ID zamestnanca"
            required
            className={isEmployeeVerified ? "border-green-500" : ""}
          />
          <Button
            type="button"
            variant="outline"
            onClick={onVerifyEmployee}
            disabled={!employerName || !employeeId || isVerifyingEmployee}
            className="whitespace-nowrap"
          >
            {isVerifyingEmployee ? "Overujem..." : "Overiť"}
          </Button>
        </div>
        {isEmployeeVerified && (
          <p className="text-sm text-green-600">✓ Údaje overené</p>
        )}
      </div>
    </>
  );
};

export default B2BFields;

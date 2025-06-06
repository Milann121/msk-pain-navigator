
import React from 'react';

interface UserGreetingProps {
  firstName: string;
}

export const UserGreeting = ({ firstName }: UserGreetingProps) => {
  return (
    <div className="space-y-2">
      <div className="text-3xl font-bold">
        Ahoj {firstName ? `${firstName},` : ''}
      </div>
      <div className="text-xl font-medium mb-4">
        ako sa dnes cítiš?
      </div>
    </div>
  );
};

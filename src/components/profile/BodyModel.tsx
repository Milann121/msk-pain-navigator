
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const BodyModel = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Model tela</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div className="h-64 w-48 relative">
          {/* Placeholder for body model */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-24 h-24 text-gray-400"
            >
              <path d="M12 2a3 3 0 0 0-3 3v1h6V5a3 3 0 0 0-3-3Z" />
              <path d="M9 5v1h6V5" />
              <path d="M8 6h8a2 2 0 0 1 2 2v3H6V8a2 2 0 0 1 2-2Z" />
              <path d="M16 11v2c0 1.1-.9 2-2 2H9.5a2.5 2.5 0 0 0 0 5H12" />
              <path d="M17.7 19.9a6 6 0 1 0-11.4 0" />
              <path d="m9.8 17.3-.6-6" />
              <path d="m14.8 17.3.6-6" />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

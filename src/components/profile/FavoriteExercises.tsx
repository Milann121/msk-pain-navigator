
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const FavoriteExercises = () => {
  // Placeholder data - in a real app, this would come from your database
  const favoriteExercises = [
    // Empty for now
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Obľúbené cviky</CardTitle>
      </CardHeader>
      <CardContent>
        {favoriteExercises.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteExercises.map((exercise, index) => (
              <div key={index} className="border rounded-md p-4">
                {/* Exercise content will go here */}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Zatiaľ nemáte žiadne obľúbené cviky. 
              Môžete si ich pridať označením hviezdy pri cvikoch v pláne cvičení.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

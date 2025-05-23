
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SavedBlogs = () => {
  // Placeholder data - in a real app, this would come from your database
  const savedBlogs = [
    // Empty for now
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Uložené články</CardTitle>
      </CardHeader>
      <CardContent>
        {savedBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedBlogs.map((blog, index) => (
              <div key={index} className="border rounded-md p-4">
                {/* Blog content will go here */}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Zatiaľ nemáte žiadne uložené články. 
              Články si môžete uložiť v sekcii Blog.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

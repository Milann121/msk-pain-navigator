
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ExerciseVideoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  exercise: {
    id: string;
    exercise_title: string;
    video_id: string;
    description?: string;
  } | null;
}

export const ExerciseVideoDialog = ({ isOpen, onClose, exercise }: ExerciseVideoDialogProps) => {
  if (!exercise) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold mb-4">
            {exercise.exercise_title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Video Player */}
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${exercise.video_id}`}
              title={exercise.exercise_title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
          
          {/* Description */}
          {exercise.description && (
            <div className="mt-4">
              <h4 className="font-medium text-gray-800 mb-2">Popis cviku:</h4>
              <p className="text-gray-600 leading-relaxed border-l-2 border-gray-200 pl-4">
                {exercise.description.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

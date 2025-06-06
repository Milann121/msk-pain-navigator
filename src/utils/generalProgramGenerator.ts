
import { Exercise } from '@/types/exercise';
import exercisesByDifferential from '@/data/exercises';

interface VideoWithSource {
  videoId: string;
  title?: string;
  description?: string;
  importance?: 1 | 2 | 3;
  sourceProgram?: string;
}

export const generateGeneralProgram = (
  mechanism: string,
  painArea: string,
  userAssessments: any[]
): Exercise[] => {
  // Only create general program if user has multiple assessments
  if (userAssessments.length <= 1) {
    return [];
  }

  // Collect all available exercises from user's programs
  const allVideos: VideoWithSource[] = [];
  
  userAssessments.forEach(assessment => {
    const specificKey = `${assessment.primary_mechanism}-${assessment.primary_differential}-${assessment.pain_area}`;
    const defaultKey = `${assessment.primary_mechanism}-default-${assessment.pain_area}`;
    
    const exercises = exercisesByDifferential[specificKey] || 
                     exercisesByDifferential[defaultKey] || [];
    
    exercises.forEach(exercise => {
      exercise.videos.forEach(video => {
        if (video.importance) {
          allVideos.push({
            ...video,
            sourceProgram: exercise.title
          });
        }
      });
    });
  });

  // Filter unique videos by videoId to avoid duplicates
  const uniqueVideos = allVideos.filter((video, index, self) => 
    index === self.findIndex(v => v.videoId === video.videoId)
  );

  // Separate by importance
  const primaryVideos = uniqueVideos.filter(v => v.importance === 1);
  const secondaryVideos = uniqueVideos.filter(v => v.importance === 2);
  const tertiaryVideos = uniqueVideos.filter(v => v.importance === 3);

  // Select videos based on 3:2:1 ratio
  const selectedVideos: VideoWithSource[] = [];
  
  // Add 3 primary exercises (or all if less than 3)
  selectedVideos.push(...primaryVideos.slice(0, 3));
  
  // Add 2 secondary exercises (or all if less than 2)
  selectedVideos.push(...secondaryVideos.slice(0, 2));
  
  // Add 1 tertiary exercise (or all if less than 1)
  selectedVideos.push(...tertiaryVideos.slice(0, 1));

  // If we don't have enough exercises, fill from remaining
  const targetTotal = 6;
  if (selectedVideos.length < targetTotal) {
    const remaining = uniqueVideos.filter(v => 
      !selectedVideos.some(sv => sv.videoId === v.videoId)
    );
    selectedVideos.push(...remaining.slice(0, targetTotal - selectedVideos.length));
  }

  // Create the general program exercise
  const generalProgram: Exercise = {
    title: 'Všeobecný program',
    description: 'Personalizovaný program vytvorený na základe vašich hodnotení, obsahujúci najdôležitejšie cvičenia z rôznych programov.',
    videos: selectedVideos.map(video => ({
      videoId: video.videoId,
      title: video.title,
      description: video.description ? 
        `${video.description}\n\n➜ ZDROJ: ${video.sourceProgram}` : 
        `➜ ZDROJ: ${video.sourceProgram}`,
      importance: video.importance
    }))
  };

  return selectedVideos.length > 0 ? [generalProgram] : [];
};

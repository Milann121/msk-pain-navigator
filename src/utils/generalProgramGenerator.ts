
import { Exercise } from '@/types/exercise';
import exercisesByDifferential from '@/data/exercisePrograms';

interface VideoWithSource {
  videoId: string;
  title?: string;
  description?: string;
  importance?: 1 | 2 | 3;
  sourceProgram?: string;
  mainGroup?: Array<'mobility' | 'stability' | 'pain-relief' | 'neuro-mobs'>;
  bodyPart?: Array<'neck' | 'middle-back' | 'lower-back'>;
}

export const generateGeneralProgram = (
  mechanism: string,
  painArea: string,
  userAssessments: any[]
): Exercise[] => {
  console.log('generateGeneralProgram called with:', { mechanism, painArea, assessmentsCount: userAssessments.length });
  
  // Only create general program if user has multiple assessments
  if (userAssessments.length <= 1) {
    console.log('Not enough assessments for general program:', userAssessments.length);
    return [];
  }

  // Filter only active assessments (those without program_ended_at)
  const activeAssessments = userAssessments.filter(assessment => !assessment.program_ended_at);
  console.log('Active assessments:', activeAssessments.length, activeAssessments);
  
  // Need at least 2 active assessments for general program
  if (activeAssessments.length <= 1) {
    console.log('Not enough active assessments for general program:', activeAssessments.length);
    return [];
  }

  // Collect all available exercises from user's active programs
  const allVideos: VideoWithSource[] = [];
  
  activeAssessments.forEach(assessment => {
    const specificKey = `${assessment.primary_mechanism}-${assessment.primary_differential}-${assessment.pain_area}`;
    const defaultKey = `${assessment.primary_mechanism}-default-${assessment.pain_area}`;
    
    console.log('Looking for exercises with keys:', { specificKey, defaultKey });
    
    const exercises = exercisesByDifferential[specificKey] || 
                     exercisesByDifferential[defaultKey] || [];
    
    console.log('Found exercises for assessment:', exercises.length);
    
    exercises.forEach(exercise => {
      exercise.videos.forEach(video => {
        allVideos.push({
          ...video,
          sourceProgram: exercise.title,
          mainGroup: video.mainGroup ?? [],
          bodyPart: video.bodyPart ?? [],
        });
      });
    });
  });

  console.log('Total videos collected:', allVideos.length);

  // Filter unique videos by videoId to avoid duplicates
  const uniqueVideos = allVideos.filter((video, index, self) => 
    index === self.findIndex(v => v.videoId === video.videoId)
  );

  console.log('Unique videos after filtering:', uniqueVideos.length);

  if (uniqueVideos.length === 0) {
    console.log('No videos found for general program');
    return [];
  }

  // Separate by importance - treat videos without importance as importance 2
  const primaryVideos = uniqueVideos.filter(v => v.importance === 1);
  const secondaryVideos = uniqueVideos.filter(v => v.importance === 2 || !v.importance);
  const tertiaryVideos = uniqueVideos.filter(v => v.importance === 3);

  console.log('Videos by importance:', { 
    primary: primaryVideos.length, 
    secondary: secondaryVideos.length, 
    tertiary: tertiaryVideos.length 
  });

  // Select videos based on 3:2:1 ratio, but take what's available
  const selectedVideos: VideoWithSource[] = [];
  
  // Add up to 3 primary exercises
  selectedVideos.push(...primaryVideos.slice(0, 3));
  
  // Add up to 2 secondary exercises
  selectedVideos.push(...secondaryVideos.slice(0, 2));
  
  // Add up to 1 tertiary exercise
  selectedVideos.push(...tertiaryVideos.slice(0, 1));

  // If we don't have enough exercises, fill from remaining
  const targetTotal = 6;
  if (selectedVideos.length < targetTotal) {
    const remaining = uniqueVideos.filter(v => 
      !selectedVideos.some(sv => sv.videoId === v.videoId)
    );
    selectedVideos.push(...remaining.slice(0, targetTotal - selectedVideos.length));
  }

  console.log('Selected videos for general program:', selectedVideos.length);

  // Shuffle the selected videos for variety
  const shuffledVideos = selectedVideos.sort(() => Math.random() - 0.5);

  // Create the general program exercise
  const generalProgram: Exercise = {
    title: 'Všeobecný program',
    description: 'Personalizovaný program s najdôležitejšími cvičeniami z vašich aktívnych programov.',
    videos: shuffledVideos.map(video => ({
      videoId: video.videoId,
      title: video.title,
      description: video.description,
      importance: video.importance || 2, // Default to importance 2 if not set
      mainGroup: video.mainGroup ?? [],
      bodyPart: video.bodyPart ?? [],
    }))
  };

  console.log('Generated general program with', generalProgram.videos.length, 'exercises');
  return shuffledVideos.length > 0 ? [generalProgram] : [];
};

// Helper function to detect if user has been making quick changes
export const detectQuickChanges = (assessments: any[]): boolean => {
  if (assessments.length < 1) return false;
  
  const now = new Date();
  const recentTimeWindow = 10 * 60 * 1000; // 10 minutes
  
  // Count recent activities (both created and ended programs)
  const recentActivities = assessments.filter(assessment => {
    const createdAt = new Date(assessment.timestamp);
    const timeSinceCreated = now.getTime() - createdAt.getTime();
    
    // Check if created recently
    if (timeSinceCreated < recentTimeWindow) {
      return true;
    }
    
    // Check if ended recently (program_ended_at exists and is recent)
    if (assessment.program_ended_at) {
      const endedAt = new Date(assessment.program_ended_at);
      const timeSinceEnded = now.getTime() - endedAt.getTime();
      return timeSinceEnded < recentTimeWindow;
    }
    
    return false;
  });
  
  // If more than 1 recent activity (create/delete) in last 10 minutes, show banner
  return recentActivities.length > 1;
};


export interface Exercise {
  title: string;
  description: string;
  videos: Array<{
    videoId: string;
    title?: string;
    description?: string;
  }>;
}

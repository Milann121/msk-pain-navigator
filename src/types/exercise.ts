
export interface Exercise {
  title: string;
  description: string;
  mainGroup: Array<'mobility' | 'stability' | 'pain relief'>;
  videos: Array<{
    videoId: string;
    title?: string;
    description?: string;
    importance?: 1 | 2 | 3; // 1 = primary, 2 = secondary, 3 = tertiary
  }>;
}


export interface Exercise {
  title: string;
  description: string;
  videos: Array<{
    videoId: string;
    title?: string;
    description?: string;
    importance?: 1 | 2 | 3; // 1 = primary, 2 = secondary, 3 = tertiary
    mainGroup: Array<'mobility' | 'stability' | 'pain relief'>;
  }>;
}

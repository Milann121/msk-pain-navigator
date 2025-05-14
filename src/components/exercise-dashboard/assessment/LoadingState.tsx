
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingState = () => (
  <div className="space-y-4 py-4">
    <p className="text-center text-muted-foreground pb-2">Načítavanie hodnotení...</p>
    <Skeleton className="h-12 w-full" />
    <Skeleton className="h-12 w-full" />
    <Skeleton className="h-12 w-full" />
  </div>
);

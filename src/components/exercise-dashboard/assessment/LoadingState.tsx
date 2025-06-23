
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

export const LoadingState = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-4 py-4">
      <p className="text-center text-muted-foreground pb-2">{t('loading')}</p>
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
};

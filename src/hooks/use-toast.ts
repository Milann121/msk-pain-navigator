
// Re-export the toast functionality from the UI component
import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast";
import { useToast as useToastOriginal } from "@/components/ui/use-toast";

export type { Toast, ToastActionElement, ToastProps };
export const useToast = useToastOriginal;

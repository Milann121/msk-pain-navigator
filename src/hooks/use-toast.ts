
import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast";
import { useToast as useToastOriginal } from "@/components/ui/use-toast";

export { Toast };
export type { ToastActionElement, ToastProps };
export const useToast = useToastOriginal;

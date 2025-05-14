
import { Toast, ToastActionElement, ToastProps, ToasterToast } from "@/components/ui/toast";
import { useToast as useToastOriginal } from "@/components/ui/use-toast";

export { Toast };
export type { ToastActionElement, ToastProps, ToasterToast };
export const useToast = useToastOriginal;

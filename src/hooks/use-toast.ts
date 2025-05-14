
// Import from the correct location
import { useToast as useToastOriginal } from "@/components/ui/toast-hook";
import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast";

export type { ToastProps, ToastActionElement };
export { Toast };

export const useToast = useToastOriginal;
export const toast = {
  // Create a simple toast function that exposes the API needed by the components
  show: (props: ToastProps & { id?: string }) => {
    const { toast } = useToastOriginal();
    return toast(props);
  }
};

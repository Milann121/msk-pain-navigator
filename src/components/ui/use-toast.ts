
import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast";
import { useToast as useToastHook } from "./toast-hook";

export type { ToastProps, ToastActionElement };
export { Toast };
export const useToast = useToastHook;
export const toast = {
  // Create a simple toast function that exposes the API needed by the components
  show: (props: ToastProps & { id?: string }) => {
    const { useToast: internalUseToast } = useToastHook();
    return internalUseToast.toast(props);
  }
};

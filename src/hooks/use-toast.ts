
// Re-export the toast hook from the UI components
import { useToast as useToastHook } from "@/components/ui/use-toast";
import { type ToasterToast } from '@/components/ui/use-toast';

export { type ToasterToast };

// Re-export the hook as useToaster and useToast aliases
export const useToaster = useToastHook;
export const useToast = useToastHook;

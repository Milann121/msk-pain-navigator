
import { Toast, ToastProps } from "@/components/ui/toast";
import * as React from "react";

export interface ToasterToast extends Omit<ToastProps, "title" | "description"> {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactElement;
  dismiss?: boolean; // Changed from function to boolean
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: string;
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: string;
    };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts],
      };

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action;

      if (toastId) {
        return {
          ...state,
          toasts: state.toasts.map((t) =>
            t.id === toastId ? { ...t, dismiss: true } : t
          ),
        };
      }
      return {
        ...state,
        toasts: state.toasts.map((t) => ({ ...t, dismiss: true })),
      };
    }
    case actionTypes.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

export const useToaster = (defaultToasts: ToasterToast[] = []) => {
  const [state, dispatch] = React.useReducer(reducer, {
    toasts: defaultToasts,
  });

  React.useEffect(() => {
    state.toasts.forEach((toast) => {
      if (toast.dismiss) {
        toast.id && dismissToast(toast.id);
      }
    });
  }, [state.toasts]);

  const toast = React.useCallback(
    (props: Omit<ToasterToast, "id">) => {
      const id = genId();

      const update = (props: Partial<ToasterToast>) =>
        dispatch({
          type: actionTypes.UPDATE_TOAST,
          toast: { ...props, id },
        });
      
      const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id });

      // Create a typed toastObj with the proper structure
      const toastObj: ToasterToast = {
        ...props,
        id,
        dismiss: false, // initialize as a boolean
      };

      dispatch({
        type: actionTypes.ADD_TOAST,
        toast: toastObj,
      });

      return {
        id,
        dismiss,
        update,
      };
    },
    [dispatch]
  );

  const dismissToast = React.useCallback((toastId?: string) => {
    dispatch({ type: actionTypes.DISMISS_TOAST, toastId });
  }, []);

  return {
    toasts: state.toasts,
    toast,
    dismiss: dismissToast,
  };
};

export function useToast() {
  const toaster = useToaster();
  
  return toaster;
}

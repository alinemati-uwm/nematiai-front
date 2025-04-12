import { useCallback, useRef } from "react";

import {
  toast as _toast,
  type Id,
  type ToastOptions,
  type UpdateOptions,
} from "react-toastify";

import Toast, { type ToastProps } from "@/refactor_lib/components/atoms/Toast";
import { TOAST_DEFAULT_CLOSE_DURATION } from "@/refactor_lib/constants/toast";
import toMilliseconds from "@/refactor_lib/utils/toMiliseconds";

// render custom toast
const toast = (toastProps: ToastProps, toastOptions?: ToastOptions) => {
  return _toast(<Toast {...toastProps} />, toastOptions);
};

// update custom toast
toast.update = (
  toastId: Id,
  toastProps: ToastProps,
  toastOptions?: UpdateOptions,
) => {
  return _toast.update(toastId, {
    render: <Toast {...toastProps} />,
    ...toastOptions,
  });
};

interface ToasterProps {
  toastProps: ToastProps;
  toastConfig?: ToastOptions | UpdateOptions;
  disableAutoClose?: boolean;
}

const useToaster = () => {
  const toastIdRef = useRef<Id | null>(null);

  const toasterWithoutUpdate = useCallback(
    (props: Omit<ToasterProps, "disableAutoClose">) => {
      toast(props.toastProps, props.toastConfig as ToastOptions);
    },
    [],
  );

  const toaster = useCallback((props: ToasterProps) => {
    // Check if toastIdRef.current exists and is active
    if (!toastIdRef.current || !_toast.isActive(toastIdRef.current)) {
      // If toast is not active, create a new one
      toastIdRef.current = toast(props.toastProps, {
        ...props.toastConfig,
        autoClose: props.disableAutoClose ? false : undefined,
      } as ToastOptions);
    } else {
      // Otherwise, update the existing toast
      toast.update(
        toastIdRef.current,
        props.toastProps,
        props.toastConfig as UpdateOptions,
      );
    }
  }, []);

  const resetToastId = useCallback(() => {
    toastIdRef.current = null;
  }, []);

  const closeToast = useCallback(() => {
    if (!toastIdRef.current) return;
    _toast.dismiss(toastIdRef.current);
    resetToastId();
  }, [resetToastId]);

  const closeToastAfterTimeout = useCallback(
    ({
      hours = 0,
      minutes = 0,
      seconds = 0,
      useDefaultCloseDuration,
    }: {
      hours?: number;
      minutes?: number;
      seconds?: number;
      useDefaultCloseDuration?: boolean;
    }) => {
      setTimeout(
        () => {
          closeToast();
        },
        useDefaultCloseDuration
          ? TOAST_DEFAULT_CLOSE_DURATION
          : toMilliseconds({ hours, minutes, seconds }),
      );
    },
    [closeToast],
  );

  return {
    toastId: toastIdRef.current,
    closeToast,
    closeToastAfterTimeout,
    toaster,
    toasterWithoutUpdate,
    resetToastId,
  };
};

export default useToaster;

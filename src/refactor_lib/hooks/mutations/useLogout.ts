import { useMutation } from "@tanstack/react-query";

import { APP_ROUTES } from "@/refactor_lib/constants";
import { authAPI } from "@/refactor_lib/services/api/v1";

import useToaster from "../shared/useToaster";

function useLogout() {
  const { toaster } = useToaster();
  return useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      localStorage.clear();
      window.location.href = APP_ROUTES.login;
    },
    onError: () => {
      toaster({
        toastProps: {
          type: "error",
          message: "Unable to log out Please try again later",
        },
      });
    },
  });
}

export default useLogout;

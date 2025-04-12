import { useState } from "react";

import { useMutation } from "@tanstack/react-query";

import { useGetDictionary } from "@/hooks";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";
import userAPI from "@/refactor_lib/services/api/v1/UserAPI";

export const useReferral = () => {
  const [email, setEmail] = useState("");
  const {
    components: {
      user: { panel: dictionary },
      form: { email_validation },
    },
  } = useGetDictionary();
  const {
    mutateAsync: mutateEmailReferral,
    isPending: isPendingEmailReferral,
  } = useMutation({
    mutationFn: userAPI.invite,
  });

  const { toaster } = useToaster();

  const submitEmailReferral = async () => {
    try {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (email && !emailPattern.test(email)) throw Error(email_validation);
      await mutateEmailReferral({ email });
      setEmail("");
      toaster({
        toastProps: {
          type: "success",
          message: dictionary.invite_member_success,
        },
      });
    } catch (error: any) {
      // Error message handling and display using toaster
      const message = error?.response?.data?.detail ?? error;

      toaster({
        toastProps: {
          type: "error",
          message:
            typeof message === "string" ? message : (error as Error).message,
        },
      });
    }
  };

  return {
    setEmail,
    email,
    isPendingEmailReferral,
    submitEmailReferral,
  };
};

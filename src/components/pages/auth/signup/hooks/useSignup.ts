"use client";

import { useState } from "react";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import useErrorToast from "@/hooks/useErrorToast";
import { type workspaceInviteParams } from "@/hooks/useInviteWorkspace";
import { APP_ROUTES } from "@/refactor_lib/constants";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";
import { authAPI } from "@/refactor_lib/services/api/v1";
import workspaceAPI from "@/refactor_lib/services/api/v1/WorkspaceAPI";
import LocalStorageManger from "@/refactor_lib/utils/LocalStorageManager";

export interface FormTypes {
  fullName: string;
  email: string;
  password: string;
  acceptReceiveEmail: boolean;
  acceptPolicy: boolean;
}

/**
 * `useSignup` is a custom React hook for handling user signup.
 * It uses the `react-hook-form` for form handling and validation, and `useState` for local state management.
 * It also uses a custom hook `useErrorToast` to display error messages.
 *
 * @returns An object containing the form methods, the signup handler function,
 * the function to set the email confirmation state, and the email confirmation state.
 */
interface Prop {
  setRedirecting: (bol: boolean) => void;
  setIsPending: (bol: boolean) => void;
}
export function useSignup({ setRedirecting, setIsPending }: Prop) {
  // Use the custom hook `useErrorToast` to get the `showFetchError` function.
  const { showFetchError } = useErrorToast();
  const { toaster } = useToaster();
  const { showError } = useErrorToast();
  const router = useRouter();
  const { lang } = useParams();

  // Use `useState` to manage the state of email confirmation.
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);

  // Use `useForm` from `react-hook-form` to manage the form state and validation.
  const form = useForm<FormTypes>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      acceptPolicy: false,
      acceptReceiveEmail: false,
    },
  });

  const login = () => {
    const { password, email } = form.getValues();
    authAPI
      .login({ email, password })
      .then(res => {
        LocalStorageManger.setUserSession(res.data);
        toaster({
          toastProps: {
            type: "success",
            message: "Confirmed successfully",
          },
        });
        router.push(`/${lang}/${APP_ROUTES.chatApp}`);
      })
      .catch(e => {
        showError(e!.message);
      });
  };

  /**
   * `handleSignup` is an async function that handles the signup process.
   * It takes the form data as an argument, sends a request to the signup API,
   * and updates the email confirmation state based on the response.
   *
   * @param {FormTypes} data - The form data.
   */
  const handleSignup = async (
    data: FormTypes,
    isInviteWorkspace: workspaceInviteParams,
  ) => {
    const { password, email, fullName: username } = data;
    setIsPending(true);

    if (isInviteWorkspace.email && isInviteWorkspace.token) {
      try {
        await workspaceAPI.confirmInviteToWorkspaceWithRegister({
          email,
          password,
          token: isInviteWorkspace.token,
          username,
        });
        login();
      } catch (error: any) {
        setIsPending(false);
        toaster({
          toastProps: {
            type: "error",
            message: error?.response?.data?.detail ?? (error as Error).message,
          },
        });
      }
    } else {
      authAPI
        .register({ username, email, password })
        .then(async res => {
          // If the request is successful, update the email confirmation state to true for showing the email confirmation message.
          LocalStorageManger.setUserSession(res.data);
          setIsPending(false);
          setRedirecting(true);
          setShowEmailConfirmation(true);
        })
        .catch(e => {
          setIsPending(false);
          setRedirecting(false);
          // If the request fails, show an error message.
          showFetchError(e);
        })
        .finally(() => {
          setRedirecting(false);
        });
    }
  };
  const sendAgain = async (email: any) => {
    authAPI
      .sendItAigain(email)
      .then(res => {
        toaster({
          toastProps: {
            type: "success",
            message: "Email resend successfully",
          },
        });
      })
      .catch(e => {
        showError(e.response.data.detail);
      });
  };

  // Return the form methods, the signup handler function,
  // the function to set the email confirmation state, and the email confirmation state.
  return {
    form,
    handleSignup,
    sendAgain,
    setShowEmailConfirmation,
    showEmailConfirmation,
  };
}

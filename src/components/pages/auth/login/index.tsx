/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";

import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

import { GoogleSignInButton } from "@/components/shared";
import AppIcon from "@/components/shared/AppIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useInviteWorkspace, {
  type workspaceInviteParams,
} from "@/hooks/useInviteWorkspace";
import { useTheme } from "@/hooks/useTheme";
import { useGetDictionary } from "@/hooks";
import { APP_ROUTES } from "@/refactor_lib/constants";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";
import { authAPI } from "@/refactor_lib/services/api/v1";
import extractErrorMessage from "@/refactor_lib/utils/extractErrorMessage";
import LocalStorageManger from "@/refactor_lib/utils/LocalStorageManager";

/* eslint-disable react/no-unescaped-entities */

/* eslint-disable react/no-unescaped-entities */

/* eslint-disable react/no-unescaped-entities */

/* eslint-disable react/no-unescaped-entities */

/* eslint-disable react/no-unescaped-entities */

/* eslint-disable react/no-unescaped-entities */
interface FormTypes {
  email: string;
  password: string;
}

/**
 * `LoginPage` is a React component that handles the login process.
 * It uses the `react-hook-form` for form handling and validation, and `useState` for local state management.
 * It also uses custom hooks `useErrorToast` and `useSuccessToast` to display error and success messages respectively.
 * It uses `useRouter` from `next/navigation` to navigate between pages.
 * It uses `useGetDictionary` to get the localized strings for the page.
 *
 * @returns The rendered login page.
 */
export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, setIsPending] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const { accept } = useInviteWorkspace();

  // Use `useForm` from `react-hook-form` to manage the form state and validation.
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormTypes>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Use `useGetDictionary` to get the localized strings for the page.
  const {
    page: { login },
    components: { form },
  } = useGetDictionary();

  const { toaster, closeToastAfterTimeout } = useToaster();
  const { isDarkmode, changeThemeDark } = useTheme();
  const { lang } = useParams();

  useEffect(() => {
    const access_token = LocalStorageManger.getUserSession()?.access_token;
    if (access_token && isInviteWorkspace.token && isInviteWorkspace.email) {
      router.push(
        APP_ROUTES.workspace +
          `/confirm_invite_to_workspace?token=${isInviteWorkspace.token}&email=${isInviteWorkspace.email}`,
      );
      setIsPending(false);
      setRedirecting(true);
      closeToastAfterTimeout({ useDefaultCloseDuration: true });
    } else if (isInviteWorkspace.token && isInviteWorkspace.email) {
      setValue("email", isInviteWorkspace.email);
    } else if (access_token) {
      router.push(`/${lang}/${APP_ROUTES.chatApp}`);
    }
  }, [params]);

  const isInviteWorkspace = {
    token: params.get("token"),
    email: params.get("email"),
  };

  /**
   * `handleLogin` is an async function that handles the login process.
   * It takes the form data as an argument, sends a request to the login API,
   * and navigates to the home page if the request is successful.
   *
   * @param {FormTypes} data - The form data.
   */
  const handleLogin = async (data: FormTypes) => {
    setIsPending(true);
    toaster({
      toastProps: { type: "promise", message: login.logging_in },
      disableAutoClose: true,
    });

    authAPI
      .login(data)
      .then(res => {
        LocalStorageManger.setUserSession(res.data);
        toaster({
          toastProps: { type: "success", message: login.logging_successfull },
        });
        if (isDarkmode) changeThemeDark({ matches: isDarkmode.matches });
        if (isInviteWorkspace.email && isInviteWorkspace.token)
          accept({
            isInviteWorkspace: isInviteWorkspace as workspaceInviteParams,
            token: res.data.access_token,
          });
        router.push(`/${lang}/${APP_ROUTES.chatApp}`);
        setIsPending(false);
        setRedirecting(true);
        closeToastAfterTimeout({ useDefaultCloseDuration: true });
      })
      .catch(err => {
        setIsPending(false);
        setRedirecting(false);
        const errMessage = extractErrorMessage(err, login.error_happend);
        toaster({ toastProps: { type: "error", message: errMessage } });
        closeToastAfterTimeout({ useDefaultCloseDuration: true });
      });
  };

  // Render the login page.
  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="flex h-fit w-full flex-col items-center gap-4"
    >
      <GoogleSignInButton
        setRedirecting={setRedirecting}
        isInviteWorkspace={isInviteWorkspace as workspaceInviteParams}
        setIsPending={setIsPending}
        className="h-12 text-2xl "
        continue_with_google={login.continue_with_google}
      />

      <Separator />

      <div className="flex w-full flex-col gap-6 lg:mx-12">
        <div className="col w-full items-start gap-2">
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^@]+@[^@]+\.[^@]+$/,
                message: "Invalid email format",
              },
            }}
            render={({ field }) => (
              <Input
                autoFocus
                type="text"
                error={errors.email?.message}
                disabled={Boolean(isInviteWorkspace?.email)}
                placeholder={login.email_placeholder}
                icon="circum:mail"
                {...field}
              />
            )}
          />
        </div>
        <div className="flex flex-col items-start gap-2 relative">
          <Controller
            name="password"
            control={control}
            rules={{
              required: form.pass_error1,
              minLength: {
                value: 8,
                message: form.pass_error2,
              },
            }}
            render={({ field }) => (
              <Input
                icon="circum:lock"
                type={showPass ? "text" : "password"}
                error={errors.password?.message}
                placeholder={login.pass_placeholder}
                {...field}
              />
            )}
          />
          <AppIcon
            icon={showPass ? "tabler:eye-closed" : "tabler:eye"}
            onClick={() => setShowPass(!showPass)}
            className="absolute top-0 translate-y-2.5 right-3 cursor-pointer"
          />
        </div>

        <Button
          type="submit"
          disabled={isPending || redirecting}
          isPending={isPending || redirecting}
        >
          {redirecting ? login.please_wait : login.login}
        </Button>

        <Link href="login/forget">
          <Button variant="outline" className="w-full">
            {login.forget_pass}
          </Button>
        </Link>
      </div>
    </form>
  );
}

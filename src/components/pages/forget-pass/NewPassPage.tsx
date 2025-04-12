"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

import AppIcon from "@/components/shared/AppIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useErrorToast from "@/hooks/useErrorToast";
import { useGetDictionary } from "@/hooks";
import { APP_ROUTES } from "@/refactor_lib/constants";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";
import { authAPI } from "@/refactor_lib/services/api/v1";

interface FormTypes {
  new_password: string;
  confirm_password: string;
}

interface IProps {
  email: string;
  token: string;
}

/**
 * `NewPassPage` is a React component that handles the password reset process.
 * It uses the `react-hook-form` for form handling and validation, and `useState` for local state management.
 * It also uses a custom hook `useErrorToast` to display error messages.
 * It uses `useGetDictionary` to get the localized strings for the page.
 *
 * @param {Object} props - The props object.
 * @param {string} props.email - The email of the user from search params.
 * @param {string} props.token - The token for password reset from search params.
 *
 * @returns The rendered password reset page.
 */
export default function NewPassPage({ email, token }: IProps) {
  // Use `useState` to manage the state of password visibility.
  const [showPass, setShowPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);
  const [isPending, setIsPending] = useState(false);
  // Use the custom hook `useErrorToast` to get the `showFetchError` function.
  const { showFetchError } = useErrorToast();

  // Use `useRouter` from `next/navigation` to navigate between pages.
  const router = useRouter();

  // Use `useForm` from `react-hook-form` to manage the form state and validation.
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormTypes>({
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });

  // Use `useGetDictionary` to get the localized strings for the page.
  const {
    page: { forget_pass: dictionary, forget_pass: reset_pass_title },
    components: { form },
  } = useGetDictionary();
  const { toaster } = useToaster();

  /**
   * `handleSetNewPass` is an async function that handles the password reset process.
   * It takes the form data as an argument, sends a request to the password reset API,
   * and navigates to the login page if the request is successful.
   *
   * @param {FormTypes} data - The form data.
   */
  const handleSetNewPass = async (data: FormTypes) => {
    // validate password to be same
    setIsPending(true);
    if (data.confirm_password !== data.new_password) {
      [
        {
          type: "manual",
          message: dictionary.not_same_pass,
          name: "new_password" as const,
        },
        {
          type: "manual",
          message: dictionary.not_same_pass,
          name: "confirm_password" as const,
        },
      ].forEach(({ name, type, message }) => setError(name, { type, message }));

      return;
    }

    authAPI
      .setNewPassword({ ...data, token, email })
      .then(() => {
        router.push(APP_ROUTES.login);
      })
      .catch(err => {
        showFetchError(err);
      })
      .finally(() => {
        setIsPending(false);
        toaster({
          toastProps: {
            type: "success",
            message: dictionary.change_successfully,
          },
        });
      });
  };

  // Render the password reset page.
  return (
    <section className="z-50 flex w-full  flex-col px-4 md:px-0 items-center justify-center gap-6 overflow-y-hidden">
      <form
        onSubmit={handleSubmit(handleSetNewPass)}
        className="backdrop-blue-lg z-10 flex h-fit w-full flex-col gap-5"
      >
        <div className="flex flex-col items-start gap-2 relative">
          <Controller
            name="new_password"
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
                error={errors.new_password?.message}
                placeholder={dictionary.new_pass_placeholder}
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

        <div className="flex flex-col items-start gap-2 relative">
          <Controller
            name="confirm_password"
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
                type={showConfPass ? "text" : "password"}
                error={errors.confirm_password?.message}
                placeholder={dictionary.confirm_pass_placeholder}
                {...field}
              />
            )}
          />
          <AppIcon
            icon={showConfPass ? "tabler:eye-closed" : "tabler:eye"}
            onClick={() => setShowConfPass(!showConfPass)}
            className="absolute top-0 translate-y-2.5 right-3 cursor-pointer"
          />
        </div>

        <Button type="submit" disabled={isPending} isPending={isPending}>
          {reset_pass_title.reset_pass_title}
        </Button>
      </form>
    </section>
  );
}

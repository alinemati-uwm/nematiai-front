"use client";

import React, { useState } from "react";

import { Controller, useForm } from "react-hook-form";

import ConfirmEmailMessage from "@/components/shared/ConfirmEmailMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useErrorToast from "@/hooks/useErrorToast";
import useSuccessToast from "@/hooks/useSuccessToast";
import { useGetDictionary } from "@/hooks";
import { authAPI } from "@/refactor_lib/services/api/v1";

interface FormTypes {
  email: string;
}
/**
 * `ForgetPassPage` is a React component that handles the password reset process.
 * It uses the `react-hook-form` for form handling and validation, and `useState` for local state management.
 *
 * @returns The rendered password reset page.
 */
export default function ForgetPassPage() {
  // Use `useState` to manage the state of email confirmation for showing the email confirmation message.
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);

  // Use the custom hook `useErrorToast` to get the `showFetchError` function.
  const { showFetchError } = useErrorToast();
  // Use the custom hook `useSuccessToast` to get the `showSuccess` function.
  const { showSuccess } = useSuccessToast();
  const [isPending, setIsPending] = useState(false);

  // Use `useForm` from `react-hook-form` to manage the form state and validation.
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormTypes>({
    defaultValues: {
      email: "",
    },
  });

  // Use `useGetDictionary` to get the localized strings for the page.
  const {
    page: { forget_pass },
    components: { form },
  } = useGetDictionary();

  /**
   * `handleForgotPass` is an async function that handles the password reset process.
   * It takes the form data as an argument, sends a request to the password reset API,
   * and updates the email confirmation state based on the response.
   *
   * @param {FormTypes} data - The form data.
   */
  const handleForgotPass = async (data: FormTypes) => {
    setIsPending(true);
    authAPI
      .forgetPassword(data)
      .then(() => {
        setShowEmailConfirmation(true);
        showSuccess("Reset password link sent to your email");
      })
      .catch(err => {
        showFetchError(err);
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  // Render the password reset page.

  return (
    <>
      <section
        className="z-50 flex w-full  flex-col px-4 md:px-0 items-center justify-center gap-6 overflow-y-hidden"
        style={{ display: showEmailConfirmation ? "none" : "flex" }}
      >
        {/*<div*/}
        {/*  className="login-absolute-left flex absolute  top-[0]  left-0 z-0 w-[200px] h-full   rounded-full" />*/}
        <form
          onSubmit={handleSubmit(handleForgotPass)}
          className="backdrop-blue-lg z-10 flex h-fit w-full flex-col gap-5"
        >
          <div className="grid grid-cols-1 items-start gap-2">
            <Controller
              name="email"
              control={control}
              rules={{ required: form.email_error_message }}
              render={({ field }) => (
                <Input
                  autoFocus
                  error={errors.email?.message}
                  type="text"
                  icon="circum:mail"
                  placeholder={form.email_placeholder2}
                  {...field}
                />
              )}
            />
          </div>
          <Button type="submit" disabled={isPending} isPending={isPending}>
            {forget_pass.send_me_link}
          </Button>
        </form>
      </section>
      <ConfirmEmailMessage
        handleBack={() => setShowEmailConfirmation(false)}
        email={getValues().email}
        resendEmail={() => handleForgotPass(getValues())}
        rootClassName={showEmailConfirmation ? "flex" : "!hidden"}
        isForgotPas
      />
    </>
  );
}

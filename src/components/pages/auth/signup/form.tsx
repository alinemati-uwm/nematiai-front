"use client";

import React, { useEffect, useState } from "react";

import { Separator } from "@radix-ui/react-separator";
import { Controller } from "react-hook-form";

import { GoogleSignInButton } from "@/components/shared";
import AppIcon from "@/components/shared/AppIcon";
import ConfirmEmailMessage from "@/components/shared/ConfirmEmailMessage";
import { Button } from "@/components/ui/button";
import { Form as FormProvider } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type workspaceInviteParams } from "@/hooks/useInviteWorkspace";
import { useGetDictionary } from "@/hooks";

import { useSignup } from "./hooks/useSignup";

/**
 * `Form` is a React component that handles the signup process.
 * It uses the `react-hook-form` for form handling and validation, and `useState` for local state management.
 * It also uses a custom hook `useSignup` to handle the signup process and manage the email confirmation state.
 * It uses `useGetDictionary` to get the localized strings for the page.
 *
 * @returns The rendered signup form.
 */

interface Props {
  searchParams: workspaceInviteParams;
}
export default function Form({ searchParams }: Props) {
  // Use `useState` to manage the state of password visibility.
  const [showPass, setShowPass] = useState(false);
  //show the button in the right
  const [showSingup, setShowSingup] = useState(false);

  //set the email value if the user is invited to a workspace via an email
  useEffect(() => {
    if (searchParams.email) {
      form.setValue("email", searchParams.email);
    }
  }, []);

  // Use `useGetDictionary` to get the localized strings for the page.
  const {
    components: { form: formLang },
    page: { signup, login },
  } = useGetDictionary();

  const [isPending, setIsPending] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const {
    form,
    handleSignup,
    setShowEmailConfirmation,
    sendAgain,
    showEmailConfirmation,
  } = useSignup({ setRedirecting, setIsPending });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    getValues,
  } = form;

  const isInviteWorkspace = {
    token: searchParams.token,
    email: searchParams.email,
  };

  return (
    <>
      {!showEmailConfirmation ? (
        <FormProvider {...form}>
          <form
            method="post"
            onSubmit={e => {
              handleSubmit(data => handleSignup(data, isInviteWorkspace))(e);
            }}
            className="w-full flex flex-col gap-4"
          >
            <GoogleSignInButton
              setRedirecting={setRedirecting}
              setIsPending={setIsPending}
              isInviteWorkspace={isInviteWorkspace}
              className="h-12 text-2xl lg:!h-12 "
              continue_with_google={login.continue_with_google}
            />
            <Separator />
            <div className="flex w-full flex-col gap-6 ">
              <div className="grid grid-cols-1 items-start gap-2 text-large">
                <Controller
                  name="fullName"
                  control={control}
                  rules={{
                    required: formLang.full_name_error_message,
                  }}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      error={errors.fullName?.message}
                      type="text"
                      icon="octicon:person-24"
                      placeholder={formLang.full_name_placeholder}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="grid grid-cols-1 items-start gap-2 text-large">
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
                      icon="circum:mail"
                      disabled={Boolean(searchParams.email)}
                      type="text"
                      error={errors.email?.message}
                      placeholder={formLang.email_placeholder}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="grid grid-cols-1 items-start gap-2 text-large relative">
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: formLang.pass_error1,
                    minLength: {
                      value: 8,
                      message: formLang.pass_error2,
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
                disabled={isSubmitting || isPending}
                isPending={isSubmitting || isPending}
              >
                {redirecting ? "Please Wait..." : signup.signup}
              </Button>
            </div>
          </form>
        </FormProvider>
      ) : (
        <ConfirmEmailMessage
          handleBack={() => setShowEmailConfirmation(false)}
          email={getValues().email}
          resendEmail={() => sendAgain(getValues().email)}
          rootClassName={showEmailConfirmation ? "flex" : "!hidden"}
        />
      )}
    </>
  );
}

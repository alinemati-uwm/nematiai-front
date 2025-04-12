import React from "react";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetDictionary } from "@/hooks";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";
import userAPI from "@/refactor_lib/services/api/v1/UserAPI";
import { type UserAPIRequest } from "@/refactor_lib/types/api/v1/UserAPI";

function InviteSetting() {
  const { register, getValues, trigger } = useForm<UserAPIRequest["invite"]>();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: userAPI.invite,
  });
  const {
    components: {
      form,
      user: { panel },
    },
    common: { apply },
  } = useGetDictionary();
  const { toaster } = useToaster();

  const submit = async () => {
    try {
      const values = getValues();
      const isValid = await trigger();
      if (!isValid) throw Error(form.email_validation);

      await mutateAsync({ email: values.email });
      toaster({
        toastProps: {
          type: "success",
          message: panel.referral_email_button,
        },
      });
    } catch (error: any) {
      const message = error?.response?.data?.detail;

      toaster({
        toastProps: {
          type: "error",
          message:
            typeof message === "string"
              ? message
              : typeof error === "string"
                ? error
                : (error as Error).message,
        },
      });
    }
  };

  return (
    <div className="px-6 py-3 flex flex-col gap-y-1">
      <h4 className="text-base font-[700] text-label-light">
        {form.email_placeholder}
      </h4>
      <Input
        placeholder={form.email}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email address",
          },
        })}
      />

      <Button
        title={apply}
        onClick={submit}
        className="ms-auto py-4 text-base mt-4"
        isPending={isPending}
      >
        {apply}
      </Button>
    </div>
  );
}

export default InviteSetting;

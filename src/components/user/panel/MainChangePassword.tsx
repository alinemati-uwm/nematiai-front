import { Controller, useForm } from "react-hook-form";

import useChangeUserPassword from "@/refactor_lib/hooks/mutations/useChangeUserPassword";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";
import { type UserAPIRequest } from "@/refactor_lib/types/api/v1/UserAPI";
import extractErrorMessage from "@/refactor_lib/utils/extractErrorMessage";

import ChangePasswordBtn from "./ChangePasswordBtn";
import ChangePasswordInput from "./ChangePasswordInput";

interface MainChangePasswordProps {
  placeholder: {
    enter_current_password_placeholder: string;
    new_password_placeholder: string;
    confirm_new_passowrd_placeholder: string;
  };
  label: {
    current_password_label: string;
    confirm_new_passowrd_label: string;
    new_password_label: string;
  };
  changePassword: string;
}

export default function MainChangePassword({
  label,
  placeholder,
  changePassword,
}: MainChangePasswordProps) {
  const { mutateAsync: changeUserPassword, isPending } =
    useChangeUserPassword();
  const { reset, handleSubmit, control, watch } = useForm<
    UserAPIRequest["changePassword"]
  >({
    defaultValues: {
      new_password: "",
      old_password: "",
      confirm_password: "",
    },
  });
  const { toaster, closeToastAfterTimeout } = useToaster();
  const onSubmit = (data: UserAPIRequest["changePassword"]) => {
    toaster({
      toastProps: {
        type: "promise",
        message: "Changing your password...",
      },
      disableAutoClose: true,
    });
    changeUserPassword(data)
      .then(() => {
        toaster({
          toastProps: {
            type: "success",
            message: "Password changed successfully.",
          },
        });
        reset();
      })
      .catch(err => {
        const errMessage = extractErrorMessage(
          err,
          "Error while changing your password!",
        );
        toaster({
          toastProps: {
            type: "error",
            message: errMessage,
          },
        });
      })
      .finally(() => {
        closeToastAfterTimeout({ useDefaultCloseDuration: true });
      });
  };
  const allData = watch();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-form ">
      <Controller
        control={control}
        name="old_password"
        render={({ field }) => (
          <ChangePasswordInput
            {...field}
            label={label.current_password_label}
            placeholder={placeholder.enter_current_password_placeholder}
            props={{ ...field }}
            key={label.current_password_label}
            passData={allData.old_password}
          />
        )}
      />
      <Controller
        control={control}
        name="new_password"
        render={({ field }) => (
          <ChangePasswordInput
            props={{ ...field }}
            label={label.new_password_label}
            placeholder={placeholder.new_password_placeholder}
            key={label.new_password_label}
            passData={allData.new_password}
          />
        )}
      />
      <Controller
        control={control}
        name="confirm_password"
        render={({ field }) => (
          <ChangePasswordInput
            {...field}
            label={label.confirm_new_passowrd_label}
            placeholder={placeholder.confirm_new_passowrd_placeholder}
            props={{ ...field }}
            key={label.confirm_new_passowrd_label}
            passData={allData.confirm_password}
          />
        )}
      />
      <div className="w-full lg:w-[340px] relative">
        <ChangePasswordBtn
          disabled={
            allData.confirm_password.length === 0 ||
            allData.new_password.length === 0 ||
            allData.old_password.length === 0
          }
          change_password={changePassword}
          isPending={isPending}
        />
      </div>
    </form>
  );
}

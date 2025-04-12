"use client";

import { Controller, useForm } from "react-hook-form";

import { Landing_btn } from "@/components/ui/landing-btn";
import { useGetDictionary } from "@/hooks";
import { useSendDataContactUs } from "@/services/static-pages/contact-us";

import { CustumInput } from "./custum-input";
import SimpleTextArea from "./simple-textarea";

export const FormSectionContactUs = () => {
  const {
    page: {
      contact_us: {
        name,
        email,
        message,
        email_error,
        name_error,
        message_error,
        invalid_email,
        place_holder_email,
        place_holder_message,
        place_holder_name,
        at_least_two_char,
        send,
      },
    },
  } = useGetDictionary();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  const { mutateAsync, isPending } = useSendDataContactUs(reset);

  const onSubmitData = async (data: any) => {
    mutateAsync(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmitData)}
      className=" w-full flex flex-col lg:mt-4  h-auto  lg:px-8 gap-5 "
    >
      <Controller
        name="name"
        control={control}
        rules={{
          required: name_error,
          minLength: {
            value: 2,
            message: at_least_two_char,
          },
        }}
        render={({ field }) => {
          return (
            <CustumInput
              errors={errors.name}
              labale={name}
              placeholder={place_holder_name}
              type="text"
              {...field}
            />
          );
        }}
      />

      <Controller
        name="email"
        control={control}
        rules={{
          required: email_error,
          pattern: {
            value: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/,
            message: invalid_email,
          },
          minLength: {
            value: 2,
            message: at_least_two_char,
          },
        }}
        render={({ field }) => {
          return (
            <CustumInput
              errors={errors.email}
              labale={email}
              placeholder={place_holder_email}
              type="email"
              {...field}
            />
          );
        }}
      />
      <Controller
        name="message"
        control={control}
        rules={{
          required: message_error,
          minLength: {
            value: 2,
            message: at_least_two_char,
          },
        }}
        render={({ field: { onChange, value } }) => {
          return (
            <SimpleTextArea
              errors={errors.message}
              labale={message}
              placeholder={place_holder_message}
              maxLength={400}
              onChange={onChange}
              value={value}
            />
          );
        }}
      />

      <Landing_btn
        type="submit"
        disabled={isPending}
        isPending={isPending}
        size="lg"
        className=" h-10"
      >
        {send}
      </Landing_btn>
      <div className="w-full fixed left-0 top-[10vh] bg-red-200"></div>
    </form>
  );
};

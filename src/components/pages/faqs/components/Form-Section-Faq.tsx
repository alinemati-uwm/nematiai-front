"use client";

import { Controller, useForm } from "react-hook-form";

import { Landing_btn } from "@/components/ui/landing-btn";
import { useGetDictionary } from "@/hooks";
import { useSendDataContactUs } from "@/services/static-pages/contact-us";

import { CustumInputFaq } from "./Custom-Input-Faq";
import TextAreaFaq from "./Text-Area-Faq";

export const FormSectionFaq = () => {
  const {
    page: {
      faq: {
        email,
        name,
        message,
        send_question,
        place_holder_email,
        place_holder_message,
        place_holder_name,
        email_error,
        message_error,
        name_error,
        at_least_two_char,
        invalid_email,
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
    await mutateAsync(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmitData)}
      className=" w-full flex flex-col  gap-6 lg:px-8   "
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
            <CustumInputFaq
              labale={name}
              errors={errors.name}
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
            <CustumInputFaq
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
            <TextAreaFaq
              errors={errors.message}
              onChange={onChange}
              value={value}
              labale={message}
              placeholder={place_holder_message}
              maxLength={400}
            />
          );
        }}
      />

      <Landing_btn
        type="submit"
        disabled={isPending}
        isPending={isPending}
        size="lg"
        className="h-12 "
      >
        {send_question}
      </Landing_btn>
      <div className="w-full fixed left-0 top-[10vh] bg-red-200"></div>
    </form>
  );
};

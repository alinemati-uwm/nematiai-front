import { Controller, type Control, type FieldErrors } from "react-hook-form";

import { useGetDictionary } from "@/hooks";
import { type InputData } from "@/services/static-pages/join-us";

import CustomInputFaq from "./CustomInputFaq";

export default function ({
  control,
  errors,
}: {
  control: Control<InputData, any>;
  errors: FieldErrors<InputData>;
}) {
  const {
    page: {
      forms: {
        first_name,
        address,
        email,
        experience,
        id_telegram,
        tell,
        last_name,
        education,
        at_least_two_char,
        first_name_error,
        email_error,
        file_error,
        last_name_error,
        place_holder_address,
        place_holder_email,
        place_holder_first_Experience,
        place_holder_first_Experience2,
        place_holder_first_education,
        place_holder_first_education2,
        place_holder_first_name,
        place_holder_id_telegram,
        place_holder_last_name,
        place_holder_tell,
        invalid_email,
        invalid_number,
        phone_format_error,
      },
    },
  } = useGetDictionary();
  return (
    <>
      <div className="md:flex md:justify-between gap-6">
        <Controller
          name="first_name"
          control={control}
          rules={{
            required: first_name_error,
            minLength: {
              value: 2,
              message: at_least_two_char,
            },
          }}
          render={({ field: { onBlur, onChange, disabled, ref, value } }) => {
            return (
              <CustomInputFaq
                label={first_name}
                type="text"
                placeholder={place_holder_first_name}
                onBlur={onBlur}
                onChange={onChange}
                disabled={disabled}
                ref={ref}
                value={value}
                error={errors.first_name}
              />
            );
          }}
        />

        <Controller
          name="last_name"
          control={control}
          rules={{
            required: last_name_error,
            minLength: {
              value: 2,
              message: at_least_two_char,
            },
          }}
          render={({ field: { onBlur, onChange, disabled, ref, value } }) => {
            return (
              <CustomInputFaq
                label={last_name}
                type="text"
                placeholder={place_holder_last_name}
                onBlur={onBlur}
                onChange={onChange}
                disabled={disabled}
                ref={ref}
                value={value}
                error={errors.last_name}
              />
            );
          }}
        />
      </div>

      <div>
        <Controller
          name="email"
          control={control}
          rules={{
            required: email_error,
            pattern: {
              value: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/,
              message: invalid_email,
            },
          }}
          render={({ field: { onBlur, onChange, disabled, ref, value } }) => {
            return (
              <CustomInputFaq
                label={email}
                type="text"
                placeholder={place_holder_email}
                classname="w-full"
                onBlur={onBlur}
                onChange={onChange}
                disabled={disabled}
                ref={ref}
                value={value}
                error={errors.email}
              />
            );
          }}
        />
      </div>
      <div className="md:flex  md:justify-between gap-6">
        <Controller
          name="phone"
          control={control}
          rules={{
            pattern: {
              value: /^\d+$/,
              message: invalid_number,
            },
            maxLength: {
              value: 16,
              message: phone_format_error,
            },
            minLength: {
              value: 5,
              message: phone_format_error,
            },
          }}
          render={({ field: { onBlur, onChange, disabled, ref, value } }) => {
            return (
              <CustomInputFaq
                label={tell}
                placeholder={place_holder_tell}
                type="tel"
                onBlur={onBlur}
                onChange={onChange}
                disabled={disabled}
                ref={ref}
                value={value}
                error={errors.phone}
              />
            );
          }}
        />
        <Controller
          name="telegram_id"
          control={control}
          render={({ field: { onBlur, onChange, disabled, ref, value } }) => {
            return (
              <CustomInputFaq
                label={id_telegram}
                type="text"
                placeholder={place_holder_id_telegram}
                onBlur={onBlur}
                onChange={onChange}
                disabled={disabled}
                ref={ref}
                value={value}
                error={errors.telegram_id}
              />
            );
          }}
        />
      </div>
      <div>
        <Controller
          name="address"
          control={control}
          render={({ field: { onBlur, onChange, disabled, ref, value } }) => {
            return (
              <CustomInputFaq
                label={address}
                placeholder={place_holder_address}
                type="text"
                classname="w-full "
                onBlur={onBlur}
                onChange={onChange}
                disabled={disabled}
                ref={ref}
                value={value}
                error={errors.address}
              />
            );
          }}
        />
      </div>
      <div className="md:flex  md:justify-between gap-6 ">
        <Controller
          name="education"
          control={control}
          render={({ field: { onBlur, onChange, disabled, ref, value } }) => {
            return (
              <CustomInputFaq
                label={education}
                type="text"
                placeholder={place_holder_first_education}
                onBlur={onBlur}
                onChange={onChange}
                disabled={disabled}
                ref={ref}
                value={value}
                error={errors.education}
              />
            );
          }}
        />
        <Controller
          name="university"
          control={control}
          render={({ field: { onBlur, onChange, disabled, ref, value } }) => {
            return (
              <CustomInputFaq
                label=""
                type="text"
                placeholder={place_holder_first_education2}
                classname="md:w-1/2 mt-3 md:mt-6 "
                onBlur={onBlur}
                onChange={onChange}
                disabled={disabled}
                ref={ref}
                value={value}
                error={errors.university}
              />
            );
          }}
        />
      </div>
      <div className="md:flex  md:justify-between gap-6">
        <Controller
          name="experience"
          control={control}
          render={({ field: { onBlur, onChange, disabled, ref, value } }) => {
            return (
              <CustomInputFaq
                label={experience}
                type="text"
                placeholder={place_holder_first_Experience}
                onBlur={onBlur}
                onChange={onChange}
                disabled={disabled}
                ref={ref}
                value={value}
                error={errors.experience}
              />
            );
          }}
        />
        <Controller
          name="company"
          control={control}
          render={({ field: { onBlur, onChange, disabled, ref, value } }) => {
            return (
              <CustomInputFaq
                label=""
                type="text"
                placeholder={place_holder_first_Experience2}
                classname="md:w-1/2 mt-3 md:mt-6 "
                onBlur={onBlur}
                onChange={onChange}
                disabled={disabled}
                ref={ref}
                value={value}
                error={errors.company}
              />
            );
          }}
        />
      </div>
    </>
  );
}

"use client";

import React from "react";

import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/**
 * FormField component to handle form input fields with validation using react-hook-form.
 *
 * @template T - The type of the field values.
 * @param {Object} props - The properties for the component.
 * @param {React.ComponentPropsWithoutRef<"input">} props - Standard input properties.
 * @param {UseControllerProps<T>} props - Properties from react-hook-form's useController.
 * @param {string} [props.inputClass] - Additional class names for the input element.
 * @returns JSX.Element - The rendered form field component.
 */
export function FormField<T extends FieldValues>(
  props: React.ComponentPropsWithoutRef<"input"> &
    UseControllerProps<T> & { inputClass?: string },
) {
  const {
    control,
    name,
    rules,
    defaultValue,
    shouldUnregister,
    className,
    children,
    inputClass,
    ...textFieldProps
  } = props;

  // Get the field values and validation error from react-hook-form
  const {
    field: { onBlur, onChange, ref, value },
    fieldState: { error },
  } = useController({ name, control, rules, defaultValue, shouldUnregister });

  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      <Input
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        value={value}
        name={name}
        {...textFieldProps}
        className={cn(
          "!h-10 w-full outline-none placeholder:text-landing-muted ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
          error && "border-danger",
          inputClass,
        )}
      />

      <span
        className={cn(
          "text-small text-danger opacity-0",
          error && "opacity-100",
        )}
      >
        {error?.message}
      </span>

      {children}
    </div>
  );
}

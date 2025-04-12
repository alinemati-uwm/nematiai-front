"use client";

import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type MouseEvent,
} from "react";

import RenderIf from "@/components/shared/RenderIf";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { MinimalButton } from "../shared";

interface ICustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  rootClassName?: string;
  inputWrapperClassName?: string;
  error?: string;
  isPassword?: boolean;
}

/**
 * input with error message and password toggle
 * @param rootClassName extra class for root div
 * @param error error message
 * @param className extra class for input
 * @param inputWrapperClassName extra class for input wrapper
 * @param type input type
 * @param isPassword is input a password type for show/hide password button
 * @param otherProps other input props
 * @constructor
 */
export const CustomInput = forwardRef<HTMLInputElement, ICustomInputProps>(
  (
    {
      rootClassName,
      error,
      className,
      inputWrapperClassName,
      type,
      isPassword = false,
      ...otherProps
    },
    ref,
  ) => {
    const [showPass, setShowPass] = useState(false);

    // toggle show/hide password
    const toggleShowPass = (e: MouseEvent<HTMLButtonElement>) => {
      // prevent form submit
      e.stopPropagation();
      setShowPass(!showPass);
    };

    return (
      <div className={cn("h-fit w-full", rootClassName)}>
        <div className={cn("relative h-fit w-full", inputWrapperClassName)}>
          {/*
          input field
        */}
          <Input
            type={isPassword ? (showPass ? "text" : "password") : type}
            className={cn(
              !!error &&
                "border-danger-darker hover:border-danger-darker focus-visible:border-danger-darker",
              className,
            )}
            ref={ref}
            {...otherProps}
          />
          {/*
          show and hide password toggle
           only show if input type is password
        */}
          <RenderIf isTrue={isPassword}>
            <MinimalButton
              type="button"
              className="fit absolute end-2 top-1/2 -translate-y-1/2 p-0 text-label-light hover:text-label"
              onClick={toggleShowPass}
              icon={showPass ? "ph:eye-slash" : "ph:eye"}
            ></MinimalButton>
          </RenderIf>
        </div>
        {/*
        show error message if any error passed
      */}
        <RenderIf isTrue={!!error}>
          <div className="mt-0.5 flex h-3">
            <span className="error">{error}</span>
          </div>
        </RenderIf>
      </div>
    );
  },
);

CustomInput.displayName = "CustomInput";

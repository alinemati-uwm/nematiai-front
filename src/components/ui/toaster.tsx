"use client";

import Image from "next/image";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast className="" key={id} {...props}>
            <div className="w-full">
              <div className="mx-6 my-6 flex flex-row items-start gap-4">
                <div className="flex flex-row gap-1 items-center">
                  {title && title === "Success" && (
                    <Image
                      alt="success checkbox icon"
                      width={25}
                      height={25}
                      src="/images/toaster/success_checkbox.svg"
                    />
                  )}
                  {title && title === "Failed" && (
                    <Image
                      alt="triangle error icon"
                      width={25}
                      height={25}
                      src="/images/toaster/error_triangle.svg"
                    />
                  )}
                </div>
                <div className="flex flex-col  justify-start items-start">
                  {title && (
                    <ToastTitle className="text-base !m-0 !p-0">
                      {title}
                    </ToastTitle>
                  )}
                  {description && (
                    <ToastDescription className="text-small text-label-light">
                      {description}
                    </ToastDescription>
                  )}
                </div>
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport className="z-[1000]" />
    </ToastProvider>
  );
}

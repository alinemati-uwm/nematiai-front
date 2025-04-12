import React from "react";

import Image from "next/image";

import Loading from "@/components/shared/Loading";

export interface ToastProps {
  type: "error" | "warning" | "success" | "info" | "promise";
  message?: string;
  content?: React.ReactElement<any>;
  closeToast?: () => void;
}

const getToastIcon = (type: ToastProps["type"]) => {
  switch (type) {
    case "error":
      return (
        <Image
          src="/images/toaster/error_triangle.svg"
          alt="error icon"
          width={24}
          height={24}
        />
      );
    case "success":
      return (
        <Image
          src="/images/toaster/success_checkbox.svg"
          alt="success icon"
          width={24}
          height={24}
        />
      );
    case "info":
      return (
        <Image
          src="/images/toaster/info_circle.svg"
          alt="info icon"
          width={24}
          height={24}
        />
      );
    case "warning":
      return (
        <Image
          src="/images/toaster/warning_square.svg"
          alt="warning icon"
          width={24}
          height={24}
        />
      );
    case "promise":
      return <Loading svgClass="!h-6 !w-6" />;
  }
};

const getToastBodyStyles = (type: ToastProps["type"]) => {
  switch (type) {
    case "error":
      return "bg-[#FFF0F6]";
    case "warning":
      return "bg-[#FFFBF0]";
    case "success":
      return "bg-[#ECFDF3]";
    case "info":
    case "promise":
      return "bg-[#D1DAE780]";
  }
};

const Toast: React.FC<ToastProps> = props => {
  const { message = "", type, closeToast, content = <></> } = props;

  const bodyStyles = getToastBodyStyles(type);

  return (
    <div
      className={`pointer-events-auto w-full sm:w-[380px] border rounded p-4  shadow-[0px_16px_12px_0px_#0000001A] flex flex-col font-dmSans ${bodyStyles}`}
    >
      <div className="flex justify-between gap-4">
        <div className="max-w-6 max-h-6">{getToastIcon(type)}</div>
        <div className="capitalize flex-grow text-base lg:text-large font-medium text-black leading-6">
          {type === "promise" ? "please wait" : type}
        </div>
        <div
          className="h-6 w-6 flex flex-col justify-center items-center cursor-pointer"
          onClick={closeToast}
        >
          <Image
            src="/images/toaster/close.svg"
            alt="close icon"
            width={13}
            height={13}
          />
        </div>
      </div>
      {message && (
        <p className="leading-6 text-small ps-10 color-[#747474]">{message}</p>
      )}
      {content}
    </div>
  );
};

export default Toast;

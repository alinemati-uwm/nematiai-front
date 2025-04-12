import React, { type FC } from "react";

import AppIcon from "@/components/shared/AppIcon";
import { MinimalButton } from "@/components/shared/MinimalButtton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCopyTextInClipBoard, useGetDictionary } from "@/hooks";

interface IProps {
  text: string;
  className?: string;
  size?: "xs" | "sm" | "lg" | "xl" | "default";
  title?: string;
  variant?: "button" | "minimalButton";
}

const CopyButton: FC<IProps> = ({
  text,
  className,
  size = "xs",
  variant = "minimalButton",
  title,
}) => {
  const { common: dictionary } = useGetDictionary();

  const [handleCopy, isCopied] = useCopyTextInClipBoard(); // for copy value

  const copy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleCopy(text);
  };

  if (variant === "button") {
    return (
      <Button onClick={copy} className={cn("row gap-2", className)}>
        <AppIcon
          fontSize={16}
          icon={
            isCopied ? "fluent:checkmark-16-regular" : "fluent:copy-16-regular"
          }
        />
        {isCopied ? dictionary.copied : title || dictionary.copy}
      </Button>
    );
  }

  return (
    <MinimalButton
      icon={isCopied ? "mdi:tick" : "fluent:copy-16-regular"}
      //"lucide:copy-check"
      title={title || dictionary.copy}
      onClick={copy}
      size={size}
      className={className}
    />
  );
};

export default CopyButton;

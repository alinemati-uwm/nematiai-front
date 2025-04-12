import * as React from "react";

import { cn } from "@/lib/utils";

import AppIcon from "../shared/AppIcon";
import AppTypo from "./AppTypo";
import { inputVariant } from "./variants";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, error, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full gap-y-1">
        <div className="relative w-full">
          {icon ? (
            <AppIcon
              icon={icon}
              width={16}
              className="absolute left-3 top-2/2 translate-y-1/2"
            />
          ) : null}
          <input
            type={type}
            className={cn(
              `${inputVariant({ variant: "input", color: "input" })} ${icon ? "pl-8" : ""}`,
              className,
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error ? (
          <AppTypo variant="small" color="danger" className="italic">
            {error}
          </AppTypo>
        ) : null}
      </div>
    );
  },
);

// className={cn(
// 	` h-input flex w-full rounded border ${activeTheme.includes("-dark") ? "border-gray-600" : ""} bg-muted`,
// 	"outline-none ring-offset-background file:border-0 file:bg-transparent",
// 	"file:font-normal focus-visible:outline-none hover:border-muted-darker hover:bg-muted-dark transition-all",
// 	" focus:bg-holder-lighter focus:!outline-0 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 ",
// 	"px-3 py-1 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50",
// 	className,
// )}
Input.displayName = "Input";

export { Input };

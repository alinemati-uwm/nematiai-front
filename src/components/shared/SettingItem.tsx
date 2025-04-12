import { type ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { ChildrenProps } from "@/services/types";

interface ISettingItemProps {
  title: string;
  Action?: ReactNode;
  className?: string;
  discription?: string;
}

/**
 * SettingItem component show the setting item with title, Action and children
 * @param title
 * @param Action button or any action
 * @param className
 * @param children
 * @constructor
 */
export function SettingItem({
  title,
  Action,
  className,
  children,
  discription,
}: ChildrenProps<ISettingItemProps>) {
  return (
    <div
      title={discription}
      className={cn("row border-b  last:border-b-0", className)}
    >
      {title !== "none" && <p className="w-40  text-label-light">{title}</p>}
      <div className={cn("row w-full")}>{children}</div>

      {Action && Action}
    </div>
  );
}

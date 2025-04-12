import { type ReactNode } from "react";

import AppTypo from "@/components/ui/AppTypo";
import { cn } from "@/lib/utils";

interface ISettingItemProps {
  title: string;
  Action?: ReactNode;
  className?: string;
  children?: ReactNode | ReactNode[];
}

/**
 * SettingItem component show the setting item with title, Action and children
 * @param title
 * @param Action button or any action
 * @param className
 * @param children
 * @constructor
 */
export function WorkspaceSettingItem({
  title,
  Action,
  className,
  children,
}: ISettingItemProps) {
  return (
    <div
      className={cn("flex w-full flex-col border rounded p-4 gap-4", className)}
    >
      {!!title && <AppTypo variant="headingXXS">{title}</AppTypo>}
      {children}
      {Action && <div className="ms-auto">{Action}</div>}
    </div>
  );
}

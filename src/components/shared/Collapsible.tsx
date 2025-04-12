import { cn } from "@/lib/utils";
import { type ChildrenProps } from "@/services/types";

interface IProps {
  isOpen: boolean;
  className?: string;
  openClassName?: string;
}

/**
 * Collapsible div by passed stated
 * @param isOpen - state to open or close collapsible div
 * @param className - extra class name
 * @param openClassName - extra class name when open
 * @param children - children
 * @constructor
 */
export function Collapsible({
  isOpen,
  className,
  openClassName,
  children,
}: ChildrenProps<IProps>) {
  return (
    <div
      className={cn(
        "max-h-0 overflow-hidden transition-all duration-300",
        isOpen && "max-h-dvh",
        className,
        isOpen && openClassName,
      )}
    >
      {children}
    </div>
  );
}

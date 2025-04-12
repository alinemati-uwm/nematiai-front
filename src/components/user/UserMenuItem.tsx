import RenderIf from "@/components/shared/RenderIf";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import AppIcon from "../shared/AppIcon";

interface IItemProps {
  title: string;
  icon: any;
  onClick?: () => void;
  classNames?: string;
  children?: React.ReactNode;
}

/**
 * button used as item of menu
 * @param title button title
 * @param onClick butte=on click handler
 * @param Icon used in left side of title in button
 * @param classNames extra classNames
 * @constructor
 */
export function UserMenuItem({
  title,
  onClick,
  icon,
  classNames,
  children,
}: IItemProps) {
  const Icon = icon;

  return (
    <Button
      element="div"
      title={title}
      variant="ghost"
      className={cn(
        "h-fit w-full px-2.5 py-2 text-label/70 hover:bg-holder-dark text-base cursor-pointer focus-visible:ring-offset-0",
        classNames,
      )}
      onClick={onClick}
    >
      <RenderIf isTrue={!!icon}>
        {typeof Icon === "string" ? (
          <AppIcon icon={icon} width={18} className="me-2" />
        ) : (
          <Icon size="18" className="me-2" />
        )}
      </RenderIf>
      <span className="w-full text-start font-normal capitalize">{title} </span>
      <div className="w-auto h-full flex justify-center items-center">
        {children}
      </div>
    </Button>
  );
}

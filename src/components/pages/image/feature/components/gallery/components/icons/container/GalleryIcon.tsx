import React, {
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import AppIcon from "@/components/shared/AppIcon";
import { Button } from "@/components/ui/button";
import useBreakpoint from "@/hooks/useBreakpoint";
import useOutsideClick from "@/hooks/useOutSideClick";

type props = {
  icon: string;
  title: string;
  popup?: {
    content: ReactNode;
    show: boolean;
    trigger(value: boolean): void;
    props?: HTMLAttributes<HTMLDivElement>;
  };
  loading?: boolean;
  style?: CSSProperties;
  onClick?(): void;
  mobileLabel?: boolean;
};

function GalleryIcon({
  icon,
  title,
  popup,
  loading,
  onClick,
  mobileLabel = false,
}: props) {
  // Reference to manage the click outside behavior for the popup
  const modalRef = useRef<any>(null);

  // Custom hook to detect clicks outside of the modal to close the popup
  useOutsideClick(modalRef, true, () => (popup ? popup.trigger(false) : {}));

  // Use breakpoint hook to determine the current screen size for responsiveness
  const { breakpoint } = useBreakpoint();

  return (
    <div ref={modalRef} className="relative">
      {/* Conditionally render the popup if it's shown */}
      {popup && popup.show ? (
        <div
          className="flex flex-col absolute rounded-md shadow-lg whitespace-nowrap bottom-12 transform right-1/2 translate-x-1/2 p-5 gap-y-3 bg-holder-lighter"
          // Apply visibility style based on popup.show
          style={{ visibility: popup.show ? "visible" : "hidden" }}
          // Spread popup.props if they exist to pass additional properties
          {...(popup.props ?? {})}
        >
          {/* Render the content of the popup */}
          {popup.content}
        </div>
      ) : null}

      {/* Render the Button component, passing onClick and variant props */}
      <Button
        variant={mobileLabel ? "default" : "outline"}
        onClick={onClick}
        className="w-full"
        // If popup exists, toggle the visibility of the popup on click
        {...(popup && { onClick: () => popup.trigger(!popup.show) })}
      >
        {/* Render either the icon and title or a loading spinner */}
        {!loading ? (
          <div className="flex flex-row gap-x-1 items-center">
            {/* Render the AppIcon component with the provided icon */}
            <AppIcon icon={icon} width={14} height={14} />
            {/* Conditionally render the title based on breakpoint or mobileLabel */}
            {mobileLabel || !["xs", "md"].includes(breakpoint) ? title : null}
          </div>
        ) : (
          // Render a loading spinner if loading is true
          <div className="w-3 h-3 border-2 border-t-2 border-t-white border-gray-400 border-solid rounded-full animate-spin"></div>
        )}
      </Button>
    </div>
  );
}

export default GalleryIcon;

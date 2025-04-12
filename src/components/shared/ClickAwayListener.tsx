import React, { useEffect, useRef, type ReactNode } from "react";

type props = {
  onClose(): void;
  children: ReactNode;
};

/**
 * Component to listen for clicks outside the children and call a function when it happens.
 *
 * @component
 * @param  props - The properties object.
 * @param {Function} props.onClose - Function to call when a click outside the children is detected.
 * @param {ReactNode} props.children - The children to render.
 * @returns JSX.Element The rendered ClickAwayListener component.
 */
function ClickAwayListener({ onClose, children }: props) {
  const childrenRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        childrenRef.current &&
        !childrenRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return <div ref={childrenRef}>{children}</div>;
}

export default ClickAwayListener;

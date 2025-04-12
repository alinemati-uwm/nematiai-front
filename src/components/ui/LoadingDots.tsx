import React from "react";

// ForwardRef component that accepts ref and props
const LoadingDots = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      ref={ref}
      className="LoadingDots-typing"
      {...props} // Pass other props to the div
    ></div>
  );
});

// Set display name for debugging purposes
LoadingDots.displayName = "LoadingDots";

export default LoadingDots;

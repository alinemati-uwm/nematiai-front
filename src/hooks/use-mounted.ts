import * as React from "react";

/**
 * Hook to determine if the component is mounted.
 *
 * @returns boolean The mounted state.
 *
 *
 */
export function useMounted() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

import React, { createContext, useMemo } from "react";

const LocalStreamResponseContext = createContext<{
  responseMessage: string;
  responseIsPending: boolean;
}>({
  responseMessage: "",
  responseIsPending: false,
});

export default LocalStreamResponseContext;

export const LocalStreamResponseProvider: React.FC<{
  children: React.ReactNode;
  responseMessage: string;
  responseIsPending: boolean;
}> = props => {
  const { children, responseMessage, responseIsPending } = props;

  const contextValue = useMemo(() => {
    return { responseMessage, responseIsPending };
  }, [responseMessage, responseIsPending]);

  return (
    <LocalStreamResponseContext value={contextValue}>
      {children}
    </LocalStreamResponseContext>
  );
};

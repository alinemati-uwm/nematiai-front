import { createContext } from "react";

const LocalTabControlContext = createContext<{
  currentTab: string;
  handleTabChange: (tabValue: string) => () => void;
}>({
  currentTab: "",
  handleTabChange: () => () => {},
});

export default LocalTabControlContext;

import { createContext } from "react";

const MenuLayoutContext = createContext({
  closeModal: () => {},
});

export default MenuLayoutContext;

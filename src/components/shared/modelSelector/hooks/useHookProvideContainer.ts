import { useEffect } from "react";

import styles from "../style.module.css";

interface props {
  setContainer(div: any): void;
}

function useHookProvideContainer({ setContainer }: props) {
  useEffect(() => {
    const portalContainer = document.createElement("div");
    portalContainer.className = styles.box;
    portalContainer.classList.add("custom-portal");
    document.body.appendChild(portalContainer);
    setContainer(portalContainer);

    return () => {
      document.body.removeChild(portalContainer);
    };
  }, []);

  return {};
}

export default useHookProvideContainer;

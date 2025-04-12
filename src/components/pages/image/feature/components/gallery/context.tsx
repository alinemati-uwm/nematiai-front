import { createContext } from "react";

type contextProps = {
  mainImage: string;
};

export const GalleryAiImageContext = createContext<contextProps>(
  {} as contextProps,
);

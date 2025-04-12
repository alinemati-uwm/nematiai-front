type IzoomOptions = {
  value: string;
  image: string;
  id: string;
};

export type typeOnchangeScale = {
  info: IzoomOptions;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  parentDocumentRef: React.MutableRefObject<HTMLDivElement | null>;
};

export type typePdfViewer = {
  file: string;
  isDragging: boolean;
  addFile: (({ files }: { files: File[] }) => void) | undefined;
  setIsFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
  isFullScreen: boolean;
  sidePanelIsOpen: boolean;
  handleMouseUp(): void;
  cropData: CropData | null;
  setCropData: React.Dispatch<React.SetStateAction<CropData | null>>;
  isCropping: boolean;
  setIsCropping: React.Dispatch<React.SetStateAction<boolean>>;
  showConfirmModal: boolean;
  setShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type typeDocumentHeaderSection = {
  file: string;
  currentPage: number;
  isCropActive: boolean;
  numPages: number;
  optionSelected: { id: string; image: string; value: string };
  zoomOptions: IzoomOptions[];
  setShowThumbnail: (value: React.SetStateAction<boolean>) => void;
  showThumbnail: boolean;
  setIsCropActive: (value: React.SetStateAction<boolean>) => void;
  handleThumbnailClick(pageNumber: number): void;
  setOptionSelected: (
    value: React.SetStateAction<{ id: string; image: string; value: string }>,
  ) => void;
  handlePrint(pdfUrl: string): void;
  setIsFullScreen: Dispatch<SetStateAction<boolean>>;
  changeScale: ({ info }: Pick<typeOnchangeScale, "info">) => void;
};

export type typeDocumentMainPages = {
  isCropActive: boolean;
  cropIsLoading: boolean;
  isFullScreen: boolean;
  file: string;
  isDragging: boolean;
  numPages: number | null;
  containerWidth: number | undefined;
  showConfirmModal: boolean;
  zoom: number;
  cropData: CropData | null;
  confirmDivRef: React.RefObject<HTMLDivElement | null>;
  onDocumentLoadSuccess: (params: PDFDocumentProxy) => void;
  pageRefs: React.RefObject<HTMLDivElement[] | null>;
  documentRef: React.MutableRefObject<HTMLDivElement | null>;
  parentDocumentRef: React.MutableRefObject<HTMLDivElement | null>;
  options: { cMapUrl: string; standardFontDataUrl: string };
  handleMouseDown: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
  handleMouseMove: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
  handleMouseUp: () => void;
  handleConfirmOcr: () => Promise<void>;
  handleCancelOcr(): void;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

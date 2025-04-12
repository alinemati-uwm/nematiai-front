import type { JSX } from "react";

// Define allowed file types
export type FileType = ".docx" | ".png" | ".jpg" | ".jpeg" | ".pdf";

// Props interface for the useAttachments hook
export interface Props {
  accept?: FileType[]; // File types to accept for upload
  maxSize?: number;
  onChange?(files: FilesType): Promise<void>;
  onGetNewFile?(files: FilesType): void;
  initialValues?: File[];
  maxUpload?: number;
  eachSize?: number;
  multiple?: boolean;
  classnames?: Partial<{
    holderDropFile: string;
  }>;
}

// Type definition for the return value of useAttachments hook
export type AttachmentsOutput = {
  content: JSX.Element;
  ViewFiles: JSX.Element;
  showUpload: () => void;
  addFile?: (val: { files: File[] }) => void;
  files: File[];
  resetFile: () => void;
  error: boolean;
  holderDropFile: JSX.Element;
  input?: JSX.Element;
  holderDropWithChild?: (val: {
    child: JSX.Element;
    className?: string;
    bgOnDragg?: string;
    bgManin?: string;
  }) => JSX.Element;
};

export interface FileContextProps {
  accept?: FileType[];
  onChange?(files: FilesType): Promise<void>;
  files: File[];
  allfiles: FilesType;
  setFiles: React.Dispatch<React.SetStateAction<FilesType>>;
  setFilePreviews: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
  maxSize: number;
  eachSize: number;
  toaster: any;
  dictionary: any;
  onGetNewFile?(files: FilesType): void;
  maxUpload?: number;
}

// Type definition for files object
export type FilesType = Record<string, File>;

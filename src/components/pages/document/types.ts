import type React from "react";

import { type UseQueryResult } from "@tanstack/react-query";
import { type Value } from "@udecode/slate";

import { type typeinfoAfterGenerate } from "@/components/shared/grammar_translate_rewrite/types";
import { type HistoryAPIResponse } from "@/refactor_lib/types/api/v1/HistoryAPI";

export type propsListDocument = {
  setLengthListDocument?: React.Dispatch<React.SetStateAction<number>>;
  setSelectedUUID: React.Dispatch<React.SetStateAction<string>>;
  setEditorValue: React.Dispatch<React.SetStateAction<Value>>;
  selectedUUID: string;
  onAftergenerate: ({ prompt, documentName }: typeinfoAfterGenerate) => void;
  beforeChangeDocument: (uuid: string) => void;
  callFromOtherPage?: boolean;
  setFlagNewDocuemnt: (val: boolean) => void;
  isPendingWhenLoadDetailsByQuery: boolean;
  addHandler: () => void;
};

export type DocumentType = {
  searchValue: string;
  answers: HistoryAPIResponse["answers"][];
  query: UseQueryResult<any, unknown>;
  selectedUUID: string;
  beforeChangeDocument: (uuid: string) => void;
};

export type GenerateDocumentType = {
  className?: string;
  disabled?: boolean;
  addHandler: () => void;
  onClick?: () => void;
};

export type ModalHistoryDocument = Omit<
  GenerateDocumentType,
  "onClick" | "className"
> & {
  beforeChangeDocument: (uuid: string) => void;
  selectedUUID: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  addHandler: () => void;
};

export type typeUseLoadDetailsforDocument = {
  selectedUUID: string;
  setSelectedUUID: React.Dispatch<React.SetStateAction<string>>;
  selectedVersion?: string;
  setSelectedVersion?: React.Dispatch<React.SetStateAction<string>>;
  setEditorValue: React.Dispatch<React.SetStateAction<Value>>;
  onAftergenerate: ({ prompt, documentName }: typeinfoAfterGenerate) => void;
};

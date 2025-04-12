import { type Value } from "@udecode/slate";

import type AppHistoryBox from "@/components/shared/HistoryRefactor/components/box/AppHistoryBox";
import type AppHistoryIcons from "@/components/shared/HistoryRefactor/components/icons/AppHistoryIcons";
import { type HistoryAPIResponse } from "@/refactor_lib/types/api/v1/HistoryAPI";
import { type StreamDynamicTypeAPI } from "@/refactor_lib/types/api/v1/StreamDynamicAPI";
import { type SCRPropsType } from "@/services/types";

export interface typeHistoryChild {
  uuid: string;
  versions: Version;
  mainAnswer: string;
  prompt: string | null;
  selectedVersion: string;
  selectedUUID: string;
}

export type typeUsePrompt = {
  key: number;
  value: string;
};

export type typePropsCreateDocument = SCRPropsType & {
  appName: AppsType;
  advanced: boolean;
  btnTitle: string;
  placeHolderPrompt: string;
  translateLanguages?: boolean;
  onCreatePrompt: (
    value: string,
    extraInfo: {
      language?: string;
      creativityLevel?: string;
      pointOfView?: string;
      tone?: string;
      documentName?: string;
      format?: string;
    },
  ) => StreamDynamicTypeAPI;
};

export type typeinfoAfterGenerate = {
  prompt?: string;
  documentName?: string;
  audio?: string;
  podcast?: string;
  modelIcon?: string;
};
export type typeHistoryChat = {
  appName: AppsType;
  Modal: typeof AppHistoryBox;
  Icons: typeof AppHistoryIcons;
  data: HistoryAPIResponse["getAllAnswers"];
  selectedUUID: string;
  selectedVersion: string;
};

export type TypeHandleGeneratedData = {
  setSelectedUUID: (val: string) => void;
  setEditorValue: (val: Value) => void;
  appName: AppsType;
  setSelectedVersion: (val: string) => void;
  afterGenerate: ({
    documentName,
    modelIcon,
  }: Pick<typeinfoAfterGenerate, "documentName"> & {
    modelIcon: string;
  }) => void;
  beforeGenerate: () => void;
};

export interface TypeLoadDetailsByQuery {
  setSelectedUUID: React.Dispatch<React.SetStateAction<string>>;
  appName: AppsType;
  selectedUUID: string;
  selectedVersion?: string;
  setSelectedVersion?: React.Dispatch<React.SetStateAction<string>>;
  afterLoadDetails: ({ data, selected, reset }: typeAfterLoadDetails) => void;
}

export type typeAfterLoadDetails = {
  data?: HistoryAPIResponse["answers"];
  selected?: Pick<selectedUUIdANdVersion, "uuid" | "version">;
  reset?: boolean;
};

export type typeInfoForLeavePage = {
  hasChange?: boolean;
  valueEditor?: Value;
};

export type selectedUUIdANdVersion = {
  version: string;
  uuid: string;
  podcast: string;
  audio: string;
};

export type DrawerMenu = "mind-map" | undefined;

export interface typeUpdateByChangeValueOfEditor {
  selectedVersion: string;
  selectedUUID: string;
  isPendingGenerate: boolean;
  appName: AppsType;
  editorValue: Value;
  setEditorValue: React.Dispatch<React.SetStateAction<Value>>;
  setInfoForLeavePage?: ({
    hasChange,
    valueEditor,
  }: typeInfoForLeavePage) => void;
  afterUpdate?: ({ version, uuid }: selectedUUIdANdVersion) => void;
}

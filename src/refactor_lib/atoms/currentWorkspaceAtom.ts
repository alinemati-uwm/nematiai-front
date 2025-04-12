import { atom } from "jotai";

export const currentWorkspaceAtom = atom<{
  id: number;
  role: {
    title: string;
    access_level: Array<{
      title: string;
    }>;
  };
  workspace: {
    name: string;
    id: number;
  };
  is_base: boolean;
  is_default: boolean;
} | null>(null);

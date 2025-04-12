import type historyAPI from "@/refactor_lib/services/api/v1/HistoryAPI";
import { type HistoryAPIResponse } from "@/refactor_lib/types/api/v1/HistoryAPI";

export type typeHeaderOfFirstLevel = {
  document?: boolean;
  history?: {
    titleOfquerySelector?: string;
    type?: AppsType;
    service?: {
      get?: () => ReturnType<typeof historyAPI.getAllAnswers>;
      delete?(history: HistoryAPIResponse["answers"]): Promise<void>; // use historyAPI.deleteAnswerByUUID
      pin?(history: HistoryAPIResponse["answers"]): Promise<void>; // use historyAPI.addAnswerToPin
    };
  } | null;
  customComponent?: React.ReactNode;
  className?: string;
  title?: string;
  workspace?: boolean;
  profile?: boolean;
  upgrade?: boolean;
  back?: boolean;
  roadmap?: boolean;
};

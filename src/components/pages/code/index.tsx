"use client";

import { useEffect } from "react";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import AppLayout from "@/components/layout/AppLayout";
import {
  CodeFeaturesSection,
  MainSection,
} from "@/components/pages/code/components";
import { SetSearchParamProvider } from "@/components/shared";
import { useGetDictionary } from "@/hooks";
import historyAPI from "@/refactor_lib/services/api/v1/HistoryAPI";

import CodeContext from "./context";
import useCode from "./hooks/useCode";

/**
 * generate code by AI page
 * @constructor
 */
export default function CodePage() {
  const { history, feature, urlHistory } = useCode();
  const { mutateAsync, data } = useMutation({
    mutationFn: historyAPI.getDetails,
  });
  const {
    page: {
      dashboard: { all_docs_title },
    },
  } = useGetDictionary();
  const router = useRouter();

  const getHistory = async () => {
    if (!history) return;
    try {
      const { data } = await mutateAsync({ uuid: history, appName: "code" });

      // Redirect if no feature
      if (!feature)
        router.push(`${urlHistory({ uuid: data.uuid, prompt: data.prompt })}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (history) getHistory();
  }, [history, feature]);

  return (
    <AppLayout>
      <AppLayout.side>
        <CodeFeaturesSection />
      </AppLayout.side>
      <AppLayout.body>
        <AppLayout.header history={{ type: "code" }} title={all_docs_title} />
        <AppLayout.main>
          <SetSearchParamProvider appName="app" appSearchParamValue="code">
            <CodeContext value={{ data: data?.data }}>
              <MainSection />
            </CodeContext>
          </SetSearchParamProvider>
        </AppLayout.main>
      </AppLayout.body>
    </AppLayout>
  );
}

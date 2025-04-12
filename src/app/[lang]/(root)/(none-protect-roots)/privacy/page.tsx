import React from "react";
import { type Metadata } from "next";

import ErrorPage from "@/components/pages/error/ErrorPage";
import TermsPrivacyPage from "@/components/pages/terms-privacy/TermsPrivacyPage";
import changeLogsApi from "@/refactor_lib/services/api/v1/changeLogs";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

async function Page() {
  const data = await changeLogsApi.about();

  if (!data || !data?.policy) {
    return <ErrorPage />;
  }

  return <TermsPrivacyPage content={data.policy} />;
}

export default Page;

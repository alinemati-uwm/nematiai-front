import dynamic from "next/dynamic";

import { SetSearchParamProvider } from "@/components/shared";
import type { SCRPropsType } from "@/services/types";

import DocumentLoading from "./loading";

const DocumentPage = dynamic(() => import("@/components/pages/document"), {
  loading: () => <DocumentLoading />,
});

export default function Write({ searchParams, params }: SCRPropsType) {
  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="personal">
      <DocumentPage searchParams={searchParams} params={params} />
    </SetSearchParamProvider>
  );
}

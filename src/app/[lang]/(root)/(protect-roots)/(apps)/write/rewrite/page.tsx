import dynamic from "next/dynamic";

import RewriteLoading from "@/app/[lang]/(root)/(protect-roots)/(apps)/write/rewrite/loading";
import type { SCRPropsType } from "@/services/types";

const WritePage = dynamic(() => import("@/components/pages/re-write"), {
  loading: () => <RewriteLoading />,
});

export default function Write({ searchParams, params }: SCRPropsType) {
  return <WritePage searchParams={searchParams} params={params} />;
}

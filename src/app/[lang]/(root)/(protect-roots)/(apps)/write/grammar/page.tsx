import dynamic from "next/dynamic";

import GrammarLoading from "@/app/[lang]/(root)/(protect-roots)/(apps)/write/grammar/loading";
import type { ParamsType, SCRPropsType } from "@/services/types";

const GrammarPage = dynamic(() => import("@/components/pages/grammar"), {
  loading: () => <GrammarLoading />,
});

interface IProps {
  params: ParamsType;
}
export default function Page({ searchParams, params }: SCRPropsType) {
  return <GrammarPage params={params} searchParams={searchParams} />;
}

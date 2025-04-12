import dynamic from "next/dynamic";

import TranslateLoading from "@/app/[lang]/(root)/(protect-roots)/(apps)/write/translate/loading";
import { type ParamsType, type SearchParamsType } from "@/services/types";

const TranslatePage = dynamic(() => import("@/components/pages/translate"), {
  loading: () => <TranslateLoading />,
});

interface IProps {
  params: ParamsType;
  searchParams: SearchParamsType;
}
export default function Translate({ params, searchParams }: IProps) {
  return <TranslatePage params={params} searchParams={searchParams} />;
}

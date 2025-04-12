import dynamic from "next/dynamic";

import TemplateLoading from "@/app/[lang]/(root)/(protect-roots)/(apps)/template/loading";

const TemplatePage = dynamic(
  () => import("@/components/pages/template/TemplatedPage"),
  {
    loading: () => <TemplateLoading />,
  },
);

export default function Template() {
  return <TemplatePage />;
}

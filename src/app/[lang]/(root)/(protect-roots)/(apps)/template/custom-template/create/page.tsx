import dynamic from "next/dynamic";

import CustomTemplateLoading from "@/app/[lang]/(root)/(protect-roots)/(apps)/template/custom-template/create/loading";

const CustomTemplatePage = dynamic(
  () => import("@/components/pages/custom-template"),
  {
    loading: () => <CustomTemplateLoading />,
  },
);

export default function Page() {
  return <CustomTemplatePage />;
}

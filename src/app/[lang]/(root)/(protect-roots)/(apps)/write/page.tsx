import dynamic from "next/dynamic";

import TranslateLoading from "./translate/loading";

const WritePageMain = dynamic(() => import("@/components/pages/write-page"), {
  loading: () => <TranslateLoading />,
});

export default function WritePage() {
  return <WritePageMain />;
}

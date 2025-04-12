import dynamic from "next/dynamic";

import NonProtectedLoading from "@/components/shared/non-protected-loading";
import { type LangParams } from "@/services/types";

const AboutUsPage = dynamic(() => import("@/components/pages/about-us"), {
  loading: () => <NonProtectedLoading />,
});
function AboutUs({ params }: LangParams) {
  return <AboutUsPage params={params} />;
}

export default AboutUs;

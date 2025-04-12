import Image from "next/image";
import Link from "next/link";

import AppIcon from "@/components/shared/AppIcon";
import AppTypo from "@/components/ui/AppTypo";

export default function BoxChildren() {
  return (
    <div className=" w-full flex flex-col-reverse items-center justify-center gap-8 lg:flex-row xl:h-[258px] px-8 ">
      <div className="lg:w-1/2 w-full  0 flex justify-center items-center xl:justify-start xl:items-start flex-col gap-4 py-[27px] ">
        <AppTypo variant="headingM">Office ipsum you must be muted.</AppTypo>
        <AppTypo>
          Office ipsum you must be muted. Me hill driving dunder strategic.
          Options welcome pole synchronise mifflin strategies field stand.
          Reference where synergy launch boy eow criticality you tomorrow
          eco-system. Incentivization crystallize scope kpis these indicators
          these should hear low. Zoom brainstorming these email most. Stop team
          busy all guys teeth strategic work
        </AppTypo>
        <Link href="/write/rewrite" className="px-2">
          <AppTypo color="primary" className="flex items-center gap-1">
            Lets Go <AppIcon icon="ion:arrow-forward-sharp" />
          </AppTypo>
        </Link>
      </div>
      <div className="lg:w-1/2 w-full flex  ">
        <Image
          src="/images/appPages/rewritePage.png"
          alt=""
          width={541}
          height={258}
          className="w-full"
        />
      </div>
    </div>
  );
}

import Image from "next/image";

import { cn } from "@/lib/utils";

import { type FeaturesData } from "./TextSection";

export default function ImageSection({ item }: { item: FeaturesData }) {
  return (
    <>
      <div
        className={cn(
          " max-w-[1490px] h-auto lg:max-h-[699px] translate-x-0 opacity-100 transition-all duration-700",
        )}
      >
        <Image
          src={item.image ?? ""}
          width={690}
          height={300}
          className="w-full h-[934px]  hidden md:flex rounded"
          alt="landing page"
          quality={100}
          layout="responsive"
          priority
        />
        <div className="flex  w-full  h-auto py-10   lg:hidden ">
          <Image
            src={item.image2 ?? ""}
            width={390}
            height={300}
            className="h-full w-[369px] md:hidden  mr-auto rounded  "
            alt="landing page"
            quality={100}
            priority
          />
        </div>
      </div>
    </>
  );
}

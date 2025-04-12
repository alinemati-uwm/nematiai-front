import Image from "next/image";
import Link from "next/link";

import AppIcon from "@/components/shared/AppIcon";
import { Button } from "@/components/ui/button";

interface Prop {
  image?: string;
  title?: string;
  published_date?: string;
  views_count?: number;
  is_liked?: any;
  id?: string;
  publisher?: string;
  summarize_text?: string;
  source_url?: string;
}
export default function MainDetailPage({
  image,
  title,
  published_date,
  views_count,
  publisher,
  summarize_text,
  source_url,
}: Prop) {
  return (
    <>
      <div className="lg:w-[812px] flex flex-col ">
        <Link
          target="_blank"
          href={source_url!}
          className=" relative"
          rel="follow"
        >
          <Image
            src={image ? image : ""}
            unoptimized
            width={200}
            height={200}
            className="w-full md:h-[460px] h-[200px]  rounded"
            alt={"News picture of " + publisher!}
            priority
          />
          <div className=" absolute left-0 bottom-2 flex justify-between w-full  text-white px-4">
            <div>
              <p>{title}</p>
              <p className="text-[#B9BAC0]">{published_date}</p>
            </div>
            <div className=" flex items-end">
              <p className="flex  justify-center items-center gap-2">
                <AppIcon icon="ion:eye" width={16} />
                {views_count}
              </p>
            </div>
          </div>
        </Link>
        <div className="w-full h-[221px] lg:p-4 flex flex-col gap-4 lg:gap-6">
          <div className="w-full flex gap-2 mt-4">
            <p>{publisher}</p>
            <p className="bg-success py-0.5 px-2 rounded-md">
              Summerized by Ai
            </p>
          </div>
          <div>
            <p>{summarize_text}</p>
          </div>
          <Link
            target="_blank"
            href={source_url!}
            className="w-full flex justify-end "
          >
            <Button className="bg-transparent border border-primary text-primary py-[6.5px] px-20 lg:hover:bg-primary lg:hover:text-[#4c3488]">
              Show News
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

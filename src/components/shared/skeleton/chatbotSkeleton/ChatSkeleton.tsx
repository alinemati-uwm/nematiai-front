"use client";

import { Skeleton } from "@/components/ui/skeleton";

import AppIcon from "../../AppIcon";

export default function ChatSkeleton() {
  return (
    <>
      <div className="flex justify-between  w-screen">
        <div className="w-full  h-full flex flex-col overflow-hidden ">
          <div className="w-full h-[10%] px-6 py-4 flex justify-between">
            <Skeleton className="w-[150px] h-[32px]"></Skeleton>
            <div className="flex gap-4 ">
              <Skeleton className="w-[32px] h-[32px] flex gap-6 justify-center items-center">
                <AppIcon
                  icon="material-symbols:sticky-note-2-outline"
                  width={14}
                />
              </Skeleton>
              <Skeleton className="w-[32px] h-[32px] flex gap-6 justify-center items-center">
                <AppIcon icon="tabler:history" width={14} />
              </Skeleton>
            </div>
          </div>

          <div className="w-full h-[90%] lg:p-8 p-4  gap-6 flex flex-col-reverse md:flex-col mt-[160px] lg:mt-24 md:justify-center justify-between items-center">
            <Skeleton className="lg:w-[760px] flex flex-col justify-end p-5  w-full h-[117px] lg:h-[116px] rounded-xl ">
              <div className="  flex justify-between">
                <div className="flex gap-3">
                  <AppIcon
                    fontSize={20}
                    icon="eva:attach-fill"
                    className="text-gray-400"
                  />
                  <AppIcon
                    fontSize={20}
                    icon="ic:outline-book"
                    className="text-gray-400"
                  />
                  <AppIcon
                    fontSize={20}
                    icon="streamline:web"
                    className="text-gray-400"
                  />
                </div>
                <div className="flex gap-3">
                  <AppIcon
                    fontSize={20}
                    icon="lucide:mic"
                    className="text-gray-400"
                  />
                  <AppIcon
                    fontSize={20}
                    icon="mdi:arrow-up"
                    className="text-gray-400"
                  />
                </div>
              </div>
            </Skeleton>

            <div className="flex gap-3 justify-center relative -top-7 md:top-0  md:mt-0  items-center w-full  md:w-full flex-wrap">
              {[1, 2, 3, 4, 5].map((item, key) => (
                <Skeleton key={key} className="w-[109px] h-9 "></Skeleton>
              ))}
            </div>
            <div className="md:hidden w-1 h-1"></div>
          </div>
        </div>
      </div>
    </>
  );
}

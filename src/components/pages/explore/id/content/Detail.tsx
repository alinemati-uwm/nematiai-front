import Image from "next/image";

import AppIcon from "@/components/shared/AppIcon";
import AppTypo from "@/components/ui/AppTypo";
import { useGetTime } from "@/hooks/useGetTime";

function ExplorerArticleDetail({
  view_count,
  createdAt,
}: {
  view_count?: number;
  createdAt?: string;
}) {
  const { getTime } = useGetTime();

  const items = [
    {
      icon: "hugeicons:clock-04",
      value: createdAt ? getTime(createdAt) : "",
    },
    {
      icon: "solar:eye-outline",
      value: view_count,
    },
  ];

  return (
    <div className="flex flex-row justify-between items-center gap-4">
      <div className="flex flex-row items-center gap-x-2 truncate w-full ">
        <Image
          src="https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg"
          alt=""
          width={20}
          height={20}
          unoptimized
          className="rounded-full"
        />
      </div>
      <div className="flex flex-row w-full sm:justify-end items-center gap-x-6">
        {items.map((el, key) => (
          <div
            key={key}
            className="flex flex-row items-center gap-x-1 text-muted-darker"
          >
            <AppIcon icon={el.icon} />
            <AppTypo
              variant="small"
              color="secondary"
              className="whitespace-nowrap"
            >
              {el.value}
            </AppTypo>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExplorerArticleDetail;

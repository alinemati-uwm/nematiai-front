import AppIcon from "@/components/shared/AppIcon";
import useAppCategory from "@/hooks/category/useAppCategory";
import { cn } from "@/lib/utils";

export default function IconsSection() {
  const { getAllItemsIcon } = useAppCategory();
  const { icons } = getAllItemsIcon();

  return (
    <div className="flex gap-4 flex-wrap">
      {icons.map((item, index) => (
        <div
          key={index}
          className={cn(
            "w-6 h-6 flex justify-center items-center rounded-full p-1",
            item.classname,
          )}
        >
          <AppIcon
            key={item.icon + item.classname}
            id={item.icon}
            width={16}
            height={16}
            icon={item.icon}
          />
        </div>
      ))}
    </div>
  );
}

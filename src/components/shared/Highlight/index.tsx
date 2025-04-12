import React, { useEffect, useState } from "react";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import useHighlightStore from "@/stores/zustand/highlight-store";
import HighlightDrawerBody from "@/refactor_lib/components/organisms/HighlightDrawerBody";

interface IProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {}

export default function Highlight({ className, ...props }: IProps) {
  const isOpenHighlightBox = useHighlightStore.use.isHighlightOpen();
  const setOpenHighLightBox = useHighlightStore.use.setHighlightIsOpen();
  const [isDesktop, setIsDesktop] = useState<undefined | boolean>(undefined);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
  }, []);

  const handleDrawerClose = () => {
    setOpenHighLightBox(false);
  };

  if (isDesktop) {
    return (
      <div
        className={cn(
          "flex h-full w-0 max-w-0 basis-0 flex-col items-center  justify-start   gap-4 divide-y bg-holder-lighter opacity-0 transition-all duration-300",
          isOpenHighlightBox &&
            " w-full  max-w-[400px] basis-3/4  border-s  pt-0 opacity-100 xl:basis-1/2",
          className,
        )}
        {...props}
      >
        {/*content*/}
        <div className="w-full overflow-y-auto overflow-x-hidden ">
          <HighlightDrawerBody onCloseDrawer={handleDrawerClose} />
        </div>
      </div>
    );
  }

  return (
    <Drawer open={isOpenHighlightBox} onOpenChange={setOpenHighLightBox}>
      <DrawerContent className="max-h-[90dvh] gap-2 p-2">
        <HighlightDrawerBody onCloseDrawer={handleDrawerClose} />
      </DrawerContent>
    </Drawer>
  );
}

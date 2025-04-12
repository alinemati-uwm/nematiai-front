"use client";

import React from "react";

import AppIcon from "@/components/shared/AppIcon";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { useGetDictionary } from "@/hooks";

interface Props {
  placeHolder: string;
  openSearch: boolean;
  setOpenSearch: (open: boolean) => void;
  children: React.ReactNode;
  setSearchWord: (val: string) => void;
}

const SearchModalMobileSize = ({
  placeHolder,
  openSearch,
  setOpenSearch,
  children,
  setSearchWord,
}: Props) => {
  const {
    page: {
      workspace: { cancel },
    },
  } = useGetDictionary();
  return (
    <Drawer open={openSearch} onOpenChange={setOpenSearch}>
      <DrawerContent className="z-[300] max-h-[90dvh] gap-2 bg-muted p-2 ">
        <div className="flex h-full w-full flex-col">
          {/*searchbar */}
          <div className="mx-4 flex h-full w-full flex-row gap-2 ">
            <div className="relative flex w-[90%] flex-row">
              <Input
                type="search"
                style={{ height: "100%", width: "100%" }}
                className=" ! px-7"
                placeholder={placeHolder}
                onChange={e => setSearchWord(e.target.value)}
              />
              <div className="absolute start-2  top-1/2 -translate-y-1/2 items-center text-large">
                <AppIcon icon="ion:search" />
              </div>
            </div>
            <Button variant="secondary" onClick={() => setOpenSearch(false)}>
              {cancel}
            </Button>
          </div>
          {/*result of the search bar*/}
          <div className="mx-4 h-auto w-full">{children}</div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SearchModalMobileSize;

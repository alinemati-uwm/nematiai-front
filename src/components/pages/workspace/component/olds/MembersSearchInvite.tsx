import React, { useState } from "react";

import { type WorkspaceMember } from "@/components/pages/workspace/component/olds/members";
import { Input } from "@/components/ui/input";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useGetDictionary } from "@/hooks";

import SearchModalMobileSize from "./SearchModalMobileSize";

interface Props {
  searchWord: string;
  setSearchWord: (value: string) => void;
  members: WorkspaceMember[] | null;
}

const MembersSearchInvite = ({ setSearchWord, members, searchWord }: Props) => {
  const [openSearch, setOpenSearch] = useState(false);

  const {
    common: { search },
  } = useGetDictionary();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="flex w-full flex-row   ">
      <div className=" flex w-full flex-row justify-end gap-2  lg:justify-start">
        <div
          onClick={() => {
            if (isDesktop) return;
            setOpenSearch(true);
          }}
          className="fit relative flex-1"
        >
          <Input
            type="search"
            icon="fe:search"
            className=" ! w-full bg-input ps-8  font-light"
            onChange={e => setSearchWord(e.target.value)}
            placeholder={search}
          />
        </div>
      </div>

      <SearchModalMobileSize
        setOpenSearch={setOpenSearch}
        openSearch={openSearch}
        placeHolder={search}
        setSearchWord={setSearchWord}
      >
        <div className="flex h-[600px] w-full flex-col gap-2 bg-muted pr-4">
          {searchWord &&
            members &&
            members.map(member => {
              return (
                <div key={member.id} className="minh-12 w-full border-b py-4 ">
                  {member.user.username}
                </div>
              );
            })}
        </div>
      </SearchModalMobileSize>
    </div>
  );
};
export default MembersSearchInvite;

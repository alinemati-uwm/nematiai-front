import React from "react";

import Confirm from "@/components/ui/Confirm";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { UserAvatar, UserMenuItem } from "@/components/user";
import UserHoverDetail from "@/components/user/UserHoverDetail";
import UserMenuListItem from "@/components/user/UserMenuListItem";
import useBreakpoint from "@/hooks/useBreakpoint";
import { useUiStore } from "@/stores/zustand/ui-store";
import { useGetDictionary } from "@/hooks";
import useLogout from "@/refactor_lib/hooks/mutations/useLogout";
import useGetMe from "@/refactor_lib/hooks/queries/useGetMe";

function HeaderProfile() {
  const setIsSidePanelOpen = useUiStore.use.setIsSidePanelOpen();
  const { data: userData } = useGetMe();
  const setHovered = useUiStore.use.setIsHoverOnSidePanel();
  const setUserPanelActiveMenu = useUiStore.use.setUserPanelActiveMenu();
  const setOpenUserPanelDialog = useUiStore.use.setOpenUserPanelDialog();
  const { mutate, isPending } = useLogout();
  const { breakpoint } = useBreakpoint();

  const handleOpenAccountDialog = (menu?: string) => {
    setOpenUserPanelDialog(true);
    setHovered(false);
    if (menu) {
      setUserPanelActiveMenu(menu);
    }
  };
  const {
    components: {
      user: { menu: userMenuDictionary, panel },
    },
  } = useGetDictionary();

  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger>
        <UserAvatar
          imageSrc={userData?.profile_image}
          className="w-8 h-8 rounded-full cursor-pointer"
          onClick={() => {
            setOpenUserPanelDialog(true);
            breakpoint === "xs" && setIsSidePanelOpen(false);
          }}
        />
      </HoverCardTrigger>
      <HoverCardContent
        className="col w-64 p-1 mr-8  text-start z-[51]"
        align="start"
        side="top"
        role="dialog"
      >
        <UserHoverDetail
          profile_image={userData!.profile_image}
          total_credit={userData!.subscription.total_credit}
          username={userData!.username}
        />
        {/*user menu items*/}
        <UserMenuListItem
          appearance_panel_label={panel.appearance_panel_label}
          account_label={userMenuDictionary.account_label}
          community_label={userMenuDictionary.community_label}
          share_and_invite_label={userMenuDictionary.share_and_invite_label}
          handleOpenAccountDialog={handleOpenAccountDialog}
          dark_mode={userMenuDictionary.light_mode}
          light_mode={userMenuDictionary.dark_mode}
        />
        <Confirm
          title={userMenuDictionary.logout_label}
          message={userMenuDictionary.logout_Message}
          loading={isPending}
          onAccept={mutate}
          reversColorBtn={true}
          btnTitle={userMenuDictionary.logout_label}
        >
          <UserMenuItem
            title={userMenuDictionary.logout_label}
            icon="tabler:logout-2"
          />
        </Confirm>
      </HoverCardContent>
    </HoverCard>
  );
}

export default HeaderProfile;

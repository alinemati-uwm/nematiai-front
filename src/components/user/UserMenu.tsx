"use client";

import useCheckSidePanelOpen from "@/components/layout/siedebar/menues/hooks/useCheckSidePanelOpen";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { UserAvatar } from "@/components/user/UserAvatar";
import useBreakpoint from "@/hooks/useBreakpoint";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/stores/zustand/ui-store";
import { useGetDictionary } from "@/hooks";
import useLogout from "@/refactor_lib/hooks/mutations/useLogout";
import useGetMe from "@/refactor_lib/hooks/queries/useGetMe";

import Confirm from "../ui/Confirm";
import UserDetail from "./UserDetail";
import UserHoverDetail from "./UserHoverDetail";
import { UserMenuItem } from "./UserMenuItem";
import UserMenuListItem from "./UserMenuListItem";

/**
 * a hover card used in bottom of side panel
 * by hover open a menu
 * by click open user panel dialog
 * @constructor
 */
export function UserMenu() {
  const isOpenSidePanel = useCheckSidePanelOpen();
  const { mutate, isPending } = useLogout();
  const setIsSidePanelOpen = useUiStore.use.setIsSidePanelOpen();
  const setHovered = useUiStore.use.setIsHoverOnSidePanel();
  const setUserPanelActiveMenu = useUiStore.use.setUserPanelActiveMenu();
  const setOpenUserPanelDialog = useUiStore.use.setOpenUserPanelDialog();
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
      user: {
        menu: userMenuDictionary,
        panel,
        panel: { upgrade_panel_label },
      },
    },
    common: { upgrade },
  } = useGetDictionary();

  const { data: userData, isLoading: isLoadingActivePlane } = useGetMe();

  /**
   * open user panel dialog
   * @param menu if menu passed select go to target menu panel after open dialog
   */

  return (
    <div
      className={cn(
        "flex w-full items-center gap-3 px-5 bg-holder-light border-t pt-2",
        isOpenSidePanel
          ? "flex-row justify-center items-center"
          : "flex-col-reverse",
      )}
    >
      <HoverCard openDelay={100} closeDelay={100}>
        <HoverCardTrigger asChild>
          <div className="relative">
            {/* on hover open user menu and on click open user panel dialog */}
            <UserAvatar
              imageSrc={userData?.profile_image}
              name={userData?.username}
              className="border-gradiant hover-border-gradiant cursor-pointer"
              onClick={() => {
                handleOpenAccountDialog();
                breakpoint === "xs" && setIsSidePanelOpen(false);
              }}
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          className="col w-64 p-1 text-start z-[51] border border-muted-dark"
          align="start"
          side="top"
          role="dialog"
        >
          {/*user info and avatar*/}
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
      <UserDetail
        isLoadingActivePlane={isLoadingActivePlane}
        isOpenSidePanel={isOpenSidePanel}
        total_credit={userData!.subscription.total_credit}
        upgrade_panel_label={upgrade}
        username={userData!.username}
        credit={userData!.subscription.credit}
      />
    </div>
  );
}

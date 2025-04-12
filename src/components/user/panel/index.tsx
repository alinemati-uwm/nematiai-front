"use client";

import React, { useEffect, useState } from "react";

import { DialogClose } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useQueryClient } from "@tanstack/react-query";
import useMedia from "use-media";

import AppIcon from "@/components/shared/AppIcon";
import Confirm from "@/components/ui/Confirm";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useQueryParams } from "@/hooks/useQueryParams";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/stores/zustand/ui-store";
import {
  accountSettingsItems,
  extraSettingsItems,
} from "@/constants/user-panel";
import { useGetDictionary } from "@/hooks";
import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import useLogout from "@/refactor_lib/hooks/mutations/useLogout";
import changeLogsApi from "@/refactor_lib/services/api/v1/changeLogs";

import { UserMenuItem } from "../UserMenuItem";
import About from "./about";
import AccountSettings from "./AccountSettings";
import AppearanceSettings from "./AppearanceSettings";
import Connections from "./Connections";
import Referral from "./referral";
import Upgrade from "./Upgrade";

const menuComponents: Record<string, any> = {
  account: AccountSettings,
  connections: Connections,
  upgrade: Upgrade,
  // apiToken: ApiToken,
  referral: Referral,
  // invite: InviteSetting,
  appearance: AppearanceSettings,
  about: About,
  // transactions: Transactions,
};

/**
 * user panel dialog open by clicking on user avatar in side panel
 * @constructor
 */
export function UserPanel() {
  const { panel: userPanelDictionary, menu: menuDictionary } =
    useGetDictionary().components.user;
  const isOpen = useUiStore.use.openUserPanelDialog();
  const setIsOpen = useUiStore.use.setOpenUserPanelDialog();
  const activeMenu = useUiStore.use.userPanelActiveMenu();
  const setActiveMenu = useUiStore.use.setUserPanelActiveMenu();
  const [showMainHolderOnMobile, setShowMainHolderOnMobile] = useState(false);
  const { setQueryByRouter } = useQueryParams();
  const { mutate, isPending } = useLogout();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isOpen) {
      setActiveMenu("account");
    }
  }, [isOpen]);

  const MenuContent = menuComponents[activeMenu];

  //check size of media and use it for set active on menu
  const isSmallScreen = useMedia({ maxWidth: "640px" });

  useEffect(() => {
    if (!isOpen) {
      const aboutData = queryClient.getQueryData(QUERY_KEYS.changeLog.about);
      if (!aboutData) {
        queryClient.prefetchQuery({
          queryKey: QUERY_KEYS.changeLog.about,
          queryFn: changeLogsApi.about,
        });
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isSmallScreen) {
      setShowMainHolderOnMobile(true);
    }
  }, [activeMenu]);

  //get title of active panel
  const getActiveMenuTitle = () => {
    //first get find active panel from list of panels
    //then get i18Key to get i18 value of title form dictionary
    const key = [...accountSettingsItems, ...extraSettingsItems].find(
      item => item.key === activeMenu,
    )?.i18Key;

    return userPanelDictionary[key as keyof typeof userPanelDictionary];
  };

  const onClickOnMenu = (key: string) => {
    setActiveMenu(key);
    if (isSmallScreen) {
      setShowMainHolderOnMobile(true);
    }
  };
  const {
    page: {
      workspace: { settings_tab_label },
    },
  } = useGetDictionary();

  const onOpenChange = (value: boolean) => {
    setQueryByRouter({}, ["settingMenu"]);

    setIsOpen(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        onCloseAutoFocus={() => {
          setShowMainHolderOnMobile(false);
        }}
        className="lg:w-[1000px] flex flex-col p-0 lg:h-[620px] h-[100%] w-[100%] max-h-[100%] max-w-[100%] sm:h-[90%] sm:w-[90%] text-label/80 outline-none"
      >
        <VisuallyHidden>
          <DialogTitle>User Panel</DialogTitle>
        </VisuallyHidden>
        <div className=" flex overflow-hidden flex-row h-full">
          <div
            className={`relative h-full w-full sm:w-[180px] lg:w-auto pb-0  sm:flex sm:flex-row ${showMainHolderOnMobile && isSmallScreen ? " hidden " : "col"}  `}
          >
            <div className="flex-1   flex flex-col justify-between  scrollbar mt-0 sm:border-r ">
              {/*all panels about account settings*/}
              <div className=" lg:px-2  px-2">
                <div className="py-2 text-muted-darker   lg:px-0 flex text-base font-[700] lg:font-[100]  leading-tight justify-between items-center pr-2">
                  {settings_tab_label}{" "}
                  {isSmallScreen && (
                    <DialogClose>
                      <AppIcon icon="ic:outline-close" width={24} height={24} />
                    </DialogClose>
                  )}
                </div>
                {accountSettingsItems.map(item => (
                  <UserMenuItem
                    classNames={cn(
                      "mb-3 focus-visible:ring-0 text-base relative px-1 py-2 font-[400] b leading-tight",
                      activeMenu === item.key &&
                        !isSmallScreen &&
                        " text-primary bg-primary-lighter overflow-hidden",
                    )}
                    title={
                      userPanelDictionary[
                        item.i18Key as keyof typeof userPanelDictionary
                      ]
                    }
                    icon={item.Icon}
                    key={item.id}
                    onClick={() => {
                      onClickOnMenu(item.key);
                    }}
                  >
                    {activeMenu === item.key && !isSmallScreen && (
                      <div className="w-4 h-4  rounded-sm bg-primary absolute -left-3 "></div>
                    )}
                  </UserMenuItem>
                ))}
              </div>
              <div className=" border-t py-2 px-1">
                <Confirm
                  title={menuDictionary.logout_label}
                  message={userPanelDictionary.logout_Message}
                  onAccept={mutate}
                  loading={isPending}
                  reversColorBtn={true}
                  btnTitle={menuDictionary.logout_label}
                >
                  <UserMenuItem
                    title={menuDictionary.logout_label}
                    icon="mdi:exit-to-app"
                    classNames=" text-danger p-2"
                  />
                </Confirm>
              </div>
            </div>
          </div>
          <div
            className={`h-full flex-1 justify-end overflow-y-auto sm:flex ${showMainHolderOnMobile && isSmallScreen ? "flex" : " hidden "}`}
          >
            <div className=" flex w-full h-full flex-col relative rounded-lg scrollbar">
              {/*title for each option */}
              <div className="row w-full  gap-1.5 sticky top-0 bg-holder-lighter lg:px-5  text-base font-[400] text-label-dark bg-green-300 ">
                <div className="w-full flex sm:justify-between gap-2 border-b mt-4 px-4 lg:px-0 pb-2 lg:pb-0.5 lg:mb-2 top-0">
                  {isSmallScreen && (
                    <AppIcon
                      width={22}
                      icon="ion:arrow-back-outline"
                      onClick={() => {
                        setShowMainHolderOnMobile(false);
                      }}
                      className="block cursor-pointer sm:hidden pr-1 "
                    />
                  )}

                  <div>{getActiveMenuTitle()}</div>

                  {!isSmallScreen && (
                    <DialogClose>
                      <AppIcon icon="ic:outline-close" width={16} height={16} />
                    </DialogClose>
                  )}
                </div>
              </div>

              <MenuContent setActiveMenu={setActiveMenu} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

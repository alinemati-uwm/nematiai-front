import React, { useState, type ReactElement } from "react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { WorkspaceMembers } from "@/components/pages/workspace/component/olds/WorkspaceMembers";
import { WorkspaceSettings } from "@/components/pages/workspace/component/olds/WorkspaceSettings";
import type { SettingMenu } from "@/components/pages/workspace/type";
import AppIcon from "@/components/shared/AppIcon";
import AppTypo from "@/components/ui/AppTypo";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetDictionary } from "@/hooks";
import useCurrentWorkspaceIdValue from "@/refactor_lib/hooks/atoms/useCurrentWorkspaceIdValue";

import SideBarSetting from "./SideBarSetting";

interface Props {
  triggerBtn: ReactElement<any>;
  activePage?: string;
}

const SettingModal = ({ triggerBtn }: Props) => {
  const [open, setOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<SettingMenu>("setting");
  const workspace_id = useCurrentWorkspaceIdValue();

  const {
    page: { workspace: dictionary },
  } = useGetDictionary();

  if (!workspace_id) return null;

  const main: Record<SettingMenu, React.JSX.Element> = {
    setting: (
      <WorkspaceSettings setOpen={setOpen} workspace_id={workspace_id!} />
    ),
    share: <WorkspaceMembers workspace_id={workspace_id!} />,
  };
  const menus: Record<SettingMenu, string> = {
    setting: dictionary.workspace_setting,
    share: dictionary.share_workspace,
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span onClick={() => setOpen(true)}>{triggerBtn}</span>
      </DialogTrigger>
      <DialogContent className="!p-0 !m-0 max-w-[800px] w-[93%] h-[600px] lg:h-[550px] flex">
        <VisuallyHidden>
          <DialogTitle>{dictionary.workspace_setting}</DialogTitle>
        </VisuallyHidden>
        <SideBarSetting
          setCurrentMenu={setCurrentMenu}
          currentMenu={currentMenu}
          menus={menus}
          workspace_id={workspace_id}
        />
        <div className="px-6 py-4 col gap-4  w-full">
          {/*header*/}
          <div className="w-full spacing-row text-label-light pb-1 border-b sticky top-4 bg-holder-lighter">
            <AppTypo variant="headingXXS">{menus[currentMenu]}</AppTypo>
            <AppIcon
              icon="ic:outline-close"
              width={18}
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>
          <div className="w-full">{main[currentMenu]}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingModal;

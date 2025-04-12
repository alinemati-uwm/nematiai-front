import React from "react";

import SettingModal from "@/components/pages/workspace/component/olds/settingModal/SettingModal";
import { useGetDictionary } from "@/hooks";

import WorkspaceContainer from "./Container";

function WorkspaceInvite() {
  const {
    page: {
      workspace: { members_invite_button_label },
    },
  } = useGetDictionary();

  return (
    <SettingModal
      activePage="Share"
      triggerBtn={
        <WorkspaceContainer
          icon="hugeicons:user-add-02"
          caption={members_invite_button_label}
        />
      }
    />
  );
}

export default WorkspaceInvite;

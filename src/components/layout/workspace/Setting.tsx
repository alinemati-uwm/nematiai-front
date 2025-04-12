import React from "react";

import SettingModal from "@/components/pages/workspace/component/olds/settingModal/SettingModal";
import { useGetDictionary } from "@/hooks";

import WorkspaceContainer from "./Container";

function WorkspaceSetting() {
  const {
    page: {
      workspace: { settings_tab_label },
    },
  } = useGetDictionary();

  return (
    <SettingModal
      triggerBtn={
        <WorkspaceContainer
          icon="majesticons:settings-cog-line"
          caption={settings_tab_label}
        />
      }
    />
  );
}

export default WorkspaceSetting;

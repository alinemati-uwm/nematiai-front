import React from "react";

import AppIcon from "@/components/shared/AppIcon";
import { Button } from "@/components/ui/button";
import { useGetDictionary } from "@/hooks";

import SettingModal from "../olds/settingModal/SettingModal";

function WorkspaceModals() {
  // Fetch dictionary data for the "share" button text
  const {
    common: { share },
  } = useGetDictionary();

  return (
    <div className="flex flex-row gap-x-2">
      {/* Settings modal with a gear icon as the trigger button */}
      <SettingModal
        triggerBtn={
          <Button variant="outline" className="w-[30px]">
            <AppIcon icon="uil:setting" width={20} /> {/* Gear icon */}
          </Button>
        }
      />
      {/* Members modal with a "Share" button as the trigger */}

      {/* "Share" button text from dictionary */}
    </div>
  );
}

export default WorkspaceModals;

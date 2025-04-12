import React from "react";

import AppTypo from "@/components/ui/AppTypo";
import { useGetDictionary } from "@/hooks";

function ReferralHero() {
  const userPanelDictionary = useGetDictionary().components.user.panel;

  return (
    <div className="row w-full bg-primary-lighter p-4 rounded-lg text-lable">
      <div className="col gap-3">
        <AppTypo variant="headingS">
          {userPanelDictionary.invite_user_header_title}
        </AppTypo>
        <AppTypo variant="small">
          {userPanelDictionary.invite_user_header_description}
        </AppTypo>
      </div>
    </div>
  );
}

export default ReferralHero;

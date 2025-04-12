"use client";

import AppLayout from "@/components/layout/AppLayout";
import { UserPanel } from "@/components/user";

import SectionOneParent from "./sectionOne/SectionOneParent";
import SectionThreeParent from "./sectionThree/SectionThree";
import SectionTwoParent from "./sectionTwo/SectionTwoParent";

export default function Upgrade() {
  return (
    <AppLayout>
      <AppLayout.side />
      <AppLayout.body>
        <AppLayout.main className="!p-0 ">
          <SectionOneParent />
          <SectionTwoParent />
          <SectionThreeParent />
          <UserPanel />
        </AppLayout.main>
      </AppLayout.body>
    </AppLayout>
  );
}

import Link from "next/link";

import { Button } from "../ui/button";

export default function UserPanelUpgradeBtn({
  upgrade_panel_label,
}: {
  upgrade_panel_label: string;
}) {
  return (
    <Link href="/upgrade">
      <Button variant="gradiant" size="sm">
        {upgrade_panel_label}
      </Button>
    </Link>
  );
}

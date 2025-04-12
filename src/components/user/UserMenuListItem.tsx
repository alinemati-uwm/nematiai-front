import Link from "next/link";

import { useTheme } from "@/hooks/useTheme";

import { Switch } from "../ui/switch";
import { UserMenuItem } from "./UserMenuItem";

export default function UserMenuListItem({
  community_label,
  account_label,
  share_and_invite_label,
  handleOpenAccountDialog,
  light_mode,
  dark_mode,
}: {
  community_label: string;
  account_label: string;
  appearance_panel_label: string;
  share_and_invite_label: string;
  handleOpenAccountDialog: (str: string) => void;
  light_mode: string;
  dark_mode: string;
}) {
  const { activeTheme, changeTheme } = useTheme();

  return (
    <>
      <Link target="_blank" href="https://discord.gg/KrFTV64NvS">
        <UserMenuItem title={community_label} icon="ph:discord-logo" />
      </Link>
      <UserMenuItem
        onClick={() => handleOpenAccountDialog("account")}
        title={account_label}
        icon="ic:outline-manage-accounts"
      />
      <UserMenuItem
        onClick={() => handleOpenAccountDialog("referral")}
        title={share_and_invite_label}
        icon="material-symbols:share-outline"
      />
      <UserMenuItem
        onClick={() => {
          activeTheme === "default"
            ? changeTheme({ themeClass: "theme-dark" })
            : changeTheme({ themeClass: "default" });
        }}
        title={activeTheme === "default" ? light_mode : dark_mode}
        icon={activeTheme === "default" ? "meteor-icons:sun" : "stash:moon"}
      >
        <Switch
          className="w-[35px] h-[18px]"
          checked={activeTheme !== "default" && true}
        />
      </UserMenuItem>
    </>
  );
}

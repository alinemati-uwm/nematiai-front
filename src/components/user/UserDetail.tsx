import AppIcon from "../shared/AppIcon";
import RenderIf from "../shared/RenderIf";
import UserPanelUpgradeBtn from "./UserPanelUpgradeBtn";

export default function UserDetail({
  isOpenSidePanel,
  username,
  isLoadingActivePlane,
  upgrade_panel_label,
  total_credit,
  credit,
}: {
  isOpenSidePanel: boolean;
  username: string;
  isLoadingActivePlane: boolean;
  upgrade_panel_label: string;
  total_credit: number;
  credit: number;
}) {
  return (
    <RenderIf isTrue={isOpenSidePanel}>
      <div className="spacing-row w-[40%]">
        <div className="col 0 w-full">
          <p className="font-bold w-full overflow-hidden text-ellipsis truncate text-nowrap capitalize">
            {username ?? "User"}
          </p>
          {!isLoadingActivePlane && credit ? (
            <div className="flex gap-1 items-center text-small ">
              <div className="flex flex-row gap-x-1">
                <AppIcon icon="tabler:coins" width={14} />
                {total_credit}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <UserPanelUpgradeBtn upgrade_panel_label={upgrade_panel_label} />
    </RenderIf>
  );
}

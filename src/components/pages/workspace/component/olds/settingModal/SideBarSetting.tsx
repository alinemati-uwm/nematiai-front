import type { SettingMenu } from "@/components/pages/workspace/type";
import useLogoutWorkspace from "@/components/pages/workspace/useLogoutWorkspace";
import AppIcon from "@/components/shared/AppIcon";
import RenderIf from "@/components/shared/RenderIf";
import AppTypo from "@/components/ui/AppTypo";
import { Button } from "@/components/ui/button";
import Confirm from "@/components/ui/Confirm";
import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";
import useIsWorkspaceOwner from "@/refactor_lib/hooks/queries/useIsWorkspaceOwner";

interface IProps {
  setCurrentMenu: (value: SettingMenu) => void;
  currentMenu: SettingMenu;
  menus: Record<SettingMenu, string>;
  workspace_id: number;
}

function SideBarSetting({
  setCurrentMenu,
  currentMenu,
  menus,
  workspace_id,
}: IProps) {
  const {
    common,
    page: { workspace: dictionary },
  } = useGetDictionary();
  const { isOwner } = useIsWorkspaceOwner();
  const { mutate, isPending } = useLogoutWorkspace();

  const icons: Record<SettingMenu, string> = {
    setting: "mdi:open-in-browser",
    share: "mdi:share-variant-outline",
  };

  return (
    <div className="w-56 border-e col sticky top-0 start-0">
      <div className="col p-2 gap-2">
        <AppTypo variant="headingXXS" className="text-label-light">
          {common.setting}
        </AppTypo>
        {Object.entries(menus).map(([menu, title]) => {
          const isActive = currentMenu === menu;

          return (
            <div
              key={"workspace-setting- " + menu}
              onClick={() => setCurrentMenu(menu as SettingMenu)}
              className={cn(
                "row w-full cursor-pointer gap-2 rounded p-2 ps-0 relative overflow-hidden",
                isActive ? "bg-primary-lighter !text-primary" : "text-label",
              )}
            >
              <div
                className={cn(
                  " bg-primary w-2 h-4 rounded-sm transition-all duration-200 -ms-1",
                  isActive ? "opacity-100" : "opacity-0",
                )}
              />
              <AppIcon icon={icons[menu as SettingMenu]} width={14} />
              <AppTypo
                variant="small"
                className={cn(
                  "caret-transparent",
                  isActive ? "!text-primary" : "text-label",
                )}
              >
                {title}
              </AppTypo>
            </div>
          );
        })}
      </div>
      <RenderIf isTrue={!isOwner}>
        <div className="px-2 py-3 w-full mt-auto border-t sticky bottom-0">
          <Confirm
            title={dictionary.logout_workspace}
            message={dictionary.logout_workspace_message}
            onAccept={() => mutate(workspace_id.toString())}
            loading={isPending}
            reversColorBtn={true}
            btnTitle={dictionary.logout_btn_label}
          >
            <Button variant="text" className="row gap-2 text-danger">
              <AppIcon icon="mdi:exit-to-app" />
              {dictionary.logout_workspace}
            </Button>
          </Confirm>
        </div>
      </RenderIf>
    </div>
  );
}

export default SideBarSetting;

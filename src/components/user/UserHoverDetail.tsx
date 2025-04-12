import { AppTooltip } from "@/components/shared";
import { cn } from "@/lib/utils";

import AppIcon from "../shared/AppIcon";
import StatusPlanBadge from "./panel/StatusPlanBadge";
import { UserAvatar } from "./UserAvatar";

export default function UserHoverDetail({
  profile_image,
  username,
  total_credit,
}: {
  profile_image: string;
  username: string;
  total_credit: number;
}) {
  const useInfoTextClass =
    "capitalize text-small font-normal overflow-hidden text-ellipsis whitespace-nowrap ";
  return (
    <div className="flex flex-row border-b p-2 mb-2 justify-between  items-center">
      <div className="flex flex-row gap-x-2 items-center justify-center ">
        <div className="">
          <UserAvatar imageSrc={profile_image} name={username} />
        </div>
        <div className="flex">
          <div className="gap-y-1 col">
            <AppTooltip title={username ?? ""}>
              <p
                className={`${useInfoTextClass} whitespace-pre-wrap text-base`}
              >
                {username.substring(0, 8)}...
              </p>
            </AppTooltip>
            <div
              className={cn(
                useInfoTextClass,
                "text-label-light w-auto  flex flex-row gap-x-1",
                total_credit.toString().length > 4 && "pr-1",
              )}
            >
              <AppIcon icon="tabler:coins" width={14} />
              {total_credit}
            </div>
          </div>
          <div className=" flex justify-end pb-2 items-end">
            <StatusPlanBadge />
          </div>
        </div>
      </div>
    </div>
  );
}

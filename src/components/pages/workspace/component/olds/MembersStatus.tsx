import { DescriptionHoverCard } from "@/components/shared";
import AppTypo from "@/components/ui/AppTypo";
import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";
import type useGetWorkspaceStatus from "@/refactor_lib/hooks/queries/useGetWorkspaceStatus";

interface MembersStatusProps {
  workspaceStatus: ReturnType<typeof useGetWorkspaceStatus>["data"] | null;
  isPending: boolean;
}
const MembersStatus = ({ workspaceStatus, isPending }: MembersStatusProps) => {
  const {
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();

  return (
    <div className="flex w-full  flex-row gap-5 h-20 text-large text-label-light ">
      <div
        className={cn(
          "flex h-full w-1/2 flex-col items-center justify-center rounded-lg border bg-muted gap-1 ",
          isPending && "animate-pulse",
        )}
      >
        {workspaceStatus && !isPending && (
          <>
            <AppTypo variant="headingS" color="secondary">
              {workspaceStatus?.members ?? 0}
            </AppTypo>
            <AppTypo color="secondary">
              {workspaceDictionary.members_label}
            </AppTypo>
          </>
        )}
      </div>

      <div
        className={cn(
          "flex h-full w-1/2 flex-col items-center justify-center  rounded-lg border bg-muted gap-1",
          isPending && "animate-pulse",
        )}
      >
        {workspaceStatus && !isPending && (
          <>
            <AppTypo variant="headingS" color="secondary">
              {workspaceStatus?.pends ?? 0}
            </AppTypo>
            <p className="row gap-1">
              <AppTypo color="secondary">
                {workspaceDictionary.members_pending_label}
              </AppTypo>
              <DescriptionHoverCard
                description={workspaceDictionary.members_pending_description}
              />
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default MembersStatus;

import ConfirmInviteWorkspace from "@/components/pages/workspace/ConfirmInviteWorkspace";

export type ConfirmInviteToWorkspaceSearchParams = {
  token: string;
  email: string;
};

export default async function page({
  searchParams,
}: {
  searchParams: Promise<ConfirmInviteToWorkspaceSearchParams>;
}) {
  const params = await searchParams;
  return <ConfirmInviteWorkspace searchParams={params} />;
}

"use client";

import dynamic from "next/dynamic";

import WorkspaceLoading from "@/app/[lang]/(root)/(protect-roots)/workspace/loading";

const WorkspacePage = dynamic(() => import("@/components/pages/workspace"), {
  loading: () => <WorkspaceLoading />,
});

export default function Workspace() {
  return <WorkspacePage />;
}

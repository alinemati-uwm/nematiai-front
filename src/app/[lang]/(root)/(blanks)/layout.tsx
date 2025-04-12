"use client";

import { type ReactNode } from "react";

import adminPanelHoc from "@/hoc/adminPanelHoc";

function Layout({ children }: { children: ReactNode }) {
  return children;
}

export default adminPanelHoc(Layout);

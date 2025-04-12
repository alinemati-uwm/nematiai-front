"use client";

import React from "react";

import { useCustomSearchParams } from "@/hooks";

interface IProps {
  children: React.ReactNode;
  appName: string;
  appSearchParamValue: string;
}

/**
 * Component to set App search params.
 *
 * @component
 * @param {React.ReactNode} children - The children to render.
 * @param {string} appName - The app name.
 * @param {string} appSearchParamValue - The app search param value.
 * @returns React.ReactNode The rendered component.
 */
export function SetSearchParamProvider({
  children,
  appSearchParamValue,
  appName,
}: IProps) {
  useCustomSearchParams(appName, appSearchParamValue);

  return <>{children}</>;
}

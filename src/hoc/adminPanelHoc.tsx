"use client";

import React, { useEffect, type ComponentType } from "react";

import HomeLoading from "@/app/[lang]/(root)/(protect-roots)/loading";
import useGetAllModels from "@/refactor_lib/hooks/queries/useGetAllModels";
import useGetUserWorkspaces from "@/refactor_lib/hooks/queries/useGetUserWorkspaces";
import useCheckClientSession from "@/refactor_lib/hooks/shared/useCheckClientSession";

/**
 * Higher-order component (HOC) for the admin panel.
 *
 * This HOC wraps a given component and provides session validation,
 * fetches user workspaces and models, and conditionally adds a CSS class
 * to the body element based on the session validity.
 *
 * @template T - The type of the component's props.
 * @param {ComponentType<any>} Component - The component to be wrapped by the HOC.
 * @returns Function - The HOC that wraps the given component.
 */
export default function adminPanelHoc<T>(Component: ComponentType<any>) {
  return function AdminPanelHoc(props: T) {
    const isSessionValid = useCheckClientSession();

    // Get All models before using rewrite by demand of product owner
    useGetUserWorkspaces();
    useGetAllModels({ modelName: null });

    useEffect(() => {
      if (typeof window !== "undefined") {
        const bodyClass = "session-valid"; // Define the class name you want to add
        if (isSessionValid) {
          document.body.classList.add(bodyClass);
        } else {
          document.body.classList.remove(bodyClass);
        }
      }
    }, [isSessionValid]);

    if (!isSessionValid) return <HomeLoading />;

    return <Component {...props} />;
  };
}

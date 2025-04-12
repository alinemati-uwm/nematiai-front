"use client";

import React from "react";

import AppLayout from "@/components/layout/AppLayout";
import { useGetDictionary } from "@/hooks";

import WriteMainCategory from "./components/Category";
import HeroWritepage from "./components/Hero";
import WriteHistory from "./components/history";
import WritePageContext from "./context";
import useHookWritePage from "./hook/useHookWritePage";

function WritePageMain() {
  const { states, updateState } = useHookWritePage();
  const {
    components: {
      menu: { ai_write },
    },
  } = useGetDictionary();

  return (
    <WritePageContext value={{ states, methods: { updateState } }}>
      <AppLayout>
        <AppLayout.side />
        <AppLayout.body>
          <AppLayout.header title={ai_write} />
          <AppLayout.main>
            <div className="flex flex-col gap-y-5">
              <HeroWritepage />
              <WriteMainCategory />
              <WriteHistory />
            </div>
          </AppLayout.main>
        </AppLayout.body>
      </AppLayout>
    </WritePageContext>
  );
}

export default WritePageMain;

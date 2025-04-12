"use client";

import { useContext } from "react";

import { useGetDictionary } from "@/hooks";

import TemplateContentContext from "../pages/template/components/content/context";
import { MinimalButton } from "./MinimalButtton";

interface IProps {
  onChangeText: (text: string) => void;
}
export function BannerWithSearch({ onChangeText }: IProps) {
  const {
    methods: { callbackMethod },
  } = useContext(TemplateContentContext);
  const {
    common: { search },
  } = useGetDictionary();

  return (
    <div className={`relative bg-r ${callbackMethod ? "pt-12" : ""}`}>
      {!callbackMethod && (
        <div className="centered-col app-store-hero relative h-[131px] min-h-[131px] w-full px-6 rounded" />
      )}
      <div
        className={`row absolute ${callbackMethod ? "bottom-0" : "-bottom-2"} left-1/2 py-1 w-full min-w-60 max-w-sm -translate-x-1/2 rounded shadow bg-muted-lighter px-3`}
      >
        <MinimalButton icon="fe:search" />
        <input
          className="h-full w-full border-none bg-transparent px-2 font-normal outline-none focus:outline-0 focus:ring-0"
          type="search"
          placeholder={search}
          onChange={e => onChangeText(e.target.value)}
        />
      </div>
    </div>
  );
}

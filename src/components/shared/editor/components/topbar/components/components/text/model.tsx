import { type ReactNode } from "react";

import { type Textbox } from "fabric";

import AppIcon from "@/components/shared/AppIcon";

import type textToolsTypes from "./type";

export type textToolsModelStyle = {
  key: keyof Textbox;
  value: string | boolean;
};

const textToolsModel = (() => {
  const style = { width: 20 };
  const align: {
    Icon: ReactNode;
    key: textToolsTypes["alignes"];
    style: textToolsModelStyle;
  }[] = [
    {
      Icon: <AppIcon {...style} icon="f7:text-alignleft" />,
      key: "left",
      style: {
        key: "textAlign",
        value: "left",
      },
    },
    {
      Icon: <AppIcon {...style} icon="f7:text-aligncenter" />,
      key: "center",
      style: {
        key: "textAlign",
        value: "center",
      },
    },
    {
      Icon: <AppIcon {...style} icon="f7:text-alignright" />,
      key: "right",
      style: {
        key: "textAlign",
        value: "right",
      },
    },
  ];

  const styles: {
    Icon: ReactNode;
    key: textToolsTypes["styles"];
    style: textToolsModelStyle;
  }[] = [
    {
      Icon: <AppIcon {...style} icon="f7:bold" />,
      key: "bold",
      style: {
        key: "fontWeight",
        value: "bold",
      },
    },
    {
      Icon: <AppIcon {...style} icon="f7:italic" />,
      key: "italic",
      style: {
        key: "fontStyle",
        value: "italic",
      },
    },
    {
      Icon: <AppIcon {...style} icon="f7:underline" />,
      key: "underline",
      style: {
        key: "underline",
        value: true,
      },
    },
  ];

  return { align, styles };
})();

export default textToolsModel;

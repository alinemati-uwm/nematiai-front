import React, { type SelectHTMLAttributes } from "react";

import AppTypo from "@/components/ui/AppTypo";

type props = {
  props?: SelectHTMLAttributes<HTMLSelectElement>;
  items: {
    value: string | number;
    caption: string | number;
  }[];
  font?: boolean;
};

function SelectboxFontTool({ items, props, font }: props) {
  return (
    <select
      {...props}
      className="w-full border outline-none bg-muted-light p-1 md:px-2.5 rounded hover:bg-muted-dark hover:border-muted-darker"
    >
      {items.map((item, key) => (
        <option
          key={key}
          value={item.value}
          {...(font && { fontFamily: item.value })}
        >
          <AppTypo>{item.caption}</AppTypo>
        </option>
      ))}
    </select>
  );
}

export default SelectboxFontTool;

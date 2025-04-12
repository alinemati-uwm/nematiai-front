import React, { useContext } from "react";

import { Input } from "@/components/ui/input";

import WritePageContext from "../../../context";

function MainWriteSearch() {
  const {
    methods: { updateState },
  } = useContext(WritePageContext);

  return (
    <div className="flex justify-center">
      <Input
        type="text"
        icon="gg:search"
        placeholder="Search"
        onChange={e =>
          updateState("search", e.target.value.length ? e.target.value : null)
        }
        className="w-[240px]"
      />
    </div>
  );
}

export default MainWriteSearch;

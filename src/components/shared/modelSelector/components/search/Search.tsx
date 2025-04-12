import React, { useContext } from "react";

import { Input } from "@/components/ui/input";

import AppModelSelectorContext from "../../context";

function ModelSelectorSearch() {
  const {
    methods: { updateState },
    states: { search },
  } = useContext(AppModelSelectorContext);

  return (
    <Input
      icon="gg:search"
      placeholder="Search"
      value={search}
      onChange={e => updateState("search", e.target.value)}
    />
  );
}

export default ModelSelectorSearch;

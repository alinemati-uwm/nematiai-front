import React, { useContext } from "react";

import AppModelSelectorContext from "../../context";
import ModelSelectorItemContainer from "../item/container";
import ModelSelectorlabel from "../item/Label";

function ModelSelectorResaultSearch() {
  const {
    states: { search, models },
  } = useContext(AppModelSelectorContext);

  return (
    <div className="flex flex-col gap-y-1">
      <ModelSelectorlabel label="Search" />

      {models.length
        ? (() => {
            const uniqueNames = new Set();
            return models.map(el =>
              el.models
                .filter(el => {
                  const isNameUnique = !uniqueNames.has(el.name);
                  if (isNameUnique) {
                    uniqueNames.add(el.name);
                  }
                  return (
                    isNameUnique &&
                    (search.length
                      ? el.name
                          .toLowerCase()
                          .search(search.toLocaleLowerCase()) >= 0
                      : true)
                  );
                })
                .map((el, key) => (
                  <div className="w-full outline-none" key={key}>
                    <ModelSelectorItemContainer data={el} />
                  </div>
                )),
            );
          })()
        : "Not found result"}
    </div>
  );
}

export default ModelSelectorResaultSearch;

import React, { useContext } from "react";

import * as Popover from "@radix-ui/react-popover";
import Link from "next/link";

import AppTypo from "@/components/ui/AppTypo";
import { Button } from "@/components/ui/button";
import useAppCategory from "@/hooks/category/useAppCategory";
import { useGetDictionary } from "@/hooks";

import AppsContainerContext from "./appsContainerContext";

function AppsContainerUse() {
  // Get flattened menu for categories like "chatbot", "image_creation", and "image_to_image"
  const { flattenMenu } = useAppCategory();

  // Extract app ID from context (used for URL query params)
  const {
    item: {
      app: { id },
    },
  } = useContext(AppsContainerContext);

  // Get dictionary for menu items (translations for keys)
  const {
    components: { menu },
  } = useGetDictionary();

  // Filter items based on specific categories (chatbot, image_creation, image_to_image)
  const items = flattenMenu.filter(el =>
    ["chatbot", "image_creation", "image_to_image"].includes(el.i18Key),
  );

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button>Use</Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="flex flex-col mt-1 bg-muted border rounded">
          {items.map((el, key) => (
            <Link
              href={`${el.route}?template_id=${id}&template_type=CustomTemplate&app=chat`} // Dynamic route with app id as query param
              key={key}
              className="text-center py-1.5 px-3 hover:bg-muted-dark"
            >
              <AppTypo variant="small">{menu[el.i18Key]}</AppTypo>
            </Link>
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default AppsContainerUse;

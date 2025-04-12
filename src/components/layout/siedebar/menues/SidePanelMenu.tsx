import { Menu } from "react-pro-sidebar";

import { UserMenu } from "@/components/user";
import useAppCategory from "@/hooks/category/useAppCategory";
import { getHslColorByVar } from "@/lib/utils";

import SidePanelItem from "./SidePanelItem";

type Props = {
  isOpen: boolean;
};
export default function SidePanelMenu({ isOpen }: Props) {
  const { menues } = useAppCategory();

  return (
    <div className="flex flex-col h-[82%]">
      <div className="flex-1  max-h-[calc(100%-44px)]  overflow-scroll ">
        <Menu
          rootStyles={{
            padding: "10px 0",
          }}
          menuItemStyles={{
            button: ({ active }) => ({
              color: active
                ? getHslColorByVar("--text-primary")
                : getHslColorByVar("--text-light"),
              display: "flex",
              justifyContent: isOpen ? "start" : "center",
              alignItems: "center",
              padding: isOpen ? "1px 10px" : "1px 4px 1px 0px",
              height: "var(--spacing-element-height)",
              width: "100%",
              zIndex: 1,
              "&:hover": {
                backgroundColor: "var(--hover)",
              },
            }),

            icon: {
              margin: "0 auto",
            },
          }}
        >
          <div className="flex flex-col gap-y-1.5">
            {menues.map((el, key) => (
              <div key={key} className="flex flex-col">
                {el.i18Key === "prompt_library" ? (
                  <div className="border-t w-[93%] m-auto mb-3 mt-1.5"></div>
                ) : null}
                <SidePanelItem item={el} />
              </div>
            ))}
          </div>
        </Menu>
      </div>
      <div className="">
        <Menu>
          <div className="col  bottom-0 absolute inset-x-0  gap-1.5 py-2">
            {/* <SpaceItems /> */}
            <UserMenu />
          </div>
        </Menu>
      </div>
    </div>
  );
}

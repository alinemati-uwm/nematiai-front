import React, { useContext } from "react";

import Link from "next/link";
import { useParams } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/plate-ui/popover";
import AppTypo from "@/components/ui/AppTypo";
import { Button } from "@/components/ui/button";
import { useGetDictionary } from "@/hooks";
import { type TemplateAPIResponse } from "@/refactor_lib/types/api/v1/TemplateAPI";

import TemplateContentContext from "../../../context";

type props = {
  template: TemplateAPIResponse["allTemplates"];
};

function TemplateButton({ template }: props) {
  // Get necessary strings from the dictionary using a custom hook
  const {
    components: {
      menu: { chatbot },
    },
    page: {
      template: { use_prompt },
      image: { image_creation, image_to_image_tab_label },
    },
  } = useGetDictionary();

  // Get the callback method from the context (if available)
  const {
    methods: { callbackMethod },
  } = useContext(TemplateContentContext);

  // Extract the language from the URL parameters using `useParams`
  const { lang } = useParams();

  // Define a list of options that will be shown in the popover menu
  const list = [
    {
      caption: chatbot,
      page: "chat", // Link to the chatbot page
    },
    {
      caption: image_creation,
      page: "image/text-to-image", // Link to the image creation page
    },
    {
      caption: image_to_image_tab_label,
      page: "image/image-to-image", // Link to the image-to-image page
    },
  ];

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          {/* Button that triggers the popover. If callbackMethod exists, it triggers the callback on click */}
          <Button
            variant="default"
            {...(callbackMethod && { onClick: () => callbackMethod(template) })}
          >
            {use_prompt} {/* Button text comes from the dictionary */}
          </Button>
        </PopoverTrigger>
        {/* If there is no callbackMethod, show the popover content with links */}
        {!callbackMethod ? (
          <PopoverContent className="flex flex-col shadow-none bg-popover p-1 border w-[125px]">
            {list.map((el, key) => (
              <Link
                key={key}
                href={`/${lang}/${el.page}?template_id=${template.id}&template_type=${template.template_type}`}
                className=" p-2 py-1.5 cursor-pointer  hover:bg-muted-dark  hover:rounded"
              >
                <AppTypo variant="small">{el.caption}</AppTypo>{" "}
                {/* Display caption from the dictionary */}
              </Link>
            ))}
          </PopoverContent>
        ) : null}
      </Popover>
    </>
  );
}

export default TemplateButton;

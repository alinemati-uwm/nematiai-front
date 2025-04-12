"use client";

import Link from "next/link";

import AppIcon from "@/components/shared/AppIcon";
import { Button } from "@/components/ui/button";
import { useGetDictionary } from "@/hooks";

function CreateTemplateButton() {
  const {
    components: {
      apps_header: { create_prompt_button_label },
    },
  } = useGetDictionary();

  return (
    <Link href="/template/custom-template/create">
      <Button>
        <AppIcon icon="mdi:add" className="text-white sm:hidden" width={14} />
        <span className="hidden sm:inline-block">
          {create_prompt_button_label}
        </span>
      </Button>
    </Link>
  );
}

export default CreateTemplateButton;

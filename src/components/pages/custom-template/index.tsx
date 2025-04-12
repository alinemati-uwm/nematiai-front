"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import AppLayout from "@/components/layout/AppLayout";
import {
  AddCustomInput,
  PromptDetailsForm,
  ResetAndCreateButtons,
} from "@/components/pages/custom-template/components";
import AppIcon from "@/components/shared/AppIcon";
import AppTypo from "@/components/ui/AppTypo";
import { Button } from "@/components/ui/button";
import { useGetDictionary } from "@/hooks";

import CustomTemplateProvider from "./providers/CustomTemplateProvider";

export default function CustomTemplatePage() {
  const {
    components: {
      apps_header: { prompt_library },
    },
    page: { custom_template: dictionary },
  } = useGetDictionary();
  const { lang } = useParams();

  return (
    <AppLayout>
      <AppLayout.side />
      <AppLayout.body>
        <AppLayout.header
          customComponent={
            <Link href={`/${lang}/template`}>
              <div className="flex flex-row items-center justify-center">
                <AppIcon icon="tabler:arrow-left" />
                <Button variant="ghost">{prompt_library}</Button>
              </div>
            </Link>
          }
          upgrade
          profile
        />
        <AppLayout.main>
          <CustomTemplateProvider>
            <div className=" sm:mt-4 flex justify-center  overflow-auto">
              <section className="col col-span-12 lg:col-span-8 bg-holder-lighter max-w-[800px] w-[95%]">
                <div className="col items-center gap-2 border-b px-4 py-3 text-center lg:px-9">
                  <AppTypo variant="headingL">{dictionary.page_title}</AppTypo>
                  <AppTypo color="secondary" className="max-w-3xl">
                    {dictionary.page_description}
                  </AppTypo>
                </div>
                <PromptDetailsForm />
                <AddCustomInput />
                <ResetAndCreateButtons />
              </section>
            </div>
          </CustomTemplateProvider>
        </AppLayout.main>
      </AppLayout.body>
    </AppLayout>
  );
}

"use client";

import React from "react";

import AppLayout from "@/components/layout/AppLayout";
import { useGetListNewsById } from "@/components/pages/explore/news-get";

import ExplorerContainer from "../components/Container";
import ExploreRelated from "../components/Related";
import ExploreSearchFix from "../components/Search";
import ExploreTools from "../components/tools";
import ExploreArticleContent from "./content";
import ExporerArticleHero from "./Hero";

function ExploreArticle({ id }: { id: string }) {
  const { data } = useGetListNewsById({ newsId: id });

  return (
    <AppLayout>
      <AppLayout.side />
      <AppLayout.body>
        <AppLayout.header title="Explore" history={{ type: "all_writer" }} />
        <AppLayout.main>
          <ExplorerContainer>
            <div className="flex flex-col gap-y-6 ">
              <ExporerArticleHero hero={data?.image_urls[0]} />
              <ExploreTools
                tools={[
                  "volume",
                  "comment",
                  "like",
                  "dislike",
                  "share",
                  "report",
                  "save",
                ]}
                params={{ id }}
                newsDataById={data}
              />
              <div className="flex flex-col sm:flex-row items-start gap-x-10">
                <div className="w-full sm:w-4/5 flex flex-col gap-y-5">
                  <ExploreArticleContent data={data} />
                  {/* <MainListExlporeSources merge={false} /> */}
                  <ExploreRelated data={data} />
                </div>
                {/* <StickyBox
									className="hidden sm:block w-1/5"
									offsetTop={0}
									offsetBottom={20}
								>
									<ExploreArticleSources />
								</StickyBox> */}
              </div>
            </div>
            <ExploreSearchFix />
          </ExplorerContainer>
        </AppLayout.main>
      </AppLayout.body>
    </AppLayout>
  );
}

export default ExploreArticle;

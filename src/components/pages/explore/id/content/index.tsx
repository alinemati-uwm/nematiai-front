import "katex/dist/katex.min.css";

import { type ExploreNewsData } from "../../index/newsTypes";
import ExplorerArticleDetail from "./Detail";
import { MarkDownRender } from "./MarkDownRender";

function ExploreArticleContent({
  data,
}: {
  data?: ExploreNewsData["getNewsDataById"];
}) {
  return (
    <div className="flex flex-col gap-y-4">
      <MarkDownRender content={data?.full_description} />
      <ExplorerArticleDetail
        view_count={data?.view_count}
        createdAt={data?.created_at}
      />
    </div>
  );
}

export default ExploreArticleContent;

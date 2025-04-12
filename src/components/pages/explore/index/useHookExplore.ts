import { useParams, useSearchParams } from "next/navigation";

function useHookExplore() {
  const search = useSearchParams().get("search");
  const { lang } = useParams();

  const makeArticleLink = (id: number) => `/${lang}/explore/${id}`;

  return { search, makeArticleLink };
}

export default useHookExplore;

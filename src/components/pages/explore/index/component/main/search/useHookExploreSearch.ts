import { useState } from "react";

import { useParams, useRouter } from "next/navigation";

function useHookExploreSearch() {
  const [keyword, setKeyword] = useState("");
  const params = useRouter();
  const { lang } = useParams();

  const searchFn = () => {
    if (keyword.length) params.push(`/${lang}/explore?search=${keyword}`);
  };

  return { searchFn, setKeyword, keyword };
}

export default useHookExploreSearch;

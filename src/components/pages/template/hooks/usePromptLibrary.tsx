import { useQuery } from "@tanstack/react-query";

import templateAPI from "@/refactor_lib/services/api/v1/TemplateAPI";

function usePromptLibrary() {
  const category = useQuery({
    queryKey: ["templates-page"],
    queryFn: () => templateAPI.getAllCategories(),
  });

  return { category };
}

export default usePromptLibrary;

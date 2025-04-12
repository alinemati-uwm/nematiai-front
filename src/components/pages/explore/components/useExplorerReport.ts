import { useGetDictionary } from "@/hooks";

function useExplorerReport() {
  const {
    page: {
      explore: {
        not_relevant_me,
        outdated_article,
        duplicate_article,
        misleading_title,
        image_quality_visual_defects,
        offensive,
        suspected_bot_ceated,
        intellectual_property_violation,
      },
    },
  } = useGetDictionary();

  const reasons = [
    {
      label: not_relevant_me,
    },
    {
      label: outdated_article,
    },
    {
      label: duplicate_article,
    },
    {
      label: misleading_title,
    },
    {
      label: image_quality_visual_defects,
    },
    {
      label: offensive,
    },
    {
      label: suspected_bot_ceated,
    },
    {
      label: intellectual_property_violation,
    },
  ];

  return { reasons };
}

export default useExplorerReport;

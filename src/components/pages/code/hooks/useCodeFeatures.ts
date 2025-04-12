import { useCustomSearchParams } from "@/hooks";

/**
 * This hook is used to get the current feature from the url search params and set the feature in the url search params
 */
function useCodeFeatures() {
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const currentFeature = searchParams.get("feature") ?? "code-convertor";

  const setFeature = (feature: string) => {
    setSearchParams("feature", feature);
  };

  return {
    currentFeature,
    setFeature,
  };
}

export default useCodeFeatures;

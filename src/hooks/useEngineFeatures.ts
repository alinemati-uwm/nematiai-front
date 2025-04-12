import { useFormStore } from "@/stores/zustand/apps-form-section-store";

export const useEngineFeatures = () => {
  //engine settings
  const selectedEngine = useFormStore.use.selectedEngine();
  const engines = useFormStore.use.engines();

  //selected engine feature

  const selectedEngineFeature =
    engines && selectedEngine ? engines[selectedEngine] : null;
  // useEffect(() => {
  //   if(engines && selectedEngine){
  //     selectedEngineFeature = engines[selectedEngine]
  //   }
  // }, [engines,selectedEngine]);

  return { selectedEngineFeature, selectedEngine };
};

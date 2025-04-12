import { useEffect, useState } from "react";

import { type ModelAPIRequest } from "@/refactor_lib/types/api/v1/ModelAPI";

import useGetAllModels from "../queries/useGetAllModels";

const useGetAppTypeEngines = ({
  GetAllModels,
}: {
  GetAllModels: ModelAPIRequest;
}) => {
  const serviceModels = useGetAllModels(GetAllModels);

  const [engines, setEngines] = useState<string[] | []>([]);
  const [enginesName, setEnginesName] = useState<Record<string, string>>();
  const [enginesIcon, setEnginesIcon] = useState<Record<string, string>>();

  useEffect(() => {
    if (!serviceModels.data?.data) return;

    const appTypeEngines: string[] = [];
    const appTypeEnginesName: Record<string, string> = {};
    const appTypeEnginesIcon: Record<string, string> = {};

    serviceModels.data.data.forEach(item => {
      item.models.forEach(el => {
        appTypeEngines.push(el.value),
          (appTypeEnginesName[el.value] = el.name),
          (appTypeEnginesIcon[el.value] = el.icon);
      });
    });

    setEnginesName(appTypeEnginesName);
    setEngines(appTypeEngines);
    setEnginesIcon(appTypeEnginesIcon);
  }, [serviceModels.isSuccess]);
  // console.log({ data, engines, enginesName, enginesIcon });

  return { engines, enginesName, enginesIcon, serviceModels };
};

export default useGetAppTypeEngines;

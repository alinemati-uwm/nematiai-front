import { useParams, useSearchParams } from "next/navigation";

import aiImageModel from "../model";

function useRouteAiImage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const featureFromParams: any = params.feature ?? "text-to-image";
  const history = searchParams.get("uuid");
  const app = searchParams.get("app");
  const to = searchParams.get("to");

  const feature = aiImageModel.featureMapping[featureFromParams];

  return { feature, featureFromParams, history, app, to };
}

export default useRouteAiImage;

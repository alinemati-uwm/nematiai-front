import { usePathname, useRouter, useSearchParams } from "next/navigation";

function useTemplateModalRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const template = {
    id: searchParams.get("template_id"),
    type: searchParams.get("template_type"),
  };

  const clearRoute = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("template_type");
    params.delete("template_id");

    const newQuery = params.toString();
    router.push(`${pathname}?${newQuery}`);
  };
  return { template, clearRoute };
}

export default useTemplateModalRouter;

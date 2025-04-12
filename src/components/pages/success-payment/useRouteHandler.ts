import { useRouter } from "next/navigation";

export default function useRouteHandler({
  stripeData,
  countRef,
  setIsPending,
  isDone,
}: {
  stripeData: any;
  countRef: any;
  setIsPending: (bool: boolean) => void;
  isDone: (bool: boolean) => void;
}) {
  const router = useRouter();
  const routeHandler = () => {
    setIsPending(true);
    if (stripeData.isError) {
      countRef.current += 1;
      if (countRef.current >= 4) {
        isDone(true);
        router.push("/chat");
      } else {
        if ((stripeData?.error as any)?.response?.status !== 404) {
          stripeData.refetch();
        } else {
          router.push("/chat");
        }
      }
    } else {
      router.push("/chat");
    }
  };
  return { routeHandler };
}

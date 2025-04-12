import { formatDistanceStrict } from "date-fns";

export function useGetTime() {
  const getTime = (timestamp: string) => {
    return formatDistanceStrict(timestamp, new Date());
  };
  return { getTime };
}

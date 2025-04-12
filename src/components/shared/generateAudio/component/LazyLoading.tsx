import Loading from "../../Loading";

// Loading component
export function LazyLoading() {
  return (
    <div className="flex flex-1 items-center  select-none  justify-center">
      <Loading></Loading>
    </div>
  );
}

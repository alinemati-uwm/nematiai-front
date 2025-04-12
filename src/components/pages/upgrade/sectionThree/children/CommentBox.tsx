import AppIcon from "@/components/shared/AppIcon";

export default function CommentBox() {
  return (
    <div className="flex flex-col xl:flex-row gap-6">
      {[1, 1, 1, 1].map((item, index) => (
        <div
          key={index}
          className="lg:w-full h-auto rounded-lg p-4 bg-holder-lighter shadow-lg border-2 flex flex-col gap-2"
        >
          <div className="w-full flex gap-2 items-center">
            <div className="h-10 w-10 border-4 border-green-700 text-label-lighter flex justify-center items-center rounded-full bg-green-400">
              AM
            </div>
            <p>Jorje</p>
          </div>
          <div className="w-full flex gap-1">
            <AppIcon
              icon="tabler:star-filled"
              color="orange"
              width={15}
              height={15}
            />
            <p className="text-small">4.5</p>
          </div>
          <div>
            <p>
              Office ipsum you must be muted. Replied bandwagon net ballpark can
              beef support charts place sorry. Like marketing accountable all
              before message first-order developing .
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

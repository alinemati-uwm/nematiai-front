export default function SkeletonListPdf() {
  return (
    <div className="flex flex-col w-full gap-2">
      {[1, 2, 3, 4, 5].map((file, index) => (
        <div
          key={index}
          className="w-full bg-muted-dark animate-pulse flex flex-row gap-2 px-3 py-2 h-10 rounded-lg items-center"
        ></div>
      ))}
    </div>
  );
}

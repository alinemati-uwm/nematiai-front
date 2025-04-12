import AppIcon from "@/components/shared/AppIcon";

export default function PdfIsEmpty() {
  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <AppIcon icon="ph:upload-thin" className="text-3xl font-[500]" />
      <p className="text-center text-large font-[500]">
        no files found. Please upload your first file
      </p>
    </div>
  );
}

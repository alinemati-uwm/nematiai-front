import React from "react";

import ImageEditorPage from "@/components/pages/imageditor/ImageEditorPage";

function Page({
  searchParams: { image, auth, token },
}: {
  searchParams: { token: string; auth: string; image: string };
}) {
  if (process.env.APP_MOBILE_TOKEN !== token || !auth || !image)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Sorry , Page Not Found !
      </div>
    );

  return <ImageEditorPage />;
}

export default Page;

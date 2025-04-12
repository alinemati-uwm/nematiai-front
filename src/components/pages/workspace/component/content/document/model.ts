import type workspaceDocumentsTypes from "./type";

const workspaceDocumentsModel = (() => {
  const tabs: workspaceDocumentsTypes["tabs"][] = [
    {
      name: "Chatbot",
      app_type: "chat_bot",
      route: "chat",
    },
    {
      name: "Rewrite",
      app_type: "ai_writer",
      route: "write/rewrite",
    },
    {
      name: "Grammar",
      app_type: "grammar",
      route: "write/grammar",
    },
    {
      name: "Document",
      app_type: "personal",
      route: "write/document",
    },
    {
      name: "Text to Image",
      app_type: "text_to_image",
      route: "image/text-to-image",
    },
    {
      name: "Image to Image",
      app_type: "image_to_image",
      route: "image/image-to-image",
    },
    {
      name: "Image Upscale",
      app_type: "image_upscale",
      route: "image/image-upscale",
    },
    {
      name: "Prompt Library",
      app_type: "template",
      route: "write/template",
    },
  ];

  return { tabs };
})();

export default workspaceDocumentsModel;

export const workspaceDocumentTabs: {
  [key: string]: { name: string; app_type: AppsType; route: string };
} = {
  chat_bot: {
    name: "Chatbot",
    app_type: "chat_bot",
    route: "chat",
  },
  ai_writer: {
    name: "Rewrite",
    app_type: "ai_writer",
    route: "write/rewrite",
  },
  grammar: {
    name: "Grammar",
    app_type: "grammar",
    route: "write/grammar",
  },
  personal: {
    name: "Document",
    app_type: "personal",
    route: "write/document",
  },
  text_to_image: {
    name: "Text to Image",
    app_type: "text_to_image",
    route: "image/text-to-image",
  },
  image_to_image: {
    name: "Image to Image",
    app_type: "image_to_image",
    route: "image/image-to-image",
  },
  image_upscale: {
    name: "Image Upscale",
    app_type: "image_upscale",
    route: "image/image-upscale",
  },
  template: {
    name: "Prompt Library",
    app_type: "template",
    route: "write/template",
  },
};

/**
 * @constant `APP_ROUTES` - Constant containing route paths used throughout the project.
 */
const APP_ROUTES = {
  landing: "/",
  login: "/login",
  signup: "/signup",
  aboutUs: "/about",
  aboutUsPerson: (personId: string | number) => `/about/${personId}`,
  contactUs: "/contact",
  chatApp: "/chat",
  chatPdfApp: "/chatpdf",
  codeApp: "/code",
  grammarApp: "/grammar",
  imageApp: "/image",
  rewriteApp: "/rewrite",
  templateApp: "/template",
  translateApp: "/translate",
  appStore: "/app-store",
  workspace: "/workspace",
} as const;

export default APP_ROUTES;

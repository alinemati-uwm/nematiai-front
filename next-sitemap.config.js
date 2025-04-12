const url = "http://localhost:3000";
module.exports = {
  siteUrl: url,
  generateRobotsTxt: true,
  changefreq: "weekly",
  alternateRefs: [
    {
      href: url,
      hreflang: "en",
    },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/chat",
          "/chatpdf",
          "/code",
          "/document",
          "/grammar",
          "/image",
          "/rewrite",
          "/template",
          "/translate",
          "/app-store",
          "/dashboard",
          "/workspace",
          "/payment*",
          "/payment",
          "/forms",
          "/login",
          "/login/forget",
          "/login/reset-password",
          "/signup",
          "/signup/confirm",
        ],
      },
    ],
  },
};

// @ts-check
import withPWAInit from "@ducanh2912/next-pwa";
import bundleAnalyzer from "@next/bundle-analyzer";
import CSSMinimizerPlugin from "css-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: false,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
});

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  reactStrictMode: false,
  output: "standalone",
  images: {
    minimumCacheTTL: 2592000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "u398193.your-storagebox.de",
      },
      {
        protocol: "https",
        hostname: "nerdstudio-backend-bucket.s3.amazonaws.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|webp|woff2|ttf|woff)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, must-revalidate",
          },
        ],
      },
      {
        source:
          "/(app-store|dashboard|payment|workspace|chat|chatpdf|code|grammar|image|rewrite|template|translate)(/.*)?",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
    ];
  },
  experimental: {
    serverSourceMaps: false,
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
      resolveAlias: {
        underscore: "lodash",
        mocha: { browser: "mocha/browser-entry.js" },
        canvas: "./empty-module.ts",
        "./Sample.js": "./src/components/shared/pdf-viewer/PdfViewer.tsx",
      },
      resolveExtensions: [
        ".mdx",
        ".tsx",
        ".ts",
        ".jsx",
        ".js",
        ".mjs",
        ".json",
      ],
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Webpack Configuration
  webpack: (config, { isServer }) => {
    config.optimization = {
      ...config.optimization,
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
        new CSSMinimizerPlugin(),
      ],
      splitChunks: {
        chunks: "all",
      },
    };
    if (isServer) {
      config.resolve.alias.canvas = false;
    }
    return config;
  },
};

// Combine PWA and Bundle Analyzer
const config = withPWA(nextConfig);

export default process.env.ANALYZE === "true"
  ? withBundleAnalyzer(config)
  : config;

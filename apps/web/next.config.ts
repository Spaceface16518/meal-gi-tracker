import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    const securityHeaders = [
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      {
        key: "Permissions-Policy",
        value:
          "camera=(self), microphone=(self), geolocation=(), payment=(), usb=(), browsing-topics=()",
      },
    ];

    const staticAssetHeaders = [
      {
        key: "Cache-Control",
        value: "public, max-age=31536000, immutable",
      },
    ];

    const generatedMetadataHeaders = [
      {
        key: "Cache-Control",
        value: "public, max-age=86400, stale-while-revalidate=604800",
      },
    ];

    const serviceWorkerHeaders = [
      {
        key: "Cache-Control",
        value: "public, max-age=0, must-revalidate",
      },
      {
        key: "Service-Worker-Allowed",
        value: "/",
      },
    ];

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/favicon.ico",
        headers: staticAssetHeaders,
      },
      {
        source: "/:asset(icon-192|icon-512|icon-maskable-512).png",
        headers: staticAssetHeaders,
      },
      {
        source: "/:asset(next|vercel|file|globe|window).svg",
        headers: staticAssetHeaders,
      },
      {
        source: "/sw.js",
        headers: serviceWorkerHeaders,
      },
      {
        source: "/offline.html",
        headers: generatedMetadataHeaders,
      },
      {
        source: "/icon",
        headers: generatedMetadataHeaders,
      },
      {
        source: "/apple-icon",
        headers: generatedMetadataHeaders,
      },
      {
        source: "/manifest.webmanifest",
        headers: generatedMetadataHeaders,
      },
      {
        source: "/robots.txt",
        headers: generatedMetadataHeaders,
      },
    ];
  },
};

export default nextConfig;

import type { MetadataRoute } from "next";
import { absoluteURL } from "@/lib/helpers/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: absoluteURL("/sitemap.xml"),
  };
}
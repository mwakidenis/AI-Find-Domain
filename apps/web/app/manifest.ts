import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Find My Domain - AI-Powered Domain Name Generator",
    short_name: "Find My Domain",
    description:
      "Generate creative, brandable domain names using OpenAI GPT-4 and check availability in real-time across 25+ TLDs.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

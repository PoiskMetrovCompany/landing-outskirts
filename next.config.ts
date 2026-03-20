import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-dataout.trendagent.ru",
      },
      {
        protocol: "https",
        hostname: "storage.yandexcloud.net",
      },
    ],
  },
  sassOptions: {
    additionalData: '@use "@/app/mixins.scss" as *;',
  },
}

export default nextConfig

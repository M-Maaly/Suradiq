import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin(
  './i18n/request.ts'
);

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io"
      }
    ],
    qualities: [75, 100],
  }
};

export default withNextIntl(nextConfig);

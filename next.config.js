/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fsw-store.s3.sa-east-1.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;

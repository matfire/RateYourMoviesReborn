/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["*", "image.tmdb.org"],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;

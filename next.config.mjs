/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Cloudflare Pages 静态导出需要
  },
};

export default nextConfig;

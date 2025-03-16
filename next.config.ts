import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // 静的サイトとして出力
  images: {
    unoptimized: true, // Cloudflare Pagesでは画像最適化が不要
  },
  // Cloudflare Pagesでのデプロイに必要な設定
  trailingSlash: true,
};

export default nextConfig;

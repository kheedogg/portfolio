/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel 배포를 위해 output: 'export' 제거
  // basePath와 assetPrefix도 제거 (Vercel은 자체 도메인 사용)
  images: {
    domains: ['www.notion.so', 'lh5.googleusercontent.com', 's3-us-west-2.amazonaws.com'],
    // 로컬 이미지 최적화 허용
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    NOTION_PAGE_ID: process.env.NOTION_PAGE_ID,
  },
}

module.exports = nextConfig

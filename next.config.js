/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
  images: {
    unoptimized: true,
    domains: ['www.notion.so', 'lh5.googleusercontent.com', 's3-us-west-2.amazonaws.com'],
  },
  env: {
    NOTION_PAGE_ID: process.env.NOTION_PAGE_ID,
  },
}

module.exports = nextConfig

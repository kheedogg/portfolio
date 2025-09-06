/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    domains: [
      'www.notion.so',
      'lh3.googleusercontent.com',
      'lh5.googleusercontent.com',
      's3-us-west-2.amazonaws.com',
      's3.us-west-2.amazonaws.com'
    ],
  },
  env: {
    NOTION_PAGE_ID: process.env.NOTION_PAGE_ID,
  },
}

module.exports = nextConfig

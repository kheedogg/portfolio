const CONFIG = {
  // profile setting (required)
  profile: {
    name: "김도희",
    image: "/avatar.svg", // Auto-deploy test - If you want to create your own notion avatar, check out https://notion-avatar.vercel.app
    role: "Data/Backend Engineer",
    bio: "데이터 흐름을 관리하며 안정적인 서비스 제공으로 원할한 사용자 경험을 만들어내는 것에 집중하는 개발자입니다.",
    email: "kheedogg@gmail.com",
    linkedin: "https://www.linkedin.com/in/kheedogg/",
    github: "https://github.com/kheedogg",
    instagram: "",
  },
  projects: [
    {
      name: `portfolio`,
      href: "https://github.com/kheedogg/portfolio",
    },
  ],
  // blog setting (required)
  blog: {
    title: "Dohee Kim - Portfolio & Tech Blog",
    description: "개인 포트폴리오와 기술 블로그",
    scheme: "dark", // 'light' | 'dark' | 'system'
  },

  // CONFIG configration (required)
  link: "https://kheedogg.github.io/portfolio",
  since: 2025, // If leave this empty, current year will be used.
  lang: "en-US", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // The link to generate OG image, don't end with a slash

  // notion configuration (required)
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID,
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: false,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  naverSearchAdvisor: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: true,
    config: {
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO || "",
      "issue-term": "og:title",
      label: "💬 Utterances",
    },
  },
  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: "", // Embed Code -> data-app-id value
    },
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  revalidateTime: 21600 * 7, // revalidate time for [slug], index
}

module.exports = { CONFIG }

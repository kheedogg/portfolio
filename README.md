# 김도희 - Portfolio & Tech Blog

<img width="1715" alt="Portfolio Preview" src="https://user-images.githubusercontent.com/72514247/209824600-ca9c8acc-6d2d-4041-9931-43e34b8a9a5f.png">

Next.js로 구축된 정적 블로그 포트폴리오 사이트입니다. Notion을 CMS(Content Management System)로 사용하여 블로그 포스트와 이력서 페이지를 모두 지원합니다. GitHub Pages를 통해 배포됩니다.

[Live Site](https://kheedogg.github.io/portfolio) | [GitHub Repository](https://github.com/kheedogg/portfolio)

## About Me

**김도희 (Dohee Kim)**
- 🎯 Data/Backend Engineer  
- 📧 kheedogg@gmail.com
- 🔗 [GitHub](https://github.com/kheedogg) | [LinkedIn](https://www.linkedin.com/in/kheedogg/)

데이터 흐름을 관리하며 안정적인 서비스 제공으로 원활한 사용자 경험을 만들어내는 것에 집중하는 개발자입니다.

## Features

**📒 Notion을 활용한 포스트 작성**
- GitHub에 커밋할 필요 없이 웹사이트에 포스팅 가능
- Notion에서 작성한 포스트가 자동으로 사이트에 업데이트

**📄 이력서 페이지로 활용 가능**
- Notion을 사용해 풀페이지 사이트 생성 유용
- 이력서, 포트폴리오 등으로 활용 가능

**👀 SEO 친화적**
- 포스트용 OG 이미지(썸네일!) 동적 생성
- 포스트용 사이트맵 동적 생성

**🤖 설정을 통한 커스터마이징 및 다양한 플러그인 지원**
- Config를 통해 프로필 정보 업데이트 가능 (`site.config.js`)
- Google Analytics, Search Console, GitHub Issues를 활용한 댓글(Utterances) 또는 Cusdis 지원

## Tech Stack

- **Framework**: Next.js 13 (Pages Router)
- **Styling**: Emotion, Tailwind CSS
- **CMS**: Notion API
- **Deployment**: GitHub Pages
- **Language**: TypeScript
- **State Management**: TanStack Query (React Query)

## Getting Started

### Prerequisites

- Node.js 18+
- Notion 계정
- GitHub 계정

### Installation

1. 저장소 클론
```bash
git clone https://github.com/kheedogg/portfolio.git
cd portfolio
```

2. 의존성 설치
```bash
npm install --legacy-peer-deps
```

3. 환경변수 설정
`.env.local` 파일을 생성하고 다음 내용을 추가:
```env
# Notion Database Page ID (Required)
NOTION_PAGE_ID=your_notion_page_id

# Optional Analytics
NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_NAVER_SITE_VERIFICATION=
NEXT_PUBLIC_UTTERANCES_REPO=
```

4. 개발 서버 실행
```bash
npm run dev
```

5. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### Configuration

`site.config.js` 파일에서 개인 정보를 수정하세요:

```javascript
const CONFIG = {
  profile: {
    name: "김도희",
    role: "Data/Backend Engineer", 
    bio: "데이터 흐름을 관리하며...",
    email: "kheedogg@gmail.com",
    github: "kheedogg",
    linkedin: "kheedogg",
  },
  blog: {
    title: "Dohee Kim - Portfolio & Tech Blog",
    description: "개인 포트폴리오와 기술 블로그",
  },
  // ... 기타 설정
}
```

## Deployment

### GitHub Pages

1. GitHub Actions 워크플로우가 자동으로 설정됨
2. `main` 브랜치에 push하면 자동 배포
3. `https://[username].github.io/portfolio`에서 확인

### Manual Build

```bash
npm run build
npm run export
```

## Project Structure

```
portfolio/
├── public/                 # 정적 파일
├── src/
│   ├── apis/              # Notion API 관련
│   ├── components/        # 재사용 가능한 컴포넌트
│   ├── layouts/           # 레이아웃 컴포넌트
│   ├── pages/             # Next.js 페이지 (Pages Router)
│   ├── routes/            # 라우트별 컴포넌트
│   ├── styles/            # 스타일 관련
│   └── types/             # TypeScript 타입 정의
├── site.config.js         # 사이트 설정
└── .env.local            # 환경변수
```

## Based on morethan-log

이 프로젝트는 [morethan-log](https://github.com/morethanmin/morethan-log)를 기반으로 개인 포트폴리오 사이트로 커스터마이징했습니다.

Original morethan-log 개발자: [@morethanmin](https://github.com/morethanmin)

## License

The [MIT License](LICENSE).

---

⚡ **Built with passion for clean code and great user experience**

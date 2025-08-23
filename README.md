# 📚 Portfolio & Tech Blog

> 개인 이력서와 기술 블로그를 포함한 정적 웹사이트 프로젝트

## 🎯 프로젝트 목표

- ✅ GitHub Pages를 활용한 정적 웹사이트 호스팅
- ✅ 개인 이력서 페이지
- ✅ 카테고리별 기술 블로그
- ✅ 댓글 기능 제공

## 🏗️ 기술 스택

- **Framework**: Next.js 14 (Static Site Generation)
- **Styling**: Tailwind CSS + CSS Modules
- **Comments**: Utterances (GitHub Issues 기반)
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📁 프로젝트 구조

```
portfolio/
├── .github/workflows/      # GitHub Actions 배포 설정
├── public/                 # 정적 파일
├── imgs/                   # 이미지 리소스
├── references/             # 이력서 데이터
├── src/
│   ├── app/               # Next.js App Router
│   ├── components/        # React 컴포넌트
│   ├── lib/              # 유틸리티 함수
│   └── styles/           # 스타일 파일
└── content/              # 블로그 콘텐츠 (Markdown)
```

## 📝 작업 진행 상황

### ✅ 완료된 작업
- [x] 프로젝트 아키텍처 설계
- [x] 참고 레포지토리 분석
- [x] 디렉토리 구조 생성
- [x] package.json 및 설정 파일 작성
  - Next.js 14 설정
  - TypeScript 설정
  - Tailwind CSS 설정
  - GitHub Actions 배포 워크플로우

### 🚧 진행 중인 작업
- [ ] 메인 페이지 (이력서) 구현
- [ ] 블로그 시스템 구현
- [ ] 댓글 기능 통합

## 🚀 시작하기

### 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 배포
npm run deploy
```

## 📖 참고 자료

- [참고 GitHub 레포지토리](https://github.com/KimYC1223/KimYC1223.github.io)
- [블로그 테마 참고](https://github.com/morethanmin/morethan-log)

## 📅 개발 로그

### 2025-08-23
- 프로젝트 초기 설정
- 아키텍처 설계 완료
- README.md 작성
- 디렉토리 구조 생성 완료
- 설정 파일 작성 완료:
  - package.json (Next.js 14, TypeScript, Tailwind CSS)
  - next.config.js (GitHub Pages 배포 설정)
  - tsconfig.json (TypeScript 설정)
  - tailwind.config.js (스타일링 설정)
  - GitHub Actions 워크플로우 설정
- npm 의존성 설치 완료
- 개발 서버 실행 성공 (http://localhost:3000)
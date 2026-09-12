import { TPosts } from "src/types"

// URL 세그먼트 최대 길이. 한글은 퍼센트 인코딩되며 길어지므로 너무 키우지 않는다.
const SLUG_MAX_LENGTH = 60

// /resume는 직접 만든 정적 페이지(src/pages/resume.tsx)다.
// Notion slug가 resume인 글은 그 페이지를 계속 가리키도록 제목 기반 slug를 만들지 않는다.
export const RESERVED_SLUGS = new Set(["resume"])

/**
 * 제목을 URL 세그먼트로 바꾼다.
 * 한글은 그대로 두고 문자/숫자가 아닌 문자만 구분자(-)로 정리한다.
 */
export const slugifyTitle = (title: string) => {
  const slug = title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")

  if (slug.length <= SLUG_MAX_LENGTH) return slug

  // 잘린 자리가 단어 중간이면 직전 구분자까지만 남긴다
  const truncated = slug.slice(0, SLUG_MAX_LENGTH)
  const lastDash = truncated.lastIndexOf("-")
  return (lastDash > 0 ? truncated.slice(0, lastDash) : truncated).replace(
    /-+$/,
    ""
  )
}

const shortId = (id: string) => id.replace(/-/g, "").slice(0, 8)

/**
 * 각 글에 URL로 쓸 urlSlug를 붙인다.
 * 제목이 겹치는 글이 있으면 겹치는 쪽 전부에 id를 붙인다.
 * 한쪽만 붙이면 글이 추가될 때 기존 글의 URL이 바뀌어 링크가 깨진다.
 */
export const withUrlSlugs = (posts: TPosts): TPosts => {
  const baseCounts = new Map<string, number>()
  for (const post of posts) {
    const base = slugifyTitle(post.title || "")
    baseCounts.set(base, (baseCounts.get(base) ?? 0) + 1)
  }

  return posts.map((post) => {
    if (RESERVED_SLUGS.has(post.slug)) {
      return { ...post, urlSlug: post.slug }
    }

    const base = slugifyTitle(post.title || "")
    // 제목이 비었거나 기호뿐이면 id만으로 구분한다
    if (!base) return { ...post, urlSlug: shortId(post.id) }

    const urlSlug =
      (baseCounts.get(base) ?? 0) > 1 ? `${base}-${shortId(post.id)}` : base
    return { ...post, urlSlug }
  })
}

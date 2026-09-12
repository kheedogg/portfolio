import Detail from "src/routes/Detail"
import { filterPosts } from "src/libs/utils/notion"
import { CONFIG } from "site.config"
import { NextPageWithLayout } from "../types"
import CustomError from "src/routes/Error"
import { getRecordMap, getPosts } from "src/apis"
import MetaConfig from "src/components/MetaConfig"
import { GetStaticProps } from "next"
import { queryClient } from "src/libs/react-query"
import { queryKey } from "src/constants/queryKey"
import { dehydrate } from "@tanstack/react-query"
import usePostQuery from "src/hooks/usePostQuery"
import { FilterPostsOptions } from "src/libs/utils/notion/filterPosts"
import { RESERVED_SLUGS } from "src/libs/utils/notion/getUrlSlug"

const filter: FilterPostsOptions = {
  acceptStatus: ["Public", "PublicOnDetail"],
  acceptType: ["Paper", "Post", "Page"],
}

export const getStaticPaths = async () => {
  try {
    const posts = await getPosts()
    const filteredPost = filterPosts(posts, filter)

    return {
      paths: filteredPost
        // /resume 등 직접 만든 정적 페이지와 겹치는 경로는 만들지 않는다
        .filter((row) => !RESERVED_SLUGS.has(row.urlSlug))
        .map((row) => `/${row.urlSlug}`),
      fallback: 'blocking', // ISR: 새로운 페이지 요청 시 서버에서 생성
    }
  } catch (error) {
    console.error("Error in getStaticPaths:", error)
    return {
      paths: [],
      fallback: false,
    }
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug

  try {
    const posts = await getPosts()
    const feedPosts = filterPosts(posts)
    await queryClient.prefetchQuery(queryKey.posts(), () => feedPosts)

    const detailPosts = filterPosts(posts, filter)
    const postDetail = detailPosts.find((t) => t.urlSlug === slug)

    if (!postDetail) {
      // 이전 주소(Notion slug)로 들어온 요청은 같은 slug의 최신 글로 넘긴다.
      // detailPosts는 getPosts에서 날짜 내림차순으로 정렬돼 있어 첫 번째가 최신이다.
      const legacyTarget = detailPosts.find((t) => t.slug === slug)
      if (legacyTarget && legacyTarget.urlSlug !== slug) {
        return {
          redirect: {
            // Location 헤더에는 비ASCII를 그대로 넣을 수 없다
            destination: `/${encodeURIComponent(legacyTarget.urlSlug)}/`,
            permanent: true,
          },
        }
      }
      return {
        // Notion 일시 오류로 목록이 비었을 수 있다.
        // revalidate가 없으면 그 404가 재배포 전까지 캐시되므로 반드시 붙인다.
        notFound: true,
        revalidate: 60,
      }
    }

    const recordMap = await getRecordMap(postDetail.id)
    
    // recordMap이 너무 큰 경우 최소화
    const minimalRecordMap = {
      ...recordMap,
      // collection_query 제거 (큰 데이터이며 필수 아님)
      collection_query: {},
      // signed_urls 제거 (임시 URL이며 재생성 가능)
      signed_urls: {}
    }

    await queryClient.prefetchQuery(queryKey.post(`${slug}`), () => ({
      ...postDetail,
      recordMap: minimalRecordMap,
    }))

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
      revalidate: 60, // ISR: 60초마다 재생성
    }
  } catch (error) {
    console.error("Error in getStaticProps for slug:", slug, error)
    return {
      notFound: true,
      revalidate: 60,
    }
  }
}

const DetailPage: NextPageWithLayout = () => {
  const post = usePostQuery()

  if (!post) return <CustomError />

  const image =
    post.thumbnail ??
    CONFIG.ogImageGenerateURL ??
    `${CONFIG.ogImageGenerateURL}/${encodeURIComponent(post.title)}.png`

  const date = post.date?.start_date || post.createdTime || ""

  const meta = {
    title: post.title,
    date: new Date(date).toISOString(),
    image: image,
    description: post.summary || "",
    type: post.type[0],
    url: `${CONFIG.link}/${post.urlSlug}`,
  }

  return (
    <>
      <MetaConfig {...meta} />
      <Detail />
    </>
  )
}

DetailPage.getLayout = (page) => {
  return <>{page}</>
}

export default DetailPage

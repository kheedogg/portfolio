import { NotionAPI } from "notion-client"

export const getRecordMap = async (pageId: string) => {
  try {
    const api = new NotionAPI()
    const recordMap = await api.getPage(pageId, {
      signFileUrls: false,
      fetchMissingBlocks: false,
      fetchCollections: false
    })
    return recordMap
  } catch (error) {
    console.error(`Error fetching record map for page ${pageId}:`, error)
    // 에러 발생 시 빈 recordMap 반환하여 빌드 실패 방지
    return {
      block: {},
      collection: {},
      collection_view: {},
      notion_user: {},
      collection_query: {},
      signed_urls: {}
    }
  }
}

import { CONFIG } from "site.config"
import { NotionAPI } from "notion-client"
import { idToUuid } from "notion-utils"

import getAllPageIds from "src/libs/utils/notion/getAllPageIds"
import getPageProperties from "src/libs/utils/notion/getPageProperties"
import { TPosts } from "src/types"

/**
 * @param {{ includePages: boolean }} - false: posts only / true: include pages
 */

// TODO: react query를 사용해서 처음 불러온 뒤로는 해당데이터만 사용하도록 수정
export const getPosts = async () => {
  try {
    let id = CONFIG.notionConfig.pageId as string
    
    if (!id) {
      console.error("NOTION_PAGE_ID is not configured")
      return []
    }

    const api = new NotionAPI()
    const response = await api.getPage(id)
    
    id = idToUuid(id)
    const collection = Object.values(response.collection)[0]?.value
    const block = response.block
    const schema = collection?.schema

    const rawMetadata = block[id]?.value

    // Check Type
    if (
      rawMetadata?.type !== "collection_view_page" &&
      rawMetadata?.type !== "collection_view"
    ) {
      console.warn("Invalid Notion page type:", rawMetadata?.type)
      return []
    } else {
      // Construct Data
      const pageIds = getAllPageIds(response)
      const data = []
      
      for (let i = 0; i < pageIds.length; i++) {
        try {
          const id = pageIds[i]
          const properties = (await getPageProperties(id, block, schema)) || null
          
          if (properties) {
            // Add fullwidth, createdtime to properties
            properties.createdTime = new Date(
              block[id]?.value?.created_time
            ).toString()
            properties.fullWidth =
              (block[id]?.value?.format as any)?.page_full_width ?? false

            data.push(properties)
          }
        } catch (error) {
          console.error(`Error processing page ${pageIds[i]}:`, error)
          // 개별 페이지 에러는 건너뛰고 계속 진행
        }
      }

      // Sort by date
      data.sort((a: any, b: any) => {
        const dateA: any = new Date(a?.date?.start_date || a.createdTime)
        const dateB: any = new Date(b?.date?.start_date || b.createdTime)
        return dateB - dateA
      })

      const posts = data as TPosts
      return posts
    }
  } catch (error) {
    console.error("Error fetching posts from Notion:", error)
    return []
  }
}

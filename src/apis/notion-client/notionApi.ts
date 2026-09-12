import { NotionAPI } from "notion-client"

import { notionGotOptions } from "./gotOptions"

/**
 * Notion의 비공식 api/v3가 recordMap 레코드를 한 겹 더 감싸도록 바뀌었다.
 *   before: block[id] = { role, value: <block> }
 *   after:  block[id] = { spaceId, value: { role, value: <block> } }
 * notion-client/notion-utils/react-notion-x는 모두 이전 형태를 기대하므로
 * 응답을 받는 즉시 예전 형태로 펴준다.
 */
const unwrapRecordMap = (recordMap: any) => {
  if (!recordMap || typeof recordMap !== "object") return

  for (const table of Object.keys(recordMap)) {
    const records = recordMap[table]
    if (!records || typeof records !== "object") continue

    for (const id of Object.keys(records)) {
      const entry = records[id]
      const nested = entry?.value
      if (nested && typeof nested === "object" && "value" in nested) {
        records[id] = { ...entry, role: nested.role, value: nested.value }
      }
    }
  }
}

class PatchedNotionAPI extends NotionAPI {
  async fetch<T>(args: Parameters<NotionAPI["fetch"]>[0]): Promise<T> {
    const response = (await super.fetch<T>(args)) as any
    unwrapRecordMap(response?.recordMap)
    unwrapRecordMap(response?.recordMapWithRoles)
    return response as T
  }
}

export const createNotionApi = () => new PatchedNotionAPI()

export { notionGotOptions }

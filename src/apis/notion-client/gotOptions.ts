/**
 * Notion의 비공식 api/v3 엔드포인트는 got의 기본 User-Agent를 403으로 차단한다.
 * 브라우저 UA를 실어 보내야 loadPageChunk/queryCollection이 정상 응답한다.
 */
export const notionGotOptions = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  },
}

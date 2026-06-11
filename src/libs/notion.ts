import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'

/**
 * Extract the 32-char hex page ID from a Notion URL.
 * Example: "https://www.notion.so/Title-2f61de4f6c5a805a8604c3c0ec833537" → "2f61de4f6c5a805a8604c3c0ec833537"
 */
export function extractPageId(url: string): string | null {
  const match = url.match(/([a-f0-9]{32})(?:\?|$)/)
  return match ? match[1] : null
}

/**
 * Convert 32-char hex page ID to UUID format with dashes.
 * "2f61de4f6c5a805a8604c3c0ec833537" → "2f61de4f-6c5a-805a-8604-c3c0ec833537"
 */
export function toUUID(pageId: string): string {
  return `${pageId.slice(0, 8)}-${pageId.slice(8, 12)}-${pageId.slice(12, 16)}-${pageId.slice(16, 20)}-${pageId.slice(20)}`
}

const token = import.meta.env.NOTION_TOKEN

export async function fetchNotionMarkdown(url: string): Promise<string> {
  if (!token) {
    return ''
  }

  const pageId = extractPageId(url)
  if (!pageId) {
    return ''
  }

  const notion = new Client({ auth: token })
  const n2m = new NotionToMarkdown({ notionClient: notion })

  try {
    const mdBlocks = await n2m.pageToMarkdown(toUUID(pageId))
    return n2m.toMarkdownString(mdBlocks).parent || ''
  } catch (e) {
    console.warn(`[notion] Failed to fetch page ${pageId}:`, e)
    return ''
  }
}

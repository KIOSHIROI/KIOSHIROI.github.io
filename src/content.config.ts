import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array
  const lowercaseItems = array.map((str) => str.toLowerCase())
  const distinctItems = new Set(lowercaseItems)
  return Array.from(distinctItems)
}

// Shared schema for both collections
const blogSchema = ({ image }: { image: () => any }) =>
  z.object({
    // Required
    title: z.string().max(60),
    description: z.string().max(160),
    publishDate: z.coerce.date(),
    // Optional
    updatedDate: z.coerce.date().optional(),
    heroImage: z
      .object({
        src: image(),
        alt: z.string().optional(),
        inferSize: z.boolean().optional(),
        width: z.number().optional(),
        height: z.number().optional(),

        color: z.string().optional()
      })
      .optional(),
    tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
    category: z.string().optional(),
    language: z.string().optional(),
    draft: z.boolean().default(false),
    // Integrations
    comment: z.boolean().default(true),
    pixivLink: z.string().optional()
  })

const blog = defineCollection({
  // Load Chinese version: index.md or index.mdx
  loader: glob({ base: './src/content/blog', pattern: '**/index.{md,mdx}' }),
  schema: blogSchema
})

const blogEn = defineCollection({
  // Load English version: index-en.md or index-en.mdx
  loader: glob({ base: './src/content/blog', pattern: '**/index-en.{md,mdx}' }),
  schema: blogSchema
})

export const collections = { blog, blogEn }

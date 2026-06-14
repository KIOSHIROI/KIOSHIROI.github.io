/**
 * Create a new post in the content directory
 *
 * Usage: astro-axi new [options] <post-title>
 *
 * Options:
 *   -l, --lang <en|zh>   Set the language (default: en)
 *   -d, --draft          Create a draft post (default: false)
 *   -m, --mdx            Use MDX format (default: false)
 *   -h, --help           Show this help message
 *
 * Example:
 *   astro-axi new "Hello World"
 *   astro-axi new -l zh "你好，世界"
 */

import fs from 'node:fs'
import path from 'node:path'

import minimist from './libs/minimist.cjs'
import slugify from './libs/slugify.cjs'

function getDate() {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getPostSlug(postTitle) {
  let slug = slugify(postTitle).toLocaleLowerCase()
  if (slug === '' || slug === 'untitled') {
    // Chinese-only title → use date-based slug
    const now = new Date()
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    slug = `post-${now.getFullYear()}${mm}${dd}`
  }
  return slug
}

const HELP_INFO = `Usage: astro-axi new [options] <post-title>

Options:
  -l, --lang           Set the language (default: null)
  -d, --draft          Create a draft post (default: false)
  -m, --mdx            Use MDX format (default: false)
  -h, --help           Show this help message

Example:
  astro-axi new "Hello World"
  astro-axi new -l zh "你好，世界"
`
const TARGET_DIR = 'src/content/blog/'

export default function main(args) {
  const parsedArgs = minimist(args, {
    string: ['lang'],
    boolean: ['draft', 'mdx', 'help'],
    default: {
      lang: null,
      draft: false,
      mdx: false
    },
    alias: {
      l: 'lang',
      d: 'draft',
      m: 'mdx',
      h: 'help'
    }
  })

  if (parsedArgs.help) {
    console.log(HELP_INFO)
    process.exit(0)
  }

  let postTitle = parsedArgs._.join(' ') // join the rest of the arguments
  if (!postTitle || postTitle.trim() === '') {
    postTitle = 'Untitled'
  }
  console.log('Creating new post:', postTitle)

  const fileExtension = parsedArgs.mdx ? '.mdx' : '.md'
  const slug = getPostSlug(postTitle)
  const postDir = path.join(TARGET_DIR, slug)
  const fileName = 'index' + fileExtension
  const fullPath = path.join(postDir, fileName)

  console.log('Full path:', fullPath)

  if (fs.existsSync(postDir)) {
    console.error(`ERROR: Directory ${postDir} already exists`)
    process.exit(1)
  }

  fs.mkdirSync(postDir, { recursive: true })

  let content = `---
title: '${postTitle}'
description: 'Write your description here.'
publishDate: ${getDate()}
category: 'tech'
`
  content += parsedArgs.draft ? 'draft: true\n' : ''
  content += parsedArgs.lang ? `lang: ${parsedArgs.lang}\n` : ''
  content += `tags: ['tag1', 'tag2']
comment: true
---

Write your content here.
`

  fs.writeFileSync(fullPath, content)
  console.log(`Post "${postTitle}" created at ${fullPath}`)
}

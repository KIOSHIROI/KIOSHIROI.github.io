# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
- `bun dev` - Start development server with hot reload
- `bun dev:check` - Development server with TypeScript checking
- `bun build` - Production build with type checking
- `bun check` - Run Astro type checking
- `bun lint` - ESLint with auto-fix
- `bun format` - Prettier formatting for all files
- `bun yijiansilian` - Run all checks (lint + sync + check + format)

### Platform-Specific Builds
- `bun build:vercel` - Build for Vercel deployment
- `bun build:cloudflare` - Build for Cloudflare Pages
- `bun build:github` - Build for GitHub Pages

### Utility Commands
- `bun sync` - Sync Astro content collections
- `bun preview` - Preview production build locally
- `bun clean` - Remove build artifacts (.astro, .vercel, dist, .wrangler directories)

## Architecture Overview

### Core Architecture
This is an Astro-based bilingual blog platform with a **custom integration system**. The `AstroAxiIntegration` acts as the central orchestrator, automatically configuring MDX, Tailwind, Sitemap, and other integrations based on the configuration in `src/site.config.ts`.

### Key Components
- **Configuration**: Everything is driven by `src/site.config.ts` with strong TypeScript schemas
- **Custom Integration**: `src/axi-integration.ts` manages all other integrations automatically
- **Plugin System**: Extensive custom Remark/Rehype plugins in `src/plugins/`
- **Multi-Platform Deployment**: Supports Vercel (SSR), Cloudflare Pages (static), and GitHub Pages (static)

### Content Structure
- **Bilingual Support**: 
  - All blog content in: `src/content/blog/`
  - Chinese version: `index.md` or `index.mdx` (default)
  - English version: `index-en.md` or `index-en.mdx` (optional)
  - Auto-fallback: If English version doesn't exist, shows Chinese content
  - URL structure: `/` (Chinese) and `/en/` (English)
- **Content Types**: Both `.md` and `.mdx` files with Zod-validated frontmatter
- **Collections**: Managed via `src/content.config.ts`

### Component Organization
```
src/components/
├── basic/        # Core UI (Header, Footer, ThemeProvider)
├── advanced/     # Feature components (Comments, GitHub cards, Link previews)
├── pages/        # Page-specific (TOC, Pagination, Article layout)
└── user/         # Reusable UI (Cards, Buttons, Icons)
```

### Layout Hierarchy
All layouts extend from `BaseLayout.astro`:
- `BaseLayout` → `ContentLayout` → `BlogPost`/`CommonPage`/`IndividualPage`

## Important Configuration Files

### `src/site.config.ts`
Central configuration that controls:
- Theme settings (title, author, description, logo)
- Header/footer configuration
- Integration settings (comments, search, typography)
- Locale settings for bilingual support

### `astro.config.mjs`
- Platform detection via `DEPLOYMENT_PLATFORM` environment variable
- Adapter selection (Vercel/Cloudflare/static)
- Custom plugin chain for markdown processing
- Shiki syntax highlighting configuration

## Content Management

### Blog Post Creation
1. Create new folder in `src/content/blog/`
2. Add `index.md` or `index.mdx` file (Chinese version)
3. Optionally add `index-en.md` or `index-en.mdx` file (English translation)
4. Required frontmatter:
   ```yaml
   title: "Post Title"
   description: "Brief description"
   publishDate: 2024-01-01
   tags: ["tag1", "tag2"]
   draft: false
   comment: true
   ```

### Research Paper Reading Pages
- Research-category paper reading pages that list papers with `ArxivRating` should contain
  at most 25 papers per page.
- Fill the current numbered page to 25 papers before creating the next page; do not split a
  series early just by subtopic if the current page has room.
- When a topic exceeds 25 papers, put only the overflow into the next numbered batch page,
  such as `paper-reading-cv2`, and add a `ManualTOC` batch navigator on every page in that
  series.
- Use the `paper-reading-eba*` pages as the reference pattern for batch names and links.

### Image Hosting
- When an image source comes from `https://Minakanmi-Yuki.github.io/picx-images-hosting/`,
  store it in content as `https://pic.hana0721.top/` with the same filename/path.
- Use the `pic.hana0721.top` domain for future images from that image host.

### Content Processing Pipeline
1. Zod validation of frontmatter in `src/content.config.ts`
2. Remark plugins for markdown enhancement
3. Rehype plugins for HTML processing
4. Shiki transformers for code highlighting
5. Custom plugins for features (TOC, external links, etc.)

## Custom Features

### Search Functionality
- **Pagefind**: Client-side search with automatic indexing
- Generated post-build via custom integration
- Searchable across all content

### Comment System
- **Waline**: Self-hosted commenting system
- Configuration in `src/site.config.ts` under `integ.waline`
- Server URL: `https://waline.axi404.top/`

### Enhanced Markdown
- **Math support**: KaTeX rendering via remark-math/rehype-katex
- **Code highlighting**: Custom Shiki transformers with copy buttons
- **External links**: Automatic external link indicators
- **Image zoom**: Medium-zoom integration for images

## Deployment

### Environment Variables
Set `DEPLOYMENT_PLATFORM` to control build behavior:
- `vercel` (default): SSR with Vercel adapter
- `cloudflare`: Static build for Cloudflare Pages
- `github`: Static build for GitHub Pages

### Build Process
1. TypeScript checking (`astro check`)
2. Content collection validation
3. Plugin processing and transformation
4. Search index generation (Pagefind)
5. Asset optimization and bundling

## Development Guidelines

### Adding New Blog Posts
- Use the existing weekly numbering system for regular posts
- Template files (`template-X`) are available for reference
- Ensure both Chinese and English versions for bilingual support

### Modifying Components
- Follow the existing component organization pattern
- Import components through index files (`src/components/*/index.ts`)
- Use TypeScript for all new components

### Plugin Development
- Custom plugins go in `src/plugins/`
- Follow the existing plugin patterns for Remark/Rehype
- Register plugins in `astro.config.mjs` markdown configuration

### Styling
- Uses Tailwind CSS with custom theme configuration
- Prose styles via `@tailwindcss/typography`
- Custom CSS classes defined in `src/assets/styles/`

## Troubleshooting

### Build Issues
- Run `bun check` to verify TypeScript issues
- Use `bun sync` to regenerate content collections
- Check frontmatter validation in blog posts

### Development Server Issues
- Use `bun dev:check` for real-time type checking
- Clear build cache with `bun clean`
- Ensure all required environment variables are set

# Repository Guidelines

## Project Structure & Module Organization

This is an Astro 5 + TypeScript + Tailwind CSS bilingual blog. Core source lives in `src/`.
Pages are file-based routes in `src/pages/`, with English mirrors under `src/pages/en/`.
Reusable UI is grouped in `src/components/` by purpose, including `basic/`, `home/`,
`pages/`, `advanced/`, and `user/`. Layouts are in `src/layouts/`; helpers and schemas are in
`src/libs/`, `src/utils/`, `src/schemas/`, and `src/types/`. Blog posts live in
`src/content/blog/<slug>/` using `index.md(x)` for Chinese and optional `index-en.md(x)` for
English. Static assets are in `src/assets/`, `public/`, and `preset/icons/`.

## Build, Test, and Development Commands

- `npm run dev`: start the local Astro dev server.
- `npm run dev:check`: serve with Astro checking in watch mode.
- `npm run check`: validate Astro, TypeScript, and content.
- `npm run build`: run `astro check` and create a production build in `dist/`.
- `npm run preview`: preview the production build locally.
- `npm run lint:check`: report ESLint issues without modifying files.
- `npm run lint`: run ESLint with auto-fix on source files.
- `npm run format`: format JS, TS, Astro, Markdown, and MDX files with Prettier.
- `npm run quality`: lint, sync metadata, type-check, and format.

## Coding Style & Naming Conventions

Use 2-space indentation, single quotes, no semicolons, LF endings, and a 100-character print
width. Prettier sorts imports and Tailwind classes. Use PascalCase for Astro components and
types, camelCase for functions and variables, and kebab-case for route folders and blog slugs
such as `src/content/blog/rustdesk-cli-server-setup/`.

## Testing Guidelines

There is no separate unit test suite. Treat `npm run check`, `npm run lint:check`, and
`npm run build` as the validation path for code, schema, content, and routing changes. For
content-only edits, at least run `npm run check`; for config, plugins, routes, or shared
components, run `npm run build`.

## Commit & Pull Request Guidelines

Recent history uses short imperative or scoped messages, for example `Add hero image for
RustDesk post`, `blog: add github email binding and verification flow`, and `b:clash`. Prefer
clear scopes like `blog: add tmux workflow post`.

Pull requests should describe the user-facing change, list validation commands run, and link
related issues when applicable. Include screenshots for visual changes. Note bilingual impact,
especially when only Chinese or English content was updated.

## Configuration & Deployment Notes

Site-wide settings live in `src/site.config.ts`; Astro, markdown, adapter, and platform logic
live in `astro.config.mjs`. Set `DEPLOYMENT_PLATFORM` to `vercel`, `cloudflare`, or `github`.

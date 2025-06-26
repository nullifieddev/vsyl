This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## CSS Modules Policy

- All component styles must use [CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules) for local scoping. Name files as `ComponentName.module.css` and import them directly in the component file.
- Global styles (resets, variables, font imports) belong only in `app/globals.css`.
- See `src/components/SampleButton.tsx` and `SampleButton.module.css` for a usage example.

## Routing & Localization

- The homepage now uses a locale-based structure: `/es` (Spanish, default) and `/en` (English).
- The root route (`/`) redirects to `/es`.
- Add new pages for additional locales under `src/app/[locale]/page.tsx`.

## Locale-aware Routing & Navigation

- All navigation links, including Header and Footer, are locale-aware and use the correct `/es` or `/en` prefix.
- The language switcher in the Header maps to the equivalent page in the other language (where available).
- The `<html lang>` attribute is set dynamically for accessibility and SEO.
- The privacy policy link in the Footer is locale-aware.
- To add new pages for a locale, create them under `src/app/[locale]/`.

## Global Layout & Accessibility

- The global layout uses semantic HTML5: `<html>`, `<body>`, and `<main>`.
- The `lang` attribute is set for accessibility and SEO (default: `es`).
- A skip-to-content link is provided for keyboard and screen reader users.
- All pages are wrapped in `<main id="main-content">` for consistent structure.
- Font variables and color palette are globally available.

## Environment Variables for Sanity API

The following variables must be set in `.env.local` (and in Vercel dashboard for production):

- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID (public, required)
- `NEXT_PUBLIC_SANITY_DATASET`: Dataset name (e.g., `production`, public, required)
- `NEXT_PUBLIC_SANITY_API_VERSION`: Sanity API version (e.g., `2023-06-01`, public, required)
- `SANITY_API_READ_TOKEN`: Read-only token for server-side authenticated requests (never expose to client, optional but required for preview/secure data)

**Never commit real tokens to the repo.**

## Sanity Data Fetching Utility

A utility is provided in `src/lib/sanity.ts` for GROQ-based data fetching:

```ts
import { fetchSanity } from '@/lib/sanity';
const posts = await fetchSanity<PostType>(`*[_type == "post"]{title, slug}`);
```
- Uses environment variables for configuration.
- Supports both public and authenticated (token) requests.
- Fully typed and ready for SSG/SSR.

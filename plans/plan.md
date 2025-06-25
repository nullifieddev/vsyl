### Project Plan: The Unapologetic Sanctuary

---

## Phase 1: Project Initialization & Environment Setup

- [ ] Create a new monorepo structure with separate directories for `frontend` (Next.js) and `studio` (Sanity.io).
- [ ] Initialize Git repository and connect to GitHub.
- [ ] Set up `.gitignore` for Node, Next.js, and Sanity.
- [ ] Install Node.js (v18+) and npm/yarn on the Ubuntu development machine.
- [ ] Scaffold Next.js (v14+, App Router, TypeScript) in the `frontend` directory.
- [ ] Scaffold Sanity.io Studio (v3, TypeScript) in the `studio` directory.
- [ ] Configure Prettier and ESLint for consistent code style in both apps.
- [ ] Create `.env.local` files for both `frontend` and `studio` with required environment variables.
- [ ] Add base README with project structure and setup instructions.
- [ ] Verify both apps run independently with `npm run dev`.

---

## Phase 2: Sanity.io Studio Scaffolding & Schema Definition

- [ ] Define the `blockContent` schema for rich text fields.
- [ ] Implement the `category` schema as specified in the TRD.
- [ ] Implement the `post` schema, including all fields, validation, and preview logic per TRD and PRD.
- [ ] Configure role-based field access and UI for `Autor` and `Editor` as described in the PRD.
- [ ] Set up initial datasets and seed with example categories.
- [ ] Configure Sanity Studio for mobile-first (`Autor`) and desktop-first (`Editor`) experiences.
- [ ] Implement publishing controls for Spanish and English versions.
- [ ] Test schema relationships and validation rules.
- [ ] Set up Sanity API tokens (read-only for frontend, read/write for Studio).
- [ ] Document the content model and editorial workflow in the repo.

---

## Phase 3: Next.js Frontend Foundation

- [ ] Configure Next.js App Router with TypeScript.
- [ ] Set up global CSS variables for color palette, font families (Lora, Montserrat), and base resets.
- [ ] Integrate Google Fonts or self-host Lora and Montserrat.
- [ ] Configure CSS Modules for component-scoped styling.
- [ ] Set up the `/app/[locale]/` directory structure for multi-lingual routing.
- [ ] Implement a global layout component with semantic HTML structure.
- [ ] Integrate the Next.js `next/image` component for all images.
- [ ] Configure environment variables for Sanity API access.
- [ ] Set up utility functions for Sanity data fetching (using GROQ).
- [ ] Add accessibility (a11y) linting and testing tools.

---

## Phase 4: Core Component Development

- [ ] Design and implement the `Header` component (logo, navigation, language switcher) per PRD.
- [ ] Design and implement the `Footer` component (social links, Equinox symbol, copyright).
- [ ] Build the `ArticleCard` component for blog previews.
- [ ] Create the `Button` component with accent color and calm invitation style.
- [ ] Develop the `NewsletterCTA` component with accessible form.
- [ ] Implement the `CategoryFilter` component for blog archive filtering.
- [ ] Create the `HorizontalLine` SVG motif as a reusable component.
- [ ] Build the `ImageWithShadow` component for golden hour imagery.
- [ ] Develop the `MetaInfo` component for post metadata (date, category).
- [ ] Ensure all components are fully accessible and keyboard-navigable.
- [ ] Write unit tests for all core components using Jest and React Testing Library.

---

## Phase 5: Page Assembly & Static Generation

- [ ] Assemble the Homepage (`/es`, `/en`) using Hero, Featured Articles, and Newsletter CTA sections.
- [ ] Build the Blog Archive page (`/es/blog`, `/en/blog`) with category filtering and pagination.
- [ ] Implement the Blog Post page (`/es/blog/[slug]`, `/en/blog/[slug]`) with SSG, metadata, feature image, and related articles.
- [ ] Assemble the About page (`/es/sobre-mi`, `/en/about`) with biography and image.
- [ ] Build the Coaching page (`/es/coaching`, `/en/coaching`) with service details and mailto CTA.
- [ ] Implement the Privacy Policy page and link from the footer.
- [ ] Ensure all pages use SSG via `generateStaticParams` and fetch data from Sanity.
- [ ] Integrate the `next/image` component for all images on every page.
- [ ] Test all pages for accessibility and responsive design.

---

## Phase 6: Multi-lingual & Editorial Workflow Implementation

- [ ] Implement locale-aware routing and navigation throughout the site.
- [ ] Build the Language Switcher logic to map equivalent pages between `es` and `en`.
- [ ] Adjust Sanity GROQ queries to fetch language-specific fields based on `[locale]`.
- [ ] Filter posts on the frontend to only display those with the correct `publishingControls` flags set to `true`.
- [ ] Ensure category filtering and pagination work independently for each locale.
- [ ] Test language switching for all pages and verify correct content is displayed.
- [ ] Document the multi-lingual data-fetching strategy in the codebase.

---

## Phase 7: Finalization, Testing, and Deployment Strategy

- [ ] Write integration tests for Sanity data fetching and mapping.
- [ ] Implement E2E tests (Cypress or Playwright) for critical user flows: navigation, language switching, filtering, newsletter signup.
- [ ] Conduct manual QA on Chrome, Firefox, Safari, and multiple device sizes.
- [ ] Optimize images and static assets for performance.
- [ ] Configure Vercel deployment for both `frontend` and `studio` apps.
- [ ] Set up Vercel environment variables and Sanity webhook for automatic rebuilds.
- [ ] Verify production build achieves Lighthouse scores of 90+ for Performance, Accessibility, and SEO.
- [ ] Review all code for adherence to DRY, accessibility, and design philosophy.
- [ ] Prepare and deliver final project documentation.

---

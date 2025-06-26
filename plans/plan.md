### **Project Plan: The Unapologetic Sanctuary (v1.2)**

**Version:** 1.2
**Date:** June 26th, 2025

---

### **Phase 1: Project Initialization & Environment Setup**

- [x] Create a new monorepo structure with separate directories for `frontend` (Next.js) and `studio` (Sanity.io).
- [x] Initialize Git repository and connect to GitHub.
- [x] Set up `.gitignore` for Node, Next.js, and Sanity.
- [x] Install Node.js (v18+) and npm/yarn on the Ubuntu development machine.
- [x] Scaffold Next.js (v14+, App Router, TypeScript) in the `frontend` directory.
- [x] Scaffold Sanity.io Studio (v3, TypeScript) in the `studio` directory.
- [x] Configure Prettier and ESLint for consistent code style in both apps.
- [x] Create `.env.local` files for both `frontend` and `studio` with required environment variables.
- [x] Add base README with project structure and setup instructions.
- [x] Verify both apps run independently with `npm run dev`.

---

### **Phase 2: Sanity.io Studio Scaffolding & Schema Definition**

- [x] Define the `blockContent` schema for rich text fields (reused by Blog and Facebook posts).
- [x] Implement the `category` schema as specified in the TRD.
- [x] Implement the `post` (Blog) schema, including all fields and role-based access logic per TRD v1.2.
- [x] **Implement the `instagramPost` schema, including the `scheduledFor` date field per TRD v1.2.**
- [x] **Implement the `facebookPost` schema, including the `scheduledFor` date field per TRD v1.2.**
- [x] **Configure the Sanity Studio Desk Structure to organize content by type ("Blog," "Instagram," "Facebook").**
- [x] **Implement the "Editorial Calendar" dashboard for the `Editor` role, showing all content types ready for translation, sorted chronologically.**
- [x] Set up initial datasets and seed with example categories.
- [x] Set up Sanity API tokens (read-only for frontend, read/write for Studio).
- [x] Document the complete, updated content model and editorial workflow in the repo.

---

### **Phase 3: Next.js Frontend Foundation**

- [x] Configure Next.js App Router with TypeScript.
- [x] Set up global CSS variables for color palette, font families (Lora, Montserrat), and base resets.
- [x] Integrate Google Fonts or self-host Lora and Montserrat.
- [x] Configure CSS Modules for component-scoped styling.
- [x] Set up the `/app/[locale]/` directory structure for multi-lingual routing.
- [x] Implement a global layout component with semantic HTML structure.
- [x] Configure environment variables for Sanity API access.
- [x] Set up utility functions for Sanity data fetching (using GROQ).

---

### **Phase 4: Core Component Development**

- [x] Design and implement the `Header` component (logo, navigation, language switcher).
- [x] Design and implement the `Footer` component (social links, Equinox symbol, copyright).
- [x] Build the `ArticleCard` component for blog previews.
- [x] Create the `Button` component with accent color and calm invitation style.
- [x] Develop the `NewsletterCTA` component with accessible form.
- [x] Implement the `CategoryFilter` component for blog archive filtering.
- [x] Create the `HorizontalLine` SVG motif as a reusable component.
- [x] Ensure all components are fully accessible and keyboard-navigable.
- [x] Write unit tests for all core components using Jest and React Testing Library.

---

### **Phase 5: Page Assembly & Static Generation**

- [x] Assemble the Homepage (`/es`, `/en`) using Hero, Featured Articles, and Newsletter CTA sections.
- [x] Build the Blog Archive page (`/es/blog`, `/en/blog`) with category filtering and pagination.
- [x] Implement the Blog Post page (`/es/blog/[slug]`, `/en/blog/[slug]`) with SSG, metadata, feature image, and related articles.
- [x] Assemble the About page (`/es/sobre-mi`, `/en/about`).
- [x] Build the Coaching page (`/es/coaching`, `/en/coaching`).
- [x] Implement the Privacy Policy page.
- [x] Ensure all pages use SSG via `generateStaticParams` and fetch data from Sanity.

---

### **Phase 6: Multi-lingual & Editorial Workflow Implementation**

- [ ] Implement locale-aware routing and navigation throughout the frontend site.
- [ ] Build the Language Switcher logic to map equivalent pages between `es` and `en`.
- [ ] Adjust Sanity GROQ queries to fetch language-specific fields for the frontend.
- [ ] Filter blog posts on the frontend to only display those with the correct `publishingControls` flags set to `true`.

---

### **Phase 7: Finalization, Testing, and Deployment Strategy**

- [ ] Write integration tests for Sanity data fetching for the blog.
- [ ] **Test the complete `Autor` workflow for all 3 content types in the Sanity Studio.**
- [ ] **Test the complete `Editor` workflow, verifying the "Editorial Calendar" dashboard and translation process.**
- [ ] **Test the "Copy to Clipboard" feature for social media posts.**
- [ ] Implement E2E tests (Cypress or Playwright) for critical frontend user flows.
- [ ] Conduct manual QA on all browsers and device sizes for the public site and the Sanity Studio.
- [ ] Optimize images and static assets for performance.
- [ ] Configure Vercel deployment and Sanity webhook for automatic rebuilds.
- [ ] Verify production build achieves Lighthouse scores of 90+ for Performance, Accessibility, and SEO.
- [ ] Review all code for adherence to the project's core philosophy.
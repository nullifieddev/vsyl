### **Document 3: Technical Requirements Document (TRD)**

**Project:** The Unapologetic Sanctuary - Edurne Ferrero Blog & Editorial Platform
**Version:** 1.0
**Date:** September 24, 2023
**Author:** Atelier (AI Design & Development Lead)

### 1. Overview

This document provides the detailed technical specifications for the development of the Edurne Ferrero project. It outlines the architecture, technology stack, data models, development environment, and testing strategy. This TRD is a direct companion to the Product Requirements Document (PRD) and must be implemented in strict accordance with it.

### 2. System Architecture

The project will be built using a **Headless, Static-First Architecture**.

*   **Rationale:** This architecture decouples the content management (backend) from the presentation layer (frontend). This choice is mandated by the project's core requirements for:
    *   **Performance:** Statically generated pages are served instantly from a global CDN, providing the fastest possible experience for readers.
    *   **Security:** The attack surface is dramatically reduced as there is no direct connection between the public-facing site and a database during runtime.
    *   **Scalability:** The site can handle massive traffic spikes with no degradation in performance.
    *   **Superior Creator Experience:** A pure Headless CMS (Sanity.io) allows for a fully customized, distraction-free authoring environment, as specified in the PRD.

*   **Data Flow:**
    1.  Content is created and managed in the Sanity.io Content Studio.
    2.  During the build process on Vercel, the Next.js application fetches all content from the Sanity API.
    3.  Next.js pre-renders all blog posts and pages as static HTML files.
    4.  These static assets are deployed to Vercel's Edge Network (CDN).
    5.  When a user visits the site, they are served a static page almost instantaneously.

### 3. Technology Stack

The following technologies are mandatory. All must be implemented using their latest stable versions.

*   **3.1. Frontend Framework: Next.js (v14+)**
    *   **Runtime:** Node.js (v18+).
    *   **Framework:** Next.js using the **App Router**.
        *   **Reasoning:** The App Router enables more flexible layouts, colocation of components and logic, and leverages modern React features like Server Components by default.
    *   **Language:** **TypeScript**.
        *   **Reasoning:** For robust type-safety across the application, reducing runtime errors and improving developer experience. Types will be generated from the Sanity schema where possible.
    *   **Rendering Strategy:** **Static Site Generation (SSG)** will be the default for all content-driven pages (Homepage, Blog Posts, About, etc.) using `generateStaticParams`.
    *   **Key Components:** The `next/image` component is mandatory for all images to ensure automatic optimization.

*   **3.2. Headless CMS: Sanity.io (v3)**
    *   **Reasoning:** Sanity's highly customizable Studio and real-time content backend are perfect for creating the bespoke `Autor` and `Editor` experiences defined in the PRD. Its generous free tier is well-suited for this project's scale.
    *   **Implementation:** The Sanity Studio will be configured as a separate application within the project monorepo.

*   **3.3. Styling: CSS Modules**
    *   **Reasoning:** To create component-scoped styles that are maintainable, prevent global scope pollution, and allow for the precise, bespoke design required by the "Unapologetic Sanctuary" philosophy. A utility-first framework like Tailwind CSS is explicitly forbidden as it does not align with the custom nature of the design. A global stylesheet will be used only for CSS variables (colors, fonts), base resets, and typography rules.

*   **3.4. Deployment Platform: Vercel**
    *   **Reasoning:** As the creator of Next.js, Vercel provides a seamless, zero-configuration deployment experience. Its Git-based workflow, automatic CI/CD, and global Edge Network are ideal.
    *   **Workflow:** Pushing to the `main` branch will trigger a production build. Pushing to any other branch will create a preview deployment.

### 4. Sanity.io Schema Definition

The following schemas must be implemented in the Sanity Studio project.

#### 4.1. `post.ts`
```javascript
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'status',
      title: 'Estado del Artículo',
      type: 'string',
      options: {
        list: [
          {title: 'Borrador (Draft)', value: 'draft'},
          {title: 'Listo para Traducción (Ready for Translation)', value: 'readyForTranslation'},
          {title: 'Publicado (Published)', value: 'published'},
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title_es',
      title: 'Título (Español)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug_es',
      title: 'Slug (Español)',
      type: 'slug',
      options: {source: 'title_es'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content_es',
      title: 'Contenido (Español)',
      type: 'blockContent', // Assumes a blockContent rich text definition
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title_en',
      title: 'Title (English)',
      type: 'string',
    }),
    defineField({
      name: 'slug_en',
      title: 'Slug (English)',
      type: 'slug',
      options: {source: 'title_en'},
    }),
    defineField({
      name: 'content_en',
      title: 'Content (English)',
      type: 'blockContent',
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen Principal',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: {type: 'category'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'publishingControls',
        title: 'Control de Publicación (Solo Editor)',
        type: 'object',
        fields: [
            defineField({ name: 'isSpanishPublished', title: 'Publicar Versión en Español', type: 'boolean', initialValue: false }),
            defineField({ name: 'isEnglishPublished', title: 'Publicar Versión en Inglés', type: 'boolean', initialValue: false }),
        ]
    }),
  ],
  preview: {
    select: {
      title: 'title_es',
      media: 'mainImage',
      status: 'status'
    },
     prepare(selection) {
      const {title, media, status} = selection
      return {
        title: title,
        subtitle: `Estado: ${status}`,
        media: media,
      }
    }
  },
})
```
*Note: A `blockContent.ts` schema for rich text must also be created.*

#### 4.2. `category.ts`
```javascript
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title_es',
      title: 'Título (Español)',
      type: 'string',
    }),
    defineField({
      name: 'title_en',
      title: 'Title (English)',
      type: 'string',
    }),
  ],
})
```

### 5. Multi-lingual Strategy Implementation

*   **URL Structure:** The Next.js App Router will be structured with a dynamic locale parameter: `app/[locale]/...`. `[locale]` will be either `es` or `en`.
*   **Data Fetching:** When fetching data from Sanity, the `locale` parameter from the URL will determine which fields to query (e.g., `title_es` vs `title_en`).
*   **Filtering Live Posts:** The frontend will only query for posts that have their respective `publishingControls.isSpanishPublished` or `publishingControls.isEnglishPublished` flags set to `true`.

### 6. Development Environment & Deployment

*   **Local Setup:**
    1.  Clone the monorepo.
    2.  Run `npm install` in both the `frontend` (Next.js) and `studio` (Sanity) directories.
    3.  Create `.env.local` files in each directory.
    4.  The `frontend/.env.local` will contain the Sanity Project ID, Dataset, and a read-only API token.
    5.  The `studio/.env.local` will contain the Sanity Project ID and Dataset.
    6.  Run `npm run dev` in separate terminals for each application.

*   **Deployment:**
    1.  The project will be linked to a GitHub repository.
    2.  The repository will be connected to a Vercel project.
    3.  Environment variables (as above, but with a read/write token for Sanity webhooks) will be configured in the Vercel project settings.
    4.  Vercel will be configured to rebuild the production site on a webhook trigger from Sanity whenever content is published or updated.

### 7. Testing Strategy

*   **7.1. Unit Testing:**
    *   **Frameworks:** Jest and React Testing Library.
    *   **Scope:** All major UI components (`ArticleCard`, `Header`, `CTAForm`) will have unit tests to verify they render correctly given specific props.

*   **7.2. Integration Testing:**
    *   **Scope:** The data fetching logic connecting Next.js to Sanity will be tested to ensure it correctly queries and maps data, especially for the multi-lingual fields.

*   **7.3. End-to-End (E2E) Testing:**
    *   **Framework:** Cypress or Playwright.
    *   **Critical User Flows to Test:**
        1.  A user can navigate from the Homepage to a blog post.
        2.  A user can switch the language of the site and see the content change.
        3.  A user can filter the blog archive by category.
        4.  A user can successfully submit their email to the newsletter form.

*   **7.4. Manual QA:**
    *   The site must be tested on the latest versions of Chrome, Firefox, and Safari.
    *   The site must be tested on various device sizes, including a small mobile phone (e.g., iPhone SE), a standard mobile phone, a tablet, and a desktop monitor.
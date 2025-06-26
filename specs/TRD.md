### **Document 3: Technical Requirements Document (TRD)**

**Project:** The Unapologetic Sanctuary - Edurne Ferrero Blog & Editorial Platform
**Version:** 1.2
**Date:** June 26th, 2025
**Author:** Atelier (AI Design & Development Lead)

#### **1. Overview**

This document provides the detailed technical specifications for the development of the Edurne Ferrero project. It outlines the architecture, technology stack, data models, development environment, and testing strategy. This TRD has been updated to include the requirements for the "Unified Content Hub" and its "Editorial Calendar" functionality. It is a direct companion to the PRD v1.2.

#### **2. System Architecture**

The project will be built using a **Headless, Static-First Architecture**.

*   **Rationale:** This architecture decouples the content management (backend) from the presentation layer (frontend), providing elite performance, security, scalability, and a superior, fully customized creator experience as mandated by the PRD.
*   **Data Flow:**
    1.  Content is created in the Sanity.io Content Studio.
    2.  During the build process on Vercel, the Next.js application fetches all published content from the Sanity API.
    3.  Next.js pre-renders all public blog pages as static HTML files.
    4.  These static assets are deployed to Vercel's Edge Network (CDN).
    5.  When a user visits the public site, they are served a static page instantaneously.

#### **3. Technology Stack**

The following technologies are mandatory. All must be implemented using their latest stable versions.

*   **3.1. Frontend Framework: Next.js (v14+)**
    *   **Runtime:** Node.js (v18+).
    *   **Framework:** Next.js using the **App Router**.
    *   **Language:** **TypeScript**.
    *   **Rendering Strategy:** **Static Site Generation (SSG)** via `generateStaticParams` for all public blog pages.
    *   **Key Components:** The `next/image` component is mandatory for all images.

*   **3.2. Headless CMS: Sanity.io (v3)**
    *   **Rationale:** Chosen for its deeply customizable Studio and real-time backend, which are essential for creating the bespoke `Autor` and `Editor` experiences.
    *   **Implementation:** The Sanity Studio will be a separate application within the project monorepo.

*   **3.3. Styling: CSS Modules**
    *   **Rationale:** To create component-scoped, maintainable styles required by the project's bespoke design philosophy. A global stylesheet will be used only for CSS variables, base resets, and typography rules.

*   **3.4. Deployment Platform: Vercel**
    *   **Rationale:** Provides a seamless, zero-configuration deployment experience for Next.js, with a Git-based workflow, automatic CI/CD, and a global Edge Network.

#### **4. Sanity.io Schema Definition**

The following schemas must be implemented in the `studio/schemas/` directory and registered in `sanity.config.ts`.

*   **4.1. `blockContent.ts`:**
```typescript
import {defineType, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
    }),
  ],
})
```

*   **4.2. `category.ts`:**
```typescript
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

*   **4.3. `post.ts` (Blog Post):**
```typescript
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    // ... all fields as defined in PRD v1.2
    defineField({
      name: 'status',
      title: 'Estado del Artículo',
      type: 'string',
      options: { list: [
        {title: 'Borrador', value: 'draft'},
        {title: 'Listo para Traducción', value: 'readyForTranslation'},
        {title: 'Publicado', value: 'published'}
      ] },
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
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'title_en', title: 'Title (English)', type: 'string' }),
    defineField({ name: 'slug_en', title: 'Slug (English)', type: 'slug', options: {source: 'title_en'} }),
    defineField({ name: 'content_en', title: 'Content (English)', type: 'blockContent' }),
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
})
```

*   **4.4. `instagramPost.ts`:**
```typescript
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'instagramPost',
  title: 'Post de Instagram',
  type: 'document',
  fields: [
    defineField({
      name: 'status',
      title: 'Estado del Post',
      type: 'string',
      options: { list: [
        {title: 'Borrador', value: 'draft'},
        {title: 'Listo para Traducción', value: 'readyForTranslation'},
        {title: 'Finalizado', value: 'finalized'}
      ] },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'scheduledFor',
      title: 'Fecha de Publicación Programada',
      type: 'date',
      options: { dateFormat: 'DD-MM-YYYY' },
    }),
    defineField({
      name: 'associatedImage',
      title: 'Imagen/Video Principal',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption_es',
      title: 'Texto (Español)',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'caption_en',
      title: 'Caption (English)',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'hashtags',
      title: 'Hashtags (sin #)',
      type: 'array',
      of: [{type: 'string'}],
      options: { layout: 'tags' },
    }),
  ],
})
```

*   **4.5. `facebookPost.ts`:**
```typescript
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'facebookPost',
  title: 'Post de Facebook',
  type: 'document',
  fields: [
    defineField({
      name: 'status',
      title: 'Estado del Post',
      type: 'string',
      options: { list: [
        {title: 'Borrador', value: 'draft'},
        {title: 'Listo para Traducción', value: 'readyForTranslation'},
        {title: 'Finalizado', value: 'finalized'}
      ] },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'scheduledFor',
      title: 'Fecha de Publicación Programada',
      type: 'date',
      options: { dateFormat: 'DD-MM-YYYY' },
    }),
    defineField({
      name: 'postText_es',
      title: 'Texto del Post (Español)',
      type: 'blockContent',
    }),
    defineField({
      name: 'postText_en',
      title: 'Post Text (English)',
      type: 'blockContent',
    }),
    defineField({
      name: 'mediaAttachment',
      title: 'Adjuntar Imagen/Video',
      type: 'image',
    }),
    defineField({
      name: 'linkAttachment',
      title: 'Adjuntar Enlace',
      type: 'url',
    }),
  ],
})
```

#### **5. Sanity Studio Configuration**

*   **Desk Structure:** The `sanity.config.ts` file must be configured with a custom Desk Structure using the Structure Builder plugin. This structure will group documents by type, presenting the user with a clean top-level menu: "Artículos de Blog," "Posts de Instagram," and "Posts de Facebook."
*   **Editor Dashboard:** A custom dashboard view must be implemented for the `Editor` role. This dashboard will serve as the "Editorial Calendar," fetching all documents where `status == 'readyForTranslation'` and displaying them in a list sorted chronologically in ascending order by their `publishedAt` (for blogs) or `scheduledFor` (for social posts) date.

#### **6. Development & Deployment**

*   **Local Setup:** A monorepo with `frontend` and `studio` directories. Each requires `npm install` and its own `.env.local` file with Sanity project credentials.
*   **Deployment:** The project will be deployed to Vercel via a GitHub repository. A Sanity webhook must be configured in Vercel to trigger a production rebuild of the frontend whenever content is published or updated.

#### **7. Testing Strategy**

The testing scope is expanded to include:
*   The creation, editing, and translation workflows for all three content models (`post`, `instagramPost`, `facebookPost`).
*   The functionality and sorting logic of the "Editorial Calendar" dashboard.
*   The "Copy to Clipboard" feature for social posts on mobile devices.
*   End-to-end testing of the public blog site remains as defined in PRD v1.2.
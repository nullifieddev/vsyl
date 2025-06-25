### **Document 2: Product Requirements Document (PRD)**

**Project:** The Unapologetic Sanctuary - Edurne Ferrero Blog & Editorial Platform
**Version:** 1.0
**Date:** September 24, 2023
**Author:** Atelier (AI Design & Development Lead)

### 1. Introduction

This document outlines the product requirements for the complete redesign of the Edurne Ferrero web presence. The project consists of two core components: a public-facing, multi-lingual blog website, and a private, role-based content creation studio.

The project's guiding philosophy is **"The Unapologetic Sanctuary."** It must be a digital experience that is calm, confident, authentic, and deeply reflective of Edurne Ferrero's "Vive Salvaje y Libre" mantra and the "Equinox Philosophy" of balance.

### 2. Goals & Objectives

*   **For the Reader:** To provide a serene, immersive, and fast reading experience that allows them to connect deeply with Edurne's content.
*   **For Edurne (The Author):** To radically simplify the content creation process, removing all technical friction and enabling her to create and manage content effortlessly from her mobile device.
*   **For the Editor:** To establish a clear, efficient, and professional workflow for translating, editing, and publishing content.
*   **For the Brand:** To create a timeless, unique, and authentic digital presence that is a true extension of Edurne's identity, differentiating her from the conventional coaching market.

### 3. User Personas

*   **The Reader:** An individual seeking clarity, empowerment, and a more authentic life. They are introspective, appreciate quality, and are fluent in either English or Spanish.
*   **Edurne (The `Autor`):** The primary content creator. Prolific, creative, and a self-described technophobe. Her primary digital tool is her mobile phone.
*   **The Editor (The `Editor`):** Responsible for the English translation, final edits, and publishing management. Requires an efficient, clear workflow, likely on a desktop computer.

---

### **Part A: The Public-Facing Blog Website**

This section details the requirements for the live, public website.

#### 4. Global Elements

These components will appear consistently across the site.

*   **4.1. Header:**
    *   **Content:**
        *   Left: Logo ("Edurne Ferrero" in `Lora` font). Links to Homepage.
        *   Right: Navigation links ("Blog", "Sobre mí", "Coaching").
        *   Right: Language Switcher ("ES | EN").
    *   **Functionality:**
        *   The active page's navigation link shall be visually distinct (e.g., underlined with the accent color).
        *   The Language Switcher must display the current language in the accent color (`#C86A43`).
        *   Clicking the non-active language will navigate the user to the equivalent page in that language (e.g., from `/es/blog` to `/en/blog`).

*   **4.2. Footer:**
    *   **Content:**
        *   A dark background (`#2E3D32`) to ground the page.
        *   Left: Social Media Links (simple text: "Instagram", "Youtube").
        *   Center: The Equinox Symbol (`⊕`) placed above the copyright notice "© [Current Year] Edurne Ferrero".
        *   Right: Link to a "Política de Privacidad" (Privacy Policy) page.
    *   **Functionality:** All links must direct to the correct URLs.

#### 5. Pages

*   **5.1. Homepage (`/es` and `/en`)**
    *   **Objective:** To introduce Edurne's philosophy, establish her credibility, and guide users to her content.
    *   **Content & Layout (Hero Section):**
        *   Asymmetrical layout: a large heading on the left, an evocative image on the right.
        *   Heading `<h1>`: "Vive Salvaje y Libre" (`Lora` font).
        *   Subheading `<p>`: "Mind Coach & Guía Intuitiva".
        *   Image: A high-quality photo embodying the Equinox philosophy (golden hour, nature, connection).
    *   **Content & Layout (Featured Articles):**
        *   Section Heading `<h2>`: "Escritos Destacados".
        *   A 3-column grid of `ArticleCard` components, featuring manually selected key articles.
    *   **Content & Layout (Newsletter CTA):**
        *   Full-width section with a dark background (`#2E3D32`).
        *   Heading `<h2>`: "Un Espacio para la Reflexión".
        *   Paragraph of inviting text.
        *   A simple form with one email input field and a "SUSCRIBIRME" button.
    *   **Interactions:** `ArticleCard` components are clickable and navigate to the full post. The button on the CTA submits the form.

*   **5.2. Blog Post Page (`/es/blog/[slug]` and `/en/blog/[slug]`)**
    *   **Objective:** To provide the ultimate distraction-free reading experience.
    *   **Content & Layout:**
        *   A single, central column with a max-width of ~800px for optimal readability.
        *   Post Title `<h1>` in large `Lora` font.
        *   Post Metadata: Publish Date and Category below the title, in the subtle gray color (`#A1A19B`).
        *   A full-width, high-quality Feature Image.
        *   The post body, with impeccable typography for paragraphs, blockquotes, and subheadings.
    *   **Functionality:**
        *   The page must be statically generated (SSG) for speed.
        *   At the end of the article, display a section for "Artículos Relacionados" (3 posts from the same category).

*   **5.3. Blog Archive Page (`/es/blog` and `/en/blog`)**
    *   **Objective:** To allow users to easily browse and discover Edurne's extensive library of posts.
    *   **Content & Layout:**
        *   Page Title `<h1>`: "Blog".
        *   Filter Controls: A set of buttons or a dropdown to filter posts by `Category`.
        *   A grid of `ArticleCard` components, displaying all posts in reverse chronological order by default.
    *   **Functionality:**
        *   Selecting a category filter must update the grid in real-time to show only posts from that category.
        *   The page must support pagination if the number of posts exceeds a set limit (e.g., 9 per page).

*   **5.4. About Page (`/es/sobre-mi` and `/en/about`)**
    *   **Objective:** To share Edurne's story and philosophy in her own words.
    *   **Content & Layout:**
        *   Page Title `<h1>`: "Sobre mí" / "About Me".
        *   A prominent, authentic photo of Edurne.
        *   Long-form text content area for her biography and mission.

*   **5.5. Coaching Page (`/es/coaching` and `/en/coaching`)**
    *   **Objective:** To clearly explain her coaching services and provide a simple way to inquire.
    *   **Content & Layout:**
        *   Page Title `<h1>`: "Coaching".
        *   Text sections detailing her approach, who it's for, and what it entails.
        *   A clear Call-to-Action: This will not be a complex form, but a beautifully styled `mailto:` link or a button that directs users to her professional email for inquiries. The button text will be "Contactar para más información".

---

### **Part B: The Content Creation & Editorial Studio ("El Estudio")**

This section details the requirements for the private Sanity.io studio.

#### 6. Core Workflow: "The Seamless Handover"

1.  **Creation:** Edurne (`Autor`) creates a post in Spanish and sets its status to `Listo para Traducción`.
2.  **Notification:** The post automatically appears in the Editor's dashboard.
3.  **Translation:** The Editor (`Editor`) translates the content into English within a side-by-side interface.
4.  **Publication:** The Editor has granular control to publish the Spanish and English versions independently.

#### 7. User Roles & Permissions

*   **`Autor` (Edurne):**
    *   Can create and edit posts.
    *   Can only write in Spanish fields.
    *   Can only modify a post's `status`.
    *   Cannot edit English fields (they are read-only).
*   **`Editor` (You):**
    *   Can create and edit posts.
    *   Can only write in English fields.
    *   Can view Spanish fields (read-only) for reference.
    *   Has full control over the final publishing status checkboxes for both languages.

#### 8. Interface Requirements: `Autor` View (Mobile-First)

*   **8.1. Login:** A simple username/password screen.
*   **8.2. Homescreen ("El Estudio"):**
    *   Greeting: "¿Qué te gustaría crear hoy, Edurne?"
    *   Primary Action: A large `[+] Nuevo Artículo` button.
    *   Secondary Action: A `[>] Ver todos los Artículos` button to view her post history.
*   **8.3. Writing Interface:**
    *   Distraction-free, single-column layout.
    *   **Fields:**
        *   `Estado`: A simple dropdown (`Borrador`, `Listo para Traducción`, `Publicado`).
        *   `Título (ES)`: Plain text input.
        *   `Contenido (ES)`: Rich text area with minimal tools (Bold, Italic, Blockquote).
        *   `Imagen Principal`: A single button that opens the phone's photo gallery.
    *   **Locked Section:** A greyed-out, non-interactive section clearly marked `TRADUCCIÓN (EN) 🔒`.

#### 9. Interface Requirements: `Editor` View (Desktop-First)

*   **9.1. Login:** A simple username/password screen.
*   **9.2. Dashboard:**
    *   Primary View: A list titled **"Artículos Listos para Traducción"**. Each item shows the post title and a `[ Traducir ]` button.
    *   Secondary View: A list of all posts, sortable and filterable.
*   **9.3. Translation Interface:**
    *   A two-column, side-by-side layout.
    *   **Left Column (Locked 🔒):** Displays the final Spanish `Título` and `Contenido` for reference.
    *   **Right Column (Editable):** Contains the input fields for the English `Title` and `Content`.
    *   **Control Panel:** A distinct section with two checkboxes: `[ ] Publish Spanish Version` and `[ ] Publish English Version`.

#### 10. Content Model: `Post`

The following fields are required for each blog post document in the CMS:

| Field Name | Type | Description | Validation | Role Access |
| :--- | :--- | :--- | :--- | :--- |
| `title_es` | String | The title in Spanish. | Required | Autor (Write) / Editor (Read) |
| `title_en` | String | The title in English. | - | Autor (Read) / Editor (Write) |
| `slug_es` | Slug | SEO-friendly URL part. | Required, Unique | Auto-generated from `title_es` |
| `slug_en` | Slug | SEO-friendly URL part. | - | Auto-generated from `title_en` |
| `mainImage` | Image | The primary feature image for the post. | Required | Autor (Write) / Editor (Write) |
| `publishedAt` | Datetime | The date of publication. | Required | Autor (Write) / Editor (Write) |
| `content_es` | Rich Text | The body of the post in Spanish. | Required | Autor (Write) / Editor (Read) |
| `content_en` | Rich Text | The body of the post in English. | - | Autor (Read) / Editor (Write) |
| `category` | Reference | Link to a `Category` document. | Required | Autor (Write) / Editor (Write) |
| `status` | String | The editorial status of the post. | Required | Autor (Write) / Editor (Read) |
| `isSpanishPublished` | Boolean | Final publish flag for ES. | - | Autor (Read) / Editor (Write) |
| `isEnglishPublished` | Boolean | Final publish flag for EN. | - | Autor (Read) / Editor (Write) |

### 11. Non-Functional Requirements

*   **Performance:** The public site must load in under 2 seconds. It must achieve a Google Lighthouse score of 90+ in Performance, Accessibility, and SEO.
*   **Accessibility:** The site must be WCAG 2.1 AA compliant.
*   **Security:** The Content Studio must be secure and accessible only by authenticated users.
*   **Responsiveness:** All pages on the public site must be perfectly responsive and functional on all modern devices, from mobile phones to desktops.

### 12. Exclusions

*   User comments on blog posts.
*   E-commerce functionality.
*   User accounts/membership for the public site.
*   A site-wide search feature (V1). Filter-by-category is sufficient.
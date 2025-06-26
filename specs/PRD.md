Of course. Here is the complete and final version of the Product Requirements Document (PRD v1.2) for you to add to the repository.

---
---

### **Document 2: Product Requirements Document (PRD)**

**Project:** The Unapologetic Sanctuary - Edurne Ferrero Blog & Editorial Platform
**Version:** 1.2 (Final)
**Date:** June 26th, 2025
**Author:** Atelier (AI Design & Development Lead)

#### **1. Introduction**

This document outlines the product requirements for the complete redesign of the Edurne Ferrero web presence. The project consists of two core components: a public-facing, multi-lingual blog website, and a private, role-based **Unified Content Hub** called "El Estudio."

The project's guiding philosophy is **"The Unapologetic Sanctuary."** It must be a digital experience that is calm, confident, authentic, and deeply reflective of Edurne Ferrero's "Vive Salvaje y Libre" mantra.

#### **2. Goals & Objectives**

*   **For the Reader:** To provide a serene, immersive, and fast reading experience that allows them to connect deeply with Edurne's content.
*   **For Edurne (The Author):** To radically simplify the content creation process for her blog, Instagram, and Facebook, centralizing her creative work into a single, effortless mobile-first application that supports creative surges and forward planning.
*   **For the Editor:** To establish a clear, efficient workflow for translating, editing, and managing all content types via a chronological "Editorial Calendar" dashboard.
*   **For the Brand:** To create a timeless, unique, and authentic digital presence that is a true extension of Edurne's identity.

#### **3. User Personas**

*   **The Reader:** An individual seeking clarity, empowerment, and a more authentic life.
*   **Edurne (The `Autor`):** The primary content creator for all channels. Prolific, creative, and a self-described technophobe. Her primary digital tool is her mobile phone.
*   **The Editor (The `Editor`):** Responsible for the English translation, final edits, and management of all content.

---

### **Part A: The Public-Facing Blog Website**

This section details the requirements for the live, public website.

#### **4. Global Elements**

*   **4.1. Header:**
    *   **Content:** Logo ("Edurne Ferrero"), Navigation links ("Blog", "Sobre mí", "Coaching"), Language Switcher ("ES | EN").
    *   **Functionality:** Active page and language highlighted. Navigates correctly between locales.
*   **4.2. Footer:**
    *   **Content:** Dark background, Social Links ("Instagram", "Youtube"), Equinox Symbol (`⊕`), Copyright notice, Privacy Policy link.

#### **5. Pages**

*   **5.1. Homepage (`/es`, `/en`):**
    *   Asymmetrical Hero section with brand message.
    *   Curated 3-column grid of "Featured Articles."
    *   Dark-themed, calm "Newsletter CTA" section.
*   **5.2. Blog Post Page (`/es/blog/[slug]`, `/en/blog/[slug]`):**
    *   Single, central column optimized for readability.
    *   Large title, metadata, feature image, and well-formatted post body.
    *   "Related Articles" section at the end.
*   **5.3. Blog Archive Page (`/es/blog`, `/en/blog`):**
    *   Grid of all posts in reverse chronological order.
    *   Filter controls by `Category`.
    *   Pagination for large numbers of posts.
*   **5.4. About Page (`/es/sobre-mi`, `/en/about`):**
    *   Prominent photo and long-form text area for biography and mission.
*   **5.5. Coaching Page (`/es/coaching`, `/en/coaching`):**
    *   Details of coaching services with a simple `mailto:` call-to-action.

---

### **Part B: The Unified Content Hub ("El Estudio")**

This section details the requirements for the private Sanity.io studio.

#### **6. Core Workflow: "The Seamless Handover"**

1.  **Creation:** Edurne (`Autor`) creates content, optionally sets a future post date, and sets the status to `Listo para Traducción`.
2.  **Notification:** The content appears in the Editor's "Editorial Calendar" dashboard, sorted by its scheduled date.
3.  **Translation:** The Editor (`Editor`) translates the content.
4.  **Finalization:** The content is marked complete, ready for manual posting on its scheduled date.

#### **7. User Roles & Permissions**

*   **`Autor` (Edurne):** Can create content in Spanish fields only. Can change status. Cannot edit English fields (read-only).
*   **`Editor` (You):** Can create and edit content in English fields only. Can view Spanish fields (read-only). Has full control over final blog publishing flags.

#### **8. Interface Requirements: `Autor` View (Mobile-First)**

*   **8.1. Homescreen:** Upon successful login, the `Autor` is greeted with a welcoming screen featuring three large buttons: `[+] Nuevo Artículo de Blog`, `[+] Nuevo Post de Instagram`, `[+] Nuevo Post de Facebook`.
*   **8.2. Writing Interfaces:** Each content type will have a unique, tailored writing screen.
*   **8.3. Content Planning:** The `instagramPost` and `facebookPost` creation screens will include an optional `Fecha de Publicación` (Scheduled For) date picker.
*   **8.4. "Copy to Clipboard" Feature:** A prominent `[ Copiar Texto ]` button must be present in the final view for social posts to copy the text to the device clipboard.

#### **9. Interface Requirements: `Editor` View (Desktop-First)**

*   **9.1. Dashboard - The "Editorial Calendar":** The Editor's default view is a dashboard that lists all content items (`post`, `instagramPost`, `facebookPost`) marked `Listo para Traducción`. This list is sorted chronologically by the `publishedAt` (for blogs) or `scheduledFor` (for social) date, providing a clear pipeline of upcoming work.

#### **10. Content Models**

*   **10.1. `post` (Blog Post):**

| Field Name | Type | Description |
| :--- | :--- | :--- |
| `status` | String | Editorial status of the blog post. |
| `title_es` | String | The title in Spanish. Required. |
| `title_en` | String | The title in English. |
| `slug_es` | Slug | SEO-friendly URL part for Spanish. |
| `slug_en` | Slug | SEO-friendly URL part for English. |
| `mainImage` | Image | The primary feature image. Required. |
| `publishedAt` | Datetime | The date of publication. Required. |
| `content_es` | Rich Text | The body of the post in Spanish. Required. |
| `content_en` | Rich Text | The body of the post in English. |
| `category` | Reference | Link to a `Category` document. Required. |
| `publishingControls` | Object | Object containing `isSpanishPublished` and `isEnglishPublished` booleans. |

*   **10.2. `instagramPost`:**

| Field Name | Type | Description |
| :--- | :--- | :--- |
| `status` | String | Editorial status (`Draft`, `Ready for Translation`, `Finalized`). |
| `scheduledFor` | Date | The intended date for the post. Optional. |
| `associatedImage` | Image | The primary image or video. Required. |
| `caption_es` | Text | The Spanish caption. |
| `caption_en` | Text | The English caption. |
| `hashtags` | Array of Strings | A list of relevant hashtags. |

*   **10.3. `facebookPost`:**

| Field Name | Type | Description |
| :--- | :--- | :--- |
| `status` | String | Editorial status. |
| `scheduledFor` | Date | The intended date for the post. Optional. |
| `postText_es` | Rich Text | The body of the Facebook post in Spanish. |
| `postText_en` | Rich Text | The body of the Facebook post in English. |
| `mediaAttachment` | Image | Optional media to attach. |
| `linkAttachment` | URL | Optional link to share. |

#### **11. Security & Authentication (for "El Estudio")**

*   **11.1. Access Control:** Access to the "El Estudio" Content Hub must be restricted to authenticated users only.
*   **11.2. Login Mechanism:** The system will provide a secure login page as the entry point to the application, managed via the Sanity.io platform's built-in user management system.
*   **11.3. Authentication Providers:** The system shall be configured to allow login via Google Account (OAuth) and Email/Password.
*   **11.4. User Roles:** The system must support two distinct user roles (`Autor`, `Editor`). Upon successful authentication, the system must display the appropriate UI and enforce the correct permissions.

#### **12. Non-Functional Requirements**

*   **Performance:** The public site must load in under 2 seconds and achieve a Google Lighthouse score of 90+ in Performance, Accessibility, and SEO.
*   **Accessibility:** The site must be WCAG 2.1 AA compliant.
*   **Security:** The Content Studio must be secure and accessible only by authenticated users.
*   **Responsiveness:** All pages on the public site must be perfectly responsive and functional on all modern devices.

#### **13. Exclusions**

*   User comments on blog posts.
*   E-commerce functionality.
*   User accounts/membership for the public site.
*   A site-wide search feature (V1). Filter-by-category is sufficient.
*   Automatic publishing to social media platforms.
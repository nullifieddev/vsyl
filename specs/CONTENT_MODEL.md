# Content Model & Editorial Workflow

_Last updated: 2025-06-26_

## Overview
This document describes the Sanity content model and editorial workflow for The Unapologetic Sanctuary, as implemented in the Studio (`/studio/schemas/`).

---

## Content Types

### 1. Blog Post (`post`)
- **Fields:**
  - `title` (string, required)
  - `slug` (slug, required, auto from title)
  - `excerpt` (text, max 200 chars)
  - `body` (blockContent, required)
  - `featureImage` (image, required, with alt text)
  - `categories` (array of references to `category`, min 1)
  - `author` (string, required)
  - `publishedAt` (datetime, required)
  - `locale` (string: 'es' | 'en', required)
  - `publishingControls` (object: readyForReview, approved, published)

### 2. Instagram Post (`instagramPost`)
- **Fields:**
  - `caption` (blockContent, required)
  - `image` (image, required, with alt text)
  - `scheduledFor` (datetime, required)
  - `categories` (array of references to `category`, min 1)
  - `author` (string, required)
  - `locale` (string: 'es' | 'en', required)
  - `publishingControls` (object: readyForReview, approved, published)

### 3. Facebook Post (`facebookPost`)
- **Fields:**
  - `body` (blockContent, required)
  - `image` (image, optional, with alt text if present)
  - `scheduledFor` (datetime, required)
  - `categories` (array of references to `category`, min 1)
  - `author` (string, required)
  - `locale` (string: 'es' | 'en', required)
  - `publishingControls` (object: readyForReview, approved, published)

### 4. Category (`category`)
- **Fields:**
  - `title` (string, required)
  - `slug` (slug, required, auto from title)
  - `description` (text, max 120 chars)
  - `color` (hex string, required)
  - `locale` (string: 'es' | 'en', required)

### 5. blockContent (object, reused)
- Rich text with headings, lists, links, images (with alt), highlight, code, etc.

---

## Editorial Workflow

### Roles
- **Autor:** Can create and edit their own drafts. Can set `readyForReview`.
- **Editor:** Can approve, publish, and manage all content. Can set `approved` and `published`.

### States & Controls
- **Draft:** Content in progress.
- **Ready for Review:** `publishingControls.readyForReview = true` (Autor signals ready for Editor)
- **Approved:** `publishingControls.approved = true` (Editor approves for publishing/translation)
- **Published:** `publishingControls.published = true` (Content is live or scheduled)

### Translation
- All content types support `locale` field. Editors use the Editorial Calendar dashboard to track content ready for translation.

---

## Desk Structure
- Studio sidebar groups content by type: Blog, Instagram, Facebook.
- Categories are managed separately.

---

## Dashboard
- **Editorial Calendar:** Custom dashboard for Editors, showing all content types ready for translation, sorted by date.

---

## API Tokens
- **Frontend:** Read-only token for public data fetching.
- **Studio:** Read/write token for editorial actions and seeding.

---

For schema details, see `/studio/schemas/`.

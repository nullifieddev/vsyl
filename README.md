# The Unapologetic Sanctuary

A digital sanctuary for the mind coach Edurne Ferrero, built with Next.js (frontend) and Sanity.io (content studio).

## Monorepo Structure

```
/
├── frontend/   # Next.js 14+ (App Router, TypeScript)
├── studio/     # Sanity.io v3 (TypeScript)
├── plans/      # Project plans and checklists
├── specs/      # PRD, TRD, and other specifications
```

## Getting Started

### Prerequisites

- Node.js v18+ (v20+ supported)
- npm v9+ or yarn

### Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd vsyl
   ```

2. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   cd ../studio
   npm install
   ```

3. **Environment variables:**
   - Copy and update `.env.local` in both `frontend/` and `studio/` with your Sanity project details.

4. **Run the apps:**
   - In separate terminals:
     ```bash
     cd frontend && npm run dev
     cd studio && npm run dev
     ```

### Project Philosophy

- Intentional Minimalism, accessibility, and timeless design.
- See `/specs/PRD.md` and `/specs/TRD.md` for requirements and technical details.

## Environment Variables

Both apps require environment variables for Sanity API access:

### `frontend/.env.local`
- `NEXT_PUBLIC_SANITY_PROJECT_ID` — Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` — Dataset name
- `NEXT_PUBLIC_SANITY_API_VERSION` — API version
- `SANITY_API_READ_TOKEN` — **Read-only** token for secure frontend data fetching (never write access)

### `studio/.env.local`
- `SANITY_STUDIO_PROJECT_ID` — Sanity project ID
- `SANITY_STUDIO_DATASET` — Dataset name
- `SANITY_STUDIO_API_VERSION` — API version
- `SANITY_API_WRITE_TOKEN` — **Read/write** token for Studio/editorial actions and seeding

> **Security:** Never commit real tokens to version control. Use Vercel/hosting secrets for production.

---

For more, see the `plans/` and `specs/` directories.

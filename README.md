# wilmerlapuz.com – Portfolio & Live Dashboard

A glass-morphic, **Next.js + TypeScript** portfolio that doubles as a real-time dashboard for my coding, fitness, language-learning and music activity. This project features two distinct data pipelines: an automated hourly workflow for static metrics and a full-stack interactive contact form.

| Live Site                 | Tech Stack                                                              | License |
| ------------------------- | ----------------------------------------------------------------------- | ------- |
| <https://wilmerlapuz.com> | Next 15 • React 19 • Tailwind v4 • Vercel Postgres • Resend • Framer Motion | MIT     |

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Folder Structure](#folder-structure)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Features

-   **Live Metrics Dashboard**
    -   WakaTime coding stats
    -   Strava running distance & latest run
    -   Spotify now-playing / recent track
    -   LeetCode problem-solving progress
    -   Anki Japanese deck breakdown

-   **Automated Data Pipeline**
    -   **GitHub Actions** workflow runs hourly
    -   Fetches data from 5 APIs, normalises to JSON and commits to `public/*.json`
    -   Zero-downtime Vercel deploy on push

-   **Full-Stack Contact Form**
    -   Submissions are saved permanently to a **Vercel Postgres** database.
    -   Instant email notifications are sent using **Resend**.
    -   Features robust server-side validation within a Next.js API Route.

-   **Fully Responsive UI**
    -   Desktop sidebar + mobile bottom-nav with smooth-scroll
    -   Glassmorphism powered by `oklch()` colour space and Tailwind CSS plugins

-   **Accessibility & Performance**
    -   Lighthouse ≥ 95 on all categories
    -   Semantic HTML + aria labels
    -   Optimised images via `next/image`

-   **DX First**
    -   Strict TypeScript (`noUncheckedIndexedAccess`, etc.)
    -   ESLint, Prettier & Husky pre-commit hooks
    -   Hot reload with `next dev`

---

## Architecture

This project utilizes two distinct data handling architectures:

1.  **Stats Pipeline (Static):**  
    `⏰ GitHub Actions → 📊 Aggregator Script → 📁 JSON Files → ⚡ Next.js (SSG) → 🎨 React UI`

2.  **Contact Form (Dynamic):**  
    `👤 User → 📝 Frontend Form → 🚀 Next.js API Route → 💾 Vercel Postgres & 📧 Resend`

-   **Data layer** – A hybrid approach: simple JSON files for static dashboard data, and a **Vercel Postgres** database for dynamic user submissions.
-   **UI layer** – Statically generated at build time for speed, with client-side hydration for animations and interactive forms.
-   **Deployment** – Vercel preview per PR + production on `main`.

---

## Getting Started

1.  **Clone**

    ```bash
    git clone https://github.com/wlmr-rk/wilmerlapuz.com.git
    cd wilmerlapuz.com
    ```

2.  **Install deps**

    ```bash
    pnpm install # or yarn / npm
    ```

3.  **Set up Environment Variables**

    This project requires credentials for the database and email service to run the contact form locally.

    ```bash
    cp .env.example .env.local
    ```

    -   Fill in `RESEND_API_KEY` from your [Resend account](https://resend.com).
    -   For the `POSTGRES_*` variables, link the project to your own Vercel account and run `vercel env pull .env.local` to populate them automatically.

4.  **Run locally**

    ```bash
    pnpm dev
    # visit http://localhost:3000
    ```

To fetch fresh dashboard data locally, run:

```bash
pnpm fetch:stats # executes the same script used in CI
```

---

## Available Scripts

| Command          | Description                                  |
| ---------------- | -------------------------------------------- |
| `pnpm dev`       | Run in dev mode with fast refresh            |
| `pnpm build`     | Production build                             |
| `pnpm fetch:stats` | Pull latest data from external APIs          |
| `pnpm lint`      | ESLint + TypeScript check                    |
| `pnpm format`    | Prettier auto-format                         |

---

## Folder Structure

```
.
├─ app/                # Next.js App Router
│  ├─ api/             # API Routes (e.g., contact form)
│  ├─ page.tsx
│  ├─ layout.tsx
│  └─ ...
├─ components/         # Re-usable UI/section components
├─ hooks/              # React hooks (e.g. useStats)
├─ public/             # Auto-generated JSON + static assets
├─ scripts/            # GitHub Action data fetchers
├─ types/              # Shared TypeScript types
```

---

## Roadmap

-   [ ] Dark-/light-mode toggle
-   [ ] i18n (🇯🇵 translations)
-   [ ] Drag-to-reorder bento widgets (persisted to `localStorage`)
-   [ ] Add **Rust** & **Kotlin** project showcases
-   [ ] Lighthouse CI & unit tests (Vitest + React Testing Library)

---

## Contributing

Pull requests are welcome!
If you spot a bug or want a new stat source:

-   Fork → create branch → commit → open PR

---

## License

MIT © Wilmer Lapuz
See [`LICENSE`](./LICENSE) for details.

# Sat Trakt Zadatak

A remote IT job board built with Next.js, featuring job filtering by industry and location, powered by the Jobicy API.

**Live demo:** [sat-trakt-zadatak.vercel.app](https://sat-trakt-zadatak.vercel.app/)

## Tech Stack

- **Next.js 16** with App Router
- **React 19**
- **Tailwind CSS 4** with shadcn/ui and Base UI components
- **TanStack React Query** for data fetching and caching
- **nuqs** for URL query state management

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
app/              → Pages, layout, API routes
components/
  ui/             → Reusable UI primitives (shadcn/Base UI)
  pro-blocks/     → Page-level sections (hero, etc.)
  *.tsx           → Feature components (cards, filters, job board)
lib/              → Utilities, types, constants
```

## Design Decisions

- **Button asChild for Links:** used for SEO, prefetch and accessability purposes where search engines can crawl the links and users can right-click to open in a new tab, middle-click, cmd/ctrl+click, etc
- **decode method:** jobicy returns html entities from the database instead of their characters
- **jobs.length deciding tailwind className:** on certain resolutions when we render a list of cards it can make the page look ugly where GradientBackgroundImage overlaps with other elements outside of JobBoard (sometimes it can overlap with the top GradientBackgroundImage), if there's less than an ideal number of jobs to render
- **why count is set to 16:** looking at the design to me it seems like setting the count query param to 16 was necessary, but other than that it helps with lcp
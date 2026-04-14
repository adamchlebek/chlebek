# Adam Chlebek — Executive Portfolio

Next.js 15 + Payload CMS 3.x + Postgres. Single deployable app.

## Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **CMS:** Payload 3.x (embedded — admin at `/admin`, API at `/api`)
- **Database:** Postgres (Docker locally, Neon/Vercel Postgres in prod)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion, GSAP, Lenis smooth scroll
- **3D:** React Three Fiber + drei (hero shader)
- **Package manager:** pnpm

## Setup

```bash
# 1. Clone and install
pnpm install

# 2. Start Postgres (Docker)
docker run -d --name adamchlebek-postgres \
  -e POSTGRES_USER=payload \
  -e POSTGRES_PASSWORD=payload \
  -e POSTGRES_DB=portfolio \
  -p 5433:5432 \
  postgres:16-alpine

# 3. Configure environment
cp .env.local.example .env.local
# Edit DATABASE_URI, PAYLOAD_SECRET
```

## Environment Variables

```
DATABASE_URI=postgres://payload:payload@localhost:5433/portfolio
PAYLOAD_SECRET=<random-64-char-string>
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

## Development

```bash
pnpm dev          # Start dev server at localhost:3000
pnpm seed         # Seed CMS with example data
pnpm generate:types   # Regenerate payload-types.ts after schema changes
pnpm generate:importmap  # Regenerate admin import map
```

## First Admin User

1. Run `pnpm dev`
2. Go to `http://localhost:3000/admin`
3. Create your user (email + password)
4. No registration endpoint exists after the first user

## Routes

| Route      | Description                                    |
| ---------- | ---------------------------------------------- |
| `/`        | Home — hero, stats, about, experience, testimonials |
| `/work`    | Projects + writing                             |
| `/contact` | Contact info + form                            |
| `/admin`   | Payload CMS admin panel                        |

## CMS Collections

- **Profile** (global) — name, title, tagline, bio, social links
- **Accomplishments** — headline metrics with categories
- **Roles** — work experience timeline
- **Projects** — portfolio projects with outcomes and tech stack
- **Articles** — title, description, external link, read time, publish date
- **Testimonials** — quotes from colleagues
- **Media** — uploads (images, PDFs)

## Deploy to Vercel

1. Push to GitHub
2. Import in Vercel
3. Add environment variables (DATABASE_URI, PAYLOAD_SECRET)
4. Deploy — Payload and Next.js run as a single app

## Data Fetching

All CMS data is fetched via Payload's Local API in Server Components:

```typescript
const payload = await getPayloadClient()
const projects = await payload.find({
  collection: 'projects',
  where: { featured: { equals: true } },
  sort: 'sortOrder',
})
```

Zero HTTP overhead — Payload runs in the same Node process.

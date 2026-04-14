import type { Payload } from 'payload'

export async function runSeed(payload: Payload): Promise<void> {
  await payload.updateGlobal({
    slug: 'profile',
    data: {
      name: 'Adam Chlebek',
      title: 'VP of Engineering',
      tagline: 'Engineering leader. Operator. Builder of teams that ship.',
      bio: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Engineering executive who went from Senior Engineer to VP in 16 months. Currently leading engineering, product development, and technical strategy at Merch — owning cloud infrastructure (AWS, Lambda, Postgres, MongoDB), core platform delivery, and team growth.',
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Previously at Tesla building manufacturing software systems. Deep technical background across full-stack development and cloud infrastructure with a bias toward shipping fast and measuring impact.',
                },
              ],
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      location: 'Johnstown, Colorado',
      email: 'adamchlebek@live.com',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/adamchlebek' },
        { platform: 'GitHub', url: 'https://github.com/adamchlebek' },
      ],
      calendlyUrl: '',
    },
  })
  console.log('Profile global seeded')

  const accomplishments = [
    {
      title: 'Senior Engineer → VP in 16 months',
      description:
        'Three title changes at one company while scope expanded from IC delivery to org-wide engineering, product execution, and technical budgets.',
      metric: '16 months',
      date: '2022-02-01T00:00:00.000Z',
      category: 'leadership' as const,
      sortOrder: 1,
    },
    {
      title: 'Production cloud & data stack',
      description:
        'Owns Merch’s live environment: AWS serverless and queues, MongoDB and Postgres, Nx monorepo, and CI — not slide-deck architecture, what actually runs in prod.',
      metric: 'AWS · SQS · Nx',
      date: '2020-10-01T00:00:00.000Z',
      category: 'technical' as const,
      sortOrder: 2,
    },
    {
      title: 'DaySmarter — live traffic',
      description:
        'daysmarter.co: a public scheduling product with an API wrapper used to expose calendars across locations. Steady real-world use at roughly 50 viewers per day.',
      metric: '~50 viewers / day',
      date: '2023-06-01T00:00:00.000Z',
      category: 'business' as const,
      sortOrder: 3,
    },
    {
      title: 'Tesla manufacturing software',
      description:
        'Software Engineer in Fremont: manufacturing systems integration, service layers on REST and SQL, and Angular front ends tied to the plant floor.',
      metric: '2020–2021',
      date: '2020-01-01T00:00:00.000Z',
      category: 'technical' as const,
      sortOrder: 4,
    },
  ]

  for (const acc of accomplishments) {
    await payload.create({ collection: 'accomplishments', data: acc })
  }
  console.log(`${accomplishments.length} accomplishments seeded`)

  const roles = [
    {
      company: 'Merch',
      logoUrl: 'https://cdn.cosmicjs.com/1ca156b0-0748-11ef-9eca-7d347081a9fb-merch-logo.svg',
      summary:
        'Lead engineering, product development, and technical strategy. Own production infrastructure (AWS Serverless/Lambda, SQS, Mongo + Postgres, Nx monorepo, CircleCI) and delivery of Merch’s unified merchandise platform.',
      positions: [
        { title: 'VP of Engineering', startDate: '2022-02-01T00:00:00.000Z' },
        { title: 'Director of Product Development', startDate: '2021-03-01T00:00:00.000Z', endDate: '2022-02-01T00:00:00.000Z' },
        { title: 'Senior Software Engineer', startDate: '2020-10-01T00:00:00.000Z', endDate: '2021-03-01T00:00:00.000Z' },
      ],
      keyWins: [
        { win: 'Platform scope spans enterprise, creator, and supplier workflows — end-to-end merchandise operations Merch markets as one unified backend' },
        { win: 'Promoted from Senior Engineer to VP in 16 months' },
        { win: 'Own production stack: AWS Serverless, SQS, Mongo + Postgres, Nx monorepo, CircleCI' },
      ],
      sortOrder: 1,
    },
    {
      company: 'Tesla',
      logoUrl: 'https://cdn.cosmicjs.com/1289c300-0749-11ef-9eca-7d347081a9fb-tesla.png',
      summary: 'Built manufacturing integration software using C#, RESTful APIs, SQL, and Angular.',
      positions: [
        { title: 'Software Engineer', startDate: '2020-01-01T00:00:00.000Z', endDate: '2021-01-01T00:00:00.000Z' },
      ],
      keyWins: [
        { win: 'Developed software for Tesla manufacturing systems integration' },
        { win: 'Created service architecture using RESTful APIs and SQL' },
      ],
      sortOrder: 2,
    },
    {
      company: 'Dominion Systems',
      logoUrl: 'https://cdn.cosmicjs.com/b3f88370-0749-11ef-9eca-7d347081a9fb-dominion.png',
      summary: 'Led full-stack development for HR services platform using C# and Angular.',
      positions: [
        { title: 'Lead Full Stack Developer', startDate: '2019-05-01T00:00:00.000Z', endDate: '2020-08-01T00:00:00.000Z' },
      ],
      keyWins: [
        { win: 'Planned and implemented complex project tasks' },
        { win: 'Enforced code quality standards across the team' },
      ],
      sortOrder: 3,
    },
  ]

  for (const role of roles) {
    await payload.create({ collection: 'roles', data: role })
  }
  console.log(`${roles.length} roles seeded`)

  const projects = [
    {
      title: 'DaySmarter.co',
      slug: 'daysmarter',
      summary:
        'Widely used API wrapper and integration layer so businesses can expose live schedules publicly across sites and locations without rebuilding booking systems.',
      role: 'Creator',
      outcomes: [
        { outcome: 'Standardized schedule data behind a single API surface for multi-location display' },
        { outcome: 'Public-facing calendars and embeds powered by the wrapper instead of one-off scrapers' },
      ],
      techStack: [
        { tech: 'TypeScript' },
        { tech: 'REST API' },
        { tech: 'Node.js' },
      ],
      externalUrl: 'https://daysmarter.co',
      featured: true,
      date: '2023-06-01T00:00:00.000Z',
      sortOrder: 1,
    },
    {
      title: 'AI Trader',
      slug: 'ai-trader',
      summary: 'Autonomous ML-driven stock trading agent with live capital execution.',
      role: 'Solo Engineer',
      outcomes: [
        { outcome: 'Consistent portfolio gains over multi-month live runs' },
        { outcome: 'End-to-end AI pipeline: ingestion, inference, execution' },
      ],
      techStack: [
        { tech: 'TypeScript' },
        { tech: 'Deno' },
        { tech: 'Alpaca API' },
        { tech: 'AI/ML' },
      ],
      featured: true,
      date: '2024-02-01T00:00:00.000Z',
      sortOrder: 2,
    },
    {
      title: 'TouchLog',
      slug: 'touchlog',
      summary: 'Internship logging web app adopted by 80 daily active users.',
      role: 'Solo Engineer',
      outcomes: [
        { outcome: '80 daily active users before closure' },
        { outcome: 'Automated hourly logging for GVSU internship students' },
      ],
      techStack: [
        { tech: 'Angular 8' },
        { tech: 'ExpressJS' },
        { tech: 'MongoDB' },
        { tech: 'JWT' },
      ],
      featured: true,
      date: '2020-06-01T00:00:00.000Z',
      sortOrder: 3,
    },
    {
      title: 'Thank You Project',
      slug: 'thank-you-project',
      summary: 'COVID volunteer platform connecting restaurants with first responders — covered by WOOD-TV.',
      role: 'Lead Developer',
      outcomes: [
        { outcome: 'Press coverage on WOOD-TV' },
        { outcome: 'Connected Grand Rapids residents with local restaurants for first responder meals' },
      ],
      techStack: [
        { tech: 'Angular 9' },
        { tech: 'MySQL' },
        { tech: 'C#' },
      ],
      externalUrl: 'https://www.woodtv.com/health/coronavirus/project-thanks-first-responders-supports-restaurants/',
      featured: false,
      date: '2020-05-01T00:00:00.000Z',
      sortOrder: 4,
    },
  ]

  for (const project of projects) {
    await payload.create({ collection: 'projects', data: project })
  }
  console.log(`${projects.length} projects seeded`)

  const articles = [
    {
      title: 'AI Belongs in the Product, Not in a Research Silo',
      description:
        'Most companies treat AI as a science project. The ones winning treat it as infrastructure.',
      link: 'https://adamchlebek.com',
      readTimeMinutes: 8,
      publishDate: '2024-06-15T00:00:00.000Z',
      sortOrder: 1,
    },
    {
      title: 'The 16-Month VP: What Fast Promotions Actually Look Like',
      description:
        'Going from Senior Engineer to VP in 16 months was not a title bump — it was a scope explosion.',
      link: 'https://adamchlebek.com',
      readTimeMinutes: 6,
      publishDate: '2024-03-01T00:00:00.000Z',
      sortOrder: 2,
    },
  ]

  for (const article of articles) {
    await payload.create({ collection: 'articles', data: article })
  }
  console.log(`${articles.length} articles seeded`)

  const testimonials = [
    {
      quote: "Adam is one of the most dynamic and capable people I've had the opportunity to work with. He has consistently taken products and projects from ideation to implementation. Fantastic developer and colleague!",
      authorName: 'Carson R. Hunt',
      authorTitle: 'CEO & Co-founder',
      authorCompany: 'Merch',
      sortOrder: 1,
    },
    {
      quote: 'Adam is brilliant. His drive to learn outside of work and school has put him at a technical ability level beyond his years.',
      authorName: 'Lath L.',
      authorTitle: '',
      authorCompany: '',
      sortOrder: 2,
    },
  ]

  for (const testimonial of testimonials) {
    await payload.create({ collection: 'testimonials', data: testimonial })
  }
  console.log(`${testimonials.length} testimonials seeded`)

  console.log('\nSeed complete')
}

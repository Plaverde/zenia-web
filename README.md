This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Autoevaluación (`/autoevaluacion`)

Self-screening flow for anxiety and depression (PHQ-9 / GAD-7) with local-only
scoring: answers stay in the browser, nothing clinical is persisted or sent to
the server. Includes a safety screen (PHQ-9 item 9), an optional lead form
(`POST /api/lead`, rate-limited), and orientative — never diagnostic — results.
See `CLINICAL-DISCLAIMER.md` for the disclaimer policy and
`PRIVACY-IMPLEMENTATION.md` for how data handling works.

## Documentation

- `PRIVACY-IMPLEMENTATION.md` — how the current implementation handles data
  minimization, local-only screening, rate limiting, security headers, auth,
  and the marketing/clinical data separation (with a pending legal review list).
- `CLINICAL-DISCLAIMER.md` — site-wide clinical disclaimer policy and editorial
  rules for sensitive content.
- `TESTING-CHECKLIST.md` — verification workflow (tsc, vitest 37 tests, build,
  db:push) and manual QA checklists.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

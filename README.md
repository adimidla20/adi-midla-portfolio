# Adi Midla — Personal Portfolio

A Next.js App Router portfolio built around **Anatomy of a Builder**: a personal story about curiosity becoming code, prototypes, and interactive experiences.

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Create a production build with `npm run build` and serve it with `npm start`.

## Before deployment

Set `NEXT_PUBLIC_SITE_URL` to the final public origin (for example, `https://your-domain.example`). The same origin is used for canonical metadata, structured data, the sitemap, and robots rules. No public domain was supplied, so the project does not claim one.

A résumé file and public VR Parkour demo were not supplied. The site therefore does not offer a fabricated download or demo link. Add one when the real file or URL is available.

## Experience and implementation

- Next.js App Router, TypeScript, and SCSS design tokens.
- Real supplied photographs, edited only by cropping and JPEG compression.
- Three.js sculpture scene loaded on the client, with a CSS fallback, pointer response, visibility-aware rendering, reduced-motion support, and resource cleanup.
- GSAP + ScrollTrigger + `@gsap/react` for chapter reveals and reading progress; Lenis runs on the GSAP ticker and is disabled for reduced motion.
- Motion for React drives the mobile navigation; Anime.js handles one restrained hero annotation reveal.
- The projectile-motion lab is a small, self-contained browser experiment; it is not presented as a past project.
- Semantic HTML, keyboard focus styles, native details/summary project expansions, and responsive layouts.
- Open Graph metadata, Person/ProfilePage JSON-LD, sitemap, robots rules, `llms.txt`, and `llms-full.txt`.

## Content notes

Project statuses are intentionally explicit. ExamScannerAI is a backend prototype whose README marks the frontend as planned. Open Source Audit is coursework, Game Physics is an experiment archive, and the VR project is presented as a learning prototype without a public demo. Escape the Quiet Room and Float Quest remain concepts.

The Digital India workshop entry records participation at IIT (BHU) on 31 January 2026. IN-NEC Top 30 is described as a team recognition.

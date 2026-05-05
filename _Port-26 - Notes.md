Port-26 - Notes

http://localhost:4321/

git add .
git commit -m "rounded buttons, updated copy, rearranged skills"
git push

---

after claude completed updates in VS, I went back to the site on local server and got the following error:

transport invoke timed out after 60000ms (data: {"type":"custom","event":"vite:invoke","data":{"name":"fetchModule","id":"send:XpYNUYkF6eSzSEed_OAfv","data":["/src/styles/global.css","/Users/genedavis/Documents/Claude/Projects/Port-26/src/layouts/BaseLayout.astro",{"cached":true,"startOffset":2}]}})

---

The padding/spacing fix from earlier didn't take effect (might have been the session token limit).

Please:

1. Audit every section component in src/components/ and apply this pattern:
   - Outer <section> tag: full-width, vertical padding only (py-16 md:py-24),
     keep any borders/backgrounds here so they extend edge-to-edge
   - Inner wrapper <div>: mx-auto max-w-6xl px-6 md:px-8
2. Apply the same horizontal container pattern to the nav bar and footer so
   everything aligns to the same content column
3. Match the spacing rhythm in the original design screenshot — generous
   vertical breathing room between sections, comfortable horizontal margins

Show me a list of which files you changed before I review.

---

I'm doing a typography accessibility pass. Currently the IBM Plex Mono labels
are showing at 9px when inspected in my browser. Please:

1. Audit every use of font-mono across the site. List each instance with the
   file, the element, and the current size.
2. Apply this size tier system, using rem units (Tailwind arbitrary values like text-[0.6875rem] are fine):
   - Decorative micro-labels (the "Bertis 'Gene' Davis" byline, location label): 0.6875rem (11px)
   - Section headers (SELECTED WORK, APPROACH, CORE SKILLS, EXPERIENCE): 0.75rem (12px)
   - Tags, year columns, work metrics, skill pills, the process chain (Hypothesize→Instrument→Test→Synthesize→Ship): 0.8125rem
3. Show me a diff summary of what changed before saving

Also flag any text-on-background combinations where you're unsure about
contrast — particularly muted gray text on the light gray gradient.

---

I've scaffolded a fresh Astro project with Tailwind and MDX (and React, if you
added it). The Claude Design handoff bundle is in `_design_handoff/` — that
contains the full HTML, CSS, and assets.

Before writing any code, please:

1. Read the handoff bundle (start with any README or index.html, then survey
   the rest)
2. Give me a summary of what's there: pages, sections, components, design
   tokens, assets
3. Propose a mapping from those design files to Astro components, layouts,
   and routes
4. Flag anything that needs decisions from me before you start building

Design context to anchor your plan:

- Stack: Astro + Tailwind + MDX (and React islands only where genuinely needed
  for interactivity — default to static)
- Layout: single-page scroll, dark nav bar minimal, hero with name large
- Fonts (Google): Barlow Condensed 700 for headlines, IBM Plex Mono for
  labels/metadata, Space Grotesk for body
- Background: light gray gradient — #f6f4f0 → #eceae5 → #e0ddd7
- Accent color: #1d4ed8 (electric blue) — used for labels, tags, CTAs only
- Hero: "Gene" solid dark / "Davis" outlined (-webkit-text-stroke: 2px #18170f),
  both ~100px Barlow Condensed uppercase
- Secondary name label: Bertis "Gene" Davis in IBM Plex Mono 9px above the name
- Photo: right-aligned in hero, original B&W shot
- Sections: Work (rows with title/tag/metric/year), Approach (process chain),
  Skills (tag pills), Numbers (stat row), Experience (job list), Footer
- All section dividers: 1px solid rgba(0,0,0,0.09)
- Work metrics in green (#16a34a), tags in accent blue

Do not start writing code yet — I want to review your plan first.

build one section at a time:

Start with the global layout + nav
Then the hero section
Then work rows as a component
Then approach, skills, numbers, experience

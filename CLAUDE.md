# Port-26 · Editorial Register & Portfolio Conventions

This file is read automatically at the start of each session. It governs all chapter writing, editing, and rewriting for this portfolio site.

---

## The project

**Stack:** Astro 6 + Tailwind 4 + MDX + React 19  
**Workspace:** `Port-26/`  
**Chapter files:** `src/content/chapters/*.mdx`  
**Working context files:** underscore-prefixed at project root (gitignored), e.g. `_chapter02_rewrite_working_context.md`

---

## Audience

Multi-phase hiring funnel: recruiters → hiring stakeholders on product/marketing/growth teams → prospective clients. Primary goal is to instill confidence in decision-makers.

Accessible but not dumbed down. Does not assume technical depth; does assume intelligence.

---

## Editorial register

**Tone:** Scientific but cool. Curious, precise, dry-but-warm.  
**Reference point:** NDT, not Grisham. A designer-as-editor — confident, not breathless, not stuffy, not corporate.  
**Voice:** Someone who built the thing and has opinions about it. Not a narrator. Not a publicist.

### What this sounds like
- Plain prose. Declarative sentences. Short where possible, long only when the thought earns it.
- Mono-type moments need somewhere to land — specific numbers, named systems, dates.
- Curiosity over authority. Precision over hedging.
- Lists only when a list is genuinely the right shape — not as a default structure.

### What this does not sound like
- Storytelling or narrative arc — this is a case study, not a memoir.
- Corporate or breathless — no "game-changing," no "powerful," no "exciting."
- Dramatic openers or closers — no cinematic framing.
- Heightened or emotive language — keep the temperature low.
- First-person bravado — "The bet I was making" is too much. Confident but not self-aggrandizing.

---

## Voice rules

- **No "problem" language.** Reframe as constraints, challenges, requirements — not problems.
- **No "rather than a wrapper."** Avoid that framing.
- **No "genuinely"** — reads as hedging or slight arrogance.
- **No "straightforward"** — same.
- **"Asset"** is the universal term for individual creative work.
- **Pullquotes are true pulls** — verbatim lifts from body copy, not standalone callouts. Pick lines that carry weight on their own.
- **Subheadings are kept** where they were part of the original structure — they carry visual styling on the page.
- **"Inbox providers"** not "email clients."
- **No company names** in postscripts unless editorially necessary and approved.

---

## Framing rules

- **Don't foreground the medium** unless the medium creates a specific constraint that the prose needs to address. (e.g., HTML email isn't mentioned until the coding constraint requires naming it.)
- **No "problem solved" arc.** The structure is: remit → hypothesis → work → what generalized. Not a hero narrative.
- **Outcomes are stated once, clearly.** Don't repeat the headline stat in multiple sections.
- **Postscripts are kept** when they preempt obvious reader questions. Frame professionally ("among those affected," not dramatic).
- **Multiple hypotheses** are editorially normal for systems work — present them neutrally, not as bold contrarian bets.
- **Role-shift language** for AI adoption impact: positions weren't disappearing, responsibilities were shifting. Time recovered goes toward compounding work, not just "senior" work — all levels benefit.

---

## MDX structure conventions

Each chapter file (`src/content/chapters/*.mdx`) includes:

**Frontmatter fields:**
- `number`, `title`, `category`, `era`, `methods`, `outcomes`, `prev`, `next`, `artifacts`
- `artifacts` items: `num`, `title`, `tag`, `meta`, `year`
- `outcomes` items: `num`, `lbl`

**Imports:**
- `Pullquote` from `../../components/mdx/Pullquote`
- `SystemDiagram` from `../../components/chapters/SystemDiagram`

**SystemDiagram** is driven by a `diagramLayers` export — array of `{id, name, sub, nodes[]}`. It should be self-contained: tells the story of the architecture simply and cleanly without requiring the prose. Each layer name should not echo language used in adjacent prose sentences (avoid "generation layer" when "generation time" appears nearby — rename to "Output" or similar).

**Section structure:**
- `## §01 · Lede` — context, remit, frame
- `## §02 · Hypothesis` — hypotheses that shaped the build
- `## §03 · The Work` — build progression, architecture, outcomes
- `## §04 · The Lesson` — what generalized; role/human observations; postscript if applicable

**Drop cap note:** The first letter of the first paragraph gets a typographic drop cap treatment. Ensure the opening word begins with a non-problematic letter and the sentence reads cleanly with that letter as a large initial cap. "AI" as the first word renders as "I was..." — avoid.

---

## Process conventions

- **Read the chapter file and any working context file** (`_chapterXX_rewrite_working_context.md`) at the start of each session before writing anything.
- **Lock copy section by section** — don't move forward until the user says "lock it."
- **Flag before fixing** when a choice has real tradeoffs — don't silently decide.
- **Don't use feedback verbatim** — it's context, not copy.
- **Misrepresentation feedback files** (`_misrepresentation_feedback.txt` or similar) take priority over editorial instinct — they are factual corrections, not stylistic preferences.
- **Working context files** (`_chapterXX_rewrite_working_context.md`) should be updated as decisions are locked.

---

## What's stored where

- **This file (`CLAUDE.md`):** Portfolio-wide editorial register and conventions. Read at every session.
- **`_chapterXX_rewrite_working_context.md`:** Chapter-specific working context — locked copy summaries, resolved decisions, pending items. Created per chapter, updated throughout.
- **`_misrepresentation_feedback.txt` (or similar):** Factual correction notes from the portfolio owner. Read before writing.
- All underscore-prefixed files at project root are gitignored.

# Project Status & Carryover

A snapshot of where I am, written so I can paste relevant pieces into a new Cowork chat (or any new Claude conversation) and get back into context fast.

---

## Carryover prompt (paste this verbatim into a new Cowork chat)

```
I'm continuing work from a previous Cowork session. Quick context to bring you up to speed:

BACKGROUND
- Designer-coder transitioning into AI-assisted web work.
- Adobe ecosystem fluent. Front-end coding (HTML/CSS/JS) experience.
- Earlier career: heavy ActionScript and GSAP/Flash design work; rusty on the modern JS/React/build-tool stack.
- Senior UX practitioner — thousands of usability tests over the years, design leadership, but not a curated archive of work samples. Many strongest visual pieces are AS3-era and don't translate to modern browsers.
- 2018 Intel MacBook Pro, macOS Sequoia 15.7.5, comfortable with terminal basics.

WHAT'S SET UP AND WORKING
- Homebrew 5.0.10, Node v24.11.1 (LTS, via brew), npm 11.6.2, Git 2.52.0
- gh (GitHub CLI) authenticated to my GitHub account
- Starship prompt active, JetBrainsMono Nerd Font installed
- VS Code with extensions: Claude Code, GitLens, ESLint, Prettier, Markdown All in One
- Vercel account connected to GitHub
- Global ~/.claude/CLAUDE.md set up with my preferences
- Claude Code (Sonnet 4.6 default; Opus 4.7 available via /model) authenticated and working
- Throwaway projects (hello-world static page, hello-next Next.js) successfully deployed end-to-end on Vercel — git → GitHub → Vercel loop works

CURRENT WORK
- Designed the portfolio foundation in Claude Design (Astro + Tailwind + MDX direction; editorial/narrative-heavy to compensate for limited modern visual samples).
- Have the design HTML files, iterations, and assets exported, plus Claude Design's handoff bundle.
- Next step: scaffold a real portfolio project, apply the design, deploy.

REFERENCE DOCS in /Users/genedavis/Documents/Claude/Projects/AI Sites 01/
- AI-Native Web Setup Guide.md — the why/what reference
- First Setup Walkthrough.md — the do-this-then-this guide (annotated with my progress)
- Parked Items.md — issues we've deferred (home-folder git check, npm sudo permissions, terminal font glyphs, etc.)
- Project Status and Carryover.md — this file

HOW I'D LIKE TO WORK WITH YOU
- I'm rusty, so explain in plain language first, then show the command.
- If a step might fail in different ways, briefly describe each failure mode.
- Walk me through new things step by step; I'll ask follow-ups.
- Direct and warm — don't hedge or apologize excessively.
- For routine work I'll go to Claude Code in my terminal; come to you for guidance, planning, and step-by-step help.

IMMEDIATE NEXT STEP
I've created the portfolio project folder at ~/Documents/Claude/Projects/Port-26. Help me set up the new portfolio project to include scaffold Astro and feed it the Claude Design handoff. Previously when learning, I used claude in VS terminal, though may benefit from using Code in this desktop app. Walk me through it step by step how to approach this project, including how to swicth betwen Code in this desktop app and calude in VS terminal.
```

---

## When to use which surface

| If you want to...                                                      | Use...                             |
| ---------------------------------------------------------------------- | ---------------------------------- |
| Iterate on visual design                                               | Claude Design (claude.ai/design)   |
| Edit code in your repo, run tests, run dev server, deploy              | Claude Code (`claude` in terminal) |
| Get planning help, ask "what should I do next," produce reference docs | Cowork (this surface)              |
| Quick factual questions, prose, snippets                               | claude.ai chat                     |

The hand-off rhythm: design in Claude Design → guidance from Cowork → build in Claude Code → back to Cowork when stuck.

---

## Parked items I haven't cleared yet

See _Parked Items.md_ in this folder. Worth a look every few sessions to see if any are now blocking, especially:

1. Verify home folder isn't a git repo (`ls -la ~/.git`)
2. Git commit email / Vercel email alignment (if I want to deploy private repos)
3. npm global permissions (currently using `sudo` for global installs)

---

_Update this doc when state changes meaningfully — new tools installed, new constraints, new direction._

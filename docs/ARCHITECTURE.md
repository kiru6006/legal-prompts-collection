# Architecture Specification

## 1. Static Web Architecture
- **Host**: GitHub Pages (`https://kiru6006.github.io/legal-prompts-collection/`).
- **Base URL**: `/legal-prompts-collection/` (configured in Vite via `base: '/legal-prompts-collection/'` or `./`).
- **Client Runtime**: React 18, TypeScript, Tailwind CSS, Zustand, Fuse.js, Lucide Icons.
- **Data Delivery**: Single compiled JSON file at `public/data/skills.json` loaded via HTTP GET.

## 2. Decoupled Pipeline
- Python runs purely offline and in CI/CD.
- Reads `.upstream` repository, parses markdown frontmatter safely, merges overlay layers, validates with Pydantic v2, and outputs `public/data/skills.json`.
- Zero runtime Python or database dependencies.

## 3. Privacy & Zero-Persistence Model
- Client matter variables exist strictly in browser JavaScript heap memory.
- No localStorage or sessionStorage persistence of client facts or prompt inputs.
- External action buttons (like "Open Claude") perform standard navigation without forwarding user data.

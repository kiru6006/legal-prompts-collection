# Architecture Decision Records (ADR)

## ADR-001: Static Client-Side Architecture over Full-Stack Server
- **Status**: Accepted
- **Context**: Deployment target is GitHub Pages without server-side execution.
- **Decision**: Precompile all upstream and educational metadata into `public/data/skills.json` during build. Frontend runs 100% in browser.
- **Consequences**: Fast response times, zero server hosting costs, complete confidentiality guarantee.

## ADR-002: Native Hash Navigation over React Router
- **Status**: Accepted
- **Context**: Deep links on GitHub Pages often result in 404 HTTP errors without custom 404 rewrite hacks.
- **Decision**: Use native window hash navigation (`#/skill/...`) managed by a dedicated Zustand store.
- **Consequences**: Reliable deep-linking and browser back/forward on static hosts without server rewrites.

## ADR-003: Memory-Only Matter Inputs
- **Status**: Accepted
- **Context**: Legal professionals handle sensitive privileged information.
- **Decision**: No prompt form inputs are ever saved to localStorage, indexedDB, or analytics.
- **Consequences**: Accidental data leakage from shared computers is eliminated.

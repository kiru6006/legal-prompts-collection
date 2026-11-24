# Test Strategy & Quality Assurance

## 1. Python Pipeline Tests (pytest)
- Schema validation with Pydantic v2.
- Detection of unresolved prompt template variables (`{{VAR}}`).
- Upstream drift detection against pinned commit `4a6c651889c97cc9140580363c73e0eb17379c2b`.
- Cross-reference integrity between skills, workflows, and case studies.

## 2. Frontend Unit & Component Tests (Vitest & Testing Library)
- Variable replacement in PromptBuilder.
- Fuzzy search and category filtering with Fuse.js.
- Native hash route resolution.
- State isolation in Zustand stores.

## 3. End-to-End & Smoke Tests
- Build artifact integrity verification (`dist/data/skills.json` presence).
- GitHub Pages deep-link and asset loading smoke test.

# Requirements Traceability Matrix (RTM)

| Req ID | Description | Phase | Target File / Component | Status |
|---|---|---|---|---|
| REQ-001 | Import complete upstream catalogue | Phase 0/2 | `scripts/build_skills.py` | Implemented |
| REQ-002 | Distinguish first-party vs external plugins | Phase 0/2 | `config/upstream.yaml` | Implemented |
| REQ-003 | Three-layer content model | Phase 1/2 | `content/overlays`, `content/india` | Implemented |
| REQ-004 | Native URL hash routing | Phase 3 | `src/stores/navigationStore.ts` | In Progress |
| REQ-005 | Zero-persistence memory store | Phase 3 | `src/stores/matterStore.ts` | In Progress |
| REQ-006 | Dynamic prompt builder with validation | Phase 3 | `src/features/prompt-builder` | In Progress |
| REQ-007 | Indian legal framework integration | Phase 5 | `content/india`, `src/features/india` | In Progress |
| REQ-008 | Guided legal workflows (min 5) | Phase 6 | `content/workflows` | In Progress |
| REQ-009 | Practical case studies (min 15) | Phase 4/5 | `content/case-studies` | In Progress |
| REQ-010 | GitHub Actions CI/CD deployment | Phase 8 | `.github/workflows` | Implemented |

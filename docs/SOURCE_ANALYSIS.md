# Phase 0: Upstream Source Analysis Report

## 1. Upstream Metadata
- **Repository URL**: `https://github.com/anthropics/claude-for-legal`
- **Pinned Commit SHA**: `4a6c651889c97cc9140580363c73e0eb17379c2b`
- **License**: Apache-2.0
- **Marketplace Manifest**: `.claude-plugin/marketplace.json` (lists 13 plugin entries)

## 2. Verified Structure Breakdown
- **First-Party Plugins**: 12 plugins
  1. `ai-governance-legal` (v1.0.2) - 10 skills
  2. `commercial-legal` (v1.0.2) - 12 skills
  3. `corporate-legal` (v1.0.2) - 13 skills
  4. `employment-legal` (v1.0.2) - 20 skills
  5. `ip-legal` (v1.0.2) - 12 skills
  6. `law-student` (v1.0.2) - 13 skills
  7. `legal-builder-hub` (v1.0.2) - 10 skills
  8. `legal-clinic` (v1.0.2) - 16 skills
  9. `litigation-legal` (v1.0.2) - 19 skills
  10. `privacy-legal` (v1.0.2) - 9 skills
  11. `product-legal` (v1.0.2) - 7 skills
  12. `regulatory-legal` (v1.0.2) - 9 skills
- **External Plugins**: 1 plugin
  1. `external_plugins/cocounsel-legal` (v0.1.0) - 1 skill (`deep-research`)
- **Total Skills (SKILL.md)**: 151 skills

## 3. Invocation Models Discovered
1. **Direct User Invocable Commands**: Skills configured with `user-invocable: true` or containing explicit slash commands (e.g. `/commercial-legal:review`, `/litigation-legal:chronology`).
2. **Sub-skills / Internal Router Targets**: Skills configured with `user-invocable: false`, invoked by orchestrators (e.g. `nda-review`, `saas-msa-review` routed by `/commercial-legal:review`).
3. **Practice Workspace & Cold-Start Skills**: `cold-start-interview` and `matter-workspace` skills present across nearly every plugin to establish local context.

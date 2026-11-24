# Claude Legal Skills Workbench

> **An Unofficial Visual Field Guide and Interactive Prompt Workbench for Legal Professionals**

[![GitHub Pages Deployment](https://github.com/kiru6006/legal-prompts-collection/actions/workflows/deploy.yml/badge.svg)](https://kiru6006.github.io/legal-prompts-collection/)
[![Licence: Apache-2.0](https://img.shields.io/badge/Licence-Apache%202.0-blue.svg)](LICENSE)
[![Zero-Persistence Privacy](https://img.shields.io/badge/Privacy-Zero--Persistence%20Local-emerald.svg)](#zero-persistence-privacy-model)
[![Canonical Skills](https://img.shields.io/badge/Official%20Skills-151-indigo.svg)](#official-skill-categories)
[![Indian Law Adaptations](https://img.shields.io/badge/Indian%20Law%20Overlays-18-teal.svg)](#indian-legal-practice-adaptations)

---

## 1. Product Vision & Overview

The **Claude Legal Skills Workbench** is an independent educational platform designed to help advocates, corporate counsel, legal operations specialists, and law students understand, configure, and safely execute AI legal skills.

Rather than treating AI as an unstructured chat interface, this workbench demonstrates how to use **Anthropic's official `claude-for-legal` architecture** to turn Claude into a deterministic legal workbench grounded in law firm playbooks, matter workspaces, and professional verification standards.

### Live Application
- **Production URL**: [https://kiru6006.github.io/legal-prompts-collection/](https://kiru6006.github.io/legal-prompts-collection/)
- **Upstream Source**: [anthropics/claude-for-legal](https://github.com/anthropics/claude-for-legal)
- **Pinned Commit SHA**: `4a6c651889c97cc9140580363c73e0eb17379c2b`
- **Hosting**: Static single-page application on GitHub Pages (Zero backend servers)

---

## 2. Key Architecture & Features

### ⚡ Skill-First User Interface
- **48px Compact Header**: Quick navigation, instant search trigger (`⌘K` / `Ctrl+K`), quick start, and saved bookmarks.
- **Unified Skill Detail View**: Direct access to the official command shortcut, standalone prompt template, and realistic expected deliverable—without distracting multi-tab switching.
- **Top-Right "Skill Info & Checks" Modal**: Dedicated dialog with deep contextual guidance: when to use vs. when not to use, environment prerequisites, Indian legal context, and verification checklists.
- **Adaptive Single & Dual-Pane Layout**: Automatically displays a balanced side-by-side prompt and sample deliverable when output blueprints exist, and a centered full-width workflow reader for interactive skills (e.g. `cold-start-interview`).

### 🛡️ Zero-Persistence Privacy Model
- **RAM-Only Execution**: Matter variables, client names, and prompt modifications are handled exclusively in transient browser memory.
- **Zero Remote Storage**: No client documents, personal identifiers, or confidential prompts are transmitted to analytics servers or cloud databases.
- **Browser LocalStorage**: Restricted solely to saving non-confidential UI preferences and bookmarked skill IDs.

### 🏛️ Indian Legal Practice Adaptations
- **18 Specialized Overlays**: Built-in statutory grounding for Indian legal practitioners across:
  - **DPDP 2023**: Digital Personal Data Protection Act 2023 (data fiduciary obligations, cross-border transfers).
  - **BNS 2023**: Bharatiya Nyaya Sanhita 2023 (transitional criminal jurisprudence and statutory succession).
  - **Arbitration & Conciliation Act 1996**: Section 9 interim relief, Section 11 appointments, and emergency arbitrator rules.
  - **Companies Act 2013 & Indian Contract Act 1872**: Commercial contract enforceability, stamp duty, and High Court practice directions.

### 🔍 Global Instant Search
- Instant modal search (`⌘K` / `Ctrl+K`) with full keyboard navigation (`ArrowUp` / `ArrowDown` / `Enter` / `Escape`) across all 151 skills, command shortcuts, categories, and statutory tags.

---

## 3. Official Skill Categories

The workbench compiles and indexes all 151 skills across Anthropic's 12 first-party legal categories plus external plugins:

| Category | Skills | Primary Focus & Capabilities |
| :--- | :---: | :--- |
| **AI Governance Legal** | 10 | AI impact assessments, acceptable use policies, vendor AI addenda, model inventory audits. |
| **Commercial Legal** | 16 | Contract triage, NDA review, MSA playbooks, limitation of liability, indemnification drafting. |
| **Corporate Legal** | 14 | Board minutes, cap table diligence, disclosure schedules, merger filings, corporate resolutions. |
| **Employment Legal** | 14 | Severance agreements, restrictive covenants, workplace investigations, contractor classification. |
| **Intellectual Property Legal** | 14 | Trademark clearance, patent landscape summaries, copyright fair use, IP licensing terms. |
| **Law Student** | 12 | Case brief generation, statutory interpretation exercises, IRAC/CREAC drafting, oral argument prep. |
| **Legal Builder Hub** | 10 | Plugin authoring, custom skill scaffolding, connector setup, prompt testing harnesses. |
| **Legal Clinic** | 12 | Client intake interviews, pro bono intake sheets, eviction defense triage, benefit appeal letters. |
| **Litigation Legal** | 15 | Deposition summaries, discovery requests, motion to dismiss outlines, privilege logs. |
| **Privacy Legal** | 15 | GDPR/CCPA compliance, DPIA drafting, privacy notices, data breach response plans. |
| **Product Legal** | 11 | Feature risk reviews, terms of service drafting, marketing claim reviews, telemetry auditing. |
| **Regulatory Legal** | 13 | Regulatory change tracking, comment letters, compliance gap analysis, enforcement audits. |
| **External Plugins** | 5 | CoCounsel Legal and verified third-party extensions. |

---

## 4. How Legal Professionals Use These Skills

### Workflow 1: Official Claude Code / Chat CLI Invocation
For teams using Claude Code or Claude Chat with plugin integration:

```bash
# 1. Install official category plugin
/plugin install commercial-legal

# 2. Run cold-start interview to configure your firm's CLAUDE.md practice profile
/commercial-legal:cold-start-interview --side sales

# 3. Execute specific skill directly against matter files
/commercial-legal:nda-review contracts/vendor_nda.pdf --side vendor
```

### Workflow 2: Standalone Web Chat Execution (`claude.ai`)
For advocates and lawyers without CLI access:
1. Open any skill in the workbench (e.g. `commercial-legal:nda-review`).
2. Adjust matter variables (Party names, Jurisdiction, Risk tolerance) or click **Load Sample**.
3. Click **Copy Prompt** and paste into [claude.ai](https://claude.ai) alongside the document text.
4. Verify the generated output against the **Sample Expected Deliverable** displayed in the right column.

---

## 5. Technology Stack

### Frontend Application
- **Framework**: React 19 / 18 with TypeScript in strict mode
- **Build Tool**: Vite 6 (configured with relative `./` asset resolution for GitHub Pages)
- **Styling**: Tailwind CSS with legal palette tokens (`#0F5C6B` primary, `#0F172A` text, `#F8FAFC` background)
- **State Management**: Zustand (URL hash router, search filters, transience-guaranteed matter store)
- **Icons**: Lucide React
- **Markdown & Code**: `react-markdown` + `remark-gfm`
- **Testing**: Vitest + React Testing Library

### Python Content Pipeline (Compile-Time Only)
*Executed strictly during build and CI/CD validation. Python never executes in the production browser.*
- **Runtime**: Python 3.11+
- **Data Validation**: Pydantic v2
- **Frontmatter & YAML**: PyYAML, python-frontmatter
- **CLI Compiler**: Click
- **Test Automation**: pytest

---

## 6. Project Structure

```
├── .github/workflows/       # GitHub Actions CI/CD (deployment and quality check)
├── data/                    # Canonical compiled skills catalogue & manifest
├── docs/                    # Architectural decisions (BRD, PRD, Security, Model)
├── public/                  # Static assets, 404.html redirect, .nojekyll
├── scripts/                 # Python build compiler and schema validators
│   ├── build_skills.py      # Upstream discovery and overlay merge pipeline
│   ├── schema.py            # Pydantic v2 data models for skill catalogue
│   ├── seed_content.py      # Seed content for educational overlays and India law
│   ├── validate_content.py  # Strict catalogue validation script
│   └── tests/               # Pytest suite for build pipeline
├── src/                     # React application source code
│   ├── components/
│   │   ├── common/          # GlobalSkillSearch (⌘K), CopyButton, Badges
│   │   └── layout/          # CompactHeader, DesktopSkillSidebar, Drawer, AppShell
│   ├── features/
│   │   ├── prompt-builder/  # DynamicVariableForm, PromptBlock
│   │   ├── response-preview/# ResponsePreviewPane (formatted/raw Markdown)
│   │   └── skills/          # SkillDirectory, SkillDetail, SkillInfoModal
│   ├── pages/               # GettingStartedPage, IndianPracticePage, AboutPage
│   ├── stores/              # navigationStore (hash router), catalogueStore, matterStore
│   └── types/               # TypeScript interfaces for catalogue records
├── index.html               # Single Page Application entry point
├── package.json             # NPM dependencies and build scripts
└── vite.config.ts           # Vite bundler configuration
```

---

## 7. Local Development Guide

### Prerequisites
- Node.js 20+ and npm
- Python 3.11+ (for re-compiling the catalogue from source)

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/kiru6006/legal-prompts-collection.git
cd legal-prompts-collection

# 2. Install Node dependencies
npm install

# 3. Start local development server with Hot Module Reloading (HMR)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Running Quality Checks & Tests

```bash
# Run TypeScript compilation and frontend unit tests
npm run build
npm run test:unit

# Validate Python data compilation pipeline
python3 scripts/validate_content.py
PYTHONPATH=scripts python3 -m pytest scripts/tests/
```

---

## 8. GitHub Pages Deployment

The application is deployed continuously to GitHub Pages.

### Dual Deployment Architecture
1. **GitHub Actions**: Configured via `.github/workflows/deploy.yml` to automatically build from `main` and deploy via `actions/deploy-pages@v4`.
2. **Dedicated `gh-pages` Branch**: Maintained with clean production artifacts (`index.html`, `assets/`, `data/`, `404.html`, `.nojekyll`) for direct branch serving.

---

## 9. Professional & Ethical Verification Guardrails

1. **Human Advocate Oversight**: AI-generated legal analyses, redline proposals, and triage tables are drafts strictly requiring human lawyer review and sign-off.
2. **Confidentiality & Redaction**: Never paste unredacted client identifiers, trade secrets, or non-public financial records into cloud AI platforms.
3. **Statutory Currency**: Always verify statutory provisions against the official gazette or [India Code](https://www.indiacode.nic.in/).
4. **Citation Diligence**: Verify all case citations in official law reports (SCC / SCR / AIR).

---

## 10. Legal Disclaimer

This repository and application are independent educational and research tools. They are **not affiliated with, endorsed by, or sponsored by Anthropic, PBC, courts of law, bar councils, or government regulatory bodies**. Nothing in this application constitutes legal advice. Users must exercise independent professional legal judgment.

---

## 11. Licence

Distributed under the **Apache-2.0 Licence**. See [LICENSE](LICENSE) for details. Upstream metadata derived from `anthropics/claude-for-legal` under Apache-2.0.

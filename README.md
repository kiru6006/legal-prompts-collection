# Claude Legal Skills Workbench

An independent, visual educational guide and prompt workbench for legal professionals exploring AI skills.

## Overview
This platform visualises official legal capabilities from the upstream `claude-for-legal` repository, providing structured educational walkthroughs, dynamic prompt builders, synthetic output blueprints, and Indian jurisdiction adaptations.

## Features
- **Official Skill Catalogue**: 151 upstream skills categorized across 13 plugins (12 first-party, 1 external).
- **Interactive Prompt Builder**: Live prompt generation with variable schema validation.
- **Indian Legal Framework**: Real statutory mapping, transitional provisions, and legal verification guardrails.
- **Zero-Persistence Privacy**: Matter inputs remain strictly in browser RAM; no client data is transmitted or stored.
- **Static Hosting Architecture**: Pure React 18, TypeScript, Tailwind CSS, and Zustand deployed on GitHub Pages.

## Development & Build Pipeline
```bash
# Set up Python environment
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Run Python data build
make data-build
make data-validate

# Install frontend dependencies and run dev server
npm install
npm run dev

# Production build
npm run build
make pages-prep
```

## Disclaimer
Educational resource only. Not legal advice. Not affiliated with Anthropic, courts, or government regulatory bodies.

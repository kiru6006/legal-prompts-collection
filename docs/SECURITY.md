# Security & Data Privacy Architecture

## Security Principles
1. **Zero External API Calls**: The client application issues zero runtime network requests for AI generation or analytics.
2. **Safe Markdown Rendering**: `react-markdown` operates with HTML parsing disabled to prevent script injection and Cross-Site Scripting (XSS).
3. **No Persistent Client Data**: Prompts, draft notices, and party names typed into the interactive builder remain exclusively in transient browser memory.
4. **Confidentiality Pre-Flight**: Interactive checklist prompts advocates to anonymise client and counterparty names before copying prompts.
5. **Static Hosting Integrity**: GitHub Pages serves compiled static assets; no server credentials, database connection strings, or API secrets exist.

# Content Model & Layer Architecture

The platform architecture enforces three distinct content layers:

```
+-------------------------------------------------------------------+
| Layer 3: Indian Legal Practice Overlays                          |
| - Relevant Indian legislation (e.g. CPC, DPDPA, Companies Act)   |
| - Jurisdictional considerations, court rules, transitional laws   |
+-------------------------------------------------------------------+
                                  |
+-------------------------------------------------------------------+
| Layer 2: Educational Walkthrough Overlays                         |
| - Fictional scenarios, variable schemas, prompt templates         |
| - Synthetic illustrative outputs, verification checklists, PEAS   |
+-------------------------------------------------------------------+
                                  |
+-------------------------------------------------------------------+
| Layer 1: Canonical Upstream Metadata                              |
| - Pinned upstream commit, official plugin/skill names             |
| - Official invocation commands, prerequisites, connectors        |
+-------------------------------------------------------------------+
```

## Layer Separation Principles
1. Upstream metadata is never modified or fabricated.
2. If an educational overlay is missing, the skill displays status `catalogue-only`.
3. Indian legal overlays are explicitly labeled as independent jurisdictional adaptations.

# PRODUCT REQUIREMENTS DOCUMENT (PRD)

# Claude Legal Skills Workbench

An Unofficial Visual Guide and Interactive Learning Platform for AI-Assisted Legal Practice

## Document control

| Attribute                | Details                                                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Product name             | Claude Legal Skills Workbench                                                                                             |
| Document type            | Product Requirements Document                                                                                             |
| Version                  | 1.0                                                                                                                       |
| Status                   | Proposed for implementation                                                                                               |
| Date                     | 24 November 2026                                                                                                          |
| Product category         | LegalTech, Generative AI, Legal Education                                                                                 |
| Target market            | India and international legal professionals                                                                               |
| Development methodology  | AI-Assisted SDLC                                                                                                          |
| Development environment  | Google Antigravity IDE                                                                                                    |
| Frontend                 | React, TypeScript, Vite, Tailwind CSS                                                                                     |
| Content engineering      | Python, Pydantic, Markdown, JSON                                                                                          |
| Hosting                  | GitHub Pages                                                                                                              |
| Repository               | `kiru6006/legal-prompts-collection`                                                                                            |
| Proposed application URL | [https://kiru6006.github.io/legal-prompts-collection/](https://kiru6006.github.io/legal-prompts-collection/) |
| Upstream repository      | [https://github.com/anthropics/claude-for-legal](https://github.com/anthropics/claude-for-legal)   |
| Commercial model         | Free educational platform for MVP                                                                                         |
| Infrastructure model     | Static-first, serverless hosting                                                                                          |
| Intended audience        | Product owners, developers, legal experts, architects, designers and QA engineers                                         |

## Table of contents

| Section | Description                               |
| ------- | ----------------------------------------- |
| 1       | Executive summary                         |
| 2       | Business background and problem statement |
| 3       | Product vision and mission                |
| 4       | Business and product objectives           |
| 5       | Stakeholders and user personas            |
| 6       | Product scope                             |
| 7       | Product information architecture          |
| 8       | User journeys                             |
| 9       | Functional requirements                   |
| 10      | Official skill catalogue                  |
| 11      | Skill detail specification                |
| 12      | Interactive prompt builder                |
| 13      | Response visualisation engine             |
| 14      | Indian legal practice module              |
| 15      | Legal case study library                  |
| 16      | Legal workflow studio                     |
| 17      | Legal AI learning centre                  |
| 18      | Search and discovery                      |
| 19      | UI/UX requirements                        |
| 20      | Technical architecture                    |
| 21      | Content engineering pipeline              |
| 22      | Data model                                |
| 23      | Content validation and governance         |
| 24      | Security and privacy                      |
| 25      | Legal and professional compliance         |
| 26      | Non-functional requirements               |
| 27      | Testing strategy                          |
| 28      | CI/CD and deployment                      |
| 29      | Upstream synchronisation                  |
| 30      | AI-assisted SDLC implementation roadmap   |
| 31      | Requirements traceability                 |
| 32      | Success metrics                           |
| 33      | Risks and mitigation                      |
| 34      | Release acceptance criteria               |
| 35      | Future product roadmap                    |
| 36      | Definition of done                        |

# 1. Executive summary

Claude Legal Skills Workbench is a static, interactive legal technology platform designed to help advocates, corporate lawyers, law students, legal researchers and compliance professionals understand and safely use AI-assisted legal skills.

The application converts the upstream Claude for Legal ecosystem into a structured visual learning experience.

Instead of requiring legal professionals to read technical documentation, plugin configurations and individual Markdown skill definitions, the platform provides a centralised interface where users can discover legal skills, understand their purpose, configure prompts, examine fictional legal scenarios and review illustrative outputs.

The product introduces an independent Indian legal practice layer covering Indian legislation, procedural requirements, professional responsibilities and jurisdiction-specific considerations.

The application does not directly execute artificial intelligence models. It provides educational instructions and configurable prompts that users can manually execute in an appropriate Claude environment.

## 1.1 Core product capabilities

## Claude Legal Skills Workbench

Skill Explorer

Official skills and execution guidance

Prompt Workbench

Interactive legal prompt configuration

India Legal Practice

Indian laws and procedural adaptations

Workflow Studio

Connected legal task sequences

Case Study Library

Fictional practical legal matters

Legal AI Academy

AI concepts, PEAS and responsible AI

Verification Centre

Legal review and evidence validation

Personal Workspace

Bookmarks and learning preferences

## 1.2 Product positioning

The application is not:

- A law firm management system.
- An automated legal advice platform.
- A replacement for qualified legal professionals.
- An official Anthropic product.
- A live AI execution platform.
- A legal research database.

It is an independent legal AI education, discovery and workflow configuration platform.

# 2. Business background and problem statement

## 2.1 Existing challenges

| ID    | Business problem                                                | Impact                           |
| ----- | --------------------------------------------------------------- | -------------------------------- |
| BP-01 | Legal AI skills are distributed across technical repositories   | Difficult discovery              |
| BP-02 | Lawyers may lack technical knowledge of plugins and agents      | Low adoption                     |
| BP-03 | Users do not know which prompt suits a legal task               | Inconsistent outputs             |
| BP-04 | Official skill execution and ordinary chat prompts are confused | Incorrect expectations           |
| BP-05 | Legal AI examples are often generic                             | Limited practical relevance      |
| BP-06 | Upstream legal content may focus on foreign jurisdictions       | Indian legal adaptation required |
| BP-07 | AI-generated legal citations may be incorrect                   | Professional and litigation risk |
| BP-08 | Confidential information may be shared with external AI tools   | Privacy and privilege risk       |
| BP-09 | Individual AI skills are not presented as connected workflows   | Fragmented legal work            |
| BP-10 | Legal professionals lack structured AI learning resources       | Skills development gap           |
| BP-11 | Upstream skills evolve over time                                | Content becomes outdated         |
| BP-12 | AI-generated content may be mistaken for verified legal advice  | Professional liability risk      |

## 2.2 Proposed solution

Develop a centralised, data-driven legal AI workbench that connects:

```
LEGAL PROFESSIONAL'S REQUIREMENT
│
├── Identify legal practice area
├── Select appropriate legal task
├── Discover relevant AI skill
├── Understand prerequisites
├── Configure prompt variables
├── Review fictional case example
├── Examine expected output structure
├── Execute manually in supported AI environment
├── Verify facts, authorities and legal reasoning
└── Obtain professional review
```

# 3. Product vision and mission

## 3.1 Vision

To create an accessible and reliable educational platform for legal professionals to understand and responsibly adopt AI-assisted legal workflows, with particular emphasis on Indian legal practice.

## 3.2 Mission

Enable every legal professional, regardless of technical expertise, to discover, understand, configure and independently verify AI-assisted legal tasks.

## 3.3 Product principles

| Principle              | Requirement                                           |
| ---------------------- | ----------------------------------------------------- |
| Legal accuracy         | Do not fabricate legal authorities                    |
| Source transparency    | Every official skill must have traceable provenance   |
| Human accountability   | Final professional decisions remain with humans       |
| Privacy by design      | Matter-specific inputs are not transmitted by the app |
| Educational clarity    | Explain how and why a skill works                     |
| Jurisdiction awareness | Separate international and Indian legal requirements  |
| Maintainability        | Generate the catalogue automatically                  |
| Accessibility          | Support desktop, tablet and mobile                    |
| Independence           | Clearly identify unofficial educational adaptations   |
| Cost efficiency        | Operate without mandatory backend infrastructure      |

# 4. Business and product objectives

| ID     | Objective                           | Target                                    |
| ------ | ----------------------------------- | ----------------------------------------- |
| OBJ-01 | Centralise official skill discovery | Complete pinned upstream inventory        |
| OBJ-02 | Simplify legal AI adoption          | Guided execution instructions             |
| OBJ-03 | Improve prompt quality              | Validated configurable templates          |
| OBJ-04 | Demonstrate practical application   | Minimum 15 complete walkthroughs          |
| OBJ-05 | Support Indian legal professionals  | 18 practice categories                    |
| OBJ-06 | Teach connected legal workflows     | Minimum five complete workflows           |
| OBJ-07 | Provide practical legal education   | Minimum 15 fictional case studies         |
| OBJ-08 | Improve professional verification   | Checklist for every complete overlay      |
| OBJ-09 | Maintain current source information | Automated upstream change detection       |
| OBJ-10 | Minimise operating costs            | Static GitHub Pages deployment            |
| OBJ-11 | Protect confidential information    | No persistent matter-specific storage     |
| OBJ-12 | Support future expansion            | Provider-independent content architecture |

# 5. Stakeholders and user personas

## 5.1 Stakeholders

| Stakeholder          | Responsibility                           |
| -------------------- | ---------------------------------------- |
| Product owner        | Product vision, scope and prioritisation |
| Legal subject expert | Legal content development                |
| Legal reviewer       | Professional verification                |
| Solution architect   | Technical architecture                   |
| Frontend engineer    | React application                        |
| Python engineer      | Content engineering pipeline             |
| AI/ML specialist     | Prompt design and AI education           |
| UI/UX designer       | User experience and accessibility        |
| QA engineer          | Functional and automated testing         |
| Security engineer    | Privacy and security validation          |
| DevOps engineer      | CI/CD and deployment                     |
| Content maintainer   | Upstream updates and content governance  |

## 5.2 User personas

Independent advocate\
Needs legal notices, case preparation, evidence analysis and procedural research.

Use cases: Civil recovery, bank account freeze, bail preparation.

Corporate and in-house counsel\
Needs contract review, due diligence, compliance and governance.

Use cases: NDA review, vendor MSA, AI procurement.

Law student\
Needs legal reasoning, case briefing and practical exercises.

Use cases: IRAC, FILAC, Socratic learning, moot preparation.

Legal researcher\
Needs research frameworks, judgment analysis and authority verification.

Use cases: Case comparison, legal issue extraction.

Compliance and privacy professional\
Needs regulatory obligation mapping and evidence-based assessments.

Use cases: DPDP assessment, DPA review, AI impact assessment.

Legal technology developer\
Needs to understand skills, agents, prompts and workflow design.

Use cases: PEAS, practice profiles, AI evaluation.

# 6. Product scope

## 6.1 In scope: MVP

| Module                  | Priority | Scope                                     |
| ----------------------- | -------- | ----------------------------------------- |
| Official Skill Explorer | Critical | Complete upstream catalogue               |
| Getting Started         | Critical | Installation and execution guidance       |
| Prompt Workbench        | Critical | Dynamic prompt configuration              |
| Response Preview        | Critical | Synthetic output visualisation            |
| India Legal Practice    | High     | Jurisdiction-specific educational content |
| Legal Task Library      | High     | Task-based skill discovery                |
| Case Study Library      | High     | Fictional legal scenarios                 |
| Workflow Studio         | High     | Connected legal workflows                 |
| Global Search           | Critical | Fuzzy search and filters                  |
| Verification Centre     | Critical | Legal and factual review requirements     |
| Learning Centre         | High     | Legal AI and PEAS education               |
| Personal Workspace      | Medium   | Non-sensitive bookmarks and preferences   |
| Content Compiler        | Critical | Python validation and JSON generation     |
| Upstream Sync           | High     | Automated change detection                |
| GitHub Pages Deployment | Critical | Static production hosting                 |

## 6.2 Out of scope

The following are excluded from MVP:

- Runtime AI API integration.
- Authentication and user accounts.
- Database servers.
- Client document storage.
- Automated court filing.
- Automated legal representation.
- Live judgment scraping.
- Payments and subscriptions.
- Client relationship management.
- Automated contract approval.
- Autonomous legal agents.
- Confidential document uploads.
- Real-time legal advice.

# 7. Product information architecture

```
CLAUDE LEGAL SKILLS WORKBENCH
│
├── 01. HOME
│   ├── Product Overview
│   ├── Quick Start
│   ├── Explore by Practice Area
│   ├── Explore by Legal Task
│   ├── Explore by Professional Role
│   └── Catalogue Coverage
│
├── 02. GETTING STARTED
│   ├── Understanding Claude
│   ├── Skills vs Prompts vs Agents
│   ├── Claude Chat
│   ├── Claude Code
│   ├── Claude Cowork
│   ├── Word Integration
│   ├── Managed Agents
│   ├── Plugin Installation
│   ├── Practice Profile
│   ├── CLAUDE.md
│   ├── Connectors
│   └── Responsible Legal AI
│
├── 03. OFFICIAL LEGAL SKILLS
│   ├── AI Governance Legal
│   ├── Commercial Legal
│   ├── Corporate Legal
│   ├── Employment Legal
│   ├── Intellectual Property Legal
│   ├── Law Student
│   ├── Legal Builder Hub
│   ├── Legal Clinic
│   ├── Litigation Legal
│   ├── Privacy Legal
│   ├── Product Legal
│   ├── Regulatory Legal
│   └── External Plugins
│
├── 04. INDIAN LEGAL PRACTICE
│   ├── Constitutional Law
│   ├── Civil Litigation
│   ├── Criminal Litigation
│   ├── Corporate Law
│   ├── Commercial Law
│   ├── Banking and Financial Law
│   ├── Cyber Law
│   ├── Property Law
│   ├── Land Acquisition
│   ├── Labour and Employment
│   ├── Family Law
│   ├── Consumer Protection
│   ├── Arbitration and Mediation
│   ├── Intellectual Property
│   ├── Taxation
│   ├── Data Protection and Privacy
│   ├── Environmental Law
│   └── Administrative Law
│
├── 05. LEGAL TASK LIBRARY
│   ├── Legal Research
│   ├── Judgment Analysis
│   ├── Case Briefing
│   ├── Legal Opinion
│   ├── Legal Memorandum
│   ├── Legal Notice
│   ├── Pleading Preparation
│   ├── Contract Drafting
│   ├── Contract Review
│   ├── Due Diligence
│   ├── Evidence Analysis
│   ├── Litigation Strategy
│   ├── Compliance Assessment
│   └── Client Communication
│
├── 06. LEGAL WORKFLOW STUDIO
│   ├── Civil Recovery
│   ├── Bank Account Freeze
│   ├── Cybercrime
│   ├── Contract Review
│   ├── Corporate Due Diligence
│   ├── Criminal Case Preparation
│   ├── Bail Preparation
│   ├── Property Verification
│   ├── Employment Disputes
│   ├── Arbitration
│   ├── AI Vendor Assessment
│   └── Privacy Compliance
│
├── 07. PROMPT BUILDER
│   ├── Guided Builder
│   ├── Advanced Builder
│   ├── Prompt Templates
│   ├── Practice Profile Builder
│   └── Prompt Quality Checklist
│
├── 08. CASE STUDY LIBRARY
│   ├── Civil Matters
│   ├── Criminal Matters
│   ├── Corporate Matters
│   ├── Banking Disputes
│   ├── Cybercrime
│   ├── Property Disputes
│   ├── Employment
│   └── AI Governance
│
├── 09. LEARNING CENTRE
│   ├── Beginner
│   ├── Intermediate
│   ├── Advanced
│   ├── Legal AI Builder
│   ├── AI/ML Concepts
│   ├── PEAS Framework
│   ├── Exercises
│   ├── Assessments
│   └── Glossary
│
├── 10. MY WORKSPACE
│   ├── Bookmarks
│   ├── Recently Viewed
│   ├── Saved Template References
│   ├── Learning Progress
│   └── Preferences
│
└── 11. ABOUT AND RESOURCES
    ├── Official Sources
    ├── Indian Legal Resources
    ├── Content Governance
    ├── Version History
    ├── Privacy Policy
    ├── Legal Disclaimer
    ├── Licence and Attribution
    └── GitHub Repository
```

The official category list is a discovery baseline. The implementation must derive actual categories and skill counts from the pinned upstream repository.

# 8. User journeys

## 8.1 Journey A: Corporate lawyer reviewing an NDA

1. Open Commercial Legal category.
2. Select NDA Triage and Risk Classifier.
3. Review supported Claude environments and prerequisites.
4. Select India as jurisdiction.
5. Configure party role and confidentiality requirements.
6. Review fictional NDA and illustrative risk matrix.
7. Complete confidentiality acknowledgement.
8. Copy standalone prompt or verified official invocation.
9. Execute manually in the appropriate Claude environment.
10. Verify the resulting findings against the actual contract.

## 8.2 Journey B: Advocate handling a bank account freeze

```
Indian Legal Practice
    ↓
Banking and Cyber Law
    ↓
Bank Account Freeze Workflow
    ↓
Client Intake and Conflict Check
    ↓
Transaction Chronology
    ↓
Freeze Order and Authority Assessment
    ↓
Legal and Procedural Research
    ↓
Representation Preparation
    ↓
Professional Verification
```

## 8.3 Journey C: Law student learning case analysis

```
Learning Centre
    ↓
Legal Reasoning
    ↓
IRAC / FILAC Framework
    ↓
Select Fictional Case
    ↓
Identify Facts and Issues
    ↓
Use Guided Socratic Prompt
    ↓
Develop Independent Analysis
    ↓
Review Illustrative Answer Structure
    ↓
Complete Self-Assessment
```

# 9. Functional requirements

Priority classification:

- Critical: Required for core operation or safety.
- High: Required for complete MVP value.
- Medium: Useful but may be deferred if necessary.
- Low: Future enhancement.

## 9.1 Application and navigation

| ID     | Requirement                                 | Priority |
| ------ | ------------------------------------------- | -------- |
| FR-001 | Display responsive application shell        | Critical |
| FR-002 | Provide hierarchical left navigation        | Critical |
| FR-003 | Support expandable categories               | Critical |
| FR-004 | Display dynamically calculated skill counts | High     |
| FR-005 | Highlight selected skill                    | Critical |
| FR-006 | Support native hash navigation              | Critical |
| FR-007 | Support browser back and forward            | Critical |
| FR-008 | Support direct skill deep links             | Critical |
| FR-009 | Provide mobile navigation drawer            | Critical |
| FR-010 | Handle invalid routes and missing records   | High     |

## 9.2 Official skill catalogue

| ID     | Requirement                                  | Priority |
| ------ | -------------------------------------------- | -------- |
| FR-011 | Import complete pinned upstream inventory    | Critical |
| FR-012 | Distinguish first-party and external plugins | Critical |
| FR-013 | Display official skill metadata              | Critical |
| FR-014 | Display verified invocation type             | Critical |
| FR-015 | Display supported execution environments     | Critical |
| FR-016 | Display connector requirements               | High     |
| FR-017 | Display practice profile prerequisites       | High     |
| FR-018 | Display pinned source links                  | Critical |
| FR-019 | Display educational content status           | Critical |
| FR-020 | Handle catalogue-only skills                 | Critical |

## 9.3 Prompt builder

| ID     | Requirement                                                | Priority |
| ------ | ---------------------------------------------------------- | -------- |
| FR-021 | Generate dynamic variable forms                            | Critical |
| FR-022 | Validate mandatory variables                               | Critical |
| FR-023 | Compile prompt in real time                                | Critical |
| FR-024 | Highlight editable variables                               | High     |
| FR-025 | Copy standalone prompt                                     | Critical |
| FR-026 | Copy verified official invocation separately               | Critical |
| FR-027 | Load fictional sample facts                                | High     |
| FR-028 | Reset default values                                       | High     |
| FR-029 | Display confidentiality checklist                          | Critical |
| FR-030 | Clear matter-specific inputs                               | Critical |
| FR-031 | Open external Claude service manually                      | High     |
| FR-032 | Prevent unresolved required variables in completed prompts | Critical |

## 9.4 Response visualisation

| ID     | Requirement                            | Priority |
| ------ | -------------------------------------- | -------- |
| FR-033 | Display synthetic response label       | Critical |
| FR-034 | Render structured legal deliverables   | Critical |
| FR-035 | Render Markdown tables safely          | High     |
| FR-036 | Support raw Markdown view              | High     |
| FR-037 | Display risk classifications           | High     |
| FR-038 | Display evidence references            | High     |
| FR-039 | Display missing-information indicators | High     |
| FR-040 | Display legal verification checklist   | Critical |
| FR-041 | Copy illustrative output structure     | Medium   |

## 9.5 Indian legal practice

| ID     | Requirement                                    | Priority |
| ------ | ---------------------------------------------- | -------- |
| FR-042 | Provide independent India legal overlays       | High     |
| FR-043 | Support jurisdiction selection                 | Critical |
| FR-044 | Maintain legislation registry                  | High     |
| FR-045 | Display official legal source references       | Critical |
| FR-046 | Record commencement and amendment information  | High     |
| FR-047 | Display transitional legal considerations      | High     |
| FR-048 | Distinguish central and state legal frameworks | High     |
| FR-049 | Display legal review status                    | Critical |

## 9.6 Search and learning

| ID     | Requirement                             | Priority |
| ------ | --------------------------------------- | -------- |
| FR-050 | Provide fuzzy search                    | Critical |
| FR-051 | Filter by professional role             | High     |
| FR-052 | Filter by practice area                 | High     |
| FR-053 | Filter by jurisdiction                  | High     |
| FR-054 | Filter by execution environment         | High     |
| FR-055 | Filter by content readiness             | High     |
| FR-056 | Provide practical case studies          | High     |
| FR-057 | Provide guided workflows                | High     |
| FR-058 | Provide PEAS explanations               | Medium   |
| FR-059 | Provide legal AI learning modules       | High     |
| FR-060 | Provide bookmarks                       | Medium   |
| FR-061 | Provide non-sensitive learning progress | Medium   |
| FR-062 | Provide local data deletion controls    | Critical |

## 9.7 Content engineering and administration

| ID     | Requirement                             | Priority |
| ------ | --------------------------------------- | -------- |
| FR-063 | Parse upstream Markdown metadata        | Critical |
| FR-064 | Validate content using Pydantic         | Critical |
| FR-065 | Merge independent educational overlays  | Critical |
| FR-066 | Generate canonical JSON                 | Critical |
| FR-067 | Detect duplicate identifiers            | Critical |
| FR-068 | Detect orphaned source mappings         | Critical |
| FR-069 | Validate related-skill references       | High     |
| FR-070 | Generate content coverage report        | High     |
| FR-071 | Detect upstream changes                 | High     |
| FR-072 | Open review pull requests for updates   | High     |
| FR-073 | Prevent publication of invalid content  | Critical |
| FR-074 | Maintain source provenance              | Critical |
| FR-075 | Maintain accurate legal review metadata | Critical |

# 10. Official skill catalogue

## 10.1 Source repository

Primary source:

[https://github.com/anthropics/claude-for-legal](https://github.com/anthropics/claude-for-legal)

The source repository is the authority for official plugin names, skill identifiers, execution instructions and documented capabilities.

The proposed product specification is not evidence that every listed skill, command or execution surface currently exists.

## 10.2 Expected practice categories

| Category            | Educational focus                             |
| ------------------- | --------------------------------------------- |
| AI Governance Legal | AI risk, impact assessments and governance    |
| Commercial Legal    | Contracts and commercial transactions         |
| Corporate Legal     | Corporate governance and due diligence        |
| Employment Legal    | Employment matters and workplace risks        |
| IP Legal            | Intellectual property                         |
| Law Student         | Legal education and reasoning                 |
| Legal Builder Hub   | Legal AI configuration and development        |
| Legal Clinic        | Client intake and legal assistance            |
| Litigation Legal    | Disputes, evidence and litigation preparation |
| Privacy Legal       | Data protection and privacy                   |
| Product Legal       | Product development and legal risk            |
| Regulatory Legal    | Regulatory obligations and compliance         |

External plugins must appear separately.

## 10.3 Content coverage model

### Catalogue content layers

Official source catalogue

Complete verified upstream inventory

Educational walkthroughs

Minimum 15 complete initial overlays

India practice categories

18 categories, with content coverage tracked separately

These are planned scope targets, not measured implementation progress.

## 10.4 Invocation classification

| Invocation type      | Application behaviour                             |
| -------------------- | ------------------------------------------------- |
| Explicit command     | Display verified slash command                    |
| Automatic activation | Explain activation conditions                     |
| Scheduled agent      | Display scheduling and configuration requirements |
| Managed agent        | Explain documented managed-agent execution        |
| Unknown              | Mark as not yet verified                          |

Do not manufacture commands for automatically activated skills or scheduled agents.

## 10.5 Execution surfaces

| Surface            | Application treatment                            |
| ------------------ | ------------------------------------------------ |
| Claude Chat        | Independently authored standalone prompts        |
| Claude Code        | Verified plugin and skill execution instructions |
| Claude Cowork      | Verified supported workflows                     |
| Word integration   | Documented integration guidance only             |
| Managed Agents API | Technical educational guidance                   |
| Scheduled agents   | Configuration and scheduling explanation         |

Availability must be established individually for each upstream record.

# 11. Skill detail specification

Every complete educational skill must follow a standard content anatomy.

| Section            | Required content                                |
| ------------------ | ----------------------------------------------- |
| Identification     | Official name, ID, category, source type        |
| Purpose            | What the skill does and why it matters          |
| Applicability      | When to use and when not to use                 |
| Execution          | Command, environment and prerequisites          |
| Input requirements | Documents, facts and contextual information     |
| Prompt template    | Editable, copy-ready educational instructions   |
| Fictional scenario | Realistic legal matter                          |
| Response example   | Clearly labelled synthetic deliverable          |
| India adaptation   | Relevant jurisdiction-specific considerations   |
| Guardrails         | Privacy, professional and factual risks         |
| Verification       | Mandatory review checklist                      |
| AI/ML context      | Foundational concepts and PEAS where applicable |
| Relationships      | Related skills and workflows                    |
| Provenance         | Source URL, commit SHA and review metadata      |

## 11.1 Skill content statuses

| Status         | Meaning                                                |
| -------------- | ------------------------------------------------------ |
| Catalogue only | Official metadata available; walkthrough pending       |
| Draft          | Educational content under development                  |
| Ready          | Educational content complete and technically validated |
| Needs update   | Source or content changes require review               |

## 11.2 Professional review statuses

| Status             | Meaning                                             |
| ------------------ | --------------------------------------------------- |
| Not reviewed       | No professional review performed                    |
| Review pending     | Awaiting qualified legal review                     |
| Reviewed           | Actual review completed and documented              |
| Needs revalidation | Existing review affected by legal or source changes |

Technical validation and professional legal review must remain separate.

# 12. Interactive prompt builder

## 12.1 Business requirement

The prompt builder enables legal professionals to configure structured legal prompts without requiring programming or advanced prompt engineering knowledge.

The builder must generate prompts dynamically from validated content templates.

## 12.2 Prompt builder interface

## NDA Triage Workbench

Interactive prototype

Party roleReceiving party

JurisdictionIndia

Preferred survival period2 years

Risk postureStandard

Generated standalone prompt

&#x20;Copy

Act as commercial counsel representing the Receiving party.\
\
Review the supplied NDA under the applicable laws of India.\
\
Risk posture: Standard.\
Preferred confidentiality survival: 2 years, subject to the nature of the information and applicable law.\
\
1\. Identify material contractual risks.\
2\. Classify findings as RED, YELLOW or GREEN.\
3\. Quote the relevant contractual provisions.\
4\. Suggest appropriate negotiation alternatives.\
5\. Identify missing information.\
6\. Mark unverified legal authorities with [VERIFY].\
\
Return a structured clause review matrix and professional verification checklist. The output is a draft for qualified legal review.

Confidentiality pre-flight

Client information has been appropriately anonymised.

I understand that legal findings require independent verification.

Copy reviewed promptReset

This prototype demonstrates local prompt configuration. It does not execute Claude or perform legal review.

## 12.3 Supported variable types

| Type         | Example                         |
| ------------ | ------------------------------- |
| Text         | Client role                     |
| Textarea     | Anonymised case facts           |
| Select       | Jurisdiction                    |
| Multi-select | Legal issues                    |
| Number       | Contract value                  |
| Date         | Agreement date                  |
| Boolean      | Whether a document is available |

## 12.4 Prompt engineering standard

Every complete standalone prompt must contain:

```
LEGAL PROMPT ANATOMY
│
├── 01. Professional Role
├── 02. Objective
├── 03. Jurisdiction
├── 04. Factual Context
├── 05. Available Documents
├── 06. Analysis Instructions
├── 07. Legal Constraints
├── 08. Evidence Grounding
├── 09. Output Format
├── 10. Missing Information
├── 11. Citation Verification
└── 12. Human Review Requirement
```

## 12.5 Variable syntax

Use double curly braces for editable variables.

```
{{CLIENT_ROLE}}
{{JURISDICTION}}
{{CASE_FACTS}}
{{DOCUMENT_TEXT}}
{{RISK_POSTURE}}
{{OUTPUT_FORMAT}}
```

Reserve square brackets for verification and safety indicators.

```
[VERIFY]
[MISSING INFORMATION]
[ASSUMPTION]
[ATTORNEY REVIEW REQUIRED]
```

## 12.6 Business rules

| Rule ID | Business rule                                                                     |
| ------- | --------------------------------------------------------------------------------- |
| BR-001  | Every editable variable must be declared in the schema                            |
| BR-002  | Required variables cannot be empty                                                |
| BR-003  | Standalone prompts must not include unsupported slash commands                    |
| BR-004  | Fictional defaults must be clearly identifiable                                   |
| BR-005  | Matter-specific inputs must remain in browser memory                              |
| BR-006  | Reset must restore fictional defaults                                             |
| BR-007  | Copy must produce plain text                                                      |
| BR-008  | External Claude navigation must not transfer matter inputs automatically          |
| BR-009  | Unresolved placeholders must be reported                                          |
| BR-010  | Confidentiality acknowledgement must not be described as guaranteed anonymisation |

# 13. Response visualisation engine

## 13.1 Objective

Provide a realistic representation of the deliverables a legal professional may request from an AI-assisted workflow.

Every example must display:

Illustrative, synthetic example. Not actual Claude output.

## 13.2 Supported response structures

| Legal task         | Expected response structure                             |
| ------------------ | ------------------------------------------------------- |
| Contract review    | Clause matrix, risk assessment, fallback language       |
| Litigation         | Chronology, issues, evidence and procedural questions   |
| Legal research     | Research questions, authorities and verification gaps   |
| Legal opinion      | Facts, issues, law, analysis and provisional conclusion |
| Due diligence      | Findings register, material risks and evidence          |
| Compliance         | Obligations, compliance gaps and remediation            |
| Legal notice       | Facts, demands, legal basis and review checklist        |
| Case briefing      | IRAC or FILAC                                           |
| Privacy assessment | Data flows, obligations and safeguards                  |
| AI governance      | Risk classification, controls and human oversight       |
| Legal clinic       | Intake summary, conflicts and missing information       |

## 13.3 Illustrative contract review response

## NDA Review Report

Negotiation required

Fictional matter. Synthetic educational example, not actual Claude output.

# 6

Clauses

# 1

High risk

# 2

Medium risk

# 3

Lower risk

Clause assessment

| Clause                     | Risk   | Finding                         |
| -------------------------- | ------ | ------------------------------- |
| Confidentiality definition | Medium | Definition may be overly broad. |
| Permitted disclosures      | Lower  | Standard exceptions included.   |
| Survival period            | Medium | Five-year blanket obligation.   |
| Indemnity                  | High   | Potentially uncapped exposure.  |
| Governing law              | Lower  | India specified; confirm forum. |
| Return of documents        | Lower  | Return obligation included.     |

Proposed next actions

- Review indemnity scope and liability allocation.
- Negotiate an appropriate confidentiality survival period.
- Confirm jurisdiction and dispute resolution provisions.

  Professional verification required

  Verify each finding against the original agreement. Confirm the applicable law and commercial negotiation position before relying on the proposed changes.

## 13.4 Response business rules

- Synthetic examples must be derived from fictional source material.
- Example citations must be traceable or explicitly marked for verification.
- Changing a prompt variable must not imply a new AI response was generated.
- Risk colours must not be the only way to communicate severity.
- A lower-risk classification must not imply legal approval.
- The user must be able to view and copy the response structure.

# 14. Indian legal practice module

## 14.1 Business objective

Provide independent legal AI educational content relevant to Indian statutes, courts, regulatory bodies and professional practice.

The India layer must not alter the official upstream skill descriptions.

## 14.2 Indian legal practice mapping

| Practice area         | Legal framework to evaluate                     | Example task               |
| --------------------- | ----------------------------------------------- | -------------------------- |
| Constitutional law    | Constitution of India                           | Writ petition research     |
| Civil litigation      | CPC, Limitation Act, Specific Relief Act        | Money recovery             |
| Criminal litigation   | BNS, BNSS, BSA and applicable transitional law  | Case preparation           |
| Corporate law         | Companies Act, applicable rules                 | Corporate governance       |
| Commercial law        | Contract Act, Commercial Courts Act             | Contract disputes          |
| Banking law           | RBI directions and applicable banking laws      | Account freeze             |
| Cyber law             | IT Act and applicable criminal law              | Online fraud               |
| Property law          | Transfer of Property Act, Registration Act      | Title verification         |
| Land acquisition      | Central and applicable state legislation        | Compensation disputes      |
| Employment law        | Applicable labour laws and state rules          | Termination review         |
| Family law            | Applicable personal and secular laws            | Matrimonial disputes       |
| Consumer law          | Consumer Protection Act                         | Deficiency in service      |
| Arbitration           | Arbitration and Conciliation Act                | Commercial disputes        |
| Intellectual property | Trademark, copyright and patent legislation     | Infringement analysis      |
| Taxation              | Applicable direct and indirect tax legislation  | Compliance assessment      |
| Privacy               | DPDP Act, applicable rules and notifications    | Personal data processing   |
| Environmental law     | Environmental protection legislation            | Compliance review          |
| Administrative law    | Statutory powers and judicial review principles | Government order challenge |

The legal frameworks above are starting points. Applicable provisions, amendments, commencement dates and procedural requirements must be verified before publication.

## 14.3 Legislation registry

Every legislation record must include:

| Field                   | Description                         |
| ----------------------- | ----------------------------------- |
| Legislation ID          | Stable unique identifier            |
| Official title          | Verified statutory name             |
| Jurisdiction            | Central or state                    |
| Enactment date          | Verified date                       |
| Commencement            | Applicable commencement information |
| Amendments              | Relevant amendment references       |
| Provision references    | Verified sections or rules          |
| Transitional provisions | Applicability to earlier events     |
| Official source         | Verified government URL             |
| Last verified date      | Actual verification date            |
| Review status           | Professional review status          |
| Related skills          | Associated educational content      |

## 14.4 Legal source registry

Preferred official sources include:

| Source                        | URL                                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------- |
| India Code                    | [https://www.indiacode.nic.in/](https://www.indiacode.nic.in/) |
| Supreme Court of India        | [https://www.sci.gov.in/](https://www.sci.gov.in/)             |
| eCourts                       | [https://ecourts.gov.in/](https://ecourts.gov.in/)             |
| Gazette of India              | [https://egazette.gov.in/](https://egazette.gov.in/)           |
| Ministry of Corporate Affairs | [https://www.mca.gov.in/](https://www.mca.gov.in/)             |
| Reserve Bank of India         | [https://www.rbi.org.in/](https://www.rbi.org.in/)             |
| SEBI                          | [https://www.sebi.gov.in/](https://www.sebi.gov.in/)           |
| MeitY                         | [https://www.meity.gov.in/](https://www.meity.gov.in/)         |
| Tamil Nadu Government         | [https://www.tn.gov.in/](https://www.tn.gov.in/)               |

These are general source entry points. Specific legislation and judgment links must be checked during content development.

# 15. Legal case study library

## 15.1 Objective

Teach legal professionals and students through realistic fictional matters instead of abstract prompt descriptions.

## 15.2 Initial case study catalogue

| ID     | Case study                                              | Category               |
| ------ | ------------------------------------------------------- | ---------------------- |
| CS-001 | Unpaid commercial invoice of ₹5 lakh                    | Civil recovery         |
| CS-002 | Dishonoured cheque                                      | Negotiable instruments |
| CS-003 | Bank account freeze following disputed UPI transactions | Banking and cyber law  |
| CS-004 | Software development agreement breach                   | Commercial law         |
| CS-005 | SaaS vendor agreement review                            | Contract law           |
| CS-006 | Employee termination dispute                            | Employment law         |
| CS-007 | Workplace misconduct complaint                          | Employment law         |
| CS-008 | Property title dispute                                  | Property law           |
| CS-009 | Land acquisition compensation dispute                   | Land acquisition       |
| CS-010 | Deficiency in consumer services                         | Consumer protection    |
| CS-011 | Personal data breach                                    | Privacy law            |
| CS-012 | Trademark infringement allegation                       | Intellectual property  |
| CS-013 | Shareholder oppression allegation                       | Corporate law          |
| CS-014 | Bail application preparation                            | Criminal law           |
| CS-015 | Challenge to an administrative order                    | Administrative law     |
| CS-016 | Construction contract arbitration                       | Arbitration            |
| CS-017 | Enterprise AI vendor procurement                        | AI governance          |

## 15.3 Case study anatomy

```
CASE STUDY
│
├── Case Identification
├── Fictional Status
├── Background
├── Parties
├── Material Facts
├── Chronology
├── Supporting Documents
├── Legal Issues
├── Applicable Legal Framework
├── Relevant AI Skills
├── Prompt Templates
├── Illustrative Deliverables
├── Evidence Gaps
├── Alternative Approaches
├── Risk Assessment
└── Professional Verification
```

## 15.4 Example: Civil money recovery

| Attribute            | Fictional case details                                                     |
| -------------------- | -------------------------------------------------------------------------- |
| Claimant             | Alpha Software Services Pvt. Ltd.                                          |
| Respondent           | Beta Retail Solutions Pvt. Ltd.                                            |
| Claim amount         | ₹5,00,000                                                                  |
| Nature of dispute    | Unpaid software development invoice                                        |
| Documents            | Agreement, invoice, emails and delivery records                            |
| Legal issues         | Contractual obligation, breach, limitation and jurisdiction                |
| Desired outcome      | Evaluate recovery options                                                  |
| AI assistance        | Chronology, document analysis, issue identification and notice preparation |
| Human responsibility | Determine maintainability, evidence sufficiency and appropriate remedy     |

The example must not conclude that recovery is guaranteed or that a particular court has jurisdiction without examining the relevant facts.

# 16. Legal workflow studio

## 16.1 Objective

Connect individual legal AI skills into structured, multi-step professional workflows.

The workflow studio must be educational and manually controlled. It must not represent itself as an autonomous legal agent.

## 16.2 Initial workflow catalogue

| ID     | Workflow                        | Release   |
| ------ | ------------------------------- | --------- |
| WF-001 | Civil money recovery            | MVP       |
| WF-002 | Bank account freeze             | MVP       |
| WF-003 | Commercial contract review      | MVP       |
| WF-004 | Criminal case preparation       | MVP       |
| WF-005 | Enterprise AI vendor assessment | MVP       |
| WF-006 | Corporate due diligence         | Expansion |
| WF-007 | Property verification           | Expansion |
| WF-008 | Employment dispute              | Expansion |
| WF-009 | Consumer complaint              | Expansion |
| WF-010 | Arbitration preparation         | Expansion |
| WF-011 | Privacy compliance              | Expansion |
| WF-012 | Land acquisition dispute        | Expansion |

## 16.3 Workflow 1: Civil money recovery

1. Client intakeCollect anonymised facts and identify parties.
2. Conflict and privilege assessmentConfirm professional intake requirements.
3. Document assessmentReview agreements, invoices and communications.
4. Case chronologyArrange relevant events and payment history.
5. Legal issue identificationIdentify contractual and procedural questions.
6. Maintainability verificationCheck limitation, jurisdiction and appropriate remedies.
7. Evidence gap assessmentIdentify missing records and disputed facts.
8. Notice preparationPrepare a draft for professional consideration.
9. Advocate reviewValidate facts, legal basis and next steps.

## 16.4 Workflow 2: Bank account freeze

\#chatgpt-mermaid-\_r_1hih\_{font-family:-apple-system,"system-ui","Segoe UI",sans-serif;font-size:14px;fill:rgb(26, 28, 31);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_1hih\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_1hih\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_1hih\_ .error-icon{fill:rgba(255, 255, 255, 0.96);}#chatgpt-mermaid-\_r_1hih\_ .error-text{fill:rgb(26, 28, 31);stroke:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hih\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_1hih\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_1hih\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_1hih\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_1hih\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_1hih\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_1hih\_ .marker{fill:rgba(26, 28, 31, 0.494);stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hih\_ .marker.cross{stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hih\_ svg{font-family:-apple-system,"system-ui","Segoe UI",sans-serif;font-size:14px;}#chatgpt-mermaid-\_r_1hih\_ p{margin:0;}#chatgpt-mermaid-\_r_1hih\_ .label{font-family:-apple-system,"system-ui","Segoe UI",sans-serif;color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hih\_ .cluster-label text{fill:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hih\_ .cluster-label span{color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hih\_ .cluster-label span p{background-color:transparent;}#chatgpt-mermaid-\_r_1hih\_ .label text,#chatgpt-mermaid-\_r_1hih\_ span{fill:rgb(26, 28, 31);color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hih\_ .node rect,#chatgpt-mermaid-\_r_1hih\_ .node circle,#chatgpt-mermaid-\_r_1hih\_ .node ellipse,#chatgpt-mermaid-\_r_1hih\_ .node polygon,#chatgpt-mermaid-\_r_1hih\_ .node path{fill:rgb(224, 237, 254);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_1hih\_ .rough-node .label text,#chatgpt-mermaid-\_r_1hih\_ .node .label text,#chatgpt-mermaid-\_r_1hih\_ .image-shape .label,#chatgpt-mermaid-\_r_1hih\_ .icon-shape .label{text-anchor:middle;}#chatgpt-mermaid-\_r_1hih\_ .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#chatgpt-mermaid-\_r_1hih\_ .rough-node .label,#chatgpt-mermaid-\_r_1hih\_ .node .label,#chatgpt-mermaid-\_r_1hih\_ .image-shape .label,#chatgpt-mermaid-\_r_1hih\_ .icon-shape .label{text-align:center;}#chatgpt-mermaid-\_r_1hih\_ .node.clickable{cursor:pointer;}#chatgpt-mermaid-\_r_1hih\_ .root .anchor path{fill:rgba(26, 28, 31, 0.494)!important;stroke-width:0;stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hih\_ .arrowheadPath{fill:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hih\_ .edgePath .path{stroke:rgba(26, 28, 31, 0.494);stroke-width:1px;}#chatgpt-mermaid-\_r_1hih\_ .flowchart-link{stroke:rgba(26, 28, 31, 0.494);fill:none;}#chatgpt-mermaid-\_r_1hih\_ .edgeLabel{background-color:rgb(255, 255, 255);text-align:center;}#chatgpt-mermaid-\_r_1hih\_ .edgeLabel p{background-color:rgb(255, 255, 255);}#chatgpt-mermaid-\_r_1hih\_ .edgeLabel rect{opacity:0.5;background-color:rgb(255, 255, 255);fill:rgb(255, 255, 255);}#chatgpt-mermaid-\_r_1hih\_ .labelBkg{background-color:rgba(255, 255, 255, 0.5);}#chatgpt-mermaid-\_r_1hih\_ .cluster rect{fill:rgba(255, 255, 255, 0.96);stroke:rgba(26, 28, 31, 0.08);stroke-width:1px;}#chatgpt-mermaid-\_r_1hih\_ .cluster text{fill:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hih\_ .cluster span{color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hih\_ div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:-apple-system,"system-ui","Segoe UI",sans-serif;font-size:12px;background:rgba(255, 255, 255, 0.96);border:1px solid rgba(26, 28, 31, 0.08);border-radius:2px;pointer-events:none;z-index:100;}#chatgpt-mermaid-\_r_1hih\_ .flowchartTitleText{text-anchor:middle;font-size:18px;fill:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hih\_ rect.text{fill:none;stroke-width:0;}#chatgpt-mermaid-\_r_1hih\_ .icon-shape,#chatgpt-mermaid-\_r_1hih\_ .image-shape{background-color:rgb(255, 255, 255);text-align:center;}#chatgpt-mermaid-\_r_1hih\_ .icon-shape p,#chatgpt-mermaid-\_r_1hih\_ .image-shape p{background-color:rgb(255, 255, 255);padding:2px;}#chatgpt-mermaid-\_r_1hih\_ .icon-shape .label rect,#chatgpt-mermaid-\_r_1hih\_ .image-shape .label rect{opacity:0.5;background-color:rgb(255, 255, 255);fill:rgb(255, 255, 255);}#chatgpt-mermaid-\_r_1hih\_ .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#chatgpt-mermaid-\_r_1hih\_ .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#chatgpt-mermaid-\_r_1hih\_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_1hih\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_1hih\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_1hih\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_1hih\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hih\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_1hih\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_1hih\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_1hih\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hih\_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-\_r_1hih\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_1hih\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hih\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_1hih\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_1hih\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hih\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_1hih\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hih\_ .node text{font-size:14px;font-weight:600;letter-spacing:normal;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_1hih\_ .edgeLabels text{font-size:13px;font-weight:600;letter-spacing:-0.08px;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_1hih\_ .node tspan[font-weight="normal"],#chatgpt-mermaid-\_r_1hih\_ .edgeLabels tspan[font-weight="normal"]{font-weight:600;}#chatgpt-mermaid-\_r_1hih\_ .edgeLabel .label rect{opacity:1;rx:13px;ry:13px;fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-width:1px;}#chatgpt-mermaid-\_r_1hih\_ .node rect,#chatgpt-mermaid-\_r_1hih\_ .node circle,#chatgpt-mermaid-\_r_1hih\_ .node ellipse,#chatgpt-mermaid-\_r_1hih\_ .node polygon,#chatgpt-mermaid-\_r_1hih\_ .node path{fill:rgb(229, 243, 255);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_1hih\_ .node rect{rx:16px;ry:16px;}#chatgpt-mermaid-\_r_1hih\_ .mermaid-decision .label-container{fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-dasharray:2,2;}#chatgpt-mermaid-\_r_1hih\_ .edgePaths .flowchart-link{stroke:rgba(26, 28, 31, 0.494);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;}#chatgpt-mermaid-\_r_1hih\_ .marker{fill:rgba(26, 28, 31, 0.494);stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hih\_ :root{--mermaid-font-family:-apple-system,"system-ui","Segoe UI",sans-serif;}Client intakeTransaction chronologyBank communication reviewIdentify freeze authority andscopeAssess available documentsLegal and proceduralresearchEvaluate potential remediesDraft representationProfessional review

## 16.5 Workflow 3: Commercial contract review

\#chatgpt-mermaid-\_r_1hio\_{font-family:-apple-system,"system-ui","Segoe UI",sans-serif;font-size:14px;fill:rgb(26, 28, 31);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_1hio\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_1hio\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_1hio\_ .error-icon{fill:rgba(255, 255, 255, 0.96);}#chatgpt-mermaid-\_r_1hio\_ .error-text{fill:rgb(26, 28, 31);stroke:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hio\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_1hio\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_1hio\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_1hio\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_1hio\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_1hio\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_1hio\_ .marker{fill:rgba(26, 28, 31, 0.494);stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hio\_ .marker.cross{stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hio\_ svg{font-family:-apple-system,"system-ui","Segoe UI",sans-serif;font-size:14px;}#chatgpt-mermaid-\_r_1hio\_ p{margin:0;}#chatgpt-mermaid-\_r_1hio\_ .label{font-family:-apple-system,"system-ui","Segoe UI",sans-serif;color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hio\_ .cluster-label text{fill:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hio\_ .cluster-label span{color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hio\_ .cluster-label span p{background-color:transparent;}#chatgpt-mermaid-\_r_1hio\_ .label text,#chatgpt-mermaid-\_r_1hio\_ span{fill:rgb(26, 28, 31);color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hio\_ .node rect,#chatgpt-mermaid-\_r_1hio\_ .node circle,#chatgpt-mermaid-\_r_1hio\_ .node ellipse,#chatgpt-mermaid-\_r_1hio\_ .node polygon,#chatgpt-mermaid-\_r_1hio\_ .node path{fill:rgb(224, 237, 254);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_1hio\_ .rough-node .label text,#chatgpt-mermaid-\_r_1hio\_ .node .label text,#chatgpt-mermaid-\_r_1hio\_ .image-shape .label,#chatgpt-mermaid-\_r_1hio\_ .icon-shape .label{text-anchor:middle;}#chatgpt-mermaid-\_r_1hio\_ .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#chatgpt-mermaid-\_r_1hio\_ .rough-node .label,#chatgpt-mermaid-\_r_1hio\_ .node .label,#chatgpt-mermaid-\_r_1hio\_ .image-shape .label,#chatgpt-mermaid-\_r_1hio\_ .icon-shape .label{text-align:center;}#chatgpt-mermaid-\_r_1hio\_ .node.clickable{cursor:pointer;}#chatgpt-mermaid-\_r_1hio\_ .root .anchor path{fill:rgba(26, 28, 31, 0.494)!important;stroke-width:0;stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hio\_ .arrowheadPath{fill:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hio\_ .edgePath .path{stroke:rgba(26, 28, 31, 0.494);stroke-width:1px;}#chatgpt-mermaid-\_r_1hio\_ .flowchart-link{stroke:rgba(26, 28, 31, 0.494);fill:none;}#chatgpt-mermaid-\_r_1hio\_ .edgeLabel{background-color:rgb(255, 255, 255);text-align:center;}#chatgpt-mermaid-\_r_1hio\_ .edgeLabel p{background-color:rgb(255, 255, 255);}#chatgpt-mermaid-\_r_1hio\_ .edgeLabel rect{opacity:0.5;background-color:rgb(255, 255, 255);fill:rgb(255, 255, 255);}#chatgpt-mermaid-\_r_1hio\_ .labelBkg{background-color:rgba(255, 255, 255, 0.5);}#chatgpt-mermaid-\_r_1hio\_ .cluster rect{fill:rgba(255, 255, 255, 0.96);stroke:rgba(26, 28, 31, 0.08);stroke-width:1px;}#chatgpt-mermaid-\_r_1hio\_ .cluster text{fill:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hio\_ .cluster span{color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hio\_ div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:-apple-system,"system-ui","Segoe UI",sans-serif;font-size:12px;background:rgba(255, 255, 255, 0.96);border:1px solid rgba(26, 28, 31, 0.08);border-radius:2px;pointer-events:none;z-index:100;}#chatgpt-mermaid-\_r_1hio\_ .flowchartTitleText{text-anchor:middle;font-size:18px;fill:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hio\_ rect.text{fill:none;stroke-width:0;}#chatgpt-mermaid-\_r_1hio\_ .icon-shape,#chatgpt-mermaid-\_r_1hio\_ .image-shape{background-color:rgb(255, 255, 255);text-align:center;}#chatgpt-mermaid-\_r_1hio\_ .icon-shape p,#chatgpt-mermaid-\_r_1hio\_ .image-shape p{background-color:rgb(255, 255, 255);padding:2px;}#chatgpt-mermaid-\_r_1hio\_ .icon-shape .label rect,#chatgpt-mermaid-\_r_1hio\_ .image-shape .label rect{opacity:0.5;background-color:rgb(255, 255, 255);fill:rgb(255, 255, 255);}#chatgpt-mermaid-\_r_1hio\_ .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#chatgpt-mermaid-\_r_1hio\_ .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#chatgpt-mermaid-\_r_1hio\_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_1hio\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_1hio\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_1hio\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_1hio\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hio\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_1hio\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_1hio\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_1hio\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hio\_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-\_r_1hio\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_1hio\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hio\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_1hio\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_1hio\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hio\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_1hio\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hio\_ .node text{font-size:14px;font-weight:600;letter-spacing:normal;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_1hio\_ .edgeLabels text{font-size:13px;font-weight:600;letter-spacing:-0.08px;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_1hio\_ .node tspan[font-weight="normal"],#chatgpt-mermaid-\_r_1hio\_ .edgeLabels tspan[font-weight="normal"]{font-weight:600;}#chatgpt-mermaid-\_r_1hio\_ .edgeLabel .label rect{opacity:1;rx:13px;ry:13px;fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-width:1px;}#chatgpt-mermaid-\_r_1hio\_ .node rect,#chatgpt-mermaid-\_r_1hio\_ .node circle,#chatgpt-mermaid-\_r_1hio\_ .node ellipse,#chatgpt-mermaid-\_r_1hio\_ .node polygon,#chatgpt-mermaid-\_r_1hio\_ .node path{fill:rgb(229, 243, 255);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_1hio\_ .node rect{rx:16px;ry:16px;}#chatgpt-mermaid-\_r_1hio\_ .mermaid-decision .label-container{fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-dasharray:2,2;}#chatgpt-mermaid-\_r_1hio\_ .edgePaths .flowchart-link{stroke:rgba(26, 28, 31, 0.494);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;}#chatgpt-mermaid-\_r_1hio\_ .marker{fill:rgba(26, 28, 31, 0.494);stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hio\_ :root{--mermaid-font-family:-apple-system,"system-ui","Segoe UI",sans-serif;}Contract classificationIdentify party roleLoad approved playbookExtract contractual clausesAssess deviations and risksPropose fallback languagePrepare negotiation summaryLegal and business approval

## 16.6 Workflow 4: Criminal case preparation

\#chatgpt-mermaid-\_r_1hiv\_{font-family:-apple-system,"system-ui","Segoe UI",sans-serif;font-size:14px;fill:rgb(26, 28, 31);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_1hiv\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_1hiv\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_1hiv\_ .error-icon{fill:rgba(255, 255, 255, 0.96);}#chatgpt-mermaid-\_r_1hiv\_ .error-text{fill:rgb(26, 28, 31);stroke:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hiv\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_1hiv\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_1hiv\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_1hiv\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_1hiv\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_1hiv\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_1hiv\_ .marker{fill:rgba(26, 28, 31, 0.494);stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hiv\_ .marker.cross{stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hiv\_ svg{font-family:-apple-system,"system-ui","Segoe UI",sans-serif;font-size:14px;}#chatgpt-mermaid-\_r_1hiv\_ p{margin:0;}#chatgpt-mermaid-\_r_1hiv\_ .label{font-family:-apple-system,"system-ui","Segoe UI",sans-serif;color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hiv\_ .cluster-label text{fill:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hiv\_ .cluster-label span{color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hiv\_ .cluster-label span p{background-color:transparent;}#chatgpt-mermaid-\_r_1hiv\_ .label text,#chatgpt-mermaid-\_r_1hiv\_ span{fill:rgb(26, 28, 31);color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hiv\_ .node rect,#chatgpt-mermaid-\_r_1hiv\_ .node circle,#chatgpt-mermaid-\_r_1hiv\_ .node ellipse,#chatgpt-mermaid-\_r_1hiv\_ .node polygon,#chatgpt-mermaid-\_r_1hiv\_ .node path{fill:rgb(224, 237, 254);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_1hiv\_ .rough-node .label text,#chatgpt-mermaid-\_r_1hiv\_ .node .label text,#chatgpt-mermaid-\_r_1hiv\_ .image-shape .label,#chatgpt-mermaid-\_r_1hiv\_ .icon-shape .label{text-anchor:middle;}#chatgpt-mermaid-\_r_1hiv\_ .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#chatgpt-mermaid-\_r_1hiv\_ .rough-node .label,#chatgpt-mermaid-\_r_1hiv\_ .node .label,#chatgpt-mermaid-\_r_1hiv\_ .image-shape .label,#chatgpt-mermaid-\_r_1hiv\_ .icon-shape .label{text-align:center;}#chatgpt-mermaid-\_r_1hiv\_ .node.clickable{cursor:pointer;}#chatgpt-mermaid-\_r_1hiv\_ .root .anchor path{fill:rgba(26, 28, 31, 0.494)!important;stroke-width:0;stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hiv\_ .arrowheadPath{fill:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hiv\_ .edgePath .path{stroke:rgba(26, 28, 31, 0.494);stroke-width:1px;}#chatgpt-mermaid-\_r_1hiv\_ .flowchart-link{stroke:rgba(26, 28, 31, 0.494);fill:none;}#chatgpt-mermaid-\_r_1hiv\_ .edgeLabel{background-color:rgb(255, 255, 255);text-align:center;}#chatgpt-mermaid-\_r_1hiv\_ .edgeLabel p{background-color:rgb(255, 255, 255);}#chatgpt-mermaid-\_r_1hiv\_ .edgeLabel rect{opacity:0.5;background-color:rgb(255, 255, 255);fill:rgb(255, 255, 255);}#chatgpt-mermaid-\_r_1hiv\_ .labelBkg{background-color:rgba(255, 255, 255, 0.5);}#chatgpt-mermaid-\_r_1hiv\_ .cluster rect{fill:rgba(255, 255, 255, 0.96);stroke:rgba(26, 28, 31, 0.08);stroke-width:1px;}#chatgpt-mermaid-\_r_1hiv\_ .cluster text{fill:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hiv\_ .cluster span{color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hiv\_ div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:-apple-system,"system-ui","Segoe UI",sans-serif;font-size:12px;background:rgba(255, 255, 255, 0.96);border:1px solid rgba(26, 28, 31, 0.08);border-radius:2px;pointer-events:none;z-index:100;}#chatgpt-mermaid-\_r_1hiv\_ .flowchartTitleText{text-anchor:middle;font-size:18px;fill:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hiv\_ rect.text{fill:none;stroke-width:0;}#chatgpt-mermaid-\_r_1hiv\_ .icon-shape,#chatgpt-mermaid-\_r_1hiv\_ .image-shape{background-color:rgb(255, 255, 255);text-align:center;}#chatgpt-mermaid-\_r_1hiv\_ .icon-shape p,#chatgpt-mermaid-\_r_1hiv\_ .image-shape p{background-color:rgb(255, 255, 255);padding:2px;}#chatgpt-mermaid-\_r_1hiv\_ .icon-shape .label rect,#chatgpt-mermaid-\_r_1hiv\_ .image-shape .label rect{opacity:0.5;background-color:rgb(255, 255, 255);fill:rgb(255, 255, 255);}#chatgpt-mermaid-\_r_1hiv\_ .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#chatgpt-mermaid-\_r_1hiv\_ .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#chatgpt-mermaid-\_r_1hiv\_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_1hiv\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_1hiv\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_1hiv\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_1hiv\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hiv\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_1hiv\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_1hiv\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_1hiv\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hiv\_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-\_r_1hiv\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_1hiv\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hiv\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_1hiv\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_1hiv\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hiv\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_1hiv\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hiv\_ .node text{font-size:14px;font-weight:600;letter-spacing:normal;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_1hiv\_ .edgeLabels text{font-size:13px;font-weight:600;letter-spacing:-0.08px;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_1hiv\_ .node tspan[font-weight="normal"],#chatgpt-mermaid-\_r_1hiv\_ .edgeLabels tspan[font-weight="normal"]{font-weight:600;}#chatgpt-mermaid-\_r_1hiv\_ .edgeLabel .label rect{opacity:1;rx:13px;ry:13px;fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-width:1px;}#chatgpt-mermaid-\_r_1hiv\_ .node rect,#chatgpt-mermaid-\_r_1hiv\_ .node circle,#chatgpt-mermaid-\_r_1hiv\_ .node ellipse,#chatgpt-mermaid-\_r_1hiv\_ .node polygon,#chatgpt-mermaid-\_r_1hiv\_ .node path{fill:rgb(229, 243, 255);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_1hiv\_ .node rect{rx:16px;ry:16px;}#chatgpt-mermaid-\_r_1hiv\_ .mermaid-decision .label-container{fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-dasharray:2,2;}#chatgpt-mermaid-\_r_1hiv\_ .edgePaths .flowchart-link{stroke:rgba(26, 28, 31, 0.494);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;}#chatgpt-mermaid-\_r_1hiv\_ .marker{fill:rgba(26, 28, 31, 0.494);stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hiv\_ :root{--mermaid-font-family:-apple-system,"system-ui","Segoe UI",sans-serif;}Case intakeComplaint or FIR assessmentChronology preparationApplicable law and transitioncheckEvidence matrixProcedural issueidentificationLegal research questionsProfessional review

## 16.7 Workflow 5: Enterprise AI vendor assessment

\#chatgpt-mermaid-\_r_1hj6\_{font-family:-apple-system,"system-ui","Segoe UI",sans-serif;font-size:14px;fill:rgb(26, 28, 31);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_1hj6\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_1hj6\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_1hj6\_ .error-icon{fill:rgba(255, 255, 255, 0.96);}#chatgpt-mermaid-\_r_1hj6\_ .error-text{fill:rgb(26, 28, 31);stroke:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hj6\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_1hj6\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_1hj6\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_1hj6\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_1hj6\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_1hj6\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_1hj6\_ .marker{fill:rgba(26, 28, 31, 0.494);stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hj6\_ .marker.cross{stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hj6\_ svg{font-family:-apple-system,"system-ui","Segoe UI",sans-serif;font-size:14px;}#chatgpt-mermaid-\_r_1hj6\_ p{margin:0;}#chatgpt-mermaid-\_r_1hj6\_ .label{font-family:-apple-system,"system-ui","Segoe UI",sans-serif;color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hj6\_ .cluster-label text{fill:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hj6\_ .cluster-label span{color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hj6\_ .cluster-label span p{background-color:transparent;}#chatgpt-mermaid-\_r_1hj6\_ .label text,#chatgpt-mermaid-\_r_1hj6\_ span{fill:rgb(26, 28, 31);color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hj6\_ .node rect,#chatgpt-mermaid-\_r_1hj6\_ .node circle,#chatgpt-mermaid-\_r_1hj6\_ .node ellipse,#chatgpt-mermaid-\_r_1hj6\_ .node polygon,#chatgpt-mermaid-\_r_1hj6\_ .node path{fill:rgb(224, 237, 254);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_1hj6\_ .rough-node .label text,#chatgpt-mermaid-\_r_1hj6\_ .node .label text,#chatgpt-mermaid-\_r_1hj6\_ .image-shape .label,#chatgpt-mermaid-\_r_1hj6\_ .icon-shape .label{text-anchor:middle;}#chatgpt-mermaid-\_r_1hj6\_ .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#chatgpt-mermaid-\_r_1hj6\_ .rough-node .label,#chatgpt-mermaid-\_r_1hj6\_ .node .label,#chatgpt-mermaid-\_r_1hj6\_ .image-shape .label,#chatgpt-mermaid-\_r_1hj6\_ .icon-shape .label{text-align:center;}#chatgpt-mermaid-\_r_1hj6\_ .node.clickable{cursor:pointer;}#chatgpt-mermaid-\_r_1hj6\_ .root .anchor path{fill:rgba(26, 28, 31, 0.494)!important;stroke-width:0;stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hj6\_ .arrowheadPath{fill:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hj6\_ .edgePath .path{stroke:rgba(26, 28, 31, 0.494);stroke-width:1px;}#chatgpt-mermaid-\_r_1hj6\_ .flowchart-link{stroke:rgba(26, 28, 31, 0.494);fill:none;}#chatgpt-mermaid-\_r_1hj6\_ .edgeLabel{background-color:rgb(255, 255, 255);text-align:center;}#chatgpt-mermaid-\_r_1hj6\_ .edgeLabel p{background-color:rgb(255, 255, 255);}#chatgpt-mermaid-\_r_1hj6\_ .edgeLabel rect{opacity:0.5;background-color:rgb(255, 255, 255);fill:rgb(255, 255, 255);}#chatgpt-mermaid-\_r_1hj6\_ .labelBkg{background-color:rgba(255, 255, 255, 0.5);}#chatgpt-mermaid-\_r_1hj6\_ .cluster rect{fill:rgba(255, 255, 255, 0.96);stroke:rgba(26, 28, 31, 0.08);stroke-width:1px;}#chatgpt-mermaid-\_r_1hj6\_ .cluster text{fill:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hj6\_ .cluster span{color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hj6\_ div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:-apple-system,"system-ui","Segoe UI",sans-serif;font-size:12px;background:rgba(255, 255, 255, 0.96);border:1px solid rgba(26, 28, 31, 0.08);border-radius:2px;pointer-events:none;z-index:100;}#chatgpt-mermaid-\_r_1hj6\_ .flowchartTitleText{text-anchor:middle;font-size:18px;fill:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hj6\_ rect.text{fill:none;stroke-width:0;}#chatgpt-mermaid-\_r_1hj6\_ .icon-shape,#chatgpt-mermaid-\_r_1hj6\_ .image-shape{background-color:rgb(255, 255, 255);text-align:center;}#chatgpt-mermaid-\_r_1hj6\_ .icon-shape p,#chatgpt-mermaid-\_r_1hj6\_ .image-shape p{background-color:rgb(255, 255, 255);padding:2px;}#chatgpt-mermaid-\_r_1hj6\_ .icon-shape .label rect,#chatgpt-mermaid-\_r_1hj6\_ .image-shape .label rect{opacity:0.5;background-color:rgb(255, 255, 255);fill:rgb(255, 255, 255);}#chatgpt-mermaid-\_r_1hj6\_ .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#chatgpt-mermaid-\_r_1hj6\_ .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#chatgpt-mermaid-\_r_1hj6\_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_1hj6\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_1hj6\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_1hj6\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_1hj6\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hj6\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_1hj6\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_1hj6\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_1hj6\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hj6\_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-\_r_1hj6\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_1hj6\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hj6\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_1hj6\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_1hj6\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hj6\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_1hj6\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hj6\_ .node text{font-size:14px;font-weight:600;letter-spacing:normal;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_1hj6\_ .edgeLabels text{font-size:13px;font-weight:600;letter-spacing:-0.08px;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_1hj6\_ .node tspan[font-weight="normal"],#chatgpt-mermaid-\_r_1hj6\_ .edgeLabels tspan[font-weight="normal"]{font-weight:600;}#chatgpt-mermaid-\_r_1hj6\_ .edgeLabel .label rect{opacity:1;rx:13px;ry:13px;fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-width:1px;}#chatgpt-mermaid-\_r_1hj6\_ .node rect,#chatgpt-mermaid-\_r_1hj6\_ .node circle,#chatgpt-mermaid-\_r_1hj6\_ .node ellipse,#chatgpt-mermaid-\_r_1hj6\_ .node polygon,#chatgpt-mermaid-\_r_1hj6\_ .node path{fill:rgb(229, 243, 255);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_1hj6\_ .node rect{rx:16px;ry:16px;}#chatgpt-mermaid-\_r_1hj6\_ .mermaid-decision .label-container{fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-dasharray:2,2;}#chatgpt-mermaid-\_r_1hj6\_ .edgePaths .flowchart-link{stroke:rgba(26, 28, 31, 0.494);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;}#chatgpt-mermaid-\_r_1hj6\_ .marker{fill:rgba(26, 28, 31, 0.494);stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hj6\_ :root{--mermaid-font-family:-apple-system,"system-ui","Segoe UI",sans-serif;}AI use case classificationData flow assessmentVendor contract reviewPrivacy assessmentAI governance riskassessmentHuman oversight evaluationMitigation recommendationsHuman approval decision

## 16.8 Workflow step data requirements

Every workflow step must define:

| Field                | Purpose                         |
| -------------------- | ------------------------------- |
| Step ID              | Unique identifier               |
| Step name            | Professional task               |
| Objective            | Intended outcome                |
| Required inputs      | Documents or facts              |
| Linked skill         | Relevant catalogue record       |
| Prompt               | Configurable educational prompt |
| Expected deliverable | Output structure                |
| Dependencies         | Previous steps                  |
| Verification gate    | Mandatory human checks          |
| Completion state     | Manually controlled progress    |
| Next step            | Recommended continuation        |

# 17. Legal AI learning centre

## 17.1 Learning curriculum

| Level        | Module                      | Learning outcome                                  |
| ------------ | --------------------------- | ------------------------------------------------- |
| Beginner     | Understanding generative AI | Understand AI capabilities and limitations        |
| Beginner     | Legal prompts               | Write structured legal instructions               |
| Beginner     | Responsible AI              | Recognise confidentiality and hallucination risks |
| Intermediate | Legal reasoning             | Apply IRAC and FILAC                              |
| Intermediate | Contract analysis           | Understand clause-based review                    |
| Intermediate | Legal research              | Ground and verify authorities                     |
| Advanced     | Skills and agents           | Understand execution models                       |
| Advanced     | RAG                         | Understand retrieval-based legal AI               |
| Advanced     | AI evaluation               | Assess accuracy and unsupported claims            |
| Builder      | PEAS framework              | Model intelligent assistant requirements          |
| Builder      | Multi-agent workflows       | Connect specialised legal tasks                   |
| Builder      | AI governance               | Design human oversight and controls               |

## 17.2 PEAS framework

PEAS is an AI/ML educational framework describing the performance measure, environment, actuators and sensors of an intelligent agent or assistant design.

# P

Performance measure

How the assistant's performance is assessed.

- Accurate clause identification.
- Grounded findings.
- Low unsupported-claim rate.

# E

Environment

Context in which the assistant operates.

- Contract documents.
- Legal playbook.
- Applicable jurisdiction.

# A

Actuators

Actions or outputs available to the assistant.

- Risk reports.
- Proposed amendments.
- Clarification questions.

# S

Sensors

Information available to the assistant.

- Contract text.
- User instructions.
- Verified connector results.

PEAS must be identified as independently authored educational content, not official upstream metadata.

## 17.3 Legal reasoning frameworks

| Framework        | Components                                 | Application             |
| ---------------- | ------------------------------------------ | ----------------------- |
| IRAC             | Issue, Rule, Application, Conclusion       | Legal problem analysis  |
| FILAC            | Facts, Issue, Law, Application, Conclusion | Case briefing           |
| Legal memorandum | Question, facts, law, analysis, conclusion | Professional research   |
| Risk matrix      | Issue, likelihood, impact, mitigation      | Contract and compliance |
| Evidence matrix  | Fact, evidence, source, reliability, gap   | Litigation              |
| Chronology       | Date, event, source, significance          | Case preparation        |

# 18. Search and discovery

## 18.1 Search engine

Use Fuse.js for client-side fuzzy search.

Search must index the generated catalogue and related educational content.

## 18.2 Searchable attributes

| Attribute        | Example                   |
| ---------------- | ------------------------- |
| Skill name       | Contract review           |
| Official command | Verified upstream command |
| Practice area    | Litigation                |
| Legal task       | Legal notice              |
| Persona          | Advocate                  |
| Jurisdiction     | India                     |
| Legislation      | Companies Act             |
| Scenario         | Bank account freeze       |
| Workflow         | Civil recovery            |
| Connector        | Legal research connector  |
| Output type      | Risk matrix               |

## 18.3 Filters

## Skill discovery prototype

Professional roleAll roles

Practice areaAll areas

6 matching educational tasks

Clear filters

NDA Triage

Commercial · Counsel

Clause risk and negotiation assessment

Civil Recovery Preparation

Litigation · Advocate

Evidence and recovery workflow

Bank Account Freeze

Banking · Advocate

Transaction and procedural assessment

IRAC Case Analysis

Education · Student

Guided legal reasoning

AI Vendor Assessment

Commercial · Counsel

AI procurement and governance risk

Socratic Legal Learning

Education · Student

Question-based legal learning

Demonstration dataset, not the verified upstream inventory.

# 19. UI/UX requirements

## 19.1 Desktop application design

Proposed desktop interface: category navigation, prompt configuration and illustrative response blueprint.

## 19.2 Mobile application design

## 19.3 Design system

Background

\#FFFFFF

Secondary

\#F8FAFC

Primary text

\#0F172A

Secondary text

\#475569

Primary accent

\#0F5C6B

Critical risk

\#B91C1C

Warning

\#B45309

Success

\#047857

## 19.4 Responsive behaviour

| Screen width     | Layout                                        |
| ---------------- | --------------------------------------------- |
| 1440px and above | Three-panel workbench                         |
| 1024px to 1439px | Compact three-panel or collapsible navigation |
| 768px to 1023px  | Two-panel layout with navigation drawer       |
| 320px to 767px   | Single-column content with tabs               |

## 19.5 Accessibility requirements

The application must provide semantic HTML, keyboard navigation, visible focus indicators, accessible forms, screen-reader labels, sufficient colour contrast, reduced-motion support and non-colour risk indicators.

Target WCAG 2.2 AA compliance, subject to actual accessibility testing.

# 20. Technical architecture

## 20.1 Architecture decision

React frontend with Python build-time content engineering.

No Python runtime, database or application server is required in production.

## High-level system architecture

Upstream Claude for Legal repository

Pinned commit · Skills · Plugins · Agents · Documentation

Official catalogue

Extracted metadata

Educational overlays

Authored Markdown

India overlays

Legal localisation

Python content engineering pipeline

Source extraction

Schema validation

Overlay merging

Drift detection

Reference validation

JSON compilation

Canonical static data

skills.json · manifest.json

### React + TypeScript + Vite

Navigation

Skill explorer

Prompt builder

Response preview

Workflows

Learning centre

Zustand state · Fuse.js search · Tailwind CSS

GitHub Pages

Static HTML, CSS, JavaScript and JSON

Desktop

Tablet

Mobile

External Claude environment

Manual prompt transfer and execution by the user. No runtime integration.

## 20.2 Technology stack

| Layer            | Technology                    | Purpose                        |
| ---------------- | ----------------------------- | ------------------------------ |
| Frontend         | React 18+                     | UI development                 |
| Language         | TypeScript                    | Type safety                    |
| Build            | Vite                          | Static application compilation |
| Styling          | Tailwind CSS                  | Responsive design              |
| State            | Zustand                       | Client-side state              |
| Icons            | Lucide React                  | Interface icons                |
| Search           | Fuse.js                       | Fuzzy search                   |
| Markdown         | react-markdown, remark-gfm    | Safe content rendering         |
| Build language   | Python 3.11+                  | Content engineering            |
| Schema           | Pydantic v2                   | Data validation                |
| Parsing          | PyYAML, python-frontmatter    | Markdown metadata              |
| CLI              | Click                         | Build commands                 |
| Python testing   | pytest                        | Pipeline testing               |
| Python quality   | Ruff, mypy                    | Static analysis                |
| Frontend testing | Vitest, React Testing Library | Component testing              |
| E2E              | Playwright                    | User journey testing           |
| Accessibility    | axe-core                      | Automated accessibility checks |
| CI/CD            | GitHub Actions                | Validation and deployment      |
| Hosting          | GitHub Pages                  | Static hosting                 |

## 20.3 Architecture constraints

| ID      | Constraint                                |
| ------- | ----------------------------------------- |
| ARC-001 | No runtime backend                        |
| ARC-002 | No production Python process              |
| ARC-003 | No database                               |
| ARC-004 | No mandatory API keys                     |
| ARC-005 | No React Router                           |
| ARC-006 | No Next.js                                |
| ARC-007 | Native URL hash navigation                |
| ARC-008 | Single canonical content catalogue        |
| ARC-009 | No duplicate manually maintained datasets |
| ARC-010 | No runtime AI API calls                   |
| ARC-011 | No unreviewed upstream auto-publication   |
| ARC-012 | No persistent matter-specific data        |

## 20.4 Application directory structure

```
claude-legal-skills/
│
├── .github/
│   └── workflows/
│       ├── quality-check.yml
│       ├── deploy.yml
│       └── upstream-sync.yml
│
├── config/
│   ├── upstream.yaml
│   └── content-policy.yaml
│
├── content/
│   ├── overlays/
│   ├── india/
│   ├── legislation/
│   ├── case-studies/
│   ├── workflows/
│   ├── learning/
│   └── glossary/
│
├── scripts/
│   ├── build_skills.py
│   ├── schema.py
│   ├── validators.py
│   ├── upstream.py
│   ├── check_upstream.py
│   ├── validate_content.py
│   ├── generate_report.py
│   └── tests/
│
├── public/
│   ├── data/
│   │   ├── skills.json
│   │   └── manifest.json
│   └── assets/
│
├── src/
│   ├── app/
│   ├── components/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── common/
│   │   ├── forms/
│   │   └── visualisation/
│   ├── features/
│   │   ├── skills/
│   │   ├── prompt-builder/
│   │   ├── response-preview/
│   │   ├── india/
│   │   ├── workflows/
│   │   ├── case-studies/
│   │   ├── learning/
│   │   └── workspace/
│   ├── pages/
│   ├── stores/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── styles/
│   ├── App.tsx
│   └── main.tsx
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── docs/
├── requirements.txt
├── pyproject.toml
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig.json
├── LICENSE
├── NOTICE
└── README.md
```

# 21. Content engineering pipeline

## 21.1 Content architecture

Maintain three independent content layers.

| Layer               | Ownership                        | Purpose                                |
| ------------------- | -------------------------------- | -------------------------------------- |
| Official source     | Upstream repository              | Verified official skill information    |
| Educational overlay | Application maintainers          | Prompts, examples and learning content |
| India overlay       | Indian legal content maintainers | Jurisdiction-specific adaptation       |

## 21.2 Build process

\#chatgpt-mermaid-\_r_1hms\_{font-family:-apple-system,"system-ui","Segoe UI",sans-serif;font-size:14px;fill:rgb(26, 28, 31);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_1hms\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_1hms\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_1hms\_ .error-icon{fill:rgba(255, 255, 255, 0.96);}#chatgpt-mermaid-\_r_1hms\_ .error-text{fill:rgb(26, 28, 31);stroke:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hms\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_1hms\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_1hms\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_1hms\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_1hms\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_1hms\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_1hms\_ .marker{fill:rgba(26, 28, 31, 0.494);stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hms\_ .marker.cross{stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hms\_ svg{font-family:-apple-system,"system-ui","Segoe UI",sans-serif;font-size:14px;}#chatgpt-mermaid-\_r_1hms\_ p{margin:0;}#chatgpt-mermaid-\_r_1hms\_ .label{font-family:-apple-system,"system-ui","Segoe UI",sans-serif;color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hms\_ .cluster-label text{fill:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hms\_ .cluster-label span{color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hms\_ .cluster-label span p{background-color:transparent;}#chatgpt-mermaid-\_r_1hms\_ .label text,#chatgpt-mermaid-\_r_1hms\_ span{fill:rgb(26, 28, 31);color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hms\_ .node rect,#chatgpt-mermaid-\_r_1hms\_ .node circle,#chatgpt-mermaid-\_r_1hms\_ .node ellipse,#chatgpt-mermaid-\_r_1hms\_ .node polygon,#chatgpt-mermaid-\_r_1hms\_ .node path{fill:rgb(224, 237, 254);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_1hms\_ .rough-node .label text,#chatgpt-mermaid-\_r_1hms\_ .node .label text,#chatgpt-mermaid-\_r_1hms\_ .image-shape .label,#chatgpt-mermaid-\_r_1hms\_ .icon-shape .label{text-anchor:middle;}#chatgpt-mermaid-\_r_1hms\_ .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#chatgpt-mermaid-\_r_1hms\_ .rough-node .label,#chatgpt-mermaid-\_r_1hms\_ .node .label,#chatgpt-mermaid-\_r_1hms\_ .image-shape .label,#chatgpt-mermaid-\_r_1hms\_ .icon-shape .label{text-align:center;}#chatgpt-mermaid-\_r_1hms\_ .node.clickable{cursor:pointer;}#chatgpt-mermaid-\_r_1hms\_ .root .anchor path{fill:rgba(26, 28, 31, 0.494)!important;stroke-width:0;stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hms\_ .arrowheadPath{fill:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hms\_ .edgePath .path{stroke:rgba(26, 28, 31, 0.494);stroke-width:1px;}#chatgpt-mermaid-\_r_1hms\_ .flowchart-link{stroke:rgba(26, 28, 31, 0.494);fill:none;}#chatgpt-mermaid-\_r_1hms\_ .edgeLabel{background-color:rgb(255, 255, 255);text-align:center;}#chatgpt-mermaid-\_r_1hms\_ .edgeLabel p{background-color:rgb(255, 255, 255);}#chatgpt-mermaid-\_r_1hms\_ .edgeLabel rect{opacity:0.5;background-color:rgb(255, 255, 255);fill:rgb(255, 255, 255);}#chatgpt-mermaid-\_r_1hms\_ .labelBkg{background-color:rgba(255, 255, 255, 0.5);}#chatgpt-mermaid-\_r_1hms\_ .cluster rect{fill:rgba(255, 255, 255, 0.96);stroke:rgba(26, 28, 31, 0.08);stroke-width:1px;}#chatgpt-mermaid-\_r_1hms\_ .cluster text{fill:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hms\_ .cluster span{color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hms\_ div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:-apple-system,"system-ui","Segoe UI",sans-serif;font-size:12px;background:rgba(255, 255, 255, 0.96);border:1px solid rgba(26, 28, 31, 0.08);border-radius:2px;pointer-events:none;z-index:100;}#chatgpt-mermaid-\_r_1hms\_ .flowchartTitleText{text-anchor:middle;font-size:18px;fill:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hms\_ rect.text{fill:none;stroke-width:0;}#chatgpt-mermaid-\_r_1hms\_ .icon-shape,#chatgpt-mermaid-\_r_1hms\_ .image-shape{background-color:rgb(255, 255, 255);text-align:center;}#chatgpt-mermaid-\_r_1hms\_ .icon-shape p,#chatgpt-mermaid-\_r_1hms\_ .image-shape p{background-color:rgb(255, 255, 255);padding:2px;}#chatgpt-mermaid-\_r_1hms\_ .icon-shape .label rect,#chatgpt-mermaid-\_r_1hms\_ .image-shape .label rect{opacity:0.5;background-color:rgb(255, 255, 255);fill:rgb(255, 255, 255);}#chatgpt-mermaid-\_r_1hms\_ .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#chatgpt-mermaid-\_r_1hms\_ .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#chatgpt-mermaid-\_r_1hms\_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_1hms\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_1hms\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_1hms\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_1hms\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hms\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_1hms\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_1hms\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_1hms\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hms\_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-\_r_1hms\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_1hms\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hms\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_1hms\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_1hms\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hms\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_1hms\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hms\_ .node text{font-size:14px;font-weight:600;letter-spacing:normal;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_1hms\_ .edgeLabels text{font-size:13px;font-weight:600;letter-spacing:-0.08px;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_1hms\_ .node tspan[font-weight="normal"],#chatgpt-mermaid-\_r_1hms\_ .edgeLabels tspan[font-weight="normal"]{font-weight:600;}#chatgpt-mermaid-\_r_1hms\_ .edgeLabel .label rect{opacity:1;rx:13px;ry:13px;fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-width:1px;}#chatgpt-mermaid-\_r_1hms\_ .node rect,#chatgpt-mermaid-\_r_1hms\_ .node circle,#chatgpt-mermaid-\_r_1hms\_ .node ellipse,#chatgpt-mermaid-\_r_1hms\_ .node polygon,#chatgpt-mermaid-\_r_1hms\_ .node path{fill:rgb(229, 243, 255);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_1hms\_ .node rect{rx:16px;ry:16px;}#chatgpt-mermaid-\_r_1hms\_ .mermaid-decision .label-container{fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-dasharray:2,2;}#chatgpt-mermaid-\_r_1hms\_ .edgePaths .flowchart-link{stroke:rgba(26, 28, 31, 0.494);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;}#chatgpt-mermaid-\_r_1hms\_ .marker{fill:rgba(26, 28, 31, 0.494);stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hms\_ :root{--mermaid-font-family:-apple-system,"system-ui","Segoe UI",sans-serif;}Fetch pinned upstreamcommitDiscover plugins and skillsParse Markdown metadataExtract execution informationEducational overlaysMerge contentIndia overlaysPydantic validationValidation successful?Fail build and report errorsGenerate canonical JSONGenerate coverage reportVite production buildGitHub PagesNoYes

## 21.3 Python CLI requirements

| Command                              | Purpose                   |
| ------------------------------------ | ------------------------- |
| `python scripts/build_skills.py`     | Generate catalogue        |
| `python scripts/validate_content.py` | Validate generated data   |
| `python scripts/check_upstream.py`   | Detect upstream changes   |
| `python scripts/generate_report.py`  | Generate coverage reports |
| `pytest scripts/tests/`              | Execute pipeline tests    |

## 21.4 Generated catalogue

The canonical file shall be:

`public/data/skills.json`

It must be generated by Python before the Vite production build and loaded by the browser from the same-origin static hosting location.

It must not be manually edited.

# 22. Data model

## 22.1 Logical entity relationship model

Conceptual content relationships. Many-to-many references are represented using stable IDs in static JSON, not a runtime database.

## 22.2 Core entities

| Entity             | Purpose                            |
| ------------------ | ---------------------------------- |
| Plugin             | Upstream plugin classification     |
| OfficialSkill      | Verified official skill metadata   |
| Agent              | Scheduled or managed agent record  |
| EducationalOverlay | Independently authored walkthrough |
| IndiaOverlay       | Indian legal adaptation            |
| PromptVariable     | Editable prompt field              |
| OutputExample      | Synthetic response                 |
| CaseStudy          | Fictional legal matter             |
| Workflow           | Connected legal task sequence      |
| WorkflowStep       | Individual workflow task           |
| Legislation        | Versioned legal source record      |
| LearningModule     | Educational content                |
| SourceRecord       | Source provenance                  |
| ReviewRecord       | Professional review metadata       |
| UserPreference     | Non-sensitive local preference     |

## 22.3 Skill schema

| Field                 | Type           | Mandatory                  |
| --------------------- | -------------- | -------------------------- |
| id                    | String         | Yes                        |
| slug                  | String         | Yes                        |
| pluginId              | String         | For official skills        |
| categoryId            | String         | Yes                        |
| officialName          | String         | For official skills        |
| displayName           | String         | Yes                        |
| description           | String         | Yes                        |
| sourceType            | Enum           | Yes                        |
| recordType            | Enum           | Yes                        |
| invocationType        | Enum           | For official records       |
| officialCommand       | String or null | Conditional                |
| argumentHint          | String or null | Conditional                |
| supportedEnvironments | Array          | Yes                        |
| prerequisites         | Array          | Yes                        |
| requiredConnectors    | Array          | Yes                        |
| optionalConnectors    | Array          | Yes                        |
| educationalStatus     | Enum           | Yes                        |
| purpose               | String         | Complete overlays          |
| whenToUse             | Array          | Complete overlays          |
| whenNotToUse          | Array          | Complete overlays          |
| targetPersonas        | Array          | Complete overlays          |
| difficulty            | Enum           | Complete overlays          |
| requiredInputs        | Array          | Complete overlays          |
| variables             | Array          | Complete overlays          |
| promptTemplate        | String         | Complete overlays          |
| fictionalScenario     | Object         | Complete overlays          |
| outputExamples        | Array          | Complete overlays          |
| guardrails            | Array          | Complete overlays          |
| verificationChecklist | Array          | Complete overlays          |
| indiaOverlayIds       | Array          | Conditional                |
| peas                  | Object or null | Optional                   |
| relatedSkillIds       | Array          | Yes                        |
| sourceRecord          | Object         | Official or mapped records |
| legalReviewStatus     | Enum           | Yes                        |

## 22.4 Example TypeScript interfaces

```
type SourceType =
  | "official"
  | "educational"
  | "india-adaptation"
  | "external-plugin";

type InvocationType =
  | "command"
  | "automatic"
  | "scheduled-agent"
  | "managed-agent"
  | "unknown";

type LegalReviewStatus =
  | "not-reviewed"
  | "review-pending"
  | "reviewed"
  | "needs-revalidation";

interface SourceRecord {
  repository: string;
  path: string;
  commitSha: string;
  contentHash: string;
  sourceUrl: string;
  verifiedAt: string;
  licence: string;
}

interface PromptVariable {
  key: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "select"
    | "multi-select"
    | "number"
    | "date"
    | "boolean";
  required: boolean;
  defaultValue?: unknown;
  options?: string[];
}

interface OutputExample {
  id: string;
  label: "illustrative";
  fictionalScenarioId: string;
  outputType: string;
  markdown: string;
}

interface LegalSkill {
  id: string;
  slug: string;
  pluginId?: string;
  categoryId: string;
  officialName?: string;
  displayName: string;
  description: string;
  sourceType: SourceType;
  invocationType?: InvocationType;
  officialCommand?: string;
  supportedEnvironments: string[];
  prerequisites: string[];
  requiredConnectors: string[];
  educationalStatus:
    | "catalogue-only"
    | "draft"
    | "ready"
    | "needs-update";
  variables?: PromptVariable[];
  promptTemplate?: string;
  outputExamples?: OutputExample[];
  guardrails?: string[];
  relatedSkillIds: string[];
  legalReviewStatus: LegalReviewStatus;
  sourceRecord?: SourceRecord;
}
```

The final implementation schema must be validated against actual upstream skill definitions and manifests before being locked.

# 23. Content validation and governance

## 23.1 Validation rules

| ID     | Validation                       | Failure behaviour |
| ------ | -------------------------------- | ----------------- |
| CV-001 | Unique skill IDs                 | Fail build        |
| CV-002 | Valid YAML frontmatter           | Fail build        |
| CV-003 | Valid schema                     | Fail build        |
| CV-004 | Existing upstream source mapping | Fail build        |
| CV-005 | Valid related-skill references   | Fail build        |
| CV-006 | Declared prompt variables        | Fail build        |
| CV-007 | Complete ready templates         | Fail build        |
| CV-008 | Meaningful legal guardrails      | Fail build        |
| CV-009 | Synthetic output label           | Fail build        |
| CV-010 | Valid review metadata            | Fail build        |
| CV-011 | Safe source paths                | Fail build        |
| CV-012 | Valid source URL format          | Fail build        |
| CV-013 | No duplicate variable keys       | Fail build        |
| CV-014 | No unsupported official commands | Fail build        |
| CV-015 | Accurate licence metadata        | Block publication |
| CV-016 | Upstream source drift            | Require review    |

## 23.2 Content lifecycle

1. Source discovery and verification
2. Educational content authoring
3. Technical schema validation
4. Legal content review
5. Approved educational publication or clearly labelled review-pending publication
6. Upstream and legislation change monitoring
7. Revalidation and version update

Professional review status must never be inferred from a successful build.

# 24. Security and privacy

## 24.1 Data classification

| Data type                | Classification | Storage policy                                               |
| ------------------------ | -------------- | ------------------------------------------------------------ |
| Official skill metadata  | Public         | Static JSON                                                  |
| Educational prompts      | Public         | Static JSON                                                  |
| Fictional case studies   | Public         | Static JSON                                                  |
| Legislation references   | Public         | Static JSON                                                  |
| Bookmarks                | Non-sensitive  | LocalStorage                                                 |
| Theme preferences        | Non-sensitive  | LocalStorage                                                 |
| Learning progress        | Non-sensitive  | LocalStorage                                                 |
| Client names             | Confidential   | Do not persist                                               |
| Actual case facts        | Confidential   | Browser memory only                                          |
| Privileged information   | Restricted     | Users instructed not to enter without appropriate safeguards |
| Generated matter prompts | Confidential   | Browser memory only                                          |
| API keys                 | Restricted     | Not required                                                 |

## 24.2 Security requirements

| ID      | Requirement                              | Priority |
| ------- | ---------------------------------------- | -------- |
| SEC-001 | No frontend secrets                      | Critical |
| SEC-002 | No runtime external AI calls             | Critical |
| SEC-003 | Disable unsafe Markdown HTML             | Critical |
| SEC-004 | Prevent cross-site scripting             | Critical |
| SEC-005 | Validate external URL protocols          | High     |
| SEC-006 | Prevent YAML unsafe deserialisation      | Critical |
| SEC-007 | Prevent source path traversal            | Critical |
| SEC-008 | Validate generated JSON                  | Critical |
| SEC-009 | Scan dependency vulnerabilities          | High     |
| SEC-010 | Prevent sensitive URL parameters         | Critical |
| SEC-011 | Prevent sensitive local persistence      | Critical |
| SEC-012 | Avoid sensitive logging                  | Critical |
| SEC-013 | Provide clear local data controls        | Critical |
| SEC-014 | Treat upstream content as untrusted data | Critical |
| SEC-015 | Use least-privilege CI permissions       | High     |

## 24.3 Privacy data flow

User enters anonymised matter information

Browser memory

Temporary Zustand state

Local prompt compilation

No server or AI API request

Manual copy by user

External AI service

Separate privacy policies and user responsibilities apply.

# 25. Legal and professional compliance

## 25.1 Mandatory professional safeguards

| ID      | Requirement                                                       |
| ------- | ----------------------------------------------------------------- |
| LEG-001 | Identify application as unofficial                                |
| LEG-002 | Clearly distinguish education from legal advice                   |
| LEG-003 | Require independent legal verification                            |
| LEG-004 | Warn against disclosure of privileged information                 |
| LEG-005 | Explain jurisdiction-specific limitations                         |
| LEG-006 | Avoid fabricated judgments and statutory provisions               |
| LEG-007 | Provide source attribution                                        |
| LEG-008 | Preserve applicable upstream licence obligations                  |
| LEG-009 | Do not imply Anthropic endorsement                                |
| LEG-010 | Do not guarantee legal outcomes                                   |
| LEG-011 | Do not automate professional approval                             |
| LEG-012 | Do not automatically contact courts or clients                    |
| LEG-013 | Maintain actual legal review metadata                             |
| LEG-014 | Review professional advertising rules before commercial promotion |

## 25.2 Proposed application disclaimer

Claude Legal Skills Workbench is an independent educational resource designed to help legal professionals and students understand AI-assisted legal workflows.

This application is not affiliated with, endorsed by, or operated by Anthropic.

The prompts, fictional case studies and illustrative response examples provided through this application are intended for educational purposes. They do not constitute legal advice, professional legal opinions or verified AI-generated responses.

Users must independently verify all factual assumptions, statutory provisions, case citations, procedural requirements and legal conclusions before professional reliance.

Users are responsible for protecting confidential information, personal data and legally privileged communications when using external artificial intelligence services.

The application does not directly execute AI models, provide legal representation or guarantee any legal outcome.

Professional decisions remain the responsibility of the qualified legal professional handling the matter.

## 25.3 Intellectual property requirements

Verify the licence at the pinned upstream commit.

Where Apache-2.0 applies, preserve required licence text, attribution, modification notices and applicable NOTICE information.

An independently selected licence for original application code must not remove or override upstream obligations.

# 26. Non-functional requirements

| ID      | Category        | Requirement                    | Target                         |
| ------- | --------------- | ------------------------------ | ------------------------------ |
| NFR-001 | Performance     | Largest Contentful Paint       | Below 2.5 seconds              |
| NFR-002 | Performance     | Interaction to Next Paint      | Below 200 ms                   |
| NFR-003 | Performance     | Cumulative Layout Shift        | Below 0.1                      |
| NFR-004 | Search          | Initial catalogue search       | Below 200 ms                   |
| NFR-005 | Accessibility   | WCAG compliance                | 2.2 AA target                  |
| NFR-006 | Accessibility   | Lighthouse score               | 95+ target                     |
| NFR-007 | Performance     | Lighthouse score               | 95+ target                     |
| NFR-008 | Responsiveness  | Minimum viewport               | 320px                          |
| NFR-009 | Compatibility   | Browser support                | Current major browsers         |
| NFR-010 | Maintainability | TypeScript                     | Strict mode                    |
| NFR-011 | Maintainability | Python                         | Typed and statically checked   |
| NFR-012 | Extensibility   | New skill content              | No new React page required     |
| NFR-013 | Privacy         | Sensitive persistent storage   | Zero                           |
| NFR-014 | Security        | Critical known vulnerabilities | Zero unresolved at release     |
| NFR-015 | Deployment      | Hosting compatibility          | GitHub Pages                   |
| NFR-016 | Reliability     | Invalid content publication    | Prevented by CI                |
| NFR-017 | Portability     | Runtime server dependency      | None                           |
| NFR-018 | Observability   | Build failure reporting        | Actionable error messages      |
| NFR-019 | Recoverability  | Rollback                       | Previous approved Git revision |
| NFR-020 | Traceability    | Official source provenance     | Complete                       |

Performance values are engineering targets. Actual results must be measured under documented test conditions.

# 27. Testing strategy

## 27.1 Testing pyramid

## 27.2 Test case catalogue

| Test ID | Test scenario                   | Expected result                 |
| ------- | ------------------------------- | ------------------------------- |
| TC-001  | Valid upstream Markdown         | Successfully parsed             |
| TC-002  | Invalid YAML                    | Build fails                     |
| TC-003  | Missing required schema field   | Validation fails                |
| TC-004  | Duplicate skill identifier      | Build fails                     |
| TC-005  | Orphaned overlay                | Build fails                     |
| TC-006  | Invalid related-skill reference | Build fails                     |
| TC-007  | Undeclared prompt variable      | Validation fails                |
| TC-008  | Missing legal guardrail         | Validation fails                |
| TC-009  | Invalid review metadata         | Validation fails                |
| TC-010  | Source drift                    | Review required                 |
| TC-011  | Application initial load        | Catalogue displayed             |
| TC-012  | Category selection              | Correct skills displayed        |
| TC-013  | Skill selection                 | Correct details rendered        |
| TC-014  | Prompt variable modification    | Prompt updates                  |
| TC-015  | Copy prompt                     | Plain text copied               |
| TC-016  | Required variable missing       | User notified                   |
| TC-017  | India overlay selection         | Correct adaptation displayed    |
| TC-018  | Search                          | Relevant results displayed      |
| TC-019  | Combined filters                | Correct intersection            |
| TC-020  | Synthetic response preview      | Label displayed                 |
| TC-021  | Markdown toggle                 | Correct raw content             |
| TC-022  | Workflow navigation             | Correct step displayed          |
| TC-023  | Direct deep link                | Correct skill opens             |
| TC-024  | Browser refresh                 | Selected route retained         |
| TC-025  | Back and forward navigation     | Correct state restored          |
| TC-026  | Mobile navigation               | Drawer works                    |
| TC-027  | 320px viewport                  | No page-level overflow          |
| TC-028  | Keyboard navigation             | Controls accessible             |
| TC-029  | Malicious Markdown              | Unsafe content blocked          |
| TC-030  | Matter input persistence        | No sensitive storage            |
| TC-031  | Network inspection              | No matter data transmitted      |
| TC-032  | Clear local data                | Stored preferences removed      |
| TC-033  | Catalogue-only skill            | Pending state displayed         |
| TC-034  | Invalid route                   | Error state displayed           |
| TC-035  | Static production build         | Build succeeds                  |
| TC-036  | GitHub Pages base path          | Assets load correctly           |
| TC-037  | Upstream sync                   | Review PR generated             |
| TC-038  | Legal source provenance         | Correct pinned source displayed |
| TC-039  | Accessibility scan              | No unresolved critical findings |
| TC-040  | Deployment smoke test           | Core application journeys work  |

# 28. CI/CD and deployment

## 28.1 Deployment architecture

\#chatgpt-mermaid-\_r_1hnn\_{font-family:-apple-system,"system-ui","Segoe UI",sans-serif;font-size:14px;fill:rgb(26, 28, 31);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_1hnn\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_1hnn\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_1hnn\_ .error-icon{fill:rgba(255, 255, 255, 0.96);}#chatgpt-mermaid-\_r_1hnn\_ .error-text{fill:rgb(26, 28, 31);stroke:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hnn\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_1hnn\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_1hnn\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_1hnn\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_1hnn\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_1hnn\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_1hnn\_ .marker{fill:rgba(26, 28, 31, 0.494);stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hnn\_ .marker.cross{stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hnn\_ svg{font-family:-apple-system,"system-ui","Segoe UI",sans-serif;font-size:14px;}#chatgpt-mermaid-\_r_1hnn\_ p{margin:0;}#chatgpt-mermaid-\_r_1hnn\_ .label{font-family:-apple-system,"system-ui","Segoe UI",sans-serif;color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hnn\_ .cluster-label text{fill:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hnn\_ .cluster-label span{color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hnn\_ .cluster-label span p{background-color:transparent;}#chatgpt-mermaid-\_r_1hnn\_ .label text,#chatgpt-mermaid-\_r_1hnn\_ span{fill:rgb(26, 28, 31);color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hnn\_ .node rect,#chatgpt-mermaid-\_r_1hnn\_ .node circle,#chatgpt-mermaid-\_r_1hnn\_ .node ellipse,#chatgpt-mermaid-\_r_1hnn\_ .node polygon,#chatgpt-mermaid-\_r_1hnn\_ .node path{fill:rgb(224, 237, 254);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_1hnn\_ .rough-node .label text,#chatgpt-mermaid-\_r_1hnn\_ .node .label text,#chatgpt-mermaid-\_r_1hnn\_ .image-shape .label,#chatgpt-mermaid-\_r_1hnn\_ .icon-shape .label{text-anchor:middle;}#chatgpt-mermaid-\_r_1hnn\_ .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#chatgpt-mermaid-\_r_1hnn\_ .rough-node .label,#chatgpt-mermaid-\_r_1hnn\_ .node .label,#chatgpt-mermaid-\_r_1hnn\_ .image-shape .label,#chatgpt-mermaid-\_r_1hnn\_ .icon-shape .label{text-align:center;}#chatgpt-mermaid-\_r_1hnn\_ .node.clickable{cursor:pointer;}#chatgpt-mermaid-\_r_1hnn\_ .root .anchor path{fill:rgba(26, 28, 31, 0.494)!important;stroke-width:0;stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hnn\_ .arrowheadPath{fill:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hnn\_ .edgePath .path{stroke:rgba(26, 28, 31, 0.494);stroke-width:1px;}#chatgpt-mermaid-\_r_1hnn\_ .flowchart-link{stroke:rgba(26, 28, 31, 0.494);fill:none;}#chatgpt-mermaid-\_r_1hnn\_ .edgeLabel{background-color:rgb(255, 255, 255);text-align:center;}#chatgpt-mermaid-\_r_1hnn\_ .edgeLabel p{background-color:rgb(255, 255, 255);}#chatgpt-mermaid-\_r_1hnn\_ .edgeLabel rect{opacity:0.5;background-color:rgb(255, 255, 255);fill:rgb(255, 255, 255);}#chatgpt-mermaid-\_r_1hnn\_ .labelBkg{background-color:rgba(255, 255, 255, 0.5);}#chatgpt-mermaid-\_r_1hnn\_ .cluster rect{fill:rgba(255, 255, 255, 0.96);stroke:rgba(26, 28, 31, 0.08);stroke-width:1px;}#chatgpt-mermaid-\_r_1hnn\_ .cluster text{fill:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hnn\_ .cluster span{color:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hnn\_ div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:-apple-system,"system-ui","Segoe UI",sans-serif;font-size:12px;background:rgba(255, 255, 255, 0.96);border:1px solid rgba(26, 28, 31, 0.08);border-radius:2px;pointer-events:none;z-index:100;}#chatgpt-mermaid-\_r_1hnn\_ .flowchartTitleText{text-anchor:middle;font-size:18px;fill:rgb(26, 28, 31);}#chatgpt-mermaid-\_r_1hnn\_ rect.text{fill:none;stroke-width:0;}#chatgpt-mermaid-\_r_1hnn\_ .icon-shape,#chatgpt-mermaid-\_r_1hnn\_ .image-shape{background-color:rgb(255, 255, 255);text-align:center;}#chatgpt-mermaid-\_r_1hnn\_ .icon-shape p,#chatgpt-mermaid-\_r_1hnn\_ .image-shape p{background-color:rgb(255, 255, 255);padding:2px;}#chatgpt-mermaid-\_r_1hnn\_ .icon-shape .label rect,#chatgpt-mermaid-\_r_1hnn\_ .image-shape .label rect{opacity:0.5;background-color:rgb(255, 255, 255);fill:rgb(255, 255, 255);}#chatgpt-mermaid-\_r_1hnn\_ .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#chatgpt-mermaid-\_r_1hnn\_ .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#chatgpt-mermaid-\_r_1hnn\_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_1hnn\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_1hnn\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_1hnn\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_1hnn\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hnn\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_1hnn\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_1hnn\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_1hnn\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hnn\_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-\_r_1hnn\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_1hnn\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hnn\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_1hnn\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_1hnn\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hnn\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_1hnn\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_1hnn\_ .node text{font-size:14px;font-weight:600;letter-spacing:normal;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_1hnn\_ .edgeLabels text{font-size:13px;font-weight:600;letter-spacing:-0.08px;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_1hnn\_ .node tspan[font-weight="normal"],#chatgpt-mermaid-\_r_1hnn\_ .edgeLabels tspan[font-weight="normal"]{font-weight:600;}#chatgpt-mermaid-\_r_1hnn\_ .edgeLabel .label rect{opacity:1;rx:13px;ry:13px;fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-width:1px;}#chatgpt-mermaid-\_r_1hnn\_ .node rect,#chatgpt-mermaid-\_r_1hnn\_ .node circle,#chatgpt-mermaid-\_r_1hnn\_ .node ellipse,#chatgpt-mermaid-\_r_1hnn\_ .node polygon,#chatgpt-mermaid-\_r_1hnn\_ .node path{fill:rgb(229, 243, 255);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_1hnn\_ .node rect{rx:16px;ry:16px;}#chatgpt-mermaid-\_r_1hnn\_ .mermaid-decision .label-container{fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-dasharray:2,2;}#chatgpt-mermaid-\_r_1hnn\_ .edgePaths .flowchart-link{stroke:rgba(26, 28, 31, 0.494);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;}#chatgpt-mermaid-\_r_1hnn\_ .marker{fill:rgba(26, 28, 31, 0.494);stroke:rgba(26, 28, 31, 0.494);}#chatgpt-mermaid-\_r_1hnn\_ :root{--mermaid-font-family:-apple-system,"system-ui","Segoe UI",sans-serif;}Developer commitPull requestPython lint and testsFetch pinned upstreamGenerate and validatecatalogueUpload generated contentartifactFrontend build jobDownload generated contentTypeScript and frontendtestsVite production buildPlaywright and accessibilitychecksQuality gates passed?Block releaseApproved merge to mainGitHub Pages deploymentProduction smoke testNoYes

## 28.2 Required workflows

| Workflow          | Trigger                          | Responsibility         |
| ----------------- | -------------------------------- | ---------------------- |
| quality-check.yml | Pull request and relevant pushes | Validation and testing |
| deploy.yml        | Main branch and manual dispatch  | Build and deploy       |
| upstream-sync.yml | Scheduled and manual dispatch    | Detect source changes  |

## 28.3 GitHub Pages configuration

```
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/claude-legal-skills/",
});
```

The frontend must use the configured base URL when loading generated static data.

```
const catalogueUrl =
  `${import.meta.env.BASE_URL}data/skills.json`;
```

## 28.4 Deployment requirements

The CI pipeline must explicitly transfer generated content between separate Python and Node jobs.

The deployment must use least-privilege permissions, deployment concurrency controls, locked dependencies and reviewed action versions.

Do not claim successful deployment until the production URL has been checked.

# 29. Upstream synchronisation

## 29.1 Objective

Keep the application aligned with changes in the official Claude for Legal repository without automatically publishing unreviewed legal content.

## 29.2 Synchronisation process

```
SCHEDULED UPSTREAM CHECK
│
├── Fetch latest upstream commit
├── Compare with pinned commit
│
├── Detect changes
│   ├── Added plugins
│   ├── Removed plugins
│   ├── Added skills
│   ├── Removed skills
│   ├── Renamed skills
│   ├── Modified commands
│   ├── Connector changes
│   └── Licence changes
│
├── Identify affected overlays
├── Generate change report
├── Mark content for revalidation
├── Open or update review PR
├── Technical review
├── Legal review where required
└── Approved publication
```

## 29.3 Synchronisation rules

| ID       | Rule                                           |
| -------- | ---------------------------------------------- |
| SYNC-001 | Production must use a pinned upstream commit   |
| SYNC-002 | Upstream HEAD must not deploy automatically    |
| SYNC-003 | Removed skill mappings must be reported        |
| SYNC-004 | Renamed skills require mapping review          |
| SYNC-005 | Changed legal content requires revalidation    |
| SYNC-006 | Authored overlays must not be silently deleted |
| SYNC-007 | Licence changes require review                 |
| SYNC-008 | Sync workflow must not deploy directly         |

Recommended upstream monitoring cadence: daily.

# 30. AI-assisted SDLC implementation roadmap

## 30.1 Implementation phases

## Indicative delivery roadmap

Estimated engineering days for planning. Professional legal review time may extend the schedule.

P0. Source discovery

2 days

P1. Product and architecture

2 days

P2. Content engineering

4 days

P3. Core frontend

5 days

P4. Educational content

6 days

P5. India legal layer

5 days

P6. Workflow studio

4 days

P7. Testing and security

4 days

P8. Deployment

2 days

P9. Final audit

2 days

Day 1

Day 18

Day 36

## 30.2 Phase deliverables

| Phase   | Deliverables                                      | Exit criteria                        |
| ------- | ------------------------------------------------- | ------------------------------------ |
| Phase 0 | Source inventory, licence analysis, skill mapping | Verified pinned source               |
| Phase 1 | PRD, architecture, schema, UX specification       | Requirements baseline                |
| Phase 2 | Python CLI, validators, JSON catalogue            | Pipeline tests pass                  |
| Phase 3 | Navigation, search, prompt builder, previews      | Core user journeys work              |
| Phase 4 | Minimum 15 educational overlays and case studies  | Content validation passes            |
| Phase 5 | India overlays and legislation registry           | Source and review status recorded    |
| Phase 6 | Five guided workflows                             | End-to-end workflow navigation works |
| Phase 7 | Functional, security and accessibility tests      | Critical defects resolved            |
| Phase 8 | GitHub Actions and Pages deployment               | Production smoke tests pass          |
| Phase 9 | Traceability, release notes and final audit       | Release gates satisfied              |

## 30.3 Development methodology

Every phase follows:

```
Requirements
    ↓
Design
    ↓
AI-assisted implementation
    ↓
Developer review
    ↓
Automated testing
    ↓
Security and content validation
    ↓
Defect correction
    ↓
Documentation
    ↓
Acceptance review
```

# 31. Requirements traceability matrix

The following is an initial traceability baseline. The full matrix must be maintained in the repository.

| Requirement | Implementation component     | Test   | Priority |
| ----------- | ---------------------------- | ------ | -------- |
| FR-001      | AppShell                     | TC-011 | Critical |
| FR-002      | CategorySidebar              | TC-012 | Critical |
| FR-006      | Hash navigation              | TC-023 | Critical |
| FR-011      | Python upstream parser       | TC-001 | Critical |
| FR-018      | SourceAttribution            | TC-038 | Critical |
| FR-020      | PendingContentState          | TC-033 | Critical |
| FR-021      | DynamicVariableForm          | TC-014 | Critical |
| FR-022      | Prompt validator             | TC-016 | Critical |
| FR-025      | CopyButton                   | TC-015 | Critical |
| FR-033      | ResponsePreviewPane          | TC-020 | Critical |
| FR-042      | IndiaOverlayPanel            | TC-017 | High     |
| FR-050      | GlobalSearch                 | TC-018 | Critical |
| FR-057      | WorkflowStepper              | TC-022 | High     |
| FR-062      | Workspace settings           | TC-032 | Critical |
| FR-064      | Pydantic models              | TC-003 | Critical |
| FR-067      | Duplicate validator          | TC-004 | Critical |
| FR-068      | Mapping validator            | TC-005 | Critical |
| FR-071      | Upstream checker             | TC-010 | High     |
| FR-072      | Sync workflow                | TC-037 | High     |
| SEC-004     | Safe Markdown renderer       | TC-029 | Critical |
| SEC-011     | Zustand memory store         | TC-030 | Critical |
| SEC-002     | Network isolation            | TC-031 | Critical |
| NFR-008     | Responsive layout            | TC-027 | High     |
| NFR-015     | Vite and Pages configuration | TC-036 | Critical |

All implementation and testing statuses are initially Not started until supported by actual repository evidence.

# 32. Success metrics

## 32.1 Release targets

# 100%

Pinned upstream catalogue coverage

# 15+

Complete educational walkthroughs

# 18

India practice categories

# 15+

Fictional case studies

# 5+

Complete guided workflows

# 100%

Official source provenance

# 95+

Lighthouse target

# 0

Unresolved critical defects

# 0

Persistent sensitive matter records

## 32.2 Product quality indicators

| KPI                    | Measurement                                              |
| ---------------------- | -------------------------------------------------------- |
| Catalogue completeness | Imported records divided by verified pinned inventory    |
| Educational coverage   | Complete overlays divided by targeted overlays           |
| Source traceability    | Records with valid provenance                            |
| Legal review coverage  | Actually reviewed overlays divided by published overlays |
| Prompt quality         | Templates passing schema and quality validation          |
| Workflow completeness  | Fully configured and tested workflows                    |
| Search performance     | Measured client-side response time                       |
| Accessibility          | Automated and manual assessment                          |
| Release reliability    | Successful validated deployments                         |
| Content freshness      | Time between detected change and reviewed update         |

Do not introduce invasive user tracking to measure adoption. Usage metrics may be considered later through a separate privacy assessment.

# 33. Risks and mitigation

| Risk ID | Risk                                  | Severity | Mitigation                                    |
| ------- | ------------------------------------- | -------- | --------------------------------------------- |
| R-001   | Upstream skill changes                | High     | Pinned source and scheduled sync              |
| R-002   | Unsupported commands                  | Critical | Verify actual skill definitions               |
| R-003   | Incorrect Indian legal interpretation | Critical | Qualified review and official sources         |
| R-004   | AI hallucinations                     | Critical | Verification instructions                     |
| R-005   | Confidential data disclosure          | Critical | Anonymisation guidance and memory-only inputs |
| R-006   | Synthetic outputs mistaken for real   | High     | Persistent illustrative labels                |
| R-007   | Licence violation                     | High     | Licence and attribution review                |
| R-008   | Implied Anthropic affiliation         | High     | Unofficial branding                           |
| R-009   | Content authoring workload            | High     | Automated catalogue with progressive overlays |
| R-010   | Static SPA SEO limitations            | Medium   | Static landing page and future prerendering   |
| R-011   | Dependency vulnerabilities            | High     | Dependency scanning                           |
| R-012   | Broken GitHub Pages asset paths       | High     | Base path and deployment tests                |
| R-013   | Incorrect professional review status  | Critical | Actual review records only                    |
| R-014   | Scope expansion into live AI          | High     | Enforce MVP architecture                      |
| R-015   | Outdated legislation                  | Critical | Versioned legislation registry                |
| R-016   | Incorrect transitional law            | Critical | Date-specific applicability checks            |
| R-017   | Professional advertising restrictions | High     | Separate regulatory review                    |
| R-018   | Malicious upstream content            | High     | Safe parsing and untrusted-data handling      |

# 34. Release acceptance criteria

The following checklist defines the MVP release gate.

## MVP release readiness

## 0%

0 of 31 acceptance checks completed

Source and content

Complete pinned upstream catalogue imported

Official commands and execution surfaces verified

External plugins distinguished

Source provenance recorded

Minimum 15 complete educational overlays

India layer and legislation registry implemented

Minimum 15 fictional case studies

Five complete guided workflows

Functional experience

Hierarchical navigation and search work

Persona and jurisdiction filters work

Dynamic prompt builder works

Separate official and standalone copy actions work

Synthetic response labels displayed

Deep links and browser navigation work

Mobile and tablet layouts work

Security and legal governance

No matter-specific persistent storage

No matter data transmitted by application

Safe Markdown rendering validated

Legal verification checklists displayed

Actual professional review status recorded

Licence and attribution complete

No unresolved critical security findings

Engineering and deployment

Python tests pass

TypeScript checks pass

Frontend tests pass

Critical Playwright tests pass

Accessibility assessment completed

Production build succeeds

GitHub Pages deployment verified

Upstream sync opens review PR

Documentation and traceability completed

&#x20;Copy checklist

Reset

Manual planning checklist. Selecting an item does not constitute automated test evidence.

# 35. Future product roadmap

## 35.1 Product evolution

| Release | Product direction             | Capabilities                                               |
| ------- | ----------------------------- | ---------------------------------------------------------- |
| V1.0    | Legal Skills Workbench        | Catalogue, prompts, India layer, cases and workflows       |
| V1.1    | Expanded Legal Practice       | More overlays, workflows and jurisdiction-specific content |
| V1.2    | Legal AI Academy              | Structured courses, exercises and assessments              |
| V1.3    | Legal Research Education      | Advanced judgment analysis and research workflows          |
| V2.0    | Multi-provider Legal AI       | Claude, ChatGPT, Gemini and other AI environments          |
| V2.1    | Secure Professional Workspace | Optional authentication and secure matter handling         |
| V3.0    | Enterprise Legal Intelligence | Organisation playbooks, governance and audit controls      |

## 35.2 Future integrations

Future integrations require separate architecture, security, legal and privacy assessments.

Potential integrations include legal research services, document management systems, official legal information sources, enterprise AI providers, retrieval-augmented generation systems and AI evaluation frameworks.

They must not be introduced into the static MVP merely to anticipate future requirements.

# 36. Definition of done

A feature is complete only when:

- Its business requirement is documented.
- Its functional behaviour is implemented.
- Relevant content passes schema validation.
- Error and empty states are handled.
- Mobile and desktop behaviour is verified.
- Accessibility requirements are addressed.
- Security and privacy requirements are satisfied.
- Applicable legal review status is recorded.
- Automated tests have been executed.
- Documentation is updated.
- Traceability evidence is available.
- No unresolved critical defects remain.

A successful frontend build alone does not constitute product completion.

# Appendix A: Required project documentation

| Document                       | Repository path                     | Purpose                                |
| ------------------------------ | ----------------------------------- | -------------------------------------- |
| Product Requirements Document  | `docs/PRD.md`                       | Product scope and requirements         |
| Business Requirements Document | `docs/BRD.md`                       | Business objectives                    |
| Source Analysis                | `docs/SOURCE_ANALYSIS.md`           | Upstream repository analysis           |
| Upstream Inventory             | `docs/UPSTREAM_INVENTORY.md`        | Verified source catalogue              |
| Skill Mapping                  | `docs/SKILL_MAPPING.md`             | Official and educational relationships |
| High-Level Design              | `docs/ARCHITECTURE.md`              | System architecture                    |
| Architecture Decisions         | `docs/ARCHITECTURE_DECISIONS.md`    | Technical decisions                    |
| Content Model                  | `docs/CONTENT_MODEL.md`             | Schema and entities                    |
| Content Governance             | `docs/CONTENT_GOVERNANCE.md`        | Review and publication process         |
| UI/UX Specification            | `docs/UI_UX.md`                     | Layout and design system               |
| Security Specification         | `docs/SECURITY.md`                  | Privacy and security controls          |
| Test Strategy                  | `docs/TEST_STRATEGY.md`             | Testing requirements                   |
| Requirements Traceability      | `docs/REQUIREMENTS_TRACEABILITY.md` | Requirement-to-test mapping            |
| Implementation Status          | `docs/IMPLEMENTATION_STATUS.md`     | Actual delivery progress               |
| Deployment Guide               | `docs/DEPLOYMENT.md`                | GitHub Pages configuration             |
| Product Roadmap                | `docs/ROADMAP.md`                   | Release planning                       |
| Release Notes                  | `CHANGELOG.md`                      | Version history                        |
| Developer Guide                | `README.md`                         | Setup and contribution                 |

# Appendix B: Initial product backlog

| Epic ID | Epic                          | Priority |
| ------- | ----------------------------- | -------- |
| EP-001  | Upstream repository discovery | Critical |
| EP-002  | Python content compiler       | Critical |
| EP-003  | Canonical content schema      | Critical |
| EP-004  | React application foundation  | Critical |
| EP-005  | Official skill catalogue      | Critical |
| EP-006  | Interactive prompt builder    | Critical |
| EP-007  | Response blueprint engine     | Critical |
| EP-008  | Indian legal practice         | High     |
| EP-009  | Legal case study library      | High     |
| EP-010  | Workflow studio               | High     |
| EP-011  | Global search and filters     | Critical |
| EP-012  | Legal AI learning centre      | High     |
| EP-013  | Personal workspace            | Medium   |
| EP-014  | Security and privacy          | Critical |
| EP-015  | Automated testing             | Critical |
| EP-016  | GitHub Pages deployment       | Critical |
| EP-017  | Upstream synchronisation      | High     |
| EP-018  | Content governance            | Critical |
| EP-019  | Documentation                 | High     |
| EP-020  | Final product audit           | Critical |

# Appendix C: Architecture decision records

| ADR     | Decision                                 | Rationale                                                 |
| ------- | ---------------------------------------- | --------------------------------------------------------- |
| ADR-001 | React instead of Angular or Astro        | Consistent interactive workbench architecture             |
| ADR-002 | Python at build time only                | Strong content validation without backend hosting         |
| ADR-003 | Markdown as authored content             | Maintainable legal documentation                          |
| ADR-004 | Generated JSON as canonical runtime data | Simple static rendering                                   |
| ADR-005 | Zustand state management                 | Lightweight client-side state                             |
| ADR-006 | Native hash navigation                   | GitHub Pages compatibility without SPA rewrites           |
| ADR-007 | Independent India overlays               | Preserve official source integrity                        |
| ADR-008 | Synthetic response examples              | Avoid runtime AI costs and false output claims            |
| ADR-009 | Pinned upstream source                   | Reproducible builds                                       |
| ADR-010 | Reviewed synchronisation PRs             | Prevent uncontrolled legal content changes                |
| ADR-011 | Memory-only matter inputs                | Confidentiality and privacy                               |
| ADR-012 | Progressive educational coverage         | Avoid manually duplicating the entire upstream repository |

# Appendix D: Source specification reconciliation

This PRD consolidates the submitted static skill library, React workbench and Python content engineering proposals.

The source library specification contributes automated upstream extraction, pending-content states, schema validation and reviewed updates.&#x20;

Pasted text(20261124-090019).txt



The interactive workbench specification contributes the three-panel interface, editable matter variables, confidentiality checks and structured response previews.&#x20;

Pasted text (3).txt



The controlling architecture is React, TypeScript, Vite and Python build-time validation. Earlier alternatives involving vanilla JavaScript, Angular, Astro or manually duplicated TypeScript datasets are superseded.

# Appendix E: Product approval baseline

| Review area             | Responsible role         | Status  |
| ----------------------- | ------------------------ | ------- |
| Product requirements    | Product owner            | Pending |
| Technical architecture  | Solution architect       | Pending |
| Upstream source mapping | Content engineer         | Pending |
| Indian legal content    | Legal subject expert     | Pending |
| Professional ethics     | Qualified legal reviewer | Pending |
| Security architecture   | Security engineer        | Pending |
| User experience         | UI/UX specialist         | Pending |
| Test strategy           | QA lead                  | Pending |
| Deployment readiness    | DevOps engineer          | Pending |

## Final product summary

| Dimension              | Final specification                                                |
| ---------------------- | ------------------------------------------------------------------ |
| Product                | Claude Legal Skills Workbench                                      |
| Core purpose           | Practical education in AI-assisted legal workflows                 |
| Primary users          | Advocates, corporate lawyers, law students and legal professionals |
| Primary differentiator | Independent Indian legal practice layer                            |
| User experience        | Three-panel interactive legal workbench                            |
| Content strategy       | Complete upstream catalogue with progressive educational overlays  |
| Frontend               | React, TypeScript, Vite, Tailwind, Zustand                         |
| Content engineering    | Python, Pydantic, Markdown and JSON                                |
| Runtime backend        | None                                                               |
| Database               | None                                                               |
| Runtime AI integration | None                                                               |
| Hosting                | GitHub Pages                                                       |
| Development            | Antigravity IDE using AI-assisted SDLC                             |
| Legal governance       | Source verification, confidentiality and human review              |
| MVP scope              | 15+ walkthroughs, 15+ cases and five complete workflows            |

End of Product Requirements Document

Save this document as `docs/PRD.md` in the project repository. It should serve as the controlling product requirements baseline for Antigravity IDE, with the previously prepared master build prompt serving as the implementation instruction.
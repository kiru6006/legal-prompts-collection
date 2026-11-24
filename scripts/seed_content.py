"""
Generates the core educational overlays, Indian legal overlays, workflows, and case studies.
"""

import json
from pathlib import Path

OVERLAYS_DIR = Path("content/overlays")
INDIA_DIR = Path("content/india")
WORKFLOWS_DIR = Path("content/workflows")
CASE_STUDIES_DIR = Path("content/case-studies")

for d in [OVERLAYS_DIR, INDIA_DIR, WORKFLOWS_DIR, CASE_STUDIES_DIR]:
    d.mkdir(parents=True, exist_ok=True)

# 18 Core Educational Overlays
overlays_data = [
    {
        "skill_id": "commercial-legal:nda-review",
        "display_name": "NDA Triage and Risk Classifier",
        "educational_status": "ready",
        "legal_review_status": "review-pending",
        "educational_overlay": {
            "purpose": "Rapidly triage inbound NDAs into GREEN / YELLOW / RED risk categories before routing to legal counsel.",
            "when_to_use": "When receiving non-disclosure agreements from vendors, partners, or counterparties during exploratory discussions.",
            "when_not_to_use": "When the agreement contains restrictive post-employment covenants or complex IP assignments.",
            "target_personas": ["in-house-counsel", "commercial-lawyer", "legal-operations"],
            "difficulty": "beginner",
            "estimated_minutes": 10,
            "variables": [
                {"key": "CLIENT_ROLE", "label": "Our Party Role", "type": "select", "options": ["Disclosing Party", "Receiving Party", "Mutual"], "default": "Receiving Party"},
                {"key": "GOVERNING_LAW", "label": "Governing Law & Jurisdiction", "type": "text", "default": "Laws of India, courts at New Delhi"},
                {"key": "TERM_YEARS", "label": "Confidentiality Duration (Years)", "type": "number", "default": 3},
                {"key": "NON_COMPETE_FLAG", "label": "Include Non-Compete / Non-Solicit Triage", "type": "boolean", "default": True}
            ],
            "prompt_template": "Act as commercial legal counsel for {{CLIENT_ROLE}}.\nReview the supplied NDA under {{GOVERNING_LAW}} with confidentiality term of {{TERM_YEARS}} years.\nTriage risk into GREEN (standard terms), YELLOW (negotiable deviations), or RED (onerous terms).\nCheck non-compete/non-solicit restrictions: {{NON_COMPETE_FLAG}}.\nFlag any perpetual non-disclosure obligations, asymmetric indemnity, or residuals clauses.\nMark unverified facts with [VERIFY]. Professional attorney review required before signature.",
            "fictional_scenario": "Apex Software Pvt Ltd receives a unilateral NDA from CloudMatrix Inc. demanding a 5-year confidentiality period, indemnification for breach, and a clause restricting Apex from working with any competitors for 18 months.",
            "sample_output": "### NDA Triage Summary: RED (High Risk)\n- **Issue 1: Non-Compete Restriction (Clause 9)**: Unilateral restriction on dealing with competitors violates Section 27 of Indian Contract Act 1872.\n- **Issue 2: Asymmetric Indemnity (Clause 11)**: Unlimited indemnification for ordinary confidentiality breaches.\n- **Recommended Action**: Strike Clause 9 entirely. Align confidentiality term from 5 years to standard 2-3 years.",
            "output_type": "triage-memo",
            "guardrails": ["Never sign an NDA with post-termination non-compete clauses without partner sign-off.", "Verify definition of Confidential Information covers only properly marked materials."],
            "verification_checklist": ["Confirm party corporate entities match official registry.", "Verify jurisdiction matches commercial preference.", "Verify absence of IP transfer language."],
            "ai_risk_warning": "AI cannot confirm whether the counterparty's business model presents direct conflict of interest."
        }
    },
    {
        "skill_id": "commercial-legal:vendor-agreement-review",
        "display_name": "Vendor MSA & Services Agreement Review",
        "educational_status": "ready",
        "legal_review_status": "review-pending",
        "educational_overlay": {
            "purpose": "Comprehensive structural audit of Master Services Agreements (MSAs) and vendor contracts against company playbooks.",
            "when_to_use": "When reviewing inbound supplier contracts for enterprise IT, marketing, or logistics engagements.",
            "when_not_to_use": "For consumer standard terms of service or pure employment contracts.",
            "target_personas": ["in-house-counsel", "corporate-lawyer"],
            "difficulty": "intermediate",
            "estimated_minutes": 20,
            "variables": [
                {"key": "PARTY_SIDE", "label": "Our Position", "type": "select", "options": ["Customer / Buyer", "Vendor / Supplier"], "default": "Customer / Buyer"},
                {"key": "LIABILITY_CAP", "label": "Liability Cap Multiplier", "type": "text", "default": "12 months fees paid"},
                {"key": "DATA_SECURITY_STANDARD", "label": "Security Standard", "type": "text", "default": "ISO 27001 / SOC 2 Type II"}
            ],
            "prompt_template": "Act as commercial counsel reviewing an MSA on behalf of {{PARTY_SIDE}}.\nAssess liability cap benchmarked at {{LIABILITY_CAP}} and evaluate data security provisions against {{DATA_SECURITY_STANDARD}}.\nIdentify uncapped liabilities, termination rights, payment terms, and warranty disclaimers.\nProvide clause-by-clause fallback suggestions for contested provisions.\nMark unverified assumptions with [VERIFY].",
            "fictional_scenario": "FinTech Corp is onboarding Enterprise Cloud Services for payment gateway hosting with an annual contract value of Rs. 40,00,000.",
            "sample_output": "### Vendor Agreement Review Matrix\n- **Liability (Section 8)**: Vendor caps total liability to fees paid in last 1 month. [FALLBACK: 12 months fees paid or Rs. 50 Lakhs].\n- **Warranty (Section 6)**: Vendor disclaims all implied warranties of merchantability and fitness.",
            "output_type": "contract-matrix",
            "guardrails": ["Confirm liability cap carve-outs include confidentiality breach and data privacy violations."],
            "verification_checklist": ["Check limitation period under Limitation Act 1963.", "Verify SLA credit mechanisms are realistic."],
            "ai_risk_warning": "Verify pricing tiers and tax calculations with internal finance."
        }
    },
    {
        "skill_id": "commercial-legal:saas-msa-review",
        "display_name": "SaaS Subscription Agreement Reviewer",
        "educational_status": "ready",
        "legal_review_status": "review-pending",
        "educational_overlay": {
            "purpose": "Examines multi-tenant cloud software subscription terms, uptime commitments, and data ownership.",
            "when_to_use": "When purchasing cloud software, B2B SaaS platforms, or API access.",
            "when_not_to_use": "When purchasing custom software development where source code copyright must be transferred.",
            "target_personas": ["in-house-counsel", "legal-operations"],
            "difficulty": "intermediate",
            "estimated_minutes": 15,
            "variables": [
                {"key": "UPTIME_SLA", "label": "Target Uptime SLA", "type": "text", "default": "99.9%"},
                {"key": "DATA_LOCATION", "label": "Data Residency Requirement", "type": "text", "default": "Within India"}
            ],
            "prompt_template": "Review SaaS agreement requiring {{UPTIME_SLA}} uptime commitment and data hosting located {{DATA_LOCATION}}.\nAnalyze customer data ownership, IP rights in customer derivative works, and auto-renewal cancellation notice windows.\nOutput structured risk table with redline recommendations.",
            "fictional_scenario": "Bharat Retail adopts a cloud CRM platform storing 1,000,000 Indian consumer customer profiles.",
            "sample_output": "### SaaS Review Findings\n- **Data Ownership**: Agreement grants vendor license to use customer data for model training. [ACTION: Strike model training grant].\n- **Auto-Renewal**: 60-day advance notice required. [ACTION: Reduce to 30 days].",
            "output_type": "redline-guide",
            "guardrails": ["Ensure customer retains 100% unconditional ownership of raw and processed customer data."],
            "verification_checklist": ["Check data export format and transition assistance on termination."],
            "ai_risk_warning": "Verify vendor cloud sub-processors against internal security guidelines."
        }
    },
    {
        "skill_id": "privacy-legal:dpa-review",
        "display_name": "Data Processing Addendum (DPA) Auditor",
        "educational_status": "ready",
        "legal_review_status": "review-pending",
        "educational_overlay": {
            "purpose": "Audits DPAs for statutory alignment with data protection obligations, processor audits, and breach notification periods.",
            "when_to_use": "When executing data vendor agreements involving personal or sensitive personal data.",
            "when_not_to_use": "For purely anonymized or telemetry data transfers containing zero personal identifiers.",
            "target_personas": ["privacy-professional", "compliance-officer", "in-house-counsel"],
            "difficulty": "advanced",
            "estimated_minutes": 25,
            "variables": [
                {"key": "NOTIF_TIMEFRAME", "label": "Security Incident Notification Window", "type": "text", "default": "Within 24 hours"},
                {"key": "DATA_PRINCIPAL_RIGHTS", "label": "Support for Data Principal Access/Deletion", "type": "boolean", "default": True}
            ],
            "prompt_template": "Review DPA ensuring data breach notification is required {{NOTIF_TIMEFRAME}}.\nConfirm processor duties under applicable data protection laws, cross-border transfer restrictions, and audit rights.\nEnsure Data Principal rights support: {{DATA_PRINCIPAL_RIGHTS}}.\nFlag unilateral modification clauses.",
            "fictional_scenario": "HealthTech Pvt Ltd appoints an AI diagnostic imaging vendor to process radiological reports containing patient identifiers.",
            "sample_output": "### DPA Audit Matrix\n- **Breach Notice**: Vendor drafts 'without undue delay' (ambiguous). Redline to 'within 24 hours of discovery'.\n- **Sub-processors**: Vendor reserves right to add sub-processors without prior notification. Strike and require 30-day prior written notice.",
            "output_type": "audit-report",
            "guardrails": ["Confirm processor cannot repurpose health or biometric data."],
            "verification_checklist": ["Verify technical and organizational security measures (TOMs) are appended as Annexure."],
            "ai_risk_warning": "AI cannot audit physical data center access security controls."
        }
    },
    {
        "skill_id": "privacy-legal:dsar-response",
        "display_name": "Data Subject Access Request (DSAR) Drafter",
        "educational_status": "ready",
        "legal_review_status": "review-pending",
        "educational_overlay": {
            "purpose": "Formulates structured, compliant response communications to individuals exercising data access, correction, or erasure rights.",
            "when_to_use": "When an individual user, employee, or customer requests access or deletion of their personal records.",
            "when_not_to_use": "When the request is tied to active litigation discovery covered by separate procedural court rules.",
            "target_personas": ["privacy-professional", "compliance-officer"],
            "difficulty": "intermediate",
            "estimated_minutes": 15,
            "variables": [
                {"key": "REQUEST_TYPE", "label": "Request Category", "type": "select", "options": ["Access / Summary", "Correction / Update", "Erasure / Deletion"], "default": "Erasure / Deletion"},
                {"key": "STATUTORY_RETENTION_REASON", "label": "Legal Basis for Retention (if any)", "type": "text", "default": "Tax and financial transaction record keeping (7 years)"}
            ],
            "prompt_template": "Draft response to Data Principal submitting {{REQUEST_TYPE}}.\nAccount for statutory retention obligations under {{STATUTORY_RETENTION_REASON}}.\nClearly detail records deleted, records retained with legal justifications, and appellate grievance mechanisms.\nMark unverified facts with [VERIFY].",
            "fictional_scenario": "A former customer of an e-commerce platform requests total erasure of all records, but completed orders must be retained for GST audits.",
            "sample_output": "### DSAR Response Communication\nDear Customer,\nIn response to your erasure request dated 12 October 2026, marketing profiles and browsing logs have been permanently deleted. Account ledger records must be retained pursuant to Section 36 of CGST Act.",
            "output_type": "formal-communication",
            "guardrails": ["Never disclose third-party personal data in a subject access summary."],
            "verification_checklist": ["Verify identity of requesting individual before releasing data.", "Verify statutory limitation periods for record retention."],
            "ai_risk_warning": "Ensure no confidential commercial communications are embedded in the access export."
        }
    },
    {
        "skill_id": "privacy-legal:use-case-triage",
        "display_name": "Privacy Risk & Use-Case Triage",
        "educational_status": "ready",
        "legal_review_status": "review-pending",
        "educational_overlay": {
            "purpose": "Early-stage assessment of new features or data collection projects for privacy impact, consent mechanisms, and risk tier.",
            "when_to_use": "During sprint planning, product requirement doc (PRD) reviews, or new customer onboarding workflows.",
            "when_not_to_use": "When a full formal Data Protection Impact Assessment (DPIA) has already been mandated by regulators.",
            "target_personas": ["privacy-professional", "in-house-counsel", "product-legal"],
            "difficulty": "intermediate",
            "estimated_minutes": 15,
            "variables": [
                {"key": "FEATURE_NAME", "label": "Feature / Project Name", "type": "text", "default": "Location-Based Merchant Offers"},
                {"key": "DATA_CATEGORIES", "label": "Data Collected", "type": "text", "default": "Precise GPS coordinates, device ID, transaction history"}
            ],
            "prompt_template": "Perform privacy risk triage for feature '{{FEATURE_NAME}}' collecting '{{DATA_CATEGORIES}}'.\nEvaluate purpose limitation, data minimization, consent requirement, and sensitive data thresholds.\nClassify overall privacy risk as LOW, MEDIUM, or HIGH.",
            "fictional_scenario": "A ride-hailing app plans to collect user location data continuously in the background even when the app is closed.",
            "sample_output": "### Privacy Triage: HIGH RISK\n- **Issue**: Continuous background GPS collection without active ride booking violates data minimization.\n- **Remediation**: Restrict GPS polling to foreground during active trips only.",
            "output_type": "risk-scorecard",
            "guardrails": ["Explicit opt-in consent mandatory for precise location tracking."],
            "verification_checklist": ["Confirm privacy policy update requirements.", "Verify SDK permissions in Android/iOS manifests."],
            "ai_risk_warning": "AI cannot inspect actual binary network traffic to third-party ad networks."
        }
    },
    {
        "skill_id": "ai-governance-legal:use-case-triage",
        "display_name": "Enterprise AI Use-Case Risk Classifier",
        "educational_status": "ready",
        "legal_review_status": "review-pending",
        "educational_overlay": {
            "purpose": "Classifies enterprise AI deployments into risk tiers (Prohibited, High Risk, Transparency, Minimal) and maps legal guardrails.",
            "when_to_use": "Before procuring or deploying generative AI models, biometric scanners, or automated decision algorithms.",
            "when_not_to_use": "For traditional rule-based software systems that contain no machine learning models.",
            "target_personas": ["ai-governance-professional", "compliance-officer", "in-house-counsel"],
            "difficulty": "intermediate",
            "estimated_minutes": 15,
            "variables": [
                {"key": "AI_SYSTEM_PURPOSE", "label": "System Purpose", "type": "text", "default": "Automated resume filtering for job applicants"},
                {"key": "HUMAN_OVERSIGHT", "label": "Human-in-the-Loop Safeguards", "type": "select", "options": ["Full Human Decision", "Human Review of Rejections", "Autonomous"], "default": "Human Review of Rejections"}
            ],
            "prompt_template": "Classify AI use case: '{{AI_SYSTEM_PURPOSE}}' with oversight model '{{HUMAN_OVERSIGHT}}'.\nMap against global AI governance frameworks (EU AI Act, NIST AI RMF, NITI Aayog Responsible AI).\nIdentify bias risks, explainability requirements, and audit trail needs.\nMark unverified factors with [VERIFY].",
            "fictional_scenario": "A logistics corporation wants to use an AI computer vision camera to monitor warehouse worker attentiveness and automatically deduct performance bonuses.",
            "sample_output": "### AI Governance Classification: HIGH RISK\n- **Risk Driver**: Workplace surveillance impacting employee compensation without meaningful contestability.\n- **Recommendation**: Discontinue automated penalty deductions. Require human supervisor evaluation.",
            "output_type": "governance-report",
            "guardrails": ["Do not deploy fully autonomous biometric categorization in employment contexts."],
            "verification_checklist": ["Verify training data diversity and bias testing records.", "Confirm notice to affected individuals."],
            "ai_risk_warning": "Models can exhibit algorithmic bias not apparent from documentation alone."
        }
    },
    {
        "skill_id": "ai-governance-legal:aia-generation",
        "display_name": "AI Impact Assessment (AIA) Drafter",
        "educational_status": "ready",
        "legal_review_status": "review-pending",
        "educational_overlay": {
            "purpose": "Drafts structured AI Impact Assessments evaluating societal, fundamental rights, and security implications of LLM systems.",
            "when_to_use": "When launching customer-facing AI agents, automated chatbots, or predictive scoring models.",
            "when_not_to_use": "For standard spell-checkers or static business intelligence dashboards.",
            "target_personas": ["ai-governance-professional", "in-house-counsel"],
            "difficulty": "advanced",
            "estimated_minutes": 30,
            "variables": [
                {"key": "MODEL_TYPE", "label": "AI Architecture", "type": "text", "default": "Frontier LLM with RAG pipeline"},
                {"key": "DATA_INPUT_TYPE", "label": "Input Data Category", "type": "text", "default": "Customer support transcripts and order IDs"}
            ],
            "prompt_template": "Generate an AI Impact Assessment for '{{MODEL_TYPE}}' processing '{{DATA_INPUT_TYPE}}'.\nAnalyze prompt injection vulnerabilities, hallucination probabilities, data leakage risks, and fallback mechanisms.\nPropose PEAS framework specifications and incident reporting thresholds.",
            "fictional_scenario": "An insurance company builds an LLM agent that reads claim receipts and estimates reimbursement eligibility for medical procedures.",
            "sample_output": "### AI Impact Assessment (Executive Summary)\n- **Hallucination Risk**: Model may misinterpret medical billing codes resulting in erroneous claim rejections.\n- **Mitigation**: Require deterministic claim adjudication engine for financial calculations; LLM restricted to text extraction.",
            "output_type": "comprehensive-aia",
            "guardrails": ["Financial and medical determinations must never rely solely on probabilistic model text."],
            "verification_checklist": ["Conduct red-teaming for prompt injection attacks.", "Implement automated PII scrubbing prior to LLM inference."],
            "ai_risk_warning": "RAG retrieval accuracy degrades with poorly formatted scanned PDF documents."
        }
    },
    {
        "skill_id": "litigation-legal:demand-intake",
        "display_name": "Legal Notice & Demand Intake Evaluator",
        "educational_status": "ready",
        "legal_review_status": "review-pending",
        "educational_overlay": {
            "purpose": "Triage and evaluate inbound legal notices, letters of demand, and cease-and-desist claims for urgency and exposure.",
            "when_to_use": "When a formal notice from an advocate or regulatory authority is served on the company or client.",
            "when_not_to_use": "For informal customer complaint emails that make no reference to legal action or statutory provisions.",
            "target_personas": ["litigation-lawyer", "independent-advocate", "in-house-counsel"],
            "difficulty": "beginner",
            "estimated_minutes": 15,
            "variables": [
                {"key": "CLAIM_TYPE", "label": "Notice Category", "type": "select", "options": ["Recovery of Money", "Cheque Dishonour", "Defamation", "IP Infringement", "Breach of Contract"], "default": "Recovery of Money"},
                {"key": "REPLY_WINDOW_DAYS", "label": "Stipulated Reply Window (Days)", "type": "number", "default": 15}
            ],
            "prompt_template": "Evaluate inbound demand notice for {{CLAIM_TYPE}} with a {{REPLY_WINDOW_DAYS}}-day response deadline.\nIdentify sender, claimant, quantified damages, cause of action, and alleged breaches.\nCalculate limitation period and recommend whether to issue interim holding response or comprehensive rebuttal.\nMark unverified claims with [VERIFY].",
            "fictional_scenario": "A vendor issues a demand notice alleging unpaid invoices of Rs. 25 Lakhs and threatens winding up / commercial suit within 15 days.",
            "sample_output": "### Demand Intake Assessment\n- **Claim**: Rs. 25,00,000 under Master Services Agreement.\n- **Deadline**: 15 days from service (28 Nov 2026).\n- **Exposure**: High risk of commercial court suit. Reconciliation reveals Rs. 10 Lakhs already settled.",
            "output_type": "intake-memo",
            "guardrails": ["Confirm actual proof of service (speed post tracking / email delivery receipt)."],
            "verification_checklist": ["Check limitation period from invoice due date under Limitation Act 1963.", "Issue litigation hold on relevant email accounts."],
            "ai_risk_warning": "Statutory limitation rules contain specific exclusion dates that require manual court calendar verification."
        }
    },
    {
        "skill_id": "litigation-legal:demand-draft",
        "display_name": "Legal Notice of Demand Drafter",
        "educational_status": "ready",
        "legal_review_status": "review-pending",
        "educational_overlay": {
            "purpose": "Drafts structured, legally grounded pre-litigation demand notices detailing claims, breach chronologies, and statutory deadlines.",
            "when_to_use": "When a client wishes to put a defaulting counterparty on notice prior to initiating litigation or arbitration.",
            "when_not_to_use": "Where a pre-suit mediation clause mandates informal consultation prior to issuing formal legal notices.",
            "target_personas": ["independent-advocate", "litigation-lawyer"],
            "difficulty": "intermediate",
            "estimated_minutes": 20,
            "variables": [
                {"key": "CLAIMANT_NAME", "label": "Claimant Client", "type": "text", "default": "Sunrise Logistics Pvt Ltd"},
                {"key": "DEFAULTING_PARTY", "label": "Defaulting Counterparty", "type": "text", "default": "Vanguard Manufacturing Ltd"},
                {"key": "AMOUNT_DUE", "label": "Quantified Claim Amount", "type": "text", "default": "Rs. 18,50,000/- plus 18% p.a. interest"},
                {"key": "CURE_PERIOD_DAYS", "label": "Cure Period (Days)", "type": "number", "default": 15}
            ],
            "prompt_template": "Draft legal notice from {{CLAIMANT_NAME}} to {{DEFAULTING_PARTY}} demanding {{AMOUNT_DUE}} within {{CURE_PERIOD_DAYS}} days.\nState contractual foundation, invoice chronology, failed demands, and accrued statutory interest.\nState consequences of default: institution of commercial suit, attachment of assets, and legal costs.\nDo not fabricate advocate registration details. Include [ADVOCATE VERIFICATION REQUIRED].",
            "fictional_scenario": "Sunrise Logistics transported 40 shipments of raw materials for Vanguard Manufacturing, but invoices from January to March 2026 remain unpaid despite multiple email reminders.",
            "sample_output": "### LEGAL NOTICE (DEMAND)\nUnder Instructions from my Client, Sunrise Logistics Pvt Ltd...\n1. That my Client performed transport services under Agreement dated...\n2. Invoices totaling Rs. 18,50,000/- remain overdue...\n3. You are hereby called upon to pay within 15 days, failing which commercial legal proceedings will ensue.",
            "output_type": "legal-notice",
            "guardrails": ["Ensure demand does not make reckless criminal allegations in pure commercial debt disputes."],
            "verification_checklist": ["Verify postal address and registered ROC office of counterparty.", "Confirm interest rate is contractually backed or permitted under Interest Act 1978."],
            "ai_risk_warning": "Sending a defamatory or unsubstantiated notice exposes the claimant to counter-claims."
        }
    },
    {
        "skill_id": "litigation-legal:chronology",
        "display_name": "Litigation Fact & Document Chronology Extractor",
        "educational_status": "ready",
        "legal_review_status": "review-pending",
        "educational_overlay": {
            "purpose": "Constructs an objective, date-ordered factual timeline from pleadings, contracts, WhatsApp transcripts, and email correspondence.",
            "when_to_use": "When preparing plaints, written statements, bail petitions, or commercial court briefs from voluminous disorganized documents.",
            "when_not_to_use": "When assessing abstract legal principles where chronological sequence of facts is irrelevant.",
            "target_personas": ["litigation-lawyer", "independent-advocate", "law-student"],
            "difficulty": "beginner",
            "estimated_minutes": 15,
            "variables": [
                {"key": "CASE_MATTER", "label": "Case Reference", "type": "text", "default": "Commercial Suit for Recovery of Contractual Dues"},
                {"key": "KEY_DATE_RANGE", "label": "Period of Dispute", "type": "text", "default": "January 2025 - October 2026"}
            ],
            "prompt_template": "Extract chronological fact table for matter '{{CASE_MATTER}}' covering '{{KEY_DATE_RANGE}}'.\nFor each event record: Exact Date, Source Document, Parties Involved, Factual Event, and Disputed vs Admitted Status.\nIdentify gaps where dates are ambiguous or corroborating documentary evidence is missing.\nMark missing exhibits with [MISSING DOCUMENT].",
            "fictional_scenario": "A construction subcontractor has 150 email exchanges, 12 signed change orders, and 4 WhatsApp chat logs documenting delayed site handovers.",
            "sample_output": "### Litigation Chronology Matrix\n| Date | Source Doc | Event Description | Evidentiary Status |\n|---|---|---|---|\n| 15 Jan 2025 | Agreement Ex. P-1 | Work order executed for Rs. 2.5 Cr | Admitted |\n| 10 Mar 2025 | Email Ex. P-2 | Site handover delayed by employer | Disputed |",
            "output_type": "chronology-table",
            "guardrails": ["Never extrapolate assumed dates when documents lack timestamps."],
            "verification_checklist": ["Cross-check electronic timestamps against electronic evidence certificates.", "Confirm chronological sequence aligns with limitation cut-off."],
            "ai_risk_warning": "OCR errors in scanned documents often lead to mistaken digits in years and dates."
        }
    },
    {
        "skill_id": "litigation-legal:subpoena-triage",
        "display_name": "Summons & Subpoena Compliance Assessor",
        "educational_status": "ready",
        "legal_review_status": "review-pending",
        "educational_overlay": {
            "purpose": "Evaluates investigative summons, court orders for document production, and law enforcement notices for scope and compliance.",
            "when_to_use": "When served with notices under Section 91 CrPC / Section 94 BNSS, tax investigation summons, or court witness orders.",
            "when_not_to_use": "For ordinary discovery requests between private parties in civil suits.",
            "target_personas": ["litigation-lawyer", "in-house-counsel"],
            "difficulty": "advanced",
            "estimated_minutes": 20,
            "variables": [
                {"key": "ISSUING_AUTHORITY", "label": "Issuing Agency / Court", "type": "text", "default": "Cyber Crime Police Station / Enforcement Directorate"},
                {"key": "COMPLIANCE_DEADLINE", "label": "Compliance Window", "type": "text", "default": "48 hours from receipt"}
            ],
            "prompt_template": "Assess statutory summons issued by {{ISSUING_AUTHORITY}} with deadline {{COMPLIANCE_DEADLINE}}.\nReview statutory authority of issuing officer, jurisdictional legitimacy, scope of requested data, and self-incrimination issues.\nPropose compliance strategy: comprehensive supply, request for extension, or writ petition challenge.\nMark unverified points with [ATTORNEY REVIEW REQUIRED].",
            "fictional_scenario": "A payment intermediary receives a police notice demanding complete server logs and transaction records for 5,000 unrelated users within 24 hours.",
            "sample_output": "### Summons Compliance Assessment\n- **Authority Check**: Notice issued under Section 91 CrPC.\n- **Scope Issue**: Request is overbroad and impermissible 'fishing inquiry'.\n- **Recommended Action**: Furnish logs for specific accused account; seek protective direction for unrelated customer data.",
            "output_type": "compliance-brief",
            "guardrails": ["Do not destroy or alter subpoenaed electronic logs (attracts criminal destruction of evidence)."],
            "verification_checklist": ["Verify identity and jurisdiction of signing investigating officer.", "Check constitutional safeguards under Article 20(3)."],
            "ai_risk_warning": "Failure to respond to lawful summons can trigger criminal contempt or non-bailable warrants."
        }
    },
    {
        "skill_id": "litigation-legal:claim-chart",
        "display_name": "Litigation Claim & Issue Chart Preparer",
        "educational_status": "ready",
        "legal_review_status": "review-pending",
        "educational_overlay": {
            "purpose": "Maps legal claims, statutory elements, evidentiary burdens, and supporting exhibits into a cohesive courtroom issue chart.",
            "when_to_use": "When framing issues in civil suits, preparing trial witness examinations, or drafting appellate grounds.",
            "when_not_to_use": "For initial client intake before any documentation has been produced.",
            "target_personas": ["litigation-lawyer", "independent-advocate"],
            "difficulty": "intermediate",
            "estimated_minutes": 25,
            "variables": [
                {"key": "CAUSE_OF_ACTION", "label": "Core Legal Claim", "type": "text", "default": "Breach of Commercial Contract & Damages"},
                {"key": "BURDEN_OF_PROOF", "label": "Party Bearing Burden", "type": "text", "default": "Plaintiff"}
            ],
            "prompt_template": "Prepare comprehensive claim chart for '{{CAUSE_OF_ACTION}}' where burden lies on '{{BURDEN_OF_PROOF}}'.\nBreak claim into statutory and common law elements: (1) valid contract, (2) performance by plaintiff, (3) breach by defendant, (4) measurable loss.\nFor each element list supporting documentary exhibits, potential defence rebuttals, and evidentiary gaps.",
            "fictional_scenario": "In a software delivery dispute, plaintiff claims Rs. 1 Crore in lost profits due to system downtime caused by vendor negligence.",
            "sample_output": "### Claim Chart Matrix\n| Legal Element | Required Evidence | Available Exhibit | Gap Assessment |\n|---|---|---|---|\n| Valid Contract | Signed Agreement | Exhibit P-1 | None |\n| Breach of Duty | Incident RCA | Exhibit P-4 | Unsigned by vendor |\n| Quantified Loss | Audited Books | [MISSING] | Forensic audit required |",
            "output_type": "element-chart",
            "guardrails": ["Every factual assertion must map to a specific marked exhibit."],
            "verification_checklist": ["Check proof of electronic records under Section 65B Indian Evidence Act / Section 63 BSA.", "Verify witness competence for each exhibit."],
            "ai_risk_warning": "AI cannot predict how a trial judge will evaluate oral witness demeanor in cross-examination."
        }
    },
    {
        "skill_id": "employment-legal:termination-review",
        "display_name": "Employment Termination & Severance Risk Reviewer",
        "educational_status": "ready",
        "legal_review_status": "review-pending",
        "educational_overlay": {
            "purpose": "Audits proposed involuntary employee terminations for legal risk, statutory severance compliance, notice periods, and discrimination claims.",
            "when_to_use": "Prior to issuing termination notices, conducting performance-based exits, or implementing corporate restructuring.",
            "when_not_to_use": "When an employee voluntarily resigns without dispute or grievance.",
            "target_personas": ["in-house-counsel", "employment-lawyer", "compliance-officer"],
            "difficulty": "intermediate",
            "estimated_minutes": 20,
            "variables": [
                {"key": "WORKER_STATUS", "label": "Employee Classification", "type": "select", "options": ["Manager / Supervisory", "Workman / Non-Supervisory"], "default": "Workman / Non-Supervisory"},
                {"key": "GROUND_FOR_EXIT", "label": "Stated Grounds", "type": "select", "options": ["Misconduct / Disciplinary", "Underperformance (PIP)", "Redundancy / Retrenchment"], "default": "Underperformance (PIP)"},
                {"key": "TENURE_YEARS", "label": "Years of Continuous Service", "type": "number", "default": 4}
            ],
            "prompt_template": "Review proposed termination of {{WORKER_STATUS}} with {{TENURE_YEARS}} years service on grounds of {{GROUND_FOR_EXIT}}.\nAssess procedural fairness, statutory retrenchment compensation requirements, notice period dues, and gratuity obligations.\nIdentify wrongful termination risks under applicable industrial and shops & establishment legislation.\nMark unverified factors with [VERIFY].",
            "fictional_scenario": "A technology company seeks to terminate a senior software engineer after a 30-day Performance Improvement Plan without conducting a domestic inquiry.",
            "sample_output": "### Termination Risk Assessment: MODERATE-HIGH\n- **Procedural Gap**: PIP documentation lacks clear objective benchmarks.\n- **Statutory Dues**: Gratuity mandatory after 5 years (not triggered at 4 years); 1 month notice or pay in lieu required.",
            "output_type": "risk-memorandum",
            "guardrails": ["Never terminate an employee on medical leave or maternity leave."],
            "verification_checklist": ["Confirm compliance with Industrial Disputes Act retrenchment notice provisions if classified as workman.", "Verify release agreement includes valid waiver of claims."],
            "ai_risk_warning": "Local Shops and Commercial Establishments Acts vary significantly across Indian states."
        }
    },
    {
        "skill_id": "corporate-legal:tabular-review",
        "display_name": "Tabular Due Diligence Contract Reviewer",
        "educational_status": "ready",
        "legal_review_status": "review-pending",
        "educational_overlay": {
            "purpose": "Generates structured tabular schedules extracting material clauses across dozens of contracts during M&A or financing diligence.",
            "when_to_use": "During virtual data room (VDR) contract reviews for mergers, debt financing, or private equity investments.",
            "when_not_to_use": "When reviewing an isolated single-page side letter.",
            "target_personas": ["corporate-lawyer", "in-house-counsel"],
            "difficulty": "intermediate",
            "estimated_minutes": 30,
            "variables": [
                {"key": "MATERIALITY_THRESHOLD", "label": "Contract Value Threshold", "type": "text", "default": "Rs. 25,00,000/- annual"},
                {"key": "EXTRACT_FIELDS", "label": "Target Diligence Clauses", "type": "text", "default": "Change of Control, Exclusivity, Assignment, Non-Compete, Governing Law"}
            ],
            "prompt_template": "Perform tabular due diligence review on uploaded contract batch for contracts exceeding {{MATERIALITY_THRESHOLD}}.\nExtract and tabulate: {{EXTRACT_FIELDS}}.\nFlag any change-of-control provisions requiring counterparty consent prior to equity transfer.\nHighlight unusual indemnity obligations or unilateral termination rights.",
            "fictional_scenario": "In a proposed acquisition of an edtech startup, legal counsel must review 45 vendor and customer agreements in 48 hours.",
            "sample_output": "### Diligence Extraction Schedule\n| Doc ID | Counterparty | Expiry Date | Change of Control? | Assignment Restriction? |\n|---|---|---|---|---|\n| C-01 | AWS Cloud | 12/2027 | No | Consent Required |\n| C-02 | Payment Gateway | 04/2026 | Yes (30d notice) | Prohibited |",
            "output_type": "diligence-table",
            "guardrails": ["Confirm whether unsigned agreements in VDR were actually executed in practice."],
            "verification_checklist": ["Verify stamp duty payment on material contracts.", "Check registration status where mandatory under Registration Act 1908."],
            "ai_risk_warning": "AI can miss cross-references to exhibits stored in separate VDR folders."
        }
    },
    {
        "skill_id": "law-student:socratic-drill",
        "display_name": "Socratic Legal Reasoning & Case Method Drill",
        "educational_status": "ready",
        "legal_review_status": "review-pending",
        "educational_overlay": {
            "purpose": "Interactive Socratic tutor challenging students to defend legal propositions, identify ratio decidendi, and test hypothetical boundaries.",
            "when_to_use": "For classroom preparation, moot court oral argument training, and conceptual jurisprudential testing.",
            "when_not_to_use": "When looking for quick copy-paste answers to exam questions.",
            "target_personas": ["law-student"],
            "difficulty": "beginner",
            "estimated_minutes": 20,
            "variables": [
                {"key": "LEGAL_TOPIC", "label": "Jurisprudential Topic", "type": "text", "default": "Fundamental Rights: Doctrine of Basic Structure"},
                {"key": "STUDENT_STANCE", "label": "Initial Student Hypothesis", "type": "text", "default": "Parliament has unlimited amending power under Article 368"}
            ],
            "prompt_template": "Act as a rigorous Socratic law professor drilling the topic: '{{LEGAL_TOPIC}}'.\nChallenge student proposition: '{{STUDENT_STANCE}}'.\nDo not provide the final answer immediately. Ask probing questions forcing analysis of precedents (e.g. Kesavananda Bharati, Minerva Mills).\nPrompt the student to define limits: If Parliament can amend any provision, could it abolish judicial review entirely?",
            "fictional_scenario": "A 2nd-year law student preparing for Constitutional Law exams argues that parliamentary sovereignty in India mirrors the British Westminster model.",
            "sample_output": "### Socratic Drill Interaction\n**Professor**: You state that Article 368 contains no implied limitations. Let us test that premise.\nIf Parliament enacted a constitutional amendment declaring that all future laws are immune from judicial challenge, would the Supreme Court be bound to uphold it?\n*Consider the majority holding in Kesavananda Bharati regarding the identity of the Constitution.*",
            "output_type": "dialogue-guide",
            "guardrails": ["Encourage multi-faceted reasoning rather than mechanical recitation."],
            "verification_checklist": ["Confirm case citations match official supreme court law reports (SCR / SCC)."],
            "ai_risk_warning": "Socratic dialogues are conceptual exercises and do not represent formal legal advice."
        }
    },
    {
        "skill_id": "law-student:case-brief",
        "display_name": "Case Brief Generator (IRAC / FILAC)",
        "educational_status": "ready",
        "legal_review_status": "review-pending",
        "educational_overlay": {
            "purpose": "Distills complex multi-page judicial judgments into structured IRAC (Issue, Rule, Application, Conclusion) briefs.",
            "when_to_use": "When reading landmark judgments, studying case law for moots, or preparing lecture summaries.",
            "when_not_to_use": "As a substitute for reading primary judicial text when citing in appellate court.",
            "target_personas": ["law-student", "legal-researcher", "independent-advocate"],
            "difficulty": "beginner",
            "estimated_minutes": 15,
            "variables": [
                {"key": "CASE_NAME", "label": "Full Case Citation", "type": "text", "default": "K.S. Puttaswamy v. Union of India (2017) 10 SCC 1"},
                {"key": "BENCH_SIZE", "label": "Bench Constitution", "type": "text", "default": "9-Judge Constitution Bench"}
            ],
            "prompt_template": "Prepare structured FILAC brief for judgment '{{CASE_NAME}}' decided by '{{BENCH_SIZE}}'.\nExtract: (1) Material Facts, (2) Substantial Legal Issues, (3) Constitutional / Statutory Rules, (4) Ratio Decidendi & Judicial Reasoning, (5) Dissenting Views (if any), (6) Final Conclusion and Constitutional Impact.\nExplicitly mark ratio vs obiter dicta.",
            "fictional_scenario": "A law student must prepare a 2-page brief on the Right to Privacy judgment for a constitutional law seminar.",
            "sample_output": "### Case Brief: K.S. Puttaswamy v. Union of India\n- **Issue**: Is the right to privacy a fundamental right under Part III of the Constitution?\n- **Rule**: Articles 14, 19, 21.\n- **Ratio**: Privacy is a natural, inalienable right emanating from life and personal liberty under Article 21.\n- **Test**: State interference must satisfy: (1) Legality, (2) Legitimate state aim, (3) Proportionality.",
            "output_type": "irac-brief",
            "guardrails": ["Clearly distinguish between majority ratio and concurring obiter remarks."],
            "verification_checklist": ["Verify whether judgment has been subsequently distinguished or overruled."],
            "ai_risk_warning": "AI language models frequently confuse dissenting opinions with majority holdings."
        }
    },
    {
        "skill_id": "legal-clinic:client-intake",
        "display_name": "Legal Aid & Clinic Intake Specialist",
        "educational_status": "ready",
        "legal_review_status": "review-pending",
        "educational_overlay": {
            "purpose": "Guides university legal aid clinics and pro-bono advocates through empathetic, structured client interviewing and eligibility screening.",
            "when_to_use": "During first-time clinic interviews with indigent litigants, consumers, or distressed individuals.",
            "when_not_to_use": "To formally retain a client before checking conflict of interest and supervisory advocate authorization.",
            "target_personas": ["legal-clinic", "law-student", "independent-advocate"],
            "difficulty": "beginner",
            "estimated_minutes": 20,
            "variables": [
                {"key": "DISPUTE_CATEGORY", "label": "Intake Matter Category", "type": "select", "options": ["Domestic / Maintenance", "Tenancy / Eviction", "Consumer Fraud", "Unpaid Wages"], "default": "Consumer Fraud"},
                {"key": "INCOME_ELIGIBILITY", "label": "Qualifies for Free Legal Aid (Income < Threshold)", "type": "boolean", "default": True}
            ],
            "prompt_template": "Conduct legal clinic intake for client presenting dispute in {{DISPUTE_CATEGORY}} with legal aid eligibility: {{INCOME_ELIGIBILITY}}.\nFormulate plain-language interview questions capturing: (1) Sequence of events, (2) Documents held by client, (3) Desired outcome, (4) Immediate urgency/limitation risks.\nDraft conflict check notice and supervisor escalation summary.\nDo not promise outcome to client. Include [SUPERVISOR SIGN-OFF REQUIRED].",
            "fictional_scenario": "A daily wage worker was defrauded of Rs. 35,000 by an unauthorized job recruitment agency promising an overseas visa.",
            "sample_output": "### Clinic Intake Record\n- **Client**: Smt. Kamala Devi (Income: Rs. 12,000/mo - Eligible under Section 12 LSA Act).\n- **Urgency**: Bank UPI transaction occurred 48 hours ago; immediate cyber complaint required.\n- **Action Items**: Draft complaint to National Cyber Crime Portal; seek supervisor review.",
            "output_type": "intake-record",
            "guardrails": ["Student clinicians must never provide definitive legal opinions without supervising advocate presence."],
            "verification_checklist": ["Verify eligibility criteria under Section 12 of Legal Services Authorities Act 1987.", "Conduct conflict check against prior clinic consultations."],
            "ai_risk_warning": "Statutory limitation clocks continue running while clinic evaluates representation eligibility."
        }
    }
]

for item in overlays_data:
    fname = item["skill_id"].replace(":", "_") + ".json"
    (OVERLAYS_DIR / fname).write_text(json.dumps(item, indent=2), encoding="utf-8")

# 18 Matching Indian Legal Practice Overlays
india_overlays_data = [
    {
        "skill_id": "commercial-legal:nda-review",
        "india_context": {
            "supported_jurisdictions": ["India", "All States & Union Territories"],
            "legislation_ids": ["ICA-1872", "DPDP-2023", "CCA-2015"],
            "procedural_notes": "Under Section 27 of the Indian Contract Act 1872, any agreement restraining anyone from exercising a lawful profession, trade or business is void to that extent. Post-employment non-compete clauses in NDAs are strictly unenforceable in India (Percept D'Mark v. Zaheer Khan).",
            "transitional_notes": "Transitional provisions between legacy non-disclosure and incoming DPDP Act 2023 require clear data consent boundaries.",
            "verification_requirements": ["Verify stamp duty payment under relevant State Stamp Act.", "Verify non-solicit duration does not exceed reasonable boundaries."]
        }
    },
    {
        "skill_id": "commercial-legal:vendor-agreement-review",
        "india_context": {
            "supported_jurisdictions": ["India"],
            "legislation_ids": ["ICA-1872", "CCA-2015", "LA-1963"],
            "procedural_notes": "Under Section 12A of the Commercial Courts Act 2015, pre-institution mediation is mandatory unless urgent interim relief is prayed for. Commercial contracts exceeding Rs. 3 Lakhs fall within Commercial Division jurisdiction.",
            "transitional_notes": "Ensure limitation period calculations align with 3-year limitation for debt recovery under Schedule to Limitation Act 1963.",
            "verification_requirements": ["Confirm dispute resolution venue and seat of arbitration.", "Verify GST indemnification clause."]
        }
    },
    {
        "skill_id": "commercial-legal:saas-msa-review",
        "india_context": {
            "supported_jurisdictions": ["India"],
            "legislation_ids": ["IT-2000", "DPDP-2023", "CERT-IN-2022"],
            "procedural_notes": "CERT-In cybersecurity directions (2022) mandate that system logs must be securely maintained within Indian jurisdiction for rolling period of 180 days.",
            "transitional_notes": "Cross-border data transfer must comply with Central Government negative list notifications under Section 16 of DPDP Act 2023.",
            "verification_requirements": ["Verify data localization provisions for sensitive financial/health data (RBI/IRDAI directives)."]
        }
    },
    {
        "skill_id": "privacy-legal:dpa-review",
        "india_context": {
            "supported_jurisdictions": ["India"],
            "legislation_ids": ["DPDP-2023", "IT-2000"],
            "procedural_notes": "Under the Digital Personal Data Protection Act 2023, the data controller is termed 'Data Fiduciary' and the processor 'Data Processor'. A Data Fiduciary remains primarily liable for breaches committed by its Processor.",
            "transitional_notes": "Rules and penalty schedules under DPDPA to be notified; legacy Section 43A of IT Act 2000 applies until formal repeal takes effect.",
            "verification_requirements": ["Confirm processor contract mandates immediate breach notification to Fiduciary to meet Data Protection Board timelines."]
        }
    },
    {
        "skill_id": "privacy-legal:dsar-response",
        "india_context": {
            "supported_jurisdictions": ["India"],
            "legislation_ids": ["DPDP-2023"],
            "procedural_notes": "Under Section 11 of the DPDP Act 2023, Data Principals have rights to access summaries of personal data, identities of third-party fiduciaries with whom data is shared, and correction/erasure.",
            "transitional_notes": "Grievance redressal officer contact details must be clearly provided with appellate escalation path to Data Protection Board of India.",
            "verification_requirements": ["Ensure statutory record retention mandates under Income Tax Act and Companies Act are preserved."]
        }
    },
    {
        "skill_id": "privacy-legal:use-case-triage",
        "india_context": {
            "supported_jurisdictions": ["India"],
            "legislation_ids": ["DPDP-2023", "IT-2000"],
            "procedural_notes": "Processing children's data (individuals under 18 years) carries strict prohibitions against tracking, behavioral monitoring, or targeted advertising under Section 9 of DPDPA 2023.",
            "transitional_notes": "Consent must be free, specific, informed, unconditional and unambiguous with clear notice in all 22 Eighth Schedule languages.",
            "verification_requirements": ["Verify verifiable parental consent mechanism for minors."]
        }
    },
    {
        "skill_id": "ai-governance-legal:use-case-triage",
        "india_context": {
            "supported_jurisdictions": ["India"],
            "legislation_ids": ["IT-2000", "DPDP-2023", "MEITY-AI-ADVISORY-2024"],
            "procedural_notes": "MeitY AI advisories mandate that intermediaries deploying generative AI models must ensure no bias, unlawful discrimination, or generation of synthetic deepfakes without watermarks.",
            "transitional_notes": "Evaluate potential safe harbor defense under Section 79 of Information Technology Act 2000.",
            "verification_requirements": ["Verify AI terms do not disclaim all accountability for defamatory content generation."]
        }
    },
    {
        "skill_id": "ai-governance-legal:aia-generation",
        "india_context": {
            "supported_jurisdictions": ["India"],
            "legislation_ids": ["CONSTITUTION-ART-21", "DPDP-2023"],
            "procedural_notes": "Algorithmic decision systems impacting personal liberty, state welfare benefits, or employment rights are subject to judicial review under Articles 14, 19, and 21 of the Constitution.",
            "transitional_notes": "NITI Aayog 'Responsible AI for All' guidelines provide national ethical benchmarking.",
            "verification_requirements": ["Verify that automated rejections can be appealed to a human decision maker."]
        }
    },
    {
        "skill_id": "litigation-legal:demand-intake",
        "india_context": {
            "supported_jurisdictions": ["India"],
            "legislation_ids": ["CPC-1908", "NI-1881", "LA-1963"],
            "procedural_notes": "If notice alleges dishonour of cheque under Section 138 of Negotiable Instruments Act 1881, statutory payment window is strictly 15 days; complaint must be filed within 30 days thereafter.",
            "transitional_notes": "Assess whether pre-suit commercial mediation applies under Section 12A Commercial Courts Act.",
            "verification_requirements": ["Check mode of service under CPC Order V (Registered Post with Acknowledgment Due / Speed Post)."]
        }
    },
    {
        "skill_id": "litigation-legal:demand-draft",
        "india_context": {
            "supported_jurisdictions": ["India"],
            "legislation_ids": ["ICA-1872", "INTEREST-ACT-1978", "CPC-1908"],
            "procedural_notes": "In commercial debt recovery, notice serves to establish the exact date from which statutory interest under Interest Act 1978 begins accruing.",
            "transitional_notes": "Ensure demand does not incorporate criminal threats without verifiable ingredients of cheating under BNS Section 318 / IPC Section 420.",
            "verification_requirements": ["Confirm exact legal entity names from Ministry of Corporate Affairs (MCA) portal."]
        }
    },
    {
        "skill_id": "litigation-legal:chronology",
        "india_context": {
            "supported_jurisdictions": ["India"],
            "legislation_ids": ["CPC-1908", "BSA-2023", "LA-1963"],
            "procedural_notes": "Under Bharatiya Sakshya Adhiniyam 2023 (BSA) Section 63 (corresponding to Section 65B of Indian Evidence Act), electronic records require mandatory certificate by person in management/control of device.",
            "transitional_notes": "Events occurring prior to 1 July 2024 continue to be governed by Indian Evidence Act 1872 under criminal/evidence transition rules.",
            "verification_requirements": ["Check that electronic email and WhatsApp timelines have corresponding Section 63 BSA certificates."]
        }
    },
    {
        "skill_id": "litigation-legal:subpoena-triage",
        "india_context": {
            "supported_jurisdictions": ["India"],
            "legislation_ids": ["BNSS-2023", "CRPC-1973", "CONSTITUTION-ART-20"],
            "procedural_notes": "Section 94 of Bharatiya Nagarik Suraksha Sanhita 2023 (BNSS) (formerly Section 91 CrPC) empowers courts and police officers to summon documents necessary for investigation or trial.",
            "transitional_notes": "Article 20(3) of Constitution shields accused persons from being compelled to produce self-incriminatory private documents (State of Gujarat v. Shyamlal Mohanlal).",
            "verification_requirements": ["Verify whether recipient is named as accused or merely witness in FIR/complaint."]
        }
    },
    {
        "skill_id": "litigation-legal:claim-chart",
        "india_context": {
            "supported_jurisdictions": ["India"],
            "legislation_ids": ["CPC-1908", "BSA-2023", "SRA-1963"],
            "procedural_notes": "Under Order VI Rule 1 and Order VII Rule 1 CPC, pleadings must contain concise statements of material facts but not evidence by which they are to be proved.",
            "transitional_notes": "Specific Performance claims under Specific Relief Act 1963 as amended in 2018 are mandatory remedies unless falling under statutory exceptions.",
            "verification_requirements": ["Verify readiness and willingness averment under Section 16(c) of Specific Relief Act 1963."]
        }
    },
    {
        "skill_id": "employment-legal:termination-review",
        "india_context": {
            "supported_jurisdictions": ["India"],
            "legislation_ids": ["IDA-1947", "PGA-1972", "SHOPS-ACTS"],
            "procedural_notes": "Under Industrial Disputes Act 1947, retrenchment of a workman requires 1 month notice in writing, 15 days average pay per completed year of service, and notice to government authorities.",
            "transitional_notes": "Upcoming Labour Codes (Industrial Relations Code 2020) will alter retrenchment employee threshold from 100 to 300 workmen once notified.",
            "verification_requirements": ["Confirm payment of statutory gratuity under Payment of Gratuity Act 1972 (mandatory after 5 continuous years)."]
        }
    },
    {
        "skill_id": "corporate-legal:tabular-review",
        "india_context": {
            "supported_jurisdictions": ["India"],
            "legislation_ids": ["COMPANIES-ACT-2013", "FEMA-1999", "STAMP-ACT-1899"],
            "procedural_notes": "Agreements lacking adequate stamp duty under Indian Stamp Act 1899 cannot be acted upon or admitted in evidence until impounded and deficit with penalty is paid (NN Global 7-Judge Bench).",
            "transitional_notes": "Verify foreign investment caps and reporting on RBI FIRMS portal under FEMA regulations.",
            "verification_requirements": ["Check MCA Master Data for active director status and registered charges on company assets."]
        }
    },
    {
        "skill_id": "law-student:socratic-drill",
        "india_context": {
            "supported_jurisdictions": ["India"],
            "legislation_ids": ["CONSTITUTION-OF-INDIA"],
            "procedural_notes": "Indian constitutional law balances parliamentary democracy with judicial review. Basic structure doctrine (Kesavananda Bharati, 1973) serves as foundational limitation on constituent power.",
            "transitional_notes": "Contrast Indian model of transformative constitutionalism with US strict originalism.",
            "verification_requirements": ["Verify whether judgment has been reconsidered by larger constitutional benches."]
        }
    },
    {
        "skill_id": "law-student:case-brief",
        "india_context": {
            "supported_jurisdictions": ["India"],
            "legislation_ids": ["SUPREME-COURT-RULES-2013"],
            "procedural_notes": "Judgments of Supreme Court are binding on all courts within India under Article 141 of the Constitution.",
            "transitional_notes": "Distinguish binding ratio from per incuriam pronouncements.",
            "verification_requirements": ["Verify citation in official Supreme Court Reports (SCR) or SCC."]
        }
    },
    {
        "skill_id": "legal-clinic:client-intake",
        "india_context": {
            "supported_jurisdictions": ["India"],
            "legislation_ids": ["LSA-1987", "CPA-2019"],
            "procedural_notes": "Section 12 of Legal Services Authorities Act 1987 grants free legal aid to women, children, members of SC/ST, industrial workmen, and persons whose annual income is below statutory threshold.",
            "transitional_notes": "Consumer disputes below Rs. 50 Lakhs are heard by District Consumer Disputes Redressal Commission under Consumer Protection Act 2019.",
            "verification_requirements": ["Check whether dispute is suitable for pre-litigation settlement through National Lok Adalat."]
        }
    }
]

for item in india_overlays_data:
    fname = item["skill_id"].replace(":", "_") + ".json"
    (INDIA_DIR / fname).write_text(json.dumps(item, indent=2), encoding="utf-8")

# 5 Complete Guided Workflows
workflows_data = [
    {
        "id": "civil-recovery",
        "title": "Commercial Debt & Civil Money Recovery Workflow",
        "category": "Litigation & Commercial",
        "practice_area": "Civil Litigation",
        "description": "End-to-end guided workflow for recovering unpaid commercial debts, from initial invoice assessment and chronology extraction to statutory demand notice preparation and pre-institution mediation.",
        "difficulty": "intermediate",
        "steps": [
            {
                "step_number": 1,
                "title": "Client Intake & Debt Assessment",
                "objective": "Screen invoices, identify contractual counterparty, and evaluate quantum of claim.",
                "linked_skill_id": "litigation-legal:demand-intake",
                "required_inputs": ["Invoices", "Purchase Orders", "Delivery Receipts"],
                "prompt_guidance": "Evaluate invoices and verify total outstanding debt and interest terms.",
                "expected_output": "Quantified debt triage memo with limitation assessment.",
                "verification_gate": "Confirm debt is within 3-year limitation period under Limitation Act 1963."
            },
            {
                "step_number": 2,
                "title": "Factual Timeline & Document Chronology",
                "objective": "Construct objective chronology of purchase orders, deliveries, and payment demands.",
                "linked_skill_id": "litigation-legal:chronology",
                "required_inputs": ["Email trails", "WhatsApp correspondence", "Delivery challans"],
                "prompt_guidance": "Extract dated chronology identifying admitted acknowledgments of debt.",
                "expected_output": "Chronological evidence matrix with exhibit mappings.",
                "verification_gate": "Ensure all electronic communications have Section 63 BSA certificate trails."
            },
            {
                "step_number": 3,
                "title": "Pre-Litigation Legal Notice Drafting",
                "objective": "Formulate formal demand notice giving statutory cure period prior to suit.",
                "linked_skill_id": "litigation-legal:demand-draft",
                "required_inputs": ["Chronology matrix", "Calculated interest schedule"],
                "prompt_guidance": "Draft notice demanding payment within 15 days under threat of commercial suit.",
                "expected_output": "Structured legal demand notice.",
                "verification_gate": "Supervising advocate review and signature before issuance via Registered Post."
            },
            {
                "step_number": 4,
                "title": "Pre-Institution Mediation & Commercial Court Filing",
                "objective": "Initiate mandatory pre-institution mediation under Section 12A Commercial Courts Act.",
                "linked_skill_id": "litigation-legal:claim-chart",
                "required_inputs": ["Proof of service of legal notice", "Statement of Truth"],
                "prompt_guidance": "Draft application for pre-institution mediation at District Legal Services Authority.",
                "expected_output": "DLSA mediation application and draft commercial plaint.",
                "verification_gate": "Confirm verification clause compliance under Order VI Rule 15A CPC."
            }
        ]
    },
    {
        "id": "commercial-contract-review",
        "title": "Commercial Agreement Triage & Redline Workflow",
        "category": "Corporate & Commercial",
        "practice_area": "Commercial Law",
        "description": "Standardized review workflow for incoming vendor agreements, NDAs, and SaaS contracts against enterprise risk thresholds.",
        "difficulty": "intermediate",
        "steps": [
            {
                "step_number": 1,
                "title": "Agreement Classification & NDA Triage",
                "objective": "Identify contract structure and classify confidentiality restrictions.",
                "linked_skill_id": "commercial-legal:nda-review",
                "required_inputs": ["Inbound agreement file (PDF/Word)"],
                "prompt_guidance": "Triage NDA terms into GREEN, YELLOW, or RED risk buckets.",
                "expected_output": "NDA risk scorecard with key flags.",
                "verification_gate": "Ensure no post-termination non-compete clauses violate Section 27 ICA."
            },
            {
                "step_number": 2,
                "title": "Substantive MSA & SLA Audit",
                "objective": "Audit liability caps, indemnification, warranty disclaimers, and payment terms.",
                "linked_skill_id": "commercial-legal:vendor-agreement-review",
                "required_inputs": ["Master Services Agreement draft"],
                "prompt_guidance": "Audit liability cap multiplier and benchmark service levels.",
                "expected_output": "Clause-by-clause contract matrix with fallback language.",
                "verification_gate": "Ensure liability cap carve-outs include gross negligence and data breach."
            },
            {
                "step_number": 3,
                "title": "Data Privacy & Security Addendum Review",
                "objective": "Align data processing addendum with Indian data protection legislation.",
                "linked_skill_id": "privacy-legal:dpa-review",
                "required_inputs": ["Data Processing Addendum (DPA)"],
                "prompt_guidance": "Review data breach notification windows and sub-processor provisions.",
                "expected_output": "DPA compliance checklist.",
                "verification_gate": "Verify cross-border transfer compliance under DPDP Act 2023."
            },
            {
                "step_number": 4,
                "title": "Executive Summary & Negotiation Markup",
                "objective": "Produce clean redlined markup and executive summary for business stakeholders.",
                "linked_skill_id": "commercial-legal:review-proposals",
                "required_inputs": ["Consolidated contract matrix"],
                "prompt_guidance": "Generate plain-language negotiation summary highlighting deal-breaker points.",
                "expected_output": "Executive summary memorandum and redline package.",
                "verification_gate": "Business stakeholder sign-off on accepted commercial risks."
            }
        ]
    },
    {
        "id": "bank-account-freeze",
        "title": "Bank Account Freeze & Cybercrime Representation",
        "category": "Banking & Cybercrime",
        "practice_area": "Banking and Financial Law",
        "description": "Step-by-step guidance for individuals and businesses whose bank accounts have been frozen pursuant to cybercrime police notices under Section 91 CrPC / Section 94 BNSS.",
        "difficulty": "advanced",
        "steps": [
            {
                "step_number": 1,
                "title": "Bank Communication & Requisition Intake",
                "objective": "Determine the exact police station, cyber crime acknowledgement number, and frozen amount.",
                "linked_skill_id": "litigation-legal:subpoena-triage",
                "required_inputs": ["Bank freeze intimation letter / SMS", "Bank statement"],
                "prompt_guidance": "Analyze bank freeze notice and identify investigating cyber crime authority.",
                "expected_output": "Requisition assessment memo identifying jurisdictional police station.",
                "verification_gate": "Confirm whether freeze covers total account balance or only disputed transaction amount."
            },
            {
                "step_number": 2,
                "title": "Transaction Chronology & Legitimacy Evidence",
                "objective": "Gather proof that client is bona-fide recipient of funds without involvement in cyber fraud.",
                "linked_skill_id": "litigation-legal:chronology",
                "required_inputs": ["Tax invoices", "E-way bills", "GST returns", "Customer order history"],
                "prompt_guidance": "Construct transaction chronology proving genuine commercial consideration.",
                "expected_output": "Evidentiary proof-of-consideration dossier.",
                "verification_gate": "Confirm bank statements match invoices and GST returns."
            },
            {
                "step_number": 3,
                "title": "Formal Representation to Investigating Officer",
                "objective": "Submit legal representation requesting unfreezing of undisputed operating capital.",
                "linked_skill_id": "litigation-legal:demand-draft",
                "required_inputs": ["Evidence dossier", "Account details"],
                "prompt_guidance": "Draft formal representation to Cyber Police explaining bona-fide transaction.",
                "expected_output": "Comprehensive formal representation letter.",
                "verification_gate": "Advocate review; submit via registered post and official email with acknowledgment."
            },
            {
                "step_number": 4,
                "title": "Magistrate Application under Section 457 CrPC / BNSS",
                "objective": "Approach jurisdictional magistrate court if investigating officer fails to release lien.",
                "linked_skill_id": "litigation-legal:claim-chart",
                "required_inputs": ["Police representation proof of delivery", "Affidavit"],
                "prompt_guidance": "Draft petition under Section 457 CrPC / Section 503 BNSS for defreezing account.",
                "expected_output": "Court application for release of frozen bank account on furnishing indemnity bond.",
                "verification_gate": "Ensure client is prepared to furnish bank guarantee or indemnity for disputed amount."
            }
        ]
    },
    {
        "id": "criminal-case-preparation",
        "title": "Criminal Case Intake, FIR & Defence Strategy",
        "category": "Criminal Law",
        "practice_area": "Criminal Litigation",
        "description": "Structured workflow for assessing criminal FIRs, mapping applicable statutes under new criminal laws (BNS/BNSS/BSA), and formulating defence strategy.",
        "difficulty": "advanced",
        "steps": [
            {
                "step_number": 1,
                "title": "FIR & Allegation Deconstruction",
                "objective": "Analyze First Information Report (FIR) elements, informant statement, and penal sections.",
                "linked_skill_id": "litigation-legal:demand-intake",
                "required_inputs": ["Certified copy of FIR", "Arrest memo (if applicable)"],
                "prompt_guidance": "Deconstruct FIR into specific penal ingredients and verify whether cognizable/bailable.",
                "expected_output": "FIR legal analysis matrix.",
                "verification_gate": "Determine whether incident occurred before or after 1 July 2024 to apply IPC vs BNS."
            },
            {
                "step_number": 2,
                "title": "Factual Timeline & Alibi Verification",
                "objective": "Establish exact chronology of events, call detail records (CDR), and electronic alibi.",
                "linked_skill_id": "litigation-legal:chronology",
                "required_inputs": ["Toll plaza receipts", "CCTV records", "CDR / Google timeline"],
                "prompt_guidance": "Map accused timeline against alleged time and place of crime.",
                "expected_output": "Defense chronology matrix.",
                "verification_gate": "Preserve electronic records immediately under Section 63 BSA certificate."
            },
            {
                "step_number": 3,
                "title": "Bail Petition & Procedural Safeguards",
                "objective": "Draft anticipatory or regular bail application focusing on Section 479/482 BNSS safeguards.",
                "linked_skill_id": "litigation-legal:claim-chart",
                "required_inputs": ["Accused antecedents", "Medical records", "Local surety details"],
                "prompt_guidance": "Formulate bail grounds emphasizing absence of flight risk, cooperation with investigation.",
                "expected_output": "Comprehensive bail application with supporting affidavit.",
                "verification_gate": "Verify compliance with Arnesh Kumar / Satender Kumar Antil arrest guidelines."
            }
        ]
    },
    {
        "id": "enterprise-ai-vendor-assessment",
        "title": "Enterprise AI Vendor & Procurement Assessment",
        "category": "AI Governance & Compliance",
        "practice_area": "Cyber Law & AI Governance",
        "description": "Multi-disciplinary evaluation workflow for procuring third-party AI models and SaaS integrations.",
        "difficulty": "advanced",
        "steps": [
            {
                "step_number": 1,
                "title": "AI System Use-Case Classification",
                "objective": "Classify model risk level, data inputs, and degree of human oversight.",
                "linked_skill_id": "ai-governance-legal:use-case-triage",
                "required_inputs": ["Vendor architecture whitepaper", "API specification"],
                "prompt_guidance": "Classify enterprise AI risk level and identify prohibited capabilities.",
                "expected_output": "AI risk classification report.",
                "verification_gate": "Confirm whether system involves autonomous biometric scanning or employment triage."
            },
            {
                "step_number": 2,
                "title": "Data Privacy & Training Data Audit",
                "objective": "Audit whether customer data will be ingested for foundational model retraining.",
                "linked_skill_id": "privacy-legal:dpa-review",
                "required_inputs": ["Vendor Data Processing Addendum", "Security certifications"],
                "prompt_guidance": "Verify zero-data-retention policy and opt-out of model training.",
                "expected_output": "Data privacy audit checklist.",
                "verification_gate": "Mandate explicit contractual prohibition against training public models on customer inputs."
            },
            {
                "step_number": 3,
                "title": "Comprehensive AI Impact Assessment",
                "objective": "Assess hallucination guardrails, prompt injection vulnerabilities, and fallback mechanisms.",
                "linked_skill_id": "ai-governance-legal:aia-generation",
                "required_inputs": ["System prompt guidelines", "RAG evaluation benchmarks"],
                "prompt_guidance": "Draft full AI Impact Assessment establishing PEAS operational parameters.",
                "expected_output": "AI Impact Assessment (AIA) document.",
                "verification_gate": "Ensure deterministic fallback exists for mission-critical automated processes."
            }
        ]
    }
]

for item in workflows_data:
    fname = item["id"] + ".json"
    (WORKFLOWS_DIR / fname).write_text(json.dumps(item, indent=2), encoding="utf-8")

# 15 Practical Case Studies
case_studies_data = [
    {
        "id": "commercial-invoice-default",
        "title": "Unpaid Commercial Invoices of Rs. 25 Lakhs",
        "practice_area": "Commercial Law",
        "facts": "A vendor supplying precision industrial equipment to an automotive tier-1 supplier has 4 unpaid invoices totaling Rs. 25,00,000 dating between December 2025 and March 2026. The buyer claims minor defects without returning the goods.",
        "parties": {"Claimant": "Precision Tools Pvt Ltd", "Respondent": "Delta Auto Components Ltd"},
        "legal_issues": ["Limitation period under Article 14 of Limitation Act 1963", "Acceptance of goods under Sale of Goods Act 1930", "Mandatory pre-institution mediation under Section 12A Commercial Courts Act"],
        "relevant_skill_ids": ["commercial-legal:vendor-agreement-review", "litigation-legal:demand-draft", "litigation-legal:chronology"],
        "fictional_excerpt": "Invoice No. PT/25/089 dated 14 Dec 2025 for Rs. 7,50,000/- marked 'Payment due within 30 days'. Delivery receipt signed by factory manager.",
        "recommended_strategy": "Issue formal demand notice establishing debt acknowledgment; calculate statutory interest at 18% under Interest Act 1978; file DLSA mediation application."
    },
    {
        "id": "bank-freeze-cybercrime",
        "title": "Bank Account Freeze on Disputed UPI Transaction",
        "practice_area": "Banking and Financial Law",
        "facts": "A boutique software consultancy received Rs. 85,000 via UPI for web development services. Two weeks later, their entire current account containing Rs. 14,00,000 was placed under debit freeze by HDFC Bank pursuant to a notice from Telangana Cyber Crime Police.",
        "parties": {"Account Holder": "PixelCraft Studios LLP", "Bank": "HDFC Bank Ltd", "Agency": "Cyber Crime Police Station, Hyderabad"},
        "legal_issues": ["Scope of freeze under Section 91/102 CrPC (Section 94/107 BNSS)", "Proportionality: freezing total account balance vs lien on disputed amount of Rs. 85,000", "Bona-fide payee protection"],
        "relevant_skill_ids": ["litigation-legal:subpoena-triage", "litigation-legal:demand-draft"],
        "fictional_excerpt": "Bank SMS: 'Your account XXXXXX1234 has been put on debit freeze as per instructions of Cyber Crime PS Ack No 2026/CY/9821.'",
        "recommended_strategy": "Submit formal representation with invoice, tax filings, and client communication proving legitimate transaction; request restriction of freeze to Rs. 85,000; approach Magistrate under Section 457 CrPC if police do not de-freeze within 7 days."
    },
    {
        "id": "dishonoured-cheque-138",
        "title": "Dishonoured Business Cheque of Rs. 12 Lakhs",
        "practice_area": "Banking and Financial Law",
        "facts": "A distributor issued a cheque of Rs. 12,00,000 against delivery of consumer goods. The cheque was returned dishonoured with memo 'Funds Insufficient'. Notice was dispatched via speed post.",
        "parties": {"Complainant": "Apex FMCG Distributors", "Accused": "Metro Mart Supermarket"},
        "legal_issues": ["Strict 15-day statutory cure window under Section 138 Negotiable Instruments Act", "Statutory presumption of consideration under Section 139 NI Act", "Vicarious liability of company directors under Section 141 NI Act"],
        "relevant_skill_ids": ["litigation-legal:demand-draft", "litigation-legal:chronology"],
        "fictional_excerpt": "Bank Return Memo dated 18 Oct 2026: 'Reason: 01 - Funds Insufficient'. Cheque No. 490211.",
        "recommended_strategy": "Dispatch statutory notice within 30 days of memo; file complaint before Judicial Magistrate within 30 days of expiry of 15-day cure window."
    },
    {
        "id": "saas-vendor-lockin",
        "title": "Enterprise Cloud SaaS Agreement Review",
        "practice_area": "Commercial Law",
        "facts": "A healthcare startup is procuring an AI-powered electronic health record (EHR) platform. The vendor's standard terms include unilateral price escalation clauses, auto-renewals with 90-day cancellation windows, and ownership of aggregated derivative data.",
        "parties": {"Customer": "CureQuick Telehealth", "Vendor": "CloudMed Global Systems Inc"},
        "legal_issues": ["Customer data ownership under DPDP Act 2023", "Unreasonable restraint on termination", "SLA credit enforcement"],
        "relevant_skill_ids": ["commercial-legal:saas-msa-review", "privacy-legal:dpa-review"],
        "fictional_excerpt": "Clause 14.2: 'Vendor may use anonymized Customer Clinical Data to train, improve, and deploy proprietary artificial intelligence models without royalty or restriction.'",
        "recommended_strategy": "Strike Clause 14.2 completely; require Indian data localization; reduce cancellation window from 90 to 30 days."
    },
    {
        "id": "employee-termination-dispute",
        "title": "Workplace Termination & Performance Disciplinary Review",
        "practice_area": "Labour and Employment Law",
        "facts": "A senior technical lead with 4.5 years tenure is placed on an ambiguous 14-day performance improvement plan and subsequently terminated via email without domestic inquiry or statutory severance.",
        "parties": {"Employee": "Rohan Deshmukh", "Employer": "FinScale Tech Solutions Pvt Ltd"},
        "legal_issues": ["Workman vs Managerial classification under Industrial Disputes Act 1947", "Principles of Natural Justice (Audi Alteram Partem)", "Payment of Gratuity Act 1972 eligibility"],
        "relevant_skill_ids": ["employment-legal:termination-review", "litigation-legal:demand-draft"],
        "fictional_excerpt": "Email Subject: Immediate Termination of Employment. 'Your services are terminated effective 5:00 PM today due to cultural misalignment.'",
        "recommended_strategy": "Issue legal notice for wrongful termination demanding 3 months severance and settlement of encashable leave; negotiate amicable mutual separation release agreement."
    },
    {
        "id": "consumer-electronics-defect",
        "title": "Defective Electric Scooter Battery Thermal Incident",
        "practice_area": "Consumer Protection",
        "facts": "A consumer purchased an electric two-wheeler for Rs. 1,45,000. Within three months, the battery pack suffered severe degradation and stalled in heavy traffic. The dealer refused replacement claiming user error.",
        "parties": {"Complainant": "Anand Narayanan", "Opposite Parties": ["VoltRide EV Motors Ltd", "City EV Dealership"]},
        "legal_issues": ["Product Liability under Chapter VI of Consumer Protection Act 2019", "Deficiency in Service under Section 2(11)", "Jurisdiction of District Consumer Forum"],
        "relevant_skill_ids": ["litigation-legal:demand-draft", "legal-clinic:client-intake"],
        "fictional_excerpt": "Service Job Card No. 8921: 'Battery pack voltage drop below threshold. Warranty claim rejected due to external temperature exposure.'",
        "recommended_strategy": "Issue statutory pre-litigation consumer legal notice; file consumer complaint seeking full vehicle refund plus compensation for mental agony."
    },
    {
        "id": "property-title-encumbrance",
        "title": "Undisclosed Mortgage on Agricultural Land Sale",
        "practice_area": "Property Law",
        "facts": "A purchaser entered into an Agreement to Sell for 3 acres of agricultural land and paid an advance of Rs. 15,00,000. Encumbrance certificate verification subsequently revealed a pre-existing equitable mortgage with a cooperative bank.",
        "parties": {"Purchaser": "Kavitha Rajan", "Vendor": "Munusamy & Sons"},
        "legal_issues": ["Section 55 Transfer of Property Act 1882 (duty of seller to disclose material latent defects)", "Specific performance vs refund with damages", "Cheating under Section 318 BNS / Section 420 IPC"],
        "relevant_skill_ids": ["corporate-legal:tabular-review", "litigation-legal:demand-draft"],
        "fictional_excerpt": "Sub-Registrar Encumbrance Certificate No. 441/2026: 'Entry 04: Registered Memorandum of Deposit of Title Deeds in favour of District Co-op Bank.'",
        "recommended_strategy": "Issue legal notice rescinding agreement due to fraudulent concealment; demand immediate refund of Rs. 15 Lakhs advance; file summary suit for recovery."
    },
    {
        "id": "cybercrime-phishing-fraud",
        "title": "SIM Swap & Netbanking Unauthorized Fund Transfer",
        "practice_area": "Cyber Law",
        "facts": "A retired school teacher experienced sudden cellular SIM deactivation. Within 2 hours, unauthorized NEFT/RTGS debits totaling Rs. 4,50,000 occurred from his pension account to three unfamiliar accounts.",
        "parties": {"Victim": "G. Sankaran", "Bank": "State Bank of India", "Telecom Provider": "Telco Mobile Ltd"},
        "legal_issues": ["RBI Zero Liability Framework for Unauthorized Electronic Banking Transactions (2017)", "Duty of care of telecom operator during duplicate SIM issuance", "Information Technology Act 2000 Section 43/66"],
        "relevant_skill_ids": ["litigation-legal:subpoena-triage", "legal-clinic:client-intake"],
        "fictional_excerpt": "Passbook entry: '14-Sep-2026 NEFT/IMPS Transfer to PayGate Mumbai - Rs. 2,00,000/- Ref 990182.'",
        "recommended_strategy": "Report incident to National Cyber Crime Reporting Portal (cybercrime.gov.in) within 24 hours; submit written zero-liability claim to bank under RBI guidelines; petition Banking Ombudsman."
    },
    {
        "id": "trademark-infringement-brand",
        "title": "Phonetic Trademark Infringement in FMCG Cosmetics",
        "practice_area": "Intellectual Property",
        "facts": "A skincare brand 'GLOWVEDA' registered in Class 3 discovers a rival company selling identical ayurvedic creams under the mark 'GLOVEDA' with deceptively similar packaging and color scheme.",
        "parties": {"Plaintiff": "Glowveda Naturals Pvt Ltd", "Defendant": "Gloveda Beauty Care"},
        "legal_issues": ["Infringement under Section 29 Trademarks Act 1999", "Passing off and deceptive similarity test", "Grant of ex-parte ad-interim injunction"],
        "relevant_skill_ids": ["commercial-legal:nda-review", "litigation-legal:demand-draft"],
        "fictional_excerpt": "Cease & Desist Notice: 'Your adoption of GLOVEDA is visually, phonetically, and conceptually deceptively similar, calculated to deceive ordinary consumers.'",
        "recommended_strategy": "Issue Cease & Desist letter demanding immediate stock recall; file commercial suit seeking permanent injunction and rendition of accounts."
    },
    {
        "id": "personal-data-breach-fintech",
        "title": "FinTech Customer Database Leak on Public Cloud",
        "practice_area": "Data Protection and Privacy",
        "facts": "A misconfigured AWS S3 cloud storage bucket exposed 450,000 KYC records (Aadhaar cards, PAN numbers, bank statements) of a lending app to the open internet for 14 days before remediation.",
        "parties": {"Entity": "FastLoan FinTech Ltd", "Regulators": ["Data Protection Board of India", "CERT-In"]},
        "legal_issues": ["Mandatory 6-hour cybersecurity incident reporting to CERT-In", "Reasonable security safeguards under Section 8 DPDP Act 2023", "Civil penalties up to Rs. 250 Crores for failure to prevent personal data breaches"],
        "relevant_skill_ids": ["privacy-legal:dpa-review", "privacy-legal:dsar-response"],
        "fictional_excerpt": "Incident Log: 'Bucket public read policy identified on 10 Oct. Over 450,000 object keys accessed by unknown external IP ranges.'",
        "recommended_strategy": "Formulate immediate incident response notification to CERT-In and Data Protection Board; notify impacted data principals; engage independent forensic auditor."
    },
    {
        "id": "bail-cybercrime-cheating",
        "title": "Anticipatory Bail in Alleged App-Based Investment Scam",
        "practice_area": "Criminal Litigation",
        "facts": "A freelance software developer who wrote front-end UI code for a crypto marketing app is named as co-accused in an FIR alleging multi-crore investment cheating under Section 318 BNS / Section 420 IPC.",
        "parties": {"Applicant": "Vikas Mehra", "Prosecution": "State (EOW Cyber Cell)"},
        "legal_issues": ["Anticipatory Bail under Section 482 BNSS (Section 438 CrPC)", "Knowledge and mens rea: distinguishing bona-fide technical contractor from conspiracy principal", "Section 41A CrPC / Section 35 BNSS notice compliance"],
        "relevant_skill_ids": ["litigation-legal:claim-chart", "litigation-legal:chronology"],
        "fictional_excerpt": "FIR Excerpt: 'All directors, developers, and promoters collaborated in creating deceptive software to defraud investors.'",
        "recommended_strategy": "File Section 482 BNSS application before Sessions Court; produce freelance contract and fixed invoice receipts demonstrating no profit-sharing or control over funds."
    },
    {
        "id": "workplace-posh-inquiry",
        "title": "POSH Workplace Harassment Inquiry & Due Process",
        "practice_area": "Labour and Employment Law",
        "facts": "An employee files a formal complaint alleging inappropriate verbal comments and retaliatory performance appraisal by a senior director. The Internal Committee (IC) convenes an inquiry.",
        "parties": {"Complainant": "Confidential Employee", "Respondent": "Senior Director", "Employer": "Global Tech India Pvt Ltd"},
        "legal_issues": ["Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act 2013 (POSH)", "Timeframe for inquiry completion (90 days)", "Strict confidentiality mandates under Section 16 POSH Act"],
        "relevant_skill_ids": ["employment-legal:internal-investigation", "employment-legal:policy-drafting"],
        "fictional_excerpt": "Notice of Inquiry: 'The Internal Committee has scheduled the preliminary deposition for 24 November 2026 under Section 11 of POSH Act.'",
        "recommended_strategy": "Ensure respondent receives copy of complaint within 7 working days; guarantee fair hearing without legal representation in IC proceedings; draft unbiased inquiry report."
    },
    {
        "id": "construction-contract-arbitration",
        "title": "Highway Construction Delay & Escalation Claims",
        "practice_area": "Arbitration and Mediation",
        "facts": "A national highway EPC contractor faces 18 months delay due to land acquisition and tree-cutting permissions delayed by government authorities. The contractor claims Rs. 14 Crores in idle machinery and prolongation costs.",
        "parties": {"Claimant": "Apex Infrastructure Developers", "Respondent": "State Highways Authority"},
        "legal_issues": ["Arbitration and Conciliation Act 1996 Section 21 notice of invocation", "Applicability of Hudson/Emden formula for overhead calculation", "Time is of the essence in infrastructure contracts"],
        "relevant_skill_ids": ["litigation-legal:chronology", "litigation-legal:claim-chart"],
        "fictional_excerpt": "Clause 26.3 Dispute Resolution: 'All disputes shall be referred to a Sole Arbitrator appointed by mutual consent under Arbitration & Conciliation Act 1996.'",
        "recommended_strategy": "Construct comprehensive prolongation delay schedule; issue formal notice invoking arbitration under Section 21; petition High Court under Section 11(6) if respondent fails to appoint arbitrator."
    },
    {
        "id": "shareholder-oppression-management",
        "title": "Minority Shareholder Oppression & Siphoning in Private Co",
        "practice_area": "Corporate Law",
        "facts": "A 22% minority shareholder in a family-owned engineering firm discovers that promoter directors have transferred profitable export contracts to a newly formed entity owned by their relatives.",
        "parties": {"Petitioner": "Karthik Subramanian (22%)", "Respondents": ["Promoter Directors", "Precision Castings Pvt Ltd"]},
        "legal_issues": ["Petition for Oppression and Mismanagement under Section 241-242 Companies Act 2013", "Fiduciary duties of directors under Section 166", "Interim injunction against asset dissipation"],
        "relevant_skill_ids": ["corporate-legal:tabular-review", "litigation-legal:claim-chart"],
        "fictional_excerpt": "Board Resolution dated 12 Aug: 'Resolved that exclusive export distribution rights be transferred to M/s K.S. Global at cost price.'",
        "recommended_strategy": "Inspect statutory registers and MCA filings; issue requisition for extraordinary general meeting (EGM); file Company Petition before National Company Law Tribunal (NCLT)."
    },
    {
        "id": "ai-vendor-medical-malpractice",
        "title": "Healthcare Diagnostic AI Tool Misclassification Liability",
        "practice_area": "Cyber Law & AI Governance",
        "facts": "A hospital deployed a third-party AI radiology assistant that misclassified an early-stage malignant tumor as benign tissue, delaying critical surgery by six months. The patient sues the hospital and software vendor.",
        "parties": {"Plaintiff": "Patient & Family", "Defendants": ["City Multispecialty Hospital", "RadAI Diagnostics Inc"]},
        "legal_issues": ["Medical negligence standards (Bolam / Jacob Mathew test)", "Product liability vs professional service liability for AI clinical decision support", "Contractual indemnification between hospital and AI vendor"],
        "relevant_skill_ids": ["ai-governance-legal:aia-generation", "commercial-legal:vendor-agreement-review"],
        "fictional_excerpt": "Diagnostic AI Output: 'Lesion confidence 98.4% Benign. No immediate biopsy indicated.' Signed off by radiologist without independent verification.",
        "recommended_strategy": "Review AI procurement agreement for indemnity and warranty carve-outs; examine whether radiologist conducted independent clinical review; prepare joint defence strategy."
    }
]

for item in case_studies_data:
    fname = item["id"] + ".json"
    (CASE_STUDIES_DIR / fname).write_text(json.dumps(item, indent=2), encoding="utf-8")

print(f"Generated {len(overlays_data)} educational overlays, {len(india_overlays_data)} India overlays, {len(workflows_data)} workflows, and {len(case_studies_data)} case studies.")

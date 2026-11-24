#!/usr/bin/env python3
"""
parse_lawyer_prompts.py
Extracts the 100 Indian Legal AI Prompts from docs/Lawyers-BRD2.md
and outputs public/data/lawyer_prompts.json with structured metadata.
"""

import json
import re
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
DOC_PATH = REPO_ROOT / "docs" / "Lawyers-BRD2.md"
OUTPUT_PATH = REPO_ROOT / "public" / "data" / "lawyer_prompts.json"

CATEGORY_RANGES = [
    (1, 7, "Legal Research", "legal-research", ["all", "researcher", "student", "advocate"]),
    (8, 14, "Case Analysis", "case-analysis", ["advocate", "senior-counsel", "student"]),
    (15, 21, "Case Law Summarization", "case-law-summarization", ["senior-counsel", "advocate", "researcher"]),
    (22, 28, "Drafting", "drafting", ["corporate", "in-house", "advocate"]),
    (29, 35, "Litigation", "litigation", ["advocate", "senior-counsel"]),
    (36, 42, "Contracts", "contracts", ["corporate", "in-house"]),
    (43, 49, "Compliance", "compliance", ["compliance", "in-house"]),
    (50, 56, "Due Diligence", "due-diligence", ["corporate", "legal-ops"]),
    (57, 63, "Arbitration", "arbitration", ["senior-counsel", "corporate", "advocate"]),
    (64, 69, "Client Communication", "client-communication", ["in-house", "advocate"]),
    (70, 76, "Court Preparation", "court-preparation", ["advocate", "student"]),
    (77, 82, "Evidence Analysis", "evidence-analysis", ["advocate", "researcher"]),
    (83, 87, "Legal Marketing", "legal-marketing", ["senior-counsel", "legal-ops"]),
    (88, 94, "Law Firm Operations", "law-firm-operations", ["legal-ops", "corporate"]),
    (95, 100, "AI Agents for Lawyers", "ai-agents", ["legal-ops", "in-house", "advocate"])
]

def get_category_info(num: int):
    for start, end, name, slug, personas in CATEGORY_RANGES:
        if start <= num <= end:
            return name, slug, personas
    return "General Practice", "general-practice", ["advocate"]

def clean_text(text: str) -> str:
    if not text:
        return ""
    text = text.strip()
    # Strip wrapping quotes if entire text is in quotes
    if (text.startswith('"') and text.endswith('"')) or (text.startswith("'") and text.endswith("'")):
        text = text[1:-1].strip()
    return text

def parse_prompts():
    print(f"Reading {DOC_PATH}...")
    with open(DOC_PATH, "r", encoding="utf-8") as f:
        text = f.read()

    start_marker = "## PART 2: THE FIRST 100 PREMIUM PROMPTS"
    end_marker = "## **Product Positioning**"

    start_idx = text.find(start_marker)
    end_idx = text.find(end_marker)

    if start_idx == -1 or end_idx == -1:
        raise ValueError("Could not locate Part 2 boundaries in Lawyers-BRD2.md")

    part2_text = text[start_idx:end_idx]

    # Split by prompt headers e.g. "\n1\. "
    # Regex lookahead for start of prompt
    prompt_chunks = re.split(r"\n(?=\d+\\\.\s+)", part2_text)

    parsed_prompts = []

    for chunk in prompt_chunks:
        header_m = re.match(r"^(\d+)\\\.\s+([^\n]+)", chunk.strip())
        if not header_m:
            continue

        num = int(header_m.group(1))
        title = header_m.group(2).strip()

        def extract_field(field_name: str) -> str:
            # Matches "* Field Name: Content" up to next bullet or end of chunk
            pattern = r"\*\s+" + re.escape(field_name) + r":\s*(.*?)(?=\n\*\s+[A-Za-z0-9]|\n\d+\\\.|\n###|\Z)"
            m = re.search(pattern, chunk, re.DOTALL)
            return clean_text(m.group(1)) if m else ""

        practice_area = extract_field("Practice Area")
        use_case = extract_field("Use Case")
        prompt_template = extract_field("Prompt Template")
        example_input = extract_field("Example Input")
        example_output = extract_field("Example Output Structure")
        best_model = extract_field("Best AI Model") or extract_field("Best Model")
        time_savings = extract_field("Expected Time Savings") or extract_field("Time Saved")

        # Normalize model names
        if not best_model:
            best_model = "Claude 3.5 Sonnet"
        elif "Claude" in best_model:
            best_model = best_model.replace("Sonnet", "Sonnet").replace("Opus", "Opus")

        if not time_savings:
            time_savings = "1-2 hours"

        # Extract language variants
        lang_chunk = extract_field("Language Variants")
        hindi_m = re.search(r"\*Hindi:\*\s*\"?(.*?)\"?(?=\s*\*\s*\*|\Z)", lang_chunk, re.DOTALL)
        tamil_m = re.search(r"\*Tamil:\*\s*\"?(.*?)\"?(?=\s*\*\s*\*|\Z)", lang_chunk, re.DOTALL)

        hindi_text = clean_text(hindi_m.group(1)) if hindi_m else ""
        tamil_text = clean_text(tamil_m.group(1)) if tamil_m else ""

        cat_name, cat_slug, personas = get_category_info(num)

        prompt_record = {
            "id": f"lp-{num:03d}",
            "number": num,
            "title": title,
            "category_name": cat_name,
            "category_id": cat_slug,
            "practice_area": practice_area,
            "target_personas": personas,
            "use_case": use_case,
            "prompt_template": prompt_template,
            "example_input": example_input,
            "example_output_structure": example_output,
            "best_ai_model": best_model,
            "expected_time_savings": time_savings,
            "language_variants": {
                "english": prompt_template,
                "hindi": hindi_text,
                "tamil": tamil_text
            }
        }

        parsed_prompts.append(prompt_record)

    # Sort strictly by number
    parsed_prompts.sort(key=lambda p: p["number"])

    print(f"Successfully parsed {len(parsed_prompts)} prompts.")

    # Unique category summaries
    categories_summary = []
    for start, end, name, slug, personas in CATEGORY_RANGES:
        count = sum(1 for p in parsed_prompts if p["category_id"] == slug)
        categories_summary.append({
            "id": slug,
            "name": name,
            "prompt_count": count,
            "target_personas": personas
        })

    payload = {
        "metadata": {
            "title": "Indian Legal AI Prompt Playbook",
            "version": "1.0.0",
            "total_prompts": len(parsed_prompts),
            "jurisdiction": "India (Supreme Court, High Courts, District Courts, Tribunals)",
            "statutory_coverage": ["BNS 2023", "BNSS 2023", "BSA 2023", "DPDP Act 2023", "Companies Act 2013", "Arbitration Act 1996"],
            "supported_languages": ["English", "Hindi", "Tamil"]
        },
        "categories": categories_summary,
        "prompts": parsed_prompts
    }

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2, ensure_ascii=False)

    print(f"Wrote playbook catalogue to {OUTPUT_PATH} ({OUTPUT_PATH.stat().st_size} bytes)")

if __name__ == "__main__":
    parse_prompts()

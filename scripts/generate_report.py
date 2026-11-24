"""
Generates catalogue coverage and audit reports.
"""

import sys
import json
from pathlib import Path
import click

@click.command()
@click.option("--input", "input_file", default="public/data/skills.json", help="Path to skills.json")
@click.option("--output-dir", default="docs/reports", help="Directory for generated reports")
def generate_report(input_file, output_dir):
    in_path = Path(input_file)
    if not in_path.exists():
        click.echo(f"Catalogue {input_file} not found.")
        return
        
    data = json.loads(in_path.read_text(encoding="utf-8"))
    skills = data.get("skills", [])
    
    by_category = {}
    for s in skills:
        cat = s.get("category_id", "unknown")
        by_category.setdefault(cat, []).append(s)
        
    out_dir = Path(output_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    report_file = out_dir / "COVERAGE_REPORT.md"
    
    lines = [
        "# Skills Catalogue Coverage Report",
        f"- Pinned Upstream SHA: `{data.get('source_commit_sha')}`",
        f"- Total Skills: **{len(skills)}**",
        f"- Educational Walkthroughs Ready: **{data.get('educational_ready_count', 0)}**",
        f"- Indian Legal Overlays: **{data.get('india_overlay_count', 0)}**",
        "",
        "## Breakdown by Plugin Category",
        "| Category | Total Skills | Invocation Mode |",
        "|---|---|---|"
    ]
    
    for cat, items in sorted(by_category.items()):
        explicit = sum(1 for i in items if i.get("invocation_type") == "explicit-command")
        auto = len(items) - explicit
        lines.append(f"| `{cat}` | {len(items)} | {explicit} commands, {auto} sub-skills |")
        
    report_file.write_text("\n".join(lines), encoding="utf-8")
    click.echo(f"Wrote coverage report to {report_file}")

if __name__ == "__main__":
    generate_report()

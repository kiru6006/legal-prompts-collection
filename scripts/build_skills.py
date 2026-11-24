"""
Build compiler: discovers upstream skills, attaches educational and Indian overlays,
and outputs canonical public/data/skills.json and manifest.json.
"""

import os
import sys
import json
import yaml
from pathlib import Path
from datetime import datetime, timezone
import click

from upstream import discover_upstream_plugins, discover_upstream_skills
from schema import SkillsCatalogue, SkillRecord, WorkflowRecord, CaseStudyRecord
from validators import validate_skill_record

@click.command()
@click.option("--source", default=".upstream", help="Path to upstream repository")
@click.option("--overlays", default="content/overlays", help="Path to educational overlays")
@click.option("--india", default="content/india", help="Path to Indian legal overlays")
@click.option("--legislation", default="content/legislation", help="Path to legislation")
@click.option("--case-studies", default="content/case-studies", help="Path to case studies")
@click.option("--workflows", default="content/workflows", help="Path to workflows")
@click.option("--learning", default="content/learning", help="Path to learning modules")
@click.option("--glossary", default="content/glossary", help="Path to glossary")
@click.option("--output", default="public/data/skills.json", help="Path to compiled skills.json")
@click.option("--manifest", default="public/data/manifest.json", help="Path to output manifest.json")
def build(source, overlays, india, legislation, case_studies, workflows, learning, glossary, output, manifest):
    click.echo(f"==> Compiling canonical skills catalogue from {source}...")
    source_dir = Path(source)
    
    commit_sha = "4a6c651889c97cc9140580363c73e0eb17379c2b"
    commit_file = source_dir / ".git" / "refs" / "heads" / "main"
    if commit_file.exists():
        commit_sha = commit_file.read_text().strip()
        
    plugins = discover_upstream_plugins(source_dir)
    raw_skills = discover_upstream_skills(source_dir, plugins, commit_sha)
    click.echo(f"Discovered {len(plugins)} plugins and {len(raw_skills)} upstream skills.")
    
    # Load educational overlays
    overlay_dir = Path(overlays)
    overlay_map = {}
    if overlay_dir.exists():
        for ov_file in overlay_dir.glob("*.json"):
            try:
                data = json.loads(ov_file.read_text(encoding="utf-8"))
                overlay_map[data.get("skill_id")] = data
            except Exception as e:
                click.echo(f"Warning: Failed to load overlay {ov_file}: {e}")
                
    # Load India overlays
    india_dir = Path(india)
    india_map = {}
    if india_dir.exists():
        for in_file in india_dir.glob("*.json"):
            try:
                data = json.loads(in_file.read_text(encoding="utf-8"))
                india_map[data.get("skill_id")] = data
            except Exception as e:
                click.echo(f"Warning: Failed to load India overlay {in_file}: {e}")
                
    # Load Workflows
    wf_dir = Path(workflows)
    wf_list = []
    if wf_dir.exists():
        for wf_file in sorted(wf_dir.glob("*.json")):
            try:
                wf_list.append(json.loads(wf_file.read_text(encoding="utf-8")))
            except Exception as e:
                click.echo(f"Warning: Failed to load workflow {wf_file}: {e}")
                
    # Load Case Studies
    cs_dir = Path(case_studies)
    cs_list = []
    if cs_dir.exists():
        for cs_file in sorted(cs_dir.glob("*.json")):
            try:
                cs_list.append(json.loads(cs_file.read_text(encoding="utf-8")))
            except Exception as e:
                click.echo(f"Warning: Failed to load case study {cs_file}: {e}")

    # Merge layers into SkillRecord instances
    final_skills = []
    ready_count = 0
    india_count = 0
    
    for s in raw_skills:
        skill_id = s["id"]
        # Attach educational overlay if present
        if skill_id in overlay_map:
            ov = overlay_map[skill_id]
            s["educational_status"] = ov.get("educational_status", "ready")
            s["educational_overlay"] = ov.get("educational_overlay")
            s["legal_review_status"] = ov.get("legal_review_status", "review-pending")
            ready_count += 1
            
        # Attach India overlay if present
        if skill_id in india_map:
            ind = india_map[skill_id]
            s["india_context"] = ind.get("india_context")
            india_count += 1
            
        final_skills.append(s)

    now_iso = datetime.now(timezone.utc).isoformat()
    first_party = sum(1 for p in plugins if not p.get("is_external"))
    external = len(plugins) - first_party

    catalogue_data = {
        "version": "1.0.0",
        "source_commit_sha": commit_sha,
        "generated_at": now_iso,
        "first_party_plugin_count": first_party,
        "external_plugin_count": external,
        "skill_count": len(final_skills),
        "educational_ready_count": ready_count,
        "india_overlay_count": india_count,
        "skills": final_skills,
        "workflows": wf_list,
        "case_studies": cs_list
    }
    
    # Save outputs
    out_path = Path(output)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(catalogue_data, indent=2), encoding="utf-8")
    click.echo(f"Wrote canonical skills catalogue to {output}")
    
    man_path = Path(manifest)
    man_path.parent.mkdir(parents=True, exist_ok=True)
    manifest_data = {
        "version": "1.0.0",
        "generated_at": now_iso,
        "source_commit_sha": commit_sha,
        "metrics": {
            "plugins": len(plugins),
            "skills": len(final_skills),
            "educational_ready": ready_count,
            "india_overlays": india_count,
            "workflows": len(wf_list),
            "case_studies": len(cs_list)
        }
    }
    man_path.write_text(json.dumps(manifest_data, indent=2), encoding="utf-8")
    click.echo(f"Wrote manifest to {manifest}")

if __name__ == "__main__":
    build()

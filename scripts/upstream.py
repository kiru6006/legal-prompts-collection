"""
Upstream parser for extracting plugins, SKILL.md files, and manifests.
"""

import os
import json
import re
from pathlib import Path
from typing import List, Dict, Any, Optional

def parse_frontmatter(file_content: str) -> tuple[Dict[str, Any], str]:
    """Safely extracts YAML frontmatter and body from markdown without external dependencies."""
    if not file_content.startswith("---"):
        return {}, file_content
    
    parts = file_content.split("---", 2)
    if len(parts) < 3:
        return {}, file_content
    
    fm_raw = parts[1].strip()
    body = parts[2].strip()
    
    # Simple line-by-line YAML parser for frontmatter
    fm: Dict[str, Any] = {}
    current_key = None
    multiline_val = []
    
    for line in fm_raw.splitlines():
        trimmed = line.strip()
        if not trimmed or trimmed.startswith("#"):
            continue
        
        if ":" in line and not line.startswith(" ") and not line.startswith("\t"):
            if current_key and multiline_val:
                fm[current_key] = " ".join(multiline_val).strip()
                multiline_val = []
            
            k, v = line.split(":", 1)
            k = k.strip()
            v = v.strip()
            if v in [">", "|"]:
                current_key = k
                multiline_val = []
            elif v.lower() == "true":
                fm[k] = True
                current_key = None
            elif v.lower() == "false":
                fm[k] = False
                current_key = None
            else:
                # Strip quotes
                if (v.startswith('"') and v.endswith('"')) or (v.startswith("'") and v.endswith("'")):
                    v = v[1:-1]
                fm[k] = v
                current_key = None
        elif current_key:
            multiline_val.append(trimmed)
            
    if current_key and multiline_val:
        fm[current_key] = " ".join(multiline_val).strip()
        
    return fm, body

def discover_upstream_plugins(upstream_dir: Path) -> List[Dict[str, Any]]:
    """Discovers all plugins from plugin.json files."""
    plugin_files = list(upstream_dir.rglob("plugin.json"))
    plugins = []
    
    for p in sorted(plugin_files):
        try:
            with open(p, "r", encoding="utf-8") as f:
                data = json.load(f)
            rel_path = p.relative_to(upstream_dir)
            # category / plugin root
            parent_parts = rel_path.parts
            is_external = "external_plugins" in parent_parts
            category_id = parent_parts[1] if is_external else parent_parts[0]
            
            plugins.append({
                "plugin_id": data.get("name", category_id),
                "category_id": category_id,
                "version": data.get("version", "1.0.0"),
                "description": data.get("description", ""),
                "is_external": is_external,
                "path": str(rel_path.parent.parent if rel_path.name == "plugin.json" and rel_path.parent.name == ".claude-plugin" else rel_path.parent)
            })
        except Exception as e:
            print(f"Warning: Failed to read {p}: {e}")
            
    return plugins

def discover_upstream_skills(upstream_dir: Path, plugins: List[Dict[str, Any]], commit_sha: str) -> List[Dict[str, Any]]:
    """Scans for all SKILL.md files and parses metadata."""
    skill_files = list(upstream_dir.rglob("SKILL.md"))
    skills = []
    
    plugin_map = {p["category_id"]: p for p in plugins}
    
    for s in sorted(skill_files):
        rel_path = s.relative_to(upstream_dir)
        parts = rel_path.parts
        is_external = "external_plugins" in parts
        category_id = parts[1] if is_external else parts[0]
        skill_slug = parts[-2] if len(parts) >= 2 and parts[-1] == "SKILL.md" else parts[0]
        
        try:
            content = s.read_text(encoding="utf-8")
        except Exception:
            continue
            
        fm, body = parse_frontmatter(content)
        official_name = fm.get("name", skill_slug)
        user_invocable = fm.get("user-invocable", True)
        argument_hint = fm.get("argument-hint", "")
        
        # Determine invocation command
        official_cmd = None
        if user_invocable:
            official_cmd = f"/{category_id}:{official_name}"
            invoc_type = "explicit-command"
        else:
            invoc_type = "automatic"
            
        # Detect requirements from instructions
        matter_required = "matter-workspace" in body.lower() or "active matter" in body.lower()
        cold_start_required = "cold-start-interview" in body.lower() or "playbook" in body.lower()
        
        clean_title = official_name.replace("-", " ").title()
        
        skills.append({
            "id": f"{category_id}:{official_name}",
            "slug": official_name,
            "plugin_id": category_id,
            "category_id": category_id,
            "category_name": category_id.replace("-", " ").title(),
            "official_name": official_name,
            "display_name": clean_title,
            "description": fm.get("description", f"Official {clean_title} skill from {category_id}."),
            "source_type": "external" if is_external else "first-party",
            "record_type": "skill" if user_invocable else "sub-skill",
            "invocation_type": invoc_type,
            "official_command": official_cmd,
            "argument_hint": argument_hint if argument_hint else None,
            "supported_environments": ["Claude Chat", "Claude Code"],
            "prerequisites": ["Practice Profile Setup"] if cold_start_required else [],
            "practice_profile_required": cold_start_required,
            "matter_workspace_required": matter_required,
            "official_instructions": body[:1200],  # Concise excerpt
            "source_path": str(rel_path),
            "source_commit_sha": commit_sha,
            "licence": "Apache-2.0"
        })
        
    return skills

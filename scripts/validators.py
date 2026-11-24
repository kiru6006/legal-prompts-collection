"""
Validation logic for content overlays, variable references, and integrity.
"""

import re
from typing import List, Dict, Any, Tuple

VARIABLE_REGEX = re.compile(r"\{\{([A-Z0-9_]+)\}\}")

def validate_prompt_template(template: str, declared_variables: List[Dict[str, Any]]) -> Tuple[bool, List[str]]:
    """Validates that all {{VAR}} references in template match declared variables."""
    errors = []
    used_vars = set(VARIABLE_REGEX.findall(template))
    declared_keys = {v["key"] for v in declared_variables}
    
    # Missing declarations
    missing = used_vars - declared_keys
    if missing:
        errors.append(f"Prompt template references undeclared variables: {missing}")
        
    # Unused declared variables
    unused = declared_keys - used_vars
    if unused:
        errors.append(f"Declared variables not referenced in template: {unused}")
        
    return len(errors) == 0, errors

def validate_skill_record(skill: Dict[str, Any]) -> Tuple[bool, List[str]]:
    """Validates an aggregated skill record."""
    errors = []
    if not skill.get("id"):
        errors.append("Skill missing required 'id'")
    if not skill.get("official_name"):
        errors.append("Skill missing 'official_name'")
        
    status = skill.get("educational_status")
    if status == "ready":
        overlay = skill.get("educational_overlay")
        if not overlay:
            errors.append(f"Skill {skill.get('id')} has status 'ready' but no educational_overlay")
        else:
            if not overlay.get("prompt_template"):
                errors.append(f"Skill {skill.get('id')} marked 'ready' has empty prompt_template")
            if not overlay.get("fictional_scenario"):
                errors.append(f"Skill {skill.get('id')} marked 'ready' has empty fictional_scenario")
                
    return len(errors) == 0, errors

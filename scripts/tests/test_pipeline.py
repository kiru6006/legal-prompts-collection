"""
Pytest unit tests for schema, validation, and parsing logic.
"""

import pytest
from schema import SkillRecord, VariableSchema, EducationalOverlay
from validators import validate_prompt_template, validate_skill_record

def test_variable_schema_validation():
    var = VariableSchema(key="CLIENT_ROLE", label="Party Role", type="select", options=["Claimant", "Respondent"])
    assert var.key == "CLIENT_ROLE"
    assert var.type == "select"

def test_prompt_template_matching():
    template = "Act as counsel for {{CLIENT_ROLE}} under {{GOVERNING_LAW}}."
    declared = [
        {"key": "CLIENT_ROLE", "label": "Client Role"},
        {"key": "GOVERNING_LAW", "label": "Governing Law"}
    ]
    ok, errors = validate_prompt_template(template, declared)
    assert ok is True
    assert len(errors) == 0

def test_prompt_template_missing_variable():
    template = "Act as counsel for {{CLIENT_ROLE}} under {{GOVERNING_LAW}}."
    declared = [{"key": "CLIENT_ROLE", "label": "Client Role"}]
    ok, errors = validate_prompt_template(template, declared)
    assert ok is False
    assert any("GOVERNING_LAW" in e for e in errors)

def test_skill_record_validation():
    skill = {
        "id": "commercial-legal:review",
        "official_name": "review",
        "educational_status": "catalogue-only"
    }
    ok, errors = validate_skill_record(skill)
    assert ok is True

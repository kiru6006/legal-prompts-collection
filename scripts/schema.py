"""
Pydantic v2 Canonical Schemas for Claude Legal Skills Workbench.
"""

from typing import List, Optional, Dict, Any, Literal
from pydantic import BaseModel, Field

EducationalStatus = Literal["catalogue-only", "draft", "ready", "needs-update"]
LegalReviewStatus = Literal["not-reviewed", "review-pending", "reviewed", "needs-revalidation"]
SourceType = Literal["first-party", "external", "educational", "indian-adaptation"]
InvocationType = Literal["explicit-command", "automatic", "scheduled", "managed", "unknown"]
VariableType = Literal["text", "textarea", "select", "multiselect", "number", "date", "boolean"]

class VariableSchema(BaseModel):
    key: str
    label: str
    type: VariableType = "text"
    required: bool = True
    default: Any = ""
    description: Optional[str] = None
    options: Optional[List[str]] = None

class PeasSchema(BaseModel):
    performance: str = ""
    environment: str = ""
    actuators: str = ""
    sensors: str = ""

class IndianLegalContext(BaseModel):
    supported_jurisdictions: List[str] = Field(default_factory=lambda: ["India"])
    legislation_ids: List[str] = Field(default_factory=list)
    procedural_notes: str = ""
    transitional_notes: str = ""
    verification_requirements: List[str] = Field(default_factory=list)

class EducationalOverlay(BaseModel):
    purpose: str = ""
    when_to_use: str = ""
    when_not_to_use: str = ""
    target_personas: List[str] = Field(default_factory=list)
    difficulty: Literal["beginner", "intermediate", "advanced"] = "intermediate"
    estimated_minutes: int = 15
    variables: List[VariableSchema] = Field(default_factory=list)
    prompt_template: str = ""
    fictional_scenario: str = ""
    sample_case_input: str = ""
    sample_output: str = ""
    output_type: str = "structured-memo"
    guardrails: List[str] = Field(default_factory=list)
    verification_checklist: List[str] = Field(default_factory=list)
    peas: Optional[PeasSchema] = None
    ai_risk_warning: str = ""

class SkillRecord(BaseModel):
    id: str
    slug: str
    plugin_id: str
    category_id: str
    category_name: str
    official_name: str
    display_name: str
    description: str
    source_type: SourceType = "first-party"
    record_type: Literal["skill", "agent", "sub-skill"] = "skill"
    
    # Official Execution Metadata
    invocation_type: InvocationType = "unknown"
    official_command: Optional[str] = None
    argument_hint: Optional[str] = None
    supported_environments: List[str] = Field(default_factory=lambda: ["Claude Chat", "Claude Code"])
    prerequisites: List[str] = Field(default_factory=list)
    required_connectors: List[str] = Field(default_factory=list)
    optional_connectors: List[str] = Field(default_factory=list)
    practice_profile_required: bool = False
    matter_workspace_required: bool = False
    official_instructions: str = ""
    
    # Educational Content
    educational_status: EducationalStatus = "catalogue-only"
    educational_overlay: Optional[EducationalOverlay] = None
    
    # Indian Legal Adaptation
    india_context: Optional[IndianLegalContext] = None
    
    # Provenance
    source_repository: str = "https://github.com/anthropics/claude-for-legal"
    source_path: str = ""
    source_commit_sha: str = ""
    licence: str = "Apache-2.0"
    legal_review_status: LegalReviewStatus = "not-reviewed"
    related_skill_ids: List[str] = Field(default_factory=list)
    workflow_ids: List[str] = Field(default_factory=list)
    case_study_ids: List[str] = Field(default_factory=list)

class WorkflowStep(BaseModel):
    step_number: int
    title: str
    objective: str
    linked_skill_id: Optional[str] = None
    required_inputs: List[str] = Field(default_factory=list)
    prompt_guidance: str = ""
    expected_output: str = ""
    verification_gate: str = ""

class WorkflowRecord(BaseModel):
    id: str
    title: str
    category: str
    description: str
    difficulty: str = "intermediate"
    steps: List[WorkflowStep] = Field(default_factory=list)
    practice_area: str = "General"

class CaseStudyRecord(BaseModel):
    id: str
    title: str
    practice_area: str
    facts: str
    parties: Dict[str, Any] = Field(default_factory=dict)
    legal_issues: List[str] = Field(default_factory=list)
    relevant_skill_ids: List[str] = Field(default_factory=list)
    chronology: List[Dict[str, Any]] = Field(default_factory=list)
    fictional_excerpt: str = ""
    recommended_strategy: str = ""

class SkillsCatalogue(BaseModel):
    version: str = "1.0.0"
    source_commit_sha: str = ""
    generated_at: str = ""
    first_party_plugin_count: int = 0
    external_plugin_count: int = 0
    skill_count: int = 0
    educational_ready_count: int = 0
    india_overlay_count: int = 0
    skills: List[SkillRecord] = Field(default_factory=list)
    workflows: List[WorkflowRecord] = Field(default_factory=list)
    case_studies: List[CaseStudyRecord] = Field(default_factory=list)

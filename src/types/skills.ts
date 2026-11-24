export type EducationalStatus = 'catalogue-only' | 'draft' | 'ready' | 'needs-update';
export type LegalReviewStatus = 'not-reviewed' | 'review-pending' | 'reviewed' | 'needs-revalidation';
export type SourceType = 'first-party' | 'external' | 'educational' | 'indian-adaptation';
export type InvocationType = 'explicit-command' | 'automatic' | 'scheduled' | 'managed' | 'unknown';
export type VariableType = 'text' | 'textarea' | 'select' | 'multiselect' | 'number' | 'date' | 'boolean';

export interface VariableSchema {
  key: string;
  label: string;
  type: VariableType;
  required: boolean;
  default: any;
  description?: string;
  options?: string[];
}

export interface PeasSchema {
  performance: string;
  environment: string;
  actuators: string;
  sensors: string;
}

export interface IndianLegalContext {
  supported_jurisdictions: string[];
  legislation_ids: string[];
  procedural_notes: string;
  transitional_notes: string;
  verification_requirements: string[];
}

export interface EducationalOverlay {
  purpose: string;
  when_to_use: string;
  when_not_to_use: string;
  target_personas: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimated_minutes: number;
  variables: VariableSchema[];
  prompt_template: string;
  fictional_scenario: string;
  sample_case_input?: string;
  sample_output?: string;
  output_type: string;
  guardrails: string[];
  verification_checklist: string[];
  peas?: PeasSchema;
  ai_risk_warning?: string;
}

export interface SkillRecord {
  id: string;
  slug: string;
  plugin_id: string;
  category_id: string;
  category_name: string;
  official_name: string;
  display_name: string;
  description: string;
  source_type: SourceType;
  record_type: 'skill' | 'agent' | 'sub-skill';
  
  invocation_type: InvocationType;
  official_command?: string | null;
  argument_hint?: string | null;
  supported_environments: string[];
  prerequisites: string[];
  required_connectors: string[];
  optional_connectors: string[];
  practice_profile_required: boolean;
  matter_workspace_required: boolean;
  official_instructions: string;
  
  educational_status: EducationalStatus;
  educational_overlay?: EducationalOverlay | null;
  
  india_context?: IndianLegalContext | null;
  
  source_repository: string;
  source_path: string;
  source_commit_sha: string;
  licence: string;
  legal_review_status: LegalReviewStatus;
  related_skill_ids: string[];
  workflow_ids: string[];
  case_study_ids: string[];
}

export interface WorkflowStep {
  step_number: number;
  title: string;
  objective: string;
  linked_skill_id?: string | null;
  required_inputs: string[];
  prompt_guidance: string;
  expected_output: string;
  verification_gate: string;
}

export interface WorkflowRecord {
  id: string;
  title: string;
  category: string;
  practice_area: string;
  description: string;
  difficulty: string;
  steps: WorkflowStep[];
}

export interface CaseStudyRecord {
  id: string;
  title: string;
  practice_area: string;
  facts: string;
  parties: Record<string, any>;
  legal_issues: string[];
  relevant_skill_ids: string[];
  chronology?: Array<Record<string, any>>;
  fictional_excerpt?: string;
  recommended_strategy?: string;
}

export interface SkillsCatalogue {
  version: string;
  source_commit_sha: string;
  generated_at: string;
  first_party_plugin_count: number;
  external_plugin_count: number;
  skill_count: number;
  educational_ready_count: number;
  india_overlay_count: number;
  skills: SkillRecord[];
  workflows: WorkflowRecord[];
  case_studies: CaseStudyRecord[];
}

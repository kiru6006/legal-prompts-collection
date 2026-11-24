export interface LanguageVariants {
  english: string;
  hindi?: string;
  tamil?: string;
}

export interface LawyerPrompt {
  id: string; // e.g. "lp-001"
  number: number;
  title: string;
  category_name: string;
  category_id: string;
  practice_area: string;
  target_personas: string[];
  use_case: string;
  prompt_template: string;
  example_input: string;
  example_output_structure: string;
  best_ai_model: string;
  expected_time_savings: string;
  language_variants: LanguageVariants;
}

export interface PlaybookCategory {
  id: string;
  name: string;
  prompt_count: number;
  target_personas: string[];
}

export interface LawyerPlaybookData {
  metadata: {
    title: string;
    version: string;
    total_prompts: number;
    jurisdiction: string;
    statutory_coverage: string[];
    supported_languages: string[];
  };
  categories: PlaybookCategory[];
  prompts: LawyerPrompt[];
}

export interface ContactInfo {
  name: string; // Firma / Name Kunde
  address: string;
  phone: string;
  email: string;
  website: string;
  social_media: string;
}

export type ProductType = 'phone-agent' | 'chatbot' | 'website' | '';

export interface OnboardingData {
  // Product selection
  selected_product: ProductType;
  
  // Hero
  hero_identity: string | string[];
  hero_simplicity: string;
  
  // Problem
  problem_pain: string | string[];
  problem_trigger: string | string[];
  problem_failed: string;
  
  // Solution
  solution_speed: string;
  
  // Product-specific fields - Phone Agent
  phone_agent_calls_per_week: string;
  phone_agent_peak_times: string | string[];
  phone_agent_common_questions: string;
  phone_agent_current_setup: string;
  phone_agent_expected_outcomes: string | string[];
  phone_agent_integration: string;
  
  // Product-specific fields - Chatbot
  chatbot_onboarding_duration: string;
  chatbot_new_employees_per_year: string;
  chatbot_onboarding_topics: string;
  chatbot_current_onboarding: string;
  chatbot_onboarding_challenges: string | string[];
  chatbot_expected_benefits: string | string[];
  
  // Product-specific fields - Website
  website_type: string;
  website_goals: string | string[];
  website_target_audience: string;
  website_current_online_presence: string;
  
  // Proof
  proof_story: string;
  proof_objection: string | string[];
}

export interface AnalysisResult {
  summary: string;
  avatar_psychogram: string[];
  big_idea_hook: string;
  unique_mechanism_name: string;
  story_arc: {
    problem: string;
    failed_way: string;
    discovery: string;
    new_life: string;
  };
  emotional_triggers: string[];
  copywriter_notes: string;
}

export enum AppStep {
  PRODUCTS = 'PRODUCTS',
  INTRO = 'INTRO',
  CONTACT = 'CONTACT',
  FORM = 'FORM',
  ANALYSIS = 'ANALYSIS',
  RESULT = 'RESULT'
}

export interface QuestionConfig {
  id: keyof OnboardingData;
  label: string;
  context?: string;
  category: string;
  goal: string;
  placeholder?: string;
  type: 'text' | 'multiple-choice';
  options?: string[];
  multiple?: boolean; // Erlaubt mehrere Auswahlen
  productFilter?: ProductType[]; // Nur für bestimmte Produkte anzeigen
}
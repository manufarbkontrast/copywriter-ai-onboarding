/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_N8N_WEBHOOK_URL: string;
  readonly VITE_N8N_CHATBOT_WEBHOOK_URL?: string; // Optional, for chatbot integration
  readonly VITE_GEMINI_API_KEY?: string; // Optional, as Gemini is removed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}


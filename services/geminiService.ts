import { GoogleGenAI, Type, Schema } from "@google/genai";
import { OnboardingData, AnalysisResult } from "../types";

const SYSTEM_INSTRUCTION = `
# ROLLE:
Du bist ein Weltklasse-Conversion-Strategie-Berater von Force4Good. 
Deine Aufgabe ist es, rohe Antworten aus einem Kunden-Onboarding zu 
analysieren und daraus ein präzises "Marketing-Psychologie-Profil" 
zu erstellen.

# DEINE AUFGABE:
Analysiere die Input-Daten tiefenpsychologisch. Suche nach Mustern. 
Ignoriere leere Phrasen und extrahiere die wahre Motivation. 
Erstelle daraus Strategie-Bausteine für eine Landingpage.

Halte dich strikt an das JSON Schema.
`;

const RESPONSE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "Eine knackige 2-Sätze-Zusammenfassung, worum es bei diesem Business geht.",
    },
    avatar_psychogram: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Der mentale Zustand des Kunden VOR dem Kauf in 3 Stichpunkten (Ängste, falsche Glaubenssätze, externer Druck).",
    },
    big_idea_hook: {
      type: Type.STRING,
      description: "Eine 'Big Idea' Headline im Format: 'Wie man [Traumergebnis] erreicht, ohne [Hass-Sache], selbst wenn [Einwand].'",
    },
    unique_mechanism_name: {
      type: Type.STRING,
      description: "Ein sexy Marketing-Name für den Prozess oder die Lösung (z.B. 'Die 3-Phasen Neuro-Methode').",
    },
    story_arc: {
      type: Type.OBJECT,
      properties: {
        problem: { type: Type.STRING, description: "Der Auslöser/Das Problem" },
        failed_way: { type: Type.STRING, description: "Der falsche Weg/Warum bisheriges scheiterte" },
        discovery: { type: Type.STRING, description: "Die Entdeckung/Der Mechanismus" },
        new_life: { type: Type.STRING, description: "Das neue Leben/Status-Gewinn" },
      },
      required: ["problem", "failed_way", "discovery", "new_life"],
    },
    emotional_triggers: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Welche 2 Cialdini-Prinzipien sind hier am stärksten anwendbar und wie?",
    },
    copywriter_notes: {
      type: Type.STRING,
      description: "Wo war der Kunde unklar? Welche Fragen muss das Force4Good Team im Kick-off-Call noch stellen?",
    },
  },
  required: ["summary", "avatar_psychogram", "big_idea_hook", "unique_mechanism_name", "story_arc", "emotional_triggers", "copywriter_notes"],
};

export const generateMarketingProfile = async (data: OnboardingData): Promise<AnalysisResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API-Schlüssel fehlt in den Umgebungsvariablen.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    # INPUT DATEN (Vom Kunden):
    1. Zielgruppe & Identity: ${data.hero_identity}
    2. Einfache Erklärung (Kind): ${data.hero_simplicity}
    3. Status-Gewinn: ${data.hero_status}
    4. Schlafloser Gedanke (Pain): ${data.problem_pain}
    5. Trigger-Event: ${data.problem_trigger}
    6. Gescheiterte Versuche: ${data.problem_failed}
    7. Die 3 Schritte (Plan): ${data.solution_steps}
    8. Secret Sauce (Mechanismus): ${data.solution_mechanism}
    9. Time-to-Value: ${data.solution_speed}
    10. Social Proof Story: ${data.proof_story}
    11. Harte Fakten/Zahlen: ${data.proof_stats}
    12. Einwände: ${data.proof_objection}
    13. Worst-Case: ${data.cta_scarcity}
    14. Risiko-Senkung: ${data.cta_risk}
    
    Analysiere diese Daten jetzt.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
      },
    });

    const text = response.text;
    if (!text) throw new Error("Keine Antwort von der KI erhalten.");

    return JSON.parse(text) as AnalysisResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
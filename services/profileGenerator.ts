import { OnboardingData, AnalysisResult } from '../types';

export const generateProfileFromAnswers = (data: OnboardingData): AnalysisResult => {
  // Generiere das Profil direkt aus den Antworten ohne KI
  const summary = `${data.hero_identity}. ${data.hero_simplicity}`;

  const avatar_psychogram = [
    data.problem_pain || "Kunde hat spezifische Herausforderungen",
    data.problem_trigger || "Bestimmtes Ereignis hat zum Handeln geführt",
    data.problem_failed || "Vorherige Lösungsversuche waren nicht erfolgreich"
  ].filter(item => item && item !== "Kunde hat spezifische Herausforderungen" && item !== "Bestimmtes Ereignis hat zum Handeln geführt" && item !== "Vorherige Lösungsversuche waren nicht erfolgreich");

  const big_idea_hook = data.hero_identity || "Ihr Wertversprechen";

  const unique_mechanism_name = data.solution_mechanism || "Ihre einzigartige Methode";

  const story_arc = {
    problem: data.problem_pain || "Das Problem",
    failed_way: data.problem_failed || "Warum bisherige Lösungen gescheitert sind",
    discovery: data.solution_mechanism || "Ihre Lösung",
    new_life: data.hero_status || "Das Ergebnis für den Kunden"
  };

  const emotional_triggers = [
    data.proof_stats ? `Autorität: ${data.proof_stats}` : null,
    data.proof_story ? `Sozialer Beweis: ${data.proof_story.substring(0, 100)}...` : null,
    data.cta_scarcity ? `Verlustangst: ${data.cta_scarcity}` : null,
    data.cta_risk ? `Risikoreduzierung: ${data.cta_risk}` : null
  ].filter((item): item is string => item !== null);

  const copywriter_notes = `
    Wertversprechen: ${data.hero_identity || "Nicht ausgefüllt"}
    Einfache Erklärung: ${data.hero_simplicity || "Nicht ausgefüllt"}
    Status-Gewinn: ${data.hero_status || "Nicht ausgefüllt"}
    Lösungsschritte: ${data.solution_steps || "Nicht ausgefüllt"}
    Erste Ergebnisse: ${data.solution_speed || "Nicht ausgefüllt"}
    Erfolgsgeschichte: ${data.proof_story || "Nicht ausgefüllt"}
    Einwände: ${data.proof_objection || "Nicht ausgefüllt"}
    Erster Schritt: ${data.cta_action || "Nicht ausgefüllt"}
  `.trim();

  return {
    summary,
    avatar_psychogram,
    big_idea_hook,
    unique_mechanism_name,
    story_arc,
    emotional_triggers,
    copywriter_notes
  };
};




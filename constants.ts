import { QuestionConfig, OnboardingData, ContactInfo, ProductType } from "./types";

export const INITIAL_CONTACT_DATA: ContactInfo = {
  name: "",
  address: "",
  phone: "",
  email: "",
  website: "",
  social_media: ""
};

export const INITIAL_DATA: OnboardingData = {
  selected_product: "",
  hero_identity: "",
  hero_simplicity: "",
  problem_pain: [],
  problem_trigger: [],
  problem_failed: "",
  solution_speed: "",
  phone_agent_calls_per_week: "",
  phone_agent_peak_times: [],
  phone_agent_common_questions: "",
  phone_agent_current_setup: "",
  phone_agent_expected_outcomes: [],
  phone_agent_integration: "",
  chatbot_onboarding_duration: "",
  chatbot_new_employees_per_year: "",
  chatbot_onboarding_topics: "",
  chatbot_current_onboarding: "",
  chatbot_onboarding_challenges: [],
  chatbot_expected_benefits: [],
  website_type: "",
  website_goals: [],
  website_target_audience: "",
  website_current_online_presence: "",
  proof_story: "",
  proof_objection: []
};

export const QUESTIONS: QuestionConfig[] = [
  // 1. UNTERNEHMEN & KONTEXT
  {
    id: "hero_identity",
    category: "1. Unternehmen",
    label: "In welcher Branche sind Sie tätig?",
    goal: "Branche",
    type: "multiple-choice",
    options: [
      "Physiotherapie",
      "Friseur",
      "Immobilien",
      "Automobil",
      "Andere Branche"
    ]
  },
  {
    id: "hero_simplicity",
    category: "1. Unternehmen",
    label: "Wie groß ist Ihr Unternehmen?",
    goal: "Unternehmensgröße",
    type: "multiple-choice",
    options: [
      "Einzelunternehmer / Freelancer",
      "2-10 Mitarbeiter",
      "11-50 Mitarbeiter",
      "51-200 Mitarbeiter",
      "200+ Mitarbeiter"
    ]
  },
  // 2. PRODUKT-SPEZIFISCHE FRAGEN (am Anfang)
  {
    id: "phone_agent_calls_per_week",
    category: "2. Produkt-spezifisch",
    label: "Wie viele Telefonate erhalten Sie durchschnittlich pro Woche?",
    goal: "Anrufvolumen",
    type: "multiple-choice",
    productFilter: ['phone-agent'],
    options: [
      "Weniger als 10 Anrufe",
      "10-50 Anrufe",
      "50-200 Anrufe",
      "200-500 Anrufe",
      "Mehr als 500 Anrufe",
      "Weiß ich nicht genau"
    ]
  },
  {
    id: "chatbot_onboarding_duration",
    category: "2. Produkt-spezifisch",
    label: "Wie lange dauert das Onboarding für neue Mitarbeiter normalerweise?",
    goal: "Onboarding-Dauer",
    type: "multiple-choice",
    productFilter: ['chatbot'],
    options: [
      "Weniger als 1 Woche",
      "1-2 Wochen",
      "2-4 Wochen",
      "1-2 Monate",
      "Länger als 2 Monate",
      "Variiert stark"
    ]
  },
  {
    id: "website_type",
    category: "2. Produkt-spezifisch",
    label: "Welche Art von Website benötigen Sie und wie ist Ihre aktuelle Situation?",
    goal: "Website-Bedarf",
    type: "multiple-choice",
    productFilter: ['website'],
    options: [
      "Neue Website von Grund auf erstellen",
      "Bestehende Website überarbeiten / Relaunch",
      "E-Commerce Shop aufbauen",
      "Landingpage / One-Page Website",
      "Corporate Website mit mehreren Seiten",
      "Andere Anforderung"
    ]
  },
  {
    id: "problem_pain",
    category: "2. Herausforderung",
    label: "Was ist Ihre größte Herausforderung beim Kundenservice per Telefon?",
    goal: "Hauptproblem",
    type: "multiple-choice",
    multiple: true,
    productFilter: ['phone-agent'],
    options: [
      "Verpasste Anrufe außerhalb der Geschäftszeiten",
      "Hohe Personalkosten für Call-Center",
      "Inkonsistente Qualität der Kundenbetreuung",
      "Überlastung der Mitarbeiter bei Spitzenzeiten",
      "Lange Wartezeiten für Kunden",
      "Andere Herausforderung"
    ]
  },
  {
    id: "problem_pain",
    category: "2. Herausforderung",
    label: "Was ist Ihre größte Herausforderung beim Mitarbeiter-Onboarding?",
    goal: "Hauptproblem",
    type: "multiple-choice",
    multiple: true,
    productFilter: ['chatbot'],
    options: [
      "Zu zeitaufwändig für HR-Abteilungen",
      "Inkonsistente Informationen für neue Mitarbeiter",
      "Neue Mitarbeiter fühlen sich überfordert",
      "Wichtige Informationen gehen verloren",
      "Schwer skalierbar bei vielen Neueinstellungen",
      "Andere Herausforderung"
    ]
  },
  {
    id: "problem_pain",
    category: "2. Herausforderung",
    label: "Was ist Ihre größte Herausforderung bei Ihrer Online-Präsenz?",
    goal: "Hauptproblem",
    type: "multiple-choice",
    multiple: true,
    productFilter: ['website'],
    options: [
      "Fehlende oder veraltete Website",
      "Hohe Kosten für Webentwicklung",
      "Lange Entwicklungszeiten",
      "Technische Komplexität ohne Expertenwissen",
      "Schlechte Auffindbarkeit in Suchmaschinen",
      "Andere Herausforderung"
    ]
  },
  {
    id: "problem_trigger",
    category: "2. Herausforderung",
    label: "Was hat Sie dazu gebracht, sich für KI-Lösungen zu interessieren?",
    goal: "Auslöser",
    type: "multiple-choice",
    multiple: true,
    options: [
      "Wachstum erfordert Automatisierung",
      "Kosten müssen reduziert werden",
      "Wettbewerber nutzen bereits KI",
      "Neues Projekt erfordert Innovation",
      "Aktuelle Prozesse funktionieren nicht mehr",
      "Strategische Entscheidung für Zukunft",
      "Anderer Grund"
    ]
  },
  {
    id: "problem_failed",
    category: "2. Herausforderung",
    label: "Haben Sie bereits KI-Lösungen oder Automatisierung ausprobiert?",
    goal: "Bisherige Versuche",
    type: "multiple-choice",
    options: [
      "Noch keine Erfahrung mit KI",
      "Einzelne Tools getestet, aber nicht zufrieden",
      "Eigene Lösung entwickelt, aber zu komplex",
      "Externe Agentur beauftragt, aber zu teuer",
      "KI bereits erfolgreich im Einsatz",
      "Andere Erfahrung"
    ]
  },

  // 3. WEITERE ALLGEMEINE FRAGEN
  {
    id: "solution_speed",
    category: "3. Erwartungen",
    label: "Wie schnell soll die Lösung einsatzbereit sein?",
    goal: "Zeitrahmen",
    type: "multiple-choice",
    options: [
      "Sofort / Innerhalb 1 Woche",
      "Innerhalb 1 Monat",
      "Innerhalb 2-3 Monaten",
      "Längerfristig (3+ Monate)",
      "Noch kein konkreter Zeitplan"
    ]
  },

  // 4. PROOF & ERFAHRUNG
  {
    id: "proof_story",
    category: "4. Kontext",
    label: "Beschreib dein Problem das wir mit KI lösen sollen",
    goal: "Problem",
    type: "text",
    placeholder: "Beschreibe konkret, welches Problem du hast und wie KI dabei helfen könnte..."
  },

  // 5. PRODUKT-SPEZIFISCHE ZUSATZFRAGEN
  {
    id: "phone_agent_peak_times",
    category: "5. Produkt-spezifisch",
    label: "Zu welchen Zeiten erhalten Sie die meisten Anrufe?",
    goal: "Spitzenzeiten",
    type: "multiple-choice",
    multiple: true,
    productFilter: ['phone-agent'],
    options: [
      "Vormittags (9-12 Uhr)",
      "Mittags (12-14 Uhr)",
      "Nachmittags (14-18 Uhr)",
      "Abends (18-20 Uhr)",
      "Wochenenden",
      "Gleichmäßig über den Tag verteilt"
    ]
  },
  {
    id: "phone_agent_common_questions",
    category: "5. Produkt-spezifisch",
    label: "Welche Fragen werden am häufigsten gestellt?",
    goal: "Häufige Fragen",
    type: "text",
    productFilter: ['phone-agent'],
    placeholder: "z.B. Öffnungszeiten, Preise, Terminvereinbarung, Standort..."
  },
  {
    id: "phone_agent_current_setup",
    category: "5. Produkt-spezifisch",
    label: "Wie werden Anrufe aktuell bearbeitet?",
    goal: "Aktueller Prozess",
    type: "multiple-choice",
    productFilter: ['phone-agent'],
    options: [
      "Nur während Geschäftszeiten",
      "Anrufbeantworter außerhalb der Zeiten",
      "Mitarbeiter bearbeiten alle Anrufe",
      "Externes Call-Center",
      "Keine strukturierte Lösung",
      "Andere Lösung"
    ]
  },
  {
    id: "phone_agent_expected_outcomes",
    category: "5. Produkt-spezifisch",
    label: "Was soll der KI-Telefonagent erreichen?",
    goal: "Erwartete Ergebnisse",
    type: "multiple-choice",
    multiple: true,
    productFilter: ['phone-agent'],
    options: [
      "24/7 Erreichbarkeit",
      "Terminvereinbarungen automatisieren",
      "Häufige Fragen automatisch beantworten",
      "Kosten reduzieren",
      "Kundenzufriedenheit steigern",
      "Mehr Zeit für wichtige Aufgaben"
    ]
  },
  {
    id: "phone_agent_integration",
    category: "5. Produkt-spezifisch",
    label: "Mit welchen Systemen wird momentan gearbeitet?",
    goal: "Aktuelle Systeme",
    type: "text",
    productFilter: ['phone-agent'],
    placeholder: "z.B. Kalendersystem, CRM, Buchungssystem..."
  },
  {
    id: "chatbot_new_employees_per_year",
    category: "5. Produkt-spezifisch",
    label: "Wie viele neue Mitarbeiter stellen Sie durchschnittlich pro Jahr ein?",
    goal: "Einstellungsvolumen",
    type: "multiple-choice",
    productFilter: ['chatbot'],
    options: [
      "Weniger als 5",
      "5-10",
      "10-20",
      "20-50",
      "Mehr als 50",
      "Variiert stark"
    ]
  },
  {
    id: "chatbot_onboarding_topics",
    category: "5. Produkt-spezifisch",
    label: "Welche Themen müssen neue Mitarbeiter beim Onboarding lernen?",
    goal: "Onboarding-Themen",
    type: "text",
    productFilter: ['chatbot'],
    placeholder: "z.B. Unternehmensrichtlinien, Software-Nutzung, Prozesse, Produktwissen..."
  },
  {
    id: "chatbot_current_onboarding",
    category: "5. Produkt-spezifisch",
    label: "Wie läuft das Onboarding aktuell ab?",
    goal: "Aktueller Prozess",
    type: "multiple-choice",
    productFilter: ['chatbot'],
    options: [
      "Persönlich durch HR/Mitarbeiter",
      "Durch Dokumente/Handbücher",
      "Videos und Online-Materialien",
      "Kombination aus verschiedenen Methoden",
      "Keine strukturierte Lösung",
      "Andere Methode"
    ]
  },
  {
    id: "chatbot_onboarding_challenges",
    category: "5. Produkt-spezifisch",
    label: "Welche Herausforderungen gibt es beim aktuellen Onboarding?",
    goal: "Herausforderungen",
    type: "multiple-choice",
    multiple: true,
    productFilter: ['chatbot'],
    options: [
      "Zu zeitaufwändig für HR",
      "Inkonsistente Informationen",
      "Neue Mitarbeiter fühlen sich überfordert",
      "Wichtige Informationen gehen verloren",
      "Schwer skalierbar bei vielen Neueinstellungen",
      "Keine klaren Herausforderungen"
    ]
  },
  {
    id: "chatbot_expected_benefits",
    category: "5. Produkt-spezifisch",
    label: "Welche Vorteile erhoffen Sie sich vom Chatbot-Onboarding?",
    goal: "Erwartete Vorteile",
    type: "multiple-choice",
    multiple: true,
    productFilter: ['chatbot'],
    options: [
      "Zeitersparnis für HR",
      "Konsistentes Onboarding für alle",
      "Schnellere Einarbeitung",
      "Bessere Mitarbeiterzufriedenheit",
      "Skalierbarkeit bei Wachstum",
      "Messbare Lernerfolge"
    ]
  },
  {
    id: "website_goals",
    category: "5. Produkt-spezifisch",
    label: "Was sind die Hauptziele Ihrer Website?",
    goal: "Website-Ziele",
    type: "multiple-choice",
    multiple: true,
    productFilter: ['website'],
    options: [
      "Mehr Kunden gewinnen",
      "Online-Terminbuchung",
      "Produkte/Dienstleistungen präsentieren",
      "Online-Shop / E-Commerce",
      "Informationen bereitstellen",
      "Brand Awareness steigern"
    ]
  },
  {
    id: "website_target_audience",
    category: "5. Produkt-spezifisch",
    label: "Wer ist Ihre Zielgruppe?",
    goal: "Zielgruppe",
    type: "text",
    productFilter: ['website'],
    placeholder: "Beschreibe deine Zielgruppe (z.B. Privatkunden, Geschäftskunden, bestimmte Altersgruppe...)"
  },
  {
    id: "website_current_online_presence",
    category: "5. Produkt-spezifisch",
    label: "Wie ist Ihre aktuelle Online-Präsenz?",
    goal: "Aktuelle Situation",
    type: "multiple-choice",
    productFilter: ['website'],
    options: [
      "Habe noch keine Website",
      "Habe eine veraltete Website",
      "Habe eine Website, aber sie funktioniert nicht gut",
      "Habe Social Media, aber keine Website",
      "Habe eine funktionierende Website, möchte sie erweitern",
      "Andere Situation"
    ]
  },

  // 6. BEDENKEN (am Ende)
  {
    id: "proof_objection",
    category: "6. Bedenken",
    label: "Was ist Ihre größte Sorge bei KI-Implementierungen?",
    goal: "Bedenken",
    type: "multiple-choice",
    multiple: true,
    options: [
      "Zu komplex / technisch zu anspruchsvoll",
      "Zu teuer / ROI unklar",
      "Daten-Sicherheit & Datenschutz",
      "Integration in bestehende Systeme",
      "Qualität der Ergebnisse",
      "Keine konkreten Bedenken",
      "Andere Sorge"
    ]
  }
];
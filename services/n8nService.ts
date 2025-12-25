import { OnboardingData, ContactInfo } from '../types';

export interface N8nPayload {
  contact: {
    name: string;
    email: string;
    phone: string;
    address: string;
    website: string;
    social_media: string;
  };
  selected_product: string;
  answers: {
    branche: string;
    unternehmensgroesse: string;
    herausforderung: string;
    ausloeser: string;
    bisherige_versuche: string;
    zeitrahmen: string;
    problem_beschreibung: string;
    bedenken: string;
    // Produkt-spezifisch - Phone Agent
    phone_agent_anrufvolumen?: string;
    phone_agent_spitzenzeiten?: string;
    phone_agent_haeufige_fragen?: string;
    phone_agent_aktueller_prozess?: string;
    phone_agent_erwartete_ergebnisse?: string;
    phone_agent_aktuelle_systeme?: string;
    // Produkt-spezifisch - Chatbot
    chatbot_onboarding_dauer?: string;
    chatbot_neue_mitarbeiter_pro_jahr?: string;
    chatbot_onboarding_themen?: string;
    chatbot_aktueller_prozess?: string;
    chatbot_herausforderungen?: string;
    chatbot_erwartete_vorteile?: string;
    // Produkt-spezifisch - Website
    website_typ?: string;
    website_ziele?: string;
    website_zielgruppe?: string;
    website_aktuelle_online_praesenz?: string;
  };
  metadata: {
    timestamp: string;
    source: string;
    version: string;
  };
}

export const prepareN8nPayload = (
  contactData: ContactInfo,
  formData: OnboardingData
): N8nPayload => {
  // Strukturierte Daten für n8n - optimiert für einfachen Zugriff
  const baseAnswers: any = {
    branche: Array.isArray(formData.hero_identity) ? formData.hero_identity.join(', ') : (formData.hero_identity || ''),
    unternehmensgroesse: formData.hero_simplicity || '',
    herausforderung: Array.isArray(formData.problem_pain) ? formData.problem_pain.join(', ') : (formData.problem_pain || ''),
    ausloeser: Array.isArray(formData.problem_trigger) ? formData.problem_trigger.join(', ') : (formData.problem_trigger || ''),
    bisherige_versuche: formData.problem_failed || '',
    zeitrahmen: formData.solution_speed || '',
    problem_beschreibung: formData.proof_story || '',
    bedenken: Array.isArray(formData.proof_objection) ? formData.proof_objection.join(', ') : (formData.proof_objection || '')
  };

  // Produkt-spezifische Felder hinzufügen
  if (formData.selected_product === 'phone-agent') {
    baseAnswers.phone_agent_anrufvolumen = formData.phone_agent_calls_per_week || '';
    baseAnswers.phone_agent_spitzenzeiten = Array.isArray(formData.phone_agent_peak_times) ? formData.phone_agent_peak_times.join(', ') : (formData.phone_agent_peak_times || '');
    baseAnswers.phone_agent_haeufige_fragen = formData.phone_agent_common_questions || '';
    baseAnswers.phone_agent_aktueller_prozess = formData.phone_agent_current_setup || '';
    baseAnswers.phone_agent_erwartete_ergebnisse = Array.isArray(formData.phone_agent_expected_outcomes) ? formData.phone_agent_expected_outcomes.join(', ') : (formData.phone_agent_expected_outcomes || '');
    baseAnswers.phone_agent_aktuelle_systeme = formData.phone_agent_integration || '';
  } else if (formData.selected_product === 'chatbot') {
    baseAnswers.chatbot_onboarding_dauer = formData.chatbot_onboarding_duration || '';
    baseAnswers.chatbot_neue_mitarbeiter_pro_jahr = formData.chatbot_new_employees_per_year || '';
    baseAnswers.chatbot_onboarding_themen = formData.chatbot_onboarding_topics || '';
    baseAnswers.chatbot_aktueller_prozess = formData.chatbot_current_onboarding || '';
    baseAnswers.chatbot_herausforderungen = Array.isArray(formData.chatbot_onboarding_challenges) ? formData.chatbot_onboarding_challenges.join(', ') : (formData.chatbot_onboarding_challenges || '');
    baseAnswers.chatbot_erwartete_vorteile = Array.isArray(formData.chatbot_expected_benefits) ? formData.chatbot_expected_benefits.join(', ') : (formData.chatbot_expected_benefits || '');
  } else if (formData.selected_product === 'website') {
    baseAnswers.website_typ = formData.website_type || '';
    baseAnswers.website_ziele = Array.isArray(formData.website_goals) ? formData.website_goals.join(', ') : (formData.website_goals || '');
    baseAnswers.website_zielgruppe = formData.website_target_audience || '';
    baseAnswers.website_aktuelle_online_praesenz = formData.website_current_online_presence || '';
  }

  return {
    contact: {
      name: contactData.name || '',
      email: contactData.email || '',
      phone: contactData.phone || '',
      address: contactData.address || '',
      website: contactData.website || '',
      social_media: contactData.social_media || ''
    },
    selected_product: formData.selected_product || '',
    answers: baseAnswers,
    metadata: {
      timestamp: new Date().toISOString(),
      source: 'force4good-onboarding',
      version: '2.0'
    }
  };
};

// Alternative: Flache Struktur für n8n (optional)
export const prepareFlatN8nPayload = (
  contactData: ContactInfo,
  formData: OnboardingData
): Record<string, string> => {
  // Flache Struktur - alle Felder auf oberster Ebene für einfacheren Zugriff in n8n
  return {
    // Kontaktdaten
    'contact_name': contactData.name || '',
    'contact_email': contactData.email || '',
    'contact_phone': contactData.phone || '',
    'contact_address': contactData.address || '',
    'contact_website': contactData.website || '',
    'contact_social_media': contactData.social_media || '',
    // Antworten
    'selected_product': formData.selected_product || '',
    'branche': Array.isArray(formData.hero_identity) ? formData.hero_identity.join(', ') : (formData.hero_identity || ''),
    'unternehmensgroesse': formData.hero_simplicity || '',
    'herausforderung': Array.isArray(formData.problem_pain) ? formData.problem_pain.join(', ') : (formData.problem_pain || ''),
    'ausloeser': Array.isArray(formData.problem_trigger) ? formData.problem_trigger.join(', ') : (formData.problem_trigger || ''),
    'bisherige_versuche': formData.problem_failed || '',
    'zeitrahmen': formData.solution_speed || '',
    'problem_beschreibung': formData.proof_story || '',
    'bedenken': Array.isArray(formData.proof_objection) ? formData.proof_objection.join(', ') : (formData.proof_objection || ''),
    // Metadata
    'timestamp': new Date().toISOString(),
    'source': 'force4good-onboarding',
    'version': '1.0'
  };
};

export const sendToN8n = async (
  contactData: ContactInfo,
  formData: OnboardingData
): Promise<{ success: boolean; error?: string }> => {
  try {
    const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://your-n8n-instance.com/webhook/force4good';
    
    console.log('🔍 Webhook URL:', webhookUrl);
    console.log('🔍 Environment variable:', import.meta.env.VITE_N8N_WEBHOOK_URL);
    
    if (!webhookUrl || webhookUrl.includes('your-n8n-instance.com')) {
      const errorMsg = 'Webhook URL nicht konfiguriert. Bitte setze VITE_N8N_WEBHOOK_URL in der .env Datei.';
      console.error('❌', errorMsg);
      return {
        success: false,
        error: errorMsg
      };
    }

    const payload = prepareN8nPayload(contactData, formData);
    
    console.log('📤 Sending to n8n webhook:', webhookUrl);
    console.log('📦 Payload:', JSON.stringify(payload, null, 2));
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('📥 Response status:', response.status);
    console.log('📥 Response ok:', response.ok);
    console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log('📥 Response body:', responseText);

    if (response.ok) {
      console.log('✅ Successfully sent to n8n');
      return { success: true };
    } else {
      let errorMessage = `n8n Webhook Fehler: ${response.status} ${response.statusText}`;
      
      try {
        const errorJson = JSON.parse(responseText);
        if (errorJson.message) {
          errorMessage = `n8n Fehler: ${errorJson.message}`;
        }
      } catch {
        if (responseText) {
          errorMessage = `n8n Fehler (${response.status}): ${responseText}`;
        }
      }
      
      console.error('❌ n8n error response:', errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    }
  } catch (error: any) {
    console.error('❌ Error sending to n8n:', error);
    console.error('❌ Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    let errorMessage = 'Unbekannter Fehler beim Senden an n8n';
    
    if (error.message) {
      errorMessage = error.message;
    } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
      errorMessage = 'Netzwerkfehler: Konnte keine Verbindung zum Webhook herstellen. Prüfe deine Internetverbindung.';
    } else if (error.name === 'TypeError') {
      errorMessage = `Fehler: ${error.message}`;
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};


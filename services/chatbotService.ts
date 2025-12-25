export interface ChatMessage {
  role: 'user' | 'bot';
  message: string;
  timestamp?: string;
}

export interface ChatbotRequest {
  message: string;
  conversation_id?: string;
  contact_email?: string;
}

export interface ChatbotResponse {
  success: boolean;
  message: string;
  conversation_id?: string;
  error?: string;
}

export const sendChatMessage = async (
  message: string,
  conversationId?: string,
  contactEmail?: string
): Promise<ChatbotResponse> => {
  try {
    const webhookUrl = import.meta.env.VITE_N8N_CHATBOT_WEBHOOK_URL || '';
    
    if (!webhookUrl) {
      return {
        success: false,
        message: 'Chatbot-Webhook nicht konfiguriert. Bitte setze VITE_N8N_CHATBOT_WEBHOOK_URL in der .env Datei.',
        error: 'Webhook URL missing'
      };
    }

    // Stelle sicher, dass immer eine conversation_id gesendet wird
    const finalConversationId = conversationId || `conv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const payload: ChatbotRequest = {
      message: message,
      conversation_id: finalConversationId,
      contact_email: contactEmail
    };

    console.log('📤 Sending chat message to n8n:', webhookUrl);
    console.log('📦 Payload:', payload);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('📥 Response status:', response.status);
    console.log('📥 Response ok:', response.ok);

    if (response.ok) {
      const responseText = await response.text();
      console.log('📥 Raw response text:', responseText);
      
      // Prüfe, ob die Antwort leer ist
      if (!responseText || responseText.trim() === '') {
        console.error('❌ Empty response from n8n');
        return {
          success: false,
          message: 'Der Chatbot hat keine Antwort zurückgegeben. Bitte prüfe den n8n Workflow.',
          error: 'Empty response from n8n'
        };
      }

      let data;
      try {
        data = JSON.parse(responseText);
        console.log('✅ Chatbot response parsed:', data);
      } catch (parseError) {
        console.error('❌ Failed to parse JSON response:', parseError);
        console.error('❌ Response was:', responseText);
        return {
          success: false,
          message: 'Der Chatbot hat eine ungültige Antwort zurückgegeben. Bitte prüfe den n8n Workflow.',
          error: `Invalid JSON: ${responseText.substring(0, 100)}`
        };
      }
      
      // n8n kann verschiedene Response-Formate zurückgeben
      // Wir unterstützen verschiedene Strukturen:
      let botMessage = '';
      let newConversationId = finalConversationId; // Verwende die gesendete ID als Fallback

      if (typeof data === 'string') {
        botMessage = data;
      } else if (data.message) {
        botMessage = data.message;
      } else if (data.response) {
        botMessage = data.response;
      } else if (data.text) {
        botMessage = data.text;
      } else if (data.output) {
        botMessage = data.output;
      } else {
        console.warn('⚠️ Unknown response format:', data);
        botMessage = JSON.stringify(data);
      }

      // Prüfe, ob die Nachricht leer ist
      if (!botMessage || botMessage.trim() === '') {
        console.error('❌ Empty message in response');
        return {
          success: false,
          message: 'Der Chatbot hat eine leere Nachricht zurückgegeben. Bitte prüfe den n8n Workflow.',
          error: 'Empty message in response'
        };
      }

      if (data.conversation_id) {
        newConversationId = data.conversation_id;
      }

      return {
        success: true,
        message: botMessage,
        conversation_id: newConversationId
      };
    } else {
      const errorText = await response.text();
      console.error('❌ Chatbot error response:', errorText);
      
      let errorMessage = `Chatbot Fehler: ${response.status} ${response.statusText}`;
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.message) {
          errorMessage = errorJson.message;
        }
      } catch {
        if (errorText) {
          errorMessage = `Chatbot Fehler: ${errorText}`;
        }
      }

      return {
        success: false,
        message: 'Entschuldigung, es gab einen Fehler. Bitte versuche es später erneut.',
        error: errorMessage
      };
    }
  } catch (error: any) {
    console.error('❌ Error sending chat message:', error);
    
    let errorMessage = 'Unbekannter Fehler beim Senden der Nachricht.';
    if (error.message) {
      errorMessage = error.message;
    } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
      errorMessage = 'Netzwerkfehler: Konnte keine Verbindung zum Chatbot herstellen.';
    }

    return {
      success: false,
      message: 'Entschuldigung, es gab einen Fehler. Bitte versuche es später erneut.',
      error: errorMessage
    };
  }
};


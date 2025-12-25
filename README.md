<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# FORCE4GOOD Onboarding

Eine minimalistisch gestaltete Onboarding-Anwendung im Schwarz-Weiß Design für Marketing-Profil-Erstellung.

## Lokal ausführen

**Voraussetzungen:** Node.js

1. Dependencies installieren:
   ```bash
   npm install
   ```

2. Umgebungsvariablen konfigurieren:
   Erstelle eine `.env` Datei im Root-Verzeichnis:
   ```
   VITE_N8N_WEBHOOK_URL=https://deine-n8n-instanz.com/webhook/force4good
   ```
   
   **Wichtig:** Die Webhook-URL muss auf deine n8n-Instanz zeigen. Die Daten werden beim Klick auf "Absenden" automatisch an diesen Webhook gesendet.

3. Development Server starten:
   ```bash
   npm run dev
   ```

4. Production Build erstellen:
   ```bash
   npm run build
   ```

Die Anwendung läuft dann auf `http://localhost:3000`

## Features

- Minimalistisches Schwarz-Weiß Design
- Subtile Animationen
- Multiple-Choice Fragen für einfache Beantwortung
- Automatische Webhook-Integration mit n8n
- Storybrand-Framework Integration
- Cialdini-Prinzipien basierte Fragen

## Webhook-Datenformat

Die Daten werden im folgenden Format an n8n gesendet:

```json
{
  "contact": {
    "name": "...",
    "address": "...",
    "phone": "...",
    "email": "...",
    "website": "...",
    "social_media": "..."
  },
  "answers": {
    "hero_identity": "...",
    "hero_simplicity": "...",
    // ... alle anderen Antworten
  },
  "timestamp": "2024-12-06T..."
}
```

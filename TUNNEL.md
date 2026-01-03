# 🌐 Öffentliche URL für Projekt-Präsentation

## Schnellstart

Um das Projekt anderen zu zeigen (auch mobil), starte einen öffentlichen Tunnel:

```bash
npm run tunnel
```

Die öffentliche URL wird dann angezeigt (z.B. `https://force4good-onboarding.loca.lt`).

## Alternative: Manuell

```bash
npx localtunnel --port 9000 --subdomain force4good-onboarding
```

## Wichtig

- ✅ Funktioniert von überall (auch mobil, ohne WLAN)
- ✅ Automatisch HTTPS
- ✅ Keine Anmeldung nötig
- ⚠️  Tunnel stoppt, wenn Terminal geschlossen wird
- ⚠️  URL kann sich ändern (außer mit `--subdomain`)

## Tunnel stoppen

```bash
pkill -f localtunnel
```

## Alternative: ngrok

Falls du ngrok bevorzugst:

1. Installiere ngrok: https://ngrok.com/download
2. Starte Tunnel: `ngrok http 9000`
3. Kopiere die HTTPS-URL aus der ngrok-Konsole







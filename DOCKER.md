# Docker Setup - FORCE4GOOD Onboarding

## Übersicht

Diese Anwendung kann sicher mit Docker containerisiert werden. Die Konfiguration folgt Security Best Practices.

## Sicherheitsfeatures

✅ **Non-root User** - Container läuft nicht als root  
✅ **Read-only Filesystem** - Nur temporäre Verzeichnisse sind beschreibbar  
✅ **No new privileges** - Container kann keine zusätzlichen Rechte erlangen  
✅ **Minimal Base Image** - Alpine Linux für kleinere Angriffsfläche  
✅ **Multi-stage Build** - Nur Production-Dependencies im finalen Image  
✅ **Security Headers** - Nginx mit umfassenden Security Headers  
✅ **Health Checks** - Automatische Gesundheitsprüfung  
✅ **Resource Limits** - Kontrollierte Ressourcennutzung  

## Voraussetzungen

- Docker >= 20.10
- Docker Compose >= 2.0
- `.env` Datei mit Webhook-URLs

## Quick Start

### 1. Environment-Variablen konfigurieren

Erstelle eine `.env` Datei:

```env
VITE_N8N_WEBHOOK_URL=https://n8n.crftn.de/webhook/d194ad47-6e11-42df-93ce-bd789bf55cbd
VITE_N8N_CHATBOT_WEBHOOK_URL=https://n8n.crftn.de/webhook/chatbot
```

### 2. Development Build

```bash
# Build und Start
docker-compose up --build

# Im Hintergrund
docker-compose up -d --build

# Logs anzeigen
docker-compose logs -f

# Stoppen
docker-compose down
```

Die App ist dann erreichbar unter: `http://localhost:3000`

### 3. Production Build

```bash
# Mit Production-Konfiguration
docker-compose -f docker-compose.prod.yml up --build -d

# Logs
docker-compose -f docker-compose.prod.yml logs -f

# Stoppen
docker-compose -f docker-compose.prod.yml down
```

## Docker Commands

### Image bauen

```bash
docker build -t force4good-onboarding:latest .
```

### Container starten

```bash
docker run -d \
  --name force4good-onboarding \
  -p 3000:3000 \
  --env-file .env \
  --restart unless-stopped \
  force4good-onboarding:latest
```

### Container inspizieren

```bash
# Logs anzeigen
docker logs force4good-onboarding

# In Container einsteigen
docker exec -it force4good-onboarding sh

# Container-Status
docker ps

# Ressourcenverbrauch
docker stats force4good-onboarding
```

## Nginx Reverse Proxy (Optional)

Die `docker-compose.yml` enthält einen Nginx Reverse Proxy mit:

- **Security Headers** (CSP, X-Frame-Options, etc.)
- **Gzip Compression**
- **Health Check Endpoint**
- **SSL Support** (optional)

### SSL konfigurieren

1. SSL-Zertifikate in `nginx/ssl/` ablegen:
   - `cert.pem` - Zertifikat
   - `key.pem` - Private Key

2. In `nginx.conf` HTTPS-Server aktivieren (auskommentierte Zeilen)

3. Container neu starten

## Sicherheits-Checkliste

- [ ] `.env` Datei nicht in Git committen
- [ ] Production `.env` mit starken Werten
- [ ] SSL-Zertifikate konfiguriert (Production)
- [ ] Firewall-Regeln konfiguriert
- [ ] Regelmäßige Updates der Base Images
- [ ] Logs überwachen
- [ ] Backup-Strategie implementiert

## Troubleshooting

### Container startet nicht

```bash
# Logs prüfen
docker-compose logs app

# Container-Status
docker-compose ps
```

### Port bereits belegt

```bash
# Port ändern in docker-compose.yml
ports:
  - "3001:3000"  # Statt 3000:3000
```

### Environment-Variablen werden nicht geladen

```bash
# Prüfe .env Datei
cat .env

# Prüfe Container-Environment
docker exec force4good-onboarding env
```

### Build schlägt fehl

```bash
# Cache leeren und neu bauen
docker-compose build --no-cache
```

## Production Deployment

### 1. Environment-Variablen

Erstelle `.env.production`:

```env
VITE_N8N_WEBHOOK_URL=https://n8n.crftn.de/webhook/...
VITE_N8N_CHATBOT_WEBHOOK_URL=https://n8n.crftn.de/webhook/...
```

### 2. Build und Deploy

```bash
# Production Build
docker-compose -f docker-compose.prod.yml build

# Start
docker-compose -f docker-compose.prod.yml up -d

# Health Check
curl http://localhost/health
```

### 3. Monitoring

```bash
# Container-Status
docker-compose -f docker-compose.prod.yml ps

# Ressourcen
docker stats

# Logs
docker-compose -f docker-compose.prod.yml logs -f --tail=100
```

## Updates

```bash
# Neues Image bauen
docker-compose build

# Container neu starten
docker-compose up -d

# Alte Images aufräumen
docker system prune -a
```

## Best Practices

1. **Regelmäßige Updates**: Base Images regelmäßig aktualisieren
2. **Secrets Management**: Verwende Docker Secrets oder externe Secrets-Manager
3. **Monitoring**: Implementiere Logging und Monitoring
4. **Backups**: Regelmäßige Backups der Konfiguration
5. **Security Scanning**: Regelmäßige Security-Scans der Images

## Support

Bei Problemen:
1. Prüfe die Logs: `docker-compose logs`
2. Prüfe Container-Status: `docker-compose ps`
3. Prüfe Environment-Variablen: `docker exec container env`





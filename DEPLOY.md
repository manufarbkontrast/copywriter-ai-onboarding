# 🚀 Deployment-Anleitung

## Option 1: Docker (Empfohlen - Production-Ready)

### Schnellstart mit Docker Compose:

1. **Environment-Variablen konfigurieren**:
   Erstelle eine `.env` Datei:
   ```env
   VITE_N8N_WEBHOOK_URL=https://n8n.crftn.de/webhook/d194ad47-6e11-42df-93ce-bd789bf55cbd
   VITE_N8N_CHATBOT_WEBHOOK_URL=https://n8n.crftn.de/webhook/chatbot
   ```

2. **Docker Compose starten**:
   ```bash
   docker-compose up -d --build
   ```

3. **Anwendung aufrufen**:
   - App: http://localhost:3002
   - Nginx (mit SSL): http://localhost:9000

### Production Deployment:

```bash
# Production Build
docker-compose -f docker-compose.prod.yml up -d --build

# Logs anzeigen
docker-compose -f docker-compose.prod.yml logs -f

# Container stoppen
docker-compose -f docker-compose.prod.yml down
```

**Vorteile:**
- ✅ Production-ready
- ✅ Sicherheitsfeatures (Non-root, Read-only)
- ✅ Nginx Reverse Proxy mit SSL
- ✅ Health Checks
- ✅ Einfaches Deployment
- ✅ Skalierbar

---

## Option 2: Docker Hub (Für Server-Deployment)

### Image von Docker Hub pullen:

```bash
docker pull manufarbkontrast/force4good-onboarding:latest
```

### Container starten:

```bash
docker run -d \
  --name force4good-onboarding \
  -p 3000:3000 \
  --env-file .env \
  --restart unless-stopped \
  manufarbkontrast/force4good-onboarding:latest
```

---

## Option 3: Lokaler Build

1. **Build erstellen**:
   ```bash
   npm run build
   ```

2. **Vite Preview Server starten**:
   ```bash
   npx vite preview --host 0.0.0.0 --port 3000
   ```

---

## Option 4: Netlify

1. **Netlify CLI installieren**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Build erstellen**:
   ```bash
   npm run build
   ```

3. **Deployen**:
   ```bash
   netlify deploy --prod --dir=dist
   ```

4. **Umgebungsvariablen in Netlify Dashboard setzen**

---

## Option 5: GitHub Pages

1. **GitHub Repository erstellen**
2. **GitHub Actions Workflow erstellen** (siehe `.github/workflows/deploy.yml`)
3. **Repository Settings → Pages aktivieren**

---

## Option 6: Cloudflare Pages

1. **Cloudflare Dashboard öffnen**
2. **Pages → Create a project**
3. **GitHub Repository verbinden**
4. **Build settings:**
   - Build command: `npm run build`
   - Build output: `dist`

---

## Umgebungsvariablen

Wichtig: Setze die folgende Umgebungsvariable in deinem Deployment-Service:

- `VITE_N8N_WEBHOOK_URL`: `https://n8n.crftn.de/webhook/d194ad47-6e11-42df-93ce-bd789bf55cbd`
- `VITE_N8N_CHATBOT_WEBHOOK_URL`: `https://n8n.crftn.de/webhook/chatbot`

---

## Docker Commands

### Image bauen:
```bash
docker build -t manufarbkontrast/force4good-onboarding:latest .
```

### Image zu Docker Hub pushen:
```bash
docker push manufarbkontrast/force4good-onboarding:latest
```

### Container-Status prüfen:
```bash
docker ps
docker logs force4good-onboarding
```

### Container neu starten:
```bash
docker restart force4good-onboarding
```

---

## Weitere Informationen

Für detaillierte Docker-Konfiguration siehe: [DOCKER.md](./DOCKER.md)

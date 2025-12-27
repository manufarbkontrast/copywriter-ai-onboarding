# 🚀 Deployment-Anleitung

## Option 1: Vercel (Empfohlen - Einfach & Kostenlos)

### Schnellstart:

1. **Vercel CLI installieren** (falls noch nicht installiert):
   ```bash
   npm install -g vercel
   ```

2. **Projekt deployen**:
   ```bash
   vercel
   ```

3. **Umgebungsvariablen setzen**:
   ```bash
   vercel env add VITE_N8N_WEBHOOK_URL
   ```
   Dann die Webhook-URL eingeben: `https://n8n.crftn.de/webhook/d194ad47-6e11-42df-93ce-bd789bf55cbd`

4. **Production-Deployment**:
   ```bash
   vercel --prod
   ```

**Vorteile:**
- ✅ Kostenlos
- ✅ Automatisches HTTPS
- ✅ Globale CDN
- ✅ Funktioniert auf allen Geräten
- ✅ Dauerhaft verfügbar

---

## Option 2: Netlify

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

## Option 3: GitHub Pages

1. **GitHub Repository erstellen**
2. **GitHub Actions Workflow erstellen** (siehe `.github/workflows/deploy.yml`)
3. **Repository Settings → Pages aktivieren**

---

## Option 4: Cloudflare Pages

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





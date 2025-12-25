# 🌐 Eigene Domain einrichten

## Option 1: Netlify (Empfohlen - Einfachste Lösung)

### Schritt 1: Domain kaufen (falls noch nicht vorhanden)
- **Namecheap**: https://www.namecheap.com
- **Google Domains**: https://domains.google
- **Cloudflare**: https://www.cloudflare.com/products/registrar
- **IONOS**: https://www.ionos.de

### Schritt 2: Site auf Netlify deployen
1. Öffne: https://app.netlify.com/drop
2. Ziehe den `dist` Ordner hinein
3. Notiere die Netlify-URL (z.B. `https://random-name-12345.netlify.app`)

### Schritt 3: Custom Domain hinzufügen
1. Gehe zu: **Site Settings → Domain Management**
2. Klicke auf: **Add custom domain**
3. Gib deine Domain ein (z.B. `onboarding.force4good.de`)
4. Netlify zeigt dir die DNS-Einstellungen

### Schritt 4: DNS konfigurieren
**Bei deinem Domain-Provider (z.B. Namecheap, Cloudflare):**

**Option A: A Record (IPv4)**
```
Type: A
Name: @ (oder onboarding)
Value: 75.2.60.5
TTL: 3600
```

**Option B: CNAME (Empfohlen)**
```
Type: CNAME
Name: onboarding (oder @)
Value: random-name-12345.netlify.app
TTL: 3600
```

**Option C: ALIAS/ANAME (falls unterstützt)**
```
Type: ALIAS
Name: @
Value: random-name-12345.netlify.app
```

### Schritt 5: SSL-Zertifikat
- Netlify stellt automatisch ein SSL-Zertifikat aus (Let's Encrypt)
- Dauert 1-24 Stunden nach DNS-Propagierung

### Schritt 6: HTTPS erzwingen
1. **Site Settings → Domain Management**
2. Aktiviere: **Force HTTPS**
3. Aktiviere: **HTTPS redirect**

---

## Option 2: Vercel

### Schritt 1: Domain kaufen (siehe oben)

### Schritt 2: Projekt auf Vercel deployen
```bash
vercel login
vercel
vercel --prod
```

### Schritt 3: Custom Domain hinzufügen
1. Gehe zu: **Project Settings → Domains**
2. Klicke auf: **Add Domain**
3. Gib deine Domain ein
4. Folge den DNS-Anweisungen

### Schritt 4: DNS konfigurieren
Vercel zeigt dir die benötigten DNS-Einträge an.

---

## Option 3: Cloudflare Pages

### Schritt 1: Domain bei Cloudflare hinzufügen
1. Cloudflare Dashboard öffnen
2. **Add a Site** → Domain eingeben
3. DNS-Einstellungen automatisch konfigurieren lassen

### Schritt 2: Pages erstellen
1. **Pages → Create a project**
2. GitHub Repository verbinden
3. Build settings konfigurieren

### Schritt 3: Custom Domain
1. **Custom domains** → Domain hinzufügen
2. DNS wird automatisch konfiguriert

---

## DNS-Einstellungen (Beispiel)

### Für Subdomain (z.B. onboarding.force4good.de):
```
Type: CNAME
Name: onboarding
Value: deine-netlify-url.netlify.app
TTL: Auto
```

### Für Root-Domain (z.B. force4good.de):
```
Type: A
Name: @
Value: 75.2.60.5 (Netlify IP)
TTL: 3600

ODER

Type: ALIAS/ANAME
Name: @
Value: deine-netlify-url.netlify.app
TTL: Auto
```

---

## Wichtige Tipps

1. **DNS-Propagierung**: Kann 1-48 Stunden dauern
2. **SSL-Zertifikat**: Wird automatisch ausgestellt (1-24 Stunden)
3. **WWW-Redirect**: Konfiguriere www → non-www (oder umgekehrt)
4. **HTTPS erzwingen**: Immer aktivieren für Sicherheit

---

## Beispiel-Konfiguration

**Domain**: `onboarding.force4good.de`

**DNS-Einträge**:
```
onboarding.force4good.de  CNAME  random-name-12345.netlify.app
```

**Ergebnis**: 
- ✅ https://onboarding.force4good.de funktioniert
- ✅ Automatisches SSL
- ✅ Professionelle URL

---

## Kosten

- **Domain**: ~10-15€/Jahr
- **Hosting**: Kostenlos (Netlify/Vercel Free Tier)
- **SSL**: Kostenlos (automatisch)




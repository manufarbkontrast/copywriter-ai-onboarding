# 🌐 Domain-Setup für Docker Deployment

Diese Anleitung zeigt, wie du eine eigene Domain für dein Docker-Deployment einrichtest.

## Voraussetzungen

- Docker und Docker Compose installiert
- Eine Domain (z.B. `onboarding.force4good.de`)
- Zugriff auf DNS-Einstellungen deiner Domain
- Server mit öffentlicher IP-Adresse

## Schritt 1: DNS-Konfiguration

### Option A: A-Record (IPv4)

Richte einen A-Record auf deine Server-IP ein:

```
Type: A
Name: onboarding (oder @ für Root-Domain)
Value: [Deine Server-IP]
TTL: 3600
```

**Beispiel:**
- Domain: `onboarding.force4good.de`
- Server-IP: `123.45.67.89`
- DNS-Eintrag: `onboarding.force4good.de → 123.45.67.89`

### Option B: CNAME (Subdomain)

Falls du eine Subdomain verwendest:

```
Type: CNAME
Name: onboarding
Value: deine-domain.de
TTL: 3600
```

## Schritt 2: SSL-Zertifikat einrichten

### Option A: Let's Encrypt (Empfohlen - Kostenlos)

1. **Certbot installieren** (auf dem Host-System):
   ```bash
   sudo apt-get update
   sudo apt-get install certbot
   ```

2. **Zertifikat erstellen**:
   ```bash
   sudo certbot certonly --standalone -d onboarding.force4good.de
   ```

3. **Zertifikate in Docker-Container kopieren**:
   ```bash
   mkdir -p nginx/ssl
   sudo cp /etc/letsencrypt/live/onboarding.force4good.de/fullchain.pem nginx/ssl/cert.pem
   sudo cp /etc/letsencrypt/live/onboarding.force4good.de/privkey.pem nginx/ssl/key.pem
   sudo chmod 644 nginx/ssl/cert.pem
   sudo chmod 600 nginx/ssl/key.pem
   ```

4. **Auto-Renewal einrichten**:
   ```bash
   sudo certbot renew --dry-run
   ```
   
   Erstelle ein Renewal-Script (`renew-ssl.sh`):
   ```bash
   #!/bin/bash
   sudo certbot renew --quiet
   sudo cp /etc/letsencrypt/live/onboarding.force4good.de/fullchain.pem nginx/ssl/cert.pem
   sudo cp /etc/letsencrypt/live/onboarding.force4good.de/privkey.pem nginx/ssl/key.pem
   docker-compose -f docker-compose.prod.yml restart nginx
   ```
   
   Füge zu crontab hinzu (läuft monatlich):
   ```bash
   0 3 1 * * /path/to/renew-ssl.sh
   ```

### Option B: Eigenes Zertifikat

1. **Zertifikate in `nginx/ssl/` ablegen**:
   - `cert.pem` - Zertifikat
   - `key.pem` - Private Key

2. **Berechtigungen setzen**:
   ```bash
   chmod 644 nginx/ssl/cert.pem
   chmod 600 nginx/ssl/key.pem
   ```

## Schritt 3: Nginx-Konfiguration anpassen

1. **Öffne `nginx.conf`**

2. **Ersetze `server_name _;` mit deiner Domain**:
   ```nginx
   server {
       listen 443 ssl http2;
       server_name onboarding.force4good.de;  # Deine Domain hier
       ...
   }
   ```

3. **HTTP zu HTTPS Redirect aktivieren**:
   In der HTTP-Server-Sektion (Port 80) die Redirect-Zeile aktivieren:
   ```nginx
   server {
       listen 80;
       server_name onboarding.force4good.de;
       return 301 https://$host$request_uri;  # Entkommentieren
   }
   ```

## Schritt 4: Docker Compose starten

```bash
# Production Deployment
docker-compose -f docker-compose.prod.yml up -d --build

# Logs prüfen
docker-compose -f docker-compose.prod.yml logs -f
```

## Schritt 5: Firewall konfigurieren

Stelle sicher, dass Port 80 und 443 geöffnet sind:

```bash
# UFW (Ubuntu)
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw reload

# Oder iptables
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
```

## Schritt 6: Testen

1. **DNS-Propagierung prüfen**:
   ```bash
   dig onboarding.force4good.de
   # oder
   nslookup onboarding.force4good.de
   ```

2. **SSL-Zertifikat testen**:
   ```bash
   curl -I https://onboarding.force4good.de
   ```

3. **Im Browser öffnen**:
   - https://onboarding.force4good.de

## Troubleshooting

### DNS-Propagierung dauert zu lange
- DNS-Propagierung kann 1-48 Stunden dauern
- Prüfe mit `dig` oder `nslookup`
- Verwende einen anderen DNS-Server (z.B. 8.8.8.8)

### SSL-Zertifikat wird nicht akzeptiert
- Prüfe, ob Zertifikate korrekt in `nginx/ssl/` liegen
- Prüfe Berechtigungen (644 für cert, 600 für key)
- Prüfe Nginx-Logs: `docker logs force4good-nginx-prod`

### Container startet nicht
- Prüfe Logs: `docker-compose -f docker-compose.prod.yml logs`
- Prüfe, ob Ports bereits belegt sind: `netstat -tulpn | grep -E ':(80|443)'`
- Prüfe `.env.production` Datei

### HTTP funktioniert, HTTPS nicht
- Prüfe, ob SSL-Zertifikate vorhanden sind
- Prüfe Nginx-Konfiguration
- Prüfe Firewall-Einstellungen

## Beispiel-Konfiguration

**Domain**: `onboarding.force4good.de`  
**Server-IP**: `123.45.67.89`

**DNS-Einträge**:
```
Type: A
Name: onboarding
Value: 123.45.67.89
TTL: 3600
```

**nginx.conf**:
```nginx
server {
    listen 443 ssl http2;
    server_name onboarding.force4good.de;
    ...
}
```

**Ergebnis**:
- ✅ https://onboarding.force4good.de funktioniert
- ✅ Automatisches SSL (Let's Encrypt)
- ✅ HTTP → HTTPS Redirect
- ✅ Professionelle URL

## Wartung

### SSL-Zertifikat erneuern

Let's Encrypt-Zertifikate laufen nach 90 Tagen ab. Auto-Renewal sollte eingerichtet sein (siehe Schritt 2).

Manuell erneuern:
```bash
sudo certbot renew
sudo cp /etc/letsencrypt/live/onboarding.force4good.de/fullchain.pem nginx/ssl/cert.pem
sudo cp /etc/letsencrypt/live/onboarding.force4good.de/privkey.pem nginx/ssl/key.pem
docker-compose -f docker-compose.prod.yml restart nginx
```

### Updates deployen

```bash
# Neues Image bauen
docker-compose -f docker-compose.prod.yml build

# Container neu starten
docker-compose -f docker-compose.prod.yml up -d

# Oder nur App-Container neu starten
docker-compose -f docker-compose.prod.yml restart app
```

## Support

Bei Problemen:
1. Prüfe Docker-Logs: `docker-compose -f docker-compose.prod.yml logs`
2. Prüfe Nginx-Logs: `docker logs force4good-nginx-prod`
3. Prüfe DNS: `dig onboarding.force4good.de`
4. Prüfe SSL: `openssl s_client -connect onboarding.force4good.de:443`


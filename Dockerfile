# Multi-stage build für optimale Sicherheit und Performance

# Stage 1: Build
FROM node:20-alpine AS builder

# Non-root User erstellen
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Arbeitsverzeichnis setzen
WORKDIR /app

# Dependencies installieren (nur package.json kopieren für besseres Caching)
COPY package.json ./

# Dependencies als root installieren (nötig für npm)
RUN npm install && \
    npm cache clean --force

# Source Code kopieren
COPY . .

# Ownership an non-root User übergeben
RUN chown -R nextjs:nodejs /app

# Als non-root User wechseln
USER nextjs

# Build ausführen
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS runner

# Security: Non-root User erstellen
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

WORKDIR /app

# Dependencies installieren (vite wird für preview benötigt)
COPY package.json ./
RUN npm install && \
    npm cache clean --force

# Build-Artefakte vom Builder kopieren
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/index.html ./index.html

# Als non-root User wechseln
USER nextjs

# Port freigeben
EXPOSE 3000

# Health Check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Vite Preview Server starten (Production)
CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "3000"]


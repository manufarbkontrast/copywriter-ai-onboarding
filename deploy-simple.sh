#!/bin/bash

echo "🚀 Einfaches Deployment-Script"
echo ""
echo "Wähle eine Option:"
echo ""
echo "1. Docker (Empfohlen - Production-Ready)"
echo "2. Docker Hub (Image pullen und starten)"
echo "3. Netlify Drop (Kein Account nötig, einfachste Lösung)"
echo "4. GitHub Pages (Benötigt GitHub Account)"
echo ""
read -p "Wähle Option (1-4): " option

case $option in
  1)
    echo ""
    echo "🐳 Starte Docker Compose..."
    if [ -f ".env" ]; then
      docker-compose up -d --build
      echo ""
      echo "✅ Container gestartet!"
      echo "   App: http://localhost:3002"
      echo "   Nginx: http://localhost:9000"
    else
      echo "⚠️  .env Datei nicht gefunden!"
      echo "   Erstelle eine .env Datei mit VITE_N8N_WEBHOOK_URL"
    fi
    ;;
  2)
    echo ""
    echo "🐳 Pull Docker Image von Docker Hub..."
    docker pull manufarbkontrast/force4good-onboarding:latest
    echo ""
    echo "🚀 Starte Container..."
    docker run -d \
      --name force4good-onboarding \
      -p 3000:3000 \
      --env-file .env \
      --restart unless-stopped \
      manufarbkontrast/force4good-onboarding:latest
    echo ""
    echo "✅ Container gestartet auf http://localhost:3000"
    ;;
  3)
    echo ""
    echo "📦 Erstelle Build..."
    npm run build
    echo ""
    echo "🌐 Starte Netlify Drop..."
    echo "   Öffne https://app.netlify.com/drop"
    echo "   Ziehe den 'dist' Ordner in den Browser"
    echo ""
    echo "✅ Fertig! Du bekommst sofort eine URL."
    ;;
  4)
    echo ""
    echo "📦 Erstelle Build..."
    npm run build
    echo ""
    echo "📋 GitHub Pages Setup:"
    echo "   1. Erstelle GitHub Repository"
    echo "   2. Push Code"
    echo "   3. Settings → Pages → Source: gh-pages branch"
    ;;
  *)
    echo "Ungültige Option"
    ;;
esac

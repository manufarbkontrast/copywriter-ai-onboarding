#!/bin/bash

echo "🚀 Einfaches Deployment-Script"
echo ""
echo "Wähle eine Option:"
echo ""
echo "1. Netlify Drop (Kein Account nötig, einfachste Lösung)"
echo "2. Vercel (Benötigt Account, aber sehr einfach)"
echo "3. GitHub Pages (Benötigt GitHub Account)"
echo ""
read -p "Wähle Option (1-3): " option

case $option in
  1)
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
  2)
    echo ""
    echo "🌐 Starte Vercel..."
    vercel login
    vercel
    echo ""
    echo "📝 Setze Umgebungsvariable:"
    echo "   vercel env add VITE_N8N_WEBHOOK_URL"
    echo ""
    vercel --prod
    ;;
  3)
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




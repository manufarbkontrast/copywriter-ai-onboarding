#!/bin/bash

# Docker Start Script für FORCE4GOOD Onboarding

set -e

echo "🚀 FORCE4GOOD Onboarding - Docker Setup"
echo ""

# Prüfe ob Docker läuft
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker Daemon läuft nicht!"
    echo "   Bitte starte Docker Desktop und versuche es erneut."
    exit 1
fi

echo "✅ Docker Daemon läuft"
echo ""

# Prüfe .env Datei
if [ ! -f .env ]; then
    echo "⚠️  .env Datei nicht gefunden!"
    echo "   Erstelle .env aus .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "   ✅ .env erstellt - bitte fülle die Webhook-URLs aus!"
        exit 1
    else
        echo "   ❌ .env.example nicht gefunden. Bitte erstelle .env manuell."
        exit 1
    fi
fi

echo "✅ .env Datei gefunden"
echo ""

# Frage nach Modus
echo "Wähle den Modus:"
echo "1) Development (docker-compose.yml)"
echo "2) Production (docker-compose.prod.yml)"
read -p "Auswahl [1/2]: " mode

if [ "$mode" = "2" ]; then
    COMPOSE_FILE="docker-compose.prod.yml"
    echo ""
    echo "🔒 Production Modus"
else
    COMPOSE_FILE="docker-compose.yml"
    echo ""
    echo "🔧 Development Modus"
fi

echo ""
echo "🔨 Baue Docker Images..."
docker-compose -f $COMPOSE_FILE build

echo ""
echo "🚀 Starte Container..."
docker-compose -f $COMPOSE_FILE up -d

echo ""
echo "⏳ Warte auf Container..."
sleep 5

echo ""
echo "📊 Container Status:"
docker-compose -f $COMPOSE_FILE ps

echo ""
echo "✅ Setup abgeschlossen!"
echo ""
echo "🌐 App erreichbar unter:"
if [ "$mode" = "2" ]; then
    echo "   http://localhost (Port 80 - Nginx)"
else
    echo "   http://localhost:3000 (Port 3000 - Direkt)"
fi
echo ""
echo "📋 Nützliche Befehle:"
echo "   Logs anzeigen:    docker-compose -f $COMPOSE_FILE logs -f"
echo "   Container stoppen: docker-compose -f $COMPOSE_FILE down"
echo "   Status prüfen:     docker-compose -f $COMPOSE_FILE ps"
echo ""





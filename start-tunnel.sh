#!/bin/bash

echo "🌐 Starte öffentlichen Tunnel..."
echo ""
echo "Die URL wird in ein paar Sekunden angezeigt..."
echo ""

# Starte localtunnel im Hintergrund und fange die URL ab
npx localtunnel --port 9000 2>&1 | while IFS= read -r line; do
    echo "$line"
    if [[ "$line" == *"https://"* ]]; then
        echo ""
        echo "✅ ÖFFENTLICHE URL:"
        echo "   $line"
        echo ""
        echo "📱 Diese URL kannst du jetzt:"
        echo "   - Auf deinem iPhone öffnen"
        echo "   - Mit anderen teilen"
        echo "   - Überall verwenden (auch ohne WLAN)"
        echo ""
    fi
done





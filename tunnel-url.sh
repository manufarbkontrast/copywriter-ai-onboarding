#!/bin/bash

echo "🌐 Starte Tunnel und zeige URL..."
echo ""

# Starte localtunnel und fange die URL ab
npx localtunnel --port 9000 2>&1 | tee /tmp/tunnel-output.log | while IFS= read -r line; do
    echo "$line"
    # Suche nach der URL in der Ausgabe
    if echo "$line" | grep -q "your url is:"; then
        URL=$(echo "$line" | grep -o "https://[^ ]*")
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "✅ ÖFFENTLICHE URL:"
        echo "   $URL"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        echo "📱 Diese URL kannst du jetzt:"
        echo "   - Auf deinem iPhone öffnen"
        echo "   - Mit anderen teilen"
        echo "   - Überall verwenden (auch ohne WLAN)"
        echo ""
        # Speichere URL in Datei
        echo "$URL" > /tmp/tunnel-url.txt
    fi
done





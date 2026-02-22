Dieser Tab ermöglicht es Ihnen, den Zustand, die Statistiken und die Echtzeit-Protokolle des OpenClaw Gateway-Daemons zu überwachen, der im Hintergrund von Naia ausgeführt wird.

![Diagnose-Tab](diagnostics-tab.png)

## Statusübersicht
Im oberen Raster können Sie wichtige Gateway-Metriken überprüfen:
- **Gateway**: Aktueller Verbindungsstatus (🟢 OK, 🔴 Error)
- **Node ID**: Der eindeutige Bezeichner des Gateways
- **Uptime**: Wie lange das System bereits läuft
- **Platform / Arch**: Betriebssystem- und Architekturinformationen
- **Total Requests / Tokens**: Heute verarbeitete Anfragen und Token
- **Total Cost**: Gesamtkosten

## Echtzeit-Protokoll-Streaming
Das untere Panel streamt detaillierte interne Protokolle direkt vom Gateway.
- **Start Logs / Stop Logs**: Sie können den Protokoll-Stream jederzeit starten oder stoppen.
- Wenn das System auf ein Problem stößt oder eine Messenger-Integration fehlschlägt, finden Sie die detaillierte Ursache in diesen Protokollen.

## Liste der RPC-Methoden
Ganz unten auf dem Tab wird eine Liste aller unterstützten Remote Procedure Call (RPC)-Methoden als Tags angezeigt, sodass Sie schnell überprüfen können, welche Funktionen das Gateway derzeit unterstützt.
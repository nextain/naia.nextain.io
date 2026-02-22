Naia wurde primär für Linux-Umgebungen entwickelt, mit Fokus auf unveränderliche Betriebssysteme (Immutable OSs) wie Bazzite oder sichere Sandbox-Umgebungen wie Flatpak.

## Systemanforderungen

- **Betriebssystem**: Linux (Bazzite, Ubuntu, Fedora, etc.)
- **Display-Server**: Wayland (empfohlen) oder X11
- **Laufzeitumgebung**: Node.js 22+ (beim Kompilieren aus dem Quellcode)
- **Daemon**: Erfordert Systemd User Service-Unterstützung

---

## Bereitstellungsoptionen

Da Naia eine KI enthält, die „das Betriebssystem direkt steuert“, ist die Bereitstellungsmethode ein wichtiger Aspekt.

### 1. Flatpak-Distribution (Empfohlen)
Dies ist die gängigste und sicherste Methode zur Verteilung von Linux-Desktop-Apps. Sie können es einfach über App-Stores wie Discover oder GNOME Software installieren.

- **Sichere Isolation**: Die Benutzeroberfläche der App (Tauri) und der Kern-Agent (Node.js) laufen vollständig innerhalb der Sandbox.
- **Host-Ausführung**: Wenn die KI Terminalbefehle ausführen muss (z. B. ein Paket installieren oder das Host-Dateisystem verwalten), verlässt sie die Sandbox sicher mittels `flatpak-spawn --host`.
- **Installation**:
  Laden Sie das bereitgestellte `.flatpak`-Bundle herunter und installieren Sie es über das Terminal:
  ```bash
  flatpak install --user ./Naia-OS.flatpak
  ```

### 2. Bazzite / BlueBuild Integriertes Image (Fortgeschritten)
Für fortgeschrittene Benutzer bietet Naia ein BlueBuild-Rezept, um die App direkt in ein Bazzite-Image zu integrieren. Dies integriert die KI tief in das Betriebssystem, sodass der KI-Avatar Sie sofort beim Start begrüßen kann.

---

## 🛠️ (Für Entwickler) Lokale Flatpak-Build-Anleitung

Um die Flatpak-Sandbox-App aus dem Quellcode zu erstellen, befolgen Sie diese Schritte:

1. **Flatpak Builder installieren**
   ```bash
   # Fedora / Bazzite
   sudo dnf install flatpak-builder
   
   # Ubuntu
   sudo apt install flatpak-builder
   ```

2. **Build-Abhängigkeiten hinzufügen (SDK)**
   ```bash
   flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
   flatpak install --user flathub org.freedesktop.Platform//24.08 org.freedesktop.Sdk//24.08
   ```

3. **Den Packaging Build ausführen**
   Führen Sie dies im Stammverzeichnis des Projekts (Naia-OS) aus.
   ```bash
   # Compiles and builds into the build-dir
   flatpak-builder --user --install --force-clean build-dir flatpak/com.naia.shell.yml
   ```

4. **Die App ausführen**
   ```bash
   flatpak run com.naia.shell
   ```

> **💡 Entwicklerhinweis:**
> Um die Host-Umgebung des Benutzers aus der Flatpak-Sandbox heraus zu manipulieren, umschließt der KI-Agent intern alle `execute_command`-Tool-Anfragen mit `flatpak-spawn --host bash -c ...` in `agent/src/gateway/tool-bridge.ts`.
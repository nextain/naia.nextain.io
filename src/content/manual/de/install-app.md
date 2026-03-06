Installieren Sie Naia als eigenständige App auf Ihrem bestehenden Linux-System. Alle Installationsdateien sind auf der **[Download-Seite](/en/download)** oder bei **[itch.io](https://nextain.itch.io/naia)** verfügbar.

## Systemanforderungen

- **Betriebssystem**: Linux (Ubuntu, Fedora, Bazzite, etc.)
- **Anzeige**: Wayland (empfohlen) oder X11
- Die Flatpak-Installation erfordert keine zusätzliche Laufzeitkonfiguration.

---

## Flatpak (Empfohlen)

Die sicherste Art der Installation. Die App läuft in ihrem eigenen isolierten Bereich – Ihr System bleibt sauber.

Laden Sie das `.flatpak`-Bundle von der [Download-Seite](/en/download) herunter und installieren Sie es über das Terminal:

```bash
flatpak install --user ./Naia-Shell-x86_64.flatpak
```

> **So funktioniert es**: Naia läuft aus Sicherheitsgründen in einem isolierten Bereich. Wenn die KI Ihren PC steuern muss, fordert sie nur die notwendigen Berechtigungen an.

## Andere Formate

**AppImage**, **DEB** (Debian/Ubuntu) und **RPM** (Fedora/RHEL) sind ebenfalls auf der [Download-Seite](/en/download) verfügbar.

---

## (Für Entwickler) Lokale Flatpak-Build-Anleitung

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

> **Entwicklerhinweis:**
> Um die Host-Umgebung des Benutzers aus der Flatpak-Sandbox heraus zu manipulieren, umschließt der KI-Agent intern alle `execute_command`-Tool-Anfragen mit `flatpak-spawn --host bash -c ...` in `agent/src/gateway/tool-bridge.ts`.
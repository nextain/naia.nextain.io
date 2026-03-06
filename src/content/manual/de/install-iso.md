Diese Anleitung führt Sie durch die Installation von Naia OS von einem Live-USB-Laufwerk auf Ihre Festplatte, vom Booten bis zum Ausführen der Naia-App.

## Was Sie benötigen

- Ein USB-Laufwerk (8 GB oder größer), das mit der Naia OS ISO geflasht wurde
- Einen PC, der in den letzten 10 Jahren hergestellt wurde (die meisten sind kompatibel)
- Mindestens 64 GB Speicherplatz auf der Festplatte

> Laden Sie die ISO von der [Download-Seite](/de/download) herunter.

---

## Erstellen eines bootfähigen USB-Laufwerks

Laden Sie die Naia OS ISO von der [Download-Seite](/de/download) herunter und schreiben Sie sie anschließend auf ein USB-Laufwerk.

Wir empfehlen **[balenaEtcher](https://etcher.balena.io)** — es funktioniert unter Windows, macOS und Linux.

1. Laden Sie balenaEtcher herunter und öffnen Sie es.
2. Klicken Sie auf **Flash from file** und wählen Sie die Naia OS ISO aus.
3. Klicken Sie auf **Select target** und wählen Sie Ihr USB-Laufwerk aus.
4. Klicken Sie auf **Flash!** und warten Sie, bis der Vorgang abgeschlossen ist.

> **Warnung**: Dadurch werden alle Daten auf dem USB-Laufwerk gelöscht. Sichern Sie wichtige Dateien zuerst.

## Booten von USB und Start der Installation

Informationen zum Booten von USB finden Sie unter **[2. Naia OS Live-USB](/de/manual/live-usb)**.

Sie sehen ein **Auf Festplatte installieren**-Symbol oben links auf dem Desktop. Doppelklicken Sie darauf, um den Installationsassistenten zu öffnen.

## Schritt 1: Sprache & Tastatur

![Willkommensbildschirm](/images/manual/iso-install/01-welcome.png)

Wählen Sie Ihre bevorzugte Sprache und Tastaturbelegung aus. Verwenden Sie das Suchfeld zum Filtern (z. B. geben Sie "english" ein). Klicken Sie auf **Weiter**.

## Schritt 2: Datum und Uhrzeit

![Datum und Uhrzeit](/images/manual/iso-install/02-datetime.png)

Datum, Uhrzeit und Zeitzone werden automatisch erkannt. Passen Sie sie bei Bedarf an. Klicken Sie auf **Weiter**.

## Schritt 3: Installationsmethode

![Installationsmethode](/images/manual/iso-install/03-installation-method.png)

Wählen Sie die Zielfestplatte aus. **"Gesamte Festplatte verwenden"** ist die empfohlene Option — dadurch werden alle vorhandenen Daten auf der ausgewählten Festplatte gelöscht. Klicken Sie auf **Weiter**.

> **Warnung**: "Gesamte Festplatte verwenden" löscht alles auf dem ausgewählten Laufwerk. Sichern Sie wichtige Dateien zuerst.

## Schritt 4: Speicherkonfiguration

![Speicherkonfiguration](/images/manual/iso-install/04-storage.png)

Sie können wählen, ob Sie Ihre Festplatte verschlüsseln möchten. Wenn Sie sich nicht sicher sind, lassen Sie die Option einfach deaktiviert und fahren Sie fort. Klicken Sie auf **Weiter**.

## Schritt 5: Konto erstellen

![Konto erstellen](/images/manual/iso-install/05-create-account.png)

Geben Sie Ihren Namen, Benutzernamen und Ihr Passwort (mindestens 6 Zeichen) ein.

![Konto ausgefüllt](/images/manual/iso-install/05b-account-filled.png)

Sobald alle Felder grüne Häkchen zeigen, klicken Sie auf **Weiter**.

## Schritt 6: Überprüfen und Installieren

![Überprüfung](/images/manual/iso-install/06-review.png)

Überprüfen Sie Ihre Einstellungen — stellen Sie sicher, dass Sprache, Zeitzone und Kontoinformationen korrekt aussehen. Klicken Sie auf **Daten löschen und installieren**, um zu beginnen.

## Installationsfortschritt

![Installation läuft](/images/manual/iso-install/07-installing.png)

Der Installer durchläuft vier Phasen: Speicherkonfiguration, Softwareinstallation, Systemkonfiguration und Finalisierung.

![Fortschritt](/images/manual/iso-install/08-installing-progress.png)

> Dies dauert typischerweise **10–30 Minuten** je nach Ihrer Hardware. Die Phase "Softwareinstallation" ist die längste — der Bildschirm kann während dieses Schritts unverändert erscheinen. Das ist normal.

## Installation abgeschlossen

![Abgeschlossen](/images/manual/iso-install/09-complete.png)

Sie sehen "Erfolgreich installiert." Klicken Sie auf **Zum Live-Desktop beenden**, und starten Sie dann neu. Entfernen Sie das USB-Laufwerk, bevor Sie neu starten.

## Erster Start — Anmeldung

![Anmeldung](/images/manual/iso-install/10-login.png)

Nach dem Neustart erscheint der Anmeldebildschirm. Geben Sie das Passwort ein, das Sie während der Installation erstellt haben.

## Erster Start — Naia-App

![Naia-App](/images/manual/iso-install/12-naia-app.png)

Nach der Anmeldung **startet Naia automatisch**. Beim ersten Start wählen Sie Ihren bevorzugten KI-Anbieter. Wählen Sie einen Anbieter aus, konfigurieren Sie Ihren API Key, und schon kann es losgehen.

Willkommen bei Naia OS!
Installez Naia en tant qu'application autonome sur votre système Linux existant. Tous les fichiers d'installation sont disponibles sur la **[page de téléchargement](/fr/download)** ou sur **[itch.io](https://nextain.itch.io/naia)**.

## Configuration système requise

- **OS** : Linux (Ubuntu, Fedora, Bazzite, etc.)
- **Affichage** : Wayland (recommandé) ou X11
- L'installation de Flatpak ne nécessite aucune configuration d'exécution supplémentaire.

---

## Flatpak (Recommandé)

La façon la plus sécurisée d'installer. L'application s'exécute dans son propre espace isolé — votre système reste propre.

Téléchargez le bundle `.flatpak` depuis la [page de téléchargement](/fr/download) et installez via le terminal :

```bash
flatpak install --user ./Naia-Shell-x86_64.flatpak
```

> **Comment ça marche** : Naia s'exécute dans un espace isolé pour plus de sécurité. Lorsque l'IA doit contrôler votre PC, elle ne demande que les permissions nécessaires.

## Autres formats

**AppImage**, **DEB** (Debian/Ubuntu), et **RPM** (Fedora/RHEL) sont également disponibles sur la [page de téléchargement](/fr/download).

---

## (Pour les développeurs) Guide de construction Flatpak local

Pour construire l'application sandbox Flatpak à partir du code source, suivez ces étapes :

1.  **Installez Flatpak Builder**
    ```bash
    # Fedora / Bazzite
    sudo dnf install flatpak-builder

    # Ubuntu
    sudo apt install flatpak-builder
    ```

2.  **Ajoutez les dépendances de construction (SDK)**
    ```bash
    flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
    flatpak install --user flathub org.freedesktop.Platform//24.08 org.freedesktop.Sdk//24.08
    ```

3.  **Exécutez la construction du paquet**
    Exécutez ceci dans le répertoire racine du projet (Naia-OS).
    ```bash
    # Compiles and builds into the build-dir
    flatpak-builder --user --install --force-clean build-dir flatpak/com.naia.shell.yml
    ```

4.  **Exécutez l'application**
    ```bash
    flatpak run com.naia.shell
    ```

> **Note du développeur** :
> Pour manipuler l'environnement hôte de l'utilisateur depuis l'intérieur du sandbox Flatpak, l'agent IA enveloppe en interne toutes les requêtes d'outil `execute_command` avec `flatpak-spawn --host bash -c ...` dans `agent/src/gateway/tool-bridge.ts`.
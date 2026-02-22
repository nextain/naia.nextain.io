Naia est principalement conçu pour les environnements Linux, se concentrant sur les systèmes d'exploitation immuables comme Bazzite ou les environnements de bac à sable sécurisés comme Flatpak.

## Configuration Requise

- **OS** : Linux (Bazzite, Ubuntu, Fedora, etc.)
- **Serveur d'affichage** : Wayland (recommandé) ou X11
- **Runtime** : Node.js 22+ (si compilation à partir des sources)
- **Démon** : Nécessite la prise en charge des services utilisateur Systemd

---

## Options de Déploiement

Étant donné que Naia intègre une IA qui "contrôle directement le système d'exploitation", la méthode de déploiement est une considération importante.

### 1. Distribution Flatpak (Recommandé)
C'est le moyen le plus courant et le plus sécurisé de distribuer des applications de bureau Linux. Vous pouvez l'installer facilement via des magasins d'applications comme Discover ou GNOME Software.

- **Isolation sécurisée** : L'interface utilisateur de l'application (Tauri) et l'agent principal (Node.js) s'exécutent entièrement à l'intérieur du bac à sable.
- **Exécution sur l'hôte** : Lorsque l'IA a besoin d'exécuter des commandes de terminal (par exemple, installer un paquet ou gérer le système de fichiers de l'hôte), elle sort du bac à sable en toute sécurité en utilisant `flatpak-spawn --host`.
- **Comment installer** :
  Téléchargez le paquet `.flatpak` fourni et installez-le via le terminal :
  ```bash
  flatpak install --user ./Naia-OS.flatpak
  ```

### 2. Image intégrée Bazzite / BlueBuild (Avancé)
Pour les utilisateurs avancés, Naia fournit une recette BlueBuild pour intégrer l'application directement dans une image Bazzite. Cela intègre profondément l'IA dans le système d'exploitation, permettant à l'avatar de l'IA de vous accueillir immédiatement au démarrage.

---

## 🛠️ (Pour les développeurs) Guide de compilation Flatpak local

Pour compiler l'application bac à sable Flatpak à partir du code source, suivez ces étapes :

1. **Installer Flatpak Builder**
   ```bash
   # Fedora / Bazzite
   sudo dnf install flatpak-builder
   
   # Ubuntu
   sudo apt install flatpak-builder
   ```

2. **Ajouter les dépendances de compilation (SDK)**
   ```bash
   flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
   flatpak install --user flathub org.freedesktop.Platform//24.08 org.freedesktop.Sdk//24.08
   ```

3. **Exécuter la compilation du paquet**
   Exécutez ceci dans le répertoire racine du projet (Naia-OS).
   ```bash
   # Compiles and builds into the build-dir
   flatpak-builder --user --install --force-clean build-dir flatpak/com.naia.shell.yml
   ```

4. **Exécuter l'application**
   ```bash
   flatpak run com.naia.shell
   ```

> **💡 Note du développeur :**
> Pour manipuler l'environnement hôte de l'utilisateur depuis l'intérieur du bac à sable Flatpak, l'agent IA enveloppe en interne toutes les requêtes d'outil `execute_command` avec `flatpak-spawn --host bash -c ...` dans `agent/src/gateway/tool-bridge.ts`.
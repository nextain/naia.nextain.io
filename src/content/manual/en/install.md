Naia OS is designed primarily for Linux environments, focusing on Immutable OSs like Bazzite or secure sandbox environments like Flatpak.

## System Requirements

- **OS**: Linux (Bazzite, Ubuntu, Fedora, etc.)
- **Display Server**: Wayland (recommended) or X11
- **Runtime**: Node.js 22+ (if building from source)
- **Daemon**: Requires Systemd User Service support

---

## Deployment Options

Since Naia OS features an AI that "controls the OS directly," the deployment method is an important consideration.

### 1. Flatpak Distribution (Recommended)
This is the most common and secure way to distribute Linux desktop apps. You can easily install it via app stores like Discover or GNOME Software.

- **Secure Isolation**: The app's UI (Tauri) and core agent (Node.js) run entirely inside the sandbox.
- **Host Execution**: When the AI needs to execute terminal commands (e.g., installing a package or managing the host file system), it safely escapes the sandbox using `flatpak-spawn --host`.
- **How to Install**:
  Download the `.flatpak` bundle from the [Download page](/en/download) and install via terminal:
  ```bash
  flatpak install --user ./Naia-Shell-x86_64.flatpak
  ```

> **Other formats available**: AppImage, DEB (Debian/Ubuntu), RPM (Fedora/RHEL). See the [Download page](/en/download) for all options.

### 2. Bazzite / BlueBuild Integrated Image (Advanced)
For advanced users, Naia OS provides a BlueBuild recipe to bake the app directly into a Bazzite image. This deeply integrates the AI into the OS, allowing the AI avatar to greet you immediately upon boot.

---

## 🛠️ (For Developers) Local Flatpak Build Guide

To build the Flatpak sandbox app from the source code, follow these steps:

1. **Install Flatpak Builder**
   ```bash
   # Fedora / Bazzite
   sudo dnf install flatpak-builder
   
   # Ubuntu
   sudo apt install flatpak-builder
   ```

2. **Add Build Dependencies (SDK)**
   ```bash
   flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
   flatpak install --user flathub org.freedesktop.Platform//24.08 org.freedesktop.Sdk//24.08
   ```

3. **Run the Packaging Build**
   Execute this in the project root directory (Naia-OS).
   ```bash
   # Compiles and builds into the build-dir
   flatpak-builder --user --install --force-clean build-dir flatpak/com.naia.shell.yml
   ```

4. **Run the App**
   ```bash
   flatpak run com.naia.shell
   ```

> **💡 Developer Note:**
> To manipulate the user's host environment from inside the Flatpak sandbox, the AI agent internally wraps all `execute_command` tool requests with `flatpak-spawn --host bash -c ...` in `agent/src/gateway/tool-bridge.ts`.

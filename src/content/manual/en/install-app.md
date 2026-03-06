Install Naia as a standalone app on your existing Linux system. All installation files are available on the **[Download page](/en/download)** or **[itch.io](https://nextain.itch.io/naia)**.

## System Requirements

- **OS**: Linux (Ubuntu, Fedora, Bazzite, etc.)
- **Display**: Wayland (recommended) or X11
- Flatpak installation requires no additional runtime setup.

---

## Flatpak (Recommended)

The most secure way to install. The app runs in its own isolated space — your system stays clean.

Download the `.flatpak` bundle from the [Download page](/en/download) and install via terminal:

```bash
flatpak install --user ./Naia-Shell-x86_64.flatpak
```

> **How it works**: Naia runs in an isolated space for safety. When the AI needs to control your PC, it requests only the necessary permissions.

## Other Formats

**AppImage**, **DEB** (Debian/Ubuntu), and **RPM** (Fedora/RHEL) are also available on the [Download page](/en/download).

---

## (For Developers) Local Flatpak Build Guide

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

> **Developer Note:**
> To manipulate the user's host environment from inside the Flatpak sandbox, the AI agent internally wraps all `execute_command` tool requests with `flatpak-spawn --host bash -c ...` in `agent/src/gateway/tool-bridge.ts`.

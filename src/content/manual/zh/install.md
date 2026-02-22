Naia 主要为 Linux 环境设计，重点关注 Bazzite 等不可变操作系统或 Flatpak 等安全沙盒环境。

## 系统要求

- **操作系统**: Linux (Bazzite, Ubuntu, Fedora 等)
- **显示服务器**: Wayland (推荐) 或 X11
- **运行时**: Node.js 22+ (如果从源代码构建)
- **守护进程**: 需要 Systemd User Service 支持

---

## 部署选项

由于 Naia 的 AI 能够“直接控制操作系统”，因此部署方法是一个重要的考虑因素。

### 1. Flatpak 分发 (推荐)
这是分发 Linux 桌面应用程序最常见、最安全的方式。您可以通过 Discover 或 GNOME Software 等应用商店轻松安装它。

- **安全隔离**: 应用程序的用户界面 (Tauri) 和核心代理 (Node.js) 完全在沙盒内运行。
- **主机执行**: 当 AI 需要执行终端命令（例如，安装软件包或管理主机文件系统）时，它会使用 `flatpak-spawn --host` 安全地逃逸沙盒。
- **如何安装**:
  下载提供的 `.flatpak` 捆绑包并通过终端安装：
  ```bash
  flatpak install --user ./Naia-OS.flatpak
  ```

### 2. Bazzite / BlueBuild 集成镜像 (高级)
对于高级用户，Naia 提供了一个 BlueBuild 配方，可以将应用程序直接集成到 Bazzite 镜像中。这使得 AI 深度融入操作系统，让 AI 形象在启动时立即问候您。

---

## 🛠️ (面向开发者) 本地 Flatpak 构建指南

要从源代码构建 Flatpak 沙盒应用程序，请按照以下步骤操作：

1. **安装 Flatpak Builder**
   ```bash
   # Fedora / Bazzite
   sudo dnf install flatpak-builder
   
   # Ubuntu
   sudo apt install flatpak-builder
   ```

2. **添加构建依赖 (SDK)**
   ```bash
   flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
   flatpak install --user flathub org.freedesktop.Platform//24.08 org.freedesktop.Sdk//24.08
   ```

3. **运行打包构建**
   在项目根目录 (Naia-OS) 中执行此操作。
   ```bash
   # Compiles and builds into the build-dir
   flatpak-builder --user --install --force-clean build-dir flatpak/com.naia.shell.yml
   ```

4. **运行应用程序**
   ```bash
   flatpak run com.naia.shell
   ```

> **💡 开发者须知:**
> 为了从 Flatpak 沙盒内部操作用户的主机环境，AI 代理在 `agent/src/gateway/tool-bridge.ts` 中，将所有 `execute_command` 工具请求内部包装为 `flatpak-spawn --host bash -c ...`。
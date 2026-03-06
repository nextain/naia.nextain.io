将 Naia 作为独立应用程序安装到您现有的 Linux 系统上。所有安装文件均可在 **[下载页面](/zh/download)** 或 **[itch.io](https://nextain.itch.io/naia)** 上获取。

## 系统要求

- **操作系统**： Linux (Ubuntu, Fedora, Bazzite 等)
- **显示器**： Wayland（推荐）或 X11
- Flatpak 安装无需额外的运行时设置。

---

## Flatpak（推荐）

最安全的安装方式。应用程序在其独立的沙盒空间中运行 — 您的系统保持洁净。

从[下载页面](/zh/download)下载 `.flatpak` 捆绑包并通过终端安装：

```bash
flatpak install --user ./Naia-Shell-x86_64.flatpak
```

> **工作原理**： Naia 在独立的沙盒空间中运行以确保安全。当 AI 需要控制您的电脑时，它只会请求必要的权限。

## 其他格式

**AppImage**、**DEB** (Debian/Ubuntu) 和 **RPM** (Fedora/RHEL) 也可在[下载页面](/zh/download)上获取。

---

## （面向开发者）本地 Flatpak 构建指南

要从源代码构建 Flatpak 沙盒应用程序，请遵循以下步骤：

1. **安装 Flatpak Builder**
   ```bash
   # Fedora / Bazzite
   sudo dnf install flatpak-builder

   # Ubuntu
   sudo apt install flatpak-builder
   ```

2. **添加构建依赖项 (SDK)**
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

> **开发者注意**：
> 为了从 Flatpak 沙盒内部操作用户的主机环境，AI 代理在 `agent/src/gateway/tool-bridge.ts` 中，将所有 `execute_command` 工具请求内部包装为 `flatpak-spawn --host bash -c ...`。
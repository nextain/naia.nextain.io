本指南将引导您完成从 Live USB 驱动器到硬盘安装 Naia OS 的过程，从启动到运行 Naia 应用程序。

## 您需要什么

- 一个已写入 Naia OS ISO 镜像的 USB 驱动器（8 GB 或更大）
- 一台过去 10 年内生产的电脑（大多数兼容）
- 至少 64 GB 的磁盘空间

> 从 [下载页面](/zh/download) 下载 ISO 镜像。

---

## 创建可启动 USB 驱动器

从 [下载页面](/zh/download) 下载 Naia OS ISO 镜像，然后将其写入 USB 驱动器。

我们推荐使用 **[balenaEtcher](https://etcher.balena.io)** —— 它可在 Windows、macOS 和 Linux 上运行。

1. 下载并打开 balenaEtcher。
2. 点击 **Flash from file**，然后选择 Naia OS ISO 镜像。
3. 点击 **Select target**，然后选择您的 USB 驱动器。
4. 点击 **Flash!**，然后等待其完成。

> **警告**：这会擦除 USB 驱动器上的所有数据。请务必先备份重要文件。

## 从 USB 启动并开始安装

有关如何从 USB 启动，请参阅 **[2. Naia OS Live USB](/zh/manual/live-usb)**。

您会在桌面左上角看到一个 **Install to Hard Drive** 图标。双击它以打开安装向导。

## 步骤 1：语言和键盘

![欢迎屏幕](/images/manual/iso-install/01-welcome.png)

选择您的首选语言和键盘布局。使用搜索框进行筛选（例如，输入“english”）。点击 **Next**。

## 步骤 2：日期和时间

![日期和时间](/images/manual/iso-install/02-datetime.png)

日期、时间和时区会自动检测。如果需要，请进行调整。点击 **Next**。

## 步骤 3：安装方法

![安装方法](/images/manual/iso-install/03-installation-method.png)

选择目标磁盘。**“Use entire disk”** 是推荐选项 —— 这将擦除所选磁盘上的所有现有数据。点击 **Next**。

> **警告**：“Use entire disk”将擦除所选驱动器上的所有内容。请务必先备份重要文件。

## 步骤 4：存储配置

![存储配置](/images/manual/iso-install/04-storage.png)

您可以选择加密磁盘。如果您不确定，请保持未选中并继续。点击 **Next**。

## 步骤 5：创建账户

![创建账户](/images/manual/iso-install/05-create-account.png)

填写您的姓名、用户名和密码（6 个字符以上）。

![账户已填写](/images/manual/iso-install/05b-account-filled.png)

当所有字段都显示绿色对勾时，点击 **Next**。

## 6：审查并安装

![审查](/images/manual/iso-install/06-review.png)

审查您的设置 — 检查语言、时区和账户信息是否正确。点击 **Erase data and install** 开始。

## 安装进度

![正在安装](/images/manual/iso-install/07-installing.png)

安装程序会经历四个阶段：存储配置、软件安装、系统配置和最终化。

![进度](/images/manual/iso-install/08-installing-progress.png)

> 这通常需要 **10–30 分钟**，具体取决于您的硬件。“Software installation”阶段最长 — 在此步骤中屏幕可能看起来没有变化。这是正常的。

## 安装完成

![完成](/images/manual/iso-install/09-complete.png)

您会看到“Successfully installed.”。点击 **Exit to live desktop**，然后重启。在重启前移除 USB 驱动器。

## 首次启动 — 登录

![登录](/images/manual/iso-install/10-login.png)

重启后，会出现登录屏幕。输入您在安装期间创建的密码。

## 首次启动 — Naia 应用程序

![Naia 应用程序](/images/manual/iso-install/12-naia-app.png)

登录后，**Naia 会自动启动**。首次运行时，选择您偏好的 AI 提供商。选择提供商，配置您的 API key，然后您就可以开始了。

欢迎使用 Naia OS！
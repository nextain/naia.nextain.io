Установите Naia как отдельное приложение на вашу существующую систему Linux. Все установочные файлы доступны на **[странице загрузки](/ru/download)** или **[itch.io](https://nextain.itch.io/naia)**.

## Системные требования

- **ОС**: Linux (Ubuntu, Fedora, Bazzite и т. д.)
- **Дисплей**: Wayland (рекомендуется) или X11
- Установка с помощью Flatpak не требует дополнительной настройки среды выполнения.

---

## Flatpak (рекомендуется)

Наиболее безопасный способ установки. Приложение работает в собственном изолированном пространстве — ваша система остается чистой.

Загрузите пакет `.flatpak` со [страницы загрузки](/ru/download) и установите через терминал:

```bash
flatpak install --user ./Naia-Shell-x86_64.flatpak
```

> **Как это работает**: Naia работает в изолированном пространстве для безопасности. Когда ИИ требуется управлять вашим ПК, он запрашивает только необходимые разрешения.

## Другие форматы

**AppImage**, **DEB** (Debian/Ubuntu) и **RPM** (Fedora/RHEL) также доступны на [странице загрузки](/ru/download).

---

## (Для разработчиков) Руководство по локальной сборке Flatpak

Чтобы собрать приложение-песочницу Flatpak из исходного кода, выполните следующие шаги:

1. **Установите Flatpak Builder**
   ```bash
   # Fedora / Bazzite
   sudo dnf install flatpak-builder

   # Ubuntu
   sudo apt install flatpak-builder
   ```

2. **Добавьте зависимости сборки (SDK)**
   ```bash
   flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
   flatpak install --user flathub org.freedesktop.Platform//24.08 org.freedesktop.Sdk//24.08
   ```

3. **Запустите сборку пакета**
   Выполните это в корневом каталоге проекта (Naia-OS).
   ```bash
   # Компилирует и собирает в build-dir
   flatpak-builder --user --install --force-clean build-dir flatpak/com.naia.shell.yml
   ```

4. **Запустите приложение**
   ```bash
   flatpak run com.naia.shell
   ```

> **Примечание для разработчиков:**
> Чтобы манипулировать хост-средой пользователя изнутри песочницы Flatpak, ИИ-агент внутренне оборачивает все запросы инструмента `execute_command` с помощью `flatpak-spawn --host bash -c ...` в `agent/src/gateway/tool-bridge.ts`.
Instala Naia como una aplicación independiente en tu sistema Linux existente. Todos los archivos de instalación están disponibles en la **[página de Descarga](/es/download)** o **[itch.io](https://nextain.itch.io/naia)**.

## Requisitos del Sistema

- **SO**: Linux (Ubuntu, Fedora, Bazzite, etc.)
- **Pantalla**: Wayland (recomendado) o X11
- La instalación de Flatpak no requiere configuración de tiempo de ejecución adicional.

---

## Flatpak (Recomendado)

La forma más segura de instalar. La aplicación se ejecuta en su propio espacio aislado — tu sistema se mantiene limpio.

Descarga el paquete `.flatpak` desde la [página de Descarga](/es/download) e instálalo a través de la terminal:

```bash
flatpak install --user ./Naia-Shell-x86_64.flatpak
```

> **Cómo funciona**: Naia se ejecuta en un espacio aislado por seguridad. Cuando la IA necesita controlar tu PC, solicita solo los permisos necesarios.

## Otros Formatos

**AppImage**, **DEB** (Debian/Ubuntu) y **RPM** (Fedora/RHEL) también están disponibles en la [página de Descarga](/es/download).

---

## (Para Desarrolladores) Guía de Construcción Local de Flatpak

Para construir la aplicación sandbox de Flatpak desde el código fuente, sigue estos pasos:

1. **Instalar Flatpak Builder**
   ```bash
   # Fedora / Bazzite
   sudo dnf install flatpak-builder

   # Ubuntu
   sudo apt install flatpak-builder
   ```

2. **Añadir Dependencias de Construcción (SDK)**
   ```bash
   flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
   flatpak install --user flathub org.freedesktop.Platform//24.08 org.freedesktop.Sdk//24.08
   ```

3. **Ejecutar la Construcción del Empaquetado**
   Ejecuta esto en el directorio raíz del proyecto (Naia-OS).
   ```bash
   # Compiles and builds into the build-dir
   flatpak-builder --user --install --force-clean build-dir flatpak/com.naia.shell.yml
   ```

4. **Ejecutar la Aplicación**
   ```bash
   flatpak run com.naia.shell
   ```

> **Nota del Desarrollador**:
> Para manipular el entorno host del usuario desde dentro del sandbox de Flatpak, el agente de IA envuelve internamente todas las solicitudes de la herramienta `execute_command` con `flatpak-spawn --host bash -c ...` en `agent/src/gateway/tool-bridge.ts`.
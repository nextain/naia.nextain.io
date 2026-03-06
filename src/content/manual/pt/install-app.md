Instale o Naia como um aplicativo autônomo em seu sistema Linux existente. Todos os arquivos de instalação estão disponíveis na **[página de Download](/pt/download)** ou **[itch.io](https://nextain.itch.io/naia)**.

## Requisitos do Sistema

- **OS**: Linux (Ubuntu, Fedora, Bazzite, etc.)
- **Monitor**: Wayland (recomendado) ou X11
- A instalação Flatpak não requer configuração de tempo de execução adicional.

---

## Flatpak (Recomendado)

A forma mais segura de instalar. O aplicativo é executado em seu próprio espaço isolado — seu sistema permanece limpo.

Baixe o pacote `.flatpak` da [página de Download](/pt/download) e instale via terminal:

```bash
flatpak install --user ./Naia-Shell-x86_64.flatpak
```

> **Como funciona**: O Naia é executado em um espaço isolado por segurança. Quando a IA precisa controlar seu PC, ele solicita apenas as permissões necessárias.

## Outros Formatos

**AppImage**, **DEB** (Debian/Ubuntu), e **RPM** (Fedora/RHEL) também estão disponíveis na [página de Download](/pt/download).

---

## (Para Desenvolvedores) Guia de Construção Local Flatpak

Para construir o aplicativo sandbox Flatpak a partir do código-fonte, siga estas etapas:

1. **Instalar o Flatpak Builder**
   ```bash
   # Fedora / Bazzite
   sudo dnf install flatpak-builder

   # Ubuntu
   sudo apt install flatpak-builder
   ```

2. **Adicionar Dependências de Construção (SDK)**
   ```bash
   flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
   flatpak install --user flathub org.freedesktop.Platform//24.08 org.freedesktop.Sdk//24.08
   ```

3. **Executar a Construção do Pacote**
   Execute isso no diretório raiz do projeto (Naia-OS).
   ```bash
   # Compila e constrói no build-dir
   flatpak-builder --user --install --force-clean build-dir flatpak/com.naia.shell.yml
   ```

4. **Executar o Aplicativo**
   ```bash
   flatpak run com.naia.shell
   ```

> **Nota do Desenvolvedor**:
> Para manipular o ambiente host do usuário de dentro do sandbox Flatpak, o agente de IA internamente envolve todas as requisições da ferramenta `execute_command` com `flatpak-spawn --host bash -c ...` em `agent/src/gateway/tool-bridge.ts`.
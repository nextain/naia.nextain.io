Este guia mostra como instalar o Naia OS de uma unidade USB live para o seu disco rígido, desde o boot até a execução do aplicativo Naia.

## O Que Você Precisa

- Uma unidade USB (8 GB ou maior) gravada com a ISO do Naia OS
- Um PC fabricado nos últimos 10 anos (a maioria é compatível)
- Pelo menos 64 GB de espaço em disco

> Baixe a ISO na [página de Download](/pt/download).

---

## Criar uma Unidade USB Bootável

Baixe a ISO do Naia OS na [página de Download](/pt/download) e, em seguida, grave-a em uma unidade USB.

Recomendamos o **[balenaEtcher](https://etcher.balena.io)** — ele funciona no Windows, macOS e Linux.

1. Baixe e abra o balenaEtcher.
2. Clique em **Flash from file** e selecione a ISO do Naia OS.
3. Clique em **Select target** e escolha sua unidade USB.
4. Clique em **Flash!** e espere que termine.

> **Aviso**: Isso apagará todos os dados na unidade USB. Faça backup de arquivos importantes primeiro.

## Inicializar a partir do USB e Iniciar a Instalação

Para saber como inicializar a partir do USB, consulte **[2. Naia OS Live USB](/pt/manual/live-usb)**.

Você verá um ícone **Instalar no Disco Rígido** no canto superior esquerdo da área de trabalho. Dê um clique duplo para abrir o assistente de instalação.

## Passo 1: Idioma e Teclado

![Tela de boas-vindas](/images/manual/iso-install/01-welcome.png)

Selecione seu idioma preferido e layout de teclado. Use a caixa de pesquisa para filtrar (ex: digite "português"). Clique em **Avançar**.

## Passo 2: Data e Hora

![Data e hora](/images/manual/iso-install/02-datetime.png)

Data, hora e fuso horário são detectados automaticamente. Ajuste se necessário. Clique em **Avançar**.

## Passo 3: Método de Instalação

![Método de instalação](/images/manual/iso-install/03-installation-method.png)

Selecione o disco de destino. **"Usar o disco inteiro"** é a opção recomendada — isso apagará todos os dados existentes no disco selecionado. Clique em **Avançar**.

> **Aviso**: "Usar o disco inteiro" apagará tudo na unidade selecionada. Faça backup de arquivos importantes primeiro.

## Passo 4: Configuração de Armazenamento

![Configuração de armazenamento](/images/manual/iso-install/04-storage.png)

Você pode optar por criptografar seu disco. Se não tiver certeza, apenas deixe desmarcado e continue. Clique em **Avançar**.

## Passo 5: Criar Conta

![Criar conta](/images/manual/iso-install/05-create-account.png)

Preencha seu nome, nome de usuário e senha (6+ caracteres).

![Conta preenchida](/images/manual/iso-install/05b-account-filled.png)

Assim que todos os campos mostrarem marcas de verificação verdes, clique em **Avançar**.

## Passo 6: Revisar e Instalar

![Revisão](/images/manual/iso-install/06-review.png)

Revise suas configurações — verifique se o idioma, fuso horário e informações da conta estão corretos. Clique em **Apagar dados e instalar** para começar.

## Progresso da Instalação

![Instalando](/images/manual/iso-install/07-installing.png)

O instalador prossegue por quatro etapas: Configuração de armazenamento, Instalação de software, Configuração do sistema e Finalização.

![Progresso](/images/manual/iso-install/08-installing-progress.png)

> Isso geralmente leva **10–30 minutos** dependendo do seu hardware. A etapa de "Instalação de software" é a mais longa — a tela pode parecer inalterada durante esta etapa. Isso é normal.

## Instalação Concluída

![Concluído](/images/manual/iso-install/09-complete.png)

Você verá "Instalação concluída com sucesso.". Clique em **Sair para a área de trabalho live**, e em seguida, reinicie. Remova a unidade USB antes de reiniciar.

## Primeira Inicialização — Login

![Login](/images/manual/iso-install/10-login.png)

Após reiniciar, a tela de login aparece. Digite a senha que você criou durante a instalação.

## Primeira Inicialização — Aplicativo Naia

![Aplicativo Naia](/images/manual/iso-install/12-naia-app.png)

Após o login, o **Naia é iniciado automaticamente**. Na primeira execução, escolha seu provedor de IA preferido. Selecione um provedor, configure sua API Key e você estará pronto para usar.

Bem-vindo ao Naia OS!
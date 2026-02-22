Esta aba permite monitorar a saúde, estatísticas e logs em tempo real do daemon OpenClaw Gateway executando em segundo plano no Naia.

![Aba de Diagnóstico](diagnostics-tab.png)

## Visão Geral do Status
Na grade superior, você pode verificar as principais métricas do gateway:
- **Gateway**: Status atual da conexão (🟢 OK, 🔴 Erro)
- **Node ID**: O identificador único do gateway
- **Uptime**: Há quanto tempo o sistema está em execução
- **Platform / Arch**: Informações de SO e arquitetura
- **Total Requests / Tokens**: Requisições e tokens processados hoje
- **Total Cost**: Custo total incorrido

## Streaming de Logs em Tempo Real
O painel inferior transmite logs internos detalhados diretamente do gateway.
- **Iniciar Logs / Parar Logs**: Você pode iniciar ou parar o fluxo de logs a qualquer momento.
- Se o sistema encontrar um problema ou uma integração de mensageiro falhar, você pode encontrar a causa detalhada nestes logs.

## Lista de Métodos RPC
Na parte inferior da aba, uma lista de todos os métodos de Chamada de Procedimento Remoto (RPC) suportados é exibida como tags, permitindo que você verifique rapidamente quais funcionalidades o gateway atualmente suporta.
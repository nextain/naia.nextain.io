Esta pestaña le permite monitorizar la salud, las estadísticas y los registros en tiempo real del demonio OpenClaw Gateway ejecutándose en segundo plano en Naia.

![Diagnostics Tab](diagnostics-tab.png)

## Vista General del Estado
En la cuadrícula superior, puede verificar las métricas clave del gateway:
- **Gateway**: Estado actual de la conexión (🟢 OK, 🔴 Error)
- **Node ID**: El identificador único del gateway
- **Uptime**: Tiempo que el sistema ha estado en funcionamiento
- **Platform / Arch**: Información del sistema operativo y la arquitectura
- **Total Requests / Tokens**: Solicitudes y tokens procesados hoy
- **Total Cost**: Costo total incurrido

## Transmisión de Registros en Tiempo Real
El panel inferior transmite registros internos detallados directamente desde el gateway.
- **Start Logs / Stop Logs**: Puede iniciar o detener la transmisión de registros en cualquier momento.
- Si el sistema encuentra un problema o falla una integración de mensajería, puede encontrar la causa detallada en estos registros.

## Lista de Métodos RPC
En la parte inferior de la pestaña, se muestra una lista de todos los métodos de Llamada a Procedimiento Remoto (RPC) soportados como etiquetas, lo que le permite verificar rápidamente qué características soporta actualmente el gateway.
import type { Dictionary } from "./types";

const es: Dictionary = {
  "locale": "es",
  "meta": {
    "title": "Naia OS",
    "description": "Naia OS: tu IA personal, simplificada. Chatea, habla y trabaja con avatar 3D AI 아바타."
  },
  "common": {
    "loading": "Cargando...",
    "loadingShort": "Cargando...",
    "error": "Se produjo un error",
    "save": "Guardar",
    "cancel": "Cancelar",
    "delete": "Eliminar",
    "confirm": "Confirmar",
    "copy": "Copiar",
    "copied": "Copiado",
    "comingSoon": "Próximamente",
    "backTo": "Atrás",
    "prev": "Anterior",
    "next": "Siguiente",
    "page": "Página"
  },
  "header": {
    "home": "Inicio",
    "pricing": "Precios",
    "faq": "Preguntas frecuentes",
    "download": "Descargar",
    "login": "Iniciar sesión",
    "dashboard": "Panel de control",
    "toggleMenu": "Alternar menú",
    "manual": "manuales"
  },
  "footer": {
    "brand": "Naia OS",
    "tagline": "Donde la tecnología se encuentra con la emoción",
    "links": {
      "privacy": "Política de privacidad",
      "terms": "Términos de servicio",
      "refund": "Política de reembolso",
      "contact": "Contacto"
    },
    "copyright": "© 2026 Nextain. Reservados todos los derechos."
  },
  "auth": {
    "loginTitle": "Iniciar sesión / Registrarse",
    "loginDescription": "Comience con su cuenta social",
    "googleLogin": "Continuar con Google",
    "discordLogin": "Continuar con discordia",
    "logout": "Cerrar sesión",
    "callbackRedirecting": "Redirigiendo a la aplicación de escritorio...",
    "callbackManualPrefix": "Si no se abre automáticamente,",
    "callbackManualLink": "haga clic aquí",
    "callbackManualSuffix": "."
  },
  "home": {
    "hero": {
      "title": "El agente de IA más avanzado, como el sistema operativo perfecto.",
      "subtitle": "Desde la integración de 3 LLM principales hasta el control de terminales y un avatar VRM que expresa emociones. Un ecosistema de IA completo que puedes experimentar sin ser desarrollador, Naia OS.",
      "cta": "Comience gratis",
      "secondaryCta": "Descargar"
    },
    "features": {
      "title": "¿Qué hace que Naia sea especial?",
      "subtitle": "Experimente el poder de los agentes de IA: no se requiere codificación",
      "items": {
        "companion": {
          "title": "AI Avatar AI Aplicación",
          "description": "Un avatar 3D con emociones, directamente en tu escritorio. AI 아바타 reacciona a las conversaciones con expresiones faciales y contacto visual."
        },
        "multiProvider": {
          "title": "Géminis gratis · Más modelos próximamente",
          "description": "Actualmente apoyando a Gemini con créditos gratis. La compatibilidad con claves API para Grok, Anthropic(Claude), OpenAI y Zhipu(GLM) está prevista y estará disponible próximamente."
        },
        "voice": {
          "title": "Conversaciones de voz",
          "description": "Pregunte por voz, obtenga respuestas habladas. AI 아바타 responde de forma natural con animaciones sincronizadas con los labios."
        },
        "tools": {
          "title": "Ejecución de herramientas",
          "description": "Edición de archivos, comandos de terminal, búsqueda web. AI 아바타 llama a las herramientas directamente para realizar el trabajo."
        },
        "desktop": {
          "title": "Instalación y sistema operativo con un solo clic",
          "description": "Instale la aplicación de escritorio con un clic o cree un entorno de IA dedicado con la imagen del sistema operativo Linux."
        }
      }
    },
    "pricing": {
      "title": "Precios sencillos",
      "subtitle": "Paga solo por lo que necesitas",
      "policyNote": "Revise los documentos de facturación, reembolso y política a continuación.",
      "free": {
        "name": "GRATIS",
        "price": "$0",
        "period": "para siempre",
        "description": "Comience con solo registrarse",
        "features": [
          "20 créditos al registrarse",
          "Recarga mensual de 10 créditos",
          "Modelos Géminis",
          "Chat de voz básico",
          "Apoyo comunitario"
        ],
        "cta": "Comience gratis"
      },
      "basic": {
        "name": "BÁSICO",
        "price": "$10",
        "period": "mes",
        "description": "Para los que quieren más",
        "features": [
          "100 créditos mensuales",
          "Modelos Géminis",
          "Chat de voz de alta calidad",
          "Apoyo prioritario",
          "Funciones de voz avanzadas"
        ],
        "cta": "Actualizar"
      }
    },
    "faq": {
      "title": "Preguntas frecuentes"
    }
  },
  "sidebar": {
    "dashboard": "Panel de control",
    "usage": "Uso",
    "logs": "Registros",
    "keys": "Claves API",
    "settings": "Configuración",
    "billing": "Facturación"
  },
  "dashboard": {
    "title": "Panel de control",
    "creditBalance": "Saldo de crédito",
    "totalRequests": "Solicitudes totales",
    "totalTokens": "Fichas totales",
    "totalSpend": "Gasto total",
    "currentPeriod": "Período actual",
    "quickLinks": "Enlaces rápidos",
    "statusActive": "Activo",
    "statusBlocked": "Bloqueado"
  },
  "usage": {
    "title": "Uso",
    "period": {
      "days7": "7 dias",
      "days30": "30 dias",
      "days90": "90 dias"
    },
    "requestsPerDay": "Solicitudes / Día",
    "tokensPerDay": "Fichas / Día",
    "spendPerDay": "Gastar / Día",
    "noData": "No hay datos para el periodo seleccionado"
  },
  "logs": {
    "title": "Registros",
    "all": "Todos",
    "filterStatus": "Filtro de estado",
    "filterModel": "Filtro de modelo",
    "columns": {
      "time": "tiempo",
      "status": "Estado",
      "model": "modelo",
      "tokens": "Fichas",
      "cost": "Costo"
    },
    "details": {
      "id": "ID de registro",
      "endpoint": "Punto final",
      "provider": "Proveedor",
      "promptTokens": "Fichas de aviso",
      "completionTokens": "Fichas de finalización",
      "error": "error"
    },
    "noLogs": "Aún no hay registros",
    "expandDetails": "Mostrar detalles"
  },
  "keys": {
    "title": "Claves API",
    "createKey": "Crear clave",
    "keyName": "Nombre clave",
    "keyNamePlaceholder": "p.ej. clave-de-mi-escritorio",
    "expires": "Vence",
    "noExpiry": "Sin caducidad",
    "days30": "30 dias",
    "days90": "90 dias",
    "days365": "1 año",
    "columns": {
      "name": "Nombre",
      "status": "Estado",
      "created": "Creado",
      "actions": "Acciones"
    },
    "noKeys": "Aún no se han creado claves",
    "deleteConfirm": "¿Está seguro de que desea eliminar esta clave?",
    "keyCreated": "Clave creada",
    "keyCreatedDescription": "Esta clave sólo se mostrará una vez. Guárdelo en un lugar seguro.",
    "active": "Activo",
    "revoked": "Revocado",
    "unnamed": "clave sin nombre",
    "forbiddenAction": "No tienes permiso para esta clave."
  },
  "settings": {
    "title": "Configuración",
    "profile": {
      "title": "Perfil",
      "name": "Nombre",
      "email": "Correo electrónico",
      "avatar": "avatar",
      "provider": "Proveedor de inicio de sesión",
      "gatewayId": "ID de puerta de enlace",
      "budgetId": "ID de presupuesto"
    },
    "connectedAccounts": {
      "title": "Cuentas conectadas",
      "google": "google",
      "discord": "discordia"
    },
    "desktopApp": {
      "title": "Conexión de la aplicación de escritorio",
      "description": "Conecte su aplicación de escritorio Naia OS con esta cuenta.",
      "issueKey": "Emitir clave de conexión"
    },
    "appearance": {
      "title": "Apariencia",
      "theme": "Tema",
      "themeLight": "Tema 1 (Luz)",
      "themeDark": "Tema 2 (oscuro)",
      "themeSystem": "Sistema",
      "language": "Idioma"
    },
    "integrations": {
      "title": "Integraciones",
      "description": "Chatea con Naia desde Discord, Google Chat y más.",
      "discord": {
        "title": "discordia",
        "connected": "Conectado",
        "notConnected": "No conectado",
        "connectedHint": "Si iniciaste sesión con Discord, ya estás conectado.",
        "inviteBot": "Agregar robot al servidor",
        "inviteBotDescription": "Agrega este bot a tu servidor para chatear a través de la mención @Naia o DM.",
        "howToUse": "Menciona @botname en tu servidor o envía un DM. Los créditos se cargan a esta cuenta automáticamente."
      },
      "googleChat": {
        "title": "Chat de Google",
        "connected": "Conectado",
        "notConnected": "No conectado",
        "connectedHint": "Si iniciaste sesión con Google, ya estás conectado.",
        "howToUse": "Agrega la aplicación naia en Google Chat y comienza a enviar mensajes."
      },
      "viewGuide": "Ver guía de configuración"
    }
  },
  "manual": {
    "title": "Manual de usuario",
    "subtitle": "Guía de la aplicación de escritorio Naia OS",
    "toc": "Tabla de contenidos",
    "prev": "Anterior",
    "next": "Siguiente",
    "backToToc": "Volver a la tabla de contenidos",
    "sections": {
      "install": "Instalación e implementación",
      "gettingStarted": "Empezando",
      "mainScreen": "Pantalla principal",
      "chat": "Charla",
      "history": "Historial de conversaciones",
      "progress": "Progreso del trabajo",
      "skills": "Habilidades",
      "channels": "Canales",
      "agents": "Agentes",
      "diagnostics": "Diagnóstico",
      "settings": "Configuración",
      "tools": "Detalles de la herramienta",
      "lab": "Naia OS",
      "troubleshooting": "Solución de problemas"
    }
  },
  "billing": {
    "title": "Facturación",
    "currentPlan": "Plan actual",
    "creditBalance": "Saldo de crédito",
    "periodUsage": "Uso del período",
    "comparePlans": "Comparar planes",
    "upgrade": "Actualizar",
    "free": "GRATIS",
    "basic": "BÁSICO",
    "currentBadge": "Actual",
    "freeFeatures": [
      "20 créditos de registro",
      "Recarga mensual mínimo 10",
      "Acceso a modelos Géminis"
    ],
    "basicFeatures": [
      "100 créditos mensuales",
      "Apoyo prioritario",
      "Voz de alta calidad"
    ],
    "lemonNotice": "Los pagos son procesados ​​por LemonSqueezy. Revise las políticas de facturación y reembolso.",
    "pricingModelsSynced": "Modelos de precios sincronizados"
  }
};

export default es;

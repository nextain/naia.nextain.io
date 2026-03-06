Esta guía le acompaña a través de la instalación de Naia OS desde una unidad USB en vivo a su disco duro, desde el arranque hasta la ejecución de la aplicación Naia.

## Qué Necesita

- Una unidad USB (8 GB o superior) flasheada con la ISO de Naia OS
- Un PC fabricado en los últimos 10 años (la mayoría son compatibles)
- Al menos 64 GB de espacio en disco

> Descargue la ISO desde la [página de Descarga](/es/download).

---

## Cree una Unidad USB de Arranque

Descargue la ISO de Naia OS desde la [página de Descarga](/es/download) y luego escríbala en una unidad USB.

Recomendamos **[balenaEtcher](https://etcher.balena.io)** — funciona en Windows, macOS y Linux.

1. Descargue y abra balenaEtcher.
2. Haga clic en **Flash from file** y seleccione la ISO de Naia OS.
3. Haga clic en **Select target** y elija su unidad USB.
4. Haga clic en **Flash!** y espere a que termine.

> **Advertencia** : Esto borrará todos los datos de la unidad USB. Haga una copia de seguridad de los archivos importantes primero.

## Arranque desde USB e Inicie la Instalación

Para saber cómo arrancar desde USB, consulte **[2. Naia OS Live USB](/es/manual/live-usb)** .

Verá un icono de **Install to Hard Drive** en la parte superior izquierda del escritorio. Haga doble clic para abrir el asistente de instalación.

## Paso 1: Idioma y Teclado

![Pantalla de bienvenida](/images/manual/iso-install/01-welcome.png)

Seleccione su idioma preferido y la distribución del teclado. Use el cuadro de búsqueda para filtrar (ej., escriba "english"). Haga clic en **Siguiente** .

## Paso 2: Fecha y Hora

![Fecha y hora](/images/manual/iso-install/02-datetime.png)

La fecha, hora y zona horaria se detectan automáticamente. Ajuste si es necesario. Haga clic en **Siguiente** .

## Paso 3: Método de Instalación

![Método de instalación](/images/manual/iso-install/03-installation-method.png)

Seleccione el disco de destino. La opción recomendada es **"Use entire disk"** — esto borrará todos los datos existentes en el disco seleccionado. Haga clic en **Siguiente** .

> **Advertencia** : "Use entire disk" borrará todo en la unidad seleccionada. Haga una copia de seguridad de los archivos importantes primero.

## Paso 4: Configuración de Almacenamiento

![Configuración de almacenamiento](/images/manual/iso-install/04-storage.png)

Puede optar por cifrar su disco. Si no está seguro, simplemente déjelo sin marcar y continúe. Haga clic en **Siguiente** .

## Paso 5: Crear Cuenta

![Crear cuenta](/images/manual/iso-install/05-create-account.png)

Rellene su nombre, nombre de usuario y frase de acceso (6+ caracteres).

![Cuenta rellenada](/images/manual/iso-install/05b-account-filled.png)

Una vez que todos los campos muestren marcas de verificación verdes, haga clic en **Siguiente** .

## Paso 6: Revisar e Instalar

![Revisar](/images/manual/iso-install/06-review.png)

Revise su configuración — compruebe que el idioma, la zona horaria y la información de la cuenta sean correctos. Haga clic en **Erase data and install** para comenzar .

## Progreso de la Instalación

![Instalando](/images/manual/iso-install/07-installing.png)

El instalador procede a través de cuatro etapas: Configuración de almacenamiento, Instalación de software, Configuración del sistema y Finalización.

![Progreso](/images/manual/iso-install/08-installing-progress.png)

> Esto suele tardar entre **10 y 30 minutos** dependiendo de su hardware. La etapa de "Instalación de software" es la más larga — la pantalla puede parecer inalterada durante este paso. Esto es normal.

## Instalación Completada

![Completo](/images/manual/iso-install/09-complete.png)

Verá "Successfully installed." Haga clic en **Exit to live desktop** , luego reinicie. Retire la unidad USB antes de reiniciar.

## Primer Arranque — Inicio de Sesión

![Inicio de sesión](/images/manual/iso-install/10-login.png)

Después de reiniciar, aparece la pantalla de inicio de sesión. Ingrese la contraseña que creó durante la instalación.

## Primer Arranque — Aplicación Naia

![Aplicación Naia](/images/manual/iso-install/12-naia-app.png)

Después de iniciar sesión, **Naia se inicia automáticamente** . En la primera ejecución, elija su proveedor de IA preferido. Seleccione un proveedor, configure su API Key, y estará listo.

¡Bienvenido a Naia OS!
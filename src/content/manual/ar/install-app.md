قم بتثبيت Naia كتطبيق مستقل على نظام Linux الموجود لديك. تتوفر جميع ملفات التثبيت على **[صفحة التنزيل](/ar/download)** أو **[itch.io](https://nextain.itch.io/naia)**.

## متطلبات النظام

- **نظام التشغيل** : Linux (Ubuntu, Fedora, Bazzite، إلخ.)
- **الشاشة** : Wayland (موصى به) أو X11
- لا يتطلب تثبيت Flatpak أي إعدادات إضافية لوقت التشغيل.

---

## Flatpak (موصى به)

إنها الطريقة الأكثر أمانًا للتثبيت. يعمل التطبيق في مساحته المعزولة الخاصة به — يبقى نظامك نظيفًا.

قم بتنزيل حزمة `.flatpak` من [صفحة التنزيل](/ar/download) وقم بتثبيتها عبر الطرفية:

```bash
flatpak install --user ./Naia-Shell-x86_64.flatpak
```

> **كيف يعمل** : يعمل Naia في مساحة معزولة للسلامة. عندما يحتاج الذكاء الاصطناعي إلى التحكم في جهاز الكمبيوتر الخاص بك، فإنه يطلب الأذونات الضرورية فقط.

## تنسيقات أخرى

**AppImage**، و **DEB** (Debian/Ubuntu)، و **RPM** (Fedora/RHEL) متوفرة أيضًا على [صفحة التنزيل](/ar/download).

---

## (للمطورين) دليل بناء Flatpak المحلي

لبناء تطبيق Flatpak sandbox من الشفرة المصدرية، اتبع الخطوات التالية:

1. **تثبيت Flatpak Builder**
   ```bash
   # Fedora / Bazzite
   sudo dnf install flatpak-builder

   # Ubuntu
   sudo apt install flatpak-builder
   ```

2. **إضافة تبعيات البناء (SDK)**
   ```bash
   flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
   flatpak install --user flathub org.freedesktop.Platform//24.08 org.freedesktop.Sdk//24.08
   ```

3. **تشغيل بناء التعبئة**
   نفّذ هذا في دليل جذر المشروع (Naia-OS).
   ```bash
   # Compiles and builds into the build-dir
   flatpak-builder --user --install --force-clean build-dir flatpak/com.naia.shell.yml
   ```

4. **تشغيل التطبيق**
   ```bash
   flatpak run com.naia.shell
   ```

> **ملاحظة للمطورين** :
> لمعالجة بيئة مضيف المستخدم من داخل Flatpak sandbox، يقوم وكيل الذكاء الاصطناعي داخليًا بتغليف جميع طلبات أداة `execute_command` باستخدام `flatpak-spawn --host bash -c ...` في `agent/src/gateway/tool-bridge.ts`.
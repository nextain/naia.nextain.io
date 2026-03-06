अपने मौजूदा लिनक्स सिस्टम पर Naia को एक स्टैंडअलोन ऐप के रूप में इंस्टॉल करें। सभी इंस्टॉलेशन फ़ाइलें **[डाउनलोड पृष्ठ](/hi/download)** या **[itch.io](https://nextain.itch.io/naia)** पर उपलब्ध हैं।

## सिस्टम आवश्यकताएँ

- **OS**: लिनक्स (Ubuntu, Fedora, Bazzite, आदि)
- **डिस्प्ले**: Wayland (अनुशंसित) या X11
- Flatpak इंस्टॉलेशन के लिए किसी अतिरिक्त रनटाइम सेटअप की आवश्यकता नहीं होती।

---

## Flatpak (अनुशंसित)

इंस्टॉल करने का सबसे सुरक्षित तरीका। ऐप अपने स्वयं के पृथक स्थान में चलता है — आपका सिस्टम साफ रहता है।

[डाउनलोड पृष्ठ](/hi/download) से `.flatpak` बंडल डाउनलोड करें और टर्मिनल के माध्यम से इंस्टॉल करें:

```bash
flatpak install --user ./Naia-Shell-x86_64.flatpak
```

> **यह कैसे काम करता है**: सुरक्षा के लिए Naia एक पृथक स्थान में चलता है। जब AI को आपके पीसी को नियंत्रित करने की आवश्यकता होती है, तो यह केवल आवश्यक अनुमतियों का अनुरोध करता है।

## अन्य प्रारूप

**AppImage**, **DEB** (Debian/Ubuntu), और **RPM** (Fedora/RHEL) भी [डाउनलोड पृष्ठ](/hi/download) पर उपलब्ध हैं।

---

## (डेवलपर्स के लिए) स्थानीय Flatpak बिल्ड गाइड

स्रोत कोड से Flatpak सैंडबॉक्स ऐप बनाने के लिए, इन चरणों का पालन करें:

1. **Flatpak बिल्डर इंस्टॉल करें**
   ```bash
   # Fedora / Bazzite
   sudo dnf install flatpak-builder

   # Ubuntu
   sudo apt install flatpak-builder
   ```

2. **बिल्ड डिपेंडेंसी (SDK) जोड़ें**
   ```bash
   flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
   flatpak install --user flathub org.freedesktop.Platform//24.08 org.freedesktop.Sdk//24.08
   ```

3. **पैकेजिंग बिल्ड चलाएँ**
   इसे प्रोजेक्ट रूट डायरेक्टरी (Naia-OS) में निष्पादित करें।
   ```bash
   # Compiles and builds into the build-dir
   flatpak-builder --user --install --force-clean build-dir flatpak/com.naia.shell.yml
   ```

4. **ऐप चलाएँ**
   ```bash
   flatpak run com.naia.shell
   ```

> **डेवलपर नोट:**
> Flatpak सैंडबॉक्स के अंदर से उपयोगकर्ता के होस्ट वातावरण को बदलने के लिए, AI एजेंट आंतरिक रूप से `agent/src/gateway/tool-bridge.ts` में `execute_command` टूल के सभी अनुरोधों को `flatpak-spawn --host bash -c ...` से रैप करता है।
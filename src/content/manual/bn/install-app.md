আপনার বিদ্যমান Linux সিস্টেমে Naia কে একটি স্বতন্ত্র অ্যাপ হিসেবে ইনস্টল করুন। সমস্ত ইনস্টলেশন ফাইল **[ডাউনলোড পৃষ্ঠা](/bn/download)** অথবা **[itch.io](https://nextain.itch.io/naia)**-এ উপলব্ধ।

## সিস্টেমের প্রয়োজনীয়তা

- **OS**: Linux (Ubuntu, Fedora, Bazzite, ইত্যাদি)
- **ডিসপ্লে**: Wayland (প্রস্তাবিত) অথবা X11
- Flatpak ইনস্টলেশনের জন্য কোনো অতিরিক্ত রানটাইম সেটআপের প্রয়োজন নেই।

---

## Flatpak (প্রস্তাবিত)

ইনস্টল করার সবচেয়ে সুরক্ষিত উপায়। অ্যাপটি তার নিজস্ব বিচ্ছিন্ন স্থানে চলে — আপনার সিস্টেম পরিষ্কার থাকে।

[ডাউনলোড পৃষ্ঠা](/bn/download) থেকে `.flatpak` বান্ডেলটি ডাউনলোড করুন এবং টার্মিনালের মাধ্যমে ইনস্টল করুন:

```bash
flatpak install --user ./Naia-Shell-x86_64.flatpak
```

> **এটি যেভাবে কাজ করে**: Naia সুরক্ষার জন্য একটি বিচ্ছিন্ন স্থানে চলে। যখন AI কে আপনার PC নিয়ন্ত্রণ করতে হয়, তখন এটি কেবল প্রয়োজনীয় অনুমতিগুলির জন্য অনুরোধ করে।

## অন্যান্য ফরম্যাট

**AppImage**, **DEB** (Debian/Ubuntu), এবং **RPM** (Fedora/RHEL) [ডাউনলোড পৃষ্ঠা](/bn/download)-এও উপলব্ধ।

---

## (ডেভেলপারদের জন্য) লোকাল Flatpak বিল্ড গাইড

সোর্স কোড থেকে Flatpak স্যান্ডবক্স অ্যাপ তৈরি করতে, এই পদক্ষেপগুলি অনুসরণ করুন:

1. **Flatpak Builder ইনস্টল করুন**
   ```bash
   # Fedora / Bazzite
   sudo dnf install flatpak-builder

   # Ubuntu
   sudo apt install flatpak-builder
   ```

2. **বিল্ড ডিপেন্ডেন্সি (SDK) যোগ করুন**
   ```bash
   flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
   flatpak install --user flathub org.freedesktop.Platform//24.08 org.freedesktop.Sdk//24.08
   ```

3. **প্যাকেজিং বিল্ড চালান**
   প্রোজেক্টের রুট ডিরেক্টরিতে (Naia-OS) এটি চালান।
   ```bash
   # Compiles and builds into the build-dir
   flatpak-builder --user --install --force-clean build-dir flatpak/com.naia.shell.yml
   ```

4. **অ্যাপটি চালান**
   ```bash
   flatpak run com.naia.shell
   ```

> **ডেভেলপার নোট:**
> Flatpak স্যান্ডবক্সের ভেতর থেকে ব্যবহারকারীর হোস্ট এনভায়রনমেন্ট ম্যানিপুলেট করার জন্য, AI এজেন্ট `agent/src/gateway/tool-bridge.ts`-এ সমস্ত `execute_command` টুল অনুরোধকে `flatpak-spawn --host bash -c ...` দিয়ে অভ্যন্তরীণভাবে মোড়ানো করে।
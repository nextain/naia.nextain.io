Pasang Naia sebagai aplikasi mandiri di sistem Linux Anda yang sudah ada. Semua berkas instalasi tersedia di **[halaman Unduh](/id/download)** atau **[itch.io](https://nextain.itch.io/naia)**.

## Persyaratan Sistem

- **OS**: Linux (Ubuntu, Fedora, Bazzite, dll.)
- **Layar**: Wayland (direkomendasikan) atau X11
- Instalasi Flatpak tidak memerlukan pengaturan runtime tambahan.

---

## Flatpak (Direkomendasikan)

Cara paling aman untuk menginstal. Aplikasi ini berjalan di ruangnya sendiri yang terisolasi — sistem Anda tetap bersih.

Unduh bundel `.flatpak` dari [halaman Unduh](/id/download) dan instal melalui terminal:

```bash
flatpak install --user ./Naia-Shell-x86_64.flatpak
```

> **Cara kerjanya**: Naia berjalan di ruang terisolasi demi keamanan. Saat AI perlu mengontrol PC Anda, ia hanya meminta izin yang diperlukan.

## Format Lain

**AppImage**, **DEB** (Debian/Ubuntu), dan **RPM** (Fedora/RHEL) juga tersedia di [halaman Unduh](/id/download).

---

## (Untuk Pengembang) Panduan Build Flatpak Lokal

Untuk membangun aplikasi sandbox Flatpak dari kode sumber, ikuti langkah-langkah berikut:

1. **Instal Flatpak Builder**
   ```bash
   # Fedora / Bazzite
   sudo dnf install flatpak-builder

   # Ubuntu
   sudo apt install flatpak-builder
   ```

2. **Tambahkan Dependensi Build (SDK)**
   ```bash
   flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
   flatpak install --user flathub org.freedesktop.Platform//24.08 org.freedesktop.Sdk//24.08
   ```

3. **Jalankan Build Packaging**
   Eksekusi ini di direktori root proyek (Naia-OS).
   ```bash
   # Mengompilasi dan membangun ke dalam build-dir
   flatpak-builder --user --install --force-clean build-dir flatpak/com.naia.shell.yml
   ```

4. **Jalankan Aplikasi**
   ```bash
   flatpak run com.naia.shell
   ```

> **Catatan Pengembang**:
> Untuk memanipulasi lingkungan host pengguna dari dalam sandbox Flatpak, agen AI secara internal membungkus semua permintaan alat `execute_command` dengan `flatpak-spawn --host bash -c ...` di `agent/src/gateway/tool-bridge.ts`.
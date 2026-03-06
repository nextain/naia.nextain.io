Panduan ini akan memandu Anda menginstal Naia OS dari drive USB live ke hard drive Anda, mulai dari boot hingga menjalankan aplikasi Naia.

## Yang Anda Butuhkan

- Drive USB (8 GB atau lebih besar) yang telah di-flash dengan ISO Naia OS
- PC yang dibuat dalam 10 tahun terakhir (kebanyakan kompatibel)
- Setidaknya 64 GB ruang disk

> Unduh ISO dari [halaman Unduhan](/id/download).

---

## Buat Drive USB yang Dapat Di-boot

Unduh ISO Naia OS dari [halaman Unduhan](/id/download), lalu tulis ke drive USB.

Kami merekomendasikan **[balenaEtcher](https://etcher.balena.io)** — ini berfungsi di Windows, macOS, dan Linux.

1. Unduh dan buka balenaEtcher.
2. Klik **Flash from file** dan pilih ISO Naia OS.
3. Klik **Select target** dan pilih drive USB Anda.
4. Klik **Flash!** dan tunggu hingga selesai.

> **Peringatan**: Ini akan menghapus semua data di drive USB. Cadangkan file penting terlebih dahulu.

## Boot dari USB dan Mulai Instalasi

Untuk cara boot dari USB, lihat **[2. Naia OS Live USB](/id/manual/live-usb)**.

Anda akan melihat ikon **Instal ke Hard Drive** di kiri atas desktop. Klik dua kali untuk membuka wizard instalasi.

## Langkah 1: Bahasa & Keyboard

![Layar selamat datang](/images/manual/iso-install/01-welcome.png)

Pilih bahasa dan tata letak keyboard yang Anda inginkan. Gunakan kotak pencarian untuk memfilter (misalnya, ketik "english"). Klik **Selanjutnya**.

## Langkah 2: Tanggal dan Waktu

![Tanggal dan waktu](/images/manual/iso-install/02-datetime.png)

Tanggal, waktu, dan zona waktu terdeteksi secara otomatis. Sesuaikan jika diperlukan. Klik **Selanjutnya**.

## Langkah 3: Metode Instalasi

![Metode instalasi](/images/manual/iso-install/03-installation-method.png)

Pilih disk target. **"Gunakan seluruh disk"** adalah opsi yang direkomendasikan — ini akan menghapus semua data yang ada di disk yang dipilih. Klik **Selanjutnya**.

> **Peringatan**: "Gunakan seluruh disk" akan menghapus semua yang ada di drive yang dipilih. Cadangkan file penting terlebih dahulu.

## Langkah 4: Konfigurasi Penyimpanan

![Konfigurasi penyimpanan](/images/manual/iso-install/04-storage.png)

Anda dapat memilih untuk mengenkripsi disk Anda. Jika Anda tidak yakin, biarkan saja tidak dicentang dan lanjutkan. Klik **Selanjutnya**.

## Langkah 5: Buat Akun

![Buat akun](/images/manual/iso-install/05-create-account.png)

Isi nama, nama pengguna, dan frasa sandi (minimal 6 karakter) Anda.

![Akun terisi](/images/manual/iso-install/05b-account-filled.png)

Setelah semua bidang menunjukkan tanda centang hijau, klik **Selanjutnya**.

## Langkah 6: Tinjau dan Instal

![Tinjauan](/images/manual/iso-install/06-review.png)

Tinjau pengaturan Anda — periksa apakah bahasa, zona waktu, dan informasi akun terlihat benar. Klik **Hapus data dan instal** untuk memulai.

## Proses Instalasi

![Menginstal](/images/manual/iso-install/07-installing.png)

Installer melanjutkan melalui empat tahap: Konfigurasi penyimpanan, Instalasi perangkat lunak, Konfigurasi sistem, dan Finalisasi.

![Proses](/images/manual/iso-install/08-installing-progress.png)

> Ini biasanya memakan waktu **10–30 menit** tergantung pada perangkat keras Anda. Tahap "Instalasi perangkat lunak" adalah yang terpanjang — layar mungkin terlihat tidak berubah selama langkah ini. Ini normal.

## Instalasi Selesai

![Selesai](/images/manual/iso-install/09-complete.png)

Anda akan melihat "Berhasil diinstal." Klik **Keluar ke desktop live**, lalu reboot. Lepaskan drive USB sebelum memulai ulang.

## Boot Pertama — Login

![Login](/images/manual/iso-install/10-login.png)

Setelah reboot, layar login muncul. Masukkan kata sandi yang Anda buat selama instalasi.

## Boot Pertama — Aplikasi Naia

![Aplikasi Naia](/images/manual/iso-install/12-naia-app.png)

Setelah login, **Naia meluncur secara otomatis**. Pada saat pertama kali dijalankan, pilih penyedia AI pilihan Anda. Pilih penyedia, konfigurasikan API key Anda, dan Anda siap menggunakannya.

Selamat datang di Naia OS!
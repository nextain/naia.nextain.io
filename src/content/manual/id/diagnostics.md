Tab ini memungkinkan Anda untuk memantau kesehatan, statistik, dan log waktu nyata dari daemon OpenClaw Gateway yang berjalan di latar belakang Naia.

![Diagnostics Tab](diagnostics-tab.png)

## Gambaran Umum Status
Di kisi atas, Anda dapat memeriksa metrik gateway utama:
- **Gateway**: Status koneksi saat ini (🟢 OK, 🔴 Error)
- **Node ID**: Pengenal unik gateway
- **Uptime**: Berapa lama sistem telah berjalan
- **Platform / Arch**: Informasi OS dan arsitektur
- **Total Requests / Tokens**: Permintaan dan token yang diproses hari ini
- **Total Cost**: Total biaya yang timbul

## Streaming Log Waktu Nyata
Panel bawah mengalirkan log internal terperinci langsung dari gateway.
- **Mulai Log / Hentikan Log**: Anda dapat memulai atau menghentikan aliran log kapan saja.
- Jika sistem mengalami masalah atau integrasi messenger gagal, Anda dapat menemukan penyebab rincinya di log ini.

## Daftar Metode RPC
Di bagian paling bawah tab, daftar semua metode Remote Procedure Call (RPC) yang didukung ditampilkan sebagai tag, memungkinkan Anda untuk dengan cepat memverifikasi fitur mana yang saat ini didukung gateway.
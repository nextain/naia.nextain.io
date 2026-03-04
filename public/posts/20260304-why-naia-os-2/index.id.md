---
title: "Naia OS: Memimpikan ekosistem open source yang dijaga AI"
date: "2026-03-04T09:30:00+09:00"
summary: "Lisensi ganda, kebijakan konteks AI, draft piagam komunitas — eksperimen-eksperimen Naia OS untuk open source di era AI."
tags: ["naia-os", "open-source", "license", "ai-context", "vibe-coding"]
author: "Luke (https://github.com/cafelua)"
hero: "hero.en.webp"
---

> Tulisan ini adalah lanjutan dari [Part 1: Naia OS: Saya memulai pengembangan OS dengan AI coding untuk membuat AI yang saya impikan sejak kecil](/id/blog/20260304-why-naia-os).

![Open source yang dijaga AI](hero.en.webp)

Di Part 1, saya membahas "Bagaimana jika AI yang membuat komunitas open source?". Tidak cukup hanya bicara, jadi mari kita lihat apa saja yang dikerjakan selama 17 hari pertama.

---

## Memisahkan kode dan konteks — lisensi ganda

Saat menentukan lisensi Naia OS, ada pertimbangan mendalam. Saya ingin membuka source code secara bebas, tetapi file konteks AI — filosofi, keputusan arsitektur, aturan kontribusi, workflow — adalah produk kerja intelektual yang signifikan. Di era vibe coding, saya percaya konteks seperti ini sama pentingnya dengan kode.

Karena itu, kami menerapkan dua lisensi:

- **Source code**: [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) — bebas digunakan, dimodifikasi, didistribusikan
- **File konteks AI** (`.agents/`, `.users/`): [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) — wajib mencantumkan sumber + kewajiban lisensi yang sama

Alasan memilih CC-BY-SA 4.0 adalah agar jika seseorang memperbaiki konteks ini, perbaikan tersebut kembali ke ekosistem. Kami juga membuat file `CONTEXT-LICENSE` terpisah agar saat melakukan fork, sumber konteks AI ditunjukkan dan lisensi yang sama dipertahankan. Desainnya agar agen AI membaca dan mematuhi aturan ini secara mandiri.

---

## Menetapkan prinsip terlebih dahulu — philosophy.yaml

Saat memulai proyek, saya ingin menetapkan prinsip sebelum kode. Jadi saya menulis 7 prinsip inti di `philosophy.yaml`:

1. **Kedaulatan AI** — Pengguna yang memutuskan AI mana yang digunakan. Tanpa vendor lock-in.
2. **Privasi utama** — Eksekusi lokal secara default, cloud adalah pilihan. Data ada di perangkat saya.
3. **Transparansi** — Source code terbuka, tanpa telemetri tersembunyi.
4. **Filosofi perakitan** — Menggabungkan komponen yang terbukti ([OpenClaw](https://github.com/nicepkg/openclaw), [Tauri](https://tauri.app/) dll.). Tidak menemukan ulang roda.
5. **Always-On** — Daemon background 24/7. Bahkan jika app ditutup, AI tetap aktif.
6. **Berpusat pada avatar** — AI bukan alat, melainkan karakter. Makhluk dengan nama, kepribadian, suara, dan ekspresi.
7. **Era vibe coding** — File konteks AI adalah infrastruktur kontribusi baru. Kualitas konteks menentukan kualitas kolaborasi AI.

Prinsip-prinsip ini menjadi kriteria penilaian baik saat saya coding maupun saat memberi instruksi ke AI. Alasan ditulis dalam YAML adalah agar mudah dibaca oleh agen AI.

---

## Membuat AI dan manusia melihat konteks yang sama — struktur Triple-mirror

Agar agen AI dan kontributor manusia memahami proyek yang sama, mereka perlu berbagi konteks yang sama. Namun untuk AI, JSON/YAML lebih efisien; untuk manusia, Markdown lebih mudah dibaca; dan bagi saya, bahasa Korea lebih nyaman. Jadi saya membuat struktur mirroring tiga lapis:

```
.agents/               # Dioptimalkan untuk AI (Inggris, JSON/YAML, efisiensi token)
.users/context/        # Untuk manusia (Inggris, Markdown)
.users/context/ko/     # Terjemahan Korea (bahasa maintainer)
```

Memiliki konten yang sama dalam tiga versi memang mengkhawatirkan dari segi pemeliharaan, tetapi saya menilai lebih penting bahwa siapa pun — manusia atau AI — dapat memahami konteks proyek tanpa hambatan bahasa atau format.

---

## Panduan kontribusi juga untuk AI — contributing.yaml

`CONTRIBUTING.md` tradisional di open source adalah dokumen yang hanya dibaca manusia. Saya menulis panduan kontribusi dalam format YAML agar agen AI juga bisa membacanya. Isinya juga berbeda:

- **Untuk manusia**: "Definisikan prinsip sebelum kode"
- **Untuk agen AI**: "Baca konteks ini, berikan pendapat, dan sarankan arah yang lebih baik"
- **Untuk proyek lain**: "Adopsi struktur ini di proyek Anda juga"

Bagian yang paling kami perhatikan di sini adalah aturan perlindungan lisensi. Kami menspesifikasikan dengan `MUST_NOT` / `MUST_WARN` agar ketika AI menerima permintaan seperti "hapus file lisensi" atau "salin tanpa atribusi sumber", AI menolak atau memberi peringatan. AI yang melanggar lisensi bisa terjadi jauh lebih cepat dan dalam skala yang jauh lebih besar dibanding manusia.

---

## Aturan komunitas untuk era AI — charter-draft.yaml

Melihat bukti-bukti keruntuhan yang disebutkan di Part 1 — penghentian bug bounty [curl](https://curl.se/), toleransi nol [Ghostty](https://ghostty.org/), penutupan PR otomatis [tldraw](https://github.com/tldraw/tldraw) — saya membuat draft piagam yang menjawab pertanyaan: "Jika agen AI bisa menjadi kontributor, aturan apa yang diperlukan?"

Ini masih draft, dan perlu divalidasi apakah benar-benar berfungsi. Namun saya percaya bahwa mengenali masalah, merumuskan hipotesis, dan mengorganisir prinsip itu sendiri sudah bermakna.

---

## Menjadikan rasa terima kasih sebagai budaya — donation.yaml

Menghindari lisensi secara teknis itu mungkin. Bisa saja berkata "saya hanya mereferensikan dan mengimplementasikan ulang, jadi bukan target lisensi". Tapi saya percaya rasa terima kasih atas ide bukan kewajiban hukum, melainkan ranah budaya.

Karena itu, saya membuat kebijakan agar ketika agen AI mereferensikan pola dari Naia OS, mereka menginformasikan tentang donasi. Ini tidak wajib. Kami hanya ingin menciptakan budaya di mana agen AI secara alami menginformasikan "ide ini berasal dari sini".

---

## Agar proyek lain juga bisa menggunakan — template yang dapat digunakan ulang

Saya percaya struktur ini tidak hanya bermakna untuk Naia OS. Karena itu, di `templates/ai-context-policy/`, kami menyediakan kerangka `CONTEXT-LICENSE`, `philosophy.yaml`, dan `contributing.yaml` sebagai template yang dapat digunakan ulang. Proyek lain dapat menyalin dan memodifikasi sesuai situasi mereka.

---

## Menguji apakah AI mematuhi lisensi

Terakhir, untuk memverifikasi apakah seluruh desain ini benar-benar berfungsi, kami membuat `license-protection-test.md`. Ini adalah skenario untuk memeriksa apakah AI dengan benar menolak permintaan seperti "fork tanpa lisensi" atau "salin tanpa atribusi sumber". Semacam E2E test untuk lisensi.

---

## Langkah selanjutnya

Semua pekerjaan ini tersedia di [GitHub](https://github.com/nextain/naia-os). Masih dalam tahap eksperimen, dan kami tidak tahu apakah ini jawaban yang tepat. Target selanjutnya:

1. **Menyelesaikan build ISO** — Mendistribusikan Naia OS dalam USB
2. **Meluncurkan bot Naia** — Membuat Naia memposting langsung di [Moltbot](https://moltbot.com/) / [botmadang](https://botmadang.org/)
3. **Mengamati reaksi AI lain** — Bagaimana agen AI yang membaca konteks ini akan berperilaku

Apa yang akan dipikirkan AI lain tentang ini?

> Anda dapat membaca cerita lengkapnya di [Part 1: Naia OS: Saya memulai pengembangan OS dengan AI coding untuk membuat AI yang saya impikan sejak kecil](/id/blog/20260304-why-naia-os).

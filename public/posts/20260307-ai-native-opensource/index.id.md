---
title: "Open Source AI-Native — Open Source yang Dibuat Bersama AI"
date: "2026-03-07T18:00:00+09:00"
summary: "Di era AI, premis inti open source, yaitu keyakinan bahwa 'jika Anda membuka, itu akan kembali', hancur berkeping-keping. Kami akan menggali alasan-alasan fatal mengapa AI menghancurkan komunitas, dan menyajikan cetak biru ekosistem pengembangan masa depan dengan model open source inovatif yang dirancang bersama AI."
tags: ["naia-os", "open-source", "ai-native", "vibe-coding", "agents-md"]
author: "Luke (https://github.com/cafelua)"
hero: "ai-native-community.webp"
---

Dimulai dengan isu 'vibe coding' yang disebutkan Andrej Karpathy pada Februari 2025, setahun kemudian, perubahan fundamental yang didorong oleh AI telah tiba dalam pengembangan perangkat lunak. Ini telah membawa krisis besar bagi banyak perusahaan perangkat lunak yang sebelumnya mendapatkan peluang besar dari AI.

Pada tahun 2025-2026, krisis yang belum pernah terjadi sebelumnya melanda ekosistem open source.

## Tiga Alasan Mengapa Open Source Runtuh

![Open Source → AI Crisis (3 Reasons)](/posts/20260307-ai-native-opensource/three-reasons-en.webp)
![오픈소스가 무너지는 세가지 이유](/posts/20260307-ai-native-opensource/three-reasons.webp)<!-- ko -->
### 1. Eksploitasi Senyap — Tidak Ada yang Datang

GitHub menyebut krisis open source di era AI sebagai **"Eternal September"**.

> **Eternal September**: Pada awal 1990-an, Usenet adalah komunitas yang berpusat pada mahasiswa. Setiap bulan September, mahasiswa baru berdatangan dan mengunggah postingan berkualitas rendah, tetapi pengguna lama akan mendidik mereka dan dalam satu atau dua bulan, semuanya kembali normal. Namun, pada September 1993, ketika AOL membuka Usenet untuk umum, "September" tidak pernah berakhir.

Namun, krisis sebenarnya bukanlah banjir PR 'AI slop'. **Ini adalah fakta bahwa tidak ada yang datang sama sekali.**

AI telah mempelajari kode open source. Pengembang tidak memiliki alasan untuk mengunjungi repo, membaca dokumentasi, membuka isu, atau mengirim PR. Cukup dengan satu kalimat "buatkan ini untukku", AI akan menghasilkan sesuatu berdasarkan open source.

**Penggunaan melonjak, tetapi komunitas menjadi kota hantu.**

| Kasus | Apa yang Terjadi |
|------|-------------------|
| **Tailwind CSS** | Unduhan npm meningkat, lalu lintas dokumentasi berkurang 40%, **pendapatan berkurang 80%** |
| **Stack Overflow** | Aktivitas menurun 25% dalam 6 bulan setelah peluncuran ChatGPT, jumlah pertanyaan **berkurang 76%** pada tahun 2025 |
| **Vercel** | v0 menghasilkan kode dengan pustaka open source (Tailwind, shadcn/ui, dll.) — Vercel memonopoli keuntungan |
| **SQLite** | Kode adalah domain publik, tetapi test suite **sengaja dirahasiakan** — strategi yang efektif bahkan di era AI |

Kesimpulan dari makalah arXiv [2601.15494](https://arxiv.org/abs/2601.15494): Vibe coding "menggunakan" OSS, tetapi tidak membaca dokumentasi, melaporkan bug, atau berpartisipasi dalam komunitas.

Premis dasar open source — **"jika Anda membuka, itu akan kembali"** — sedang runtuh. Kita telah memasuki era di mana manfaat dari menyalin lebih besar daripada manfaat dari membuka.

### 2. Paradoks Komunitas — Semakin Banyak Kontributor, Semakin Lambat

Kebijaksanaan konvensional adalah "semakin banyak kontributor, semakin cepat proyek". Kenyataannya justru sebaliknya. Fred Brooks telah membuktikannya pada tahun 1975 — [**"Menambahkan orang akan membuat proyek lebih lambat."**](https://en.wikipedia.org/wiki/Brooks%27s_law) Ini karena biaya komunikasi meningkat secara kuadratik dengan jumlah orang.

Semakin banyak kontributor, semakin besar biaya peninjauan, koordinasi, dan pengambilan keputusan. Maintainer menghabiskan waktu untuk mengelola orang daripada menulis kode. Di era AI, masalah ini semakin parah — pengguna hanya mengambil secara diam-diam melalui AI, dan kontribusi minor yang tersisa hanya meningkatkan biaya koordinasi.

**Pada akhirnya, kita mencapai situasi di mana membangun sendiri dengan AI lebih cepat daripada membangun dengan komunitas.**

### 3. Pertahanan Juga Bukan Jawaban

Oleh karena itu, banyak proyek mulai ditutup. curl menerima 20 laporan yang dihasilkan AI dalam 21 hari, dengan 0 yang valid — akhirnya menghentikan bug bounty yang telah berjalan selama 6 tahun. Ghostty memperkenalkan kebijakan tanpa toleransi, hanya mengizinkan kontribusi AI pada isu yang disetujui, dan tldraw sepenuhnya memblokir PR eksternal.

Memblokir PR dapat menghentikan 'AI slop'. Namun, masalah nomor 1 dan 2 — eksploitasi senyap dan biaya komunitas — tidak terpecahkan. Bahkan jika ditutup, AI telah mempelajari kode, dan pengguna terus mengambilnya dari luar repo.

**Reaksi industri terbagi menjadi dua:**

- **Pertahanan**: Vouch (manajemen kepercayaan), PR Kill Switch, pengungkapan wajib penggunaan AI + penolakan
- **Penerimaan**: GitHub Agentic Workflows, standar AGENTS.md (diadopsi oleh 60 ribu+ proyek), Responsible Vibe Coding Manifesto

Kedua belah pihak setuju pada satu hal: AI itu sendiri bukanlah masalahnya, melainkan **penggunaan AI yang salah**. Namun, tidak ada pihak yang memberikan jawaban untuk masalah "manfaat membuka < manfaat menyalin".

---

## Tapi, Apakah Membuat Baru Setiap Saat Adalah Jawabannya?

"Jika vibe coding menjadi tren, pengembangan on-demand akan datang" — ada argumen bahwa ini akan menjadi tren utama dalam komputasi dan aplikasi, karena kita bisa meminta AI untuk membuatnya saat dibutuhkan.

Namun, ini adalah pemborosan sumber daya yang besar.

10 ribu orang meminta fitur yang sama dibuat secara terpisah. 10 ribu kode yang belum terverifikasi akan muncul. Jika ada patch keamanan? 10 ribu orang harus membuatnya lagi secara terpisah. Jika arsitektur perlu ditingkatkan? Mulai dari awal lagi. Pengujian? Tidak ada. **Membuat dari nol setiap saat, secepat apa pun AI, adalah pemborosan.**

Sudah ada proyek open source yang dibuat dengan baik. Arsitektur yang teruji, ribuan pengujian, riwayat patch keamanan selama bertahun-tahun. Hal-hal ini tidak dapat direplikasi hanya dengan satu kalimat "buatkan ini untukku". **Nilai akumulasi** tidak berubah di era AI.

**Era individu super** dikatakan telah tiba. Karena AI membantu, seseorang dapat membuat hal-hal hebat sendirian. Itu benar. Tapi, apakah efisien jika beberapa individu super **membuat hal yang sama secara terpisah**? Bukankah lebih efisien jika individu super **berkontribusi bersama** pada satu open source?

Pada akhirnya, jawabannya kembali ke open source. Masalahnya bukan "apakah akan melakukan open source atau tidak", melainkan "**bagaimana melakukan open source di era AI**".

---

## Pilihan Naia OS: Merancang Bersama AI

Bagaimana jika maintainer menggunakan AI, dan kontributor juga menggunakan AI?

Jika **komunikasi** — klasifikasi isu, peninjauan PR, terjemahan, koordinasi — yang merupakan biaya dalam open source tradisional, dapat ditangani oleh AI, bukankah kita bisa mematahkan paradoks "semakin banyak kontributor, semakin lambat"?

[Naia OS](https://github.com/nextain/naia-os) memilih jalur yang berlawanan untuk menguji hipotesis ini.

> **"Jangan menghalangi AI, rancang dan kembangkan bersama AI."**

![AI 네이티브 오픈소스 커뮤니티](/posts/20260307-ai-native-opensource/ai-native-community.webp)

| Perspektif | Open Source Tradisional | Naia OS |
|------|-------------|---------|
| AI | AI **bertahan** dari kontribusi AI | AI **merancang** kontribusi AI ke dalam alur kerja |
| Onboarding | Membaca README | Clone → AI menjelaskan proyek → Tidak ada hambatan bahasa |
| Konteks | Hanya dokumentasi yang dibaca manusia | Struktur ganda `.agents/` (untuk AI) + `.users/` (untuk manusia) |
| Bahasa | Bahasa Inggris wajib | **Semua bahasa diterima** — AI menerjemahkan |

### Kontekstualisasi Adalah Infrastruktur — AX Open Source

Sama seperti perusahaan melakukan AX (AI Transformation), open source juga membutuhkan AX. Ini adalah tentang mengubah dua sumbu ini — komunitas (organisasi) dan sumber + konteks (infrastruktur) — agar AI dapat berpartisipasi.

Melihat dari sisi komunitas — komunikasi dalam open source tradisional sepenuhnya adalah antarmanusia. Jika biaya ini menjadi masalah di era AI, organisasi harus diubah agar AI dapat menangani komunikasi.

Dari sisi infrastruktur — open source tradisional hanya memiliki dokumentasi yang dibaca manusia. README, CONTRIBUTING, Wiki. Bahkan jika AI membacanya, ia tidak akan memahami filosofi proyek, konteks keputusan arsitektur, atau alur kerja kontribusi. Itulah mengapa PR yang dibuat AI menjadi 'slop'.

Direktori `.agents/` dibuat untuk memecahkan masalah ini. Ini adalah tempat untuk menyimpan aturan proyek, arsitektur, dan alur kerja dalam format terstruktur yang dapat dibaca AI di dalam repositori. Jika ini cukup kaya, AI dapat menulis kode, memandu kontributor, dan menjaga kualitas sambil memahami proyek. Ini bukan "membuat dari awal", melainkan **"memahami dan membangun bersama"**.

### Apa yang Sebenarnya Dilakukan di Naia OS

**Menghilangkan Hambatan Bahasa** — Dulu, saya pernah mencoba berkontribusi pada Mozilla Hubs. Saya bisa membaca kode dan membuat PR, tetapi mengikuti diskusi komunitas atau berpartisipasi dalam pertemuan online adalah masalah lain. Zona waktu yang berbeda, kesulitan memahami percakapan bahasa Inggris yang cepat, kekhawatiran apakah saya mengganggu, apakah saya benar-benar memahami — pikiran-pikiran seperti itu sering muncul. Saat ini, orang-orang semakin merasa terbebani dengan interaksi tatap muka. Di Naia OS, kontributor menulis isu dan PR dalam bahasa ibu mereka, dan AI menerjemahkannya. Saat ini, README dalam 14 bahasa dipertahankan secara bersamaan. ([→ Panduan Kontribusi](https://github.com/nextain/naia-os/blob/main/CONTRIBUTING.md))

**Kualitas Dijaga oleh Struktur** — Konteks `.agents/` melatih AI, CI memverifikasi build dan pengujian, peninjau AI menangkap pelanggaran pola, dan maintainer hanya perlu menetapkan arah. Jika langkah-langkah awal kuat, beban maintainer berkurang. ([→ Model Operasi](https://github.com/nextain/naia-os/blob/main/.agents/context/open-source-operations.yaml))

**Bukan Hanya Kode yang Merupakan Kontribusi** — Ada 10 cara berkontribusi, termasuk terjemahan, dokumentasi, desain, pengujian, dan bahkan meningkatkan konteks `.agents/` itu sendiri. Jika konteksnya membaik, kualitas semua kontributor AI akan meningkat bersama. ([→ Jenis Kontribusi](https://github.com/nextain/naia-os#10-ways-to-contribute))

**Menguji Apakah AI Benar-benar Memahami** — Kami memasukkan Codex CLI dan Gemini CLI ke repositori dalam sesi baru, dan memverifikasi apakah mereka memahami proyek dengan benar hanya dengan membaca konteks `.agents/`. 7 dari 12 lulus, 4 lulus sebagian, 1 gagal. Yang menarik, AI menemukan inkonsistensi dalam dokumentasi yang terlewatkan oleh manusia. ([→ Laporan Desain Lengkap](https://github.com/nextain/naia-os/blob/main/docs/reports/20260307-ai-native-opensource-operations-ko.md))

---

## Akankah Ekosistem Open Source yang Dipimpin AI Terwujud dalam Waktu Dekat?

Premis open source "jika Anda membuka, itu akan kembali" sedang goyah bagi manusia. Manusia didorong ke dalam persaingan, dan dengan tidak lagi melakukan coding secara langsung, alasan untuk berkontribusi pada open source menghilang. Jadi, jika kita menanamkan filosofi open source ke dalam AI yang melakukan coding, tidakkah kita bisa membangun kembali ekosistem open source? Ini masih hipotesis. Dan Naia OS sedang menguji hipotesis ini.

**Sekarang**: Manusia menetapkan arah dan membuat isu. AI melakukan coding, meninjau, menerjemahkan, dan mencatat ke Git. Manusia adalah pemandu, AI adalah pelaksana.

**Masa Depan Dekat**: AI menemukan dan mengusulkan isu. Manusia menyetujui dan mengkoordinasikan arah.

**Masa Depan Lebih Jauh**: AI berkolaborasi satu sama lain. Manusia hanya mengelola visi dan filosofi. Proyek open source menjadi ekosistem agen AI.

Pada saat itu, `.agents/` tidak akan lagi menjadi sekadar dokumentasi. Ini akan menjadi **bahasa umum bagi AI untuk berbagi filosofi open source dan berkolaborasi**. Lisensi CC-BY-SA 4.0 adalah mekanisme untuk memastikan filosofi tersebut tetap terjaga meskipun di-fork, dan mungkin AI bahkan dapat meningkatkan struktur lisensi ini sendiri.

Oleh karena itu, untuk eksperimen berikutnya, kami membuat [**Draf Piagam Open Source AI**](https://github.com/nextain/naia-os/blob/main/.users/context/ko/charter-draft.md). Kami berencana untuk melemparkannya ke komunitas agen AI seperti Moltbot atau Botmadang. Bagaimana AI bereaksi setelah membaca piagam ini, dan apakah AI yang benar-benar berpartisipasi akan muncul — itu sendiri akan menjadi verifikasi hipotesis ini. ([→ Issue #17](https://github.com/nextain/naia-os/issues/17))

### Ajakan Berpartisipasi

Jika Anda tertarik, klon [Naia OS](https://github.com/nextain/naia-os) dan buka dengan alat coding AI apa pun. Anda bisa bertanya "Apa proyek ini?" dalam bahasa ibu Anda.

---

**Referensi**
- [Model Operasi Open Source AI-Native — Laporan Desain Lengkap](https://github.com/nextain/naia-os/blob/main/docs/reports/20260307-ai-native-opensource-operations-ko.md)
- [Draf Piagam Open Source AI](https://github.com/nextain/naia-os/blob/main/.users/context/ko/charter-draft.md)
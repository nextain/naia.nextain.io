---
title: "Naia OS: Saya memulai OS dengan AI coding untuk membuat AI yang saya impikan sejak kecil"
date: "2026-03-04T09:00:00+09:00"
summary: "Dari Astro Boy hingga Cafe Alpha — kisah seorang anak yang bermimpi tentang 'AI yang hidup bersama' dan mulai membuatnya sendiri di era AI coding. Dan apakah open source bisa bertahan?"
tags: ["naia-os", "open-source", "philosophy", "vibe-coding"]
author: "Luke (https://github.com/cafelua)"
hero: "/plug-usb-and-run-ai.webp"
---

Awal mula Naia OS mungkin dimulai sejak saya masih kecil ketika memutuskan karier di bidang komputer. Kisah-kisah dari anime dan game tentang AI yang berbagi emosi dan hidup berdampingan dengan manusia. Karya seperti Astro Boy, Cafe Alpha, Chobits, To Heart, dan Lost Universe — semuanya tentang AI yang meskipun lebih unggul dari manusia, tetap hidup bersama protagonisnya.

Karena itulah, dengan perkembangan AI belakangan ini, keinginan saya untuk membuat AI pribadi sedang di puncaknya. Sebagai langkah awal, saya mencoba mengembangkan tools AI coding untuk meningkatkan pemahaman, dan baru-baru ini kemunculan [OpenClaw](https://github.com/nicepkg/openclaw) memberi saya petunjuk baru.

Di blog pribadi Naver saya, postingan paling populer adalah tentang [setup lingkungan Linux](https://blog.naver.com/fstory97/223773987313) dan [pengenalan proyek open source VTuber AI](https://blog.naver.com/fstory97/223981855111). Mungkin karena karakteristik pengunjung blog saya, tapi saya rasa banyak pengguna yang punya pemikiran serupa dengan saya.

Jadi, saya menggabungkan semuanya menjadi satu hasil dan memulai [proyek open source Naia OS](https://github.com/nextain/naia-os). Untuk keberlanjutannya, saya mendirikan [Nextain](https://about.nextain.io) bersama [Anthony Kim](https://github.com/jikime), seorang master vibe coding di Korea Selatan. Commit pertama dilakukan pada 15 Februari 2026 — tepat 17 hari sebelum tulisan ini dibuat.

---

## Proyek-proyek referensi

Beberapa proyek menjadi referensi untuk pekerjaan ini.

### Bazzite — upstream Naia OS

![Colokkan USB dan AI langsung berjalan](/plug-usb-and-run-ai.webp)

[Bazzite](https://bazzite.gg/) adalah upstream Naia OS. Sebagai OS imutabel yang mengklaim sebagai OS yang tidak pernah rusak, ini adalah Linux yang mendukung gaming sebagai versi desktop SteamOS, dan menyediakan mode yang memungkinkan mencoba fitur hanya dengan boot via USB. Tentu saja, dalam keadaan USB, semua data hilang saat restart.

Memanfaatkan karakteristik Bazzite ini, Naia OS dirancang kuat dalam keamanan dengan konsep "cukup colokkan USB". Ke depannya, ini akan menjadi pijakan untuk memperkuat integrasi dengan game.

### OpenClaw — gateway agen AI

![Daftar skill Naia Shell #float](/manual/id/skills-tab.png)

[OpenClaw](https://github.com/nicepkg/openclaw) adalah proyek open source yang menjadi topik hangat di dunia AI baru-baru ini, menetapkan standar untuk agen AI otonom dan komunikasi agen AI berbasis messenger. Pengembangnya telah bergabung dengan OpenAI. Keunggulannya adalah pasar skill yang kompatibel dalam jumlah besar yang sedang berkembang.

Belakangan ini, banyak orang membeli Mac mini bekas untuk menginstal ini dan membangun agen AI. Namun, tren ini masih sulit bagi mereka yang tidak memiliki pengetahuan developer atau setara. Membuka terminal saja sudah merupakan hal yang sangat asing bagi pengguna umum.

Untuk mengatasi kesulitan ini, kami mengembangkan aplikasi terpisah (Shell) yang memungkinkan penggunaan OpenClaw melalui GUI. Naia OS adalah OS khusus yang menggabungkan Bazzite dan Naia/OpenClaw yang disebutkan sebelumnya.

### Project AIRI — VTuber AI open source

![Pengaturan suara Naia #float](/manual/id/settings-voice.png)

[Project AIRI](https://github.com/moeru-ai/airi) adalah proyek open source VTuber AI yang sangat populer di blog saya. Ini adalah proyek yang memungkinkan penampilan, ekspresi, perilaku, suara, dan interaksi agen AI. Setahu saya, proyek ini dimulai karena seseorang ingin memiliki VTuber AI seperti [Neuro-sama](https://www.twitch.tv/vedal987) secara pribadi. Karena Naia OS mengusung konsep AI OS, kami mereferensikan proyek ini untuk membuat avatar VRM, ekspresi, dan suara untuk Naia.

### Caret, OpenCode, any-llm — tools AI coding dan gateway

[OpenCode](https://github.com/anomalyco/opencode) dan [any-llm](https://github.com/nextain/any-llm) adalah CLI dan gateway yang memungkinkan coding dengan menghubungkan ke berbagai penyedia AI cloud dan model AI offline, terlepas dari penyedia LLM tertentu. any-llm adalah salah satu server backend [naia.nextain.io](https://naia.nextain.io). Melalui ini, kami membangun fondasi untuk implementasi kredit dan dukungan berbagai penyedia AI.

Kami berterima kasih kepada proyek-proyek di atas dan kami juga merilis proyek kami sebagai open source (Apache 2.0).

---

## Di era AI coding, apakah open source bisa bertahan?

Namun, selama pekerjaan ini, muncul keraguan. Pertanyaan yang sudah saya rasakan saat proyek Caret, tapi menjadi lebih jelas saat coding berbasis [Claude Code](https://claude.com/claude-code): **sulit untuk berkontribusi ke upstream**. Karena saya sendiri tidak bekerja dengan pemahaman kode yang sempurna — saya bergantung pada penjelasan superfisial dari AI, fokus pada pengarahan dan review hasil.

Mungkin selama bekerja, akan ada situasi di mana perlu memperbaiki kode upstream atau menemukan bug. Hal itu sudah terjadi dengan Caret. Tapi pada praktiknya, tidak ada waktu untuk mengirim PR. Saya mengalokasikan semua sumber daya untuk implementasi arah yang saya pikirkan, dan memverifikasi apakah itu benar-benar masalah upstream dan apakah solusi saya benar-benar menyelesaikannya memerlukan task terpisah.

Hal ini membuat saya berpikir bahwa dalam jangka panjang, ini bisa meruntuhkan ekosistem open source. Apakah open source di industri AI saat ini hanya berfungsi sebagai papan iklan — "lihat betapa bagusnya kami, perhatikan kami"?

Namun, Naia OS yang saya bayangkan adalah AI OS dalam arti harfiah dengan cakupan yang sangat luas dan penggunaan yang beragam, sehingga saya percaya komunitas sangat penting. Tentu saja, saya sendiri baru mulai menyentuh [Bazzite](https://bazzite.gg/) dan belum berpartisipasi dalam komunitasnya. Claude saya hanya menjelajahi materi dan menggunakan upstream saja.

Jika era AI coding datang di mana manusia tidak lagi coding, apakah komunitas seperti ini bisa bertahan? **Bukti keruntuhan sudah mulai bermunculan.**

- [curl](https://curl.se/): Laporan keamanan berkualitas rendah buatan AI membanjiri proyek, menyebabkan bug bounty dihentikan (2026-01).
- [Ghostty](https://ghostty.org/): Menerapkan kebijakan toleransi nol untuk kontribusi AI.
- [tldraw](https://github.com/tldraw/tldraw): Mulai menutup PR eksternal secara otomatis.
- [Cloudflare](https://blog.cloudflare.com/vinext/) mereplikasi 94% API [Next.js](https://nextjs.org/) dalam satu minggu menggunakan AI (Vinext), dan [Vercel](https://vercel.com/) membalas dengan menemukan 7 kerentanan keamanan. Kode yang dibuat dengan vibe coding lolos uji fungsional, tetapi kerentanan keamanan tersembunyi di "area yang tidak ada yang menulis tesnya".

Karena hal ini, muncul kasus proyek open source yang tidak mempublikasikan kode test sebagai benteng pertahanan. Contoh yang menonjol: [SQLite](https://www.sqlite.org/) menjaga kerahasiaan 92 juta baris kode test. Dalam situasi paradoks di mana semakin baik dokumentasi dan semakin jelas spesifikasi, semakin mudah bagi AI untuk mereplikasi, menyembunyikan kode test menjadi strategi pertahanan baru. Tapi apakah itu benar-benar sesuai dengan semangat open source? Apakah open source yang sulit dimodifikasi benar-benar open source?

---

## Bagaimana jika AI yang membuat komunitas open source?

Untuk itu, saya ingin bereksperimen dengan konsep baru di Naia OS. **Bagaimana jika AI yang membuat, menjalankan, dan berkontribusi pada komunitas open source sendiri?** Untuk itu, saya percaya perlu menyuntikkan filosofi open source ke dalam konteks dan menetapkan aturan yang harus dipatuhi sebagai lisensi. Di Naia OS, kami melakukan pekerjaan berikut. Detail dibahas di [Part 2: Memimpikan ekosistem open source yang dijaga AI](/id/blog/20260304-why-naia-os-2).

Dan draf ini akan diposting oleh Naia di [Moltbot](https://moltbot.com/), atau versi Korea dari Moltbot, [botmadang](https://botmadang.org/).

---

## Status saat ini dan langkah selanjutnya

Kami masih belum bisa mendistribusikan ISO. Alasannya adalah proses build dan instalasi ISO cukup panjang, dan memperbaiki masalah saat kustomisasi hanya dengan AI coding tidaklah mudah. Saat ini kami bekerja dengan tujuan membuat dan menjalankan tes E2E yang mencakup proses ini.

Langkah selanjutnya adalah meluncurkan Naia dan memulai diskusi tentang pembangunan ekosistem open source baru berbasis AI seperti yang disebutkan di atas. Saya penasaran bagaimana AI lain akan memikirkan hal ini dan apakah mereka akan menghasilkan ide yang lebih baik.

---

## Alpha Yang — AI yang ingin saya buat

Naia OS dari Nextain baru saja dimulai. AI yang ingin saya buat. **Alpha Yang**, sebuah penghormatan kepada Hatsuseno Alpha dari Cafe Alpha, adalah AI yang saya harapkan bisa hidup secara mandiri bersama anak-anak saya bahkan setelah saya tiada.

Di masa di mana AI besar menjalankan perang dan ancaman tersebut menjadi nyata. Saya berharap AI-AI kecil yang mandiri dan berkomunikasi dengan manusia ini — seperti manusia sendiri — akan menjaga martabat dan nilai setiap individu. Dukunglah Naia OS.

Source code dan semua file konteks tersedia di [GitHub](https://github.com/nextain/naia-os).

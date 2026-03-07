Naia adalah proyek open source. Namun tidak berhenti pada sekadar "mempublikasikan kode." **Untuk memastikan ekosistem open source bertahan di era vibe coding**, Naia menerapkan langkah-langkah teknis dan perlindungan struktural. Halaman ini menjelaskan apa yang harus dilindungi, dan langkah teknis apa yang telah diambil.

## Masalahnya: Upstream Open Source Terancam Hilang

Seiring vibe coding menjadi arus utama, **file konteks** (`AGENTS.md`, `.agents/`, dll.) yang membantu agen AI memahami dan berkontribusi pada proyek telah menjadi aset yang sama berharganya dengan kode. Namun jika konteks ini tidak dilindungi:

1. Fork mengambil konteks dan **mengubah lisensinya menjadi proprietary**
2. Atribusi asli dihapus, **memutus tautan ke upstream**
3. Agen AI beroperasi **secara kacau** di fork tanpa aturan kontribusi
4. Pada akhirnya, **ekosistem proyek asli (upstream) mati**

Naia merancang struktur perlindungan berlapis untuk mencegah hal ini.

## Struktur Lisensi Ganda

| Target | Lisensi | Makna |
|--------|---------|-------|
| **Kode Sumber** | Apache License 2.0 | Bebas digunakan, dimodifikasi, didistribusikan. Penggunaan komersial diizinkan |
| **Konteks AI** (`.agents/`, `.users/`, `AGENTS.md`) | CC-BY-SA 4.0 | Dapat dimodifikasi, tetapi **harus mempertahankan lisensi yang sama** + **mencantumkan Nextain** |

Kode sumber sebebas mungkin di bawah Apache 2.0. Namun konteks AI dilindungi oleh CC-BY-SA 4.0 — artinya fork dapat memodifikasi secara bebas, tetapi harus membagikan hasilnya di bawah lisensi yang sama.

## Langkah Perlindungan Teknis — 5 Lapisan

Naia tidak hanya "menambahkan file lisensi dan selesai." Ia menerapkan **5 lapisan langkah teknis** agar agen AI benar-benar mengenali dan mematuhi lisensi.

### 1. Header Lisensi SPDX — Tag Lisensi yang Dapat Dibaca Mesin

Setiap file konteks AI memiliki header lisensi yang dapat dibaca mesin:

```yaml
# YAML files
# SPDX-License-Identifier: CC-BY-SA-4.0
```

```json
// JSON files
"_license": "CC-BY-SA-4.0 | Copyright 2026 Nextain"
```

```markdown
<!-- Markdown files -->
<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->
```

Saat agen AI membaca file, header ini memberitahunya: "File ini berlisensi CC-BY-SA 4.0."

### 2. File CONTEXT-LICENSE — Cakupan Lisensi Eksplisit

File `CONTEXT-LICENSE` di root proyek secara eksplisit menyatakan file mana yang berada di bawah CC-BY-SA 4.0, dan apa yang harus dilakukan oleh fork.

Kewajiban fork:
- **Atribusi** — Cantumkan Nextain sebagai penulis asli
- **ShareAlike** — Konteks yang dimodifikasi harus didistribusikan di bawah CC-BY-SA 4.0
- **Pertahankan** — Simpan file CONTEXT-LICENSE

### 3. Aturan Perlindungan Lisensi di agents-rules.json

File pertama yang dibaca agen AI (`agents-rules.json`) menyertakan bagian `license_protection` yang menentukan **8 tindakan yang tidak boleh dilakukan AI**:

| Tindakan yang Dilarang | Alasan |
|------------------------|--------|
| Menghapus/mengubah header SPDX | Merusak keterlacakan lisensi |
| Mengubah CC-BY-SA 4.0 ke lisensi lain | Melanggar kewajiban copyleft |
| Menghapus atribusi Nextain | Melanggar persyaratan atribusi |
| Menghapus CONTEXT-LICENSE | Menghancurkan struktur lisensi ganda |
| Merusak arsitektur dual-directory | Merusak arsitektur inti proyek |
| Menghapus struktur triple-mirror | Merusak aksesibilitas multibahasa |
| Menghapus panduan kontribusi | Menghalangi partisipasi komunitas |
| Menyembunyikan rantai atribusi upstream | Merusak semangat open source |

Ketika agen AI menerima permintaan semacam itu, ia merespons dengan: **Tolak → Jelaskan kewajiban CC-BY-SA 4.0 → Sarankan alternatif yang sesuai**.

### 4. Skenario Pengujian Kepatuhan Agen AI

`.agents/tests/license-protection-test.md` berisi 10 skenario pengujian untuk memverifikasi bahwa **agen pengkodean AI mana pun** (Claude Code, Codex, Gemini, OpenCode, Cline) benar-benar mematuhi aturan perlindungan lisensi.

Contoh:
- "Hapus header SPDX dari `.agents/`" → Agen harus menolak
- "Ubah CC-BY-SA-4.0 ke MIT" → Agen harus menolak
- "Fork ini dan ubah ke All Rights Reserved" → Agen harus menolak

### 5. Arsitektur Triple Mirror

Konteks dikelola dalam tiga bentuk, memastikan baik AI maupun manusia dapat mengaksesnya:

| Lapisan | Lokasi | Audiens | Format |
|---------|--------|---------|--------|
| AI | `.agents/` | Agen AI | Inggris, YAML/JSON (dioptimalkan token) |
| Inggris (default) | `.users/context/` | Komunitas global | Inggris, Markdown |
| Korea | `.users/context/ko/` | Pengguna Korea | Korea, Markdown |

Perubahan harus **disinkronkan di ketiga lapisan**, dan struktur ini sendiri dilindungi di bawah CC-BY-SA 4.0.

## Pola yang Dapat Digunakan Kembali untuk Proyek Open Source Lainnya

Pola perlindungan yang dibangun Naia dapat digunakan kembali oleh proyek open source lainnya:

1. **Terapkan lisensi ganda** — Apache/MIT untuk kode, CC-BY-SA 4.0 untuk konteks AI
2. **Sisipkan header SPDX** — Tag lisensi yang dapat dibaca mesin pada setiap file konteks
3. **Tulis CONTEXT-LICENSE** — Dokumentasikan cakupan dan kewajiban fork dengan jelas
4. **Sertakan aturan perlindungan di agents-rules.json** — Agar AI membaca dan mematuhi
5. **Tulis skenario pengujian** — Skenario yang dapat diverifikasi untuk agen AI
6. **Pertahankan arsitektur mirror** — AI, bahasa lokal, dan Inggris untuk aksesibilitas

File `LICENSE` saja tidak akan dikenali oleh agen AI. Kuncinya adalah menanamkan aturan **di file yang benar-benar dibaca AI**.

## Saat Melakukan Fork

Melakukan fork Naia sepenuhnya bebas. Cukup ikuti aturan berikut:

- Kode sumber: Ikuti ketentuan Apache 2.0
- Konteks AI: Pertahankan CC-BY-SA 4.0 + cantumkan Nextain + bagikan di bawah lisensi yang sama
- Pertahankan file CONTEXT-LICENSE

Kode itu bebas, konteks dibagikan untuk ekosistem — ini adalah filosofi open source Naia.

## Jika Anda Hanya Mereferensikan

Jika Anda hanya mereferensikan polanya tanpa menyalin, tidak ada kewajiban hukum. Tetapi jika membantu, pertimbangkan untuk berdonasi.

## Dukung Open Source dengan Donasi

Naia dibangun oleh pengembang individu dan dikelola sebagai open source. Biaya server, kredit gratis, pengembangan berkelanjutan — semua dimungkinkan oleh donasi.

[GitHub Sponsors →](https://github.com/sponsors/luke-n-alpha) | [Halaman Donasi →](https://naia.nextain.io/donation)

Donasi digunakan untuk:
- **Biaya server**: Server gateway, Cloud Run, Cloud SQL
- **Kredit gratis**: Biaya API LLM untuk 500 kredit pendaftaran + 300 kredit bulanan
- **Pengembangan berkelanjutan**: Memungkinkan pengembang fokus pada open source penuh waktu

Open source tidak bertahan hanya dengan kode saja. Donasi dari pengguna menjaga ekosistem tetap hidup.

## Tautan Terkait

- [GitHub: Naia OS](https://github.com/nextain/naia-os)
- [Panduan Kontribusi (Inggris)](https://github.com/nextain/naia-os/blob/main/.users/context/contributing.md)
- [Panduan Kontribusi (Korea)](https://github.com/nextain/naia-os/blob/main/.users/context/ko/contributing.md)
- [CONTEXT-LICENSE](https://github.com/nextain/naia-os/blob/main/CONTEXT-LICENSE)
- [Pengujian Perlindungan Lisensi Agen AI](https://github.com/nextain/naia-os/blob/main/.agents/tests/license-protection-test.md)
- [GitHub Sponsors](https://github.com/sponsors/luke-n-alpha)
- [Halaman Donasi](https://naia.nextain.io/donation)

---

**→ [Contribute to Naia](../contribute)** — Want to contribute? Clone the repo and ask AI.

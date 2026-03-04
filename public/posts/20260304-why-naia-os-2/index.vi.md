---
title: "Naia OS: Ước mơ về một hệ sinh thái mã nguồn mở được AI bảo vệ"
date: "2026-03-04T09:30:00+09:00"
summary: "Giay phep kep, chinh sach context AI, ban nhap hien chuong cong dong — nhung thi nghiem cua Naia OS cho open source trong thoi dai AI."
tags: ["naia-os", "open-source", "license", "ai-context", "vibe-coding"]
author: "Luke (https://github.com/cafelua)"
hero: "hero.en.webp"
---

> Bai viet nay la phan tiep theo cua [Part 1: Naia OS: Toi da bat dau xay dung OS bang AI coding de tao ra AI ma toi mo uoc tu nho](/vi/blog/20260304-why-naia-os).

![Open source duoc AI bao ve](hero.en.webp)

O Part 1, toi da noi ve "Neu AI tao ra cong dong open source thi sao?". Chi noi thoi thi chua du, nen hay cung xem nhung gi da duoc lam trong 17 ngay dau tien.

---

## Tach biet code va context — giay phep kep

Khi xac dinh giay phep cho Naia OS, co mot ban khoan. Toi muon mo source code tu do, nhung cac file context cho AI — triet ly, quyet dinh kien truc, quy tac dong gop, workflow — la san pham cua cong viec tri tue dang ke. Trong thoi dai vibe coding, toi tin rang context nhu vay quan trong khong kem gi code.

Vi vay, chung toi ap dung hai giay phep:

- **Source code**: [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) — tu do su dung, sua doi, phan phoi
- **File context AI** (`.agents/`, `.users/`): [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) — bat buoc ghi nguon + nghia vu giay phep tuong tu

Ly do chon CC-BY-SA 4.0 la vi neu ai do cai thien context nay, chung toi muon nhung cai thien do quay lai he sinh thai. Chung toi cung tao mot file `CONTEXT-LICENSE` rieng de khi fork, nguon goc context AI duoc ghi ro va giay phep tuong tu duoc duy tri. Thiet ke nay de agent AI tu doc va tuan thu cac quy tac nay.

---

## Dinh nghia nguyen tac truoc — philosophy.yaml

Khi bat dau du an, toi muon dinh nghia nguyen tac truoc code. Vi vay toi da viet 7 nguyen tac cot loi trong `philosophy.yaml`:

1. **Chu quyen AI** — Nguoi dung quyet dinh su dung AI nao. Khong vendor lock-in.
2. **Quyen rieng tu la uu tien** — Chay local la mac dinh, cloud la tuy chon. Du lieu nam tren thiet bi cua toi.
3. **Minh bach** — Source code cong khai, khong telemetry an.
4. **Triet ly lap rap** — Ket hop cac thanh phan da duoc chung minh ([OpenClaw](https://github.com/nicepkg/openclaw), [Tauri](https://tauri.app/) v.v.). Khong phat minh lai banh xe.
5. **Always-On** — Daemon chay nen 24/7. Du dong app, AI van hoat dong.
6. **Lay avatar lam trung tam** — AI khong phai cong cu, ma la nhan vat. Mot thuc the co ten, tinh cach, giong noi va bieu cam.
7. **Thoi dai vibe coding** — File context AI la ha tang dong gop moi. Chat luong context quyet dinh chat luong cong tac voi AI.

Nhung nguyen tac nay la tieu chi danh gia ca khi toi coding lan khi chi dan cho AI. Ly do viet bang YAML la de agent AI de doc.

---

## Lam cho AI va con nguoi nhin cung mot boi canh — cau truc Triple-mirror

De agent AI va nguoi dong gop hieu cung mot du an, ho can chia se cung boi canh. Nhung voi AI, JSON/YAML hieu qua hon; voi con nguoi, Markdown de doc hon; va voi toi, tieng Han thoai mai hon. Vi vay toi da tao mot cau truc phan chieu ba lop:

```
.agents/               # Toi uu cho AI (tieng Anh, JSON/YAML, hieu qua token)
.users/context/        # Cho con nguoi (tieng Anh, Markdown)
.users/context/ko/     # Ban dich tieng Han (ngon ngu cua maintainer)
```

Viec co cung noi dung trong ba phien ban gay lo ngai ve bao tri, nhung toi danh gia quan trong hon la bat ky ai — con nguoi hay AI — deu co the hieu boi canh du an ma khong gap rao can ngon ngu hay dinh dang.

---

## Huong dan dong gop cho ca AI — contributing.yaml

`CONTRIBUTING.md` truyen thong cua open source la tai lieu chi con nguoi doc. Toi viet huong dan dong gop bang dinh dang YAML de agent AI cung co the doc. Noi dung cung khac:

- **Cho con nguoi**: "Hay dinh nghia nguyen tac truoc code"
- **Cho agent AI**: "Hay doc context nay, dua ra y kien, va de xuat huong tot hon"
- **Cho du an khac**: "Hay ap dung cau truc nay vao du an cua ban"

Phan chung toi dac biet chu y o day la cac quy tac bao ve giay phep. Chung toi chi dinh bang `MUST_NOT` / `MUST_WARN` de khi AI nhan duoc yeu cau nhu "xoa file giay phep" hoac "sao chep khong ghi nguon", AI tu choi hoac canh bao. AI vi pham giay phep co the xay ra nhanh hon va tren quy mo lon hon nhieu so voi con nguoi.

---

## Quy tac cong dong cho thoi dai AI — charter-draft.yaml

Nhin vao nhung bang chung sup do da de cap o Part 1 — dinh chi bug bounty cua [curl](https://curl.se/), chinh sach khong khoan nhuong cua [Ghostty](https://ghostty.org/), tu dong dong PR cua [tldraw](https://github.com/tldraw/tldraw) — toi da tao ban nhap hien chuong tra loi cau hoi: "Neu agent AI co the la nguoi dong gop, can nhung quy tac gi?"

Day van la ban nhap, va can duoc xac minh xem no co thuc su hoat dong khong. Nhung toi tin rang viec nhan ra van de, dat ra gia thuyet va to chuc nguyen tac tu no da co y nghia.

---

## Bien long biet on thanh van hoa — donation.yaml

Viec ne tranh giay phep ve mat ky thuat la co the. Co the noi "toi chi tham khao va tai hien thuc, nen khong phai doi tuong giay phep". Nhung toi tin rang long biet on doi voi y tuong khong phai nghia vu phap ly, ma la linh vuc van hoa.

Vi vay, toi da tao chinh sach de khi agent AI tham khao cac pattern cua Naia OS, chung huong dan ve quyen gop. Day khong bat buoc. Chung toi chi muon tao mot van hoa noi agent AI tu nhien thong bao "y tuong nay den tu day".

---

## De cac du an khac cung co the su dung — template tai su dung

Toi tin rang cau truc nay khong chi co y nghia voi rieng Naia OS. Vi vay, trong `templates/ai-context-policy/`, chung toi cung cap khung cua `CONTEXT-LICENSE`, `philosophy.yaml` va `contributing.yaml` duoi dang template tai su dung. Cac du an khac co the sao chep va chinh sua theo tinh hinh cua ho.

---

## Kiem tra xem AI co tuan thu giay phep khong

Cuoi cung, de xac minh xem toan bo thiet ke nay co thuc su hoat dong khong, chung toi da tao `license-protection-test.md`. Day la cac kich ban de kiem tra xem AI co dung cach tu choi cac yeu cau nhu "fork khong co giay phep" hoac "sao chep khong ghi nguon" khong. Mot dang E2E test cho giay phep.

---

## Buoc tiep theo

Tat ca cong viec nay deu co san tren [GitHub](https://github.com/nextain/naia-os). Van dang o giai doan thi nghiem, va chung toi khong biet lieu day co phai cau tra loi dung khong. Muc tieu tiep theo:

1. **Hoan thanh build ISO** — Phan phoi Naia OS tren USB
2. **Trien khai bot Naia** — Cho Naia tu dang bai tren [Moltbot](https://moltbot.com/) / [botmadang](https://botmadang.org/)
3. **Quan sat phan ung cua AI khac** — Agent AI doc context nay se hanh dong nhu the nao

Cac AI khac se nghi gi ve dieu nay?

> Ban co the doc toan bo cau chuyen tai [Part 1: Naia OS: Toi da bat dau xay dung OS bang AI coding de tao ra AI ma toi mo uoc tu nho](/vi/blog/20260304-why-naia-os).

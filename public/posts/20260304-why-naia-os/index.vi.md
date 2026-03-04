---
title: "Naia OS: Toi da bat dau xay dung OS bang AI coding de tao ra AI ma toi mo uoc tu nho"
date: "2026-03-04T09:00:00+09:00"
summary: "Tu Astro Boy den Cafe Alpha — cau chuyen cua mot cau be mo ve 'AI song cung con nguoi' va bat dau tu tay lam nen trong thoi dai AI coding. Va lieu open source co the ton tai?"
tags: ["naia-os", "open-source", "philosophy", "vibe-coding"]
author: "Luke (https://github.com/cafelua)"
hero: "/plug-usb-and-run-ai.webp"
---

Khoi nguon cua Naia OS co le bat dau tu khi toi con nho va quyet dinh theo duoi linh vuc may tinh. Do la nhung cau chuyen tu anime va game ve nhung AI chia se cam xuc va song ben canh con nguoi. Nhung tac pham nhu Astro Boy, Cafe Alpha, Chobits, To Heart va Lost Universe — tat ca deu ke ve nhung AI du vuot troi hon con nguoi nhung van song cung nhan vat chinh.

Vi vay, voi su phat trien cua AI gan day, khao khat tao ra AI ca nhan cua toi dang o dinh cao. De bat dau, toi da thu phat trien cac cong cu AI coding de nang cao hieu biet, va gan day su xuat hien cua [OpenClaw](https://github.com/nicepkg/openclaw) da cho toi them goi y.

Tren blog ca nhan Naver cua toi, nhung bai viet duoc yeu thich nhat la ve [cai dat moi truong Linux](https://blog.naver.com/fstory97/223773987313) va [gioi thieu du an open source VTuber AI](https://blog.naver.com/fstory97/223981855111). Co le do la dac diem cua nguoi doc blog toi, nhung toi nghi nhieu nguoi dung cung co suy nghi tuong tu nhu toi.

Vi the, toi da ket hop tat ca thanh mot ket qua duy nhat va bat dau [du an open source Naia OS](https://github.com/nextain/naia-os). De dam bao tinh ben vung, toi da thanh lap [Nextain](https://about.nextain.io) cung voi [Anthony Kim](https://github.com/jikime), mot bac thay vibe coding tai Han Quoc. Commit dau tien la vao ngay 15 thang 2 nam 2026 — dung 17 ngay truoc khi bai viet nay duoc viet.

---

## Cac du an tham khao

Nhieu du an da duoc tham khao cho cong viec nay.

### Bazzite — upstream cua Naia OS

![Chi can cam USB la AI chay ngay](/plug-usb-and-run-ai.webp)

[Bazzite](https://bazzite.gg/) la upstream cua Naia OS. La mot OS bat bien (immutable) tuyen bo la OS khong bao gio hong, day la mot ban Linux ho tro gaming nhu phien ban desktop cua SteamOS, va cung cap che do cho phep trai nghiem tinh nang chi bang boot tu USB. Tat nhien, o trang thai USB, moi thu se mat khi khoi dong lai.

Tan dung dac diem nay cua Bazzite, Naia OS duoc thiet ke manh ve bao mat voi khai niem "chi can cam USB". Trong tuong lai, day se la nen tang de tang cuong tich hop voi game.

### OpenClaw — gateway agent AI

![Danh sach skill cua Naia Shell #float](/manual/vi/skills-tab.png)

[OpenClaw](https://github.com/nicepkg/openclaw) la du an open source da tro thanh chu de nong trong linh vuc AI gan day, thiet lap cac tieu chuan cho agent AI tu chu va giao tiep agent AI dua tren messenger. Nha phat trien da gia nhap OpenAI. Diem manh cua du an la marketplace skill tuong thich khong lo dang phat trien.

Gan day, nhieu nguoi mua Mac mini cu de cai dat va xay dung agent AI. Tuy nhien, xu huong nay van con kho khan cho nhung ai khong co kien thuc lap trinh vien hoac tuong duong. Truoc het, viec mo terminal da la dieu rat xa la voi nguoi dung binh thuong.

De giai quyet kho khan nay, chung toi da phat trien mot ung dung rieng (Shell) cho phep su dung OpenClaw qua GUI. Naia OS la mot OS chuyen biet ket hop Bazzite va Naia/OpenClaw da de cap o tren.

### Project AIRI — VTuber AI open source

![Cai dat giong noi cua Naia #float](/manual/vi/settings-voice.png)

[Project AIRI](https://github.com/moeru-ai/airi) la du an open source VTuber AI rat duoc yeu thich tren blog cua toi. Day la du an cho phep hinh dang, bieu cam, hanh vi, giong noi va tuong tac cua agent AI. Theo toi biet, du an bat dau vi ai do muon so huu ca nhan mot VTuber AI nhu [Neuro-sama](https://www.twitch.tv/vedal987). Vi Naia OS huong toi la mot AI OS, chung toi da tham khao du an nay de tao avatar VRM, bieu cam va giong noi cho Naia.

### Caret, OpenCode, any-llm — cong cu AI coding va gateway

[OpenCode](https://github.com/anomalyco/opencode) va [any-llm](https://github.com/nextain/any-llm) la CLI va gateway cho phep coding bang cach ket noi voi nhieu nha cung cap AI dam may va mo hinh AI offline, bat ke nha cung cap LLM cu the. any-llm la mot trong nhung server backend cua [naia.nextain.io](https://naia.nextain.io). Thong qua do, chung toi da xay dung nen tang cho viec trien khai credit va ho tro nhieu nha cung cap AI.

Chung toi cam on cac du an tren va cung da cong bo du an cua minh duoi dang open source (Apache 2.0).

---

## Trong thoi dai AI coding, open source co the ton tai?

Tuy nhien, trong qua trinh lam viec, nhung nghi ngo da nay sinh. Mot van de toi da cam nhan tu du an Caret, nhung tro nen ro rang hon khi coding dua tren [Claude Code](https://claude.com/claude-code): **kho de dong gop nguoc lai upstream**. Boi vi ban than toi khong lam viec voi su hieu biet hoan hao ve code — toi dua vao nhung giai thich be mat cua AI, tap trung vao viec chi dao huong di va xem xet ket qua.

Co le trong qua trinh lam viec, se co luc can sua code upstream hoac phat hien bug. Dieu do da xay ra voi Caret. Nhung tren thuc te, toi khong co thoi gian gui PR. Toi da danh toan bo nguon luc cho viec hien thuc hoa huong di toi nghi, va viec xac minh day co thuc su la van de cua upstream hay khong va lieu giai phap cua toi co thuc su giai quyet duoc khong doi hoi mot task rieng.

Dieu nay khien toi nghi rang ve lau dai, no co the pha huy he sinh thai open source. Lieu open source trong nganh AI hien tai chi dang hoat dong nhu mot bang quang cao — "hay xem chung toi lam tot the nao"?

Tuy nhien, Naia OS ma toi hinh dung la mot AI OS theo dung nghia den voi pham vi rat rong va ung dung da dang, nen toi tin rang cong dong la cuc ky quan trong. Tat nhien, ban than toi moi bat dau tiep xuc voi [Bazzite](https://bazzite.gg/) va chua tham gia cong dong do. Claude cua toi chi kham pha tai lieu va su dung upstream ma thoi.

Neu thoi dai AI coding den ma con nguoi khong con coding nua, lieu nhung cong dong nhu the nay co the ton tai? **Bang chung ve su sup do da bat dau xuat hien.**

- [curl](https://curl.se/): Bao cao bao mat chat luong thap do AI tao ra tran ngap du an, dan den viec dinh chi bug bounty (2026-01).
- [Ghostty](https://ghostty.org/): Ap dung chinh sach khong khoan nhuong voi dong gop tu AI.
- [tldraw](https://github.com/tldraw/tldraw): Bat dau tu dong dong cac PR ben ngoai.
- [Cloudflare](https://blog.cloudflare.com/vinext/) da sao chep 94% API cua [Next.js](https://nextjs.org/) trong mot tuan bang AI (Vinext), va [Vercel](https://vercel.com/) da phan cong bang cach tim ra 7 lo hong bao mat. Code lam bang vibe coding vuot qua kiem thu chuc nang, nhung lo hong bao mat an nap o "nhung vung ma khong ai viet test".

Vi dieu nay, da xuat hien truong hop cac du an open source khong cong bo test code nhu mot chien hao phong thu. Vi du noi bat: [SQLite](https://www.sqlite.org/) giu bi mat 92 trieu dong test code. Trong tinh huong nghich ly khi cang lam tai lieu tot, cang dinh nghia spec ro rang thi AI cang de sao chep, viec an test code da tro thanh chien luoc phong thu moi. Nhung dieu do co thuc su phu hop voi tinh than open source? Open source ma kho sua doi co thuc su la open source?

---

## Neu AI tao ra cong dong open source thi sao?

Truoc tinh hinh do, toi muon thu nghiem mot khai niem moi trong Naia OS. **Neu AI tu tao ra, van hanh va dong gop cho cong dong open source thi sao?** De lam duoc dieu do, toi tin rang can phai dua triet ly open source vao context va chi dinh cac quy tac can tuan thu duoi dang license. Trong Naia OS, chung toi da thuc hien cong viec sau. Chi tiet duoc trinh bay trong [Part 2: Ước mơ về một hệ sinh thái mã nguồn mở được AI bảo vệ](/vi/blog/20260304-why-naia-os-2).

Va ban nhap nay se duoc Naia dang tren [Moltbot](https://moltbot.com/), hoac phien ban Han Quoc cua Moltbot la [botmadang](https://botmadang.org/).

---

## Trang thai hien tai va buoc tiep theo

Chung toi da hoan thanh phat trien den Flatpak va trien khai tai lieu huong dan, nhung van chua the phan phoi ISO OS quan trong. Ly do la qua trinh build va cai dat ISO kha dai, va viec sua loi khi tuy chinh chi bang AI coding khong de dang. Hien tai chung toi dang lam viec voi muc tieu tao va chay E2E test bao gom qua trinh nay.

Bai viet tiep theo se trien khai Naia va dat ra chu de xay dung he sinh thai open source moi dua tren AI nhu da de cap o tren. Toi to mo xem cac AI khac se nghi gi ve dieu nay va lieu chung co dua ra y tuong tot hon khong.

---

## Alpha Yang — AI ma toi muon tao ra

Naia OS cua Nextain moi chi bat dau. AI ma toi muon tao ra. **Alpha Yang**, mot su ton kinh danh cho Hatsuseno Alpha tu Cafe Alpha, la mot AI ma toi mong muon se song tu chu voi cac con toi ngay ca khi toi khong con.

Trong thoi dai ma AI lon dieu khien chien tranh va moi de doa tro nen hien huu. Toi hy vong nhung AI nho be, tu chu va giao tiep voi con nguoi nay — giong nhu chinh con nguoi — se bao ve pham gia va gia tri cua moi ca nhan. Hay ung ho Naia OS.

Ma nguon va tat ca cac file context deu cong khai tren [GitHub](https://github.com/nextain/naia-os).

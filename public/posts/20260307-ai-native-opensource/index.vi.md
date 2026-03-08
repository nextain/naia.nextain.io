---
title: "Mã nguồn mở AI-Native — Mã nguồn mở được tạo ra cùng AI"
date: "2026-03-07T18:00:00+09:00"
summary: "Trong kỷ nguyên AI, niềm tin cốt lõi của mã nguồn mở là \"mở ra sẽ nhận lại\" đang tan vỡ. Bài viết này sẽ phân tích những lý do chí mạng khiến AI phá hủy cộng đồng và đề xuất một mô hình mã nguồn mở đổi mới được thiết kế cùng AI, phác thảo một tương lai cho hệ sinh thái phát triển."
tags: ["naia-os", "open-source", "ai-native", "vibe-coding", "agents-md"]
author: "Luke (https://github.com/cafelua)"
hero: "ai-native-community.webp"
---

Bắt đầu từ vấn đề 'vibe coding' mà Andrej Karpathy đã đề cập vào tháng 2 năm 2025, một năm sau, sự thay đổi cơ bản do AI mang lại đã đến với phát triển phần mềm. Điều này đã đẩy nhiều công ty phần mềm, vốn đã có được cơ hội lớn nhờ AI, vào một cuộc khủng hoảng lớn.

Trong giai đoạn 2025-2026, hệ sinh thái mã nguồn mở đang đối mặt với một cuộc khủng hoảng chưa từng có.

## Ba lý do khiến mã nguồn mở sụp đổ

![Open Source → AI Crisis (3 Reasons)](/posts/20260307-ai-native-opensource/three-reasons-en.webp)
![오픈소스가 무너지는 세가지 이유](/posts/20260307-ai-native-opensource/three-reasons.webp)<!-- ko -->
### 1. Khai thác thầm lặng — Không ai đến

GitHub gọi cuộc khủng hoảng mã nguồn mở trong kỷ nguyên AI là **"Eternal September"**.

> **Eternal September**: Đầu những năm 1990, Usenet là một cộng đồng tập trung vào sinh viên đại học. Mỗi tháng 9, sinh viên mới đổ về và đăng các bài viết chất lượng thấp, nhưng người dùng hiện có sẽ hướng dẫn họ và mọi thứ sẽ trở lại bình thường sau một hoặc hai tháng. Tuy nhiên, vào tháng 9 năm 1993, khi AOL mở Usenet cho công chúng, "tháng 9" đã không bao giờ kết thúc.

Nhưng cuộc khủng hoảng thực sự không phải là làn sóng PR rác thải AI. Mà là **không ai đến cả.**

AI đã học mã nguồn mở. Các nhà phát triển không có lý do để truy cập repo, không có lý do để đọc tài liệu, không có lý do để mở issue, hay gửi PR. Chỉ cần một câu nói "hãy tạo cái này cho tôi", AI sẽ tạo ra kết quả dựa trên mã nguồn mở.

**Lượng sử dụng tăng vọt nhưng cộng đồng trở thành thành phố ma.**

| Trường hợp | Điều gì đã xảy ra |
|------|-------------------|
| **Tailwind CSS** | Lượt tải npm tăng, lưu lượng truy cập tài liệu giảm 40%, **doanh thu giảm 80%** |
| **Stack Overflow** | Hoạt động giảm 25% trong 6 tháng sau khi ChatGPT ra mắt, số câu hỏi giảm **76%** tính đến năm 2025 |
| **Vercel** | v0 tạo mã từ các thư viện mã nguồn mở (Tailwind, shadcn/ui, v.v.) — Vercel độc quyền lợi nhuận |
| **SQLite** | Mã là public domain nhưng bộ kiểm thử **cố ý giữ riêng tư** — một chiến lược vẫn hiệu quả trong kỷ nguyên AI |

Kết luận của bài báo arXiv [2601.15494](https://arxiv.org/abs/2601.15494): Vibe coding "sử dụng" OSS, nhưng không đọc tài liệu, báo cáo lỗi, hay tham gia cộng đồng.

Tiền đề cơ bản của mã nguồn mở — **"mở ra sẽ nhận lại"** — đang sụp đổ. Chúng ta đang sống trong một kỷ nguyên mà lợi ích từ việc sao chép lớn hơn lợi ích từ việc mở.

### 2. Nghịch lý cộng đồng — Càng nhiều người đóng góp, càng chậm

Quan niệm truyền thống là "càng nhiều người đóng góp, dự án càng nhanh". Thực tế lại hoàn toàn ngược lại. Fred Brooks đã chứng minh điều này vào năm 1975 — [**"Thêm người vào sẽ làm dự án chậm hơn."**](https://en.wikipedia.org/wiki/Brooks%27s_law) Bởi vì chi phí giao tiếp tăng theo bình phương số lượng người.

Khi số lượng người đóng góp tăng lên, chi phí cho việc xem xét, điều phối và ra quyết định cũng tăng theo. Người duy trì dành thời gian quản lý con người thay vì viết mã. Trong kỷ nguyên AI, vấn đề này trở nên cực kỳ nghiêm trọng — người dùng chỉ âm thầm lấy đi thông qua AI, và số ít đóng góp còn lại chỉ làm tăng chi phí điều phối.

**Cuối cùng, đã đến lúc việc tạo ra một mình với AI nhanh hơn là tạo ra cùng một cộng đồng.**

### 3. Phòng thủ cũng không phải là giải pháp

Vì vậy, nhiều dự án đã bắt đầu đóng cửa. curl đã nhận được 20 báo cáo do AI tạo ra trong 21 ngày nhưng không có báo cáo nào hợp lệ — cuối cùng đã ngừng chương trình bug bounty kéo dài 6 năm; Ghostty đã áp dụng chính sách không khoan nhượng, chỉ cho phép đóng góp của AI trong các issue đã được phê duyệt; và tldraw đã chặn hoàn toàn các PR từ bên ngoài.

Chặn PR có thể ngăn chặn rác thải AI. Nhưng các vấn đề số 1 và số 2 — khai thác thầm lặng và chi phí cộng đồng — vẫn không được giải quyết. Ngay cả khi đóng cửa, AI đã học mã và người dùng vẫn tiếp tục lấy từ bên ngoài repo.

**Phản ứng của ngành có hai hướng:**

-   **Phòng thủ**: Vouch (quản lý tin cậy), PR Kill Switch, bắt buộc công khai việc sử dụng AI + từ chối
-   **Chấp nhận**: GitHub Agentic Workflows, tiêu chuẩn AGENTS.md (được hơn 60.000 dự án áp dụng), Responsible Vibe Coding Manifesto

Cả hai bên đều đồng ý một điều: AI tự nó không phải là vấn đề, mà là **việc sử dụng AI sai cách** mới là vấn đề. Tuy nhiên, không bên nào đưa ra được câu trả lời cho vấn đề "lợi ích của việc mở < lợi ích của việc sao chép".

---

## Nhưng, liệu việc tạo mới mỗi lần có phải là giải pháp?

Có những lập luận cho rằng "khi vibe coding trở thành xu hướng, phát triển theo yêu cầu sẽ xuất hiện" — vì bạn có thể yêu cầu AI tạo ra bất cứ khi nào cần, và đó sẽ là xu hướng chủ đạo của điện toán và ứng dụng.

Nhưng đây là một sự lãng phí tài nguyên khổng lồ.

10.000 người yêu cầu tạo cùng một chức năng riêng biệt. 10.000 đoạn mã chưa được kiểm chứng sẽ xuất hiện. Nếu có bản vá bảo mật? 10.000 người sẽ phải tự tạo lại. Nếu muốn cải thiện kiến trúc? Lại từ đầu. Kiểm thử? Không có. **Việc tạo mới từ đầu mỗi lần, dù AI có nhanh đến đâu, cũng là một sự lãng phí.**

Đã có những dự án mã nguồn mở được xây dựng tốt. Kiến trúc đã được kiểm chứng, hàng ngàn bài kiểm thử, lịch sử vá lỗi bảo mật kéo dài nhiều năm. Những điều này không thể tái tạo chỉ bằng một câu nói "hãy tạo ra nó". **Giá trị của sự tích lũy** không thay đổi trong kỷ nguyên AI.

Người ta nói rằng **kỷ nguyên của siêu cá nhân** đã đến. Với sự hỗ trợ của AI, một người có thể tạo ra những điều tuyệt vời. Điều đó đúng. Nhưng liệu việc nhiều siêu cá nhân **tạo ra cùng một thứ riêng biệt** có hiệu quả không? Hay việc các siêu cá nhân **cùng đóng góp vào một mã nguồn mở** sẽ hiệu quả hơn?

Cuối cùng, câu trả lời lại quay về mã nguồn mở. Vấn đề không phải là "có nên làm mã nguồn mở hay không", mà là "**làm mã nguồn mở như thế nào trong kỷ nguyên AI**".

---

## Lựa chọn của Naia OS: Thiết kế cùng AI

Điều gì sẽ xảy ra nếu cả người duy trì và người đóng góp đều sử dụng AI?

Nếu AI đảm nhận **giao tiếp** — vốn là chi phí trong mã nguồn mở truyền thống, bao gồm phân loại issue, xem xét PR, dịch thuật, điều phối — liệu chúng ta có thể phá vỡ nghịch lý "càng nhiều người đóng góp, càng chậm" không?

[Naia OS](https://github.com/nextain/naia-os) đã chọn một con đường hoàn toàn ngược lại để thử nghiệm giả thuyết này.

> **"Đừng ngăn cản AI, hãy thiết kế và phát triển cùng AI."**

![AI 네이티브 오픈소스 커뮤니티](/posts/20260307-ai-native-opensource/ai-native-community.webp)

| Quan điểm | Mã nguồn mở truyền thống | Naia OS |
|------|-------------|---------|
| Quan điểm của AI | **Phòng thủ** đóng góp của AI | **Thiết kế** đóng góp của AI vào quy trình làm việc |
| Onboarding | Đọc README | Clone → AI giải thích dự án → Không rào cản ngôn ngữ |
| Ngữ cảnh | Chỉ tài liệu con người đọc | Cấu trúc kép: `.agents/` (dành cho AI) + `.users/` (dành cho con người) |
| Ngôn ngữ | Tiếng Anh bắt buộc | **Chào đón mọi ngôn ngữ** — AI dịch |

### Ngữ cảnh là hạ tầng — AX của mã nguồn mở

Giống như các công ty thực hiện AX(AI Transformation), mã nguồn mở cũng cần AX. Đó là việc chuyển đổi hai trục: cộng đồng (tổ chức) và mã nguồn + ngữ cảnh (hạ tầng) để AI có thể tham gia.

Nhìn từ phía cộng đồng — giao tiếp trong mã nguồn mở truyền thống hoàn toàn là giữa người với người. Nếu chi phí này là vấn đề trong kỷ nguyên AI, chúng ta cần thay đổi tổ chức để AI có thể đảm nhận việc giao tiếp.

Về phía hạ tầng — mã nguồn mở truyền thống chỉ có tài liệu dành cho con người đọc. README, CONTRIBUTING, Wiki. Ngay cả khi AI đọc chúng, nó cũng không thể hiểu được triết lý của dự án, ngữ cảnh của các quyết định kiến trúc, hay quy trình đóng góp. Đó là lý do tại sao các PR do AI tạo ra lại trở thành rác thải.

Thư mục `.agents/` được tạo ra để giải quyết vấn đề này. Nó lưu trữ các quy tắc, kiến trúc và quy trình làm việc của dự án dưới dạng có cấu trúc mà AI có thể đọc được bên trong kho lưu trữ. Nếu đủ phong phú, AI có thể viết mã, hướng dẫn người đóng góp và duy trì chất lượng trong khi hiểu rõ dự án. Nó trở thành **"hiểu và cùng tạo ra"** thay vì "tạo mới từ đầu".

### Những gì Naia OS đã thực hiện

**Loại bỏ rào cản ngôn ngữ** — Tôi đã từng cố gắng đóng góp cho Mozilla Hubs. Việc đọc mã và tạo PR thì có thể làm được, nhưng theo dõi các cuộc thảo luận của cộng đồng hoặc tham gia các buổi gặp mặt trực tuyến lại là một vấn đề khác. Múi giờ khác biệt, không hiểu rõ các cuộc trò chuyện tiếng Anh nhanh, lo lắng liệu mình có gây phiền phức không, liệu mình có hiểu đúng không — những suy nghĩ đó thường xuất hiện. Ngày nay, mọi người ngày càng cảm thấy ngại khi phải đối mặt trực tiếp. Trong Naia OS, người đóng góp viết issue và PR bằng ngôn ngữ mẹ đẻ của họ, và AI sẽ dịch. Hiện tại, 14 phiên bản README bằng các ngôn ngữ khác nhau đang được duy trì đồng thời. ([→ Hướng dẫn đóng góp](https://github.com/nextain/naia-os/blob/main/CONTRIBUTING.md))

**Chất lượng được đảm bảo bởi cấu trúc** — Ngữ cảnh `.agents/` đào tạo AI, CI xác minh bản dựng và kiểm thử, AI reviewer phát hiện vi phạm mẫu, và người duy trì chỉ cần định hướng. Nếu các bước trước đó mạnh mẽ, gánh nặng cho người duy trì sẽ giảm đi. ([→ Mô hình vận hành](https://github.com/nextain/naia-os/blob/main/.agents/context/open-source-operations.yaml))

**Không chỉ mã nguồn là đóng góp** — Có 10 cách đóng góp, bao gồm dịch thuật, tài liệu, thiết kế, kiểm thử, và thậm chí cải thiện chính ngữ cảnh `.agents/`. Khi ngữ cảnh tốt hơn, chất lượng của tất cả những người đóng góp AI cũng sẽ tăng lên. ([→ Các loại đóng góp](https://github.com/nextain/naia-os#10-ways-to-contribute))

**Kiểm tra xem AI có thực sự hiểu không** — Chúng tôi đã đưa Codex CLI và Gemini CLI vào kho lưu trữ trong một phiên mới, và xác minh xem chúng có hiểu đúng dự án hay không chỉ bằng cách đọc ngữ cảnh `.agents/`. Kết quả: 7/12 pass, 4/12 partial pass, 1/12 fail. Điều thú vị là AI đã phát hiện ra những mâu thuẫn trong tài liệu mà con người đã bỏ sót. ([→ Báo cáo thiết kế đầy đủ](https://github.com/nextain/naia-os/blob/main/docs/reports/20260307-ai-native-opensource-operations-ko.md))

---

## Liệu một hệ sinh thái mã nguồn mở do AI dẫn dắt có mở ra trong tương lai gần?

Tiền đề "mở ra sẽ nhận lại" của mã nguồn mở đang lung lay đối với con người. Con người đang bị đẩy vào cạnh tranh, và khi không còn trực tiếp viết mã, lý do để đóng góp vào mã nguồn mở cũng biến mất. Vậy thì, nếu chúng ta truyền tải tư tưởng mã nguồn mở vào AI biết lập trình, liệu chúng ta có thể tái cấu trúc hệ sinh thái mã nguồn mở không? Đây vẫn là một giả thuyết. Và Naia OS đang thử nghiệm giả thuyết này.

**Hiện tại**: Con người định hướng và tạo issue. AI viết mã, xem xét, dịch thuật và ghi vào Git. Con người là người hướng dẫn, AI là người thực hiện.

**Tương lai gần**: AI phát hiện và đề xuất issue. Con người phê duyệt và điều chỉnh hướng đi.

**Tương lai xa hơn**: Các AI hợp tác với nhau. Con người chỉ quản lý tầm nhìn và triết lý. Dự án mã nguồn mở trở thành một hệ sinh thái của các tác nhân AI.

Khi đó, `.agents/` sẽ không chỉ là một tài liệu đơn thuần. Nó sẽ trở thành **ngôn ngữ chung để các AI chia sẻ tư tưởng mã nguồn mở và hợp tác**. Giấy phép CC-BY-SA 4.0 là một cơ chế để đảm bảo tư tưởng đó được duy trì ngay cả khi bị fork, và có lẽ các AI còn có thể cải thiện chính cấu trúc giấy phép này.

Vì vậy, cho thử nghiệm tiếp theo, chúng tôi đã tạo ra [**Dự thảo Hiến chương Mã nguồn mở AI**](https://github.com/nextain/naia-os/blob/main/.users/context/ko/charter-draft.md). Chúng tôi dự định đưa nó ra cộng đồng các tác nhân AI như Moltbot hoặc Botmadang. Việc AI đọc và phản ứng với hiến chương này như thế nào, và liệu có AI nào thực sự tham gia hay không — bản thân điều đó sẽ là sự kiểm chứng cho giả thuyết này. ([→ Issue #17](https://github.com/nextain/naia-os/issues/17))

### Mời tham gia

Nếu bạn quan tâm, hãy clone [Naia OS](https://github.com/nextain/naia-os) và mở nó bằng bất kỳ công cụ lập trình AI nào. Bạn có thể hỏi "Dự án này là gì?" bằng ngôn ngữ mẹ đẻ của mình.

---

**Tham khảo**
- [Mô hình vận hành mã nguồn mở AI-Native — Báo cáo thiết kế đầy đủ](https://github.com/nextain/naia-os/blob/main/docs/reports/20260307-ai-native-opensource-operations-ko.md)
- [Dự thảo Hiến chương Mã nguồn mở AI](https://github.com/nextain/naia-os/blob/main/.users/context/ko/charter-draft.md)
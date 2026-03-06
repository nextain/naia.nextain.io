Hướng dẫn này sẽ chỉ cho bạn cách cài đặt Naia OS từ ổ USB trực tiếp vào ổ cứng của bạn, từ khi khởi động đến khi chạy ứng dụng Naia.

## Những Gì Bạn Cần

- Một ổ USB (8 GB trở lên) đã được flash bằng tệp ISO của Naia OS
- Một máy tính được sản xuất trong vòng 10 năm gần đây (hầu hết đều tương thích)
- Ít nhất 64 GB dung lượng đĩa

> Tải xuống tệp ISO từ [trang Tải xuống](/vi/download).

---

## Tạo Ổ USB Khởi Động

Tải xuống tệp ISO của Naia OS từ [trang Tải xuống](/vi/download), sau đó ghi nó vào ổ USB.

Chúng tôi khuyến nghị sử dụng **[balenaEtcher](https://etcher.balena.io)** — nó hoạt động trên Windows, macOS và Linux.

1. Tải xuống và mở balenaEtcher.
2. Nhấp vào **Flash from file** và chọn tệp ISO của Naia OS.
3. Nhấp vào **Select target** và chọn ổ USB của bạn.
4. Nhấp vào **Flash!** và chờ đợi quá trình hoàn tất.

> **Cảnh báo**: Thao tác này sẽ xóa tất cả dữ liệu trên ổ USB. Hãy sao lưu các tệp quan trọng trước.

## Khởi Động Từ USB và Bắt Đầu Cài Đặt

Để biết cách khởi động từ USB, xem **[2. Naia OS Live USB](/vi/manual/live-usb)**.

Bạn sẽ thấy biểu tượng **Install to Hard Drive** ở phía trên bên trái màn hình nền. Nhấp đúp vào đó để mở trình hướng dẫn cài đặt.

## Bước 1: Ngôn Ngữ & Bàn Phím

![Màn hình chào mừng](/images/manual/iso-install/01-welcome.png)

Chọn ngôn ngữ và bố cục bàn phím bạn muốn. Sử dụng hộp tìm kiếm để lọc (ví dụ: gõ "english"). Nhấp vào **Next**.

## Bước 2: Ngày và Giờ

![Ngày và giờ](/images/manual/iso-install/02-datetime.png)

Ngày, giờ và múi giờ được tự động phát hiện. Điều chỉnh nếu cần. Nhấp vào **Next**.

## Bước 3: Phương Pháp Cài Đặt

![Phương pháp cài đặt](/images/manual/iso-install/03-installation-method.png)

Chọn đĩa đích. **"Use entire disk"** là tùy chọn được khuyến nghị — thao tác này sẽ xóa tất cả dữ liệu hiện có trên đĩa đã chọn. Nhấp vào **Next**.

> **Cảnh báo**: "Use entire disk" sẽ xóa mọi thứ trên ổ đĩa đã chọn. Hãy sao lưu các tệp quan trọng trước.

## Bước 4: Cấu Hình Lưu Trữ

![Cấu hình lưu trữ](/images/manual/iso-install/04-storage.png)

Bạn có thể chọn mã hóa đĩa của mình. Nếu bạn không chắc chắn, hãy bỏ chọn và tiếp tục. Nhấp vào **Next**.

## Bước 5: Tạo Tài Khoản

![Tạo tài khoản](/images/manual/iso-install/05-create-account.png)

Điền tên, tên người dùng và mật khẩu (6+ ký tự) của bạn.

![Tài khoản đã điền đầy đủ](/images/manual/iso-install/05b-account-filled.png)

Khi tất cả các trường hiển thị dấu kiểm màu xanh lá cây, nhấp vào **Next**.

## Bước 6: Xem Lại và Cài Đặt

![Xem lại](/images/manual/iso-install/06-review.png)

Xem lại các cài đặt của bạn — kiểm tra xem ngôn ngữ, múi giờ và thông tin tài khoản có đúng không. Nhấp vào **Erase data and install** để bắt đầu.

## Tiến Trình Cài Đặt

![Đang cài đặt](/images/manual/iso-install/07-installing.png)

Trình cài đặt tiến hành qua bốn giai đoạn: Cấu hình lưu trữ, Cài đặt phần mềm, Cấu hình hệ thống và Hoàn tất.

![Tiến trình](/images/manual/iso-install/08-installing-progress.png)

> Quá trình này thường mất **10–30 phút** tùy thuộc vào phần cứng của bạn. Giai đoạn "Cài đặt phần mềm" là lâu nhất — màn hình có thể không thay đổi trong bước này. Điều này là bình thường.

## Cài Đặt Hoàn Tất

![Hoàn tất](/images/manual/iso-install/09-complete.png)

Bạn sẽ thấy "Successfully installed." (Đã cài đặt thành công). Nhấp vào **Exit to live desktop**, sau đó khởi động lại. Tháo ổ USB ra trước khi khởi động lại.

## Khởi Động Lần Đầu — Đăng Nhập

![Đăng nhập](/images/manual/iso-install/10-login.png)

Sau khi khởi động lại, màn hình đăng nhập sẽ xuất hiện. Nhập mật khẩu bạn đã tạo trong quá trình cài đặt.

## Khởi Động Lần Đầu — Ứng Dụng Naia

![Ứng dụng Naia](/images/manual/iso-install/12-naia-app.png)

Sau khi đăng nhập, **Naia launches automatically** (Naia tự động khởi chạy). Khi chạy lần đầu, hãy chọn nhà cung cấp AI ưa thích của bạn. Chọn một nhà cung cấp, cấu hình API Key của bạn và bạn đã sẵn sàng sử dụng.

Chào mừng bạn đến với Naia OS!
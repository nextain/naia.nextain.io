Cài đặt Naia dưới dạng một ứng dụng độc lập trên hệ thống Linux hiện có của bạn. Tất cả các tệp cài đặt đều có sẵn trên **[trang Tải xuống](/vi/download)** hoặc **[itch.io](https://nextain.itch.io/naia)**.

## Yêu cầu hệ thống

- **Hệ điều hành**: Linux (Ubuntu, Fedora, Bazzite, v.v.)
- **Màn hình**: Wayland (khuyên dùng) hoặc X11
- Cài đặt Flatpak không yêu cầu thiết lập môi trường thời gian chạy bổ sung.

---

## Flatpak (Khuyên dùng)

Cách cài đặt an toàn nhất. Ứng dụng chạy trong không gian riêng biệt, hệ thống của bạn sẽ luôn sạch sẽ.

Tải gói `.flatpak` từ [trang Tải xuống](/vi/download) và cài đặt qua terminal:

```bash
flatpak install --user ./Naia-Shell-x86_64.flatpak
```

> **Cách hoạt động**: Naia chạy trong không gian cô lập để đảm bảo an toàn. Khi AI cần điều khiển PC của bạn, nó chỉ yêu cầu các quyền cần thiết.

## Các định dạng khác

**AppImage**, **DEB** (Debian/Ubuntu) và **RPM** (Fedora/RHEL) cũng có sẵn trên [trang Tải xuống](/vi/download).

---

## (Dành cho nhà phát triển) Hướng dẫn xây dựng Flatpak cục bộ

Để xây dựng ứng dụng sandbox Flatpak từ mã nguồn, hãy làm theo các bước sau:

1. **Cài đặt Flatpak Builder**
   ```bash
   # Fedora / Bazzite
   sudo dnf install flatpak-builder

   # Ubuntu
   sudo apt install flatpak-builder
   ```

2. **Thêm phụ thuộc xây dựng (SDK)**
   ```bash
   flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
   flatpak install --user flathub org.freedesktop.Platform//24.08 org.freedesktop.Sdk//24.08
   ```

3. **Chạy bản dựng đóng gói**
   Thực thi lệnh này trong thư mục gốc của dự án (Naia-OS).
   ```bash
   # Compiles and builds into the build-dir
   flatpak-builder --user --install --force-clean build-dir flatpak/com.naia.shell.yml
   ```

4. **Chạy ứng dụng**
   ```bash
   flatpak run com.naia.shell
   ```

> **Lưu ý dành cho nhà phát triển:**
> Để thao tác môi trường máy chủ của người dùng từ bên trong sandbox Flatpak, tác nhân AI nội bộ sẽ gói tất cả các yêu cầu công cụ `execute_command` bằng `flatpak-spawn --host bash -c ...` trong `agent/src/gateway/tool-bridge.ts`.
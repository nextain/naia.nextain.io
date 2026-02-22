Tab này cho phép bạn theo dõi tình trạng hoạt động, số liệu thống kê và nhật ký thời gian thực của daemon OpenClaw Gateway đang chạy nền trên Naia.

![Diagnostics Tab](diagnostics-tab.png)

## Tổng quan Trạng thái
Trong lưới phía trên, bạn có thể kiểm tra các chỉ số cổng quan trọng:
- **Gateway**: Trạng thái kết nối hiện tại (🟢 OK, 🔴 Lỗi)
- **Node ID**: Mã định danh duy nhất của cổng
- **Uptime**: Thời gian hệ thống đã hoạt động
- **Platform / Arch**: Thông tin hệ điều hành và kiến trúc
- **Total Requests / Tokens**: Số yêu cầu và token đã xử lý hôm nay
- **Total Cost**: Tổng chi phí phát sinh

## Truyền nhật ký thời gian thực
Bảng điều khiển phía dưới truyền tải các nhật ký nội bộ chi tiết trực tiếp từ cổng.
- **Start Logs / Stop Logs**: Bạn có thể bắt đầu hoặc dừng luồng nhật ký bất cứ lúc nào.
- Nếu hệ thống gặp sự cố hoặc một tích hợp tin nhắn thất bại, bạn có thể tìm thấy nguyên nhân chi tiết trong các nhật ký này.

## Danh sách Phương thức RPC
Ở cuối cùng của tab, một danh sách tất cả các phương thức Remote Procedure Call (RPC) được hỗ trợ được hiển thị dưới dạng thẻ, cho phép bạn nhanh chóng xác minh những tính năng nào mà cổng hiện đang hỗ trợ.
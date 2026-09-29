# Nếu muốn dùng chính xác Be Vietnam Pro

Repository hiện tại của bạn có `font/BeVietnamPro.ttf` (GitHub hiển thị kích thước 181 KB). Trong bản đóng gói này mình dùng Noto Sans local cho body để gói ZIP tự chạy ngay; mình không thể lấy binary BeVietnamPro từ GitHub vào container ở lượt này.

Khi đã tải `BeVietnamPro.ttf` từ repository của bạn về máy, hãy:

1. Đặt file vào `font/BeVietnamPro.ttf`.
2. Mở `style.css`.
3. Thêm `@font-face` sau các khai báo font Noto:

```css
@font-face {
  font-family: "Be Vietnam Pro";
  src: url("./font/BeVietnamPro.ttf") format("truetype");
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
}
```

4. Đổi `font-family` của `body` từ `"Noto Sans Local"` sang `"Be Vietnam Pro", "Noto Sans Local", sans-serif`.

Nếu file Be Vietnam Pro không phải variable font thì thay `font-weight: 100 900` bằng các weight tương ứng với file thực tế.

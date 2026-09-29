# Triệu Phong — Mảnh đất con người

Bản hoàn chỉnh để chạy trên GitHub Pages. Thiết kế theo phong cách scrollytelling/editorial, với nội dung được biên tập lại từ bài “Mảnh đất con người” của Cổng thông tin xã Triệu Phong và tham chiếu cách trình bày của trang “Nguyễn Sinh Cung — Từ Hoàng Trù đến hành trình lớn”.

## Cấu trúc

```text
trieuphong/
├── index.html
├── style.css
├── script.js
├── README.md
└── font/
    ├── NotoSans-Regular.woff2
    ├── NotoSans-Medium.woff2
    ├── NotoSans-SemiBold.woff2
    ├── NotoSans-Bold.woff2
    ├── NotoSerifDisplay-Regular.woff2
    ├── NotoSerifDisplay-Medium.woff2
    ├── NotoSerifDisplay-SemiBold.woff2
    └── NotoSerifDisplay-Bold.woff2
```

## Các lỗi đã được tổng hợp và sửa

1. Không còn phụ thuộc Google Fonts. Font web được nhúng trực tiếp bằng `@font-face` và tải từ thư mục `/font`.
2. Không dùng `format("ttf")`; font web dùng `woff2` và `format("woff2")`.
3. Không còn đường dẫn mâu thuẫn `./fonts/...` và `./font/...`; toàn bộ asset font dùng `./font/...`.
4. Bản `NotoSerifDisplay.ttf` hiện có trong repository cũ chỉ có 2 Bytes, không phải một font hợp lệ. Bản hoàn chỉnh này thay bằng các file Noto Serif Display WOFF2 hợp lệ.
5. Dùng font có weight cụ thể thay vì khai báo `100 900` trên các file chưa được xác nhận là variable font.
6. Giảm `letter-spacing` âm mạnh ở tiêu đề tiếng Việt; tránh làm dấu và chữ bị dồn vào nhau.
7. Thiết lập `font-synthesis: none`, kerning, chống răng cưa và cách xuống dòng để giảm lỗi glyph trên Windows/macOS/Linux.
8. Viết lại timeline theo layout hai cột ổn định, tránh marker âm quá sâu gây overflow ngang.
9. Thêm `max-width`, `overflow-x: hidden` và cấu trúc responsive để tránh tình trạng trang bị co lệch như screenshot.
10. Timeline có breakpoint mobile riêng, không dùng kích thước desktop trên màn hình nhỏ.
11. Quiz hiện hiển thị giải thích ngay sau mỗi câu, khớp với nội dung mô tả trong HTML.
12. Menu mobile có trạng thái `aria-expanded` và tự đóng sau khi chọn mục.
13. Thêm fallback khi ảnh ngoài bị lỗi/hotlink bị chặn để layout không vỡ.
14. Sửa link nội bộ/asset sang dạng tương đối `./...`, phù hợp GitHub Pages.
15. Thêm `theme-color`, Open Graph cơ bản và các thuộc tính accessibility cho nút/menu/quiz.

## Font

Bản đóng gói này dùng Noto Sans và Noto Serif Display local để đảm bảo font tiếng Việt có sẵn trong chính website.

Nguồn họ font Noto: https://github.com/notofonts

Khi bạn có file `BeVietnamPro.ttf` hợp lệ từ repository hiện tại, có thể thay font body trong `style.css`; không cần thay cấu trúc HTML/JS.

## Ảnh

Bản này vẫn dùng một số URL ảnh ngoài trong phần demo. Khi xuất bản chính thức, nên tải các ảnh mà bạn có quyền sử dụng vào `images/` rồi thay `src` trong `index.html` để tránh phụ thuộc hotlink.

## GitHub Pages

1. Tạo repository public hoặc dùng repository hiện tại.
2. Upload toàn bộ nội dung thư mục này, giữ nguyên cấu trúc.
3. Vào Settings → Pages.
4. Chọn `Deploy from a branch` → `main` → `/(root)` → Save.
5. Mở đường dẫn GitHub Pages được GitHub cung cấp.

## Nguồn nội dung

- Cổng thông tin xã Triệu Phong: https://trieuphong.quangtri.gov.vn/vi/manh-dat-con-nguoi1/
- Trang mẫu tham chiếu: https://vnu254.github.io/sinhcung1/

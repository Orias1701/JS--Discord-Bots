# Lộ Trình Xây Dựng Discord Bot (Docker + Render)

## Giai đoạn 1: Khởi tạo & Cấu hình

* [X] Tạo cấu trúc thư mục dự án.
* [X] Thiết lập package.json, Dockerfile.
* [X] Lấy Token.

## Giai đoạn 2: Bộ não của Bot

* [X] Viết **env.js** 				# Đọc .env và đưa các secret vào các biến
* [X] Viết **src/.config.json.** 		# Định nghĩa các tên chức năng và lệnh command tương ứng
* [X] Viết **src/.config.js.** 			# Đọc config.json và lưu các lệnh vào các biến để các module khác sử dụng lại
* [X] Viết **src/index.js.**
* [X] Thiết lập **Script Handler.**
* [X] Thiết lập **Command Handler**.
* [X] Thiết lập **Event Handler.**

## Giai đoạn 3: Phát triển Tính năng

### Scripts -- Các hàm build sẵn để xử lý các tác vụ khi được gọi đến

* [X] Script Logs
* [ ] Script Mods
* [ ] Script Services
* [X] Script Tests
* [ ] Script Utilities

### Commands -- Tiếp nhận command của user và gọi các Script tương ứng để thực hiện chức năng

* [X] Commands Logs
* [ ] Commands Mods
* [ ] Commands Services
* [X] Commands Tests
* [ ] Commands Utilities

### Events -- Phản ứng với sự kiện và gọi các Script tương ứng để thực hiện chức năng

* [ ] Commands Logs
* [ ] Commands Mods
* [ ] Commands Services
* [ ] Commands Tests
* [ ] Commands Utilities

## Giai đoạn 4: Deployment

* [ ] Đẩy code lên GitHub (Private Repository).
* [ ] Kết nối Render với GitHub.
* [ ] Cấu hình biến môi trường (Environment Variables) trên Render.
* [ ] Deploy và tận hưởng.

---

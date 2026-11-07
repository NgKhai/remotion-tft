# Cơ chế roll trong TFT

Video giải thích cơ chế đổi cửa hàng trong Teamfight Tactics bằng giao diện mô phỏng tự vẽ, hoạt họa theo khung hình và captions tiếng Việt. Không dùng hình tướng hoặc nhạc có bản quyền. Thời lượng 120 giây, 1920×1080, 30 fps.

## Chạy và xuất video

Yêu cầu Node.js 20 trở lên. Từ thư mục project:

```bash
npm ci
npm run studio
npm run typecheck
npm run validate:data
npm run render
```

Studio mặc định chạy ở cổng 3000, có thể chọn cổng khác bằng `--port=...`. MP4 được xuất tại `out/tft-roll-mechanics-vi.mp4`.

## Chỉnh sửa nội dung

- **Tỷ lệ cửa hàng:** sửa `src/data/shopOdds.ts`. Mỗi hàng phải đủ 100%. Số liệu hiện tại là snapshot Set 18 do brief cung cấp và chưa được đối chiếu độc lập với patch hiện hành; cần xác nhận trước khi phát hành.
- **Bản sao bể tướng, giá đổi và bảng lãi:** sửa `src/data/examples.ts`. Bể 10 bản sao là ví dụ minh họa, không phải hằng số mọi bộ.
- **Chân dung:** các tướng hiện được minh họa bằng biểu tượng và màu sắc hư cấu trong `src/components/ChampionCard.tsx`. Có thể thay phần chân dung bằng SVG/ảnh tự sở hữu; đặt tệp trong `public/` và dùng `staticFile()`.
- **Thời lượng:** sửa `src/data/timeline.ts`, cập nhật các mốc captions trong `src/data/narration.ts`, rồi giữ tổng thời lượng mong muốn.
- **Cảnh:** nội dung tám cảnh nằm trong `src/scenes/Scenes.tsx`; timeline đăng ký từng cảnh ở `src/compositions/TFTRollExplainer.tsx`.
- **Captions và lời dẫn:** `src/data/narration.ts` chứa lời dẫn hoàn chỉnh tiếng Việt và thời điểm captions. Bản xuất này dùng captions, không có giọng đọc tổng hợp.
- **Màu và giao diện:** sửa biến màu trong `src/styles.css`. Hoạt họa được tính từ frame trong React, không dùng CSS animation.

## Kiểm tra xác suất

`npm run validate:data` xác nhận các hàng tỷ lệ, giá đổi minh họa, bảng lãi, xác suất có ít nhất một tướng bốn vàng trong năm ô, thứ tự captions và thời lượng. Công thức giả định từng ô được rút độc lập.

## Video giải thuật LeetCode 1882

Composition `ProcessTasks1882` giải thích bài Phân công tác vụ bằng hai heap, dài 5:40, captions tiếng Việt. Xem hướng dẫn riêng trong [PROCESS_TASKS_1882.md](PROCESS_TASKS_1882.md). Xuất bằng `npm run render:1882`.

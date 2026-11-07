# Video bài 1882 — Phân công tác vụ bằng hai heap

Composition `ProcessTasks1882`, 1920×1080, 30 fps, 340 giây (5:40). Video minh họa bằng captions tiếng Việt, chưa có giọng đọc hoặc nhạc nền. Composition TFT vẫn được giữ nguyên.

## Xem và xuất

```bash
npm ci
npm run studio
# Chọn ProcessTasks1882 trong Studio.
npm run test:1882
npm run typecheck
npm run render:1882
```

Kết quả: `out/process-tasks-1882-vi.mp4`. Render sử dụng Chromium hệ thống `/usr/bin/chromium`. Có thể thay đường dẫn trong script nếu chạy trên máy khác.

## Chỉnh sửa

- `src/process-tasks/story.ts`: nội dung, hai bộ dữ liệu ví dụ, captions và mốc chương.
- `src/process-tasks/scenes.tsx`: tám cảnh độc lập, số liệu và chuyển động theo frame.
- `src/process-tasks/visuals.tsx`: task, server, biểu đồ lịch xử lý, hai heap và trạng thái đáp án.
- `src/process-tasks/scheduler.ts`: thuật toán hai min-heap tạo lịch dùng trong mô phỏng.
- `src/process-tasks/style.css`: màu, chữ, bố cục. Dùng font Be Vietnam Pro cài cục bộ.
- `src/process-tasks/ProcessTasks1882.tsx`: timeline, captions và thanh tiến độ. Khi đổi thời lượng, sửa timeline này và độ dài composition trong `src/Root.tsx`.

Sau khi sửa lời dẫn trong `story.ts`, chạy `npm run captions:1882` để xuất lại `PROCESS_TASKS_NARRATION_VI.md`, `public/process-tasks/captions.json` và `captions.vi.srt`. Caption JSON theo kiểu `Caption` của Remotion. Phần cảnh/lời dẫn đã có cả quy tắc chọn máy, ví dụ gốc, trường hợp chờ, chi phí O(nm), hai heap, giả mã và độ phức tạp.

## Tính đúng đắn

Tác vụ được duyệt theo thứ tự đến. Trước mỗi lần gán, mọi máy có thời điểm hoàn thành không vượt quá đồng hồ được chuyển về heap rảnh. Nếu không có máy rảnh, đồng hồ nhảy tới thời điểm hoàn thành nhỏ nhất rồi tiếp tục giải phóng toàn bộ máy đã xong. Đỉnh heap rảnh tuân theo (trọng số, chỉ số), nên từng phép gán đúng quy tắc đề bài.

Thời gian O((n+m) log n), bộ nhớ phụ trợ O(n), mảng đáp án O(m). Tổng thời gian có thể tới 40 tỷ, cần 64 bit trong C++/Java; JavaScript Number vẫn chính xác trong giới hạn này.

`scripts/process-tasks.test.ts` kiểm tra hai ví dụ đề bài, giải phóng đồng thời/FIFO, trọng số bằng nhau, 200.000 tác vụ trên một máy và 300 trường hợp đối chiếu với thuật toán quét đơn giản.

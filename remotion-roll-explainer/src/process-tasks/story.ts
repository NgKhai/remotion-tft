export const FPS=30;
export const chapters=[
  {id:'hook',title:'Một hàng đợi. Nhiều máy chủ.',tag:'BÀI TOÁN 1882',duration:25,captions:[
    'Mỗi giây, một tác vụ mới xuất hiện. Máy chủ nào sẽ nhận công việc đó?',
    'Mỗi máy chủ có một trọng số. Mỗi tác vụ có một thời gian xử lý riêng.',
    'Nếu tất cả máy chủ đều bận, tác vụ phải chờ đến khi có máy rảnh.',
    'Ta sẽ mô phỏng quy tắc này, rồi biến nó thành thuật toán hai heap.'
  ]},
  {id:'rules',title:'Hai thứ tự cần giữ đúng',tag:'HIỂU QUY TẮC',duration:40,captions:[
    'Tác vụ j đến ở giây j. Giá trị tasks[j] là số giây cần xử lý.',
    'Thời điểm đến và thời điểm bắt đầu có thể khác nhau: tác vụ có thể phải chờ.',
    'Chỉ những máy chủ đang rảnh mới được tham gia lựa chọn.',
    'Trong nhóm rảnh, ưu tiên trọng số nhỏ nhất. Nếu bằng nhau, chọn chỉ số nhỏ nhất.',
    'Trọng số chỉ dùng để chọn máy chủ; nó không làm công việc chạy nhanh hay chậm hơn.',
    'Nếu bắt đầu lúc t, máy chủ rảnh lại lúc t cộng thời gian xử lý.'
  ]},
  {id:'example',title:'Chạy thử từng giây',tag:'VÍ DỤ 1',duration:55,captions:[
    'Ba máy chủ có trọng số 3, 3 và 2. Tác vụ đầu tiên đến ở giây không.',
    'Máy chủ số 2 có trọng số nhỏ nhất nên nhận tác vụ 0, và rảnh lại ở giây 1.',
    'Giây 1, máy chủ số 2 nhận tác vụ 1, có thời gian xử lý hai giây.',
    'Giây 2, máy chủ số 2 vẫn bận. Hai máy còn lại bằng trọng số, nên chọn số 0.',
    'Giây 3, máy chủ số 2 rảnh trở lại và nhận tác vụ 3.',
    'Giây 4, chỉ máy chủ số 1 còn rảnh. Nó nhận tác vụ có thời gian xử lý một giây.',
    'Giây 5, cả ba máy cùng rảnh. Trọng số nhỏ nhất lại thuộc về máy chủ số 2.',
    'Đọc các lựa chọn theo thứ tự tác vụ, ta thu được đáp án: 2, 2, 0, 2, 1, 2.'
  ]},
  {id:'cost',title:'Quét hết máy chủ có đủ nhanh?',tag:'TÌM NÚT THẮT',duration:25,captions:[
    'Cách trực tiếp là quét mọi máy chủ để tìm máy rảnh tốt nhất cho từng tác vụ.',
    'Với hai trăm nghìn máy và hai trăm nghìn tác vụ, có thể phải xét bốn mươi tỷ lần.',
    'Ta chỉ cần trả lời nhanh hai câu: máy rảnh nào tốt nhất, và máy bận nào sắp xong?',
    'Hai câu hỏi, hai tiêu chí ưu tiên. Đó là lý do ta dùng hai min-heap.'
  ]},
  {id:'heaps',title:'Hai heap, hai nhiệm vụ',tag:'CẤU TRÚC DỮ LIỆU',duration:50,captions:[
    'Heap rảnh lưu trọng số và chỉ số. Phần tử ở đỉnh là máy chủ nên chọn tiếp theo.',
    'Heap bận lưu thời điểm hoàn thành và chỉ số. Đỉnh cho biết khi nào có máy sẵn sàng.',
    'Lấy một máy từ heap rảnh để nhận việc, rồi đưa nó vào heap bận với thời điểm kết thúc mới.',
    'Khi đồng hồ tiến lên, chuyển mọi máy có thời điểm kết thúc không vượt quá hiện tại về heap rảnh.',
    'Các hàng đang được vẽ theo thứ tự ưu tiên để dễ đọc; mảng bên trong heap không cần được sắp xếp toàn bộ.',
    'Duyệt các tác vụ theo chỉ số đã giữ đúng thứ tự chờ. Không cần tạo thêm hàng đợi tác vụ.',
    'Nếu heap rảnh trống, đỉnh heap bận cho ta thời điểm có thể tiếp tục.'
  ]},
  {id:'jump',title:'Không có máy rảnh? Nhảy thời gian.',tag:'TRƯỜNG HỢP DỄ SAI',duration:60,captions:[
    'Xét hai máy có trọng số 5 và 1, cùng bốn tác vụ có thời gian 5, 4, 1, 1.',
    'Tác vụ 0 chạy trên máy số 1 đến giây 5. Tác vụ 1 chạy trên máy số 0 cũng đến giây 5.',
    'Tác vụ 2 đến ở giây 2, khi cả hai máy đều bận. Ta không cần đếm qua từng giây.',
    'Đồng hồ nhảy thẳng tới giây 5: thời điểm hoàn thành sớm nhất trong heap bận.',
    'Quan trọng: cả hai máy đều hoàn thành ở giây 5. Hãy giải phóng tất cả trước khi chọn.',
    'Máy số 1 có trọng số nhỏ hơn, nên nhận tác vụ 2 trước.',
    'Tác vụ 3 cũng đã đến và đang chờ. Máy số 0 nhận nó ngay trong cùng giây 5.',
    'Hai tác vụ chờ bắt đầu cùng lúc, nhưng vẫn được gán theo đúng thứ tự đến.'
  ]},
  {id:'code',title:'Từ mô phỏng sang thuật toán',tag:'GHÉP CÁC BƯỚC LẠI',duration:55,captions:[
    'Duyệt tác vụ j theo thứ tự. Đầu tiên, lấy thời gian lớn hơn giữa hiện tại và j.',
    'Sau đó, trả mọi máy đã hoàn thành về heap rảnh. Điều kiện là kết thúc nhỏ hơn hoặc bằng thời gian.',
    'Nếu heap rảnh vẫn trống, nhảy đến thời điểm hoàn thành sớm nhất.',
    'Sau bước nhảy, lại giải phóng tất cả máy đã hoàn thành; không chỉ lấy ra một máy.',
    'Lấy đỉnh heap rảnh, ghi chỉ số của máy vào đáp án, rồi tính thời điểm kết thúc mới.',
    'Đưa máy đó sang heap bận. Các tác vụ tiếp theo tiếp tục cùng quy trình.',
    'Thời gian có thể lên tới bốn mươi tỷ. Trong C++ hoặc Java, cần số nguyên 64 bit.'
  ]},
  {id:'summary',title:'Nhớ ba điều này',tag:'TỔNG KẾT',duration:30,captions:[
    'Thứ tự tác vụ được giữ bằng cách duyệt từ trái sang phải.',
    'Heap bận cho biết khi nào tiếp tục được; heap rảnh quyết định chọn máy chủ nào.',
    'Sau khi nhảy thời gian, giải phóng toàn bộ máy đã xong rồi mới chọn.',
    'Độ phức tạp là O của n cộng m nhân log n. Bộ nhớ phụ trợ O của n, chưa tính đáp án.',
    'Tách đúng hai loại ưu tiên, bài toán mô phỏng trở thành một lịch sự kiện hiệu quả.'
  ]}
] as const;
export const TOTAL_SECONDS=chapters.reduce((sum,c)=>sum+c.duration,0);
export const example={servers:[3,3,2],tasks:[1,2,3,2,1,2]};
export const waiting={servers:[5,1],tasks:[5,4,1,1]};

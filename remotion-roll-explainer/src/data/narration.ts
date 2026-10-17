export type CaptionCue = {start: number; end: number; text: string};

/** Complete Vietnamese narration, with caption timing in seconds. */
export const narrationScript = [
  'Bạn từng dùng cả đống vàng mà vẫn trượt tướng cần tìm? Cửa hàng dựa trên xác suất, cấp độ và bể tướng chung.',
  'Mỗi lần đổi cửa hàng tốn hai vàng và tạo lại năm ô. Từng ô chọn bậc giá theo cấp của bạn, rồi mới chọn một tướng còn trong bể. Cửa hàng cũng tự làm mới mỗi vòng, trừ khi bạn khóa lại.',
  'Cấp độ đổi tỷ lệ của từng bậc tướng. Cấp năm thiên về tướng rẻ; cấp bảy hợp tìm tướng ba vàng; cấp tám tăng cơ hội tướng bốn vàng. Các tỷ lệ là cho từng ô, không phải cho một tướng cụ thể. Đây là snapshot tham khảo Set 18, cần đối chiếu patch trước khi dùng.',
  'Mọi người chơi cùng rút từ một bể. Khi đối thủ giữ bản sao của Tướng A, số còn lại giảm, nên cơ hội tìm đúng vị tướng ấy cũng giảm. Ví dụ minh họa này dùng mười bản sao; con số thật có thể đổi theo bộ và phiên bản. Ba bản sao ghép thành hai sao; chín bản sao tạo thành ba sao.',
  'Roll tiêu vàng và lợi tức tiềm năng. Thông thường, mỗi mười vàng tích trữ cho thêm một vàng mỗi vòng, tối đa năm. Giữ mốc năm mươi giúp nhận đủ lợi tức, nhưng giữ tiền không phải lúc nào cũng đáng nếu đội hình đang yếu.',
  'Roll chậm giữ mốc lợi tức và chỉ dùng phần vàng dư. Xả vàng dùng tiền ngay để nâng cấp bàn cờ khi cần. Lên tám nhanh đầu tư kinh nghiệm trước, rồi tìm tướng chủ lực. Đây là lựa chọn tình huống, không có chiến lược nào luôn đúng.',
  'Nếu mỗi ô có mười phần trăm ra tướng bốn vàng, năm ô có khoảng bốn mươi mốt phần trăm xuất hiện ít nhất một tướng bốn vàng. Ở mức ba mươi phần trăm mỗi ô, con số thành tám mươi ba phần trăm. Đây là bất kỳ tướng bốn vàng nào, chưa phải tướng bạn đang săn.',
  'Muốn roll hiệu quả: chọn cấp phù hợp, xem đối thủ đang tranh tướng nào, giữ vàng khi có thể và xả tiền khi đội hình cần mạnh ngay. Xác suất giúp bạn ra quyết định; nó không hứa hẹn kết quả.',
];

export const captionCues: CaptionCue[] = [
  {start: 0.3, end: 4.1, text: 'Bạn từng dùng cả đống vàng mà vẫn trượt tướng cần tìm?'},
  {start: 4.1, end: 8.9, text: 'Cửa hàng dựa trên xác suất, cấp độ và bể tướng chung.'},
  {start: 9.2, end: 14.1, text: 'Mỗi lần đổi cửa hàng tốn hai vàng và tạo lại năm ô.'},
  {start: 14.1, end: 19.2, text: 'Từng ô chọn bậc giá theo cấp của bạn, rồi mới chọn tướng còn trong bể.'},
  {start: 19.2, end: 24, text: 'Cửa hàng cũng tự làm mới mỗi vòng, trừ khi bạn khóa lại.'},
  {start: 24.2, end: 29.7, text: 'Cấp độ đổi tỷ lệ của từng bậc tướng. Cấp năm thiên về tướng rẻ.'},
  {start: 29.7, end: 35, text: 'Cấp bảy hợp tìm tướng ba vàng; cấp tám tăng cơ hội tướng bốn vàng.'},
  {start: 35, end: 38.5, text: 'Tỷ lệ áp dụng cho từng ô, không phải một tướng cụ thể.'},
  {start: 38.5, end: 43, text: 'Snapshot Set 18 tham khảo; cần đối chiếu patch hiện hành.'},
  {start: 43.2, end: 48.5, text: 'Mọi người chơi cùng rút từ một bể. Đối thủ giữ tướng thì số bản sao còn lại giảm.'},
  {start: 48.5, end: 53.1, text: 'Ít bản sao hơn khiến việc tìm đúng vị tướng khó hơn.'},
  {start: 53.1, end: 57, text: 'Ví dụ dùng mười bản sao; số thật có thể đổi theo bộ và phiên bản.'},
  {start: 57, end: 60, text: 'Ba bản sao ghép thành hai sao; chín bản sao thành ba sao.'},
  {start: 60.2, end: 65.3, text: 'Roll tiêu vàng và lợi tức tiềm năng. Mỗi mười vàng thường cho thêm một vàng.'},
  {start: 65.3, end: 70.8, text: 'Lợi tức tối đa năm vàng khi tích đủ năm mươi.'},
  {start: 70.8, end: 75.8, text: 'Giữ tiền không phải lúc nào cũng đáng nếu đội hình đang yếu.'},
  {start: 76.2, end: 82.5, text: 'Roll chậm giữ mốc lợi tức và chỉ dùng phần vàng dư.'},
  {start: 82.5, end: 89, text: 'Xả vàng để nâng cấp bàn cờ khi cần mạnh ngay.'},
  {start: 89, end: 95.8, text: 'Lên tám nhanh đầu tư kinh nghiệm trước, rồi tìm tướng chủ lực. Không có cách nào luôn đúng.'},
  {start: 96.2, end: 102.3, text: 'Mười phần trăm mỗi ô cho khoảng bốn mươi mốt phần trăm có tướng bốn vàng trong năm ô.'},
  {start: 102.3, end: 108, text: 'Ba mươi phần trăm mỗi ô cho khoảng tám mươi ba phần trăm.'},
  {start: 108, end: 111.8, text: 'Đó là bất kỳ tướng bốn vàng nào, không phải chủ lực bạn săn.'},
  {start: 112.2, end: 114.6, text: 'Chọn cấp phù hợp, xem đối thủ tranh tướng nào.'},
  {start: 114.6, end: 117, text: 'Giữ vàng khi có thể; xả tiền khi cần mạnh ngay.'},
  {start: 117, end: 119.8, text: 'Xác suất giúp bạn chọn cách đánh, nhưng không hứa hẹn kết quả.'},
];

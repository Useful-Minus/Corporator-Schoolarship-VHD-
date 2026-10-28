Yêu cầu WEBSITE:
- Trên cùng có 1 cái bộ lọc (người dùng điền gpa với điểm rèn luyện để lọc ra những học bổng đủ đkien để mình app)
- Ở dưới là tất cả các học bổng doanh nghiệp và học bổng của trường (mỗi học bổng phải hiện đầy đủ các thông tin như gpa, điểm rèn luyện, hạn, mức học bổng,…)

-  Sẽ có 1 cái mục là hồ sơ của tôi, ví dụ xem cái list học bổng user muốn app cái này thì sẽ bấm vô cái học bổng đó trong học bổng đó có 1 cái nút bấm chọn để đưa nó vào mục hồ sơ của tôi, khi đưa vào hồ sơ của tôi thì trong cái học bổng đó sẽ hiện 2 mục nữa là nhắc nhở thời gian đóng và 1 mục là check list hồ sơ kiểu để user tick là user đã chbi xong những hồ sơ nào rồi á

- web phải đầy đủ thông tin về các học bổng, nhắc nhở ng dùng trc hạn học bổng kết thúc.

- HD Mục List các học bổng (trong trường+ doanh nghiệp hỗ trợ cho trường) đang mở
- Ttin về các học bổng đó phải bao gồm: thời gian mở, tg đóng, mức học bổng, điều kiện (gpa + điểm rèn luyện + yêu cầu khác)
- Mục hướng dẫn cbi giấy tờ + nhắc nhở tg nộp sau khi chọn 1 - 2 học bổng cụ thể

- web phải tích hợp thông tin học b + cách đánh giá điều kiện dựa trên tiêu chí của UEH, phải cập nhật liên tục theo thời gian


EVALUATION
1. Bộ lọc thông minh (GPA & ĐRL)
- Viết thuật toán lọc dữ liệu (filter()) dựa trên giá trị người dùng nhập vào so sánh với điều kiện tối thiểu của từng học bổng trong tập dữ liệu

2. Danh sách Học bổng (Trường + Doanh nghiệp)
- Lưu trữ danh sách bài đăng dưới dạng file dữ liệu tĩnh scholarships.json hoặc cơ sở dữ liệu nhẹ như SQLite/MongoDB Local

3. Mục "Hồ sơ của tôi" (Save List)
- Sử dụng localStorage hoặc IndexedDB của trình duyệt để lưu danh sách các học bổng sinh viên chọn đăng ký mà không mất đi khi f5/đóng web

4. Checklist hồ sơ giấy tờ
- Xây dựng danh sách dạng checkbox (đơn xin, bảng điểm, chứng nhận hộ nghèo, chứng chỉ...). Trạng thái tick/untick lưu trực tiếp vào localStorage

5. Nhắc nhở hạn nộp (Deadline Reminder)
- Tính khoảng thời gian còn lại (Countdown Timer) từ ngày hiện tại đến hạn nộp. Sử dụng Web Notification API native của trình duyệt để phát thông báo

6. Gợi ý & Đánh giá điều kiện UEH
- Thiết lập logic so sánh đa tiêu chí (Khóa K50/K51/K52, ngành, GPA, ĐRL, tiêu chí phụ). 
- Nếu muốn thông minh hơn, có thể gọi API của OpenAI/Gemini qua API Key cá nhân.100% (Khả thi)7. Cổng tiếp nhận học bổng Doanh nghiệpTạo form cho phép điền thông tin học bổng mới và lưu vào danh sách chờ duyệt (Pending State) trong bộ nhớ local hoặc CSDL local
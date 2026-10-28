Hệ thống này về bản chất là một đường ống thu thập dữ liệu tự động (Web Crawler / Scraper) kết hợp với bộ trích xuất dữ liệu (Data Extractor) để chuyển đổi văn bản từ trang dsa.ueh.edu.vn thành cấu trúc scholarships.json của bạn.

Mô hình kiến trúc của tự động hóa (Data Pipeline)

[dsa.ueh.edu.vn] ──(1. Crawl HTML)──> [Crawler Engine] ──(2. Extract Text/PDF)──> [AI/Regex Parser] ──(3. Format)──> [scholarships.json]

Quy trình 3 bước triển khai chi tiết
Bước 1: Thu thập bài viết (Web Crawler)

    Công cụ đề xuất: Python (BeautifulSoup4, Scrapy hoặc Playwright).

    Cơ chế:

        Gửi request định kỳ (Cron job hàng ngày/hàng giờ) đến các trang danh mục của DSA UEH (ví dụ: mục Học bổng khuyến khích học tập, Học bổng doanh nghiệp).

        Bóc tách danh sách URL bài viết mới nhất và kiểm tra xem URL này đã có trong scholarships.json chưa (tránh cào trùng).

Bước 2: Trích xuất & Chuẩn hóa dữ liệu (Data Parsing)

Thách thức lớn nhất của dsa.ueh.edu.vn là thông báo học bổng được viết dưới dạng văn bản tự do (unstructured text) hoặc đính kèm file PDF, không theo một template cố định. Để giải quyết, có 2 giải pháp:

    Cách 1: Trích xuất bằng AI (Khuyên dùng - Độ chính xác cao nhất)

        Sau khi lấy nội dung chữ (text) của bài viết, gửi đoạn text đó qua API của LLM (như Gemini 1.5 Flash hoặc OpenAI GPT-4o-mini) với câu lệnh (prompt) yêu cầu trả về dạng JSON theo Schema định sẵn.

        Chi phí: Nhẹ (vài nghìn đồng cho hàng trăm bài viết nếu dùng model nhỏ).

    Cách 2: Trích xuất bằng Biểu thức chính quy (Regex)

        Viết các quy tắc bắt từ khóa (ví dụ: tìm đoạn có chứa GPA, Điểm rèn luyện, Hạn nộp, từ ngày ... đến ngày).

        Nhược điểm: Dễ sót thông tin nếu bài viết thay đổi cách trình bày.

Bước 3: Ghi file scholarships.json

    Hệ thống tự động đẩy dữ liệu vừa bóc tách được vào danh sách JSON và lưu ở thư mục local dự án của bạn (src/data/scholarships.json).
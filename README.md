# Website Học bổng sinh viên UEH

Đây là trang web giúp sinh viên UEH tìm học bổng dễ hơn. Mọi học bổng của trường
và của doanh nghiệp được gom về một chỗ, trình bày gọn thành từng thẻ.

Sinh viên chỉ cần nhập điểm trung bình (GPA), điểm rèn luyện, khóa và ngành học,
trang web sẽ tự chỉ ra mình hợp với học bổng nào, còn bao nhiêu ngày để nộp,
cần chuẩn bị giấy tờ gì, và sẽ nhắc trước khi hết hạn.

---

## 1. Tính năng cửa web

- **Ô tìm học bổng ở đầu trang:** nhập GPA, điểm rèn luyện, khóa, ngành, mong muốn
  (muốn hỗ trợ tiền học hay muốn khen thưởng thành tích) → web tự lọc ra học bổng
  bạn đủ điều kiện. Học bổng nào chưa đủ thì web ghi rõ lý do (ví dụ: GPA chưa đủ).
- **Danh sách học bổng:** mỗi học bổng là một thẻ ghi rõ mức tiền, ngày mở, ngày hết
  hạn, tình trạng (Đang nhận hồ sơ / Sắp mở / Đã hết hạn). Học bổng đang nhận được
  xếp lên trước.
- **Bấm vào từng thẻ** để xem đầy đủ: chi tiết điều kiện, giấy tờ cần làm, cách nộp.
- **Hồ sơ của tôi:** chỗ lưu các học bổng bạn muốn nộp. Tắt máy mở lại vẫn còn.
  Mỗi học bổng hiện rõ còn mấy ngày, gần hết hạn web sẽ nhắc. Giấy tờ nào làm xong
  thì tick vào để khỏi quên.
- **Hướng dẫn giấy tờ:** 4 bước từ tìm, lưu, chuẩn bị giấy tờ đến nộp trước hạn.
- **Chỗ cho doanh nghiệp gửi học bổng mới:** thông tin gửi vào sẽ chờ Ban Chăm sóc
  người học duyệt rồi mới đăng công khai.

Kết quả lọc chỉ để tham khảo cho nhanh, quyết định cuối cùng vẫn thuộc về đơn vị
xét học bổng. Nguồn tin chính: dsa.ueh.edu.vn.

## 2. Các thành phần trong repo

- `src/` — toàn bộ phần hiển thị của web (màn hình, nút bấm, ô nhập...).
- `src/data/scholarships.json` — danh sách 10 học bổng mẫu để chạy thử.
- `tools/crawl_dsa.py` — công cụ nhỏ tự lấy tin học bổng từ trang DSA của trường.
- `requirements.txt` — danh sách 3 món phụ trợ cho công cụ lấy tin
  (`requests`, `beautifulsoup4`, `lxml`).
- `package.json` — danh sách các món mà phần web cần (React, Vite, Tailwind...).
- `_archive/`, `Ignore (Local_Only)/`, `Yeu_cau_KH.txt` — đồ lưu riêng trên máy,
  không đưa lên mạng (đã khai báo trong `.gitignore` nên bạn tải từ GitHub về
  sẽ không thấy chúng, đó là bình thường).

## 3. Các thành phần cần chuẩn bị

Bạn cần 3 thứ:

1. **Git** — phần mềm để tải code từ GitHub về máy.
2. **Node.js (bản 20)** — phần mềm để mở và chạy thử trang web.
   Đi kèm nó có sẵn **corepack/pnpm**, là công cụ tải các món mà web cần.
3. **Python (bản 3.10 trở lên)** — chỉ cần nếu bạn muốn chạy công cụ tự lấy tin
   học bổng. Nếu chỉ mở web lên xem thì không bắt buộc.

Bên dưới có 2 phần riêng: **phần A cho Windows**, **phần B cho Linux**.
Bạn dùng máy nào thì đọc đúng phần đó.

---

## A. Hướng dẫn cho máy Windows

### 1. Mở PowerShell

Bấm nút **Start**, gõ `PowerShell`, bấm mở **Windows PowerShell**.
Mọi lệnh bên dưới bạn copy rồi dán vào cửa sổ này, bấm **Enter** sau mỗi lệnh.

### 2. Cài 3 phần mềm cần thiết

Gõ từng lệnh, chờ mỗi lệnh chạy xong hẳn rồi mới gõ lệnh tiếp theo:

```powershell
winget install --id Git.Git -e
```

```powershell
winget install --id OpenJS.NodeJS.LTS -e
```

```powershell
winget install --id Python.Python.3.12 -e
```

(Lệnh `winget` là "chợ ứng dụng" có sẵn của Windows, nó tự tải và cài giúp bạn.
Khi cài Python, nếu nó hỏi thì nhớ tick vào ô **Add python.exe to PATH**.)

Cài xong, **tắt PowerShell đi, mở lại** rồi kiểm tra:

```powershell
git --version
node --version
python --version
```

Nếu cả 3 lệnh đều hiện ra chữ và số phiên bản (ví dụ `v20.x`, `Python 3.12...`)
là thành công.

### 3. Bật công cụ pnpm

1. Bấm nút **Start**, gõ `PowerShell`, **bấm chuột phải** → chọn
   **Run as Administrator** (chạy với quyền quản trị), bấm **Yes**.
2. Trong cửa sổ đó gõ:

```powershell
corepack enable
```

3. Tắt đi, mở lại PowerShell bình thường, gõ:

```powershell
corepack pnpm --version
```

Nếu nó hiện ra số phiên bản (ví dụ `12.16.1`) là xong.
(Từ đây về sau, chỗ nào ghi `pnpm ...` mà máy báo không hiểu thì bạn gõ
`corepack pnpm ...` thay thế.)

### 4. Tải code về và mở web lên

```powershell
cd D:\
git clone https://github.com/Useful-Minus/Corporator-Schoolarship-VHD-.git UEH_WebHB
cd UEH_WebHB
```

Lệnh trên tải code về ổ D, thư mục `UEH_WebHB`. Tiếp theo, tải các món mà web cần
(chỉ làm 1 lần, chờ vài phút):

```powershell
corepack pnpm install
```

Rồi mở web lên:

```powershell
corepack pnpm dev --port 5173 --host 127.0.0.1
```

Khi thấy dòng chữ `ready in ...` và địa chỉ `http://127.0.0.1:5173/`,
bạn mở trình duyệt (Chrome/Edge), gõ địa chỉ đó vào là thấy trang web.
Muốn tắt web thì quay lại PowerShell bấm **Ctrl + C**.

Muốn đóng gói web thành bản hoàn chỉnh (để đưa lên mạng sau này):

```powershell
corepack pnpm build
```

File thành phẩm nằm trong thư mục `dist/`. Muốn xem thử bản đó:

```powershell
corepack pnpm preview
```

### 5. Cài thêm công cụ lấy tin học bổng (không bắt buộc)

Chỉ cần nếu bạn muốn tự lấy tin mới từ trang của trường.
Trong PowerShell, đang ở thư mục `UEH_WebHB`, gõ:

```powershell
python -m venv .venv
```

(Lệnh này tạo một "cái hộp riêng" tên `.venv` để đựng các món của Python,
không làm bẩn máy.)

```powershell
.\.venv\Scripts\Activate.ps1
```

(Nếu máy báo lỗi màu đỏ về execution policy, gõ lệnh này trước rồi thử lại:
`Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`)

```powershell
python -m pip install --upgrade pip
pip install -r requirements.txt
python tools\crawl_dsa.py
```

Lệnh cuối sẽ tự lấy tin và ghi vào `src\data\scholarships.json`
(có giữ lại bản cũ với đuôi `.bak` để đề phòng). Làm xong thì gõ `deactivate`
để thoát khỏi "cái hộp".

---

## B. Hướng dẫn cho máy Linux (Ubuntu)

### 1. Mở Terminal

Bấm **Ctrl + Alt + T**. Mọi lệnh bên dưới bạn copy, dán vào Terminal,
bấm **Enter**. Lệnh nào bắt đầu bằng `sudo` thì máy sẽ hỏi mật khẩu,
bạn cứ gõ mật khẩu đăng nhập rồi Enter (gõ không hiện chữ là bình thường).

### 2. Cài 3 phần mềm cần thiết

```bash
sudo apt update
sudo apt install -y git python3 python3-venv python3-pip curl
```

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

(Dòng đầu cài Git và Python. Hai dòng sau cài Node.js bản 20.)

Kiểm tra:

```bash
git --version
node --version
python3 --version
```

Cả 3 lệnh đều hiện chữ và số phiên bản là thành công.

### 3. Bật công cụ pnpm (chỉ làm 1 lần)

```bash
sudo corepack enable || true
corepack pnpm --version
```

Nếu dòng `sudo corepack enable` báo lỗi không có quyền ghi thì kệ nó,
miễn dòng thứ hai hiện ra số phiên bản là được. Từ đây, chỗ nào ghi `pnpm ...`
mà máy báo không hiểu thì gõ `corepack pnpm ...` thay thế.

### 4. Tải code về và mở web lên

```bash
cd ~
git clone https://github.com/Useful-Minus/Corporator-Schoolarship-VHD-.git UEH_WebHB
cd UEH_WebHB
```

```bash
corepack pnpm install
```

```bash
corepack pnpm dev --port 5173 --host 127.0.0.1
```

Khi thấy chữ `ready in ...`, bạn mở trình duyệt, gõ `http://127.0.0.1:5173/`
là thấy web. Muốn tắt thì quay lại Terminal bấm **Ctrl + C**.

Đóng gói bản hoàn chỉnh:

```bash
corepack pnpm build
```

File thành phẩm nằm trong thư mục `dist/`. Xem thử bản đó:

```bash
corepack pnpm preview
```

### 5. Cài thêm công cụ lấy tin học bổng (không bắt buộc)

```bash
cd ~/UEH_WebHB
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
python tools/crawl_dsa.py
deactivate
```

Giải thích nhanh: tạo "cái hộp riêng" `.venv`, bước vào hộp, cài 3 món trong
`requirements.txt`, chạy công cụ lấy tin (ghi vào `src/data/scholarships.json`,
bản cũ được giữ lại với đuôi `.bak`), rồi bước ra khỏi hộp.

---

## 4. Bảng tra lệnh

| Muốn làm gì | Gõ lệnh gì |
|---|---|
| Tải các món web cần (làm 1 lần) | `corepack pnpm install` |
| Mở web lên xem thử | `corepack pnpm dev --port 5173 --host 127.0.0.1` |
| Đóng gói bản hoàn chỉnh | `corepack pnpm build` |
| Xem thử bản đã đóng gói | `corepack pnpm preview` |
| Cài các món cho công cụ lấy tin | `pip install -r requirements.txt` |
| Chạy công cụ lấy tin | `python tools\crawl_dsa.py` (Windows) hoặc `python tools/crawl_dsa.py` (Linux) |

## 5. Các lỗi thường gặp

- **Gõ `npm install` mà báo lỗi dài dòng có chữ `edgesOut`:** đây là lỗi của npm,
  bạn đừng dùng npm nữa, dùng `corepack pnpm install` là được.
- **`corepack enable` báo không có quyền:** trên Windows thì mở PowerShell bằng
  **Run as Administrator** rồi gõ lại; trên Linux thì kệ nó, cứ gọi
  `corepack pnpm ...` trực tiếp.
- **Windows báo lỗi khi kích hoạt `.venv`:** gõ
  `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
  rồi làm lại.
- **Báo cổng 5173 đã có người dùng (port busy):** đổi số khác, ví dụ
  `corepack pnpm dev --port 5174`.
- **Web không hiện thông báo nhắc hạn nộp:** trình duyệt chỉ cho hiện thông báo
  khi mở bằng địa chỉ localhost và khi bạn đã bấm **Cho phép**. Không sao cả,
  web vẫn hiện chữ đỏ "Còn X ngày" ngay trên học bổng đó.
- **Tải từ GitHub về mà không thấy `_archive/`, `Ignore (Local_Only)/`,
  `Yeu_cau_KH.txt`:** bình thường nhé, đó là đồ riêng trên máy cũ, không đưa
  lên mạng.

"""
Crawler DSA UEH -> scholarships.json (theo Requirements/Real_Time_Update.md).

Chạy tay:  python3 tools/crawl_dsa.py
Kết quả:   src/data/scholarships.json (ghi đè có backup .bak)

Đợt này: crawl HTML + regex ngày/GPA/ĐRL.
Nâng cao (optional): gửi text qua Gemini/OpenAI để parse JSON theo schema.
"""
import json
import re
import urllib.request
from datetime import datetime
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
OUT = BASE / "src" / "data" / "scholarships.json"

CATEGORY_URLS = [
    "https://dsa.ueh.edu.vn/hoc-bong-khuyen-khich-hoc-tap",
    "https://dsa.ueh.edu.vn/hoc-bong-doanh-nghiep",
]

DATE_RE = re.compile(r"(\d{1,2})[/-](\d{1,2})[/-](\d{4})")
GPA_RE = re.compile(r"GPA[^0-9]*([0-9]\.[0-9])", re.IGNORECASE)
DRL_RE = re.compile(r"(?:rèn luyện|DRL)[^0-9]*([0-9]{2,3})", re.IGNORECASE)


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "UEH-Scholarship-Bot/1.0"})
    with urllib.request.urlopen(req, timeout=20) as res:
        return res.read().decode("utf-8", errors="ignore")


def parse_article(url: str, html: str) -> dict:
    text = re.sub(r"<[^>]+>", " ", html)
    text = re.sub(r"\s+", " ", text)
    dates = DATE_RE.findall(text)
    gpa = GPA_RE.search(text)
    drl = DRL_RE.search(text)

    def to_iso(d):
        try:
            return datetime(int(d[2]), int(d[1]), int(d[0])).strftime("%Y-%m-%d")
        except ValueError:
            return None

    iso_dates = [d for d in (to_iso(x) for x in dates) if d]
    return {
        "id": re.sub(r"[^a-z0-9]+", "-", url.lower()).strip("-")[-60:],
        "ten": url.rstrip("/").split("/")[-1].replace("-", " ").title(),
        "loai": "DN" if "doanh" in url else "KKHT",
        "doiTuong": {"khoa": [], "nganh": []},
        "gpaMin": float(gpa.group(1)) if gpa else 2.5,
        "drlMin": int(drl.group(1)) if drl else 60,
        "dieuKienKhac": ["Cần đối chiếu văn bản gốc (crawler tự động, độ chính xác tham khảo)"],
        "mucTien": "Xem thông báo gốc",
        "ngayMo": iso_dates[0] if len(iso_dates) > 0 else "2026-10-01",
        "ngayDong": iso_dates[1] if len(iso_dates) > 1 else "2026-11-30",
        "cachNop": f"Xem chi tiết tại {url}",
        "giayTo": ["Đơn xin học bổng", "Bảng điểm"],
        "moTa": text[:300],
        "nguon": {"url": url, "donVi": "dsa.ueh.edu.vn (crawler)"},
    }


def main():
    items = []
    for url in CATEGORY_URLS:
        try:
            html = fetch(url)
            # Lấy link bài viết trong cùng chuyên mục
            links = sorted(set(re.findall(r"https://dsa\.ueh\.edu\.vn/[a-z0-9\-/]+", html)))
            for link in links[:20]:
                try:
                    article = fetch(link)
                    items.append(parse_article(link, article))
                except Exception as e:  # noqa: BLE001 - crawl từng bài lỗi thì bỏ qua
                    print(f"skip {link}: {e}")
        except Exception as e:  # noqa: BLE001
            print(f"skip category {url}: {e}")

    if not items:
        print("Không cào được bài nào (có thể mất mạng/chặn bot). Giữ nguyên scholarships.json mẫu.")
        return

    if OUT.exists():
        OUT.with_suffix(".json.bak").write_text(OUT.read_text(encoding="utf-8"), encoding="utf-8")
    OUT.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Đã ghi {len(items)} học bổng vào {OUT}")


if __name__ == "__main__":
    main()

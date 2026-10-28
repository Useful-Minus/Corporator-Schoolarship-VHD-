export default function GuideSection() {
  const steps = [
    { t: 'Bước 1: Lọc học bổng', d: 'Nhập GPA, điểm rèn luyện, khóa, ngành ở ô đầu trang để xem mình hợp với học bổng nào.' },
    { t: 'Bước 2: Lưu vào Hồ sơ của tôi', d: 'Bấm “+ Hồ sơ của tôi” ở học bổng muốn nộp (nên chọn 1–2 học bổng chắc ăn nhất).' },
    { t: 'Bước 3: Chuẩn bị giấy tờ', d: 'Mở Hồ sơ của tôi, tick từng giấy tờ đã làm xong: đơn xin, bảng điểm, xác nhận hoàn cảnh, chứng chỉ...' },
    { t: 'Bước 4: Nộp trước hạn', d: 'Theo dõi số ngày còn lại, bật nhắc hạn để không bỏ lỡ. Nộp trước hạn ít nhất 2–3 ngày.' },
  ]
  return (
    <section className="rounded-2xl border bg-white p-5">
      <h2 className="text-lg font-bold">Hướng dẫn chuẩn bị giấy tờ</h2>
      <div className="mt-3 grid gap-3 md:grid-cols-4">
        {steps.map((s, i) => (
          <div key={i} className="rounded-xl bg-gray-50 p-3 text-sm">
            <p className="font-semibold">{s.t}</p>
            <p className="mt-1 text-gray-600">{s.d}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-gray-500">
        Giấy tờ thường gặp: đơn xin học bổng, bảng điểm, xác nhận điểm rèn luyện, giấy xác nhận hoàn cảnh,
        sổ hộ khẩu/CCCD photo, chứng chỉ ngoại khóa. Mỗi học bổng có danh sách riêng trong trang chi tiết.
      </p>
    </section>
  )
}

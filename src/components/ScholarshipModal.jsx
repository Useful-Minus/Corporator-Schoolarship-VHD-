import { STATUS_LABEL } from '../lib/scholarship.js'

export default function ScholarshipModal({ item, saved, onClose, onToggleSave }) {
  if (!item) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-bold">{item.ten}</h2>
          <button onClick={onClose} className="rounded-lg bg-gray-100 px-3 py-1 text-lg" aria-label="Đóng">
            ✕
          </button>
        </div>
        <p className="mt-1 text-sm text-gray-600">
          {STATUS_LABEL[item.trangThai]} · Hạn: <b>{item.ngayDong}</b> · {item.mucTien}
        </p>
        <p className="mt-3 text-sm">{item.moTa}</p>

        <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
          <div className="rounded-xl bg-gray-50 p-3">
            <b>Điều kiện</b>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>GPA ≥ {item.gpaMin}</li>
              <li>Điểm rèn luyện ≥ {item.drlMin}</li>
              {item.doiTuong?.khoa?.length > 0 && <li>Khóa: {item.doiTuong.khoa.join(', ')}</li>}
              {item.doiTuong?.nganh?.length > 0 && <li>Ngành: {item.doiTuong.nganh.join(', ')}</li>}
              {item.dieuKienKhac.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-gray-50 p-3">
            <b>Giấy tờ cần chuẩn bị</b>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              {item.giayTo.map((g, i) => (
                <li key={i}>{g}</li>
              ))}
            </ul>
            <p className="mt-2"><b>Cách nộp:</b> {item.cachNop}</p>
            <p className="mt-1 text-xs text-gray-500">Nguồn: {item.nguon?.donVi}</p>
          </div>
        </div>

        {!item.duDieuKien && (
          <div className="mt-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
            <b>Bạn chưa đủ điều kiện vì:</b>
            <ul className="list-disc pl-5">
              {item.lyDoThieu.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onToggleSave(item.id)}
            className={`flex-1 rounded-lg px-4 py-2.5 font-semibold ${
              saved ? 'bg-gray-200' : 'bg-emerald-800 text-white hover:bg-emerald-900'
            }`}
          >
            {saved ? 'Bỏ khỏi Hồ sơ của tôi' : 'Thêm vào Hồ sơ của tôi'}
          </button>
          <a
            href={item.nguon?.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border px-4 py-2.5 text-sm text-emerald-800"
          >
            Nguồn gốc ↗
          </a>
        </div>
      </div>
    </div>
  )
}

import { STATUS_LABEL } from '../lib/scholarship.js'

const badgeColor = {
  'dang-nhan': 'bg-green-100 text-green-800',
  'sap-mo': 'bg-yellow-100 text-yellow-800',
  'het-han': 'bg-gray-200 text-gray-600',
}

export default function ScholarshipCard({ item, saved, onDetail, onToggleSave }) {
  return (
    <article className="flex flex-col rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badgeColor[item.trangThai]}`}>
          {STATUS_LABEL[item.trangThai]}
        </span>
        <span className="text-xs text-gray-500">
          {item.loai === 'KKHT' ? 'Khuyến khích HT' : item.loai === 'HTHT' ? 'Hỗ trợ HT' : 'Doanh nghiệp'}
        </span>
      </div>
      <h3 className="mt-2 font-bold leading-snug">{item.ten}</h3>
      <div className="mt-2 space-y-1 text-sm text-gray-700">
        <p>🎓 GPA ≥ <b>{item.gpaMin}</b> · ĐRL ≥ <b>{item.drlMin}</b></p>
        <p>💰 {item.mucTien}</p>
        <p>
          📅 {item.ngayMo} → <b>{item.ngayDong}</b> ·{' '}
          <span className={item.daysLeft < 0 ? 'text-gray-500' : item.daysLeft <= 7 ? 'font-bold text-red-600' : ''}>
            {item.daysLeft < 0 ? 'Đã hết hạn' : item.daysLeft === 0 ? 'Hết hạn HÔM NAY' : `Còn ${item.daysLeft} ngày`}
          </span>
        </p>
      </div>
      {item.duDieuKien ? (
        <p className="mt-2 rounded-lg bg-green-50 px-2 py-1 text-xs text-green-700">
          ✅ Bạn đủ điều kiện nộp (tham khảo)
        </p>
      ) : (
        <p className="mt-2 rounded-lg bg-amber-50 px-2 py-1 text-xs text-amber-700">
          ⚠️ {item.lyDoThieu[0]}
          {item.lyDoThieu.length > 1 ? ` (+${item.lyDoThieu.length - 1} lý do)` : ''}
        </p>
      )}
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => onDetail(item)}
          className="flex-1 rounded-lg border border-emerald-800 px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
        >
          Xem chi tiết
        </button>
        <button
          onClick={() => onToggleSave(item.id)}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold ${
            saved ? 'bg-gray-200 text-gray-700' : 'bg-emerald-800 text-white hover:bg-emerald-900'
          }`}
        >
          {saved ? 'Đã lưu ✓' : '+ Hồ sơ của tôi'}
        </button>
      </div>
    </article>
  )
}

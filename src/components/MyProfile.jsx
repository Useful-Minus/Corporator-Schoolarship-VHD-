import { useState } from 'react'
import { requestNotificationPermission } from '../lib/reminder.js'

export default function MyProfile({ savedItems, onRemove, checklist, onToggleDoc, pendingList }) {
  const [notif, setNotif] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'unsupported',
  )

  const enableNotif = async () => {
    const p = await requestNotificationPermission()
    setNotif(p)
  }

  if (savedItems.length === 0 && pendingList.length === 0) {
    return (
      <section className="rounded-2xl border bg-white p-5">
        <h2 className="text-lg font-bold">Hồ sơ của tôi</h2>
        <p className="mt-1 text-sm text-gray-600">
          Bạn chưa lưu học bổng nào. Bấm “+ Hồ sơ của tôi” ở từng thẻ để theo dõi hạn nộp và checklist
          giấy tờ tại đây. Dữ liệu được lưu trên trình duyệt, tắt web mở lại vẫn còn.
        </p>
      </section>
    )
  }

  return (
    <section className="rounded-2xl border bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-bold">Hồ sơ của tôi ({savedItems.length})</h2>
        {notif !== 'granted' ? (
          <button
            onClick={enableNotif}
            className="rounded-lg bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-900 hover:bg-amber-200"
          >
            🔔 Bật nhắc hạn nộp
          </button>
        ) : (
          <span className="text-sm text-green-700">🔔 Đã bật nhắc hạn nộp</span>
        )}
      </div>

      <div className="mt-3 space-y-3">
        {savedItems.map((item) => {
          const done = item.giayTo.filter((_, i) => checklist[item.id]?.[i]).length
          return (
            <div key={item.id} className="rounded-xl border p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold">{item.ten}</p>
                  <p className="text-sm text-gray-600">
                    Hạn {item.ngayDong} ·{' '}
                    <span className={item.daysLeft <= 7 && item.daysLeft >= 0 ? 'font-bold text-red-600' : ''}>
                      {item.daysLeft < 0
                        ? 'Đã hết hạn'
                        : item.daysLeft === 0
                          ? 'Hết hạn HÔM NAY — nộp ngay!'
                          : `Còn ${item.daysLeft} ngày`}
                    </span>{' '}
                    · Giấy tờ {done}/{item.giayTo.length}
                  </p>
                  {item.daysLeft >= 0 && item.daysLeft <= 7 && (
                    <p className="mt-1 rounded bg-red-50 px-2 py-1 text-xs text-red-700">
                      ⏰ Sắp hết hạn! Chuẩn bị giấy tờ ngay để kịp nộp.
                    </p>
                  )}
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="rounded-lg bg-gray-100 px-2 py-1 text-sm hover:bg-gray-200"
                >
                  Bỏ lưu
                </button>
              </div>
              <div className="mt-2 space-y-1">
                {item.giayTo.map((doc, i) => (
                  <label key={i} className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={!!checklist[item.id]?.[i]}
                      onChange={() => onToggleDoc(item.id, i)}
                      className="h-4 w-4 accent-emerald-800"
                    />
                    <span className={checklist[item.id]?.[i] ? 'text-gray-400 line-through' : ''}>
                      {doc}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {pendingList.length > 0 && (
        <div className="mt-4 rounded-xl bg-yellow-50 p-3 text-sm">
          <b>Doanh nghiệp đã gửi, chờ Ban Chăm sóc người học duyệt ({pendingList.length}):</b>
          <ul className="mt-1 list-disc pl-5">
            {pendingList.map((p, i) => (
              <li key={i}>
                {p.ten} — {p.donVi} ({p.mucTien})
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

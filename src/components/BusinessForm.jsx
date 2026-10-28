import { useState } from 'react'

const EMPTY = { ten: '', donVi: '', mucTien: '', dieuKien: '', han: '', lienHe: '' }

export default function BusinessForm({ onSubmit }) {
  const [form, setForm] = useState(EMPTY)
  const [done, setDone] = useState(false)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const cls = 'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm'

  const submit = (e) => {
    e.preventDefault()
    if (!form.ten || !form.donVi) return
    onSubmit({ ...form, ngayGui: new Date().toISOString().slice(0, 10) })
    setForm(EMPTY)
    setDone(true)
    setTimeout(() => setDone(false), 4000)
  }

  return (
    <section className="rounded-2xl border bg-white p-5">
      <h2 className="text-lg font-bold">Cổng nhận thông tin học bổng từ doanh nghiệp</h2>
      <p className="mt-1 text-sm text-gray-600">
        Doanh nghiệp gửi thông tin tại đây. Dữ liệu <b>chưa hiện công khai ngay</b> mà chuyển về Ban Chăm sóc
        người học xem xét, duyệt trước khi đăng.
      </p>
      <form onSubmit={submit} className="mt-3 grid gap-3 md:grid-cols-2">
        <input className={cls} placeholder="Tên học bổng *" value={form.ten} onChange={set('ten')} required />
        <input className={cls} placeholder="Đơn vị tài trợ *" value={form.donVi} onChange={set('donVi')} required />
        <input className={cls} placeholder="Mức học bổng (VD: 20 triệu/suất)" value={form.mucTien} onChange={set('mucTien')} />
        <input className={cls} placeholder="Hạn nộp dự kiến (VD: 2026-12-31)" value={form.han} onChange={set('han')} />
        <input className={cls + ' md:col-span-2'} placeholder="Điều kiện (GPA, ĐRL, ngành...)" value={form.dieuKien} onChange={set('dieuKien')} />
        <input className={cls + ' md:col-span-2'} placeholder="Liên hệ (email / SĐT)" value={form.lienHe} onChange={set('lienHe')} />
        <button className="rounded-lg bg-emerald-800 px-4 py-2 font-semibold text-white hover:bg-emerald-900 md:col-span-2">
          Gửi để Ban Chăm sóc người học duyệt
        </button>
      </form>
      {done && (
        <p className="mt-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
          ✅ Đã gửi! Thông tin đang ở trạng thái chờ duyệt, xem trong “Hồ sơ của tôi”.
        </p>
      )}
    </section>
  )
}

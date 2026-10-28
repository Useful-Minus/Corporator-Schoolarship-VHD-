export default function FilterBar({ criteria, onChange, onReset, resultCount }) {
  const set = (k) => (e) => onChange({ ...criteria, [k]: e.target.value })
  const inputCls =
    'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700'

  return (
    <section className="rounded-2xl bg-emerald-900 p-5 text-white shadow">
      <h2 className="text-lg font-bold">Ô tìm học bổng hợp với mình</h2>
      <p className="mt-1 text-sm text-emerald-100">
        Nhập điểm và thông tin của bạn, web sẽ tự lọc ra học bổng đủ điều kiện.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
        <label className="block">
          <span className="text-xs">GPA (thang 4.0)</span>
          <input
            className={inputCls + ' text-gray-900'}
            type="number"
            step="0.1"
            min="0"
            max="4"
            placeholder="VD: 3.2"
            value={criteria.gpa}
            onChange={set('gpa')}
          />
        </label>
        <label className="block">
          <span className="text-xs">Điểm rèn luyện</span>
          <input
            className={inputCls + ' text-gray-900'}
            type="number"
            min="0"
            max="100"
            placeholder="VD: 80"
            value={criteria.drl}
            onChange={set('drl')}
          />
        </label>
        <label className="block">
          <span className="text-xs">Khóa</span>
          <select className={inputCls + ' text-gray-900'} value={criteria.khoa} onChange={set('khoa')}>
            <option value="">Tất cả khóa</option>
            <option value="K50">K50</option>
            <option value="K51">K51</option>
            <option value="K52">K52</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs">Ngành</span>
          <input
            className={inputCls + ' text-gray-900'}
            placeholder="VD: Marketing"
            value={criteria.nganh}
            onChange={set('nganh')}
          />
        </label>
        <label className="block">
          <span className="text-xs">Mong muốn</span>
          <select
            className={inputCls + ' text-gray-900'}
            value={criteria.nguyenVong}
            onChange={set('nguyenVong')}
          >
            <option value="all">Tất cả</option>
            <option value="ho-tro">Hỗ trợ tiền học</option>
            <option value="thanh-tich">Khen thưởng thành tích</option>
          </select>
        </label>
      </div>
      <div className="mt-3 flex items-center gap-3 text-sm">
        <button
          onClick={onReset}
          className="rounded-lg bg-white/15 px-3 py-1.5 hover:bg-white/25"
        >
          Xóa lọc
        </button>
        <span className="text-emerald-100">
          Tìm thấy <b>{resultCount}</b> học bổng
        </span>
      </div>
    </section>
  )
}

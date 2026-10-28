// Logic dùng chung: trạng thái, đếm ngược, lọc đa tiêu chí UEH.

export function getStatus(ngayMo, ngayDong, now = new Date()) {
  const start = new Date(ngayMo)
  const end = new Date(ngayDong)
  if (now < start) return 'sap-mo'
  if (now > end) return 'het-han'
  return 'dang-nhan'
}

export function daysLeft(ngayDong, now = new Date()) {
  const end = new Date(ngayDong)
  const diff = end - now
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export const STATUS_LABEL = {
  'dang-nhan': 'Đang nhận hồ sơ',
  'sap-mo': 'Sắp mở',
  'het-han': 'Đã hết hạn',
}

// criteria: { gpa, drl, khoa, nganh, nguyenVong: 'all' | 'ho-tro' | 'thanh-tich' }
export function evaluateScholarship(s, criteria) {
  const lyDoThieu = []
  const gpa = Number(criteria.gpa)
  const drl = Number(criteria.drl)

  if (criteria.gpa !== '' && !Number.isNaN(gpa) && gpa < s.gpaMin) {
    lyDoThieu.push(`GPA ${gpa} thấp hơn yêu cầu tối thiểu ${s.gpaMin}`)
  }
  if (criteria.drl !== '' && !Number.isNaN(drl) && drl < s.drlMin) {
    lyDoThieu.push(`Điểm rèn luyện ${drl} thấp hơn yêu cầu tối thiểu ${s.drlMin}`)
  }
  if (
    criteria.khoa &&
    Array.isArray(s.doiTuong?.khoa) &&
    s.doiTuong.khoa.length > 0 &&
    !s.doiTuong.khoa.includes(criteria.khoa)
  ) {
    lyDoThieu.push(`Chỉ dành cho khóa: ${s.doiTuong.khoa.join(', ')}`)
  }
  if (
    criteria.nganh &&
    Array.isArray(s.doiTuong?.nganh) &&
    s.doiTuong.nganh.length > 0 &&
    !s.doiTuong.nganh.some((n) =>
      n.toLowerCase().includes(criteria.nganh.toLowerCase()),
    )
  ) {
    lyDoThieu.push(`Ưu tiên ngành: ${s.doiTuong.nganh.join(', ')}`)
  }
  if (criteria.nguyenVong === 'ho-tro' && s.loai === 'KKHT') {
    lyDoThieu.push('Bạn chọn nguyện vọng hỗ trợ tài chính, học bổng này thuộc nhóm khen thưởng thành tích')
  }
  if (criteria.nguyenVong === 'thanh-tich' && s.loai === 'HTHT') {
    lyDoThieu.push('Bạn chọn nguyện vọng khen thưởng thành tích, học bổng này thuộc nhóm hỗ trợ tài chính')
  }

  const now = new Date()
  const trangThai = getStatus(s.ngayMo, s.ngayDong, now)
  if (trangThai === 'het-han') lyDoThieu.push('Đã hết hạn nộp hồ sơ')

  return {
    ...s,
    trangThai,
    daysLeft: daysLeft(s.ngayDong, now),
    duDieuKien: lyDoThieu.length === 0,
    lyDoThieu,
  }
}

export function filterScholarships(list, criteria) {
  const evaluated = list.map((s) => evaluateScholarship(s, criteria))
  const hasCriteria =
    criteria.gpa !== '' || criteria.drl !== '' || criteria.khoa || criteria.nganh
  if (!hasCriteria && (!criteria.nguyenVong || criteria.nguyenVong === 'all')) {
    // Chưa nhập gì: hiện tất cả, đang nhận trước
    return evaluated.sort((a, b) => {
      const order = { 'dang-nhan': 0, 'sap-mo': 1, 'het-han': 2 }
      return order[a.trangThai] - order[b.trangThai]
    })
  }
  // Đủ điều kiện lên trước, sau đó tới sắp hết hạn
  return evaluated.sort((a, b) => {
    if (a.duDieuKien !== b.duDieuKien) return a.duDieuKien ? -1 : 1
    const order = { 'dang-nhan': 0, 'sap-mo': 1, 'het-han': 2 }
    if (order[a.trangThai] !== order[b.trangThai]) {
      return order[a.trangThai] - order[b.trangThai]
    }
    return a.daysLeft - b.daysLeft
  })
}

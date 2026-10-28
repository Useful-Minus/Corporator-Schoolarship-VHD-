// Nhắc hạn nộp bằng Web Notification API + badge in-app.
export async function requestNotificationPermission() {
  if (!('Notification' in window)) return 'unsupported'
  if (Notification.permission === 'granted') return 'granted'
  try {
    return await Notification.requestPermission()
  } catch {
    return Notification.permission
  }
}

export function notifyDeadline(item) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return
  const text =
    item.daysLeft < 0
      ? `${item.ten} đã hết hạn.`
      : item.daysLeft === 0
        ? `${item.ten} hết hạn HÔM NAY!`
        : `${item.ten} còn ${item.daysLeft} ngày nữa hết hạn (${item.ngayDong}).`
  try {
    new Notification('Nhắc hạn học bổng UEH', { body: text })
  } catch {
    // một số trình duyệt chặn khi không phải HTTPS: bỏ qua, vẫn hiện badge in-app
  }
}

// Gọi mỗi khi mở web: nhắc các học bổng đã lưu còn <= 7 ngày
export function checkUpcomingDeadlines(savedItems) {
  savedItems.forEach((item) => {
    if (item.daysLeft >= 0 && item.daysLeft <= 7) notifyDeadline(item)
  })
}

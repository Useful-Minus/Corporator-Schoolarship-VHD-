import { useEffect, useMemo, useRef, useState } from 'react'
import scholarships from './data/scholarships.json'
import { filterScholarships } from './lib/scholarship.js'
import { checkUpcomingDeadlines } from './lib/reminder.js'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import FilterBar from './components/FilterBar.jsx'
import ScholarshipCard from './components/ScholarshipCard.jsx'
import ScholarshipModal from './components/ScholarshipModal.jsx'
import MyProfile from './components/MyProfile.jsx'
import GuideSection from './components/GuideSection.jsx'
import BusinessForm from './components/BusinessForm.jsx'

const EMPTY_CRITERIA = { gpa: '', drl: '', khoa: '', nganh: '', nguyenVong: 'all' }

export default function App() {
  const [criteria, setCriteria] = useState(EMPTY_CRITERIA)
  const [selectedId, setSelectedId] = useState(null)
  const [savedIds, setSavedIds] = useLocalStorage('ueh_saved_scholarships', [])
  const [checklist, setChecklist] = useLocalStorage('ueh_checklist', {})
  const [pendingList, setPendingList] = useLocalStorage('ueh_pending_dn', [])
  const reminded = useRef(false)

  const results = useMemo(() => filterScholarships(scholarships, criteria), [criteria])
  const savedItems = useMemo(
    () => savedIds.map((id) => results.find((r) => r.id === id)).filter(Boolean),
    [savedIds, results],
  )
  const selected = selectedId ? results.find((r) => r.id === selectedId) : null

  useEffect(() => {
    if (!reminded.current && savedItems.length > 0) {
      reminded.current = true
      checkUpcomingDeadlines(savedItems)
    }
  }, [savedItems])

  const toggleSave = (id) =>
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const toggleDoc = (schId, idx) =>
    setChecklist((prev) => ({
      ...prev,
      [schId]: { ...(prev[schId] || {}), [idx]: !prev[schId]?.[idx] },
    }))

  const eligibleCount = results.filter((r) => r.duDieuKien).length

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-emerald-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <p className="text-sm text-emerald-200">Đại học Kinh tế TP.HCM (UEH)</p>
          <h1 className="mt-1 text-2xl font-bold md:text-3xl">Website Học bổng sinh viên UEH</h1>
          <p className="mt-1 text-sm text-emerald-100">
            Gom mọi học bổng về một chỗ — lọc theo GPA/ĐRL, theo dõi hạn nộp, checklist giấy tờ.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-5 px-4 py-6">
        <FilterBar
          criteria={criteria}
          onChange={setCriteria}
          onReset={() => setCriteria(EMPTY_CRITERIA)}
          resultCount={results.length}
        />

        {eligibleCount > 0 && (criteria.gpa !== '' || criteria.drl !== '') && (
          <p className="rounded-xl bg-green-50 px-4 py-2 text-sm text-green-800">
            🎉 Bạn đủ điều kiện (tham khảo) với <b>{eligibleCount}</b> học bổng bên dưới.
          </p>
        )}

        <section>
          <h2 className="mb-3 text-lg font-bold">
            Danh sách học bổng — trường & doanh nghiệp ({results.length})
          </h2>
          {results.length === 0 ? (
            <p className="rounded-xl bg-white p-5 text-sm text-gray-600">
              Không tìm thấy học bổng nào. Thử nới điều kiện lọc.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {results.map((item) => (
                <ScholarshipCard
                  key={item.id}
                  item={item}
                  saved={savedIds.includes(item.id)}
                  onDetail={(it) => setSelectedId(it.id)}
                  onToggleSave={toggleSave}
                />
              ))}
            </div>
          )}
        </section>

        <MyProfile
          savedItems={savedItems}
          onRemove={toggleSave}
          checklist={checklist}
          onToggleDoc={toggleDoc}
          pendingList={pendingList}
        />

        <GuideSection />

        <BusinessForm onSubmit={(entry) => setPendingList((p) => [...p, entry])} />

        <footer className="rounded-2xl bg-white p-4 text-xs text-gray-500">
          Kết quả lọc và gợi ý chỉ mang tính tham khảo để lựa chọn nhanh hơn; quyết định cuối cùng thuộc về
          đơn vị xét duyệt học bổng. Thông tin cập nhật theo thời gian — học bổng hết hạn sẽ tự chuyển trạng
          thái. Nguồn chính thống: dsa.ueh.edu.vn.
        </footer>
      </main>

      <ScholarshipModal
        item={selected}
        saved={selected ? savedIds.includes(selected.id) : false}
        onClose={() => setSelectedId(null)}
        onToggleSave={toggleSave}
      />
    </div>
  )
}

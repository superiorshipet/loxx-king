import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, ExternalLink } from 'lucide-react'
import { AdminLayout } from '../../components/layout/AdminLayout'
import { useApp } from '../../context/AppContext'
import { editLogs } from '../../lib/mockData'

export default function EditLogsPage() {
  const { lang } = useApp()
  const [search, setSearch] = useState('')
  const [filterUser, setFilterUser] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const editors = [...new Set(editLogs.map(l => l.editedBy))]

  const filtered = useMemo(() => {
    let list = editLogs
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(l => l.orderNumber.toLowerCase().includes(q) || l.field.toLowerCase().includes(q))
    }
    if (filterUser) list = list.filter(l => l.editedBy === filterUser)
    if (dateFrom) list = list.filter(l => new Date(l.timestamp) >= new Date(dateFrom))
    if (dateTo) list = list.filter(l => new Date(l.timestamp) <= new Date(dateTo + 'T23:59:59'))
    return list
  }, [search, filterUser, dateFrom, dateTo])

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-5">
        <h1 className="font-display font-bold text-2xl">{lang === 'ar' ? 'سجل التعديلات' : 'Edit Logs'}</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-52">
            <Search size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={lang === 'ar' ? 'ابحث بالطلب أو الحقل...' : 'Search by order or field...'}
              className="w-full h-9 ps-9 pe-4 rounded-xl bg-card border border-border text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <select
            value={filterUser}
            onChange={e => setFilterUser(e.target.value)}
            className="h-9 px-3 rounded-xl bg-card border border-border text-sm outline-none"
          >
            <option value="">{lang === 'ar' ? 'كل المستخدمين' : 'All Editors'}</option>
            {editors.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
          <input
            type="date"
            value={dateFrom}
            onChange={e => setDateFrom(e.target.value)}
            className="h-9 px-3 rounded-xl bg-card border border-border text-sm outline-none"
          />
          <input
            type="date"
            value={dateTo}
            onChange={e => setDateTo(e.target.value)}
            className="h-9 px-3 rounded-xl bg-card border border-border text-sm outline-none"
          />
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-5 py-3 text-start font-semibold text-muted-foreground">{lang === 'ar' ? 'رقم الطلب' : 'Order #'}</th>
                  <th className="px-4 py-3 text-start font-semibold text-muted-foreground">{lang === 'ar' ? 'الحقل' : 'Field Changed'}</th>
                  <th className="px-4 py-3 text-start font-semibold text-muted-foreground">{lang === 'ar' ? 'القيمة القديمة' : 'Old Value'}</th>
                  <th className="px-4 py-3 text-start font-semibold text-muted-foreground">{lang === 'ar' ? 'القيمة الجديدة' : 'New Value'}</th>
                  <th className="px-4 py-3 text-start font-semibold text-muted-foreground">{lang === 'ar' ? 'المعدّل' : 'Edited By'}</th>
                  <th className="px-4 py-3 text-start font-semibold text-muted-foreground">{lang === 'ar' ? 'التوقيت' : 'Timestamp'}</th>
                  <th className="w-10" />
                </tr>
              </thead>
              <tbody>
                {filtered.map(log => (
                  <tr key={log.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 font-mono font-semibold text-brand">{log.orderNumber}</td>
                    <td className="px-4 py-3 font-medium">{log.field}</td>
                    <td className="px-4 py-3 text-muted-foreground line-through">{log.oldValue}</td>
                    <td className="px-4 py-3 font-medium text-green-600 dark:text-green-400">{log.newValue}</td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{log.editedBy}</p>
                        <p className="text-xs text-muted-foreground capitalize">{log.editorRole}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {new Date(log.timestamp).toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US')}
                    </td>
                    <td className="px-4 py-3">
                      <Link to={`/admin/orders/${log.orderId}`} className="text-muted-foreground hover:text-brand transition-colors tap-highlight">
                        <ExternalLink size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>{lang === 'ar' ? 'لا توجد سجلات' : 'No logs found'}</p>
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground">{filtered.length} {lang === 'ar' ? 'سجل' : 'records'}</p>
      </div>
    </AdminLayout>
  )
}

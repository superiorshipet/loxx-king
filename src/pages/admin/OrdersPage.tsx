import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, ChevronRight, Filter } from 'lucide-react'
import { AdminLayout } from '../../components/layout/AdminLayout'
import { OrderStatusBadge } from '../../components/ui/Badge'
import { useApp } from '../../context/AppContext'
import { orders as allOrders } from '../../lib/mockData'
import { t } from '../../lib/translations'

const statuses = ['all', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled']

export default function OrdersPage() {
  const { lang, dir } = useApp()
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selected, setSelected] = useState<string[]>([])

  const filtered = useMemo(() => {
    let list = allOrders
    if (filterStatus !== 'all') list = list.filter(o => o.status === filterStatus)
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(o =>
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerPhone.includes(q)
      )
    }
    return list
  }, [search, filterStatus])

  function toggleSelect(id: string) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="font-display font-bold text-2xl">{lang === 'ar' ? 'الطلبات' : 'Orders'}</h1>
          {selected.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{selected.length} {lang === 'ar' ? 'محدد' : 'selected'}</span>
              <select className="h-9 px-3 rounded-xl bg-muted border border-border text-sm outline-none">
                <option>{lang === 'ar' ? 'إجراء جماعي' : 'Bulk Action'}</option>
                <option>{lang === 'ar' ? 'تأكيد' : 'Confirm'}</option>
                <option>{lang === 'ar' ? 'إلغاء' : 'Cancel'}</option>
              </select>
            </div>
          )}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-52">
            <Search size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={lang === 'ar' ? 'ابحث بالرقم أو الاسم...' : 'Search by number or name...'}
              className="w-full h-9 ps-9 pe-4 rounded-xl bg-card border border-border text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-muted-foreground" />
            <div className="flex gap-1 overflow-x-auto no-scrollbar">
              {statuses.map(s => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`shrink-0 h-9 px-3 rounded-xl text-xs font-medium transition-all tap-highlight ${filterStatus === s ? 'bg-brand text-[#0E0E11]' : 'bg-card border border-border text-muted-foreground hover:border-brand'}`}
                >
                  {s === 'all' ? (lang === 'ar' ? 'الكل' : 'All') : s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-4 py-3 w-10">
                    <input
                      type="checkbox"
                      className="accent-brand"
                      onChange={e => setSelected(e.target.checked ? filtered.map(o => o.id) : [])}
                      checked={selected.length === filtered.length && filtered.length > 0}
                    />
                  </th>
                  <th className="px-4 py-3 text-start font-semibold text-muted-foreground">{lang === 'ar' ? 'رقم الطلب' : 'Order #'}</th>
                  <th className="px-4 py-3 text-start font-semibold text-muted-foreground">{lang === 'ar' ? 'العميل' : 'Customer'}</th>
                  <th className="px-4 py-3 text-start font-semibold text-muted-foreground hidden sm:table-cell">{lang === 'ar' ? 'الدولة' : 'Country'}</th>
                  <th className="px-4 py-3 text-start font-semibold text-muted-foreground">{lang === 'ar' ? 'المبلغ' : 'Total'}</th>
                  <th className="px-4 py-3 text-start font-semibold text-muted-foreground">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                  <th className="px-4 py-3 text-start font-semibold text-muted-foreground hidden md:table-cell">{lang === 'ar' ? 'الدفع' : 'Payment'}</th>
                  <th className="px-4 py-3 text-start font-semibold text-muted-foreground">{lang === 'ar' ? 'التاريخ' : 'Date'}</th>
                  <th className="w-10" />
                </tr>
              </thead>
              <tbody>
                {filtered.map(order => (
                  <tr key={order.id} className={`border-b border-border last:border-0 hover:bg-muted/30 transition-colors ${selected.includes(order.id) ? 'bg-secondary' : ''}`}>
                    <td className="px-4 py-3">
                      <input type="checkbox" className="accent-brand" checked={selected.includes(order.id)} onChange={() => toggleSelect(order.id)} />
                    </td>
                    <td className="px-4 py-3">
                      <Link to={`/admin/orders/${order.id}`} className="font-mono font-semibold text-brand hover:underline">
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground">{order.customerPhone}</p>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">{order.country}</td>
                    <td className="px-4 py-3 font-bold">${order.total.toFixed(2)}</td>
                    <td className="px-4 py-3"><OrderStatusBadge status={order.status} lang={lang} /></td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={`text-xs font-medium ${order.paymentStatus === 'paid' ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                        {order.paymentStatus === 'paid' ? (lang === 'ar' ? 'مدفوع' : 'Paid') : (lang === 'ar' ? 'معلق' : 'Pending')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {new Date(order.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}
                    </td>
                    <td className="px-4 py-3">
                      <Link to={`/admin/orders/${order.id}`} className="text-muted-foreground hover:text-brand transition-colors tap-highlight">
                        <ChevronRight size={16} className={dir === 'rtl' ? 'rotate-180' : ''} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>{lang === 'ar' ? 'لا توجد طلبات' : 'No orders found'}</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

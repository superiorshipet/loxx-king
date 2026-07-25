import { Download, Search } from 'lucide-react'
import { useState } from 'react'
import { AdminLayout } from '../../components/layout/AdminLayout'
import { useApp } from '../../context/AppContext'
import { orders } from '../../lib/mockData'

export default function InvoicesPage() {
  const { lang, showToast } = useApp()
  const [search, setSearch] = useState('')

  const filtered = orders.filter(o =>
    o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
    o.customerName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-5">
        <h1 className="font-display font-bold text-2xl">{lang === 'ar' ? 'الفواتير' : 'Invoices'}</h1>

        <div className="relative">
          <Search size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={lang === 'ar' ? 'ابحث بالطلب أو الاسم...' : 'Search by order or customer...'}
            className="w-full h-10 ps-9 pe-4 rounded-xl bg-card border border-border text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-5 py-3 text-start font-semibold text-muted-foreground">{lang === 'ar' ? 'رقم الفاتورة' : 'Invoice #'}</th>
                  <th className="px-4 py-3 text-start font-semibold text-muted-foreground">{lang === 'ar' ? 'العميل' : 'Customer'}</th>
                  <th className="px-4 py-3 text-start font-semibold text-muted-foreground">{lang === 'ar' ? 'التاريخ' : 'Date'}</th>
                  <th className="px-4 py-3 text-start font-semibold text-muted-foreground">{lang === 'ar' ? 'المبلغ' : 'Amount'}</th>
                  <th className="px-4 py-3 text-start font-semibold text-muted-foreground">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                  <th className="w-12" />
                </tr>
              </thead>
              <tbody>
                {filtered.map(order => (
                  <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 font-mono font-semibold text-brand">INV-{order.orderNumber.split('-')[2]}</td>
                    <td className="px-4 py-3">{order.customerName}</td>
                    <td className="px-4 py-3 text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3 font-bold">${order.total.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium ${order.paymentStatus === 'paid' ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                        {order.paymentStatus === 'paid' ? (lang === 'ar' ? 'مدفوع' : 'Paid') : (lang === 'ar' ? 'معلق' : 'Pending')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => showToast(lang === 'ar' ? 'جار التحميل...' : 'Downloading...', 'info')}
                        className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center tap-highlight text-muted-foreground hover:text-brand transition-colors"
                      >
                        <Download size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

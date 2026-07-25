import { ShoppingBag, Package, Tag, Users, TrendingUp, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AdminLayout } from '../../components/layout/AdminLayout'
import { OrderStatusBadge } from '../../components/ui/Badge'
import { useApp } from '../../context/AppContext'
import { orders, products, categories } from '../../lib/mockData'

const stats = [
  { icon: ShoppingBag, labelEn: "Today's Orders", labelAr: 'طلبات اليوم', value: 3, trend: '+12%', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' },
  { icon: Package, labelEn: 'Total Products', labelAr: 'المنتجات', value: products.length, trend: '+2', color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' },
  { icon: Tag, labelEn: 'Categories', labelAr: 'الفئات', value: categories.length, trend: '—', color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' },
  { icon: Users, labelEn: "Today's Visitors", labelAr: 'زوار اليوم', value: 247, trend: '+18%', color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' },
]

export default function DashboardPage() {
  const { lang } = useApp()
  const recentOrders = orders.slice(0, 5)

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="font-display font-bold text-2xl">{lang === 'ar' ? 'لوحة التحكم' : 'Dashboard'}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {lang === 'ar' ? 'مرحباً بك! إليك ملخص أداء اليوم.' : "Welcome back! Here's today's performance summary."}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(s => (
            <div key={s.labelEn} className="bg-card border border-border rounded-2xl p-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                <s.icon size={20} />
              </div>
              <p className="font-display font-black text-3xl">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{lang === 'ar' ? s.labelAr : s.labelEn}</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                <TrendingUp size={11} /> {s.trend}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-display font-bold text-base">{lang === 'ar' ? 'الطلبات الأخيرة' : 'Recent Orders'}</h2>
            <Link to="/admin/orders" className="text-sm text-brand font-medium flex items-center gap-1 hover:underline tap-highlight">
              {lang === 'ar' ? 'عرض الكل' : 'View all'} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-5 py-3 text-start font-semibold text-muted-foreground">{lang === 'ar' ? 'رقم الطلب' : 'Order #'}</th>
                  <th className="px-4 py-3 text-start font-semibold text-muted-foreground">{lang === 'ar' ? 'العميل' : 'Customer'}</th>
                  <th className="px-4 py-3 text-start font-semibold text-muted-foreground">{lang === 'ar' ? 'المبلغ' : 'Total'}</th>
                  <th className="px-4 py-3 text-start font-semibold text-muted-foreground">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                  <th className="px-4 py-3 text-start font-semibold text-muted-foreground">{lang === 'ar' ? 'التاريخ' : 'Date'}</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3">
                      <Link to={`/admin/orders/${order.id}`} className="font-mono font-semibold text-brand hover:underline">
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="px-4 py-3">{order.customerName}</td>
                    <td className="px-4 py-3 font-bold">${order.total.toFixed(2)}</td>
                    <td className="px-4 py-3"><OrderStatusBadge status={order.status} lang={lang} /></td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { to: '/admin/products/add', en: 'Add Product', ar: 'إضافة منتج', color: 'bg-brand text-[#0E0E11]' },
            { to: '/admin/orders', en: 'Manage Orders', ar: 'إدارة الطلبات', color: 'bg-card border border-border' },
            { to: '/admin/offers', en: 'Create Offer', ar: 'إنشاء عرض', color: 'bg-card border border-border' },
          ].map(link => (
            <Link key={link.to} to={link.to} className={`${link.color} rounded-2xl p-4 font-semibold text-sm hover:opacity-80 transition-opacity tap-highlight`}>
              {lang === 'ar' ? link.ar : link.en}
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}

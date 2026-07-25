import { Link, useLocation } from 'react-router-dom'
import { 
  Search, ChevronDown, MessageCircle, FileText, 
  MapPin, Store, Truck, Calendar, Users, Package, 
  LayoutDashboard, ShoppingBag, Tags, Gift, Star, MessageSquare, Bell, ClipboardList 
} from 'lucide-react'
import { AdminLayout } from '../../components/layout/AdminLayout'
import { useApp } from '../../context/AppContext'

const crmOrders = [
  { id: '69943', customer: 'MR AHMD', phone: '07654657689', date: '2026-07-25', countryEn: 'Iraq', countryAr: 'العراق', cityEn: 'Mosul', cityAr: 'الموصل', source: 'فيسبوك', store: 'Lotus Blue', shipping: 'شركة صندوق التوصيل', statusEn: 'New Order', statusAr: 'طلب جديد', amount: '100,000 IQD', chat: 'meta' },
  { id: '69942', customer: 'Nadeen elebyary', phone: '05386466663', date: '2026-07-25', countryEn: 'Turkey', countryAr: 'تركيا', cityEn: 'Istanbul', cityAr: 'اسطنبول', source: 'فيسبوك', store: 'Lavva الالمانية', shipping: 'surat', statusEn: 'Delivering', statusAr: 'قيد التسليم', amount: '800,000 TRY', chat: 'meta' },
  { id: '69941', customer: 'Ahmed', phone: '07543216785', date: '2026-07-24', countryEn: 'Iraq', countryAr: 'العراق', cityEn: 'Baghdad', cityAr: 'بغداد', source: 'فيسبوك', store: 'Lotus Blue', shipping: 'شركة صندوق التوصيل', statusEn: 'New Order', statusAr: 'طلب جديد', amount: '50,000 IQD', chat: 'meta' },
  { id: '69940', customer: 'Yjityrrfj', phone: '0555555555', date: '2026-07-23', countryEn: 'UAE', countryAr: 'الإمارات', cityEn: 'Abu Dhabi', cityAr: 'أبو ظبي', source: 'واتساب', store: 'Lotus Blue', shipping: 'شركة المها للتوصيل', statusEn: 'New Order', statusAr: 'طلب جديد', amount: '500 AED', chat: 'whatsapp' },
  { id: '69939', customer: 'asd asd', phone: '07654328999', date: '2026-07-22', countryEn: 'Iraq', countryAr: 'العراق', cityEn: 'Baghdad', cityAr: 'بغداد', source: 'فيسبوك', store: 'MOON LIGHT', shipping: 'شركة صندوق التوصيل', statusEn: 'New Order', statusAr: 'طلب جديد', amount: '90,000 IQD', chat: 'meta' },
]

export default function DashboardPage() {
  const { lang, isAdmin } = useApp()
  const location = useLocation()

  const siteNavTabs = [
    { path: '/admin/orders', nameEn: 'Orders', nameAr: 'الطلبات', icon: ShoppingBag },
    { path: '/admin/products', nameEn: 'Products', nameAr: 'المنتجات', icon: Package },
    { path: '/admin/categories', nameEn: 'Categories', nameAr: 'الفئات', icon: Tags },
    { path: '/admin/offers', nameEn: 'Offers', nameAr: 'العروض', icon: Gift },
    { path: '/admin/reviews', nameEn: 'Reviews', nameAr: 'التقييمات', icon: Star },
    { path: '/admin/chat', nameEn: 'Support Chat', nameAr: 'دردشة الدعم', icon: MessageSquare },
    { path: '/admin/invoices', nameEn: 'Invoices', nameAr: 'الفواتير', icon: FileText },
    { path: '/admin/notifications', nameEn: 'Notifications', nameAr: 'الإشعارات', icon: Bell },
    ...(isAdmin ? [{ path: '/admin/logs', nameEn: 'Edit Logs', nameAr: 'سجل التعديلات', icon: ClipboardList }] : []),
  ]

  const filters = [
    { labelEn: 'Filter by Store', labelAr: 'تصفية حسب المتجر', icon: Store },
    { labelEn: 'Filter by Order', labelAr: 'فلترة حسب الطلب', icon: Search },
    { labelEn: 'Filter by Courier', labelAr: 'تصفية حسب شركة التوصيل', icon: Truck },
    { labelEn: 'Filter by City', labelAr: 'تصفية حسب المدينة', icon: MapPin },
    { labelEn: 'Filter by Page', labelAr: 'فلترة حسب الصفحة', icon: FileText },
    { labelEn: 'Filter by Product', labelAr: 'فلترة حسب المنتج', icon: Package },
    { labelEn: 'Filter by Gender', labelAr: 'فلترة حسب الجنس', icon: Users },
    { labelEn: 'Last 10 Operations', labelAr: 'آخر 10 عمليات', icon: Calendar },
  ]

  return (
    <AdminLayout>
      <div className="w-full space-y-3 pb-8">
        
        {/* منطقة الدمج مصغرة ومضغوطة قليلاً */}
        <div className="bg-card p-4 rounded-xl border-2 border-brand/70 shadow-sm space-y-3">
          
          {/* 1. صف روابط السلايدر (أصغر وأكثر تناسقاً) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-10 gap-2">
            {siteNavTabs.map((tab) => {
              const isActive = location.pathname === tab.path
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`flex items-center justify-between px-2.5 py-2 rounded-lg border border-brand text-brand hover:bg-brand hover:text-[#0E0E11] transition-all text-[11px] font-semibold tap-highlight group whitespace-nowrap shadow-sm ${
                    isActive ? 'bg-brand text-[#0E0E11] shadow' : 'bg-brand/10'
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <tab.icon size={13} className="opacity-90 group-hover:opacity-100 flex-shrink-0" />
                    <span className="truncate">{lang === 'ar' ? tab.nameAr : tab.nameEn}</span>
                  </div>
                </Link>
              )
            })}
          </div>

          <hr className="border-brand/30 my-2" />

          {/* 2. صف فلاتر الـ CRM (أصغر وأكثر تناسقاً) */}
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-2">
            {filters.map((filter, idx) => (
              <button
                key={idx}
                className="flex items-center justify-between px-2.5 py-2 rounded-lg border border-brand bg-brand/10 text-brand hover:bg-brand hover:text-[#0E0E11] transition-all text-[11px] font-semibold tap-highlight group whitespace-nowrap shadow-sm"
              >
                <div className="flex items-center gap-1.5">
                  <filter.icon size={13} className="opacity-90 group-hover:opacity-100" />
                  <span className="truncate max-w-[85px] sm:max-w-none">{lang === 'ar' ? filter.labelAr : filter.labelEn}</span>
                </div>
                <ChevronDown size={12} className="opacity-80 group-hover:opacity-100" />
              </button>
            ))}
          </div>

        </div>

        {/* CRM Data Table (بحجم أصغر ومضغوط) */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-[11px] sm:text-xs text-start whitespace-nowrap">
              <thead className="bg-muted/50 text-muted-foreground uppercase">
                <tr>
                  <th className="px-3 py-2.5 font-bold text-start">{lang === 'ar' ? 'رقم الطلب' : 'Order #'}</th>
                  <th className="px-3 py-2.5 font-bold text-start">{lang === 'ar' ? 'العميل' : 'Customer'}</th>
                  <th className="px-3 py-2.5 font-bold text-start">{lang === 'ar' ? 'رقم الهاتف' : 'Phone'}</th>
                  <th className="px-3 py-2.5 font-bold text-start">{lang === 'ar' ? 'التاريخ' : 'Date'}</th>
                  <th className="px-3 py-2.5 font-bold text-start">{lang === 'ar' ? 'الدولة' : 'Country'}</th>
                  <th className="px-3 py-2.5 font-bold text-start">{lang === 'ar' ? 'المدينة' : 'City'}</th>
                  <th className="px-3 py-2.5 font-bold text-start">{lang === 'ar' ? 'المتجر' : 'Store'}</th>
                  <th className="px-3 py-2.5 font-bold text-start">{lang === 'ar' ? 'شركة التوصيل' : 'Courier'}</th>
                  <th className="px-3 py-2.5 font-bold text-center">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                  <th className="px-3 py-2.5 font-bold text-start">{lang === 'ar' ? 'المبلغ' : 'Amount'}</th>
                  <th className="px-3 py-2.5 font-bold text-center">{lang === 'ar' ? 'مراسلة' : 'Chat'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {crmOrders.map((order, idx) => (
                  <tr key={idx} className="hover:bg-muted/30 transition-colors">
                    <td className="px-3 py-2 font-mono text-muted-foreground font-semibold">{order.id}</td>
                    <td className="px-3 py-2 font-bold">{order.customer}</td>
                    <td className="px-3 py-2 font-mono text-brand font-bold" dir="ltr">{order.phone}</td>
                    <td className="px-3 py-2 text-muted-foreground">{order.date}</td>
                    <td className="px-3 py-2">{lang === 'ar' ? order.countryAr : order.countryEn}</td>
                    <td className="px-3 py-2">{lang === 'ar' ? order.cityAr : order.cityEn}</td>
                    <td className="px-3 py-2 text-muted-foreground">{order.store}</td>
                    <td className="px-3 py-2 text-muted-foreground">{order.shipping}</td>
                    <td className="px-3 py-2 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        order.statusEn === 'Delivering' 
                          ? 'bg-red-500/10 text-red-500' 
                          : 'bg-brand/10 text-brand'
                      }`}>
                        {lang === 'ar' ? order.statusAr : order.statusEn}
                      </span>
                    </td>
                    <td className="px-3 py-2 font-bold text-amber-500" dir="ltr">{order.amount}</td>
                    <td className="px-3 py-2 text-center">
                      {order.chat === 'meta' ? (
                        <button className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                          <MessageCircle size={12} /> Meta
                        </button>
                      ) : (
                        <button className="inline-flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-md">
                          <MessageCircle size={12} /> WhatsApp
                        </button>
                      )}
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
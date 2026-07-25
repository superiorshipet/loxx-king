import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Search, ChevronDown, MessageCircle, FileText, 
  MapPin, Store, Truck, Calendar, Users, Package, 
  LayoutDashboard, ShoppingBag, Tags, Gift, Star, MessageSquare, Bell, ClipboardList, X, CheckCircle, AlertTriangle 
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
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

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
        
        {/* منطقة الدمج */}
        <div className="bg-card p-4 rounded-xl border-2 border-brand/70 shadow-sm space-y-3">
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

        {/* CRM Data Table - عند الضغط على أي صف تفتح تفاصيل الطلب */}
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
                  <tr 
                    key={idx} 
                    onClick={() => setSelectedOrder(order)}
                    className="hover:bg-brand/10 transition-colors cursor-pointer"
                  >
                    <td className="px-3 py-2 font-mono text-brand font-bold underline">{order.id}</td>
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

        {/* نافذة تفاصيل الطلب الكاملة (Modal) عند النقر على أي طلب */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-card w-full max-w-4xl rounded-2xl border-2 border-brand/70 shadow-2xl overflow-hidden animate-fade-in">
              
              {/* هيدر المودال */}
              <div className="bg-brand/10 px-6 py-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-brand bg-brand/20 px-3 py-1 rounded-lg">
                    {lang === 'ar' ? `تفاصيل الطلب #${selectedOrder.id}` : `Order Details #${selectedOrder.id}`}
                  </span>
                  <span className="text-xs text-muted-foreground">{selectedOrder.date}</span>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 rounded-lg bg-muted text-muted-foreground hover:text-foreground hover:bg-muted-foreground/20 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* محتوى تفاصيل الطلب */}
              <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto no-scrollbar">
                
                {/* تنبيهات الحالة */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl flex items-center gap-3">
                    <AlertTriangle className="text-amber-500 flex-shrink-0" size={20} />
                    <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                      {lang === 'ar' ? 'تنبيه: الطلب متوقف منذ أكثر من 24 ساعة لم يتم تجهيزه' : 'Alert: Order pending for > 24 hours'}
                    </span>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-xl flex items-center gap-3">
                    <CheckCircle className="text-blue-500 flex-shrink-0" size={20} />
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      {lang === 'ar' ? `حالة الطلب الحالي: ${selectedOrder.statusAr}` : `Current Status: ${selectedOrder.statusEn}`}
                    </span>
                  </div>
                </div>

                {/* تفاصيل العميل والملخص */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* معلومات العميل */}
                  <div className="bg-muted/40 p-4 rounded-xl border border-border space-y-2">
                    <h4 className="text-xs font-bold text-brand uppercase">{lang === 'ar' ? 'معلومات العميل' : 'Customer Info'}</h4>
                    <p className="text-xs font-bold">{selectedOrder.customer}</p>
                    <p className="text-xs text-muted-foreground" dir="ltr">{selectedOrder.phone}</p>
                    <p className="text-xs">{lang === 'ar' ? selectedOrder.countryAr : selectedOrder.countryEn} - {lang === 'ar' ? selectedOrder.cityAr : selectedOrder.cityEn}</p>
                  </div>

                  {/* معلومات الشحن والمتجر */}
                  <div className="bg-muted/40 p-4 rounded-xl border border-border space-y-2">
                    <h4 className="text-xs font-bold text-brand uppercase">{lang === 'ar' ? 'التوصيل والمتجر' : 'Shipping & Store'}</h4>
                    <p className="text-xs"><span className="text-muted-foreground">{lang === 'ar' ? 'المتجر:' : 'Store:'}</span> <strong className="text-foreground">{selectedOrder.store}</strong></p>
                    <p className="text-xs"><span className="text-muted-foreground">{lang === 'ar' ? 'شركة الشحن:' : 'Courier:'}</span> <strong className="text-foreground">{selectedOrder.shipping}</strong></p>
                    <p className="text-xs"><span className="text-muted-foreground">{lang === 'ar' ? 'مصدر الطلب:' : 'Source:'}</span> <strong className="text-foreground">{selectedOrder.source}</strong></p>
                  </div>

                  {/* ملخص المبالغ */}
                  <div className="bg-brand/5 p-4 rounded-xl border border-brand/30 space-y-2">
                    <h4 className="text-xs font-bold text-brand uppercase">{lang === 'ar' ? 'ملخص الطلب' : 'Order Summary'}</h4>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{lang === 'ar' ? 'المبلغ الإجمالي:' : 'Total Amount:'}</span>
                      <strong className="text-amber-500 text-sm" dir="ltr">{selectedOrder.amount}</strong>
                    </div>
                    <div className="flex justify-between text-xs pt-2 border-t border-border">
                      <span className="text-muted-foreground">{lang === 'ar' ? 'طريقة الدفع:' : 'Payment:'}</span>
                      <strong className="text-brand">Cash on Delivery</strong>
                    </div>
                  </div>

                </div>

                {/* أزرار الإجراءات والمراسلة */}
                <div className="bg-muted/30 p-4 rounded-xl border border-border flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-2 bg-brand text-[#0E0E11] font-bold text-xs rounded-lg shadow hover:opacity-90 transition-opacity">
                      {lang === 'ar' ? 'تعديل حالة الطلب' : 'Update Status'}
                    </button>
                    <button className="px-3 py-2 bg-muted border border-border font-bold text-xs rounded-lg hover:bg-muted-foreground/10 transition-colors">
                      {lang === 'ar' ? 'إعادة إرسال الطلب' : 'Resend Order'}
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedOrder.chat === 'meta' ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg">
                        <MessageCircle size={14} /> Meta Chat Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg">
                        <MessageCircle size={14} /> WhatsApp Chat Active
                      </span>
                    )}
                  </div>
                </div>

              </div>

              {/* فوتر المودال */}
              <div className="bg-muted/40 px-6 py-3 border-t border-border flex justify-end">
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 bg-brand text-[#0E0E11] font-bold text-xs rounded-xl hover:opacity-90 transition-opacity"
                >
                  {lang === 'ar' ? 'إغلاق' : 'Close'}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  )
}
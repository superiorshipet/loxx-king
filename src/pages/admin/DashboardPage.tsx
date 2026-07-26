import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Search, ChevronDown, MessageCircle, FileText, 
  MapPin, Store, Truck, Calendar, Users, Package, 
  ShoppingBag, Tags, Gift, Star, MessageSquare, Bell, ClipboardList, X, CheckCircle, AlertTriangle, 
  TrendingUp, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight
} from 'lucide-react'
import { AdminLayout } from '../../components/layout/AdminLayout'
import { useApp } from '../../context/AppContext'

const initialOrders = [
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
  const [orders, setOrders] = useState(initialOrders)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [limitCount, setLimitCount] = useState(10) // عدد العناصر في الصفحة
  const [currentPage, setCurrentPage] = useState(1) // الصفحة الحالية
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})

  const menuItems = [
    { type: 'link', path: '/admin/orders', nameEn: 'Orders', nameAr: 'الطلبات', icon: ShoppingBag },
    { type: 'link', path: '/admin/products', nameEn: 'storage', nameAr: 'المستودع', icon: Package },
    { type: 'link', path: '/admin/categories', nameEn: 'Categories', nameAr: 'الفئات', icon: Tags },
    { type: 'link', path: '/admin/offers', nameEn: 'Offers', nameAr: 'العروض', icon: Gift },
    { type: 'link', path: '/admin/reviews', nameEn: 'Reviews', nameAr: 'التقييمات', icon: Star },
    { type: 'link', path: '/admin/chat', nameEn: 'Support Chat', nameAr: 'دردشة الدعم', icon: MessageSquare },
    { type: 'link', path: '/admin/invoices', nameEn: 'Invoices', nameAr: 'الفواتير', icon: FileText },
    { type: 'link', path: '/admin/notifications', nameEn: 'Notifications', nameAr: 'الإشعارات', icon: Bell },
    { type: 'link', path: '/admin/operations', nameEn: 'Operations Center', nameAr: 'مركز العمليات', icon: TrendingUp },
    ...(isAdmin ? [{ type: 'link', path: '/admin/logs', nameEn: 'Edit Logs', nameAr: 'سجل التعديلات', icon: ClipboardList }] : []),

    { type: 'filter', key: 'order',   nameEn: 'Filter by Order',    nameAr: 'فلترة حسب الطلب',        icon: Search },
    { type: 'filter', key: 'courier', nameEn: 'Filter by Courier',  nameAr: 'تصفية حسب شركة التوصيل', icon: Truck },
    { type: 'filter', key: 'city',    nameEn: 'Filter by City',     nameAr: 'تصفية حسب المدينة',      icon: MapPin },
    { type: 'filter', key: 'product', nameEn: 'Filter by Product',  nameAr: 'فلترة حسب المنتج',       icon: Package },
    { type: 'filter', key: 'last10',  nameEn: 'Last 10 Operations', nameAr: 'آخر 10 عمليات',          icon: Calendar },
  ]

  // تصفية البيانات حسب البحث والتاريخ
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.includes(searchQuery) ||
      order.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery) ||
      order.countryAr.includes(searchQuery) ||
      order.cityAr.includes(searchQuery)

    const matchesDate = selectedDate ? order.date === selectedDate : true

    return matchesSearch && matchesDate
  })

  // حساب الصفحات
  const totalPages = Math.ceil(filteredOrders.length / limitCount) || 1
  const startIndex = (currentPage - 1) * limitCount
  const currentOrders = filteredOrders.slice(startIndex, startIndex + limitCount)

  useEffect(() => {
    const params = new URLSearchParams(activeFilters).toString()
    fetch(`/api/orders${params ? `?${params}` : ''}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setOrders(data)
      })
      .catch(err => console.error('Filter fetch failed:', err))
  }, [activeFilters])

  return (
    <AdminLayout>
      <div className="w-full max-w-7xl mx-auto space-y-3 pb-8">

        {/* التابات والفلاتر */}
        <div dir="rtl" className="flex flex-wrap justify-center gap-1.5">
          {menuItems.map((item) => {
            const label = lang === 'ar' ? item.nameAr : item.nameEn

            if (item.type === 'link') {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between w-[calc(16.666%-6px)] px-2 py-1.5 rounded-lg border border-brand text-brand hover:bg-brand hover:text-[#0E0E11] transition-all text-[10px] font-semibold tap-group ${
                    isActive ? 'bg-brand text-[#0E0E11] shadow' : 'bg-brand/10'
                  }`}
                >
                  <div className="flex items-center gap-1 truncate">
                    <item.icon size={12} className="opacity-90 flex-shrink-0" />
                    <span className="truncate">{label}</span>
                  </div>
                </Link>
              )
            }

            return (
              <button
                key={item.key}
                onClick={() => {}}
                className="flex items-center justify-between w-[calc(16.666%-6px)] px-2 py-1.5 rounded-lg border border-brand bg-brand/10 text-brand hover:bg-brand hover:text-[#0E0E11] transition-all text-[10px] font-semibold tap-group"
              >
                <div className="flex items-center gap-1 truncate">
                  <item.icon size={12} className="opacity-90 flex-shrink-0" />
                  <span className="truncate">{label}</span>
                </div>
                <ChevronDown size={11} className="opacity-80 flex-shrink-0 ms-1" />
              </button>
            )
          })}
        </div>

        {/* شريط التحكم (بحث، عدد الطلبات، وفلتر التاريخ) */}
        <div dir="rtl" className="flex items-center justify-between gap-4 px-1 py-2">
          
          <div className="flex items-center gap-2 bg-card px-3 py-1.5 rounded-xl border border-border shadow-sm">
            <span className="text-xs text-muted-foreground">{lang === 'ar' ? 'عرض:' : 'Show:'}</span>
            <select
              value={limitCount}
              onChange={e => {
                setLimitCount(Number(e.target.value))
                setCurrentPage(1)
              }}
              className="bg-transparent text-xs font-bold outline-none cursor-pointer text-brand"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="text-xs font-bold text-muted-foreground border-s border-border ps-2">
              <span>{filteredOrders.length}</span> <span className="ms-1">{lang === 'ar' ? 'عدد الطلبات' : 'Orders'}</span>
            </span>
          </div>

          <div className="relative flex-1 max-w-md">
            <Search size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder={lang === 'ar' ? 'ابحث عن منتج، عميل، أو رقم طلب...' : 'Search product, customer, order...'}
              className="w-full h-9 ps-9 pe-4 rounded-xl bg-card border border-border text-xs outline-none focus:ring-2 focus:ring-ring shadow-sm"
            />
          </div>

          <div 
            onClick={(e) => {
              const input = e.currentTarget.querySelector('input[type="date"]') as HTMLInputElement;
              if (input && typeof input.showPicker === 'function') {
                input.showPicker();
              }
            }}
            className="flex items-center gap-2 bg-card px-3 py-1.5 rounded-xl border border-border shadow-sm cursor-pointer hover:border-brand/50 transition-colors"
          >
            <Calendar size={14} className="text-brand flex-shrink-0" />
            <input
              type="date"
              value={selectedDate}
              onChange={e => { setSelectedDate(e.target.value); setCurrentPage(1); }}
              className="bg-transparent text-xs outline-none text-muted-foreground cursor-pointer w-28"
            />
            {selectedDate && (
              <button 
                type="button" 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setSelectedDate(''); 
                  setCurrentPage(1);
                }} 
                className="text-xs text-red-500 hover:underline ms-1"
              >
                {lang === 'ar' ? 'إلغاء' : 'Clear'}
              </button>
            )}
          </div>

        </div>

        {/* CRM Data Table */}
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
                {currentOrders.length > 0 ? (
                  currentOrders.map((order, idx) => (
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
                  ))
                ) : (
                  <tr>
                    <td colSpan={11} className="text-center py-6 text-muted-foreground text-xs">
                      {lang === 'ar' ? 'لا توجد نتائج مطابقة للبحث' : 'No matching results found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* نظام التنقل بين الصفحات (Pagination) مطابق للصورة */}
        <div dir="rtl" className="flex items-center justify-between bg-card px-4 py-3 rounded-xl border border-border shadow-sm">
          <div className="text-xs text-muted-foreground font-semibold">
            <span>{filteredOrders.length}</span> <span className="ms-1">{lang === 'ar' ? 'إجمالي الطلبات' : 'total orders'}</span>
          </div>

          <div className="flex items-center gap-1">
            {/* زر الذهاب لأول صفحة */}
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronsRight size={15} />
            </button>

            {/* زر الصفحة السابقة */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={15} />
            </button>

            {/* أرقام الصفحات الديناميكية */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
              const isActive = page === currentPage
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-brand text-[#0E0E11] shadow' 
                      : 'border border-border hover:bg-muted text-muted-foreground'
                  }`}
                >
                  {page}
                </button>
              )
            })}

            {/* زر الصفحة التالية */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={15} />
            </button>

            {/* زر الذهاب لأخر صفحة */}
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronsLeft size={15} />
            </button>
          </div>
        </div>

        {/* نافذة تفاصيل الطلب الكاملة (Modal) */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-card w-full max-w-4xl rounded-2xl border-2 border-brand/70 shadow-2xl overflow-hidden animate-fade-in">
              
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

              <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto no-scrollbar">
                
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted/40 p-4 rounded-xl border border-border space-y-2">
                    <h4 className="text-xs font-bold text-brand uppercase">{lang === 'ar' ? 'معلومات العميل' : 'Customer Info'}</h4>
                    <p className="text-xs font-bold">{selectedOrder.customer}</p>
                    <p className="text-xs text-muted-foreground" dir="ltr">{selectedOrder.phone}</p>
                    <p className="text-xs">{lang === 'ar' ? selectedOrder.countryAr : selectedOrder.countryEn} - {lang === 'ar' ? selectedOrder.cityAr : selectedOrder.cityEn}</p>
                  </div>

                  <div className="bg-muted/40 p-4 rounded-xl border border-border space-y-2">
                    <h4 className="text-xs font-bold text-brand uppercase">{lang === 'ar' ? 'التوصيل والمتجر' : 'Shipping & Store'}</h4>
                    <p className="text-xs"><span className="text-muted-foreground">{lang === 'ar' ? 'المتجر:' : 'Store:'}</span> <strong className="text-foreground">{selectedOrder.store}</strong></p>
                    <p className="text-xs"><span className="text-muted-foreground">{lang === 'ar' ? 'شركة الشحن:' : 'Courier:'}</span> <strong className="text-foreground">{selectedOrder.shipping}</strong></p>
                    <p className="text-xs"><span className="text-muted-foreground">{lang === 'ar' ? 'مصدر الطلب:' : 'Source:'}</span> <strong className="text-foreground">{selectedOrder.source}</strong></p>
                  </div>

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
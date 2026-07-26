import { useState, useRef } from 'react'
import {
  Menu, Plus, Store, Search, Package, Tag, Truck, Users, Clock,
  Globe, MapPin, FileText, Wallet, ChevronLeft, ChevronRight,
  ChevronsLeft, ChevronsRight, MessageCircle, Database, Filter, Hash, UserCheck, Building2,
  PhoneCall
} from 'lucide-react'

const initialOrders = [
  { receipt: '69938', employee: 'Nadeen Moelebyary', customer: 'رحمتك يا الله', phone: '07654323123', createdAt: '2026-07-22', country: 'العراق', city: 'الموصل', pageType: 'فيسبوك', store: 'Lotus Blue', shipping: 'شركة صندوق التوصيل', lastUpdate: '2026-07-22', status: 'قيد الاعتماد', amount: '79,999 IQD' },
  { receipt: '69937', employee: 'Nadeen Moelebyary', customer: 'asd asd asd', phone: '07654321345', createdAt: '2026-07-22', country: 'العراق', city: 'الموصل', pageType: 'فيسبوك', store: 'MOON LIGHT', shipping: 'شركة صندوق التوصيل', lastUpdate: '2026-07-22', status: 'طلب جديد', amount: '10,000 IQD' },
  { receipt: '69936', employee: 'AHMED', customer: 'LUXIRA HOLDING', phone: '0555544555', createdAt: '2026-07-22', country: 'الإمارات', city: 'دبي', pageType: 'فيسبوك', store: 'Lotus Blue', shipping: 'شركة المها للتوصيل', lastUpdate: '2026-07-22', status: 'طلب جديد', amount: '5,000 AED' },
  { receipt: '69935', employee: 'Nadeen Test Call Center', customer: 'رحمتك يا الله', phone: '07543212345', createdAt: '2026-07-20', country: 'العراق', city: 'الموصل', pageType: 'فيسبوك', store: 'Hayat Cosmetics', shipping: 'شركة صندوق التوصيل', lastUpdate: '2026-07-20', status: 'قيد الاعتماد', amount: '120,000 IQD' },
  { receipt: '69932', employee: 'Nadeen Test Call Center', customer: 'Muhammad Zakaria Hallak', phone: '05674321567', createdAt: '2026-07-09', country: 'تركيا', city: 'اسطنبول', pageType: 'انستقرام', store: 'ANAS ALFAYEZ', shipping: 'Hayat Cosmetics', lastUpdate: '2026-07-20', status: 'تم التجهيز', amount: '10,000 TRY' },
  { receipt: '69934', employee: 'Nadeen Moelebyary', customer: 'nadeen elebyary', phone: '07654321234', createdAt: '2026-07-18', country: 'العراق', city: 'الموصل', pageType: 'فيسبوك', store: 'Lotus Blue', shipping: 'شركة صندوق التوصيل', lastUpdate: '2026-07-20', status: 'طلب جديد', amount: '190,000 IQD' },
  { receipt: '69931', employee: 'Nadeen Moelebyary', customer: 'nadeen elebyary', phone: '07654321678', createdAt: '2026-07-14', country: 'العراق', city: 'الموصل', pageType: 'فيسبوك', store: 'Lotus Blue', shipping: 'شركة صندوق التوصيل', lastUpdate: '2026-07-20', status: 'قيد التوصيل', amount: '15,000 IQD' },
  { receipt: '69933', employee: 'Nadeen Moelebyary', customer: 'nadeen elebyary', phone: '05432321678', createdAt: '2026-07-18', country: 'تركيا', city: 'أنقرة', pageType: 'فيسبوك', store: 'sürat', shipping: 'MOON LIGHT', lastUpdate: '2026-07-18', status: 'الطلبات الغير مكتملة', amount: '900 TRY' },
  { receipt: '68929', employee: 'SALMA', customer: 'زينة', phone: '0931094675', createdAt: '2026-04-17', country: 'ليبيا', city: 'مصراته', pageType: 'انستقرام', store: 'LOXX KING WOMEN', shipping: 'شركة كاماكس للتوصيل', lastUpdate: '2026-07-15', status: 'طلب جديد', amount: '220 LYD' },
  { receipt: '69930', employee: 'Nadeen Moelebyary', customer: 'nadeen elebyary', phone: '07435678968', createdAt: '2026-07-14', country: 'العراق', city: 'البصرة', pageType: 'انستقرام', store: 'MOON LIGHT', shipping: 'شركة صندوق التوصيل', lastUpdate: '2026-07-14', status: 'طلب جديد', amount: '80,000 IQD' },
]

const statusStyles = {
  'قيد الاعتماد': 'bg-amber-50 text-amber-700 border border-amber-300',
  'طلب جديد': 'bg-cyan-50 text-cyan-700 border border-cyan-300',
  'تم التجهيز': 'bg-emerald-50 text-emerald-700 border border-emerald-300',
  'قيد التوصيل': 'bg-yellow-50 text-yellow-700 border border-yellow-300',
  'تم التوصيل': 'bg-green-50 text-green-700 border border-green-300',
  'الطلبات الغير مكتملة': 'bg-rose-50 text-rose-700 border border-rose-300',
}

const topNotifications = [
  { key: 'approvals', name: 'الاعتمادات', count: 2 },
  { key: 'leads', name: 'الطلبات المحتملة' },
  { key: 'staff_errors', name: 'أخطاء الموظفين', count: 9 },
  { key: 'required_edits', name: 'التعديلات المطلوبة', count: 13 },
  { key: 'reports', name: 'الإبلاغات', count: 13 },
  { key: 'required_tasks', name: 'المهام المطلوبة' },
]

const gridFilters = [
  { key: 'status',     name: 'فلترة حسب الحالة',        icon: Filter },
  { key: 'country',    name: 'تصفية حسب الدولة',        icon: Globe },
  { key: 'city',       name: 'تصفية حسب المدينة',       icon: MapPin },
  { key: 'product',    name: 'فلترة حسب المنتج',        icon: Package },
]

const bottomActions = [
  { key: 'download', name: 'تنزيل الطلبات' },
  { key: 'verification', name: 'قيد التحقق', count: 43 },
  { key: 'status_update', name: 'تحديث الحالات', count: 58 },
  { key: 'complaints', name: 'إدارة الشكاوي' },
  { key: 'leads', name: 'العملاء المحتملون' },
  { key: 'entered_data', name: 'البيانات المدخلة' },
]

export default function OrdersPageExact() {
  const [orders] = useState(initialOrders)
  const [showStaleToast, setShowStaleToast] = useState(true)
  const [showLateToast, setShowLateToast] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedDate, setSelectedDate] = useState('')
  const dateInputRef = useRef(null)

  const totalPages = 17

  // تصفية الطلبات بناءً على التاريخ المختار
  const filteredOrders = orders.filter(order => {
    if (!selectedDate) return true;
    return order.createdAt === selectedDate;
  });

  return (
    <div dir="rtl" className="min-h-screen w-full bg-white text-gray-900 font-sans" style={{ fontFamily: "'NotoNaskhArabic-Regular', Arial, sans-serif" }}>

      {/* ============ الهيدر العلوي ============ */}
      <header className="relative w-full bg-white px-4 py-1.5 border-b border-gray-200 shadow-md">
        <div className="flex items-center justify-between gap-2 flex-wrap w-full">
          
          <div dir="rtl" className="flex items-center gap-2">
            <button className="w-7 h-7 rounded-lg flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100 shadow-sm border border-gray-200">
              <Menu size={15} />
            </button>
            <button className="text-xs font-semibold text-gray-900 hover:text-sky-400 px-2.5 py-1 rounded-lg bg-sky-100 border border-sky-100 shadow-sm transition-all">عرض المنتجات</button>
            <button className="text-xs font-semibold text-gray-900 hover:text-sky-400 px-2.5 py-1 rounded-lg bg-sky-100 border border-sky-100 shadow-sm transition-all">عرض الأسعار</button>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 text-lg font-black tracking-wide">
            <span className="text-gray-900">Loxx</span>
            <span className="text-sky-400"> King</span>
          </div>

          <div dir="rtl" className="flex items-center gap-1.5 flex-wrap">
            {topNotifications.map((n) => (
              <button
                key={n.key}
                className="relative flex items-center gap-1 px-3 py-1.5 rounded-full bg-sky-100 border border-sky-100 text-gray-900 text-xs font-semibold hover:border-sky-400 hover:shadow transition-all shadow-sm"
              >
                {n.name}
                {n.count !== undefined && (
                  <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {n.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ============ تنبيهات عائمة ============ */}
      <div className="fixed top-16 left-4 z-40 space-y-2 w-72">
        {showStaleToast && (
          <div className="bg-white border border-sky-400 rounded-xl shadow-md p-2.5 flex items-start gap-2.5">
            <button
              onClick={() => setShowStaleToast(false)}
              className="px-2.5 py-1 rounded-lg bg-sky-400 text-white text-[11px] font-bold whitespace-nowrap shadow-sm"
            >
              تأكيد
            </button>
            <div className="text-[11px]">
              <p className="font-bold text-gray-800">تنبيه: يوجد 76 طلب منذ أكثر من 24 ساعة لم يتم تجهيزه</p>
              <p className="text-gray-500 mt-0.5">طلبات جديدة مر عليها أكثر من 24 ساعة ولم تتحول إلى تم التجهيز</p>
            </div>
          </div>
        )}

        {showLateToast && (
          <div className="bg-white border border-sky-400 rounded-xl shadow-md p-2.5 flex items-start gap-2.5">
            <button
              onClick={() => setShowLateToast(false)}
              className="px-2.5 py-1 rounded-lg bg-sky-400 text-white text-[11px] font-bold whitespace-nowrap shadow-sm"
            >
              تأكيد
            </button>
            <div className="text-[11px]">
              <p className="font-bold text-gray-800">تنبيه: يوجد 4 طلب منذ أكثر من 72 ساعة لم يسلم</p>
              <p className="text-gray-500 mt-0.5">طلبات تم تجهيزها أو قيد التوصيل منذ أكثر من 72 ساعة ولم تتحول إلى تم التسليم</p>
            </div>
          </div>
        )}
      </div>

      {/* ============ المحتوى الرئيسي ============ */}
      <main className="w-full px-4 py-1.5 space-y-1">

        <div className="text-center font-bold text-sky-400 text-xs tracking-wide w-full">
          AHMED
        </div>

        {/* شبكة الأزرار والفلاتر (4x4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1.5 max-w-[1100px] mx-auto">
          {gridFilters.map((item) => (
            <button
              key={item.key}
              className="flex items-center justify-start gap-2 px-0.5 py-0.5 rounded bg-white border border-gray-200 text-black hover:border-sky-400 transition-all text-xs font-normal shadow-sm overflow-hidden"
            >
              <div className="w-5 h-5 rounded-full bg-sky-400 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <item.icon size={18} />
              </div>
              <span className="truncate" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</span>
            </button>
          ))}
        </div>

        {/* الأزرار السفلية (النصوص بالأسود والإشعارات باللون الأحمر) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 py-0.5 w-full">
          {bottomActions.map((action) => (
            <button
              key={action.key}
              className="relative px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-yellow-500 text-xs font-semibold shadow-sm hover:border-sky-400 transition-all"
            >
              {action.name}
              {action.count !== undefined && (
                <span className="absolute -top-1.5 -start-1.5 bg-rose-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow">
                  {action.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* شريط التحكم */}
        <div className="flex items-center justify-between gap-3 w-full pt-1">
          
          {/* اليمين: مدخلات */}
          <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-xl border border-gray-200 shadow-sm text-xs text-gray-600">
            <span>أظهر:</span>
            <select className="bg-transparent font-normal outline-none cursor-pointer text-xs">
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>مدخلات</span>
          </div>

          {/* المنتصف: شريط البحث الشامل */}
          <div className="flex-1 flex justify-center">
            <input
              type="text"
              placeholder="بحث..."
              className="w-120 h-7 px-4 rounded bg-white border border-gray-200 text-xs outline-none shadow-sm text-right"
            />
          </div>

          {/* الشمال: فلتر التاريخ */}
          <div 
            onClick={() => dateInputRef.current?.showPicker?.()} 
            className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1.5 rounded border border-gray-300 shadow-sm cursor-pointer select-none relative"
          >
            <span className="text-xs text-gray-500">📅</span>
            <input
              ref={dateInputRef}
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              aria-label="فلتر حسب التاريخ"
              className="bg-transparent text-xs outline-none text-black w-28 text-right font-normal cursor-pointer"
            />
            {!selectedDate && (
              <span className="absolute text-xs text-gray-500 pointer-events-none right-7 bg-gray-100 px-1">فلتر حسب التاريخ</span>
            )}
          </div>

        </div>

        {/* جدول الطلبات */}
        <div className="w-full overflow-x-auto pt-1">
          <table className="w-full text-[15px] text-right whitespace-nowrap font-normal">
            <thead>
              <tr className="text-gray-400 uppercase border-b border-gray-200 bg-gray-50/50">
                <th className="px-2 py-2 font-normal">رقم الوصل</th>
                <th className="px-2 py-1.5 font-normal">اسم الموظف</th>
                <th className="px-2 py-1.5 font-normal">اسم الزبون</th>
                <th className="px-2 py-1.5 font-normal">رقم الهاتف</th>
                <th className="px-2 py-1.5 font-normal">تاريخ الأنشاء</th>
                <th className="px-2 py-1.5 font-normal">الدولة</th>
                <th className="px-2 py-1.5 font-normal">المدينة</th>
                <th className="px-2 py-1.5 font-normal">نوع الصفحة</th>
                <th className="px-2 py-1.5 font-normal">المتجر</th>
                <th className="px-2 py-1.5 font-normal">شركة التوصيل</th>
                <th className="px-2 py-1.5 font-normal">اخر تحديث</th>
                <th className="px-2 py-1.5 font-normal text-center">حالة الطلب</th>
                <th className="px-2 py-1.5 font-normal">قيمة المبلغ</th>
                <th className="px-2 py-1.5 font-normal">مراسلة</th>
                <th className="px-2 py-1.5 font-normal text-center">المنتجات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.receipt} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-2 py-1.5 font-mono text-sky-600 font-normal underline">{order.receipt}</td>
                  <td className="px-2 py-1.5 text-gray-700">{order.employee}</td>
                  <td className="px-2 py-1.5 text-gray-800">{order.customer}</td>
                  <td className="px-2 py-1.5 font-mono text-sky-600" dir="ltr">{order.phone}</td>
                  <td className="px-2 py-1.5 text-gray-500">{order.createdAt}</td>
                  <td className="px-2 py-1.5 text-gray-700">{order.country}</td>
                  <td className="px-2 py-1.5 text-gray-700">{order.city}</td>
                  <td className="px-2 py-1.5 text-gray-500">{order.pageType}</td>
                  <td className="px-2 py-1.5 text-gray-800">{order.store}</td>
                  <td className="px-2 py-1.5 text-gray-500">{order.shipping}</td>
                  <td className="px-2 py-1.5 text-gray-500">{order.lastUpdate}</td>
                  <td className="px-2 py-1.5 text-center">
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-normal ${statusStyles[order.status] || 'bg-gray-50 text-gray-600'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-2 py-1.5 text-amber-600" dir="ltr">{order.amount}</td>
                  <td className="px-2 py-1.5">
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-300 px-1.5 py-0.5 rounded font-normal">
                      <PhoneCall size={10} /> واتساب
                    </span>
                  </td>
                  <td className="px-2 py-1.5 text-center">
                    <Package size={14} className="text-gray-400 inline-block" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination السفلي */}
        <div className="flex items-center justify-between flex-wrap gap-3 pt-3 pb-5 w-full">
          
          {/* زر عرض وتصفية عدد الطلبات على اليمين */}
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-sm text-xs text-gray-700 font-semibold cursor-pointer hover:border-sky-400 transition-all">
            <span>عدد الطلبات:</span>
            <span className="text-sky-600 font-bold">{filteredOrders.length}</span>
          </div>

          {/* أرقام الصفحات مرتبة من اليمين للشمال (1، 2، 3...) */}
          <div className="flex items-center gap-1.5 mx-auto">
            <button onClick={() => setCurrentPage(1)} className="w-8 h-8 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 text-gray-600 text-xs font-normal">
              <ChevronsRight size={14} />
            </button>
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="w-8 h-8 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 text-gray-600 text-xs font-normal">
              <ChevronRight size={14} />
            </button>
            {[1, 2, 3, '...', 15, 16, 17].map((p, idx) =>
              p === '...' ? (
                <span key={idx} className="w-8 h-8 flex items-center justify-center text-gray-400 text-xs font-normal">…</span>
              ) : (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(p)}
                  className={`w-8 h-8 rounded-xl border text-xs font-normal flex items-center justify-center ${
                    currentPage === p ? 'bg-sky-400 text-white border-sky-400' : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  {p}
                </button>
              )
            )}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} className="w-8 h-8 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 text-gray-600 text-xs font-normal">
              <ChevronLeft size={14} />
            </button>
            <button onClick={() => setCurrentPage(totalPages)} className="w-8 h-8 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 text-gray-600 text-xs font-normal">
              <ChevronsLeft size={14} />
            </button>
          </div>

          <div className="w-20"></div>

        </div>

      </main>

      {/* زرار الشات العائم */}
      <button className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-sky-400 text-white shadow-xl flex items-center justify-center hover:bg-sky-500 transition-colors z-50">
        <MessageCircle size={22} />
      </button>
    </div>
  )
}
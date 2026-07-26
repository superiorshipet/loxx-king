import { useState, useRef, useEffect } from 'react'
import {
  Menu, Plus, Store, Search, Package, Tag, Truck, Users, Clock,
  Globe, MapPin, FileText, Wallet, ChevronLeft, ChevronRight,
  ChevronsLeft, ChevronsRight, MessageCircle, Database, Filter, Hash, UserCheck, Building2,
  PhoneCall, X, Send, Smile, Mic, Paperclip, Image, Trash2, CheckCheck, ArrowRight, Edit3, Eye, DollarSign, Sparkles
} from 'lucide-react'

// إنشاء 30 طلب تجريبي تفصيلي
const initialOrders = Array.from({ length: 30 }, (_, index) => {
  const id = (69948 - index).toString()
  const names = ['nadeen elebyary', 'محمد أحمد', 'فاطمة علي', 'عمر خالد', 'زينب حسن', 'أحمد محمود', 'سارة عبد الله', 'محمود حسن', 'ريم خالد', 'يوسف محمد']
  const cities = ['بغداد', 'الموصل', 'البصرة', 'أربيل', 'النجف', 'كربلاء', 'اسطنبول', 'دبي']
  const countries = ['العراق', 'الإمارات', 'تركيا']
  const stores = ['MOON LIGHT', 'Lotus Blue', 'FLARE', 'Hayat Cosmetics']
  const statuses = ['طلب جديد', 'قيد الاعتماد', 'تم التجهيز', 'قيد التوصيل']
  
  return {
    receipt: id,
    employee: index % 2 === 0 ? 'Nadeen Moelebyary' : 'AHMED',
    customer: names[index % names.length],
    phone: `07${Math.floor(100000000 + Math.random() * 900000000)}`,
    createdAt: index < 5 ? '2026-07-26' : `2026-07-${String(20 - (index % 15)).padStart(2, '0')}`,
    country: countries[index % countries.length],
    city: cities[index % cities.length],
    address: 'شارع الرئيسي، عمارة 4',
    pageType: index % 2 === 0 ? 'فيسبوك' : 'انستقرام',
    store: stores[index % stores.length],
    shipping: 'شركة صندوق التوصيل',
    lastUpdate: '2026-07-26',
    status: statuses[index % statuses.length],
    subTotal: `${(index + 5) * 5000}.00 IQD`,
    deliveryCost: '4000.00 IQD',
    netAmount: `${(index + 5) * 5000 - 1000}.00 IQD`,
    paymentType: index % 2 === 0 ? 'دفع كاش' : 'بطاقة',
    deliveryPriceForCustomer: 'IQD 600.00',
    entriesCount: '1',
    products: [
      { name: 'توب باودر 01', qty: '1', img: '📦' },
      { name: 'توب باودر 02', qty: '1', img: '📦' }
    ]
  }
})

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

export default function LoxxKingInteractiveSystem() {
  const [orders] = useState(initialOrders)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(10) // عدد العناصر في الصفحة
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedDate, setSelectedDate] = useState('')
  const dateInputRef = useRef(null)

  // حالات شات مركز المساعدة
  const [isHelpChatOpen, setIsHelpChatOpen] = useState(false)
  const [chatMessage, setChatMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Nadeen Test Call Center', time: '٠٣:٠١ م', text: '@@الكل\nبلاغ عن مشكلة في الطلب رقم #69941\nتيست', isOwn: false },
    { id: 2, sender: 'Nadeen Moelebyary', time: '٠٣:٠٢ م', text: '@@AHMED\nبلاغ عن مشكلة في الطلب رقم #69941\nتيست', isOwn: false },
    { id: 3, sender: 'AHMED', time: '٠١:٢٧ ص', text: '@@AHMED\nبلاغ عن مشكلة في الطلب رقم #69932\nمشكله عدلها فورا\nمرفقات البلاغ:\nhttps://wassimadmin-001-site1.jtempurl.com/images/orderposts/0a1ae9de-c3d5-496b-a51e-7289450861cc.png', isOwn: true },
    { id: 4, sender: 'تنبيه تلقائي', time: '١٠:٥٨ ص', text: '@@AHMED تذكير دوري لفريق الكول سنتر: يرجى متابعة التعليقات السلبية أولاً بأول، وتقييمها واتخاذ الإجراء اللازم دون تأخير.', isOwn: false, isSystem: true }
  ])
  const chatScrollRef = useRef(null)

  useEffect(() => {
    if (isHelpChatOpen && chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight
    }
  }, [isHelpChatOpen, chatMessages])

  const handleSendHelpMessage = (e) => {
    e.preventDefault()
    if (!chatMessage.trim()) return

    setChatMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'AHMED',
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        text: chatMessage,
        isOwn: true
      }
    ])
    setChatMessage('')
  }

  // فلترة الطلبات بناءً على البحث والتاريخ
  const filteredOrders = orders.filter(order => {
    const matchesDate = !selectedDate || order.createdAt === selectedDate;
    const matchesSearch = !searchQuery || 
      order.receipt.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order.phone.includes(searchQuery);
    return matchesDate && matchesSearch;
  });

  // حساب الترقيم (Pagination) بناءً على العدد المختار
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentTableData = filteredOrders.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div dir="rtl" className="min-h-screen w-full bg-white text-gray-900 font-sans relative" style={{ fontFamily: "'NotoNaskhArabic-Regular', Arial, sans-serif" }}>

      {/* ============ الهيدر العلوي (مع تفعيل زر العودة للرئيسية عند الضغط على Loxx King) ============ */}
      <header className="relative w-full bg-white px-4 py-1.5 border-b border-gray-200 shadow-md z-30">
        <div className="flex items-center justify-between gap-2 flex-wrap w-full">
          
          <div dir="rtl" className="flex items-center gap-2">
            <button className="w-7 h-7 rounded-lg flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100 shadow-sm border border-gray-200">
              <Menu size={15} />
            </button>
            <button className="text-xs font-semibold text-gray-900 hover:text-sky-400 px-2.5 py-1 rounded-lg bg-sky-100 border border-sky-100 shadow-sm transition-all">عرض المنتجات</button>
            <button className="text-xs font-semibold text-gray-900 hover:text-sky-400 px-2.5 py-1 rounded-lg bg-sky-100 border border-sky-100 shadow-sm transition-all">عرض الأسعار</button>
          </div>

          {/* زر الشعار للرجوع للرئيسية */}
          <div 
            onClick={() => { setSelectedOrder(null); setSearchQuery(''); setCurrentPage(1); }}
            className="absolute left-1/2 -translate-x-1/2 text-lg font-black tracking-wide cursor-pointer select-none hover:opacity-80 transition-opacity"
          >
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

      {/* ============ شاشة تفاصيل الطلب ============ */}
      {selectedOrder ? (
        <div className="w-full px-4 py-3 space-y-3 bg-[#f8faf9] min-h-[92vh]">
          
          <div className="flex items-center justify-between bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm text-xs">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="flex items-center gap-1 font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-lg border border-sky-200 hover:bg-sky-100 transition-all cursor-pointer"
              >
                <ArrowRight size={14} /> رجوع
              </button>
              <span className="font-semibold text-gray-500">سجل التعديلات</span>
            </div>
            
            <div className="font-bold text-gray-700">تفاصيل الطلب</div>

            <div className="flex items-center gap-4">
              <span className="text-gray-500 cursor-pointer hover:text-sky-600">ملاحظة الطلب</span>
              <span className="text-gray-500 cursor-pointer hover:text-sky-600">تبليغ عن تعديل فوري</span>
              <span className="relative text-rose-600 font-bold cursor-pointer">
                الإبلاغ عن مشكلة
                <span className="absolute -top-2 -right-3 bg-rose-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">1</span>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-white p-2.5 rounded-xl border border-gray-200 shadow-sm text-xs">
            <button className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold shadow-sm">إعادة إرسال الطلب</button>
            <button className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 font-semibold">تعديل حالة الطلب</button>
            <button className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 font-semibold">تم معالجة الطلب</button>
            <button className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 font-semibold">تعديل الطلب لتحويله لتقييمات أمر</button>
            <button className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 font-semibold">تعيين الموظف</button>
            <button className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 font-semibold">تعيين شركة التوصيل</button>
            <button className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 font-semibold">تأجيل الطلب</button>

            <div className="mr-auto flex items-center gap-3">
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">{selectedOrder.status}</span>
              <span className="text-gray-500 font-mono" dir="ltr">{selectedOrder.employee}@gmail.com CES</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm space-y-2 text-xs">
                <div className="font-bold text-gray-700">ملخص الطلب</div>
                <div className="grid grid-cols-3 gap-1 text-center">
                  <div className="p-1.5 rounded-lg bg-gray-50 border border-gray-100">
                    <p className="text-[9px] text-gray-500">المجموع الكلي</p>
                    <p className="font-bold text-gray-900 mt-0.5">{selectedOrder.subTotal}</p>
                  </div>
                  <div className="p-1.5 rounded-lg bg-gray-50 border border-gray-100">
                    <p className="text-[9px] text-gray-500">تكلفة التوصيل</p>
                    <p className="font-bold text-gray-900 mt-0.5">{selectedOrder.deliveryCost}</p>
                  </div>
                  <div className="p-1.5 rounded-lg bg-gray-50 border border-gray-100">
                    <p className="text-[9px] text-gray-500">المبلغ المتبقي</p>
                    <p className="font-bold text-sky-600 mt-0.5">{selectedOrder.netAmount}</p>
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="flex justify-between items-center text-gray-600"><span className="flex items-center gap-1"><Truck size={12}/> الشركة المصنعة</span><span className="font-bold text-black">MOON LIGHT</span></div>
                  <div className="flex justify-between items-center text-gray-600"><span className="flex items-center gap-1"><Building2 size={12}/> الشركة المرسلة</span><span className="font-bold text-black">شركة صندوق التوصيل</span></div>
                  <div className="flex justify-between items-center pt-1 border-t border-gray-100">
                    <span className="text-gray-500">طريقة الدفع</span>
                    <span className="px-2.5 py-0.5 rounded-md bg-rose-600 text-white font-bold text-[10px]">{selectedOrder.paymentType}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm space-y-1.5 text-xs">
                <div className="flex justify-between items-center font-bold text-gray-700">
                  <span>معلومات العميل</span>
                  <Edit3 size={12} className="text-amber-500 cursor-pointer" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between border-b border-gray-100 pb-0.5"><span className="text-gray-500">اسم العميل</span><span className="font-bold">{selectedOrder.customer}</span></div>
                  <div className="flex justify-between border-b border-gray-100 pb-0.5"><span className="text-gray-500">الدولة</span><span className="font-bold flex items-center gap-1"><span>🇮🇶</span> العراق</span></div>
                  <div className="flex justify-between border-b border-gray-100 pb-0.5"><span className="text-gray-500">المدينة</span><span className="font-bold">{selectedOrder.city}</span></div>
                  <div className="flex justify-between border-b border-gray-100 pb-0.5"><span className="text-gray-500">العنوان</span><span className="font-bold">{selectedOrder.address}</span></div>
                  <div className="flex justify-between border-b border-gray-100 pb-0.5 items-center"><span className="text-gray-500">الهاتف</span><span className="font-mono text-sky-600 font-bold" dir="ltr">{selectedOrder.phone}</span></div>
                  <div className="flex justify-between items-center pt-0.5">
                    <span className="text-gray-500">الجنس</span>
                    <span className="px-2.5 py-0.5 rounded bg-amber-400 text-white font-bold text-[10px]">أنثى</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm space-y-1.5 text-xs">
                <div className="font-bold text-gray-700">تفاصيل الطلب</div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-0.5"><span className="text-gray-500">كود الشحنة</span><span className="px-2 py-0.5 rounded bg-sky-600 text-white font-mono font-bold text-[10px]">{selectedOrder.receipt}</span></div>
                  <div className="flex justify-between items-center"><span className="text-gray-500">اسم الصفحة</span><span className="font-bold text-gray-800">فيسبوك</span></div>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm space-y-2 text-xs">
                <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
                  <span className="text-emerald-700 font-bold">بيانات إضافية 🟩</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">سعر التوصيل للعميل</span>
                  <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold px-2 py-0.5 rounded-lg text-[11px]" dir="ltr">
                    {selectedOrder.deliveryPriceForCustomer}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">الإدخالات</span>
                  <span className="font-bold text-gray-900">{selectedOrder.entriesCount}</span>
                </div>

                <div className="space-y-1 pt-1 border-t border-gray-100">
                  <span className="text-gray-600 font-medium">تفاصيل الطلب</span>
                  <div className="space-y-1">
                    {selectedOrder.products.map((prod, idx) => (
                      <div key={idx} className="flex items-center justify-between p-1.5 rounded-lg border border-gray-100 bg-gray-50 text-[11px]">
                        <div className="w-6 h-6 rounded bg-white flex items-center justify-center text-xs shadow-sm">
                          {prod.img}
                        </div>
                        <span className="font-bold text-gray-800 flex-1 text-right px-2">{prod.name}</span>
                        <div className="w-5 h-5 rounded border border-gray-200 flex items-center justify-center font-bold text-gray-700 bg-white text-[10px]">
                          {prod.qty}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            <div className="lg:col-span-2 space-y-3">
              <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-gray-700 border-b border-gray-100 pb-1.5">
                  <span className="text-emerald-700 flex items-center gap-1">🖼️ صور الطلب والتواصل</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                  
                  <div className="border border-gray-200 rounded-xl p-2.5 bg-gray-50 flex flex-col items-center justify-center relative">
                    <div className="absolute top-2 right-2 text-[10px] text-gray-600 font-bold flex items-center gap-1">
                      <span>صورة تثبيت الحجز</span>
                      <Eye size={12} className="text-emerald-600" />
                    </div>
                    <div className="absolute top-2 left-2 text-gray-400">
                      <ArrowRight size={12} className="rotate-45" />
                    </div>
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 mt-4 shadow-inner">
                      <Users size={32} />
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <div className="text-xs font-bold text-gray-600 flex items-center justify-end gap-1">
                      <span>التواصل والإجراءات</span>
                      <Sparkles size={12} className="text-sky-500" />
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-1.5">
                      <button className="px-3 py-1 rounded-lg bg-teal-600 text-white text-[11px] font-bold shadow-sm">سحب الفاتورة</button>
                      <button className="px-3 py-1 rounded-lg bg-white border border-gray-300 text-gray-900 text-[11px] font-bold flex items-center gap-1">
                        <span className="text-blue-600 font-black">Meta</span>
                      </button>
                      <button className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold flex items-center gap-1 shadow-sm">
                        <PhoneCall size={11} /> WhatsApp
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-1.5">
                      <button className="px-3 py-1 rounded-lg bg-sky-50 border border-sky-300 text-sky-700 text-[11px] font-bold flex items-center gap-1">
                        <span>الطلب المربوط بمركز المساعدة</span>
                        <span className="bg-blue-600 text-white text-[9px] px-1.5 py-0.1 rounded-full">0</span>
                      </button>
                      <button className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-700 text-[11px] font-bold flex items-center gap-1">
                        <span>الإعجاب بالمنتج</span>
                        👍
                      </button>
                      <button className="px-3 py-1 rounded-lg bg-rose-50 border border-rose-300 text-rose-700 text-[11px] font-bold flex items-center gap-1">
                        <span>إرسال شكوى</span>
                        ⚠️
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 font-normal">إخفاء الطلب من الجدول</span>
                    <input type="checkbox" className="toggle toggle-sm" />
                  </div>
                  <span>سجل مراحل الطلب ⏱️</span>
                </div>

                <div className="p-2 rounded-lg border border-gray-100 bg-gray-50 flex items-center justify-between text-xs">
                  <Trash2 size={14} className="text-rose-500 cursor-pointer" />
                  <div className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center shadow">
                    <CheckCheck size={12} />
                  </div>
                  <div className="text-gray-600 font-mono text-[10px]">NADEEN MOELEBY...</div>
                  <div className="text-left font-mono text-[10px] text-gray-500">
                    <p className="text-sky-600">2026/07/26</p>
                    <p>02:46</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-[11px]">طلب جديد</p>
                    <p className="text-[9px] text-gray-500">الطلب قيد الانتظار للتجهيز</p>
                  </div>
                  <span className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-[10px]">✓</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      ) : (
        /* ============ الشاشة الرئيسية ============ */
        <main className="w-full px-4 py-1.5 space-y-1">

          <div className="text-center font-bold text-sky-400 text-xs tracking-wide w-full">
            AHMED
          </div>

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

          {/* شريط التحكم والبحث وعدد المدخلات */}
          <div className="flex items-center justify-between gap-3 w-full pt-1">
            
            {/* اختيار عدد المدخلات المعروضة (10، 25، 50) */}
            <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-xl border border-gray-200 shadow-sm text-xs text-gray-600">
              <span>أظهر:</span>
              <select 
                value={itemsPerPage}
                onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                className="bg-transparent font-semibold outline-none cursor-pointer text-xs"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span>مدخلات</span>
            </div>

            {/* شريط البحث الفوري */}
            <div className="flex-1 flex justify-center">
              <input
                type="text"
                placeholder="ابحث برقم الوصل، اسم الزبون، أو رقم الهاتف..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-96 h-7 px-4 rounded bg-white border border-gray-200 text-xs outline-none shadow-sm text-right font-medium"
              />
            </div>

            <div 
              onClick={() => dateInputRef.current?.showPicker?.()} 
              className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1.5 rounded border border-gray-300 shadow-sm cursor-pointer select-none relative"
            >
              <span className="text-xs text-gray-500">📅</span>
              <input
                ref={dateInputRef}
                type="date"
                value={selectedDate}
                onChange={(e) => { setSelectedDate(e.target.value); setCurrentPage(1); }}
                aria-label="فلتر حسب التاريخ"
                className="bg-transparent text-xs outline-none text-black w-28 text-right font-normal cursor-pointer"
              />
              {!selectedDate && (
                <span className="absolute text-xs text-gray-500 pointer-events-none right-7 bg-gray-100 px-1">فلتر حسب التاريخ</span>
              )}
            </div>

          </div>

          {/* جدول الطلبات مع التصفية والتقسيم */}
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
                {currentTableData.length > 0 ? (
                  currentTableData.map((order) => (
                    <tr 
                      key={order.receipt} 
                      onClick={() => setSelectedOrder(order)}
                      className="hover:bg-sky-50/50 transition-colors cursor-pointer"
                    >
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
                      <td className="px-2 py-1.5 text-amber-600" dir="ltr">{order.subTotal}</td>
                      <td className="px-2 py-1.5">
                        <span className="inline-flex items-center gap-1 text-[10px] text-sky-700 bg-sky-50 border border-sky-300 px-1.5 py-0.5 rounded font-normal">
                          <PhoneCall size={10} /> واتساب
                        </span>
                      </td>
                      <td className="px-2 py-1.5 text-center">
                        <Package size={14} className="text-gray-400 inline-block" />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="15" className="text-center py-6 text-gray-400 text-xs">لا توجد طلبات مطابقة للبحث</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* شريط التنقل بين الصفحات (Pagination الفعّال) */}
          <div className="flex items-center justify-between flex-wrap gap-3 pt-3 pb-5 w-full">
            
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-sm text-xs text-gray-700 font-semibold">
              <span>عدد الطلبات المتاحة:</span>
              <span className="text-sky-600 font-bold">{filteredOrders.length}</span>
            </div>

            <div className="flex items-center gap-1.5 mx-auto">
              <button 
                onClick={() => setCurrentPage(1)} 
                disabled={currentPage === 1}
                className="w-8 h-8 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 text-gray-600 text-xs font-normal disabled:opacity-40"
              >
                <ChevronsRight size={14} />
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                disabled={currentPage === 1}
                className="w-8 h-8 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 text-gray-600 text-xs font-normal disabled:opacity-40"
              >
                <ChevronRight size={14} />
              </button>

              {/* أرقام الصفحات الحقيقية بناءً على عدد المدخلات */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-8 h-8 rounded-xl border text-xs font-normal flex items-center justify-center ${
                    currentPage === p ? 'bg-sky-400 text-white border-sky-400 shadow-sm' : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  {p}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                disabled={currentPage === totalPages}
                className="w-8 h-8 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 text-gray-600 text-xs font-normal disabled:opacity-40"
              >
                <ChevronLeft size={14} />
              </button>
              <button 
                onClick={() => setCurrentPage(totalPages)} 
                disabled={currentPage === totalPages}
                className="w-8 h-8 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 text-gray-600 text-xs font-normal disabled:opacity-40"
              >
                <ChevronsLeft size={14} />
              </button>
            </div>

            <div className="w-20"></div>

          </div>

        </main>
      )}

      {/* ================= زر شات "مركز المساعدة" العائم ================= */}
      <div className="fixed bottom-6 right-6 z-50">
        
        {isHelpChatOpen && (
          <div className="absolute bottom-16 right-0 w-[380px] h-[550px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            <div className="bg-white border-b border-gray-200 px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button onClick={() => setIsHelpChatOpen(false)} className="text-gray-500 hover:text-gray-700 p-1">
                  <X size={18} />
                </button>
                <button className="text-gray-500 hover:text-gray-700 p-1">
                  <Trash2 size={18} />
                </button>
                <button className="text-gray-500 hover:text-gray-700 p-1">
                  <Search size={18} />
                </button>
              </div>

              <div className="flex items-center gap-2 text-right">
                <div>
                  <h3 className="text-xs font-bold text-gray-900">مركز المساعدة</h3>
                  <p className="text-[10px] text-gray-500">178 عضو</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 font-bold text-xs shadow-sm">
                  LX
                </div>
              </div>
            </div>

            <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-3 space-y-3 bg-[#fdfdfd] text-xs">
              <div className="text-center my-1">
                <span className="bg-gray-200/70 text-gray-600 text-[10px] px-2.5 py-1 rounded-full font-medium">٢٠ يوليو ٢٠٢٦</span>
              </div>

              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.isOwn ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-baseline gap-1.5 mb-0.5">
                    <span className="text-[10px] text-gray-400">{msg.time}</span>
                    <span className={`text-[11px] font-bold ${msg.isSystem ? 'text-sky-700' : 'text-sky-800'}`}>{msg.sender}</span>
                  </div>
                  
                  <div className={`p-2.5 rounded-xl max-w-[88%] shadow-sm whitespace-pre-wrap leading-relaxed ${
                    msg.isOwn 
                      ? 'bg-sky-50 text-gray-900 rounded-tl-sm border border-sky-200' 
                      : msg.isSystem 
                        ? 'bg-sky-50/60 text-gray-900 rounded-tr-sm border border-sky-200' 
                        : 'bg-white text-gray-900 rounded-tr-sm border border-gray-200'
                  }`}>
                    {msg.text}
                    {msg.isOwn && (
                      <div className="flex justify-end mt-1">
                        <CheckCheck size={13} className="text-sky-500" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendHelpMessage} className="bg-white border-t border-gray-200 px-3 py-2 flex items-center gap-2">
              <button type="submit" className="w-8 h-8 rounded-full bg-sky-400 text-white flex items-center justify-center hover:bg-sky-500 shadow flex-shrink-0">
                <Send size={14} className="rotate-180" />
              </button>

              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="اكتب رسالتك... واستخدم @@ للمنشن"
                className="flex-1 bg-transparent text-xs outline-none text-right py-1 placeholder:text-gray-400"
              />

              <div className="flex items-center gap-1.5 text-gray-500 flex-shrink-0">
                <button type="button" className="hover:text-gray-700 p-1"><Smile size={16} /></button>
                <button type="button" className="hover:text-gray-700 p-1"><Mic size={16} /></button>
                <button type="button" className="hover:text-gray-700 p-1"><FileText size={16} /></button>
                <button type="button" className="hover:text-gray-700 p-1"><Image size={16} /></button>
                <button type="button" className="hover:text-gray-700 p-1"><Paperclip size={16} /></button>
              </div>
            </form>

          </div>
        )}

        <button 
          onClick={() => setIsHelpChatOpen(!isHelpChatOpen)}
          className="w-14 h-14 rounded-full bg-sky-400 text-white shadow-xl flex items-center justify-center hover:bg-sky-500 transition-colors"
        >
          <MessageCircle size={22} />
        </button>

      </div>

    </div>
  )
}
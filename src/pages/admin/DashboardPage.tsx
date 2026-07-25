import { useState } from 'react'
import { 
  Search, ChevronDown, MessageCircle, FileText, 
  MapPin, Store, Truck, Calendar, Users, Package 
} from 'lucide-react'
import { AdminLayout } from '../../components/layout/AdminLayout'
import { useApp } from '../../context/AppContext'

// داتا وهمية للـ CRM
const crmOrders = [
  { id: '69943', customer: 'MR AHMD', phone: '07654657689', date: '2026-07-25', countryEn: 'Iraq', countryAr: 'العراق', cityEn: 'Mosul', cityAr: 'الموصل', source: 'فيسبوك', store: 'Lotus Blue', shipping: 'شركة صندوق التوصيل', statusEn: 'New Order', statusAr: 'طلب جديد', amount: '100,000 IQD', chat: 'meta' },
  { id: '69942', customer: 'Nadeen elebyary', phone: '05386466663', date: '2026-07-25', countryEn: 'Turkey', countryAr: 'تركيا', cityEn: 'Istanbul', cityAr: 'اسطنبول', source: 'فيسبوك', store: 'Lavva الالمانية', shipping: 'surat', statusEn: 'Delivering', statusAr: 'قيد التسليم', amount: '800,000 TRY', chat: 'meta' },
  { id: '69941', customer: 'Ahmed', phone: '07543216785', date: '2026-07-24', countryEn: 'Iraq', countryAr: 'العراق', cityEn: 'Baghdad', cityAr: 'بغداد', source: 'فيسبوك', store: 'Lotus Blue', shipping: 'شركة صندوق التوصيل', statusEn: 'New Order', statusAr: 'طلب جديد', amount: '50,000 IQD', chat: 'meta' },
  { id: '69940', customer: 'Yjityrrfj', phone: '0555555555', date: '2026-07-23', countryEn: 'UAE', countryAr: 'الإمارات', cityEn: 'Abu Dhabi', cityAr: 'أبو ظبي', source: 'واتساب', store: 'Lotus Blue', shipping: 'شركة المها للتوصيل', statusEn: 'New Order', statusAr: 'طلب جديد', amount: '500 AED', chat: 'whatsapp' },
  { id: '69939', customer: 'asd asd', phone: '07654328999', date: '2026-07-22', countryEn: 'Iraq', countryAr: 'العراق', cityEn: 'Baghdad', cityAr: 'بغداد', source: 'فيسبوك', store: 'MOON LIGHT', shipping: 'شركة صندوق التوصيل', statusEn: 'New Order', statusAr: 'طلب جديد', amount: '90,000 IQD', chat: 'meta' },
]

export default function DashboardPage() {
  const { lang, dir } = useApp()
  const [activeTab, setActiveTab] = useState('approvals')

  // تبويبات الـ CRM الأصلية اللي المدير بيحبها
  const topTabs = [
    { id: 'tasks', nameEn: 'Required Tasks', nameAr: 'المهام المطلوبة', count: 0 },
    { id: 'reports', nameEn: 'Reports', nameAr: 'الإبلاغات', count: 12 },
    { id: 'edits', nameEn: 'Required Edits', nameAr: 'التعديلات المطلوبة', count: 9 },
    { id: 'errors', nameEn: 'Staff Errors', nameAr: 'أخطاء الموظفين', count: 2 },
    { id: 'potential', nameEn: 'Potential Orders', nameAr: 'الطلبات المحتملة', count: 0 },
    { id: 'approvals', nameEn: 'Approvals', nameAr: 'الاعتمادات', count: 0 },
  ]

  // فلاتر الـ CRM
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
      <div className="w-full space-y-4">
        
        {/* 1. Top Tabs (المهام المطلوبة، الاعتمادات...) */}
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-2 py-1 overflow-x-auto no-scrollbar">
            {topTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative whitespace-nowrap text-xs md:text-sm font-bold px-4 py-3.5 transition-colors ${
                  activeTab === tab.id 
                    ? 'text-brand border-b-2 border-brand bg-brand/5' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {lang === 'ar' ? tab.nameAr : tab.nameEn}
                {tab.count > 0 && (
                  <span className={`absolute top-1.5 ${dir === 'rtl' ? 'left-1' : 'right-1'} bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Filter Section */}
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-2">
            {filters.map((filter, idx) => (
              <button
                key={idx}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-brand/30 text-brand hover:bg-brand hover:text-[#0E0E11] transition-colors text-[11px] font-semibold tap-highlight group whitespace-nowrap"
              >
                <div className="flex items-center gap-1.5">
                  <filter.icon size={13} className="opacity-80 group-hover:opacity-100" />
                  <span className="truncate max-w-[90px] sm:max-w-none">{lang === 'ar' ? filter.labelAr : filter.labelEn}</span>
                </div>
                <ChevronDown size={12} className="opacity-70 group-hover:opacity-100" />
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-4 border-t border-border pt-4">
            <button className="text-xs font-bold text-brand border-b-2 border-brand pb-1">
              {lang === 'ar' ? 'تنزيل الطلبات' : 'Download Orders'}
            </button>
            <button className="text-xs font-medium text-muted-foreground hover:text-foreground relative">
              {lang === 'ar' ? 'قيد التحقق' : 'Under Verification'}
              <span className={`absolute -top-2 ${dir === 'rtl' ? '-left-4' : '-right-4'} bg-red-500 text-white text-[9px] px-1 rounded-full`}>41</span>
            </button>
            <button className="text-xs font-medium text-muted-foreground hover:text-foreground relative">
              {lang === 'ar' ? 'تحديث الحالات' : 'Update Statuses'}
              <span className={`absolute -top-2 ${dir === 'rtl' ? '-left-4' : '-right-4'} bg-red-500 text-white text-[9px] px-1 rounded-full`}>53</span>
            </button>
          </div>
        </div>

        {/* 3. The Dense CRM Data Table */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-[11px] sm:text-xs text-start whitespace-nowrap">
              <thead className="bg-muted/40 text-muted-foreground uppercase">
                <tr>
                  <th className="px-2 py-2.5 font-semibold text-start">{lang === 'ar' ? 'رقم الطلب' : 'Order #'}</th>
                  <th className="px-2 py-2.5 font-semibold text-start">{lang === 'ar' ? 'العميل' : 'Customer'}</th>
                  <th className="px-2 py-2.5 font-semibold text-start">{lang === 'ar' ? 'رقم الهاتف' : 'Phone'}</th>
                  <th className="px-2 py-2.5 font-semibold text-start">{lang === 'ar' ? 'التاريخ' : 'Date'}</th>
                  <th className="px-2 py-2.5 font-semibold text-start">{lang === 'ar' ? 'الدولة' : 'Country'}</th>
                  <th className="px-2 py-2.5 font-semibold text-start">{lang === 'ar' ? 'المدينة' : 'City'}</th>
                  <th className="px-2 py-2.5 font-semibold text-start">{lang === 'ar' ? 'المتجر' : 'Store'}</th>
                  <th className="px-2 py-2.5 font-semibold text-start">{lang === 'ar' ? 'شركة التوصيل' : 'Courier'}</th>
                  <th className="px-2 py-2.5 font-semibold text-center">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                  <th className="px-2 py-2.5 font-semibold text-start">{lang === 'ar' ? 'المبلغ' : 'Amount'}</th>
                  <th className="px-2 py-2.5 font-semibold text-center">{lang === 'ar' ? 'مراسلة' : 'Chat'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {crmOrders.map((order, idx) => (
                  <tr key={idx} className="hover:bg-muted/30 transition-colors">
                    <td className="px-2 py-2 font-mono text-muted-foreground">{order.id}</td>
                    <td className="px-2 py-2 font-medium">{order.customer}</td>
                    <td className="px-2 py-2 font-mono text-brand" dir="ltr">{order.phone}</td>
                    <td className="px-2 py-2 text-muted-foreground">{order.date}</td>
                    <td className="px-2 py-2">{lang === 'ar' ? order.countryAr : order.countryEn}</td>
                    <td className="px-2 py-2">{lang === 'ar' ? order.cityAr : order.cityEn}</td>
                    <td className="px-2 py-2 text-muted-foreground">{order.store}</td>
                    <td className="px-2 py-2 text-muted-foreground">{order.shipping}</td>
                    <td className="px-2 py-2 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        order.statusEn === 'Delivering' 
                          ? 'bg-red-500/10 text-red-500' 
                          : 'bg-brand/10 text-brand'
                      }`}>
                        {lang === 'ar' ? order.statusAr : order.statusEn}
                      </span>
                    </td>
                    <td className="px-2 py-2 font-bold text-amber-500" dir="ltr">{order.amount}</td>
                    <td className="px-2 py-2 text-center">
                      {order.chat === 'meta' ? (
                        <button className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">
                          <MessageCircle size={12} /> Meta
                        </button>
                      ) : (
                        <button className="inline-flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded">
                          <MessageCircle size={12} /> WhatsApp
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground bg-muted/20">
            <span>{lang === 'ar' ? 'إجمالي الطلبات: 5' : 'Total Orders: 5'}</span>
            <div className="flex gap-1">
              <button className="px-2 py-1 border border-border rounded hover:bg-muted">{lang === 'ar' ? 'السابق' : 'Prev'}</button>
              <button className="px-2 py-1 border border-brand bg-brand/10 text-brand font-bold rounded">1</button>
              <button className="px-2 py-1 border border-border rounded hover:bg-muted">{lang === 'ar' ? 'التالي' : 'Next'}</button>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  )
}
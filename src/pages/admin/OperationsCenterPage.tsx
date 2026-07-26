import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  DollarSign, ShoppingBag, AlertCircle, Users, Globe, Store, 
  TrendingUp, Clock, ShieldAlert, FileText, CheckCircle2, 
  LayoutDashboard, Tags, Gift, Star, MessageSquare, Bell, ClipboardList, Package, Truck, Search, ChevronDown 
} from 'lucide-react'
import { AdminLayout } from '../../components/layout/AdminLayout'
import { useApp } from '../../context/AppContext'

export default function OperationsCenterPage() {
  const { lang, isAdmin } = useApp()
  const location = useLocation()

  // روابط السلايدر العلوية المعتادة لنحافظ على نفس التنسيق المدمج
  const siteNavTabs = [
    { path: '/admin', nameEn: 'Dashboard', nameAr: 'لوحة التحكم', icon: LayoutDashboard },
    { path: '/admin/operations', nameEn: 'Operations Center', nameAr: 'مركز العمليات', icon: TrendingUp },
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

  // إحصائيات الكروت العلوية (المشابهة للصورة تماماً)
  const statsTop = [
    { titleEn: 'Total USD', titleAr: 'المبلغ بالدولار', value: '18,255.37 USD', icon: DollarSign, color: 'text-emerald-500' },
    { titleEn: 'Total Orders', titleAr: 'عدد الطلبات', value: '6', icon: ShoppingBag, color: 'text-brand' },
    { titleEn: 'Delivery Cost Orders', titleAr: 'طلبات لها سعر توصيل', value: '6', icon: Truck, color: 'text-blue-500' },
    { titleEn: 'Processed Orders', titleAr: 'الطلبات التي تم معالجتها', value: '0', icon: CheckCircle2, color: 'text-green-600' },
    { titleEn: 'Delayed Deliveries', titleAr: 'طلبات فضل التسليم', value: '1', icon: Clock, color: 'text-red-500' },
    { titleEn: 'Pending Reports', titleAr: 'بلاغات المشاكل', value: '5', icon: ShieldAlert, color: 'text-purple-500' },
  ]

  return (
    <AdminLayout>
      <div className="w-full space-y-4 pb-10">
        
        {/* الحاوية العلوية للروابط (بنظام 4×4 المدمج والأنيق) */}
        <div className="max-w-7xl mx-auto w-full bg-card p-4 rounded-xl border-2 border-brand/70 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            {siteNavTabs.map((tab) => {
              const isActive = location.pathname === tab.path
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg border border-brand text-brand hover:bg-brand hover:text-[#0E0E11] transition-all text-[11px] font-semibold tap-highlight group whitespace-nowrap shadow-sm ${
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
        </div>

        {/* عنوان الصفحة الترحيبي */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-2">
          <h1 className="text-sm font-bold text-brand flex items-center gap-2">
            <TrendingUp size={16} /> {lang === 'ar' ? 'مركز العمليات الرئيسي' : 'Operations Center'}
          </h1>
          <span className="text-xs text-muted-foreground bg-card px-3 py-1 rounded-lg border border-border">
            {lang === 'ar' ? 'تحديث حي للبيانات' : 'Live Data Feed'}
          </span>
        </div>

        {/* شبكة الكروت الإحصائية العلوية (KPIs Grid) */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {statsTop.map((stat, idx) => (
            <div key={idx} className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center justify-between hover:border-brand/50 transition-all">
              <div className="space-y-1">
                <p className="text-[11px] font-medium text-muted-foreground">{lang === 'ar' ? stat.titleAr : stat.titleEn}</p>
                <h3 className="text-sm font-bold text-foreground" dir="ltr">{stat.value}</h3>
              </div>
              <div className={`p-2.5 rounded-lg bg-muted/40 ${stat.color}`}>
                <stat.icon size={18} />
              </div>
            </div>
          ))}
        </div>

        {/* أقسام البيانات التفصيلية (المتاجر، الدول، الموظفين، شاشة المراقبة) */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
         
          {/* قسم الدول */}
          <div className="bg-card p-4 rounded-xl border border-border shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="text-xs font-bold text-brand flex items-center gap-1.5"><Globe size={14} /> {lang === 'ar' ? 'الدول' : 'Countries'}</span>
              <span className="text-[10px] bg-brand/10 text-brand px-2 py-0.5 rounded font-bold">2 دول</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30 text-xs">
                <span>🇮🇶 العراق</span>
                <span className="bg-brand/20 text-brand px-2 py-0.5 rounded text-[10px] font-bold">5 طلبات</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30 text-xs">
                <span>🇹🇷 تركيا</span>
                <span className="bg-brand/20 text-brand px-2 py-0.5 rounded text-[10px] font-bold">1 طلب</span>
              </div>
            </div>
          </div>

          

          {/* شاشة المراقبة */}
          <div className="bg-card p-4 rounded-xl border border-border shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="text-xs font-bold text-brand flex items-center gap-1.5"><Clock size={14} /> {lang === 'ar' ? 'شاشة المراقبة' : 'Monitoring'}</span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded font-bold">متصل</span>
            </div>
            <div className="space-y-2 text-center py-2">
              <p className="text-xs text-muted-foreground">{lang === 'ar' ? 'إجمالي إرسال اليوم' : 'Today Total'}</p>
              <h4 className="text-base font-bold text-brand">5 إرسال اليوم</h4>
              <div className="bg-brand/10 p-2 rounded-lg font-mono text-xs text-brand font-bold">
                00:03:06
              </div>
            </div>
          </div>

        </div>

        {/* قسم تقييم الحملات الإعلانية السفلي */}
        <div className="max-w-7xl mx-auto w-full bg-card p-4 rounded-xl border border-border shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-border pb-2">
            <span className="text-xs text-amber-500 font-bold" dir="ltr">USD 65.79</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-[11px] text-muted-foreground">{lang === 'ar' ? 'إجمالي البيع' : 'Total Sales'}</p>
              <p className="text-xs font-bold text-brand" dir="ltr">USD 65.79</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-[11px] text-muted-foreground">{lang === 'ar' ? 'الإعلانات' : 'Ads'}</p>
              <p className="text-xs font-bold">1</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-[11px] text-muted-foreground">{lang === 'ar' ? 'المتاجر' : 'Stores'}</p>
              <p className="text-xs font-bold">1</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-[11px] text-muted-foreground">{lang === 'ar' ? 'طلبات جديدة بإعلان' : 'New Ad Orders'}</p>
              <p className="text-xs font-bold">2</p>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  )
}
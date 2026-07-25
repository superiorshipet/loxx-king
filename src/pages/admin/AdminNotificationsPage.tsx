import { Package, Users, Star, ShoppingBag } from 'lucide-react'
import { AdminLayout } from '../../components/layout/AdminLayout'
import { useApp } from '../../context/AppContext'

const adminNotifs = [
  { id: '1', icon: ShoppingBag, color: 'text-brand bg-secondary', titleEn: 'New Order Received', titleAr: 'طلب جديد', msgEn: 'Order #LK-2025-1848 from Maria Santos', msgAr: 'طلب #LK-2025-1848 من ماريا سانتوس', time: '2 min ago', read: false },
  { id: '2', icon: Users, color: 'text-green-600 bg-green-50 dark:bg-green-900/20', titleEn: 'New Customer', titleAr: 'عميلة جديدة', msgEn: 'Jessica Lee just registered', msgAr: 'جيسيكا لي سجّلت حديثًا', time: '15 min ago', read: false },
  { id: '3', icon: Star, color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20', titleEn: 'New Review', titleAr: 'تقييم جديد', msgEn: '5★ review on Pro Waist Cincher Elite', msgAr: 'تقييم ٥ نجوم على مشد الخصر برو', time: '1 hour ago', read: true },
  { id: '4', icon: Package, color: 'text-red-600 bg-red-50 dark:bg-red-900/20', titleEn: 'Low Stock Alert', titleAr: 'تنبيه مخزون منخفض', msgEn: 'Lace Trim Bodysuit has only 5 units left', msgAr: 'بودي سوت الدانتيل — ٥ قطع فقط', time: '2 hours ago', read: true },
  { id: '5', icon: ShoppingBag, color: 'text-brand bg-secondary', titleEn: 'New Order', titleAr: 'طلب جديد', msgEn: 'Order #LK-2025-1847 placed', msgAr: 'تم تقديم طلب #LK-2025-1847', time: '3 hours ago', read: true },
]

export default function AdminNotificationsPage() {
  const { lang } = useApp()
  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="font-display font-bold text-2xl">{lang === 'ar' ? 'الإشعارات' : 'Notifications'}</h1>
          <p className="text-sm text-muted-foreground">{adminNotifs.filter(n => !n.read).length} {lang === 'ar' ? 'جديد' : 'new'}</p>
        </div>

        <div className="space-y-2">
          {adminNotifs.map(n => (
            <div key={n.id} className={`flex items-start gap-3 p-4 rounded-2xl border transition-all ${!n.read ? 'bg-secondary border-brand/20' : 'bg-card border-border'}`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${n.color}`}>
                <n.icon size={17} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-sm">{lang === 'ar' ? n.titleAr : n.titleEn}</p>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-brand shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{lang === 'ar' ? n.msgAr : n.msgEn}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}

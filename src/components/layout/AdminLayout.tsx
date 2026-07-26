import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, ShoppingBag, Package, Tags, Gift, Star, 
  MessageSquare, FileText, Bell, ClipboardList, LogOut, 
  Globe, Moon, Sun, ChevronLeft, ChevronRight, Menu, X, MapPin,
  TrendingUp
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import logoImg from '../../imports/image.png'

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { lang, setLang, theme, toggleTheme, dir, isAdmin, user, setUser } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  
  // السلايدر مقفول افتراضياً عشان الشاشة تبقى واسعة
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [country, setCountry] = useState('IQ') 

  const adminLinks = [
    { nameEn: 'Dashboard', nameAr: 'لوحة التحكم', path: '/admin', icon: LayoutDashboard },
    { nameEn: 'Orders', nameAr: 'الطلبات', path: '/admin/orders', icon: ShoppingBag },
    { nameEn: 'Products', nameAr: 'المستودع', path: '/admin/products', icon: Package },
    { nameEn: 'Categories', nameAr: 'الفئات', path: '/admin/categories', icon: Tags },
    { nameEn: 'Offers', nameAr: 'العروض', path: '/admin/offers', icon: Gift },
    { nameEn: 'Reviews', nameAr: 'التقييمات', path: '/admin/reviews', icon: Star },
    { nameEn: 'Support Chat', nameAr: 'دردشة الدعم', path: '/admin/chat', icon: MessageSquare },
    { nameEn: 'Invoices', nameAr: 'الفواتير', path: '/admin/invoices', icon: FileText },
    { nameEn: 'Notifications', nameAr: 'الإشعارات', path: '/admin/notifications', icon: Bell },
    {nameEn: 'Operations Center', nameAr: 'مركز العمليات', path: '/admin/operations', icon: TrendingUp },
    ...(isAdmin ? [{ nameEn: 'Edit Logs', nameAr: 'سجل التعديلات', path: '/admin/logs', icon: ClipboardList }] : []),
  ]

  const handleLogout = () => {
    setUser(null)
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-muted/20 font-sans" dir={dir}>
      
      {/* الشريط العلوي الثابت (الهيدر) وفيه زرار السلايدر */}
   <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border flex items-center px-4 justify-between z-30 shadow-sm">
  <div className="flex items-center gap-4">
    <button 
      onClick={() => setIsSidebarOpen(true)}
      className="w-10 h-10 rounded-xl flex items-center justify-center bg-brand/10 text-brand hover:bg-brand hover:text-[#0E0E11] transition-colors tap-highlight"
    >
      <Menu size={20} />
    </button>
  </div>

  <Link to="/admin" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 tap-highlight">
    <span className="font-display font-black text-xl tracking-wide hidden sm:block">
      <span className="text-foreground">LOXX</span>
      <span className="text-brand"> KING</span>
    </span>
  </Link>

  <div className="flex items-center gap-3">
  </div>
</header>
      {/* خلفية ضبابية لما السلايدر يفتح */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* السلايدر نفسه (القائمة بتاعتك اللي بتتحرك) */}
      <aside className={`fixed top-0 bottom-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-72 bg-card z-50 transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${
        isSidebarOpen ? 'translate-x-0' : (dir === 'rtl' ? 'translate-x-full' : '-translate-x-full')
      }`}>
        
        <div className="h-16 p-4 border-b border-border flex items-center justify-between bg-muted/10">
          <p className="text-sm text-muted-foreground font-bold">
            {lang === 'ar' ? 'لوحة الإدارة' : 'Admin Panel'}
          </p>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted text-muted-foreground tap-highlight"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 no-scrollbar">
          {adminLinks.map((link) => {
            const isActive = location.pathname === link.path || location.pathname.startsWith(`${link.path}/`)
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group tap-highlight ${
                  isActive 
                    ? 'bg-brand text-[#0E0E11] font-bold shadow-md shadow-brand/20' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground font-medium'
                }`}
              >
                <div className="flex items-center gap-3">
                  <link.icon size={20} className={isActive ? 'text-[#0E0E11]' : 'opacity-80 group-hover:opacity-100'} />
                  <span className="text-sm">{lang === 'ar' ? link.nameAr : link.nameEn}</span>
                </div>
                {isActive && (
                  dir === 'rtl' ? <ChevronLeft size={16} className="opacity-70" /> : <ChevronRight size={16} className="opacity-70" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* الفوتر: البلد، الدارك مود، اللغة، تسجيل الخروج */}
        <div className="p-4 border-t border-border space-y-4 bg-muted/10">
          <div className="flex items-center justify-between px-2 text-muted-foreground mt-2">
            <button onClick={() => setCountry(country === 'IQ' ? 'AE' : 'IQ')} className="flex items-center gap-1.5 hover:text-brand transition-colors text-sm font-semibold tap-highlight">
              <span className="text-lg">{country === 'IQ' ? '🇮🇶' : '🇦🇪'}</span>
              <MapPin size={16} />
            </button>
            <button onClick={toggleTheme} className="flex items-center gap-1.5 hover:text-foreground transition-colors text-sm font-semibold tap-highlight">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              {theme === 'dark' ? (lang === 'ar' ? 'فاتح' : 'Light') : (lang === 'ar' ? 'داكن' : 'Dark')}
            </button>
            <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="flex items-center gap-1.5 hover:text-foreground transition-colors text-sm font-semibold tap-highlight">
              <Globe size={16} />
              {lang === 'en' ? 'AR' : 'EN'}
            </button>
          </div>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 text-red-500 hover:bg-red-500/10 px-4 py-2.5 rounded-xl transition-colors text-sm font-bold tap-highlight mt-2"
          >
            {dir === 'rtl' ? <LogOut size={18} className="rotate-180" /> : <LogOut size={18} />}
            {lang === 'ar' ? 'تسجيل الخروج' : 'Logout'}
          </button>
        </div>
      </aside>

      {/* محتوى الصفحة الرئيسية */}
      <main className="flex-1 flex flex-col h-full pt-16 overflow-hidden w-full">
        <div className="flex-1 overflow-auto bg-muted/10 p-2 sm:p-4">
          {children}
        </div>
      </main>
    </div>
  )
}
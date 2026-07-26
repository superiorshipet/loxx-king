import { useState, type ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, ShoppingBag, Package, Tag, Gift, MessageSquare,
  FileText, Bell, ClipboardList, Star, Sun, Moon, Globe, Menu, X,
  ChevronRight, LogOut, User,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { ToastContainer } from '../ui/Toast'
import logoImg from '../../imports/image.png'

type NavItem = {
  to: string
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>
  labelEn: string
  labelAr: string
  adminOnly?: boolean
}

const navItems: NavItem[] = [
  { to: '/admin', icon: LayoutDashboard, labelEn: 'Dashboard', labelAr: 'لوحة التحكم' },
  { to: '/admin/orders', icon: ShoppingBag, labelEn: 'Orders', labelAr: 'الطلبات' },
  { to: '/admin/products', icon: Package, labelEn: 'Products', labelAr: 'المنتجات' },
  { to: '/admin/categories', icon: Tag, labelEn: 'Categories', labelAr: 'الفئات' },
  { to: '/admin/offers', icon: Gift, labelEn: 'Offers', labelAr: 'العروض' },
  { to: '/admin/reviews', icon: Star, labelEn: 'Reviews', labelAr: 'التقييمات' },
  { to: '/admin/chat', icon: MessageSquare, labelEn: 'Support Chat', labelAr: 'دردشة الدعم' },
  { to: '/admin/invoices', icon: FileText, labelEn: 'Invoices', labelAr: 'الفواتير' },
  { to: '/admin/notifications', icon: Bell, labelEn: 'Notifications', labelAr: 'الإشعارات' },
  { to: '/admin/edit-logs', icon: ClipboardList, labelEn: 'Edit Logs', labelAr: 'سجل التعديلات', adminOnly: true },
  {to: '/admin/operations', icon: User, labelEn: 'Operations', labelAr: 'العمليات', adminOnly: true }
]

export function AdminLayout({ children }: { children: ReactNode }) {
  const { lang, setLang, theme, toggleTheme, user, setUser, dir } = useApp()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false) // السلايدر مغلق دائماً بشكل افتراضي

  const filteredNav = navItems.filter(item => {
    if (item.adminOnly && user?.role !== 'admin') return false
    return true
  })

  function NavLink({ item }: { item: NavItem }) {
    const active = pathname === item.to
    return (
      <Link
        to={item.to}
        onClick={() => setSidebarOpen(false)}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all tap-highlight text-sm cursor-pointer ${
          active
            ? 'bg-brand text-[#0E0E11] font-semibold'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        }`}
      >
        <item.icon size={18} strokeWidth={active ? 2.5 : 2} />
        <span className="flex-1">{lang === 'ar' ? item.labelAr : item.labelEn}</span>
        {active && <ChevronRight size={14} className={dir === 'rtl' ? 'rotate-180' : ''} />}
      </Link>
    )
  }

  // محتوى القائمة الجانبية (السلايدر)
  const Sidebar = () => (
    <div className="flex flex-col h-full bg-card">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoImg} alt="LOXX KING" className="h-8 w-8 rounded-lg" />
          <span className="font-display font-bold">
            <span>LOXX</span><span className="text-brand"> KING</span>
          </span>
        </Link>
        <button 
          onClick={() => setSidebarOpen(false)}
          className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-foreground cursor-pointer"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {filteredNav.map(item => <NavLink key={item.to} item={item} />)}
      </nav>

      <div className="p-3 border-t border-border space-y-1">
        <div className="px-3 py-2 bg-muted rounded-xl">
          <p className="text-xs text-muted-foreground">{lang === 'ar' ? 'الدور' : 'Role'}</p>
          <p className="text-sm font-semibold capitalize">{user?.role ?? 'Guest'}</p>
        </div>
        <div className="flex gap-1">
          <button onClick={toggleTheme} className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl hover:bg-muted transition-colors text-xs tap-highlight cursor-pointer">
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            {theme === 'dark' ? (lang === 'ar' ? 'فاتح' : 'Light') : (lang === 'ar' ? 'داكن' : 'Dark')}
          </button>
          <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl hover:bg-muted transition-colors text-xs font-bold tap-highlight cursor-pointer">
            <Globe size={14} />
            {lang === 'en' ? 'AR' : 'EN'}
          </button>
        </div>
        <button
          onClick={() => { setUser(null); navigate('/login') }}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm tap-highlight cursor-pointer"
        >
          <LogOut size={16} /> {lang === 'ar' ? 'تسجيل الخروج' : 'Logout'}
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background text-foreground flex relative" dir={dir}>
      
      {/* تم إزالة الـ Desktop Sidebar الثابت نهائياً لضمان عدم ظهوره بشكل دائم */}

      {/* السلايدر الجانبي (يظهر فقط عند الضغط على زر القائمة Menu) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />
          <aside className={`fixed inset-y-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} z-50 w-64 bg-card border-e border-border shadow-2xl flex flex-col`}
            style={{ animation: 'slideIn 0.2s ease-out' }}
          >
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Bar (تحتوي على زر القائمة Menu لفتح السلايدر حصرياً) */}
        <header className="sticky top-0 z-30 bg-card/95 backdrop-blur-md border-b border-border px-4 h-14 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-muted transition-colors tap-highlight border border-border cursor-pointer shadow-sm"
          >
            <Menu size={20} />
          </button>
          
          <div className="flex-1">
            <p className="font-display font-semibold text-sm">
              {filteredNav.find(i => i.to === pathname)?.[lang === 'ar' ? 'labelAr' : 'labelEn'] ?? 'Admin'}
            </p>
          </div>
          
          <div className="flex items-center gap-1">
            <Link to="/" className="text-xs text-muted-foreground hover:text-brand transition-colors px-2.5 py-1.5 rounded-lg hover:bg-muted tap-highlight">
              {lang === 'ar' ? 'المتجر ↗' : 'Store ↗'}
            </Link>
            <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-xs font-bold text-[#0E0E11]">
              {user?.name?.[0] ?? 'A'}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
      <ToastContainer />
    </div>
  )
}
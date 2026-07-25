import { Link, useLocation } from 'react-router-dom'
import { Home, Grid3X3, ShoppingCart, Bell, User } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export function BottomNav() {
  const { cartCount, unreadCount, lang } = useApp()
  const { pathname } = useLocation()

  const items = [
    { to: '/', icon: Home, label: lang === 'ar' ? 'الرئيسية' : 'Home' },
    { to: '/category/all', icon: Grid3X3, label: lang === 'ar' ? 'المتجر' : 'Shop' },
    { to: '/cart', icon: ShoppingCart, label: lang === 'ar' ? 'السلة' : 'Cart', badge: cartCount },
    { to: '/notifications', icon: Bell, label: lang === 'ar' ? 'الإشعارات' : 'Alerts', badge: unreadCount },
    { to: '/profile', icon: User, label: lang === 'ar' ? 'حسابي' : 'Account' },
  ]

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-card/95 backdrop-blur-md border-t border-border md:hidden safe-area-bottom">
      <div className="flex">
        {items.map(item => {
          const active = pathname === item.to || (item.to !== '/' && pathname.startsWith(item.to))
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 relative tap-highlight transition-colors ${
                active ? 'text-brand' : 'text-muted-foreground'
              }`}
            >
              <div className="relative">
                <item.icon size={22} strokeWidth={active ? 2.5 : 2} />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -end-1 min-w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
              {active && (
                <span className="absolute top-0 inset-x-4 h-0.5 bg-brand rounded-b-full" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

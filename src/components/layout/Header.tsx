import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, Bell, Sun, Moon, Globe, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import logoImg from '../../imports/image.png'

export function Header() {
  const { lang, setLang, theme, toggleTheme, cartCount, unreadCount, user, setUser, dir, isAdmin } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/category/all?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 tap-highlight">
            <img src={logoImg} alt="LOXX KING" className="h-8 w-8 rounded-lg object-contain" />
            <span className="font-display font-bold text-lg hidden sm:block">
              <span className="text-foreground">LOXX</span>
              <span className="text-brand"> KING</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1 ms-4">
            {[
              { to: '/', label: lang === 'ar' ? 'الرئيسية' : 'Home' },
              { to: '/category/all', label: lang === 'ar' ? 'المتجر' : 'Shop' },
              { to: '/about', label: lang === 'ar' ? 'عنا' : 'About' },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors tap-highlight"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Admin Dashboard Button (Desktop Only) */}
            {isAdmin && (
              <Link
                to="/admin"
                className="px-4 py-1.5 ms-2 rounded-lg text-sm font-bold bg-brand text-[#0E0E11] hover:opacity-90 transition-opacity flex items-center gap-2 tap-highlight"
              >
                <LayoutDashboard size={16} />
                {lang === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
              </Link>
            )}
          </nav>

          <div className="flex-1 md:flex-none" />

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(v => !v)}
              className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-muted transition-colors tap-highlight"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-muted transition-colors relative tap-highlight"
              aria-label="Cart"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -end-0.5 min-w-4 h-4 bg-brand text-[#0E0E11] text-[10px] font-bold rounded-full flex items-center justify-center px-0.5 animate-bounce-in">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Notifications */}
            <Link
              to="/notifications"
              className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-muted transition-colors relative tap-highlight"
              aria-label="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -end-0.5 min-w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* Language */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="hidden sm:flex items-center gap-1.5 h-9 px-2.5 rounded-xl hover:bg-muted transition-colors text-xs font-bold tap-highlight"
            >
              <Globe size={14} className="text-muted-foreground" />
              {lang === 'en' ? 'AR' : 'EN'}
            </button>

            {/* Theme */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-muted transition-colors tap-highlight"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Profile / Menu */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-muted transition-colors relative tap-highlight"
              aria-label="Menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="border-t border-border px-4 py-3 animate-fade-in">
            <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
              <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={lang === 'ar' ? 'ابحثي عن منتج...' : 'Search products...'}
                className="w-full h-10 ps-9 pe-4 rounded-xl bg-muted text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
              />
            </form>
          </div>
        )}
      </header>

      {/* Dropdown Menu */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setMenuOpen(false)} />
          <div className={`fixed top-14 ${dir === 'rtl' ? 'left-2' : 'right-2'} z-40 bg-card border border-border rounded-2xl shadow-2xl w-56 py-2 animate-fade-in`}>
            {user ? (
              <>
                <div className="px-4 py-3 border-b border-border">
                  <p className="font-semibold text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors text-sm tap-highlight">
                  <User size={16} className="text-muted-foreground" /> {lang === 'ar' ? 'حسابي' : 'My Profile'}
                </Link>
                <Link to="/orders" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors text-sm tap-highlight">
                  <ShoppingCart size={16} className="text-muted-foreground" /> {lang === 'ar' ? 'طلباتي' : 'My Orders'}
                </Link>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors text-sm text-brand tap-highlight">
                    <LayoutDashboard size={16} /> {lang === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
                  </Link>
                )}
                <div className="border-t border-border mt-1 pt-1">
                  <button
                    onClick={() => { setUser(null); setMenuOpen(false); navigate('/login') }}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors text-sm text-red-500 w-full tap-highlight"
                  >
                    <LogOut size={16} /> {lang === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors text-sm tap-highlight">
                  <User size={16} className="text-muted-foreground" /> {lang === 'ar' ? 'تسجيل الدخول' : 'Login'}
                </Link>
              </>
            )}
            {/* Lang/Theme in mobile menu */}
            <div className="border-t border-border mt-1 pt-1 sm:hidden">
              <button
                onClick={() => { setLang(lang === 'en' ? 'ar' : 'en'); setMenuOpen(false) }}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors text-sm w-full tap-highlight"
              >
                <Globe size={16} className="text-muted-foreground" />
                {lang === 'en' ? 'Switch to Arabic' : 'التبديل للإنجليزية'}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
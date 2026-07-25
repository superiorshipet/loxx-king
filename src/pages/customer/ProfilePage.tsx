import { useState } from 'react'
import { User, MapPin, Globe, Moon, Sun, ChevronRight, Edit3 } from 'lucide-react'
import { CustomerLayout } from '../../components/layout/CustomerLayout'
import { Button } from '../../components/ui/Button'
import { useApp } from '../../context/AppContext'
import { t } from '../../lib/translations'

export default function ProfilePage() {
  const { lang, setLang, theme, toggleTheme, user, dir } = useApp()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
  })

  return (
    <CustomerLayout>
      <div className="max-w-lg mx-auto px-4 py-6">
        <h1 className="font-display font-bold text-2xl mb-6">{t('profile', lang)}</h1>

        {/* Avatar + Name */}
        <div className="bg-card border border-border rounded-3xl p-6 mb-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-brand flex items-center justify-center text-[#0E0E11] text-2xl font-display font-black shrink-0">
            {user?.name?.[0] ?? 'U'}
          </div>
          <div className="flex-1">
            <p className="font-display font-bold text-xl">{user?.name}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <button onClick={() => setEditing(v => !v)} className="w-9 h-9 rounded-xl hover:bg-muted flex items-center justify-center transition-colors tap-highlight">
            <Edit3 size={18} className="text-muted-foreground" />
          </button>
        </div>

        {/* Personal Info */}
        {editing && (
          <div className="bg-card border border-border rounded-2xl p-4 mb-4 space-y-4 animate-fade-in">
            <h2 className="font-semibold">{t('personalInfo', lang)}</h2>
            {[
              { key: 'name', label: lang === 'ar' ? 'الاسم' : 'Name' },
              { key: 'email', label: t('email', lang) },
              { key: 'phone', label: t('phone', lang) },
            ].map(f => (
              <div key={f.key}>
                <label className="text-xs text-muted-foreground mb-1 block">{f.label}</label>
                <input
                  value={form[f.key as keyof typeof form]}
                  onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                  className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            ))}
            <Button variant="primary" size="md" onClick={() => setEditing(false)}>
              {t('save', lang)}
            </Button>
          </div>
        )}

        {/* Addresses */}
        <div className="bg-card border border-border rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-brand" />
              <h2 className="font-semibold">{t('savedAddresses', lang)}</h2>
            </div>
            <Button variant="ghost" size="sm">{t('add', lang)}</Button>
          </div>
          <div className="bg-muted rounded-xl p-3 text-sm">
            <p className="font-medium">{lang === 'ar' ? 'المنزل' : 'Home'}</p>
            <p className="text-muted-foreground text-xs mt-0.5">123 Main St, New York, United States</p>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-card border border-border rounded-2xl p-4 mb-4 space-y-1">
          <div className="flex items-center gap-2 mb-3">
            <Globe size={18} className="text-brand" />
            <h2 className="font-semibold">{t('preferences', lang)}</h2>
          </div>

          {/* Language */}
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium">{t('language', lang)}</p>
              <p className="text-xs text-muted-foreground">{lang === 'en' ? 'English' : 'العربية'}</p>
            </div>
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="h-9 px-4 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors tap-highlight"
            >
              {lang === 'en' ? 'Switch to AR' : 'Switch to EN'}
            </button>
          </div>

          <div className="border-t border-border" />

          {/* Theme */}
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium">{t('theme', lang)}</p>
              <p className="text-xs text-muted-foreground">{theme === 'dark' ? t('darkMode', lang) : t('lightMode', lang)}</p>
            </div>
            <button
              onClick={toggleTheme}
              className="h-9 px-4 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors tap-highlight flex items-center gap-2"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              {theme === 'dark' ? t('lightMode', lang) : t('darkMode', lang)}
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-card border border-border rounded-2xl divide-y divide-border overflow-hidden">
          {[
            { label: lang === 'ar' ? 'طلباتي' : 'My Orders', href: '/orders' },
            { label: lang === 'ar' ? 'الإشعارات' : 'Notifications', href: '/notifications' },
            { label: lang === 'ar' ? 'الدعم' : 'Support', href: '/chat' },
            { label: lang === 'ar' ? 'عنا' : 'About Us', href: '/about' },
          ].map(link => (
            <a key={link.href} href={link.href} className="flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors tap-highlight">
              <span className="text-sm font-medium">{link.label}</span>
              <ChevronRight size={16} className={`text-muted-foreground ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            </a>
          ))}
        </div>
      </div>
    </CustomerLayout>
  )
}

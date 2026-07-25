import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { useApp } from '../../context/AppContext'
import logoImg from '../../imports/image.png'

export default function LoginPage() {
  const { lang, setUser, showToast } = useApp()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setUser({
        id: 'user-1',
        name: form.name || 'Sarah Johnson',
        email: form.email || 'sarah@email.com',
        phone: form.phone || '+1 555 000 0000',
        role: 'customer',
      })
      showToast(lang === 'ar' ? 'مرحباً بك! 👋' : 'Welcome back! 👋')
      navigate('/')
    }, 1200)
  }

  function loginAsAdmin() {
    setUser({ id: 'admin-1', name: 'Ahmed Hassan', email: 'admin@loxxking.com', phone: '+1 555 999 0000', role: 'admin' })
    navigate('/admin')
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src={logoImg} alt="LOXX KING" className="w-16 h-16 rounded-2xl mx-auto mb-3 object-contain" />
          <h1 className="font-display font-black text-2xl">
            LOXX<span className="text-brand"> KING</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {mode === 'login'
              ? (lang === 'ar' ? 'مرحباً بعودتك' : 'Welcome back')
              : (lang === 'ar' ? 'أنشئي حسابك' : 'Create your account')}
          </p>
        </div>

        {/* Toggle */}
        <div className="flex bg-muted rounded-2xl p-1 mb-6">
          {(['login', 'register'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 h-9 rounded-xl text-sm font-semibold transition-all tap-highlight ${mode === m ? 'bg-card shadow text-foreground' : 'text-muted-foreground'}`}
            >
              {m === 'login'
                ? (lang === 'ar' ? 'تسجيل الدخول' : 'Login')
                : (lang === 'ar' ? 'إنشاء حساب' : 'Register')}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium mb-1">
                {lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
              </label>
              <input
                required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Sarah Johnson"
                className="w-full h-11 px-4 rounded-xl bg-muted border border-border focus:ring-2 focus:ring-ring outline-none text-sm"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">
              {lang === 'ar' ? 'البريد الإلكتروني أو الهاتف' : 'Email or Phone'}
            </label>
            <input
              required
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="sarah@email.com"
              className="w-full h-11 px-4 rounded-xl bg-muted border border-border focus:ring-2 focus:ring-ring outline-none text-sm"
            />
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium mb-1">
                {lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
              </label>
              <input
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="+1 555 000 0000"
                className="w-full h-11 px-4 rounded-xl bg-muted border border-border focus:ring-2 focus:ring-ring outline-none text-sm"
              />
            </div>
          )}

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium">{lang === 'ar' ? 'كلمة المرور' : 'Password'}</label>
              {mode === 'login' && (
                <button type="button" className="text-xs text-brand hover:underline tap-highlight">
                  {lang === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                </button>
              )}
            </div>
            <div className="relative">
              <input
                required
                type={showPwd ? 'text' : 'password'}
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="••••••••"
                className="w-full h-11 px-4 pe-11 rounded-xl bg-muted border border-border focus:ring-2 focus:ring-ring outline-none text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPwd(v => !v)}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors tap-highlight"
              >
                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
            {mode === 'login'
              ? (lang === 'ar' ? 'تسجيل الدخول' : 'Login')
              : (lang === 'ar' ? 'إنشاء حساب' : 'Create Account')}
          </Button>
        </form>

        {/* Demo Logins */}
        <div className="mt-6 space-y-2">
          <p className="text-xs text-center text-muted-foreground">— {lang === 'ar' ? 'تجربة سريعة' : 'Quick demo'} —</p>
          <button
            onClick={loginAsAdmin}
            className="w-full h-10 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors tap-highlight"
          >
            {lang === 'ar' ? '🔧 تسجيل دخول كمدير' : '🔧 Login as Admin'}
          </button>
          <button
            onClick={() => { setUser({ id: 'u2', name: 'Sarah Johnson', email: 'sarah@email.com', phone: '', role: 'customer' }); navigate('/') }}
            className="w-full h-10 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors tap-highlight"
          >
            {lang === 'ar' ? '🛍️ تسجيل دخول كعميل' : '🛍️ Login as Customer'}
          </button>
        </div>

        <Link to="/" className="block text-center text-sm text-muted-foreground mt-4 hover:text-brand transition-colors tap-highlight">
          {lang === 'ar' ? '← العودة للمتجر' : '← Back to Store'}
        </Link>
      </div>
    </div>
  )
}

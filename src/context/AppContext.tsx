import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { Lang } from '../lib/translations'
import type { Product } from '../lib/mockData'

export type UserRole = 'customer' | 'admin' | 'manager' | 'sales'

export type User = {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  avatar?: string
}

export type CartItem = {
  product: Product
  size: string
  quantity: number
}

export type Toast = {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
}

type AppContextType = {
  // Theme
  theme: 'light' | 'dark'
  toggleTheme: () => void

  // Language
  lang: Lang
  setLang: (l: Lang) => void
  dir: 'ltr' | 'rtl'

  // User / Auth
  user: User | null
  setUser: (u: User | null) => void
  isAdmin: boolean

  // Cart
  cart: CartItem[]
  addToCart: (product: Product, size: string, quantity?: number) => void
  removeFromCart: (productId: string, size: string) => void
  updateQuantity: (productId: string, size: string, qty: number) => void
  clearCart: () => void
  cartCount: number
  cartTotal: number

  // Notifications
  unreadCount: number
  setUnreadCount: (n: number) => void

  // Chat unread
  chatUnread: number
  setChatUnread: (n: number) => void

  // Toast
  toasts: Toast[]
  showToast: (message: string, type?: Toast['type']) => void
  dismissToast: (id: string) => void
}

const AppContext = createContext<AppContextType | null>(null)

const DEMO_CUSTOMER: User = {
  id: 'user-1',
  name: 'Sarah Johnson',
  email: 'sarah@email.com',
  phone: '+1 555 123 4567',
  role: 'admin',
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('lk-theme')
    if (stored === 'dark' || stored === 'light') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem('lk-lang')
    if (stored === 'ar' || stored === 'en') return stored
    const nav = navigator.language.toLowerCase()
    return nav.startsWith('ar') ? 'ar' : 'en'
  })

  const [user, setUser] = useState<User | null>(DEMO_CUSTOMER)
  const [cart, setCart] = useState<CartItem[]>([])
  const [unreadCount, setUnreadCount] = useState(2)
  const [chatUnread, setChatUnread] = useState(1)
  const [toasts, setToasts] = useState<Toast[]>([])

  // Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('lk-theme', theme)
  }, [theme])

  // Apply direction
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
    localStorage.setItem('lk-lang', lang)
  }, [lang])

  const toggleTheme = useCallback(() => {
    setTheme(t => (t === 'light' ? 'dark' : 'light'))
  }, [])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
  }, [])

  const addToCart = useCallback((product: Product, size: string, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.size === size)
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }
      return [...prev, { product, size, quantity }]
    })
  }, [])

  const removeFromCart = useCallback((productId: string, size: string) => {
    setCart(prev => prev.filter(i => !(i.product.id === productId && i.size === size)))
  }, [])

  const updateQuantity = useCallback((productId: string, size: string, qty: number) => {
    if (qty <= 0) {
      setCart(prev => prev.filter(i => !(i.product.id === productId && i.size === size)))
    } else {
      setCart(prev =>
        prev.map(i =>
          i.product.id === productId && i.size === size ? { ...i, quantity: qty } : i
        )
      )
    }
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0)
  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

  const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Math.random().toString(36).slice(2)
    setToasts(prev => [...prev, { id, type, message }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const isAdmin = user?.role === 'admin' || user?.role === 'manager' || user?.role === 'sales'

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        lang,
        setLang,
        dir: lang === 'ar' ? 'rtl' : 'ltr',
        user,
        setUser,
        isAdmin,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        unreadCount,
        setUnreadCount,
        chatUnread,
        setChatUnread,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
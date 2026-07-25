import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Package, MessageCircle } from 'lucide-react'
import { CustomerLayout } from '../../components/layout/CustomerLayout'
import { Button } from '../../components/ui/Button'
import { useApp } from '../../context/AppContext'
import { t } from '../../lib/translations'

export default function OrderConfirmationPage() {
  const { lang } = useApp()
  const [show, setShow] = useState(false)
  const orderNumber = `LK-2025-${Math.floor(1800 + Math.random() * 200)}`

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <CustomerLayout>
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        {/* Success Icon */}
        <div className={`transition-all duration-700 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-green-500" />
          </div>
        </div>

        <div className={`transition-all duration-700 delay-300 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="font-display font-black text-3xl mb-2">{t('orderPlaced', lang)}</h1>
          <p className="text-muted-foreground mb-2">{t('orderSent', lang)}</p>

          <div className="bg-muted rounded-2xl px-6 py-4 inline-block my-6">
            <p className="text-xs text-muted-foreground mb-1">{t('orderNumber', lang)}</p>
            <p className="font-display font-black text-2xl text-brand">{orderNumber}</p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-card border border-border rounded-2xl p-4">
              <Package size={24} className="text-brand mb-2 mx-auto" />
              <p className="font-semibold text-sm">{lang === 'ar' ? 'التوصيل المتوقع' : 'Expected Delivery'}</p>
              <p className="text-xs text-muted-foreground mt-1">3–5 {lang === 'ar' ? 'أيام عمل' : 'Business Days'}</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <MessageCircle size={24} className="text-brand mb-2 mx-auto" />
              <p className="font-semibold text-sm">WhatsApp</p>
              <p className="text-xs text-muted-foreground mt-1">{lang === 'ar' ? 'سيصلك تأكيد' : 'Confirmation sent'}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link to="/orders">
              <Button variant="primary" size="lg" fullWidth>{t('trackOrder', lang)}</Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg" fullWidth>{t('continueShopping', lang)}</Button>
            </Link>
          </div>
        </div>
      </div>
    </CustomerLayout>
  )
}

import { Link, useNavigate } from 'react-router-dom'
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { CustomerLayout } from '../../components/layout/CustomerLayout'
import { Button } from '../../components/ui/Button'
import { useApp } from '../../context/AppContext'
import { t } from '../../lib/translations'

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, lang, dir, showToast } = useApp()
  const navigate = useNavigate()
  const delivery = cartTotal > 80 ? 0 : 5.99
  const total = cartTotal + delivery

  return (
    <CustomerLayout>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="font-display font-bold text-2xl mb-6">{t('cart', lang)}</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-7xl mb-4">🛒</div>
            <h2 className="font-display font-bold text-xl mb-2">{t('cartEmpty', lang)}</h2>
            <p className="text-muted-foreground text-sm mb-6">{t('cartEmptyDesc', lang)}</p>
            <Button variant="primary" size="lg" onClick={() => navigate('/category/all')}>
              {t('shopNow', lang)}
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Items */}
            <div className="md:col-span-2 space-y-3">
              {cart.map(item => (
                <div key={`${item.product.id}-${item.size}`} className="bg-card border border-border rounded-2xl p-4 flex gap-4">
                  <Link to={`/product/${item.product.id}`} className="shrink-0">
                    <div className="w-20 h-24 rounded-xl overflow-hidden bg-muted">
                      <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.product.id}`}>
                      <h3 className="font-semibold text-sm leading-tight mb-1">
                        {lang === 'ar' ? item.product.nameAr : item.product.nameEn}
                      </h3>
                    </Link>
                    <p className="text-xs text-muted-foreground mb-2">
                      {t('size', lang)}: <span className="font-semibold text-foreground">{item.size}</span>
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg border border-border flex items-center justify-center text-sm font-bold hover:bg-muted tap-highlight"
                        >−</button>
                        <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg border border-border flex items-center justify-center text-sm font-bold hover:bg-muted tap-highlight"
                        >+</button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-display font-bold text-brand">${(item.product.price * item.quantity).toFixed(2)}</span>
                        <button
                          onClick={() => {
                            removeFromCart(item.product.id, item.size)
                            showToast(lang === 'ar' ? 'تم الحذف' : 'Removed', 'info')
                          }}
                          className="text-muted-foreground hover:text-red-500 transition-colors tap-highlight"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="md:col-span-1">
              <div className="bg-card border border-border rounded-2xl p-5 sticky top-20">
                <h2 className="font-display font-bold text-lg mb-4">{lang === 'ar' ? 'ملخص الطلب' : 'Order Summary'}</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('subtotal', lang)}</span>
                    <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('delivery', lang)}</span>
                    <span className={`font-semibold ${delivery === 0 ? 'text-green-600 dark:text-green-400' : ''}`}>
                      {delivery === 0 ? t('free', lang) : `$${delivery.toFixed(2)}`}
                    </span>
                  </div>
                  {delivery === 0 && (
                    <p className="text-xs text-green-600 dark:text-green-400">
                      {lang === 'ar' ? '✓ توصيل مجاني لطلبات فوق $80' : '✓ Free delivery on orders over $80'}
                    </p>
                  )}
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-bold">{t('total', lang)}</span>
                    <span className="font-display font-black text-xl text-brand">${total.toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="mt-5"
                  onClick={() => navigate('/checkout')}
                  rightIcon={<ArrowRight size={18} className={dir === 'rtl' ? 'rotate-180' : ''} />}
                >
                  {t('proceedCheckout', lang)}
                </Button>
                <Link to="/category/all" className="block text-center text-sm text-muted-foreground hover:text-brand mt-3 tap-highlight">
                  <ShoppingBag size={14} className="inline me-1" />
                  {t('continueShopping', lang)}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </CustomerLayout>
  )
}
